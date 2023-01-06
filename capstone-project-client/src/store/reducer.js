
const initialState = {
    isAuthenticated: false,
    role: '',
    username: '',
    count: 0
    
    
}

const reducer = (state = initialState, action) => {
    if(state === undefined){
        state = {
            count: 0
        }
    }
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
        case 'INCREMENT':
            return {
                ...state,
                count:state.count + action.data
            }
        default:
            return state    
        
    }
    
}

export default reducer 