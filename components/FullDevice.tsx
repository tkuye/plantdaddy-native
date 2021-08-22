import React, {useEffect, useState} from "react";
import CalendarPicker from "react-native-calendar-picker"
import {View, ScrollView, Text, TextInput, Button} from "react-native"
import { IDevice } from "./Device";
import { styles } from "./Styles";
import axios from "./Axios"
import Graph from "./Graph";
import Svg,{G, Path} from "react-native-svg";
import {TouchableOpacity} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from "react-native-safe-area-context";

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
        <SafeAreaView>
        <ScrollView nestedScrollEnabled={true}>
            <View style={styles.topHead}>
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
            <Button title="Delete Device" onPress={deleteDevice}/>
        
        </ScrollView>
        </SafeAreaView>
    )
}

export default FullDevice;