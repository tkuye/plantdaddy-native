import React, {useState, useEffect } from 'react';
import {TextInput} from 'react-native';
import {Text, TouchableOpacity, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from './Styles';
import axios from "./Axios"
import { getData, storeData } from './Extras';


/**
 * This function enables the ablitty for users
 * to login to the app with a seamless interface.
 * @param props navigation
 * @returns 
 */
const Login = (props: any) => {




  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  let [error, setError] = useState("")
  

	const sendData = () => {

		axios.post("/login", {
			username: username.toLowerCase(),
			password: password
		}).then(response => {
			if (response.status === 200) {
				storeData("username", username)
				storeData("password", password)
				props.navigation.navigate("devices")
			}
		}).catch(error => {
			setError("Username does not exist or password is incorrect.")
		})

	}
	
  	

	return (
		<KeyboardAwareScrollView 
		keyboardShouldPersistTaps='handled'
		style={styles.container}
		>
			<Text style={styles.baseText}>
				Login{"\n"}
			</Text>
			<Text style={styles.descHeaders}> 
				Username or Email
			</Text>
			<TextInput style={styles.inputText}
				placeholder="username"
				textContentType="username"
				value={username}
				onChangeText={(text)=> setUsername(text)}/>
			<Text style={styles.descHeaders}>
				Password
			</Text>
			<TextInput style={styles.inputText}
				placeholder="password"
				autoCompleteType="password"
				textContentType="password"
				secureTextEntry={true}
				value={password} 
				onChangeText={(text) =>{ setPassword(text)}}/>
			<TouchableOpacity onPress={sendData} style={styles.button}>
				<Text style={styles.buttonText}>
					Submit
				</Text>
			</TouchableOpacity>

			<Text style={styles.alreadyText} onPress={() => props.navigation.navigate("signup")}>
					Don't have an account? Sign up here.
			</Text>
			<View>
				<Text style={styles.errors}>
					{error}
				</Text>
			</View>
		</KeyboardAwareScrollView>
	)
}

export default Login

