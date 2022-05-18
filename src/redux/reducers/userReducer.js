let isUser;
let isProfile;
let isSuggestions;
let isError;

if(localStorage.getItem("youth_token") === null) {
    isUser = null;
}
else {
    isUser = localStorage.getItem("youth_token");
}

if(localStorage.getItem("youth_profile") === null) {
    isProfile = null;
}
else {
    isProfile = JSON.parse(localStorage.getItem("youth_profile"));
}

if(localStorage.getItem("youth_suggesstions") === null) {
    isSuggestions = [];
}
else {
    isSuggestions = JSON.parse(localStorage.getItem("youth_suggestions"));
}

if(localStorage.getItem("youth_error") === null) {
    isError = null;
}
else {
    isError = localStorage.getItem("youth_error");
}

const initState = {
    user: isUser,
    profile: isProfile,
    suggestions: isSuggestions,
    searchedUsers: [],
    otherUser: null,
    error: isError,
    isLoading: false
}

const userReducer = (state=initState, action)=> {

    if(action.type === 'loading') {
        return {
            ...state,
            isLoading: true
        }
    }

    else if(action.type === 'reset-user') {
        return {
            ...state,
            otherUser: null
        }
    }

    else if(action.type === 'register') {
        const {user,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                user: user,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === 'login') {
        const {user,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                user: user,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === 'profile') {
        const {profile,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                profile: profile,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === 'edit-profile') {
        const {profile,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                profile: profile,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === 'add-dp') {
        const {profile,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                profile: profile,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === 'get-suggestion') {
        const {suggestions,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                suggestions: suggestions,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === 'follow') {
        const {profile,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                profile: profile,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === 'unfollow') {
        const {profile,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                profile: profile,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === 'search') {
        const {users,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                searchedUsers: users,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === 'get-user') {
        const {otherUser,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                otherUser: otherUser,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === 'logout') {
        return {
            ...state,
            user: null,
            profile: null,
            isLoading: false,
            suggestions: [],
            error: null
        }
    }

    else {
        return state;
    }

}

export default userReducer;