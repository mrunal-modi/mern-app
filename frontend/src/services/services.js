import axios from "axios";
import {API_URL} from "../config/api-config";

export const _create = (email) => {
    return axios.post(API_URL + '/v1/todos/', {
        "email": email
    })
}

export const _read = () => {
    return axios.get(API_URL + '/v1/todos/')
}

export const _update = (email, newEmail) => {
    return axios.put(API_URL + '/v1/todos/' + email, {
        "email": newEmail
    })
}

export const _delete = (email) => {
    return axios.delete(API_URL + "/v1/todos/" + email)
}
