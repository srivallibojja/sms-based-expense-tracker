
import { StyleSheet,View ,Text, TouchableOpacity} from 'react-native';
import React from 'react';



const Profile = () => {

  
    return (
   <View >
      <View style={styles.container} >
                
                <View style={styles.rounded}> 
                </View>  
                <Text style={{fontWeight:'bold',fontSize:30,textAlign:'center',marginTop:20,marginBottom:30}}>FULL NAME</Text>  
                <View>
                
          
        </View> 
      </View>
      <View style={{marginTop:20}}>
      <View style={styles.container4}>
        <Text style={{fontSize:20,textAlign:'center',marginTop:10}}>Phone number</Text>
      </View>
      <View style={styles.container4}>
      <Text style={{fontSize:20,textAlign:'center',marginTop:10}}>Email</Text>
      </View>
      <View style={styles.container4}>
      <Text style={{fontSize:20,textAlign:'center',marginTop:10}}>Date of Birth</Text>
      </View>
      </View>
      <TouchableOpacity style={{ backgroundColor: '#B7E4EA',marginTop:30, marginLeft: 20, borderColor: 'black',height:50,width:160,alignSelf:'center',borderWidth:1}}>
                  <Text style={{fontSize:20,textAlign:'center',marginTop:10}}>
                    Edit Profile
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#B7E4EA',marginTop:100, marginLeft: 20, borderColor: 'black',height:50,width:160,alignSelf:'center',borderWidth:1}}>
                  <Text style={{fontSize:20,textAlign:'center',marginTop:10}}>
                    Log Out
                  </Text>
                </TouchableOpacity>
    </View>
    );  
  }
export default Profile;
const styles = StyleSheet.create({  
  container:{   
      flexDirection: 'column',
      backgroundColor:'#E4F1F2',
      borderColor:'black',
      borderWidth:1,
      borderBottomEndRadius:30,
      borderBottomStartRadius:30
      // set elements horizontally, try column.  
  }, 
  container2:{  
    flexDirection: 'row',
   // set elements horizontally, try column.  
},  
  container1:{ 
    flexDirection: 'column',
    backgroundColor:'white',
    marginHorizontal:25,
    marginTop:100,// set elements horizontally, try column.  
    height:480,
    elevation: 15,
    shadowColor: '#52006A',
}, 
  rounded:{  
    width:160,
    height:150,
    borderRadius:150/ 2,
    backgroundColor: '#B7E4EA' ,
    marginTop: '6%',
    alignSelf:'center',
    borderWidth:1
  },
  container4:{   
    marginTop:30,
    flexDirection: 'column',
    borderWidth:1,
    borderColor:'black',
    backgroundColor:'#B7E4EA',
    height:50,
    marginHorizontal:20,
    borderRadius:10
    // set elements horizontally, try column.  
}, 
}) 

    