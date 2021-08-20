import React, {useState} from 'react'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {Text, TextInput, TouchableOpacity} from "react-native"
import { styles } from './Styles'
import axios from "./Axios"
import {getData} from "./Extras"
interface NewDeviceProps {
navigation: any
}

const NewDevice: React.FC<NewDeviceProps> = (props) => {
	const [name, setName] = useState("")
	const [id, setId] = useState("")

	const sendData = () => {
		getData("username").then((data) => {
			axios.post("/new-device",{
			deviceName: name,
			deviceId: id,
			username: data
		}).then(() => {
			props.navigation.navigate("devices")
		}).catch(err => {
			console.log(err)
		})

		})
		
	}

		return (
			<KeyboardAwareScrollView style={styles.container}>
				<Text style={styles.baseText}>
				New Device
				</Text>
				<Text style={styles.descHeaders}>
				Device Name
				</Text>
				<TextInput style={styles.inputText}
				placeholder="Hydrangeas-1"
				value={name} onChangeText={value => setName(value)}/>
				<Text style={styles.descHeaders}>
					Device ID
				</Text>
				<TextInput style={styles.inputText}
				placeholder="agri-0123456789"
				value={id} onChangeText={value => setId(value)}/>
				<TouchableOpacity onPress={sendData} style={styles.button}>
				<Text style={styles.buttonText}>
					Submit
				</Text>
			</TouchableOpacity>
			</KeyboardAwareScrollView>
		);
}
export default NewDevice