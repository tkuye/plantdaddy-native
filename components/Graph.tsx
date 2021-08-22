import React, {useEffect, useState} from 'react';
import { LineChart } from 'react-native-chart-kit';
import {View, Dimensions, Text } from 'react-native'
import axios from "./Axios"
import { styles } from './Styles';


const DataChart = (props:any) => {
    const chartConfig = {
        backgroundGradientFrom: "#888",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.3,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.8,
        useShadowColorFromDataset: false // optional
      };

    const [data, setData] = useState<any>(null);
    const { width } = Dimensions.get('window');
    
    useEffect(() => {
        console.log(props.dropdownValue)
        axios.get("/get-daily-data", {
            params: {
                deviceID: props.deviceID,
                timePeriod: props.timePeriod,
            }
        }).then((res) => {

            let labels = Object.keys(res.data)
            let points:number[] = []
            for (let key of labels){
                points.push(res.data[key][props.dropdownValue])
            }
            if (labels.length > 0){
            setData({
                labels: labels,
                datasets:[
                    {
                        data: points,
                        color: (opacity = 1) => {
                            switch (props.dropdownValue){ 
                                case "soilMoisture": return `rgba(0, 143, 76, ${opacity})`
                                case "temperature": return `rgba(199, 0, 57, ${opacity})`
                                case "humidity": return `rgba(31, 116, 242, ${opacity})`
                                case "light": return `rgba(240, 151, 17, ${opacity})`
                
                            }
                        },
                        strokeWidth: 2
                    }
                ],
                legend: [props.dropdownValue]
            })
        } else {
            setData(null)
        }
        }).catch(err => {
            console.log(err)
        })
    },[props.timePeriod, props.dropdownValue])
 
    return (
        <View>
            {
            data !== null? <LineChart data={data}
            width={width}
            height={300}
            chartConfig={chartConfig}
            bezier
            yAxisSuffix={
                props.dropdownValue === "temperature"?"\u2103":"%" }
            
            />:<Text style={styles.graphHeaders}>There is no data available to display.</Text>}
        </View>
    )
}

export default DataChart