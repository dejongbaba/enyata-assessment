import {api} from "@/services/index";

export default class AuthService {
    static async token(data) {
        return api.post('/token/', data)
    }

    static async login(data) {
        return api.post('/auth/', data)
    }

    static async registration(data) {
        return api.post('/auth/', data, {
            withCredentials: true
        })
    }
}
