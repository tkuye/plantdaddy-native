import React, {useEffect, useState, useRef} from 'react';
import {View, 
    NativeModules,
     NativeEventEmitter, Text, 
     SafeAreaView, 
     Button, 
     StyleSheet,
      FlatList, 
      ScrollView, 
      TouchableOpacity,
      ListRenderItem, 
      StatusBar} from 'react-native';
import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';
import BleManager from 'react-native-ble-manager';
import {styles} from "./Styles"
import Back from "./Back"
import { SERVICE_UUID } from './Extras';

const BleManagerModule = NativeModules.BleManager
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);


export interface BlePeripheral {
  peripheral: BleManager.Peripheral
  info: BleManager.PeripheralInfo
}


const BlueTooth = (props:any) => {
  const flatRef = useRef<any>();
    const [isScanning, setIsScanning] = useState(false)
    const peripherals = new Map();
    const [list, setList] = useState<Array<any>>([])
    const startScan = () => {
        BleManager.scan([SERVICE_UUID], 30, false).then(() => {
            // Success code
            console.log("Scan started");
            setIsScanning(true)
            

          }).catch(err => {
              console.log(err)
          })
    }


    const handleStopScan = () => {
        console.log("Scan Stopped");
        setIsScanning(false)
    }

    const handleDisconnectedPeripherals = (data:any) => {
        let peripheral = peripherals.get(data.peripheral)
        if (peripheral){
            peripheral.connected = false
            peripherals.set(peripheral.id, peripheral)
            setList(Array.from(peripherals.values()));
        }
    }

    const retrieveConnected = () => {
        BleManager.getConnectedPeripherals([]).then(results => {
            if (results.length === 0){
                console.log("No peripherals")
            }

            for (let i = 0; i < results.length; i++) {
                var peripheral = results[i]
                peripherals.set(peripheral.id, peripheral)
            }
        })
    }


    const handleDiscoverPeripheral = (peripheral:BleManager.Peripheral) => {
        console.log("Discovered peripheral", peripheral.name)

        if (!peripheral.name){
            peripheral.name = "NO NAME"
        }
        peripherals.set(peripheral.name, peripheral)

        
        setList(Array.from(peripherals.values()));
    }

    const handleRetrieveServices = (peripheral: string) => {
      BleManager.retrieveServices(peripheral).then((services) => {
        console.log(services)
      })
    }

    const handleUpdateValueForCharacteristic = (data:any) => {
        console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
      }
     

      const connectToDevice = (peripheral:BleManager.Peripheral) => {
        BleManager.connect(peripheral.id).then(() => {
          console.log("Connected successfully to " + peripheral.name)
          BleManager.retrieveServices(peripheral.id, []).then((services) => {
            let periData: BlePeripheral = {
              peripheral,
              info: services
            }

            props.navigation.navigate("new-device", {periData})

          })
        })

        
      }
    
   
   useEffect(() => {
        BleManager.start().then( () => {
            console.log("Module started");
        }).catch(err => {
            console.log(err)
        })

        BleManager.enableBluetooth().then( () => {
          console.log("Bluetooth enabled");
        }).catch(err => {
          console.log(err)
        })

        BleManagerEmitter.addListener("BleManagerDiscoverPeripheral", handleDiscoverPeripheral)
        
        BleManagerEmitter.addListener("BleManagerStopScan", () => {
            console.log("SCAN DONE")
        })
        // BleManagerEmitter.addListener("BleManagerConnectPeripheral", handleRetrieveServices)

        BleManagerEmitter.addListener("BleManagerDisconnectPeripheral", handleDisconnectedPeripherals)

        
  },[]);

  

  const renderItem: ListRenderItem<any> = ({item}) => {

    return (
      <TouchableOpacity onPress={() => connectToDevice(item)}>
        <View style={styles.device}>
          <Text style={[styles.descHeaders, {fontSize: 30, textAlign: 'center'}]}>{item.name}</Text>
          
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{marginTop: 80, flex:1}}>
      <Back navigation={props.navigation} />
      <Text style={[styles.baseText, {marginBottom: 20}]}>
        Scan Devices
      </Text>
      
      <Text style={[styles.descHeaders, {textAlign: 'center'}]}>
        Press the button to begin scanning for devices.
        The device name will have begin with 'agri' or say 'ESP32'.
      </Text>
     <Button onPress={() => startScan()} title="Start Scan"/>
     
    <FlatList
    ListEmptyComponent={emptyComponent}
      data={list}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
    />
  
    </View>
  );
};


const emptyComponent = () => {

  return (
    <View>
      <Text style={[styles.baseText, {fontSize: 33}]}>No Devices Available</Text>
    </View>
  )
}

    

export default BlueTooth