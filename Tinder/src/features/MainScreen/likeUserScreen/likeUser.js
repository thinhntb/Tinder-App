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
import Icon from 'react-native-vector-icons/FontAwesome';
import sqlite, { deleteDatabase } from 'react-native-sqlite-storage';
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

export default likeUser = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
    // getList()
  }, []);

  useEffect(() => {
    // getData();
    console.log(data);
  }, [data]);

  const RemoveData = async (UserName) => {
    // console.log('ok',item.id)
    var params = [UserName]
    try {
      await db.transaction( (tx) =>
        tx.executeSql(
          `DELETE FROM Users WHERE UserName = ?`,
          params,
          (tx, result) => {
            console.log('ok',UserName)
            getData()
            error => {console.log(error)}
            // const arr = [];
            // const len = result.rows.length;
            // for (let i = 0; i < len; i++) {
            //   arr.push(result.rows.item(i));
            // }
            // console.log('len', arr);

            // setData(arr);
          },
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

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
      <TouchableOpacity style={{width:'20%',height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'red',borderTopRightRadius:20,borderBottomRightRadius:20}}
      onPress={() => RemoveData(item.UserName)}>
      <Icon name='trash' size={30} color='white'/>
      
      </TouchableOpacity>
    </View>
);

  return (
    <View style={{flex: 1, backgroundColor:'rgb(253, 58, 115)'}}>
    <TouchableOpacity 
    style={{paddingLeft:20}}
    onPress={() => navigation.goBack() }
    >
    <Icon name='angle-left' size={40} color='white'/>
    </TouchableOpacity>  
    <FlatList
        style={{flex: 1}}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => {
          item.id;
        }}></FlatList>
    </View>
  );
};
