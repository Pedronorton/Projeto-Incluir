let user = {
    isAuth: false,
    id: '',
    name: ''
};

const authReducer = (state = user, action) => {
    switch (action.type) {
        case 'SET_USER':
            const auth = action.payload.auth;
            const name = action.payload.name;
            const id = action.payload.id;
            user.isAuth = auth;
            user.name = name;
            user.id = id;
            return user;
    }

    return state;
};

export default authReducer;
