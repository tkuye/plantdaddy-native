import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * Gets the data from local storage.
 * @param key string
 * @returns 
 */
export const getData = async (key: string) => {
	try {
	  const value = await AsyncStorage.getItem(key)
	  if(value !== null) {
		return value;
	  } 
	  else return null;
	} catch(e) {
	  // error reading valuer
	  return null;
	}
  }

  /**
   * Validates a user's input email adress.
   * @param email 
   * @returns 
   */
export function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
/**
 * Stores a key, value pair in local storage for later
 * @param key string
 * @param value 
 */
export const storeData = async (key:string, value: any) => {
	try {
	  await AsyncStorage.setItem(key, value)
	} catch (e) {
	  // saving error
	}
  }
/**
 * Used for appropriate date formatting
 * @param date 
 * @returns 
 */
export function formatDate(date: Date) {
  var hours = date.getHours();
  var minutes:any = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}


export const SERVICE_UUID: string = "5F7937B4-039F-11EC-9A03-0242AC130003"

export const toBytes = (str: string) => {
  var arr = [];
  var utf8 = unescape(encodeURIComponent(str));
  for (var i = 0; i < utf8.length; i++) {
    arr.push(utf8.charCodeAt(i));
  }
  return arr;
}