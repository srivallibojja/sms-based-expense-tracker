import React from 'react';
import SMS from './screens/pomodoro/Sms';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Transactions from './screens/pomodoro/Transactions';
import Expenses from './screens/pomodoro/Expenses';
import SignUpPage from './screens/pomodoro/Signup';
import LoginPage from './screens/pomodoro/Login';
import Profile from './screens/pomodoro/Profile';
import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();
export default function App() {
  return (
  <NavigationContainer>
      <Tab.Navigator screenOptions={{
        
 tabBarLabelStyle: { fontSize:10,fontWeight:'bold',textTransform: 'capitalize'},
 tabBarItemStyle: { width:110,height:20},
tabBarStyle: { backgroundColor: 'white'},headerShown:false}}>
        <Tab.Screen name="Home" component={SMS} />
        <Tab.Screen name="Statistics" component={Expenses}/>
        <Tab.Screen name="Transactions" component={Transactions}/>
        <Tab.Screen name="Register" component={SignUpPage}/>
        <Tab.Screen name="Login" component={LoginPage}/>
        <Tab.Screen name="Profile" component={Profile}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
};
