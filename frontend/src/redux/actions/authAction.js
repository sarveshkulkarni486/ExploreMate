export const login = (userData)=> {

    return (dispatch)=>{ dispatch({
        type:'LOGIN_SUCCESS',
        payload: userData,
    });
}
};

export const logout = () => {
    dispatch({
        type: 'LOGOUT',
    });
};
