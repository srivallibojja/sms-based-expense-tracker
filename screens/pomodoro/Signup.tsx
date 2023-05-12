import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet,Text} from "react-native";

interface SignUpForm {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  username: string;
  profilePicture: File | null;
  securityQuestion: string;
  securityAnswer: string;
}

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<SignUpForm>({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    username: "",
    profilePicture: null,
    securityQuestion: "",
    securityAnswer: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = (file: File | null) => {
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: file || null,
    }));
  };

  const handleSubmit = () => {
    // Submit the form data to the server or perform any other necessary actions
    console.log("Form data:", formData);
  };

  return (
    <View style={styles.container}>
      <Text style={{color:'#5655C6',fontSize:30,marginBottom:20,fontWeight:'bold',textAlign:'center'}}>Sign Up</Text>
      <View style={{marginLeft:30}}>
      <Text style={{color:'#5655C6',fontSize:18,fontWeight:'bold'}}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        onChangeText={(text) => handleChange("fullName", text)}
      />
      <Text style={{color:'#5655C6',fontSize:18,fontWeight:'bold',marginTop:10}}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => handleChange("email", text)}
      />
      <Text style={{color:'#5655C6',fontSize:18,fontWeight:'bold',marginTop:10}}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => handleChange("password", text)}
      />
      <Text style={{color:'#5655C6',fontSize:18,fontWeight:'bold',marginTop:10}}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={(text) => handleChange("phoneNumber", text)}
      />
      <Text style={{color:'#5655C6',fontSize:18,fontWeight:'bold',marginTop:10}}>UserName</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => handleChange("username", text)}
      />
      {/* Add other form fields here */}
      <View style={{width:100,marginTop:30}}>
      <Button title="Sign Up" onPress={handleSubmit}/>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20
  },
  input: {
    width: "90%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export default SignUpPage;
