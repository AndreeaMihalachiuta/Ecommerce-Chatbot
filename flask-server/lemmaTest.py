import spacy
import nltk
lemmatizer = nltk.stem.WordNetLemmatizer()
from spacy.lang.ro.examples import sentences
nlp=spacy.load("ro_core_news_sm")
doc=nlp("procedura")
print(doc.text)
for token in doc:
    print(token, token.text, token.lemma_, token.pos_, token.dep_)
#
