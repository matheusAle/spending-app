import AsyncStorage from '@react-native-community/async-storage';

const prefix = key => 'spending--' + key;

export class StorageService {

    static async get(key) {
        try {
            return await AsyncStorage.getItem(prefix(key));
        } catch (e) {
            console.tron.error('StorageService:get', e);
        }
    }

    static async set(key, value) {
        try {
            await AsyncStorage.setItem(prefix(key), value);
        } catch (e) {
            console.tron.error('StorageService:set', e);
        }
    }

    static async getJSON(key) {
        const result = await StorageService.get(key);

        if (result) {
            return JSON.parse(result);
        }
    }

    static async setJSON(key, value) {
        return await StorageService.set(key, JSON.stringify(value));
    }
}
