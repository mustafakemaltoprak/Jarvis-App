import React, {useEffect, useState} from 'react';
import Tts from 'react-native-tts';

Tts.setDefaultLanguage('en-GB');
Tts.setDefaultVoice('com.apple.ttsbundle.Daniel-compact');

import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Text,
} from 'react-native';

import Voice from 'react-native-voice';
import notifee, {TriggerType} from '@notifee/react-native';

const App = () => {
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);

  async function turnLightOn(hue, sat, bri) {
    await fetch(
      // ADD YOUR PERSONAL PHILIPS HUE LIGHTS LINK HERE, CHECK READ ME FOR HELP
      '',
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          on: true,
          ...(sat && {sat}),
          ...(bri && {bri}),
          ...(hue && {hue}),
        }),
      },
    );
  }

  async function turnLightOff() {
    await fetch(
      // ADD YOUR PERSONAL PHILIPS HUE LIGHTS LINK HERE, CHECK READ ME FOR HELP
      '',
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({on: false}),
      },
    );
  }

  const onSpeechStart = e => {
    setStarted('True');
  };

  const onSpeechEnd = () => {
    setStarted(null);
    setEnd('True');
  };

  const onSpeechError = e => {
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = async e => {
    setResults(e.value);
    console.log(e.value);
    let newTranscript = e.value[0].replace(
      /travis|java|chavez|jobs|travellers|elvis|charles|jarvis/i,
      'Jarvis',
    );
    let ttsTranscript = newTranscript.split(' ');

    if (newTranscript.includes('Jarvis')) {
      if (
        (newTranscript.includes('lights') || newTranscript.includes('light')) &&
        newTranscript.includes('off')
      ) {
        turnLightOff();
        await stopSpeechRecognizing();
        Tts.speak('I turned the lights off sir');
        return;
      } else if (
        (newTranscript.includes('lights') || newTranscript.includes('light')) &&
        newTranscript.includes('on')
      ) {
        turnLightOn(133, 1, 250);
        await stopSpeechRecognizing();
        Tts.speak('I turned the lights on sir');
        return;
      } else if (
        (newTranscript.includes('lights') || newTranscript.includes('light')) &&
        newTranscript.includes('red')
      ) {
        turnLightOn(1, 250, 250);
        await stopSpeechRecognizing();
        Tts.speak('Your lights are now red sir');
        return;
      } else if (
        (newTranscript.includes('lights') || newTranscript.includes('light')) &&
        newTranscript.includes('green')
      ) {
        turnLightOn(27306, 250, 250);
        await stopSpeechRecognizing();
        Tts.speak('Your lights are now green sir');
        return;
      } else if (
        (newTranscript.includes('lights') || newTranscript.includes('light')) &&
        newTranscript.includes('white')
      ) {
        turnLightOn(133, 1, 250);
        await stopSpeechRecognizing();
        Tts.speak('Your lights are now white sir');
        return;
      } else if (
        (newTranscript.includes('lights') || newTranscript.includes('light')) &&
        newTranscript.includes('blue')
      ) {
        turnLightOn(43690, 250, 250);
        await stopSpeechRecognizing();
        Tts.speak('Your lights are now blue sir');
        return;
      } else if (
        (newTranscript.includes('lights') || newTranscript.includes('light')) &&
        newTranscript.includes('purple')
      ) {
        turnLightOn(50000, 250, 250);
        await stopSpeechRecognizing();
        Tts.speak('Your lights are now purple sir');
        return;
      } else if (
        (newTranscript.includes('lights') || newTranscript.includes('light')) &&
        newTranscript.includes('pink')
      ) {
        turnLightOn(55000, 250, 250);
        await stopSpeechRecognizing();
        Tts.speak('Your lights are now pink sir');
        return;
      } else if (
        (ttsTranscript.includes('remind') &&
          ttsTranscript.includes('me') &&
          ttsTranscript.includes('that') &&
          ttsTranscript.includes('I') &&
          ttsTranscript.some(tq =>
            /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(tq),
          ) &&
          ttsTranscript.includes('PM')) ||
        ttsTranscript.includes('AM')
      ) {
        await notifee.requestPermission();

        const date = new Date(Date.now());

        let forTts = '';

        const convertTime12to24 = time12h => {
          let [hours, minutes] = time12h.split(':');

          if (hours === '12') {
            hours = '00';
          }

          if (ttsTranscript.includes('PM')) {
            hours = parseInt(hours, 10) + 12;
          }

          return `${hours}:${minutes}`;
        };

        function setDate() {
          let matches = ttsTranscript.filter(el =>
            /^(0?[1-9]|1[0-2]):[0-5][0-9]$/.test(el),
          );

          let getTimes = convertTime12to24(matches[0]);

          forTts = convertTime12to24(matches[0]);

          let times = getTimes.split(':');

          date.setHours(times[0]);
          date.setMinutes(times[1]);
        }

        setDate();

        let arrayIntoString = ttsTranscript.join(' ');

        let reminderWord = arrayIntoString.substring(
          arrayIntoString.lastIndexOf('I'),
          arrayIntoString.lastIndexOf('at') - 1,
        );

        const trigger = {
          type: TriggerType.TIMESTAMP,
          timestamp: date.getTime(),
        };

        await notifee.createTriggerNotification(
          {
            title: 'Jarvis',
            body: reminderWord,
          },
          trigger,
        );

        Tts.speak(`Reminder ${reminderWord} is set for ${forTts} sir`);

        await stopSpeechRecognizing();
      } else if (
        newTranscript.includes('stop') &&
        newTranscript.includes('listening')
      ) {
        await stopSpeechRecognizing();
        return;
      }
    }
  };

  const onSpeechPartialResults = e => {
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = e => {
    setPitch(e.value);
  };

  const startSpeechRecognizing = async () => {
    console.log('start');
    setPitch('');
    setError('');
    setStarted('');
    setResults([]);
    setPartialResults([]);
    setEnd('');
    try {
      await Voice.start('en-US', {
        EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 10000,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const stopSpeechRecognizing = async () => {
    try {
      await Voice.stop();
      setStarted(null);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TouchableHighlight onPress={startSpeechRecognizing}>
          <Image
            style={styles.imageButton}
            source={{
              uri: 'http://sfwallpaper.com/images/iron-man-chest-piece-wallpaper-6.jpg',
            }}
          />
        </TouchableHighlight>
        <Text style={styles.textColor}>{results}</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'black',
  },
  imageButton: {
    width: 225,
    height: 225,
    marginBottom: 100,
  },
  textColor: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
});
