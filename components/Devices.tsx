import React, {useState, useEffect } from 'react';
import {Text, TouchableOpacity, Image, FlatList} from 'react-native';
import { styles } from './Styles';
import axios from './Axios';
import { getData } from './Extras';
import Device from "./Device"
import { SafeAreaView } from 'react-native-safe-area-context';
const Devices =  (props:any) => {

	const [devices, setDevices] = useState(false)
	const [data, setData] = useState();
	const [refreshing, setRefreshing] = useState(false)
	const fetchData = () => {
		setRefreshing(true)
		getData("username").then((data) => {
			if (data !== null) {
				axios.get("/devices", {
			params: {
				username: data,
			}
		}).then(response => {
			console.log(response.data)
			if (response.data !== null) {
				setDevices(true)
				setData(response.data)
				setRefreshing(false)
			}
			else {

			}
		}).catch(error => {
			console.log(error)
		})
	}
	}
	)
	}
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.baseText}>
				My Devices
			</Text>
			{!devices ? <Text style={styles.noDevices}>You don't have any devices yet. Press the button to add one now!</Text>: null}
			<FlatList
			data={data}
			renderItem={Device}
			keyExtractor={(item, index) => index.toString()}
			onRefresh={() => fetchData()}
			refreshing={refreshing}/>
			<TouchableOpacity style={styles.deviceTouch} onPress={() => props.navigation.navigate("new-device")}> 
				<Image source={require('../assets/icons/plus_button.png')} style={styles.plusButton}/>
			</TouchableOpacity>
			
		</SafeAreaView>
	)
}	

export default Devices