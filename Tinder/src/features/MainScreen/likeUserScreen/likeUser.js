import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  ImageBackground,
  FlatList,
} from 'react-native';
import sqlite from 'react-native-sqlite-storage';
import axios from 'axios';
export const db = sqlite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  // },
  () => {},
  error => {
    console.log(error);
  },
);

export default likeUser = () => {
  // const [userName, setUserName] = useState([]);
  // const [picture, setPicture] = useState([]);
  // const [gender, setGender] = useState([]);
  const [data, setData] = useState([]);

  // const {Id,UserName,Gender,Picture} = data
  //  console.log(data.Gender)
  // console.log('name',data.username)

  const renderItem = ({item, index}) => (
    
      <View
        key={index.toString()}
        style={{
          flex: 1,
          flexDirection: 'row',
          margin: 20,
          backgroundColor:'rgba(225,225,225,0.5)',
          borderRadius:20,
          // borderWidth:1,

        }}>
        <Image
          style={{height: 100, width: 100}}
          source={{uri: item.Picture}}></Image>
        <View style={{flexDirection: 'column',flex:7}}>
          <Text>Gender: {item.Gender}</Text>
          <Text>UserName: {item.UserName}</Text>
        </View>
      </View>
  );

  // const getList = async () => {
  //   await axios ({
  //     url:'https://jsonplaceholder.typicode.com/posts',
  //     method:'GET',
  //   }).then ((result) => {
  //     const list = result.data
  //     console.log('data',list)
  //     setData(list)
  //   }).catch((error) => {
  //     console.log('fetch api fail', error)
  //   })
  // }

  useEffect(() => {
    getData();
    // getList()
  }, []);

  useEffect(() => {
    // getData();
    console.log(data);
  }, [data]);

  const getData = async () => {
    try {
      await db.transaction(tx =>
        tx.executeSql(
          'SELECT id,Gender,UserName, Picture FROM Users',
          [],
          (tx, result) => {
            const arr = [];
            const len = result.rows.length;
            for (let i = 0; i < len; i++) {
              arr.push(result.rows.item(i));
            }
            console.log('len', arr);

            setData(arr);
          },
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground style={{flex:1}}
    source={{uri:'https://www.techvisibility.com/wp-content/uploads/2020/09/image-6-558x410.png'}}
    >
    <View style={{flex: 1}}>
      <FlatList
        style={{flex: 1}}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => {
          item.id;
        }}></FlatList>
    </View>
    </ImageBackground>
  );
};
