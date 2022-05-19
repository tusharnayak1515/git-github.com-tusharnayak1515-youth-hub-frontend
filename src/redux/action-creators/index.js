import axios from "axios";

// ****************USER SECTION*************\\
export const register = ({name,username,email,password})=> async (dispatch)=> {
    dispatch({
        type: 'user-loading'
    });

    try {
        const res = await axios.post('http://localhost:5000/api/auth/register',{name,username,email,password});

        if(res.data.success) {
            localStorage.setItem("youth_token",res.data.authToken);
            dispatch({
                type: 'register',
                payload: {
                    user: res.data.authToken,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'register',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'register',
            payload: {
                error: error.message
            }
        });
    }
}

export const login = ({email,password})=> async (dispatch)=> {
    dispatch({
        type: 'user-loading'
    });

    try {
        const res = await axios.post('http://localhost:5000/api/auth/login',{email,password});

        if(res.data.success) {
            localStorage.setItem("youth_token",res.data.authToken);
            dispatch({
                type: 'login',
                payload: {
                    user: res.data.authToken,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'login',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'login',
            payload: {
                error: error.message
            }
        });
    }
}

export const profile = ()=> async (dispatch)=> {
    dispatch({
        type: 'user-loading'
    });

    const token = localStorage.getItem("youth_token");
    try {
        const res = await axios.get('http://localhost:5000/api/auth/profile',{headers: {'auth-token': token}});

        if(res.data.success) {
            localStorage.setItem("youth_profile",JSON.stringify(res.data.user));
            dispatch({
                type: 'profile',
                payload: {
                    profile: res.data.user,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'profile',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'profile',
            payload: {
                error: error.message
            }
        });
    }
}

export const editProfile = ({name,username,email,profilepic,bio})=> async (dispatch)=> {
    dispatch({
        type: 'user-loading'
    });

    const token = localStorage.getItem("youth_token");
    try {
        const res = await axios.put('http://localhost:5000/api/auth/edit-profile',
        {name,username,email,profilepic,bio},
        {headers: {'auth-token': token}});

        if(res.data.success) {
            localStorage.setItem("youth_profile",JSON.stringify(res.data.user));
            dispatch({
                type: 'edit-profile',
                payload: {
                    profile: res.data.user,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'edit-profile',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'edit-profile',
            payload: {
                error: error.message
            }
        });
    }
}

export const addDp = (pic)=> async (dispatch)=> {
    dispatch({
        type: 'user-loading'
    });

    const token = localStorage.getItem("youth_token");
    try {
        const data = new FormData();
        data.append("file", pic);
        data.append("upload_preset", "youth-hub");
        data.append("cloud_name", "alpha2625");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/alpha2625/image/upload",
          data
        );

        const image = response.data.secure_url; 
        const res = await axios.put('http://localhost:5000/api/auth/add-dp',{image},{headers: {'auth-token': token}});

        if(res.data.success) {
            localStorage.setItem("youth_profile",JSON.stringify(res.data.user));
            dispatch({
                type: 'add-dp',
                payload: {
                    profile: res.data.user,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'add-dp',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'add-dp',
            payload: {
                error: error.message
            }
        });
    }
}

export const getSuggestions = ()=> async (dispatch)=> {
    // dispatch({
    //     type: 'user-loading'
    // });

    const token = localStorage.getItem("youth_token");
    try {
        const res = await axios.get('http://localhost:5000/api/auth/getsuggestion',{headers: {'auth-token': token}});

        if(res.data.success) {
            localStorage.setItem("youth_suggestions",JSON.stringify(res.data.suggestions));
            dispatch({
                type: 'get-suggestion',
                payload: {
                    suggestions: res.data.suggestions,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'get-suggestion',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'get-suggestion',
            payload: {
                error: error.message
            }
        });
    }
}

export const follow = (id)=> async (dispatch)=> {
    // dispatch({
    //     type: 'user-loading'
    // });

    const token = localStorage.getItem("youth_token");
    try {
        const res = await axios.put(`http://localhost:5000/api/auth/follow/${id}`,{},{headers: {'auth-token': token}});

        if(res.data.success) {
            localStorage.setItem("youth_profile",JSON.stringify(res.data.user));
            dispatch({
                type: 'follow',
                payload: {
                    profile: res.data.user,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'follow',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'follow',
            payload: {
                error: error.message
            }
        });
    }
}

export const unfollow = (id)=> async (dispatch)=> {
    // dispatch({
    //     type: 'user-loading'
    // });

    const token = localStorage.getItem("youth_token");
    try {
        const res = await axios.put(`http://localhost:5000/api/auth/unfollow/${id}`,{},{headers: {'auth-token': token}});

        if(res.data.success) {
            localStorage.setItem("youth_profile",JSON.stringify(res.data.user));
            dispatch({
                type: 'unfollow',
                payload: {
                    profile: res.data.user,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'unfollow',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'follow',
            payload: {
                error: error.message
            }
        });
    }
}

export const search = (name)=> async (dispatch)=> {
    dispatch({
        type: 'user-loading'
    });

    const token = localStorage.getItem("youth_token");
    try {
        const res = await axios.get(`http://localhost:5000/api/auth/users/${name}`,{headers: {'auth-token': token}});

        if(res.data.success) {
            dispatch({
                type: 'search',
                payload: {
                    users: res.data.users,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'search',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'search',
            payload: {
                error: error.message
            }
        });
    }
}

export const getUser = (id)=> async (dispatch)=> {
    dispatch({
        type: 'user-loading'
    });

    const token = localStorage.getItem("youth_token");
    try {
        const res = await axios.get(`http://localhost:5000/api/auth/user/${id}`,{headers: {'auth-token': token}});

        if(res.data.success) {
            dispatch({
                type: 'get-user',
                payload: {
                    otherUser: res.data.otherUser,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'get-user',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'get-user',
            payload: {
                error: error.message
            }
        });
    }
}

export const resetUser = ()=> async (dispatch)=> {
    dispatch({
        type: 'reset-user'
    });
}

export const logout = ()=> async (dispatch)=> {
    localStorage.clear();
    dispatch({
        type: 'logout'
    });
}

// *************MESSAGE SECTION******************\\
export const getConversations = ()=> async (dispatch)=> {
    dispatch({
        type: 'convo-loading'
    });

    const token = localStorage.getItem("youth_token");
    try {
        const res = await axios.get('http://localhost:5000/api/message/conversations',{headers: {'auth-token': token}});

        if(res.data.success) {
            localStorage.setItem("youth_conversations",JSON.stringify(res.data.conversations));
            dispatch({
                type: 'get-cnvs',
                payload: {
                    cnvs: res.data.conversations,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'get-cnvs',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'get-cnvs',
            payload: {
                error: error.message
            }
        });
    }
}

export const getMessages = (receiverId,senderId)=> async (dispatch)=> {
    dispatch({
        type: 'msg-loading'
    });

    const token = localStorage.getItem("youth_token");
    try {
        // console.log(senderId);
        const res = await axios.get(`http://localhost:5000/api/message/msg/${senderId}/${receiverId}`,{headers: {'auth-token': token}});
        if(res.data.success) {
            // console.log(res.data);
            dispatch({
                type: 'get-msgs',
                payload: {
                    msgs: res.data.messages,
                    error: null
                }
            });
        }

        if(res.data.error) {
            console.log("error in getMessages");
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'get-msgs',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'get-msgs',
            payload: {
                error: error.message
            }
        });
    }
}

export const receiveMessages = (receiverId,senderId)=> async (dispatch)=> {
    // dispatch({
    //     type: 'msg-loading'
    // });

    const token = localStorage.getItem("youth_token");
    try {
        const res = await axios.get(`http://localhost:5000/api/message/msg/${senderId}/${receiverId}`,{headers: {'auth-token': token}});
        if(res.data.success) {
            // console.log(res.data);
            dispatch({
                type: 'get-msgs',
                payload: {
                    msgs: res.data.messages,
                    error: null
                }
            });
        }

        if(res.data.error) {
            console.log("error in receiveMessages");
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'get-msgs',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'get-msgs',
            payload: {
                error: error.message
            }
        });
    }
}

export const sendMessage = ({socket,text,images,receiverId,senderId})=> async (dispatch)=> {
    // dispatch({
    //     type: 'msg-loading'
    // });

    const token = localStorage.getItem("youth_token");
    try {
        // console.log("Sender: ",senderId);
        // console.log("Receiver: ",receiverId);
        const res = await axios.post(`http://localhost:5000/api/message/${senderId}/${receiverId}`,
        {text,images},
        {headers: {'auth-token': token}});

        if(res.data.success) {
            socket.current.emit("sendMessage", res.data.message);
            dispatch({
                type: 'send-msg',
                payload: {
                    msgs: res.data.messages,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'send-msg',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'send-msg',
            payload: {
                error: error.message
            }
        });
    }
}

export const newCnv = (senderId, receiverId)=> async (dispatch)=> {
    dispatch({
        type: 'convo-loading'
    });

    const token = localStorage.getItem("youth_token");
    try {
        const res = await axios.post(`http://localhost:5000/api/message/newcnv/${senderId}/${receiverId}`,
        {},
        {headers: {'auth-token': token}});

        if(res.data.success) {
            localStorage.setItem("youth_conversations",JSON.stringify(res.data.conversations));
            dispatch({
                type: 'new-cnv',
                payload: {
                    cnv: res.data.conversations,
                    msgs: res.data.messages,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'new-cnv',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'new-cnv',
            payload: {
                error: error.message
            }
        });
    }
}

// ******************POST SECTION***************\\

export const getPosts = ()=> async (dispatch)=> {
    dispatch({
        type: 'post-loading'
    });

    const token = localStorage.getItem("youth_token");
    try {
        const res = await axios.get('http://localhost:5000/api/posts/',{headers: {'auth-token': token}});
        
        if(res.data.success) {
            localStorage.setItem("youth_posts",JSON.stringify(res.data.posts));
            dispatch({
                type: 'get-posts',
                payload: {
                    posts: res.data.posts,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'get-posts',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'get-posts',
            payload: {
                error: error.message
            }
        });
    }

}

export const likePost = (id)=> async (dispatch)=> {
    const token = localStorage.getItem("youth_token");
    try {
        const res = await axios.put(`http://localhost:5000/api/posts/likepost/${id}`,{},{headers: {'auth-token': token}});
        
        if(res.data.success) {
            localStorage.setItem("youth_posts",JSON.stringify(res.data.posts));
            dispatch({
                type: 'like-post',
                payload: {
                    posts: res.data.posts,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'like-post',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'like-post',
            payload: {
                error: error.message
            }
        });
    }

}

export const unlikePost = (id)=> async (dispatch)=> {
    const token = localStorage.getItem("youth_token");
    try {
        const res = await axios.put(`http://localhost:5000/api/posts/unlikepost/${id}`,{},{headers: {'auth-token': token}});
        
        if(res.data.success) {
            localStorage.setItem("youth_posts",JSON.stringify(res.data.posts));
            dispatch({
                type: 'unlike-post',
                payload: {
                    posts: res.data.posts,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'unlike-post',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'unlike-post',
            payload: {
                error: error.message
            }
        });
    }

}

// ***************Comment Section****************\\

export const getComments = ()=> async (dispatch)=> {
    dispatch({
        type: 'comment-loading'
    });

    const token = localStorage.getItem("youth_token");
    try {
        const res = await axios.get(`http://localhost:5000/api/comments/`,{headers: {'auth-token': token}});
        
        if(res.data.success) {
            localStorage.setItem("youth_comments",JSON.stringify(res.data.comments));
            dispatch({
                type: 'get-comments',
                payload: {
                    comments: res.data.comments,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'get-comments',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'get-comments',
            payload: {
                error: error.message
            }
        });
    }
} 

export const addComment = (id,comment)=> async (dispatch)=> {
    const token = localStorage.getItem("youth_token");
    try {
        const res = await axios.post(`http://localhost:5000/api/comments/addcomment/${id}`,{comment},{headers: {'auth-token': token}});
        
        if(res.data.success) {
            localStorage.setItem("youth_posts",JSON.stringify(res.data.posts));
            localStorage.setItem("youth_comments",JSON.stringify(res.data.comments));
            dispatch({
                type: 'add-comment',
                payload: {
                    comments: res.data.comments,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'add-comment',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'add-comment',
            payload: {
                error: error.message
            }
        });
    }
}

export const editComment = (commentId,comment)=> async (dispatch)=> {
    const token = localStorage.getItem("youth_token");
    try {
        const res = await axios.put(`http://localhost:5000/api/comments/editcomment/${commentId}`,{comment},{headers: {'auth-token': token}});
        
        if(res.data.success) {
            localStorage.setItem("youth_posts",JSON.stringify(res.data.posts));
            localStorage.setItem("youth_comments",JSON.stringify(res.data.comments));
            dispatch({
                type: 'edit-comment',
                payload: {
                    comments: res.data.comments,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'edit-comment',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'edit-comment',
            payload: {
                error: error.message
            }
        });
    }
}

export const deleteComment = (postId,commentId)=> async (dispatch)=> {
    const token = localStorage.getItem("youth_token");
    try {
        const res = await axios.delete(`http://localhost:5000/api/comments/deletecomment/${postId}/${commentId}`,{headers: {'auth-token': token}});

        if(res.data.success) {
            localStorage.setItem("youth_posts",JSON.stringify(res.data.posts));
            localStorage.setItem("youth_comments",JSON.stringify(res.data.comments));
            dispatch({
                type: 'delete-comment',
                payload: {
                    comments: res.data.comments,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'delete-comment',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'delete-comment',
            payload: {
                error: error.message
            }
        });
    }
}

export const likeComment = (id)=> async (dispatch)=> {
    const token = localStorage.getItem("youth_token");
    try {
        const res = await axios.put(`http://localhost:5000/api/comments/likecomment/${id}`,{},{headers: {'auth-token': token}});
        
        if(res.data.success) {
            localStorage.setItem("youth_comments",JSON.stringify(res.data.comments));
            dispatch({
                type: 'like-comment',
                payload: {
                    comments: res.data.comments,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'like-comment',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'like-comment',
            payload: {
                error: error.message
            }
        });
    }
}

export const unlikeComment = (id)=> async (dispatch)=> {
    const token = localStorage.getItem("youth_token");
    try {
        const res = await axios.put(`http://localhost:5000/api/comments/unlikecomment/${id}`,{},{headers: {'auth-token': token}});
        
        if(res.data.success) {
            localStorage.setItem("youth_comments",JSON.stringify(res.data.comments));
            dispatch({
                type: 'like-comment',
                payload: {
                    comments: res.data.comments,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("youth_error",res.data.error);
            dispatch({
                type: 'like-comment',
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: 'like-comment',
            payload: {
                error: error.message
            }
        });
    }
}