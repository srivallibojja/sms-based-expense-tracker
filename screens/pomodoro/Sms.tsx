import { View, Text, Button, PermissionsAndroid, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import {useNavigation} from '@react-navigation/native';
import Transactions from './Transactions';
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
} from 'react-native-chart-kit';
const SMS = () => {
  const [data, setData] = useState([]);
  const [monthlyFoodAmount, setMonthlyFoodAmount] = useState<number[]>([]);
  const [transactions, setTransactions] = useState<{ date: Date, category: string, amount: number }[]>([]);
  const today = new Date();
  const months = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  for (let i = 0; i < 5; i++) {
    let month = today.getMonth() - i;
    if (month < 0) {
      month += 12;
    }
    const monthName = monthNames[month];
    months.push(monthName);
  }
 // Output: ["Dec", "Nov", "Oct", "Sep", "Aug"]
  const navigation=useNavigation()
  const startReadSMS = async () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS);
    SmsAndroid.list(
      JSON.stringify({ box: 'inbox' }),
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        var arr = JSON.parse(smsList);
        setData(arr);
      },
    );
  };
  const [monthlyfoodAmount,setmonthlyfoodamount]=useState(0);
  const [monthlyshoppingAmount,setmonthlyshoppingAmount]=useState(0);
  const [monthlyCollegefees,setmonthlyCollegefees]=useState(0);
  const piechartdata = [
    {
      name: "Food",
      population:monthlyfoodAmount,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Shopping",
      population:monthlyshoppingAmount,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "College Fees",
      population:monthlyCollegefees,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
  ];
  useEffect(() => {
    let monthlyAmounts: number[] = new Array(5).fill(0);
    let newTransactions: { date: Date, category: string, amount: number }[] = [];
    let foodAmount=0;
    let shoppingAmount=0;
    let collegeAmount=0;
    let creditedAmount=0;
    let t=0,k=0,r=0;
    for (var i = 0; i < data.length; i++) {
      const text = data[i].body;
      const pattern = /(?=.*\bdebited\b)(?=.*\bswiggy\b)/i;
      const pattern1 = /debited.*Zomato.*Ref No (\d+)/i;

      if (text.match(pattern1) !== null || text.match(pattern) !== null) {
        const patt = /debited by Rs(\d+(?:\.\d+)?)/;
        const mat = text.match(patt);

        if (mat) {
          const amount = parseInt(mat[1]);
          foodAmount=amount;
        }

        const monthMap = {
          Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
          Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };
        
        const regex = /(\d{1,2})([A-Za-z]{3})(\d{2})/;
        const match = text.match(regex);
      
        if (match) {
          const day = parseInt(match[1]);
          const monthAbbreviation = match[2];
          const year = `20${match[3]}`; // assuming the year is in yy format
          const month = monthMap[monthAbbreviation];
          const date = new Date(year, month, day);
          const month1 = date.getMonth();
          const year1 = date.getFullYear();
          if (year1 === new Date().getFullYear()) {
            const monthsAgo = new Date().getMonth() - month;
            if (monthsAgo < 5) { // only consider the last 5 months
              monthlyAmounts[4 - monthsAgo] +=foodAmount;
            }
          }
          if(date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear())
          {
              t+=foodAmount;
              
          }
          
          const newTransaction = { date, category: 'Food', amount:foodAmount};
          newTransactions.push(newTransaction);
        }
      }
      var pattern2 =/debited.*AMAZON.*Ref No (\d+)/i;
      var pattern3=/debited.*flipkart.*Ref No (\d+)/i;
      if(text.match(pattern3)!==null || text.match(pattern2)!==null)
      {
        const regex = /debited by Rs(\d+(?:\.\d+)?)/;
        const match = text.match(regex);
        if (match) {
        const amount = match[1];
        shoppingAmount=parseInt(amount);
        // console.log("Amount for shopping is:", amount);
        }
        const regex1 = /(\d{1,2})([A-Za-z]{3})(\d{2})/;
        const match1 = text.match(regex1);
        
        if (match1) {
          const day = match1[1];
          const monthAbbreviation = match1[2];
          const year = `20${match1[3]}`; // assuming the year is in yy format
        
          const monthMap = {
            Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
            Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
          };
          const month = monthMap[monthAbbreviation];
          const date = new Date(year, month, day);
          if(date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear())
          {
              k+=shoppingAmount; 
          }
          const newTransaction = { date, category: 'Shopping', amount:shoppingAmount};
          newTransactions.push(newTransaction);
        }
      }
      var pattern3 =/(?=.*\bdebited\b)(?=.*\bVNRVJIET\b)/i;
      if(text.match(pattern3)!==null)
      {
        const regex = /debited by Rs(\d+(?:\.\d+)?)/;
        const match = text.match(regex);
        if (match) {
        const amount = match[1];
        collegeAmount=parseInt(amount);
        }
        const regex1 = /(\d{1,2})([A-Za-z]{3})(\d{2})/;
        const match1 = text.match(regex1);
        
        if (match1) {
          const day = match1[1];
  const monthAbbreviation = match1[2];
  const year = `20${match1[3]}`; // assuming the year is in yy format
  const monthMap = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  };

  const month = monthMap[monthAbbreviation];
  const date = new Date(year, month, day);
  if(date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear())
  {
      r+=collegeAmount; 
  }
          
          const newTransaction = { date, category: 'College fees', amount:collegeAmount};
          newTransactions.push(newTransaction);
        }

        
      }
      var pattern4 =/\bcredited\b/i;
      if(text.match(pattern4)!==null)
      {
        const regex =/credited by Rs(\d+(?:\.\d+)?)/;
        const match = text.match(regex);
        if (match)
        {
        const amount = match[1];
        creditedAmount+=parseInt(amount);
        
        }
      }
      
    }
    setMonthlyFoodAmount(monthlyAmounts);
    setTransactions(newTransactions);
    setmonthlyfoodamount(t)
    setmonthlyshoppingAmount(k);
    setmonthlyCollegefees(r);

  }, [data]);
  const barchartdata = {
    labels:months.reverse(),
    datasets: [
      {
        data: monthlyFoodAmount,
      },
    ],
  };

  return (
    <View style={{flex:1,backgroundColor:'white'}}>
            <View style={{marginHorizontal:15,marginTop:20}}>
     {/* <PieChart
  data={piechartdata}
  width={Dimensions.get('window').width}
  height={350}
  chartConfig={{
    backgroundColor: '#5655C6',
    backgroundGradientFrom: '#E7E7F7',
    backgroundGradientTo: '#E7E7F7',
    color: (opacity =10) => `rgba(255, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(86, 85, 198, ${opacity})`,
}}
  accessor={"population"}
  backgroundColor={"transparent"}
  paddingLeft={"15"}
  center={[30, 30]}
  absolute
  /> */}
  <BarChart
  style={{height:300}}
  data={barchartdata}
  width={Dimensions.get('window').width-30}
  height={300}
  yAxisSuffix=""
  yAxisLabel="Rs"
  chartConfig={{
    backgroundColor: '#5655C6',
    backgroundGradientFrom: '#E7E7F7',
    backgroundGradientTo: '#E7E7F7',
    color: (opacity =10) => `rgba(255, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(86, 85, 198, ${opacity})`,
  style: {
    borderRadius: 16,
    marginTop:50
  },
  propsForDots: {
    r: '3',
    strokeWidth: 0,
    stroke: '#5655C6',
  },
}}
  verticalLabelRotation={30}
/>
  </View> 
        <ScrollView>
          <TouchableOpacity onPress={() => startReadSMS()}>
            <Text style={{color:'#5655C6',fontSize:20,fontWeight:'bold',marginLeft:20,marginTop:10}}>View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>navigation.navigate('Transactions',transactions)}>
            <Text style={{color:'#5655C6',fontSize:20,fontWeight:'bold',marginLeft:20,marginTop:10}}>View All Transactions</Text>
          </TouchableOpacity>
      <Text style={{color: "#5655C6", fontSize:20,marginTop:20,marginLeft:20}}>Latest transactions</Text>
      {transactions.slice(0, 5).map((transaction, index) => (
        <View key={index}>
      <View style={{marginTop:30,flexDirection: 'column',borderWidth:2,borderColor:'black',backgroundColor:'white',height:70,marginHorizontal:10}}>
<View><Text style={{position:'absolute',right:10,color:'red',fontSize:20,marginTop:5}}>Rs. {transaction.amount}</Text></View>
<View style={{flexDirection:'row',marginTop:5}}>
  <View style={{marginLeft:5}}>
  <Text style={{fontSize:18,color:'black'}}>on {transaction.category}</Text>
  </View>
  <View style={{alignItems:'flex-end',position:'absolute',right:10,top:30}}>
  <Text style={{fontSize:18,fontWeight:'bold',alignItems:'flex-end',color:'black'}}>{transaction.date.toLocaleDateString()}</Text>
  </View>
</View>
</View>

        </View>
      ))}
      <View>
  
      </View>
      </ScrollView>
    </View>
  );
};

export default SMS;
