import {
  AppRegistry,
  FlatList,
  Image,
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
import QuestionAns from '../Components/QuestionAns';
import ReadMore from 'react-native-read-more-text';

const image = require('../assets/bg.jpg');
const renderTruncatedFooter = (handlePress) => {
  return (
    <Text style={{color: 'green', marginTop: 5}} onPress={handlePress}>
      Read more
    </Text>
  );
};

const renderRevealedFooter = (handlePress) => {
  return (
    <Text style={{color: 'red', marginTop: 5}} onPress={handlePress}>
      Show less
    </Text>
  );
};

const handleTextReady = () => {
  // ...
};

const questionAns = [
  {
    q: 'How to Stop the Service?',
    a: `To turn off the service just turn off all the status buttons`,
  },
  {
    q: 'Will the service work even after the phone restarts?',
    a: `Yes,Service will auto start when phone restarts. If for any reason it Doesn't starts for your phone just re-open the app and close App .Service will auto start when you open the App`,
  },
  {
    q:
      'Why it is Required to set timer 20 minutes before Namaz starts or ends?',
    a: `Because to save battery consumption the service checks the time after 15-20 minutes`,
  },
  {
    q: 'Why auto generated timings are not accurate?',
    a: `There are many methods to generate namaz timings, This App uses the Muslim world league method and that's the reason timings might be different for you`,
  },
  {
    q: 'Why service does not work when users opens the App?',
    a: `Because it is designed in such a way that Service only works in background so when the app is opened the service will not work, it will start working when the app is closed or minimized`,
  },
];

const InfoScreen = () => {
  return (
    <LinearGradient colors={['#000', '#000']} style={styles.linearGradient}>
      <ImageBackground
        source={image}
        style={styles.linearGradient}
        imageStyle={styles.bkimg}>
        <Text style={styles.titleHeading}>Trouble Shoot</Text>
        <ScrollView style={styles.container}>
          <Text style={styles.insStep}>Important</Text>
          <Text style={styles.insStepDetail}>
            Set timings with at least 20 minutes difference for example if namaz
            time is "5.30" you should set start time to "5.10" or "5.00" and end
            time to "5.50" or "6.00" in order for app to work Properly
          </Text>

          <Text style={styles.insQuestion}>Questions</Text>
          <QuestionAns questionAns={questionAns} />
          {/* <Text>
            Yes,the Service is auto start when Phone Restarts. If for any Reason
            it Doesn't Starts for your phone Just Re open the App and close the
            App . Service will auto start when you open the App
          </Text> */}
          {/* <Text style={styles.insStep}>Step 1</Text>
          <Text style={styles.insStepDetail}>s</Text>
          <Image source={instruct_images[0].image} style={styles.insImage} /> */}
        </ScrollView>
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
  insImage: {
    height: hp('70%'),
    width: wp('70%'),
    marginHorizontal: wp('15%'),
    resizeMode: 'stretch',
    borderRadius: wp('5%'),
  },
  insStep: {
    textAlign: 'center',
    fontSize: hp('6%'),
    fontFamily: 'Podkova-ExtraBold',
    marginVertical: hp('3%'),
  },
  insQuestion: {
    textAlign: 'center',
    fontSize: hp('6%'),
    fontFamily: 'Podkova-ExtraBold',
    marginBottom: hp('1%'),
  },
  insStepDetail: {
    textAlign: 'center',
    fontSize: hp('3%'),
    marginBottom: hp('3%'),
  },
  questionContainer: {
    marginHorizontal: wp('3%'),
  },
  questionText: {
    fontFamily: 'Podkova-ExtraBold',
    fontSize: hp('3%'),
  },
  answerText: {fontSize: hp('3%')},
});

export default InfoScreen;
