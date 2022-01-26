import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch(error: any) {
        console.error(error);
    }
}

export const getData = async (key: string):Promise<any> => {
    try {
        let res = await AsyncStorage.getItem(key);
    } catch(error: any) {
        console.error(error);
    }
}

export const removeData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch(error: any) {
        console.error(error);
    }
}