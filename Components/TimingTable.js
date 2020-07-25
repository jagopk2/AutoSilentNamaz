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

import AsyncStorage from '@react-native-community/async-storage';
import BackgroundJob from 'react-native-background-job';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Switch from 'react-native-full-switch';
import TimingTableRow from './TimingTableRow';
import {showMessage} from 'react-native-flash-message';

const regularJobKey = 'regularJobKey';

const TimingTable = ({checkEnabled, startService}) => {
  //   const stopService = () => {
  //     BackgroundJob.cancelAll()
  //       .then(async () => {
  //         await AsyncStorage.setItem('isFajrEnabled', 'false');
  //         setIsFajrEnabled(false);
  //         console.log('Succesfully Stopped Services');
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  return (
    <View>
      {/* <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      /> */}

      <Grid>
        <Row>
          <Col>
            <Text style={styles.itemsHeading}>Namaz </Text>
          </Col>
          <Col>
            <Text style={styles.itemsHeading}>Start</Text>
          </Col>
          <Col>
            <Text style={styles.itemsHeading}>End</Text>
          </Col>
          <Col>
            <Text style={styles.itemsHeading}>Status</Text>
          </Col>
        </Row>
        <TimingTableRow
          namazName={'fajr'}
          startService={() => {
            startService();
          }}
        />
        <TimingTableRow
          namazName={'zuhr'}
          startService={() => {
            startService();
          }}
        />
        <TimingTableRow
          namazName={'asar'}
          startService={() => {
            startService();
          }}
        />
        <TimingTableRow
          namazName={'maghrib'}
          startService={() => {
            startService();
          }}
        />
        <TimingTableRow
          namazName={'esha'}
          startService={() => {
            startService();
          }}
        />
      </Grid>
    </View>
  );
};

const styles = StyleSheet.create({
  timeBox: {
    width: wp('20%'),
    height: hp('5%'),
    // backgroundColor: 'red',
    borderWidth: 1,
  },
  timeBoxText: {
    textAlign: 'center',
    marginTop: hp('1%'),
    fontSize: hp('1%'),
  },
  timeBoxHeading: {
    fontWeight: 'bold',
  },
  toggleContainer: {
    width: wp('5%'),
    height: hp('5%'),
  },
  itemsHeading: {
    fontSize: hp('3%'),

    textAlign: 'center',
    // fontWeight: 'bold',
    fontFamily: 'Podkova-ExtraBold',
  },
  timeBoxContainer: {
    alignItems: 'center',
    marginVertical: hp('3%'),
  },
});

export default TimingTable;
