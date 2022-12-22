
const initialState = {
    isAuthenticated: false,
    role: '',
    username: ''
    
    
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ON_LOGIN':
            return {
                ...state, 
            isAuthenticated: action.payload == null ? false: true,
            // role: action.payload == teacher ? false: true
            }
        case 'ON_SIGNOUT':
            return {
                ...state,
                isAuthenticated: false
            }
        case 'ON_ROLE':
            return {
                ...state,
                role: action.payload 
            }

        case 'ON_REG':
            return {
                ...state,
                username: action.payload 
            }
        default:
            return state    
        
    }
    
}

export default reducer 