import axios from "axios";
import { GET_DOGS, SET_PAGE, SET_TOTAL_PAGE, SEARCH_DOGS, SET_LOADING } from "./actionType";

const URL = "http://localhost:3001/dogs"

export function allDogs() {
    return async function (dispatch) {
        const service = await axios(URL)
        const allDogsData = service.data

        dispatch({
            type: GET_DOGS,
            payload: allDogsData
        })
    }
}