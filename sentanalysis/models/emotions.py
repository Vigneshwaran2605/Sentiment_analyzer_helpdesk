from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import speech_recognition as sr
recognizer=sr.Recognizer()
with sr.Microphone() as source:
    print('Clearing background noise...')
    recognizer.adjust_for_ambient_noise(source,duration=1)
    print('Waiting for your message...')
    recordedaudio=recognizer.listen(source)
    print('Done recording..')

try:
    print('Printing the message..')
    text=recognizer.recognize_google(recordedaudio,language='en-US')
    print('Your message:{}'.format(text))
except Exception as ex:
    print(ex)

#Sentiment analysis

Sentence=[str(text)]
analyser=SentimentIntensityAnalyzer()
for i in Sentence:
    v=analyser.polarity_scores(i)
    print(v)
    positive = v['pos']
    negative = v['neg']
    neutral = v['neu']
    compound = v['compound']
    if positive>neutral and positive>negative:
        print("Positive")
    elif negative>neutral :
        print("Negative")
    else:
        print("Neutral")