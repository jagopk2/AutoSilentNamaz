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

const image = require('../assets/bg.jpg');
const instruct_images = [
  {
    id: 1,
    image: require('../assets/i1.jpeg'),
    text: 'Click On the Auto Fetch Button',
  },
  {
    id: 2,
    image: require('../assets/i2.jpeg'),
    text: 'Allow Location Access',
  },
  {
    id: 3,
    image: require('../assets/i3.jpeg'),
    text: 'Timings are auto Generated so they may different for you',
  },
  {
    id: 4,
    image: require('../assets/i4.jpeg'),
    text: 'Adjust Timings by Clicking on the Time',
  },
  {
    id: 5,
    image: require('../assets/i5.jpeg'),
    text: 'Press the Status button',
  },
  {
    id: 6,
    image: require('../assets/i6.jpeg'),
    text:
      'You can turn On/Off individual/all Namaz Service by their Respective Status button',
  },
];

const InfoScreen = () => {
  return (
    <LinearGradient colors={['#000', '#000']} style={styles.linearGradient}>
      <ImageBackground
        source={image}
        style={styles.linearGradient}
        imageStyle={styles.bkimg}>
        <Text style={styles.titleHeading}>Guide Screen</Text>
        <View style={styles.container}>
          <FlatList
            data={instruct_images}
            renderItem={({item, index}) => (
              <View key={item.id.toString()}>
                <Text style={styles.insStep}>Step {index + 1}</Text>
                <Text style={styles.insStepDetail}>{item.text}</Text>
                <Image source={item.image} style={styles.insImage} />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          {/* <Text style={styles.insStep}>Step 1</Text>
          <Text style={styles.insStepDetail}>s</Text>
          <Image source={instruct_images[0].image} style={styles.insImage} /> */}
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
  insStepDetail: {
    textAlign: 'center',
    fontSize: hp('3%'),
    marginBottom: hp('3%'),
  },
});

export default InfoScreen;
