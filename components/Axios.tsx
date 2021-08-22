import axios from "axios";
/**
 * This axios config object is used to create a simple
 * axios instance that is used for all data fetching within the application.
 * 
 */
const Axios = axios.create(
	{baseURL: 'http://192.168.100.107:8000/api',
	withCredentials: false, 
	responseType: 'json', 
	headers: {'Content-Type': 'application/json'}
	}	
)

export default Axios