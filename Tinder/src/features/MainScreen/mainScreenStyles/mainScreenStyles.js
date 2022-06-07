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
    backgroundColor:'rgba(224,60,114,0.2)',
    flex: 7,
    // margin: 30,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 30,
    alignItems:'center',
    // justifyContent:'center'
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
    borderWidth: 2,
    borderColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
    alignSelf: 'center',
    justifyContent:'center'
    // marginHorizontal:20
    // marginTop: 80,
  },
  img: {
    justifyContent:'center',
    alignContent:'center',
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
    // borderWidth: 1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20
    // borderColor: 'rgba(0,0,0,1)',
    // backgroundColor:'red'
  },
  viewIcon: {
    flex: 1,
    borderWidth: 1,
    borderRadius:20,
    backgroundColor:'#F3D595'
  },

  line: {
    height: 3,
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
  textInfo:{
    fontSize:20,
    fontWeight:'500',
    color:'black'
  },
  textTitle:{
    fontSize:15,
    fontWeight:'500',
    color:'rgba(0,0,0,0.3)'
  },
  card:{
    justifyContent:'center',
    alignItems:'center',
    margin:20,
    height:'90%',
    width:'90%',
    position:'absolute'
  },
  likeText: {
    left: 40,
    color: '#32CD32',
    borderColor: '#32CD32',
    fontSize:40,
    fontWeight:'800',
  },
  nopeText: {
    right: 20,
    color: 'red',
    borderColor: 'red',
    fontSize:40,
    fontWeight:'800'
  },
});

export default styles;
