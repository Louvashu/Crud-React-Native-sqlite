import {View, Text, TouchableOpacity, Animated} from 'react-native';
import React, {useRef, useState} from 'react';

const Progress = () => {
  const [selectedStep, setSelectedStep] = useState(0);
  const progress1 = useRef(new Animated.Value(0)).current;
  const progress2 = useRef(new Animated.Value(0)).current;
  const progress3 = useRef(new Animated.Value(0)).current;

  const start1 = () => {
    Animated.timing(progress1, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };
  const start2 = () => {
    Animated.timing(progress2, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };
  const start3 = () => {
    Animated.timing(progress3, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{flex: 1}}>
      <View style={{width: '100%', alignItems: 'center', padding: 50}}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: selectedStep > 0 ? 'green' : '#f2f2f2',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>1</Text>
        </View>
        <View
          style={{
            width: 6,
            height: 100,
            backgroundColor: '#f2f2f2',
          }}></View>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: selectedStep > 1 ? 'green' : '#f2f2f2',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>2</Text>
        </View>
        <View
          style={{
            width: 6,
            height: 100,
            backgroundColor: '#f2f2f2',
          }}></View>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: selectedStep > 2 ? 'green' : '#f2f2f2',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>3</Text>
        </View>
        <View
          style={{
            width: 6,
            height: 100,
            backgroundColor: '#f2f2f2',
          }}></View>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: selectedStep > 3 ? 'green' : '#f2f2f2',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>4</Text>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          padding: 50,
          position: 'absolute',
          top: 0,
        }}>
        <Animated.View
          style={{
            width: 6,
            height: progress1,
            marginTop: 30,
            backgroundColor: 'green',
          }}></Animated.View>

        <Animated.View
          style={{
            width: 6,
            height: progress2,
            marginTop: 30,
            backgroundColor: 'green',
          }}></Animated.View>

        <Animated.View
          style={{
            width: 6,
            height: progress3,
            marginTop: 30,
            backgroundColor: 'green',
          }}></Animated.View>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 100,
          height: 50,
          width: 200,
          backgroundColor: 'orange',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          alignSelf: 'center',
        }}
        onPress={() => {
          if (selectedStep == 1) {
            start1();
          }
          if (selectedStep == 2) {
            start2();
          }
          if (selectedStep == 3) {
            start3();
          }
          if (selectedStep == 0) {
            setSelectedStep(selectedStep + 1);
          } else {
            setTimeout(() => {
              setSelectedStep(selectedStep + 1);
            }, 3000);
          }
        }}>
        <Text>Next Step</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Progress;
