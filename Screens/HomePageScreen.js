import {
  AppRegistry,
  Button,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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

import AsyncStorage from '@react-native-community/async-storage';
import BackgroundJob from 'react-native-background-job';
import FlashMessage from 'react-native-flash-message';
import Geolocation from 'react-native-geolocation-service';
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
const prayTimes = new PrayerTimes();
const HomePageScreen = () => {
  const [locationPermission, setLocationPermission] = useState(false);
  const dispatch = useDispatch();
  const autoFetch = useSelector((state) => state.autoFetch);
  useEffect(() => {
    const check = async () => {
      setLocationPermission(await check_permission());
    };
    check();
  }, []);

  const check_permission = async () => {
    return await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    );
  };
  const getLocationPermission = async () => {
    setLocationPermission(
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ),
    );
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/* <SafeAreaView> */}
      <LinearGradient
        colors={['#6e20e9', '#502fe9', '#8e20e9', '#206fe9', '#164da3']}
        style={styles.linearGradient}>
        <Text style={styles.titleHeading}>Namaz App</Text>

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Text style={styles.titleHeading2}>Enter Timings</Text>

          <TimingTable checkEnabled={() => checkEnabled()} />

          <Button
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
          />
          <Button
            title={'getLocation'}
            onPress={async () => {
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
            }}
          />
          <Button
            title={'calculate'}
            onPress={() => {
              const prayTimes = new PrayerTimes();
              console.log(
                prayTimes.getTimes(
                  new Date(),
                  [24.860735, 67.001137],
                  'auto',
                  'auto',
                  '24h',
                ),
              );
            }}
          />
          <Button
            title={'check'}
            onPress={async () => {
              await dispatch(setAutoFetchTrue());
              console.log(autoFetch);
            }}
          />
        </ScrollView>
        <FlashMessage position="top" animated={true} />
      </LinearGradient>
      {/* </SafeAreaView> */}
    </>
  );
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

const stopService = () => {
  BackgroundJob.cancelAll()
    .then(async () => {
      await AsyncStorage.setItem('isFajrEnabled', 'false');
      console.log('Succesfully Stopped Services');
    })
    .catch((err) => console.err(err));
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
    backgroundColor: Colors.lighter,
    textAlign: 'center',
    marginTop: hp('5%'),
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
    textAlign: 'center',
    fontSize: hp('5%'),
    color: 'white',
    marginTop: hp('5%'),
  },
  titleHeading2: {
    textAlign: 'center',
    fontSize: hp('3%'),
    // color: 'white',
    marginVertical: hp('3%'),
  },
});

export default HomePageScreen;
