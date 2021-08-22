import React, {useState} from 'react';
import {TextInput} from 'react-native';
import { useFonts } from 'expo-font';
import {Text, TouchableOpacity, TouchableHighlight} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from './Styles';
import axios from "./Axios"
import {storeData, validateEmail} from "./Extras"

/**
 * This component implements a sign up page where users can begin to create their account.
 * @param props navigation
 * @returns 
 */
const SignUp = (props: any) => {


const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [password2, setPassword2] = useState("")
const [email, setEmail] = useState("")
const [error, setError] = useState("")
  
  
  const validatePassword = (p: string, p2: string) => {
        let errors = [];
    if (p.length < 8) {
        errors.push("Your password must be at least 8 characters"); 
    }
    if (p.search(/[a-z]/i) < 0) {
        errors.push("Your password must contain at least one letter.");
    }
    if (p.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit."); 
    }
	if (p !==  p2) {
		errors.push("Your password must be the same.")
	}
    if (errors.length > 0) {
        setError(errors.join("\n"));
        return false;
    }
    return true;
}

	const sendData = () => {


		if (!validatePassword(password, password2)){
			return null
		}


		if (username === "") {
			setError("Username must not be empty.")
			return
		}

		if (!validateEmail(email)){
			setError("Invalid Email address.")
			return
		}

		if (email === "") {
			setError("Email must not be empty.")
			return
		}
		
		axios.post("/new-user", {
			username: username.toLowerCase(),
			password: password,
			email: email.toLowerCase(),
		}).then((response:any )=> {
			if (response.status === 200) {
				// Store data and leave the view.
				console.log(response.request._response)

				if (response.request._response === "pq: duplicate key value violates unique constraint \"user_unique\""){
					setError("This username has already been taken.")
					return
				}
				
				storeData("username", username)
				storeData("password", password)
				props.navigation.navigate("devices")

			} 
		}).catch(error => {
			alert(error.message)
		})

	}
	
  	  



	return (
		<KeyboardAwareScrollView 
		keyboardShouldPersistTaps='handled'
		style={styles.container}
		>
			<Text style={styles.baseText}>
				Create an Account{"\n"}
			</Text>
			<Text style={styles.descHeaders}> 
				Email
			</Text>
			<TextInput style={styles.inputText}
				placeholder="hello@plantdaddy.com"
				textContentType="emailAddress"
				value={email}
				onChangeText={(text)=> setEmail(text)}/>
			<Text style={styles.descHeaders}> 
				Username
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
				<Text style={styles.descHeaders}>
					Reenter Password
				</Text>
			<TextInput style={styles.inputText}
				placeholder="password"
				autoCompleteType="password"
				textContentType="password"
				secureTextEntry={true}
				value={password2} 
				onChangeText={(text) => setPassword2(text)}
				/>
			<TouchableOpacity onPress={sendData} style={styles.button}>
				<Text style={styles.buttonText}>
					Submit
				</Text>
			</TouchableOpacity>
			<Text style={styles.alreadyText} onPress={() => props.navigation.navigate("login")}>
			Already have an account? Sign in here.
			</Text>
			<Text style={styles.errors}>
				{error}
			</Text>
		</KeyboardAwareScrollView>
	)
}

export default SignUp

