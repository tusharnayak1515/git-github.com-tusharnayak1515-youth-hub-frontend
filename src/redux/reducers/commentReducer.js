let isComments;
let isError;

if(localStorage.getItem("youth_comments") === null) {
    isComments = null;
}
else {
    isComments = JSON.parse(localStorage.getItem("youth_comments"));
}

if(localStorage.getItem("youth_error") === null) {
    isError = null;
}
else {
    isError = localStorage.getItem("youth_error");
}

const initState = {
    comments: isComments,
    error: isError,
    isLoading: false
}

const commentReducer = (state=initState, action)=> {

    if(action.type === 'comment-loading') {
        return {
            ...state,
            isLoading: true
        }
    }

    else if(action.type === 'get-comments') {
        const {comments,error} = action.payload;
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
                comments: comments,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === 'add-comment') {
        const {comments,error} = action.payload;
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
                comments: comments,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === 'edit-comment') {
        const {comments,error} = action.payload;
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
                comments: comments,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === 'delete-comment') {
        const {comments,error} = action.payload;
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
                comments: comments,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === 'like-comment') {
        const {comments,error} = action.payload;
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
                comments: comments,
                isLoading: false,
                error: null
            }
        }
    }

    else if(action.type === 'unlike-comment') {
        const {comments,error} = action.payload;
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
                comments: comments,
                isLoading: false,
                error: null
            }
        }
    }

    else {
        return state;
    }

}

export default commentReducer;