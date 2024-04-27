import {api} from "@/services/index";

export default class StarshipsService {
    static async getStarships() {
        return api.get('/posts/')
    }

    static async getOneStarship(id) {
        return api.get(`/posts/${id}`)
    }

}
