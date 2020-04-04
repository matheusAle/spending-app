import {StorageService} from "@/services/Storage";

const TOKEN_KEY = 'beterraba';
const USER_KEY = 'cabeçade bagre';

export class AuthService {

    static async getToken() {
        return await StorageService.get(TOKEN_KEY)
    }

    static async setToken(token) {
        return await StorageService.set(TOKEN_KEY, token);
    }

    static async setCurrentUser(user) {
        return await StorageService.setJSON(USER_KEY, user);
    }

    static async getCurrentUser() {
        return await StorageService.getJSON(USER_KEY);
    }

    static async hasUser() {
        const user = await this.getCurrentUser();
        const token = await this.getToken();

        return user && token;
    }

}
