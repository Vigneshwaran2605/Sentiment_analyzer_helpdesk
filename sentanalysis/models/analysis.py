from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import speech_recognition as sr
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
        res["tts"] = text
        print('Transcribed message: {}'.format(text))
        analyser = SentimentIntensityAnalyzer()
        sentiment_scores = analyser.polarity_scores(text)
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

