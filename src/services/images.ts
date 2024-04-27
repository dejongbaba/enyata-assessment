import {api} from "@/services/index";

export default class ImageService {

    static async getOne(id = '1') {
        return api.get(`/photos/${id}`)
    }

}
