import {api} from "@/services/index";

export default class SpeciesService {
    static async getSpecies() {
        return api.get('/users/')
    }

    static async getOneSpecie(id) {
        return api.get(`/users/${id}`)
    }

}
