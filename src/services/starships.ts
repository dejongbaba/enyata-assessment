import {api} from "@/services/index";

export default class StarshipsService {
    static async getStarships() {
        return api.get('/users/')
    }

    static async getOneStarship(id) {
        return api.get(`/users/${id}`)
    }

}
