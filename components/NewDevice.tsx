import React, {useState} from 'react'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {Text, TextInput, TouchableOpacity} from "react-native"
import Svg,{G, Path} from "react-native-svg";
import { styles } from './Styles'
import axios from "./Axios"
import {getData} from "./Extras"
interface NewDeviceProps {
navigation: any
}
/**
 * Component associated with the creation of a new device.
 */
const NewDevice: React.FC<NewDeviceProps> = (props) => {
	const [name, setName] = useState("")
	const [id, setId] = useState("")
	let [errors, setErrors] = useState<string[]>([])

	const checkErrors = () => {
		setErrors([])
		let errCount = 0
		if (name === ""){
			setErrors(array => [...array, "Device name cannot be empty."])
			errCount++;
		}
		if (id === ""){
			setErrors(array => [...array, "Device id cannot be empty"])
			errCount++;
		}

		return errCount === 0
	}
	const sendData = () => {
		

		if (!checkErrors()) {
			return
		}

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
				<TouchableOpacity style={styles.backArrow}  onPress={() => props.navigation.navigate("devices")}> 
                <Svg
                width="32pt" height="32pt" viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet">
                <G transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="#000000" stroke="none">
                <Path d="M3655 5106 c-16 -8 -578 -562 -1247 -1232 -1092 -1094 -1217 -1223
                    -1224 -1257 -11 -63 1 -133 29 -174 15 -21 563 -574 1219 -1229 973 -972 1200
                    -1194 1232 -1204 57 -18 147 -9 190 21 73 49 105 163 71 247 -11 26 -344 366
                    -1138 1160 l-1122 1122 1122 1123 c616 617 1129 1137 1138 1156 26 51 17 147
                    -17 199 -48 72 -171 105 -253 68z"/>
                </G>
                </Svg>
            </TouchableOpacity>
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
			{errors.map(err => 
					<Text key={errors.indexOf(err)} style={styles.errors}>{err}</Text>)}
			</KeyboardAwareScrollView>
		);
}
export default NewDevice