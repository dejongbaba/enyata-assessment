import {api} from "@/services/index";

export default class StarshipsService {
    static async getStarships() {
        return api.get('/starships/')
    }

    static async getOneStarship(id) {
        return api.get(`/starships/${id}`)
    }

}
