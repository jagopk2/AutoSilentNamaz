import {
  AppRegistry,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Text} from 'react-native-elements';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import LinearGradient from 'react-native-linear-gradient';

const image = require('../assets/bg.jpg');

const AboutScreen = () => {
  return (
    <LinearGradient colors={['#000', '#000']} style={styles.linearGradient}>
      <ImageBackground
        source={image}
        style={styles.linearGradient}
        imageStyle={styles.bkimg}>
        <Text style={styles.titleHeading}>About Us</Text>
        <View style={styles.container}>
          <Text style={styles.infoHeading}>Developer</Text>
          <Text style={styles.infoDetail}>
            {' '}
            Hello, I am Muhammad Junaid , A Web/App Developer who loves to Code.{' '}
            . I just want to say if this App helps you in anyway Kindly Remember
            me and my Parents in your Prayers. Thank you
          </Text>
          <Text style={styles.infoHeading}>Any Problem/Suggestion?</Text>
          <Text style={styles.infoDetail}>
            {' '}
            If you are facing any issue or have any suggestion, Kindly Email Me
            on "dev.jagopk2@gmail.com"
          </Text>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    textAlign: 'center',
    marginTop: hp('1%'),
    borderTopLeftRadius: hp('5%'),
    borderTopRightRadius: hp('5%'),
    flex: 1,
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
  infoHeading: {
    marginVertical: hp('3%'),
    textAlign: 'center',
    fontSize: hp('5%'),
    fontFamily: 'Podkova-ExtraBold',
  },
  infoDetail: {
    marginVertical: hp('1%'),
    textAlign: 'center',
    fontSize: hp('3%'),
  },
});

export default AboutScreen;
