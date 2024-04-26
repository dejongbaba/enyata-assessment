import {api} from "@/services/index";

export default class SpeciesService {
    static async getSpecies() {
        return api.get('/species/')
    }

    static async getOneSpecie(id) {
        return api.get(`/species/${id}`)
    }

}
