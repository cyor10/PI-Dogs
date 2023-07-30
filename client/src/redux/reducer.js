import { GET_DOGS } from "./actionType";

const initialState = {
    allDogs: [],
    isLoading: false
}

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_DOGS:
            return {
                ...state,
                allDogs: payload
            }
        default:
            return state;
    }
}