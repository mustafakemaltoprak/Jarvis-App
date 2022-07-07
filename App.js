import React, {useEffect} from 'react';
import Tts from 'react-native-tts';

Tts.setDefaultLanguage('en-GB');
Tts.setDefaultVoice('com.apple.ttsbundle.Daniel-compact');

import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

import Voice from 'react-native-voice';
import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';

const App = () => {
  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
  }, []);
  const onSpeechResults = async e => {
    try {
      let transcript = e.value.toString().split(' ');
      console.log(transcript);
      if (
        transcript.includes('jarvis') ||
        transcript.includes('Jarvis') ||
        transcript.includes('travis') ||
        transcript.includes('Travis') ||
        transcript.includes('java') ||
        transcript.includes('Java') ||
        transcript.includes('Chavez') ||
        transcript.includes('chavez') ||
        transcript.includes('Chaviz') ||
        transcript.includes('chaviz') ||
        transcript.includes('jobs') ||
        transcript.includes('Jobs') ||
        transcript.includes('Travellers') ||
        transcript.includes('travellers') ||
        transcript.includes('Giannis') ||
        transcript.includes('giannis') ||
        transcript.includes('Jonas') ||
        transcript.includes('jonas') ||
        transcript.includes('Jones') ||
        transcript.includes('jones')
      ) {
        if (
          (transcript.includes('lights') || transcript.includes('light')) &&
          transcript.includes('off')
        ) {
          turnLightOff();
          Tts.speak('I turned the lights off sir');
          Voice.destroy();
          return;
        } else if (
          (transcript.includes('lights') || transcript.includes('light')) &&
          transcript.includes('on')
        ) {
          turnLightOn(133, 1, 250);
          Tts.speak('I turned the lights on sir');
          Voice.destroy();
          return;
        } else if (
          (transcript.includes('lights') || transcript.includes('light')) &&
          transcript.includes('red')
        ) {
          turnLightOn(1, 250, 250);
          Tts.speak('Your lights are now red sir');
          Voice.destroy();
          return;
        } else if (
          (transcript.includes('lights') || transcript.includes('light')) &&
          transcript.includes('green')
        ) {
          turnLightOn(27306, 250, 250);
          Tts.speak('Your lights are now green sir');
          Voice.destroy();
          return;
        } else if (
          (transcript.includes('lights') || transcript.includes('light')) &&
          transcript.includes('white')
        ) {
          turnLightOn(133, 1, 250);
          Tts.speak('Your lights are now white sir');
          Voice.destroy();
          return;
        } else if (
          (transcript.includes('lights') || transcript.includes('light')) &&
          transcript.includes('blue')
        ) {
          turnLightOn(43690, 250, 250);
          Tts.speak('Your lights are now blue sir');
          Voice.destroy();
          return;
        } else if (
          (transcript.includes('lights') || transcript.includes('light')) &&
          transcript.includes('purple')
        ) {
          turnLightOn(50000, 250, 250);
          Tts.speak('Your lights are now purple sir');
          Voice.destroy();
          return;
        } else if (
          (transcript.includes('lights') || transcript.includes('light')) &&
          transcript.includes('pink')
        ) {
          turnLightOn(55000, 250, 250);
          Tts.speak('Your lights are now pink sir');
          Voice.destroy();
          return;
        } else if (transcript.includes('weather')) {
          fetch(
            'http://api.weatherapi.com/v1/current.json?key=140ce0a35d6c4beab4f213625221404&q=Berlin&aqi=yes',
          )
            .then(res => res.json())
            .then(result =>
              Tts.speak(
                `It's ${result.current.temp_c} degrees Celsius in Berlin sir.`,
              ),
            );
          Voice.destroy();
          return;
        } else if (
          transcript.includes('stop') &&
          transcript.includes('listening')
        ) {
          Tts.speak('I will stop listening sir');
          Voice.destroy();
          return;
        } else if (
          transcript.includes('remind') &&
          transcript.includes('me') &&
          transcript.includes('that') &&
          transcript.includes('I') &&
          transcript.some(e =>
            /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(e),
          ) &&
          transcript.includes('PM' || 'AM')
        ) {
          await notifee.requestPermission();

          const date = new Date(Date.now());

          let forTts = '';

          const convertTime12to24 = time12h => {
            let [hours, minutes] = time12h.split(':');

            if (hours === '12') {
              hours = '00';
            }

            if (transcript.includes('PM')) {
              hours = parseInt(hours, 10) + 12;
            }

            return `${hours}:${minutes}`;
          };

          function setDate() {
            let matches = transcript.filter(el =>
              /^(0?[1-9]|1[0-2]):[0-5][0-9]$/.test(el),
            );

            let getTimes = convertTime12to24(matches[0]);

            forTts = convertTime12to24(matches[0]);

            let times = getTimes.split(':');

            date.setHours(times[0]);
            date.setMinutes(times[1]);
          }

          setDate();

          let arrayIntoString = transcript.join(' ');

          let reminderWord = arrayIntoString.substring(
            arrayIntoString.lastIndexOf('I'),
            arrayIntoString.lastIndexOf('at') - 1,
          );

          const trigger: TimestampTrigger = {
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

          Voice.destroy();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startRecognizing = async () => {
    try {
      await Voice.start('en-US');
      Tts.speak('How may I help you sir?');
      console.log('recording');
    } catch (e) {
      console.error(e);
    }
  };

  function turnLightOn(hue, sat, bri) {
    fetch(
      // ADD YOUR PERSONAL PHILIPS HUE LIGHTS LINK HERE, CHECK READ ME FOR HELP
      'link here',
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
    ).then(res => res.json());
  }

  function turnLightOff() {
    fetch(
      // ADD YOUR PERSONAL PHILIPS HUE LIGHTS LINK HERE, CHECK READ ME FOR HELP
      'link here',
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({on: false}),
      },
    ).then(res => res.json());
  }

  // async function giveNotification() {
  //   await notifee.requestPermission();
  //   await notifee.displayNotification({
  //     title: 'hello',
  //     body: 'world',
  //   });
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TouchableHighlight onPress={startRecognizing}>
          <Image
            style={styles.imageButton}
            source={{
              uri: 'http://sfwallpaper.com/images/iron-man-chest-piece-wallpaper-6.jpg',
            }}
          />
        </TouchableHighlight>
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
  },
});
