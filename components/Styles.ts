import {StyleSheet} from 'react-native'
import { Platform } from 'react-native'


/**
 * This class is used for all styling needed within the app.
 */
export const styles = StyleSheet.create({
	btnPress: {
		backgroundColor: "#026440"
	},

	backArrow: {
		marginBottom: 30,
		marginTop: 20,
		marginLeft: 10
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
	logout:{
			alignItems: 'flex-start',
		 padding: 20
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

	topHead: {
		borderBottomColor: "#ccc",
		borderBottomWidth: 3,
		padding: 15,
	},

	latestDeviceData: {
		justifyContent: "center",
		alignItems:"center",
		fontSize: 19,
		padding: 15,
		width: "100%",
		textAlign: "center",
		borderBottomColor: "#ccc",
		borderBottomWidth: 3,
		shadowOpacity: 0.9,
		shadowOffset: {width: 0, height:0},
		shadowColor: "#000",
		backgroundColor: "white",
		
	},
	fullDate: {
		fontSize: 23, 
		textAlign: "center",
		fontFamily: "Montserrat",
		padding:10,
	},

	lateHead: {
		fontSize: 32,
		fontFamily: "Montserrat",
		paddingBottom: 10, 
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
	fullDevicePoints: {
		fontFamily: "Montserrat",
		fontSize: 19,
		textAlign: "center",
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
		alignItems: "center",
		paddingTop: 25,
		
		marginBottom: -25,
	},

	baseText: {
		paddingTop: 30,
		fontFamily: "Montserrat",
		fontSize: 50,
		textAlign: "center",
	},
	deviceText: {
		paddingTop: 20,
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
picker: {
	width: "95%",
	alignSelf: "center",
	marginTop: 15,
	borderColor: "#ccc"
},
	headText: {
		height: 50,
		borderWidth: 1,
		margin: 10,
		marginTop: 80,
		padding: 10,
		fontSize: 18,
		color: "black",
		borderColor: "#ccc",
		backgroundColor: "white",
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
	padding: 15,
  },
	descHeaders: {
		fontSize: 20,
		margin: 10,
		paddingBottom: 1,
		fontFamily: "Montserrat",
		
	},


	graphXLabel: {
		fontFamily: "Montserrat",
		fontSize: 16, 
		marginTop: -25,
		textAlign: "center",
		marginBottom: 30,
	},
	graphHeaders: {
		fontSize: 20,
		margin: 10,
		paddingBottom: 1,
		fontFamily: "Montserrat",
		textAlign: "center",

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