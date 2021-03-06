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
} from 'react-native';
import styles from './mainScreenStyles/mainScreenStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import moment from 'moment';
import qs from 'qs';
import SliderNativeComponent from 'react-native/Libraries/Components/Slider/SliderNativeComponent';
import sqlite from 'react-native-sqlite-storage';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

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

export default Main = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const [info, setInfo] = useState('');
  const [data, setData] = useState([]);
  const [textOutput, setTextOutput] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userLoading, setUserLoading] = useState([]);
  const dataRef = useRef(null);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ` +
          `Users ` +
          `(Id INTEGER PRIMARY KEY AUTOINCREMENT,Gender TEXT,UserName TEXT, Picture TEXT)`,
        [],
        (sqlTxn, res) => {
          console.log(`createTables successfully`, res);
        },
        error => {
          console.log(`createTables error` + error.message);
        },
      );
    });
  };

  let cardAnimation = {};
  let likeTextAnimation = {};
  let nopeTextAnimation = {};

  const {
    id,
    picture,
    name,
    gender,
    location,
    phone,
    email,
    dob,
    password,
    username,
  } = data;

  const user = () => {
    setInfo('My Name Is');
    setTextOutput(
      (name.title + ' ' + name.first + ' ' + name.last).toUpperCase(),
    );
  };

  const date = () => {
    // console.log(dob);
    setInfo('My birthday is');
    setTextOutput(moment(new Date(parseInt(dob) * 1000)).format('DD-MM-YYYY'));
  };

  const addresses = () => {
    setInfo('My address is');
    setTextOutput(location.street.toUpperCase());
  };

  const TelePhone = () => {
    setInfo('My phone number is');

    setTextOutput(phone);
  };

  const lock = item => {
    setInfo('My password is');
    setTextOutput(password);
  };

  const getData = async () => {
    await axios({
      url: 'https://randomuser.me/api/0.4/',
      method: 'GET',
    })
      .then(result => {
        const list = result.data.results[0].user;
        dataRef.current = list;
        setData(list);
        // setDataBase(list)
        console.log(list);
      })
      .catch(error => {
        console.log('fetch data fail');
      });
  };

  {
    /*Insert Sqlite */
  }
  const setDataBase = async () => {
    console.log('ref', dataRef.current);
    const {gender, username, picture} = dataRef.current;
    try {
      await db.transaction(async tx => {
        await tx.executeSql(
          `INSERT INTO Users (Gender,UserName, Picture) VALUES (?,?,?)`,
          [gender, username, picture],
          (sqlTx, re) => {
            console.log('added success', username);
          },
        );
      });
    } catch (error) {
      console.log('error on adding User' + error.message);
    }
  };

  // useEffect (() =>{
  //   console.log('name',data);
  // },[data])

  const swipeRight = () => {
    Animated.spring(animatedValue, {
      toValue: {
        x: windowWidth * 2,
        y: 0,
      },
      useNativeDriver: false,
    }).start(() => {
      animatedValue.setValue({x: 0, y: 0});

      // setCurrentCardIndex(prevIndex => prevIndex + 1);
    });
    setDataBase();
    // setData([]);
    getData();
  };

  const swipeLeft = () => {
    Animated.spring(animatedValue, {
      toValue: {
        x: -windowWidth * 2,
        y: 0,
      },
      useNativeDriver: false,
    }).start(() => {
      animatedValue.setValue({x: 0, y: 0});
      // setData([]);
      getData();
    });
  };

  const resetPosition = () => {
    Animated.timing(animatedValue, {
      toValue: {
        x: 0,
        y: 0,
      },
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        // console.log(gesture)
        animatedValue.setValue({x: gesture.dx, y: gesture.dy});
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > windowWidth * 0.25) {
          setTextOutput([]);
          setInfo([]);
          swipeRight();
          // console.log(username,gender)
        } else if (gesture.dx < -windowWidth * 0.25) {
          setTextOutput([]);
          setInfo([]);
          swipeLeft();
        } else {
          resetPosition();
        }
      },
    }),
  ).current;

  useEffect(() => {
    getData();
    createTable();
    // setDataBase(data);
    // console.log('data',data)
  }, []);

  const animatedValue = useRef(new Animated.ValueXY()).current;

  const render = () => {
    const cardAnimation = {
      transform: [
        {translateX: animatedValue.x},
        {
          translateY: animatedValue.y.interpolate({
            inputRange: [-windowHeight * 0.035, windowHeight * 0.035],
            outputRange: [-windowHeight * 0.035, windowHeight * 0.035],
            extrapolate: 'clamp',
          }),
        },
        {
          rotate: animatedValue.x.interpolate({
            inputRange: [-windowWidth * 1.5, windowWidth * 1.5],
            outputRange: ['-120deg', '120deg'],
          }),
        },
      ],
    };
    likeTextAnimation = {
      opacity: animatedValue.x.interpolate({
        inputRange: [0, windowWidth * 0.25],
        outputRange: [0, 1],
      }),
    };

    nopeTextAnimation = {
      opacity: animatedValue.x.interpolate({
        inputRange: [-windowWidth * 0.25, 0],
        outputRange: [1, 0],
      }),
    };

    return (
      <ImageBackground
        style={{flex: 1}}
        source={{
          uri: 'https://www.techvisibility.com/wp-content/uploads/2020/09/image-6-558x410.png',
        }}>
        <Animated.View key={id} style={[styles.card, cardAnimation]}>
          <View style={styles.viewData}>
            <View style={styles.viewImg}>
              <View style={styles.line}></View>
              <View style={styles.imgRadius}>
                <Image
                  style={styles.img}
                  source={{
                    uri: picture,
                  }}
                />
              </View>
              <View style={styles.line}></View>
            </View>
            {/*Icon Button  */}
            <View style={styles.viewIcon}>
              <View style={styles.viewText}>
                <Text style={styles.textTitle}>{info}</Text>
                <Text style={styles.textInfo}>{textOutput}</Text>
              </View>
              <View style={styles.iconBtn}>
                <TouchableOpacity style={styles.button} onPress={user}>
                  <Icon name="user" size={50} color="rgba(0,0,0,0.3)" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={date}>
                  <Icon name="calendar" size={50} color="rgba(0,0,0,0.3)" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={addresses}>
                  <Icon name="map" size={50} color="rgba(0,0,0,0.3)" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={TelePhone}>
                  <Icon name="phone" size={50} color="rgba(0,0,0,0.3)" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={lock}>
                  <Icon name="lock" size={50} color="rgba(0,0,0,0.3)" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.viewBtn}>
            <TouchableOpacity 
            style={{flexDirection: 'column', paddingTop: 30}}
            onPress={() => navigation.navigate('LikeUser')}
            >
              <Icon name="heart" size={50} color="red" />
              <Text>Favorite</Text>
            </TouchableOpacity>
          </View>
          <React.Fragment>
            <Animated.Text
              style={[styles.text, styles.likeText, likeTextAnimation]}>
              LIKE
            </Animated.Text>
            <Animated.Text
              style={[styles.text, styles.nopeText, nopeTextAnimation]}>
              NOPE
            </Animated.Text>
          </React.Fragment>
        </Animated.View>
      </ImageBackground>
    );
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {render()}
    </View>
  );

  // return (
  //   <View style={styles.container} {...panResponder.panHandlers}>
  //     {renderCards()}
  //   </View>
  // );
};
