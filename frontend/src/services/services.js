import axios from "axios";
import {API_URL} from "../config/api-config";

export const _create = (task) => {
    return axios.post(API_URL + '/todos/', {
        "task": task
    })
}

export const _read = () => {
    return axios.get(API_URL + '/todos/')
}

export const _update = (task, newtask) => {
    return axios.put(API_URL + '/todos/' + task, {
        "task": newtask
    })
}

export const _delete = (task) => {
    return axios.delete(API_URL + "/todos/" + task)
}
