import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const storeData = async (key:string, value: any) => {
	try {
	  await AsyncStorage.setItem(key, value)
	} catch (e) {
	  // saving error
	}
  }

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
