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

const App = () => {
  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
  }, []);
  const onSpeechResults = async e => {
    try {
      let transcript = e.value.toString().split(' ');

      if (
        transcript.includes('jarvis') ||
        transcript.includes('Jarvis') ||
        transcript.includes('travis') ||
        transcript.includes('Travis') ||
        transcript.includes('java') ||
        transcript.includes('Java') ||
        transcript.includes('Chavez') ||
        transcript.includes('chavez') ||
        transcript.includes('jobs') ||
        transcript.includes('Jobs') ||
        transcript.includes('Travellers') ||
        transcript.includes('travellers')
      ) {
        if (
          (transcript.includes('lights') || transcript.includes('light')) &&
          transcript.includes('off')
        ) {
          turnLightOff();
          Tts.speak('I turned the lights off sir');
          return;
        } else if (
          (transcript.includes('lights') || transcript.includes('light')) &&
          transcript.includes('on')
        ) {
          turnLightOn(133, 1, 250);
          Tts.speak('I turned the lights on sir');
          return;
        } else if (
          (transcript.includes('lights') || transcript.includes('light')) &&
          transcript.includes('red')
        ) {
          turnLightOn(1, 250, 250);
          Tts.speak('Your lights are now red sir');
          return;
        } else if (
          (transcript.includes('lights') || transcript.includes('light')) &&
          transcript.includes('green')
        ) {
          turnLightOn(27306, 250, 250);
          Tts.speak('Your lights are now green sir');
          return;
        } else if (
          (transcript.includes('lights') || transcript.includes('light')) &&
          transcript.includes('white')
        ) {
          turnLightOn(133, 1, 250);
          Tts.speak('Your lights are now white sir');
          return;
        } else if (
          (transcript.includes('lights') || transcript.includes('light')) &&
          transcript.includes('blue')
        ) {
          turnLightOn(43690, 250, 250);
          Tts.speak('Your lights are now blue sir');
          return;
        } else if (
          (transcript.includes('lights') || transcript.includes('light')) &&
          transcript.includes('purple')
        ) {
          turnLightOn(50000, 250, 250);
          Tts.speak('Your lights are now purple sir');
          return;
        } else if (
          (transcript.includes('lights') || transcript.includes('light')) &&
          transcript.includes('pink')
        ) {
          turnLightOn(55000, 250, 250);
          Tts.speak('Your lights are now pink sir');
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
          return;
        } else if (
          transcript.includes('stop') &&
          transcript.includes('listening')
        ) {
          Tts.speak('I will stop listening sir');
          Voice.cancel();
          return;
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
      process.env.PHILIPS_API_LINK,
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
      process.env.PHILIPS_API_LINK,
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
});
