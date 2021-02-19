import React, {useEffect, useRef} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  AppState,
  AppStateStatus,
} from 'react-native';

const image = require('./assets/images/galaxy.jpg');
import FullScreen from './util/FullScreen';

const App = () => {
  const appState = useRef(AppState.currentState);

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // console.log('app has come to foreground');
      FullScreen.enable();
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    FullScreen.enable();
    // console.log(appState.current);
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View>
          <Text style={styles.text}>React Native is Bad</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'Karla-Light',
    fontSize: 42,
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
});

export default App;
