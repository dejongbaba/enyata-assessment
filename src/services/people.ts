import {api} from "@/services/index";

export default class PeopleService {
    static async getPeople() {
        return api.get('/users/')
    }

    static async getOnePerson(id) {
        return api.get(`/users/${id}`)
    }

}
