import {
  AppRegistry,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import LinearGradient from 'react-native-linear-gradient';

const AboutScreen = () => {
  return (
    <LinearGradient
      colors={['#6e20e9', '#502fe9', '#8e20e9', '#206fe9', '#164da3']}
      style={styles.linearGradient}>
      <Text style={styles.titleHeading}>About Us</Text>
      <View style={styles.container}>
        <Text>This is the AboutScreen</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    textAlign: 'center',
    marginTop: hp('5%'),
    borderTopLeftRadius: hp('5%'),
    borderTopRightRadius: hp('5%'),
    flex: 1,
  },
  linearGradient: {
    height: hp('100%'),
    width: wp('100%'),
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

export default AboutScreen;
