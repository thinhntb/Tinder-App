import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './mainScreenStyles/mainScreenStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import qs from 'qs';

export default Main = () => {
  const [info, setInfo] = useState('');
  const [data, setData] = useState([]);

  const user = data => {
    return;
    console.log(setData);
  };

  const dateOfBirth = () => {
    return setInfo('Date');
  };

  const location = () => {
    return setInfo('location');
  };

  const phone = () => {
    return setInfo('phone');
  };

  const lock = item => {
    return setInfo('lock');
  };

  const getData = async () => {
    await axios({
      url: 'https://randomuser.me/api/0.4/',
      method: 'GET',
    })
      .then(result => {
        // const list = result.data;
        // setData(list);
        console.log('result', result);
      })
      .catch(error => {
        console.log('fetch data fail');
      });
  };

  useEffect(() => {
    getData();
    // console.log('data',data)
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.viewData}>
        <View style={styles.viewImg}>
          <View style={styles.line}></View>
          <View style={styles.imgRadius}>
            <Image
              style={styles.img}
              source={{uri: 'http://training-movie.bsp.vn:82/upload/movie/sdasdasda.jpg'}}
            />
          </View>
          <View style={styles.line}></View>
        </View>
        {/*Icon Button  */}
        <View style={styles.viewIcon}>
          <View style={styles.viewText}>
            <Text>{info}</Text>
          </View>
          <View style={styles.iconBtn}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                getData();
              }}>
              <Icon name="user" size={50} color="rgba(0,0,0,0.3)" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={dateOfBirth}>
              <Icon name="calendar" size={50} color="rgba(0,0,0,0.3)" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={location}>
              <Icon name="map" size={50} color="rgba(0,0,0,0.3)" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={phone}>
              <Icon name="phone" size={50} color="rgba(0,0,0,0.3)" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={lock}>
              <Icon name="lock" size={50} color="rgba(0,0,0,0.3)" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.viewBtn}></View>
      <Text> Main Screen</Text>
    </View>
  );
};
