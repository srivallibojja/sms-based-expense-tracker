

import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, TouchableOpacity, Dimensions, PermissionsAndroid } from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart
} from 'react-native-chart-kit';

export default function Expenses() {

  const [state, setState] = useState(1);
  const changeState = () => {
    setState(2);
  };
  const changeState2 = () => {
    setState(3);
  };
  const changeState3 = () => {
    setState(1);
  };
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
  const [monthlyfoodAmount, setmonthlyfoodamount] = useState(0);
  const [monthlyshoppingAmount, setmonthlyshoppingAmount] = useState(0);
  const [monthlyCollegefees, setmonthlyCollegefees] = useState(0);
  const piechartdata = [
    {
      name: "College Fees",
      population: monthlyCollegefees,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Food",
      population: monthlyfoodAmount,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Shopping",
      population: monthlyshoppingAmount,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    
  ];
  useEffect(() => {
    let monthlyAmounts: number[] = new Array(5).fill(0);
    let newTransactions: { date: Date, category: string, amount: number }[] = [];
    let foodAmount = 0;
    let shoppingAmount = 0;
    let collegeAmount = 0;
    let creditedAmount = 0;
    let t = 0, k = 0, r = 0;
    for (var i = 0; i < data.length; i++) {
      const text = data[i].body;
      const pattern = /(?=.*\bdebited\b)(?=.*\bswiggy\b)/i;
      const pattern1 = /debited.*Zomato.*Ref No (\d+)/i;

      if (text.match(pattern1) !== null || text.match(pattern) !== null) {
        const patt = /debited by Rs(\d+(?:\.\d+)?)/;
        const mat = text.match(patt);

        if (mat) {
          const amount = parseInt(mat[1]);
          foodAmount = amount;
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
              monthlyAmounts[4 - monthsAgo] += foodAmount;
            }
          }
         
            t += foodAmount;

          const newTransaction = { date, category: 'Food', amount: foodAmount };
          newTransactions.push(newTransaction);
        }
      }
      var pattern2 = /debited.*AMAZON.*Ref No (\d+)/i;
      var pattern3 = /debited.*flipkart.*Ref No (\d+)/i;
      if (text.match(pattern3) !== null || text.match(pattern2) !== null) {
        const regex = /debited by Rs(\d+(?:\.\d+)?)/;
        const match = text.match(regex);
        if (match) {
          const amount = match[1];
          shoppingAmount = parseInt(amount);
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
         
            k += shoppingAmount;
          
          const newTransaction = { date, category: 'Shopping', amount: shoppingAmount };
          newTransactions.push(newTransaction);
        }
      }
      var pattern3 = /(?=.*\bdebited\b)(?=.*\bVNRVJIET\b)/i;
      if (text.match(pattern3) !== null) {
        const regex = /debited by Rs(\d+(?:\.\d+)?)/;
        const match = text.match(regex);
        if (match) {
          const amount = match[1];
          collegeAmount = parseInt(amount);
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
         
            r += collegeAmount;

          const newTransaction = { date, category: 'College fees', amount: collegeAmount };
          newTransactions.push(newTransaction);
        }


      }
      var pattern4 = /\bcredited\b/i;
      if (text.match(pattern4) !== null) {
        const regex = /credited by Rs(\d+(?:\.\d+)?)/;
        const match = text.match(regex);
        if (match) {
          const amount = match[1];
          creditedAmount += parseInt(amount);
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
    labels: months.reverse(),
    datasets: [
      {
        data: monthlyFoodAmount,
      },
    ],
  };


const sum = monthlyFoodAmount.reduce((acc, curr) => acc + curr, 0);

const percentages = Array.from({ length: monthlyFoodAmount.length }, () => 0);
if (sum !== 0) {
  for (let i = 0; i < monthlyFoodAmount.length; i++) {
    percentages[i] = parseInt((monthlyFoodAmount[i] / sum)*100);
    percentages[i]=percentages[i]/100;
  }
}

console.log(percentages);

  const progressdata = {
    labels:months.reverse(), // optional
    data:percentages
  };
  return (

    <ScrollView style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center', marginTop:20, marginBottom: 30, color: '#5655C6' }}>Statistics</Text>
      <Image source={require('../../assets/monitoring.png')} style={{ width:200, height: 200,marginLeft:80}} />
      <View>
        <View style={{ flexDirection: 'row', marginLeft: 130, marginTop: 20 }}>
          <TouchableOpacity onPress={()=>{changeState3(),startReadSMS()}}>
            <Image source={require('../../assets/chart.png')} style={{ width: 30, height: 30, marginTop: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{changeState(),startReadSMS()}}>
            <Image source={require('../../assets/pie.png')} style={{ width: 35, height: 35, marginTop: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{changeState2(),startReadSMS()}}>
            <Image source={require('../../assets/bar.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>


        </View>
        {state === 1 && (
          <View style={{ marginTop:20,marginHorizontal:10}}>
          <ProgressChart
  data={progressdata}
  width={Dimensions.get('window').width}
  height={300}
  strokeWidth={20} // increased from 3 to 20
  radius={40}
  style={{ paddingRight: 20 }}
  chartConfig={{
    backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(26, 147, 111, ${opacity})`,
  strokeWidth: 20, // increased from 3 to 20
  }}
/>
          </View>
        )}
        {state === 2 && (
          <View>
            <PieChart
              data={piechartdata}
              width={Dimensions.get('window').width}
              height={300}
              chartConfig={{
                backgroundColor: '#5655C6',
                backgroundGradientFrom: '#E7E7F7',
                backgroundGradientTo: '#E7E7F7',
                color: (opacity = 10) => `rgba(255, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(86, 85, 198, ${opacity})`,

              }}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              center={[30, 30]}
              absolute
            />
          </View>
        )}
        {state === 3 &&
          (<View style={{ marginTop:20 }}>
            <BarChart
              style={{ height: 300 }}
              data={barchartdata}
              width={Dimensions.get('window').width}
              height={300}
              yAxisSuffix=""
              yAxisLabel="$"
              chartConfig={{
                backgroundColor: '#5655C6',
                backgroundGradientFrom: '#E7E7F7',
                backgroundGradientTo: '#E7E7F7',
                color: (opacity = 10) => `rgba(255, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(86, 85, 198, ${opacity})`,
                style: {
                  borderRadius: 16,
                  marginTop: 50
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
          )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    margin: 10
  }
});