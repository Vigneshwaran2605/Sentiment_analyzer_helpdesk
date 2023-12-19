from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import speech_recognition as sr
from langid.langid import LanguageIdentifier, model
from googletrans import Translator

def detect_language(text):
    identifier = LanguageIdentifier.from_modelstring(model, norm_probs=True)
    lang, _ = identifier.classify(text)
    return lang
def translate_text(text, target_language='en'):
    translator = Translator()
    translation = translator.translate(text, dest=target_language)
    return translation.text
def analyze_sentiment(audio_file_path):
    recognizer = sr.Recognizer()
    res ={}
    try:
        with sr.AudioFile(audio_file_path) as source:
            print('Clearing background noise...')
            recognizer.adjust_for_ambient_noise(source, duration=1)
            print('Processing audio file...')
            recorded_audio = recognizer.record(source)
        text = recognizer.recognize_google(recorded_audio, language='en-US')
        t_text = translate_text(text)
        res["tts"] = t_text
        print('Transcribed message: {}'.format(t_text))
        analyser = SentimentIntensityAnalyzer()
        sentiment_scores = analyser.polarity_scores(t_text)
        print('Sentiment Scores:', sentiment_scores)
        res["score"] = sentiment_scores
        positive = sentiment_scores['pos']
        negative = sentiment_scores['neg']
        neutral = sentiment_scores['neu']
        compound = sentiment_scores['compound']
        if positive>neutral and positive>negative:
            res["emo"] = "Positive"
        elif negative>neutral :
            res["emo"] = "Negative"
        else:
            res["emo"] = "Neutral"

        return res
    except Exception as ex:
        return ex

