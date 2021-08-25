import React, {useEffect} from 'react'
import {View} from 'react-native'
import {getData} from "./Extras"
import axios from "./Axios"
import {styles} from "./Styles"

interface StateProps {
navigation: any
}

/**
 * The State component to determing whether a user is logged in or not.
 * If not, it will direct them to the signuo component.
 * @param param0 -navigation
 * @returns 
 */
const State: React.FC<StateProps> = ({navigation}) => {
	


	useEffect(() => {
		const dataFetch = async () => {
		let username = await getData("username")
		let password = await getData("password")
		console.log(username, password)
		if (username !== null && password !== null) {
			
			axios.post("/login", {
				username: username,
				password: password
			}).catch(err => {
			console.error(err) 
			navigation.navigate("signup")
		}).then(() => {
			navigation.navigate("devices")
		})
	}
		else {
			navigation.navigate("signup")
		}
		
		}

		dataFetch()
		
		
	})
		return (
			<View style={styles.container}>

			</View>
		);
}
export default State