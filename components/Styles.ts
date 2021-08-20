import {StyleSheet} from 'react-native'
import { Platform } from 'react-native'
export const styles = StyleSheet.create({
	btnPress: {
		backgroundColor: "#026440"
	},
	btnNormal: {

	},

	errors: {
		color: "red",
		textAlign: "center",
		fontFamily: "Montserrat",
		fontSize: 17
	},

	alreadyText: {
		padding: 10
	},

	device: {
		padding: 25,
		alignSelf: "center",
		borderColor: "#aaa",
		borderWidth: 3,
		borderRadius: 20,
		marginTop: 35,
		width: 350,
		shadowColor: "#888",
		shadowOpacity: 0.4,
		backgroundColor: "white",
		shadowOffset: {width: 0, height: -8},
	},
	deviceName: {
		fontFamily: "Montserrat",
		fontSize: 30,

	},

	deviceData: {
		borderColor: "#aaa",
		borderTopWidth: 3,
		borderBottomWidth:3,
		padding: 10,
		marginTop: 10,
		marginBottom: 10,
		
	},

	devicePoints: {
		fontFamily: "Montserrat",
		fontSize: 19,
	},

	deviceDate: {
		fontFamily: "Montserrat",
		fontSize: 22
	},
	
	noDevices: {
		fontFamily: "Montserrat",
		fontSize: 27, 
		textAlign: "center",
		padding: 30
	},
	plusButton: {
		height: 95,
		width: 95,
		alignSelf: "center",
	

		...Platform.select({
    ios: {
        shadowColor: '#303030',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .7,
        shadowRadius: 0,    
    },
    android: {
        elevation: 5,
    },
    }),
	},

	deviceTouch: {
		alignItems: "center"
	},

	baseText: {
		paddingTop: 100,
		fontFamily: "Montserrat",
		fontSize: 50,
		textAlign: "center",
	},
	loginText: {
		fontSize: 30,
		textAlign: "center"
	},
	inputText: {
		height: 50,
		borderWidth: 1,
		margin: 10,
		padding: 10,
		fontSize: 18,

		color: "black",
		borderColor: "#ccc",
		borderRadius: 10,
		borderTopWidth: 3,
		borderTopColor: "#ddd",
		borderTopEndRadius: 20,
		fontFamily: "Montserrat",

	},
	container: {
    flex: 1,
    backgroundColor: '#fff',
	width: "100%",
  },
	descHeaders: {
		fontSize: 20,
		margin: 10,
		paddingBottom: 1,
		fontFamily: "Montserrat",
		
	},

	button: {
		alignItems: "center",
		fontSize: 30,
		padding: 15,
		margin: 10,
		backgroundColor: "#62BD69",
		borderRadius: 10,
		
	},
	buttonText: {
		color: "white",
		fontFamily: "Montserrat",
		fontSize: 19,
	},

})