import axios from "axios";

const Axios = axios.create(
	{baseURL: 'http://192.168.100.107:8000/api',
	withCredentials: false, 
	responseType: 'json', 
	headers: {'Content-Type': 'application/json'}
	}	
)

export default Axios