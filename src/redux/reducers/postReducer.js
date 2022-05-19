let isPosts;
let isError;

if(localStorage.getItem("youth_posts") === null) {
    isPosts = null;
}
else {
    isPosts = JSON.parse(localStorage.getItem("youth_posts"));
}

if(localStorage.getItem("youth_error") === null) {
    isError = null;
}
else {
    isError = localStorage.getItem("youth_error");
}

const initState = {
    posts: isPosts,
    error: isError,
    isLoading: false
}

const postReducer = (state=initState, action)=> {

    if(action.type === 'post-loading') {
        return {
            ...state,
            isLoading: true
        }
    }

    else if(action.type === 'get-posts') {
        const {posts,error} = action.payload;
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
                posts: posts,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === 'like-post') {
        const {posts,error} = action.payload;
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
                posts: posts,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === 'unlike-post') {
        const {posts,error} = action.payload;
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
                posts: posts,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === 'logout') {
        return {
            ...state,
            posts: [],
            isLoading: false,
            error: null
        }
    }

    else {
        return state;
    }

}

export default postReducer;