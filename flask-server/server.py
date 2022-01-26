from flask import Flask
import json
import spacy
from spacy.lang.ro.examples import sentences
from spacy.matcher import Matcher
from flask import request
app=Flask(__name__)
f = open('comenzi.json')
m = open('marimi.json')

data = json.load(f)
marimi = json.load(m)

#print("data", data)

nlp = spacy.load("ro_core_news_sm")


@app.route("/statusComanda", methods=['POST', 'GET'])
def statusComanda():
  data1 = request.data
  stringData=data1.decode("utf-8")
  objectData=json.loads(stringData)
  userText=objectData.get('body')
  doc = nlp(str(userText))
  for token in doc:
    matcher=Matcher(nlp.vocab)
    pattern3=[{"LEMMA": {"IN": ["status", "statusul", "comanda", "comandă"]}}]
    matcher.add("status_pattern", [pattern3])
    matches=matcher(doc)
    print("Matches:", [doc[start:end].text for match_id, start, end in matches])
    matches1 = ([doc[start:end].text for match_id, start, end in matches])
    if("ARN" in doc.text):
      if("ARN" in token.text):
        print("are ARN")
        for comanda in data:
          if comanda.get("numarComanda") == token.text:
            print("comanda")
            return "Statusul comenzii dumneavoastră este: " + comanda.get("statusComanda")
          else: return "Ne pare rău, nu putem găsi comanda. Vă rugăm verificați dacă ați introdus numărul corect."
    elif token.text in matches1:
      return "Vă rugăm să scrieți numărul comenzii."

@app.route("/detaliiComanda", methods=['POST', 'GET'])
def detaliiComanda():
  data2 = request.data
  stringData=data2.decode("utf-8")
  objectData=json.loads(stringData)
  userText=objectData.get('body')
  doc = nlp(str(userText))
  for token in doc:
    matcher=Matcher(nlp.vocab)
    pattern4=[{"LEMMA": {"IN": ["detaliu", "comanda", "comandă"]}}]
    matcher.add("detalii_pattern", [pattern4])
    matches=matcher(doc)
    print("Matches:", [doc[start:end].text for match_id, start, end in matches])
    matches1 = ([doc[start:end].text for match_id, start, end in matches]) 
    if("ARN" in doc.text):
      if("ARN" in token.text): 
        for comanda in data:
          if comanda.get("numarComanda") == token.text:
            return "numărul comenzii: " + comanda.get("numarComanda") + "statusul comenzii: " + comanda.get("statusComanda") + "adresa de livrare" + comanda.get("adresaDeLivrare") + "produse: " + str(comanda.get("produse")) + "total comanda: " + comanda.get("totalcomanda") 
          else: return "Ne pare rău, nu putem găsi comanda. Vă rugăm verificați dacă ați introdus numărul corect."
    elif token.text in matches1:
      return "Vă rugăm să scrieți numărul comenzii."

@app.route('/infoTranspComanda', methods=['POST', 'GET'])
def infoTranspComanda():
    data = request.data
    stringData=data.decode("utf-8")
    objectData=json.loads(stringData)
    userText=objectData.get('body')
    doc = nlp(str(userText))
    print('user text', objectData.get('body'))
    for token in doc:
        matcher=Matcher(nlp.vocab)
        pattern1=[{"LEMMA": {"IN": ["transport", "transporta", "costa", "cost", "fi"]}}]
        pattern2= [{"LEMMA": {"IN": ["curierat", "firmă"]}}]
        matcher.add("transport_pattern", [pattern1])
        matcher.add("transport_pattern", [pattern2])
        matches=matcher(doc)
        print("Matches:", [doc[start:end].text for match_id, start, end in matches])
        matches1 = ([doc[start:end].text for match_id, start, end in matches])
    if ("transport" or "transportului" or "transportul") and ("este" or ("costul" or "costa")) in matches1:
      return "Costul transportului este de 15 lei prin curier rapid si 7 lei prin posta romana."
    elif (("curierat" and "firma") or "firma") in matches1: 
      return "La plasarea comenzii puteți opta pentru una dintre aceste firme de curierat: Fan Courier, Urgent Cargus, Posta Romana, Sameday."
    else: return "Ne pare rau, intrebarea dumneavoastră nu poate fi procesată."

@app.route("/returnareComanda", methods=['POST', 'GET'])
def returnareComanda():
  data2 = request.data
  stringData=data2.decode("utf-8")
  objectData=json.loads(stringData)
  userText=objectData.get('body')
  doc = nlp(str(userText))
  for token in doc:
    matcher=Matcher(nlp.vocab)
    pattern5=[{"LEMMA": {"IN": ["retur", "returna", "returnare", "comanda", "comandă", "produs", "costa", "procedură"]}}]
    matcher.add("retur_pattern", [pattern5])
    matches=matcher(doc)
    print("Matches:", [doc[start:end].text for match_id, start, end in matches])
    matches1 = ([doc[start:end].text for match_id, start, end in matches]) 
    if token.text and "procedura" in matches1:
      return "Aveți întotdeauna dreptul de a anula comanda în termen de 30 zile, fără invocarea vreunui motiv. Dacă doriți să returnați ceva vă rugam accesați acest link https://www2.hm.com/ro_ro/customer-service/returns.html. "
    elif "costa" or "costul" in matches1:
      return "Membrii programului de loialitate H&M beneficiază de returnare gratauită. În caz contrar returul dumneavoastră va costa 4,90 LEI. Această sumă va fi scăzută din suma care vă va fi restituită."


@app.route('/ghidMarimi', methods=['POST', 'GET'])
def ghidMarimi():
  data2 = request.data
  stringData=data2.decode("utf-8")
  objectData=json.loads(stringData)
  userText=objectData.get('body')
  piept=int(userText.split(',')[0])
  solduri=int(userText.split(',')[1])
  talie=int(userText.split(',')[2])
  for marime in marimi:
    if piept >= solduri:
      if marime.get("piept").get("dela") <= piept <= marime.get("piept").get("panala"):
        return "Mărimea potrivită pentru dumneavoastră este " + marime.get("marime")
      else:
        return "Ne pare rau, nu putem găsi o mărime ideală."
    elif solduri >= piept:
      if marime.get("solduri").get("dela") <= solduri <= marime.get("solduri").get("panala"):
        return "Mărimea potrivită pentru dumneavoastră este " + marime.get("marime")
      else:
        return "Ne pare rau, nu putem găsi o mărime ideală."
    elif talie >= piept or talie >= solduri:
      if marime.get("talie").get("dela") <= talie <= marime.get("talie").get("panala"):
        print("talie", marime.get("marime"))
        return "Mărimea potrivită pentru dumneavoastră este " + marime.get("marime")
      else:
        return "Ne pare rau, nu putem găsi o mărime ideală."
    else:
      return "Ne pare rau, nu putem găsi o mărime ideală."


# @app.route("/alteIntrebari", methods=['POST', 'GET'])
# def alteIntrebari():
#   data4 = request.data
#   stringData=data4.decode("utf-8")
#   objectData=json.loads(stringData)
#   userText=objectData.get('body')
#     doc = nlp(str(userText))
#     for token in doc:
#       matcher=Matcher(nlp.vocab)
#       pattern6=[{"LEMMA": {"IN": ["", "", ""]}}]
#       matcher.add("detalii_pattern", [pattern6])
#       matches=matcher(doc)
#       print("Matches:", [doc[start:end].text for match_id, start, end in matches])
#       matches1 = ([doc[start:end].text for match_id, start, end in matches]) 

#Member Api route
@app.route('/members', methods=['GET'])
def members():
  return {"members": ["member1", "member2", "member3"]}

if __name__ == '__main__':
  app.run(debug=True)


