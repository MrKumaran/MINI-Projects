import pyttsx3 as tts
'''
engine = tts.init()
engine.say('Sally sells seashells by the seashore.')
engine.say('The quick brown fox jumped over the lazy dog.')
engine.runAndWait()
'''
engine = tts.init()
voices = engine.getProperty('voices')
for voice in voices:
    print(voice.id)
    engine.setProperty('voice', voice.id)
    engine.say('The quick brown fox jumped over the lazy dog.')
engine.runAndWait()