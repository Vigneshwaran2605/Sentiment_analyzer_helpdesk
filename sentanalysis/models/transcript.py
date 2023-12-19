import langid
from translate import Translator

def detect_language(text):
    detected_language, _ = langid.classify(text)
    return detected_language

def translate_text(text, target_language='en'):
    detected_language = detect_language(text)
    
    # if detected_language == target_language:
    #     # Text is already in the target language, no need to translate
    #     return text
    
    translator = Translator(to_lang=target_language)
    translated_text = translator.translate(text)
    return translated_text


