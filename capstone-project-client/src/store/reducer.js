
const initialState = {
    isAuthenticated: false 
}

const reducer = (state = initialState, action) => {

    if(action.type === 'ON_LOGIN') {
        return {
            ...state, 
            isAuthenticated: action.payload == null ? false: true 
        }
    }
    return state 
}

export default reducer 