import React, {useState, useEffect} from 'react'
import { PermissionsAndroid, Platform } from 'react-native'
import {bytesToString} from "convert-string"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {Text, TextInput, TouchableOpacity, NativeModules, NativeEventEmitter, View} from "react-native"
import { styles } from './Styles'
import axios from "./Axios"
import {getData, SERVICE_UUID, toBytes} from "./Extras"
import BleManager from 'react-native-ble-manager';
import Back from "./Back";


interface NewDeviceProps {
navigation: any
route: any
}


const BleManagerModule = NativeModules.BleManager
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);
/**
 * Component associated with the creation of a new device.
 */
const NewDevice: React.FC<NewDeviceProps> = (props) => {
	const [name, setName] = useState("")
	const [deviceID, setDeviceID] = useState("")
	let [errors, setErrors] = useState<string[]>([])
	const [ssid, setSsid] = useState("")
	const [peripheralData, setPeripheralData] = useState<any>(null)
	const [password, setPassword] = useState("")
	const [fired, setFired] = useState(false)

	const checkErrors = () => {
		setErrors([])
		let errCount = 0
		if (name === ""){
			setErrors(array => [...array, "Device name cannot be empty."])
			errCount++;
		}

		return errCount === 0
	}

const sendData = () => {
	getData("username").then((d) => {
		console.log("USERNAME: "+ d)
		axios.post("/new-device",{
		deviceName: name,
		deviceId: peripheralData?.peripheral.advertising.localName,
		username: d
	}).then(() => {
		props.navigation.navigate("devices")
	}).catch(err => {
		console.log(err)
	})

	})
}

const writeData = () => {
	const data = {
		ssid:ssid,
		password:password,
	}

	let jsonData = JSON.stringify(data)
		console.log(jsonData)
		  BleManager.write(peripheralData?.peripheral?.id, SERVICE_UUID, SERVICE_UUID,  toBytes(jsonData)).then(() => {
			console.log("Write successful")

		}).catch(err => {
			console.log(err)
		})

		  
	
}

	
	async function connectAndPrepare(peri: BleManager.Peripheral) {
		// Connect to device
		// Before startNotification you need to call retrieveServices
		await BleManager.retrieveServices(peri.id);
		// To enable BleManagerDidUpdateValueForCharacteristic listener
		await BleManager.startNotification(peri.id, SERVICE_UUID, SERVICE_UUID);
		// Add event listener
		BleManagerEmitter.addListener(
		  "BleManagerDidUpdateValueForCharacteristic",
		  ({ value, peripheral, characteristic, service }) => {
			// Convert bytes array to string
			const data = bytesToString(value);

			if (data === "CONNECT"){

			}

			if (data === "NO CONNECT"){
				setErrors([...errors, "Invalid ssid or password. Could not connect."]);
			}

			if (data === "OS ERROR") {
				setErrors([...errors, "Error from wifi service. Please wait before trying to connect."])
			}
			
			
		  }
		);
		// Actions triggereng BleManagerDidUpdateValueForCharacteristic event
	  }
	useEffect(() => {
if (Platform.OS == "android"){
const grant = async () => {
	const granted = await PermissionsAndroid.request(
		PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
		{
		  title: 'Location permission is required for WiFi connections',
		  message:
			'This app needs location permission as this is required  ' +
			'to scan for wifi networks.',
		  buttonNegative: 'DENY',
		  buttonPositive: 'ALLOW',
		},
	);
	if (granted === PermissionsAndroid.RESULTS.GRANTED) {
		// You can now use react-native-wifi-reborn
	  } else {
		// Permission denied
		setErrors([...errors, "Must provide access to wifi to continue"])


	  }
}		
	grant()


		}
		setPeripheralData(props.route.params.periData)
		setDeviceID(peripheralData?.peripheral.advertising.localName)
		

		
	},[])
		return (
			<KeyboardAwareScrollView style={[styles.container]}>
				<View style={[styles.topHead]}>
				<Back navigation={props.navigation} />
				<Text style={styles.baseText}>
				New Device
				</Text>
				</View>
				<Text style={styles.descHeaders}>
				Device Name
				</Text>
				<TextInput style={styles.inputText}
				placeholder="Hydrangeas-1"
				value={name} onChangeText={value => {setName(value); console.log(name)}}/>
				<Text style={styles.descHeaders}>
					Device ID: {peripheralData?.peripheral.advertising.localName}
				</Text>
				<Text style={styles.topHead}>You must additionally provide your wifi ssid and password for the device to connect.</Text>

				<Text style={styles.descHeaders}>Wifi SSID (Username)</Text>
				<TextInput style={styles.inputText}
				placeholder="ssid" 
				value={ssid}
				onChangeText={(text) => setSsid(text)}/>

				<Text style={styles.descHeaders}>Wifi Password</Text>
				<TextInput style={styles.inputText}
				placeholder="password" 
				secureTextEntry={true}
				textContentType="password" 
				value={password}
				onChangeText={(text) => {setPassword(text); console.log(text)}}/>

				<TouchableOpacity onPress={() => {writeData(); sendData()}} style={styles.button}>
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