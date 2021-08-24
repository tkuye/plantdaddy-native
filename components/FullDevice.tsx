import React, {useEffect, useState} from "react";
import CalendarPicker from "react-native-calendar-picker"
import {View, ScrollView, Text, TextInput, Button, RefreshControl, TouchableOpacity} from "react-native"
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import { IDevice } from "./Device";
import { styles } from "./Styles";
import axios from "./Axios"
import Graph from "./Graph";
import Back from "./Back"

/**
 * This function displays all the essential information about a given device.
 * It allows to edit the name of the device, delete the device, 
 * View the latest data and additionally view the daily data as a graph over a given day.
 * @param props route, navigation
 * @returns 
 */
const FullDevice = (props:any) => {
    const [item, setItem] = useState<IDevice["item"]>()
    const [editHead, seteditHead] = useState(false);
    const [header, setHeader] = useState("")
    const [ifData, setIfData] = useState(false);
    const [date, setDate] = useState<Date>();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Temperature', value: 'temperature'},
      {label: 'Humidity', value: 'humidity'},
        {label: "Soil Moisture", value:"soilMoisture"}, 
        {label:"Light Level", value:"light"}])
    const [refresh, setFresh] = useState(false);


    const getDevice = () => {
        axios.get("/get-device", {params: {
            deviceID:props.route.params.item.deviceID
        }}).then((response) => {
            console.log(response.data);
            setItem(response.data)
        }).catch(err => {
            console.log(err)
        })
    }
    
    useEffect(() => {
        setItem(props.route.params.item)
        setHeader(props.route.params.item.deviceName)
        let ifdata = props.route.params.item.deviceData.humidity + 
               props.route.params.item.deviceData.light +
               props.route.params.item.deviceData.temperature +
               props.route.params.item.deviceData.soilMoisture 
        setIfData(ifdata === 0) 
    }, [])

    const editHeader = () => {
        seteditHead(true)
    }

    const sendHeader = () => {
        axios.post("/device-name", {deviceName: header, deviceID: props.route.params.item.deviceID}).catch(err => {
            console.log(err)
        })
        seteditHead(false)
    }

    const deleteDevice = () => {
        axios.delete("delete-device", {params: {deviceID: props.route.params.item.deviceID}}).catch(err => {
            console.log(err)
        }).then(() => {
            props.navigation.navigate("devices")
        })
    }

    const onDateChange = (date:any) => {
        setDate(date)
    }
    return (
        <SafeAreaView >
        <ScrollView nestedScrollEnabled={true} 
        refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={getDevice}/>}
        >
            <View style={styles.topHead}>
            <Back navigation={props.navigation} />
            {!editHead? <Text style={styles.baseText} onPress={() => {editHeader()}}>
                {header}
            </Text>:<TextInput style={styles.headText} value={item? header: ''} onChangeText={(value) => setHeader(value)} onEndEditing={() => sendHeader()}/>}
            </View>
            <View style={styles.latestDeviceData}>
                <Text style={styles.lateHead}>Latest Data</Text>

               {!ifData?<View><Text style={styles.fullDevicePoints}>Temperature: {item?.deviceData.temperature}{"\u2103"}</Text>
				<Text style={styles.fullDevicePoints}>Humidity: {item?.deviceData.humidity}%</Text>
				<Text style={styles.fullDevicePoints}>Soil Moisture: {item?.deviceData.soilMoisture.toFixed(2)}%</Text>
				<Text style={styles.fullDevicePoints}>Light Level: {item?.deviceData.light.toFixed(2)}%</Text>
                <Text style={styles.fullDate}>{item?.deviceData.timestamp? new Date(item!.deviceData!.timestamp).toLocaleString(): null}</Text>
                </View>: <Text style={styles.noDevices}>There's no data collected from the device.</Text>}
            </View>
            <View>
                <Text style={styles.baseText}>
            Graph
                </Text>
                <Text style={styles.graphHeaders}>
                    Select a date to see the averaged device data for that day.
                </Text>
                {/* This calendar is needed to pick the date associated with the the device data you wish to see.*/}
                <CalendarPicker 
                onDateChange={onDateChange}
                />
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    theme="LIGHT"
                    listMode="SCROLLVIEW"
                    style={styles.picker}
                    />
                
                <Graph timePeriod={date? date.toISOString().substring(0, 10): "2020-03-01"} deviceID={item?.deviceID} dropdownValue={value}/>
            </View>
            <View>
                <Button title="Change Wifi Settings" onPress={() => props.navigation.navigate("bluetooth", {fullDevice:true}) }/>
            </View>
            <Button title="Delete Device" onPress={deleteDevice}/>
        </ScrollView>
        </SafeAreaView>
    )
}

export default FullDevice;