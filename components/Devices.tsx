import React, {useState, useEffect } from 'react';
import {Text, TouchableNativeFeedback, TouchableOpacity, Image, FlatList, Button, View, ListRenderItem} from 'react-native';
import { styles } from './Styles';
import axios from './Axios';
import { getData, storeData, removeItemValue} from './Extras';
import Device from "./Device"
import { SafeAreaView } from 'react-native-safe-area-context';
/**
 * This component is responsible for diplaying all the devices 
 * associated with a given user to the screen.
 * Each device also shows the latest data that has been collected by the device
 * for easy use.
 * @param props navigation
 * @returns 
 */
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
				setRefreshing(false)
			}
		}).catch(error => {
			console.log(error)
			setRefreshing(false)
		})
	}
	}
	)
	}
	useEffect(() => {
		fetchData()
	}, [])
	


	const logOut = async () => {
		const user_bool = await removeItemValue("username")
		const pass_bool = await removeItemValue("password")

		if (user_bool && pass_bool) {
			props.navigation.navigate("login")
		}	
		
	}

	const renderItem:ListRenderItem<any> = ({item}) => (
			<Device item={item} navigation={props.navigation}/>
	);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.deviceText}>
				My Devices
			</Text>
			<FlatList
			data={data}
			ListEmptyComponent={emptyComponent}
			renderItem={renderItem}
			keyExtractor={(_, index) => index.toString()}
			onRefresh={() => fetchData()}
			refreshing={refreshing}/>
			<TouchableOpacity style={styles.deviceTouch} onPress={() => props.navigation.navigate("bluetooth", {fullDevice:false})} > 
				<Image source={require('../assets/icons/plus_button.png')} style={styles.plusButton}/>
			</TouchableOpacity>
			<View style={styles.logout}>
			<Button title="Logout" onPress={() => logOut()} />
			</View>
				
		</SafeAreaView>
	)
}	

const emptyComponent = () => {
	return (
		<Text style={styles.noDevices}>You don't have any devices yet. Press the button to add one now!</Text>
	)
}

export default Devices