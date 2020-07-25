import {
  AppRegistry,
  ImageBackground,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {setAutoFetchTrue, setTimings} from '../actions';
import {useDispatch, useSelector} from 'react-redux';

import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import BackgroundJob from 'react-native-background-job';
import FlashMessage from 'react-native-flash-message';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
import PrayerTimes from 'prayer-times';
import SystemSetting from 'react-native-system-setting';
import TimingTable from '../Components/TimingTable';
import {showMessage} from 'react-native-flash-message';

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

const regularJobKey = 'regularJobKey';
const everRunningJobKey = 'everRunningJobKey';

const image = require('../assets/bg.jpg');

BackgroundJob.register({
  jobKey: regularJobKey,
  job: async () => {
    console.log(`Background Job fired!. Key = ${regularJobKey}`);
    // console.log('checkingg', await checkEnabled());
    if (await checkEnabled()) {
      console.log(await is_mute());
      const valid = await checkTimeBetween();
      console.log(valid);
      if (valid) {
        if (!(await is_mute())) volume_off();
        // await AsyncStorage.setItem('is_muted', true);
      } else if (!valid) {
        // await AsyncStorage.setItem('is_muted', false);
        volume_on();
      }
    } else {
      console.log('Service Stopped Because Nothing is Enabled');

      stopService();
    }
  },
});
const stopService = () => {
  BackgroundJob.cancelAll()
    .then(async () => {
      await AsyncStorage.setItem('isFajrEnabled', 'false');
      await AsyncStorage.setItem('isZuhrEnabled', 'false');
      await AsyncStorage.setItem('isAsarEnabled', 'false');
      await AsyncStorage.setItem('isMaghribEnabled', 'false');
      await AsyncStorage.setItem('isEshaEnabled', 'false');
      console.log('Succesfully Stopped Services');
    })
    .catch((err) => console.err(err));
};
const prayTimes = new PrayerTimes();

const startService = () => {
  BackgroundJob.cancelAll()
    .then(async () => {
      if (await checkEnabled()) {
        BackgroundJob.schedule({
          jobKey: regularJobKey,
          notificationTitle: 'Notification title',
          notificationText: 'Notification text',
          period: 5000,
        });
        console.log('service Started');
      }
    })
    .catch(async (err) => {
      console.log(err);
      await AsyncStorage.setItem('isFajrEnabled', 'false');
      await AsyncStorage.setItem('isZuhrEnabled', 'false');
      await AsyncStorage.setItem('isAsarEnabled', 'false');
      await AsyncStorage.setItem('isMaghribEnabled', 'false');
      await AsyncStorage.setItem('isEshaEnabled', 'false');
    });
};

const HomePageScreen = () => {
  const [locationPermission, setLocationPermission] = useState(false);
  const [
    locationPermissionExecution,
    setLocationPermissionExecution,
  ] = useState(false);
  const dispatch = useDispatch();
  const autoFetch = useSelector((state) => state.autoFetch);
  useEffect(() => {
    const check = async () => {
      setLocationPermission(await check_permission());
    };
    check();
  }, []);
  useEffect(() => {
    if (locationPermissionExecution) {
      fetchFunction();
      setLocationPermissionExecution(false);
    }
  }, [locationPermissionExecution]);

  useEffect(() => {
    if (checkEnabled()) {
      startService();
    } else {
      stopService();
    }
  }, []);

  const check_permission = async () => {
    return await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    );
  };
  const getLocationPermission = async () => {
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    );
    setLocationPermission(status === 'granted');
    setLocationPermissionExecution(true);
  };

  const fetchFunction = async () => {
    if (locationPermission) {
      Geolocation.getCurrentPosition(
        async (position) => {
          console.log('position');
          // console.log(position);

          const timing = prayTimes.getTimes(
            new Date(),
            [position.coords.latitude, position.coords.longitude],
            'auto',
            'auto',
            '24h',
          );
          await dispatch(setTimings(timing));
          await dispatch(setAutoFetchTrue());
          showMessage({
            message: 'Info',
            description:
              'These are Suggested Timings. Kindly Set According to your Preferences',
            type: 'success',
          });
        },
        (error) => {
          // See error code charts below.
          showMessage({
            message: 'Error',
            description: 'Restart App and Try Again',
            type: 'danger',
          });
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 1000,
          forceRequestLocation: true,
        },
      );
    } else {
      showMessage({
        message: 'Info',
        description: 'Kindly Allow Location Permission',
        type: 'info',
      });
      await getLocationPermission();
    }
  };
  return (
    <>
      <StatusBar barStyle="light-content" />
      {/* <SafeAreaView> */}
      <LinearGradient
        colors={['#000', '#000']}
        // colors={['#6e20e9', '#502fe9', '#8e20e9', '#206fe9', '#164da3']}
        style={styles.linearGradient}>
        <ImageBackground
          source={image}
          style={styles.linearGradient}
          imageStyle={styles.bkimg}>
          <Text style={styles.titleHeading}>Naiki</Text>

          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Text style={styles.titleHeading2}>Enter Timings</Text>

            <TimingTable
              checkEnabled={() => checkEnabled()}
              startService={() => startService()}
            />

            {/* <Button
              title={' New Service On'}
              onPress={() => {
                BackgroundJob.schedule({
                  jobKey: regularJobKey,
                  notificationTitle: 'Notification title',
                  notificationText: 'Notification text',
                  period: 5000,
                });
              }}
            />
            <Button
              title={'New Service Off'}
              onPress={() => {
                BackgroundJob.cancel({jobKey: regularJobKey});
              }}
            /> */}
            <Button
              title={'Auto Fetch Timings'}
              onPress={async () => {
                await fetchFunction();
              }}
              buttonStyle={styles.button}
              // titleStyle={{color: 'black'}}
              icon={
                <Icon
                  name="magic"
                  size={15}
                  color="white"
                  style={{marginRight: 5}}
                />
              }
              // raised={true}
            />
          </ScrollView>
          <FlashMessage position="top" animated={true} />
        </ImageBackground>
      </LinearGradient>
      {/* </SafeAreaView> */}
    </>
  );
};

const volume_on = async () => {
  console.log('Volume On');
  var volume = parseFloat(await AsyncStorage.getItem('savedVolume'));
  SystemSetting.setVolume(volume, {
    type: 'ring',
    playSound: false,
    showUI: false,
  });
};
const volume_off = () => {
  console.log('Volume Off');
  SystemSetting.getVolume('ring')
    .then(async (volume) => {
      console.log('tobeSvae', volume);
      await AsyncStorage.setItem('savedVolume', volume.toString());
      SystemSetting.setVolume(0, {
        type: 'ring',
        playSound: false,
        showUI: false,
      });
    })
    .catch((err) => console.log(err));
};

const is_mute = () => {
  return SystemSetting.getVolume('ring').then((volume) => {
    // console.log(volume * 100);
    if (volume > 0.0) {
      return false;
    } else {
      return true;
    }
  });

  // .then((value) => console.log(""value));
};
const checkEnabled = async () => {
  var isEnabled1 = (await AsyncStorage.getItem('isFajrEnabled')) == 'true';
  var isEnabled2 = (await AsyncStorage.getItem('isZuhrEnabled')) == 'true';
  var isEnabled3 = (await AsyncStorage.getItem('isAsarEnabled')) == 'true';
  var isEnabled4 = (await AsyncStorage.getItem('isMaghribEnabled')) == 'true';
  var isEnabled5 = (await AsyncStorage.getItem('isEshaEnabled')) == 'true';
  return isEnabled1 || isEnabled2 || isEnabled3 || isEnabled4 || isEnabled5;
};
const checkTimeBetween = async () => {
  var valid = false;
  var currentDate = new Date();
  var isEnabled1 = (await AsyncStorage.getItem('isFajrEnabled')) == 'true';
  var isEnabled2 = (await AsyncStorage.getItem('isZuhrEnabled')) == 'true';
  var isEnabled3 = (await AsyncStorage.getItem('isAsarEnabled')) == 'true';
  var isEnabled4 = (await AsyncStorage.getItem('isMaghribEnabled')) == 'true';
  var isEnabled5 = (await AsyncStorage.getItem('isEshaEnabled')) == 'true';
  // console.log('E1', isEnabled1);
  // console.log('E2', isEnabled2);
  // console.log('E3', isEnabled3);
  // console.log('E4', isEnabled4);
  // console.log('E5', isEnabled5);
  if (isEnabled1) {
    var startDate = new Date(await AsyncStorage.getItem('fajrStart'));
    var endDate = new Date(await AsyncStorage.getItem('fajrEnd'));
    // endDate.setSeconds(0);
    if (startDate && endDate) {
      var temp = startDate < currentDate && endDate > currentDate;
      valid = valid || temp;
    }
  }
  if (isEnabled2) {
    var startDate = new Date(await AsyncStorage.getItem('zuhrStart'));
    var endDate = new Date(await AsyncStorage.getItem('zuhrEnd'));
    // endDate.setSeconds(0);
    if (startDate && endDate) {
      var temp = startDate < currentDate && endDate > currentDate;
      valid = valid || temp;
    }
  }
  if (isEnabled3) {
    var startDate = new Date(await AsyncStorage.getItem('asarStart'));
    var endDate = new Date(await AsyncStorage.getItem('asarEnd'));
    // endDate.setSeconds(0);
    if (startDate && endDate) {
      var temp = startDate < currentDate && endDate > currentDate;
      valid = valid || temp;
    }
  }
  if (isEnabled4) {
    var startDate = new Date(await AsyncStorage.getItem('maghribStart'));
    var endDate = new Date(await AsyncStorage.getItem('maghribEnd'));
    // endDate.setSeconds(0);
    if (startDate && endDate) {
      var temp = startDate < currentDate && endDate > currentDate;
      valid = valid || temp;
    }
  }
  if (isEnabled5) {
    var startDate = new Date(await AsyncStorage.getItem('eshaStart'));
    var endDate = new Date(await AsyncStorage.getItem('eshaEnd'));
    // endDate.setSeconds(0);
    if (startDate && endDate) {
      var temp = startDate < currentDate && endDate > currentDate;
      valid = valid || temp;
    }
  }
  return valid;
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
    textAlign: 'center',
    marginTop: hp('1%'),
    borderTopLeftRadius: hp('5%'),
    borderTopRightRadius: hp('5%'),
    flex: 1,
    // paddingTop: hp('5%'),
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  linearGradient: {
    flex: 1,
  },
  titleHeading: {
    textAlign: 'left',
    fontSize: hp('4%'),
    color: 'white',
    marginTop: hp('10%'),
    marginLeft: wp('6%'),
  },
  titleHeading2: {
    textAlign: 'center',
    fontSize: hp('3%'),
    // color: 'white',
    marginVertical: hp('3%'),
  },
  bkimg: {
    height: hp('18%'),
  },
  button: {
    width: wp('80%'),
    color: 'black',
    marginHorizontal: wp('10%'),
    marginVertical: hp('1%'),
    backgroundColor: '#f3b52e',
    borderRadius: wp('5%'),
  },
});

export default HomePageScreen;
