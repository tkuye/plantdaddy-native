import React from 'react';
import {TouchableOpacity} from 'react-native'
import {styles} from './Styles'
import Svg,{G, Path} from "react-native-svg";

interface BackProps {
    navigation: any
}

const Back:React.FC<BackProps> = (props:any) => {
    return (<TouchableOpacity style={styles.backArrow}  onPress={() => props.navigation.navigate("devices")}> 
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
</TouchableOpacity>)

}

export default Back