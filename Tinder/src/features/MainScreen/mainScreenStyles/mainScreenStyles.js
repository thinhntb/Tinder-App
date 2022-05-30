import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backGround: {
    height: '25%',
    width: '100%',
    // backgroundColor:'#2D2E32'
    // backgroundColor:'rgba(#2D2E32,#2D2E32,#2D2E32,0.5)',
  },
  viewData: {
    flex: 4,
    margin: 30,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 5,
  },
  viewImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    //   borderWidth:1,
    //   borderColor:'black'
  },
  imgRadius: {
    height: 200,
    width: 200,
    flex: 0,
    borderRadius: 200 / 2,
    borderWidth: 0.5,
    borderColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
    alignSelf: 'center',
    // marginHorizontal:20
    // marginTop: 80,
  },
  img: {
    // flex:1,
    height: '90%',
    width: '90%',
    // borderWidth:1,
    borderColor: 'black',
    borderRadius: 180 / 2,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    // padding:20
  },
  viewText: {
    flex:1,
    borderWidth: 1,
    // borderColor: 'rgba(0,0,0,1)',
    // backgroundColor:'red'
  },
  viewIcon: {
    flex: 1,
    borderWidth: 1,
  },

  line: {
    height: 1,
    //   width:'100%',
    flex: 1,
    backgroundColor: 'black',
  },
  iconBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  button: {
    margin: 10,
  },
  viewBtn: {
    flex: 1,
  },
});

export default styles;
