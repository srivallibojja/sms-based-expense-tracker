import React, { FunctionComponent } from 'react'
import { View ,Text, TouchableOpacity,StyleSheet, ImageSourcePropType,Image, Dimensions} from 'react-native';
import {
    LineChart,
  } from 'react-native-chart-kit';
  export default function Home()
  {
    return(
       <View style={{}}>
      <View style={{marginRight:50,marginLeft:16,marginTop:16}}>
    <LineChart
        data={{
          labels: ['Jan','Feb','Mar','Apr','may','June'], //Array of labels [Jun 21,May 21,Apr 21,Mar 21,Feb 21,Jan 21]
            datasets: [{   data: [ 1,2,3,4,5 ], //Array of values 
                           color: (opacity = 1) => `rgba(86,85,198,${opacity})`, // optional
                           
                       }]  
         }}
         width={Dimensions.get('window').width - 50}
         height={320}   
         yAxisLabel={""} // Hide y-axis label
         withShadow={false}
         withOuterLines={false}              
         withInnerLines={false}
        chartConfig={{
          backgroundColor: '#5655C6',
          backgroundGradientFrom: '#E7E7F7',
          backgroundGradientTo: '#E7E7F7',
          color: (opacity =10) => `rgba(255, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(86, 85, 198, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '3',
          strokeWidth: '2',
          stroke: '#5655C6',
        },
      }}
      bezier
      ></LineChart>
      </View>
      <TouchableOpacity>
        <Text style={{color: "#5655C6", fontSize:20,marginTop:20,marginLeft:20}}>
        View Details
        </Text>
      </TouchableOpacity>
      <Text style={{color: "#5655C6", fontSize:20,marginTop:20,marginLeft:20}}>Latest transactions</Text>
      <View style={{marginTop:30,flexDirection: 'column',borderWidth:2,borderColor:'black',backgroundColor:'white',height:70,marginHorizontal:20}}>
<View><Text style={{color:'red',textAlign:'right',fontSize:20,marginTop:5}}>-₹300</Text></View>
<View style={{flexDirection:'row',marginTop:5}}>
  <View style={{marginLeft:5}}>
  <Text style={{textAlign:'center',fontSize:18}}>On Food</Text>
  </View>
  <View style={{marginLeft:200,alignItems:'flex-end'}}>
  <Text style={{fontSize:18,fontWeight:'bold',alignItems:'flex-end'}}>05:30 PM</Text>
  </View>
</View>
</View>
       </View>
    )
}



