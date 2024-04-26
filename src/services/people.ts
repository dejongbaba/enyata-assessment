import {api} from "@/services/index";

export default class PeopleService {
    static async getPeople() {
        return api.get('/films/')
    }

    static async getOnePerson(id) {
        return api.get(`/people/${id}`)
    }

}
