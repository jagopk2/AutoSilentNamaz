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
const QuestionAns = ({questionAns}) => {
  return (
    <View style={styles.questionContainer}>
      {questionAns.map((qa, index) => {
        return (
          <View key={qa.q} style={{marginBottom: hp('3%')}}>
            <Text style={styles.questionText}>
              Q{index + 1} - {qa.q}
            </Text>
            <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={(handlePress) =>
                renderTruncatedFooter(handlePress)
              }
              renderRevealedFooter={(handlePress) =>
                renderRevealedFooter(handlePress)
              }
              onReady={() => handleTextReady()}>
              <Text style={styles.answerText}>Ans - {qa.a}</Text>
            </ReadMore>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    marginHorizontal: wp('3%'),
  },
  questionText: {
    fontFamily: 'Podkova-ExtraBold',
    fontSize: hp('3%'),
  },
  answerText: {fontSize: hp('3%')},
});

export default QuestionAns;
