import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet,Text} from "react-native";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Submit the form data to the server or perform any other necessary actions
    console.log("Form data:", formData);
  };

  return (
    <View style={styles.container}>
      <Text style={{color:'#5655C6',fontSize:30,marginBottom:20,fontWeight:'bold',textAlign:'center'}}>Login</Text>
      <View style={{marginLeft:30}}>
      <Text style={{color:'#5655C6',fontSize:20,fontWeight:'bold'}}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => handleChange("email", text)}
      />
      <Text style={{color:'#5655C6',fontSize:20,fontWeight:'bold'}}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => handleChange("password", text)}
      />
      <View style={{width:100,marginTop:30}}>
      <Button title="Login" onPress={handleSubmit} />
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:100
  },
  input: {
    width: "90%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    color:'#5655C6'
  },
});

export default LoginPage;
