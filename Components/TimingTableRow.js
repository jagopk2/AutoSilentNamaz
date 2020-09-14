import {
  AppRegistry,
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
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import AsyncStorage from '@react-native-community/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Switch from 'react-native-full-switch';
import {setAutoFetchFalse} from '../actions';
import {showMessage} from 'react-native-flash-message';

const TimingTableRow = ({namazName, startService}) => {
  const autoFetch = useSelector((state) => state.autoFetch);
  const timings = useSelector((state) => state.timings);
  const dispatch = useDispatch();
  const [namazStart, setNamazStart] = useState(null);
  const [namazEnd, setNamazEnd] = useState(null);
  const [isNamazEnabled, setIsNamazEnabled] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [changeWho, setChangeWho] = useState(0);

  useEffect(() => {
    const setItems = async () => {
      await AsyncStorage.setItem(namazName + 'Start', myStartDate.toString());
      setNamazStart(new Date(myStartDate));
      await AsyncStorage.setItem(namazName + 'End', myEndDate.toString());
      setNamazEnd(new Date(myEndDate));
    };
    if (autoFetch) {
      var hour = 0;
      var minute = 0;
      switch (namazName) {
        case 'fajr':
          // console.log(timings.fajr);
          hour = timings.fajr.toString().slice(0, 2);
          minute = timings.fajr.toString().slice(3, 5);
          // console.log(timings);
          break;
        case 'zuhr':
          hour = timings.dhuhr.toString().slice(0, 2);
          minute = timings.dhuhr.toString().slice(3, 5);
          break;
        case 'asar':
          hour = timings.asr.toString().slice(0, 2);
          minute = timings.asr.toString().slice(3, 5);
          break;
        case 'maghrib':
          hour = timings.maghrib.toString().slice(0, 2);
          minute = timings.maghrib.toString().slice(3, 5);
          break;
        case 'esha':
          hour = timings.isha.toString().slice(0, 2);
          minute = timings.isha.toString().slice(3, 5);
          break;

        default:
          break;
      }
      const autoNamazTime = new Date();
      autoNamazTime.setHours(parseInt(hour));
      autoNamazTime.setMinutes(parseInt(minute));
      var MS_PER_MINUTE = 60000;
      var myStartDate = new Date(autoNamazTime - 30 * MS_PER_MINUTE);
      var myEndDate = new Date(autoNamazTime.getTime() + 30 * MS_PER_MINUTE);
      // console.log(myStartDate.toString());
      // console.log(autoNamazTime.toString());
      // console.log(myEndDate.toString());
      // console.log('////////////');
      setItems();
      dispatch(setAutoFetchFalse());
    }
  }, [autoFetch]);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const handleConfirm = async (date) => {
    // console.warn('A date has been picked: ', date);
    hideDatePicker();
    // setFajrStart(new Date(date));
    switch (changeWho) {
      case 1:
        await AsyncStorage.setItem(namazName + 'Start', date.toString());
        setNamazStart(new Date(date));
        break;
      case 2:
        if (new Date(date) > namazStart) {
          var diff = Math.floor(
            Math.abs(new Date(date) - namazStart) / 1000 / 60,
          );
          console.log(diff);
          if (diff > 19) {
            await AsyncStorage.setItem(namazName + 'End', date.toString());
            setNamazEnd(new Date(date));
          } else {
            showMessage({
              message: 'Error',
              description:
                'There Should be 20 minutes difference between start time and end time',
              type: 'danger',
            });
          }
        } else {
          showMessage({
            message: 'Error',
            description: 'Wrong Time Entered',
            type: 'danger',
          });
          console.log('Wrong End Time ');
        }

        // setFajrEnd(new Date(date));
        break;

      default:
        setChangeWho(0);
        break;
    }
    setChangeWho(0);

    console.log(await AsyncStorage.getAllKeys());
  };

  useEffect(() => {
    AsyncStorage.getItem(namazName + 'Start').then((date) => {
      if (date) {
        setNamazStart(new Date(date));
      }
    });
  }, []);
  useEffect(() => {
    AsyncStorage.getItem(namazName + 'End').then((date) => {
      if (date) {
        setNamazEnd(new Date(date));
      }
    });
  }, []);
  useEffect(() => {
    AsyncStorage.getItem(
      'is' + capitalizeFirstLetter(namazName) + 'Enabled',
    ).then((status) => {
      if (status) {
        status == 'true' ? setIsNamazEnabled(true) : setIsNamazEnabled(false);
      } else {
        setIsNamazEnabled(false);
      }
    });
  }, []);

  return (
    <Row>
      <DateTimePickerModal
        date={namazStart ? namazStart : new Date()}
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Col style={styles.timeBoxContainer}>
        <Text style={styles.timeBoxHeading}>
          {capitalizeFirstLetter(namazName)}
        </Text>
      </Col>
      <Col style={styles.timeBoxContainer}>
        <TouchableOpacity
          onPress={() => {
            showDatePicker();
            // setFajrChange(true);
            setChangeWho(1);
          }}
          style={styles.timeBox}>
          <Text style={styles.timeBoxText}>
            {namazStart
              ? `${namazStart.getHours()} : ${namazStart.getMinutes()}`
              : null}
          </Text>
        </TouchableOpacity>
      </Col>
      <Col style={styles.timeBoxContainer}>
        <TouchableOpacity
          onPress={() => {
            if (namazStart) {
              showDatePicker();
              setChangeWho(2);
            } else {
              showMessage({
                message: 'Error',
                description: 'Enter Starting Time First',
                type: 'danger',
              });
              console.log('Enter Starting Time First');
            }
          }}
          style={styles.timeBox}>
          <Text style={styles.timeBoxText}>
            {namazEnd
              ? `${namazEnd.getHours()} : ${namazEnd.getMinutes()}`
              : null}
          </Text>
        </TouchableOpacity>
      </Col>
      <Col style={{...styles.timeBoxContainer, marginTop: hp('2.5')}}>
        <Switch
          trackOnColor={'#f3b52e'}
          isOn={isNamazEnabled}
          onChange={async (isOn) => {
            if (isOn) {
              if (namazStart && namazEnd) {
                await AsyncStorage.setItem(
                  'is' + capitalizeFirstLetter(namazName) + 'Enabled',
                  isOn.toString(),
                );
                setIsNamazEnabled(isOn);
                startService();
                showMessage({
                  message: 'Info',
                  description: 'Service Started Succesfully',
                  type: 'success',
                });
              } else {
                console.log('Kindly Set Start/End Time First');
                showMessage({
                  message: 'Error',
                  description: 'Kindly Set Start/End Time First',
                  type: 'danger',
                });
              }
            } else {
              await AsyncStorage.setItem(
                'is' + capitalizeFirstLetter(namazName) + 'Enabled',
                isOn.toString(),
              );
              setIsNamazEnabled(isOn);
            }
          }}
        />
      </Col>
    </Row>
  );
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const styles = StyleSheet.create({
  timeBox: {
    width: wp('20%'),
    height: hp('5%'),
    // backgroundColor: 'red',
    borderWidth: 1,
    borderColor: '#f3b52e',
    borderRadius: wp('5%'),
  },
  timeBoxText: {
    textAlign: 'center',
    marginTop: hp('1%'),
    fontSize: hp('2%'),
    fontFamily: 'Podkova-ExtraBold',
  },
  timeBoxHeading: {
    fontSize: hp('3%'),
    // fontWeight: 'bold',
    fontFamily: 'Podkova-ExtraBold',
  },
  toggleContainer: {
    width: wp('5%'),
    height: hp('5%'),
  },
  itemsHeading: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  timeBoxContainer: {
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
});

export default TimingTableRow;
