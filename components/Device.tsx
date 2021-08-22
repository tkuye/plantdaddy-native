import React, {useState, useEffect } from 'react';
import {View, Text, TouchableOpacity } from 'react-native'
import { styles } from './Styles';
import { formatDate } from './Extras';
export interface IDevice {
	item: {deviceName: string
	deviceID: string
	deviceData: {
		humidity: number
		light: number
		soilMoisture: number
		temperature: number
		timestamp: Date
	},
	
}
navigation: any
}

const Device: React.FC<IDevice> = ({item, navigation}) => {

	return (
		<TouchableOpacity style={styles.device} onPress={() => navigation.navigate("full-device", {item})}>
			<Text style={styles.deviceName}>
				{item.deviceName}
			</Text>
			{item.deviceData? <View style={styles.deviceData}>
				<Text style={styles.devicePoints}>Temperature: {item.deviceData.temperature}{"\u2103"}</Text>
				<Text style={styles.devicePoints}>Humidity: {item.deviceData.humidity}%</Text>
				<Text style={styles.devicePoints}>Soil Moisture: {item.deviceData.soilMoisture.toFixed(2)}%</Text>
				<Text style={styles.devicePoints}>Light Level: {item.deviceData.light.toFixed(2)}%</Text>
			</View>: <Text style={styles.descHeaders}>There's no data to show yet!</Text>}
			<View>
				<Text style={styles.deviceDate}>Last Updated: {"\n"}{new Date(item?.deviceData?.timestamp).toLocaleString()}</Text>
			</View>
		</TouchableOpacity>
	)
}

export default Device;