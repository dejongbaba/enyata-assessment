import {api} from "@/services/index";

export default class SpeciesService {
    static async getSpecies() {
        return api.get('/photos/')
    }

    static async getOneSpecie(id) {
        return api.get(`/photos/${id}`)
    }

}
