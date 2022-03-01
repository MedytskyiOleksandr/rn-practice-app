export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
    return async dispatch => {
        const responce = fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBTgKoka2_tfCWtwIqHIkwpsEpY-9MMVic",
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        const responceData = await responce.json()

        if (!responce.ok) {
            if (!responce.ok) {
                const errorResponseData = await responce.json();
                const errorId = errorResponseData.error.message;
                let message = "SOMETHING_WENT_WRONG_!"
                if (errorId !== 'EMAIL_EXISTS' ||
                    errorId !== 'OPERATION_NOT_ALLOWED' ||
                    errorId !== 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                    throw new Error(message);
                } else {
                    throw new Error(errorId);
                }
            }
        }

        dispatch({ type: SIGNUP })
    };
}

export const login = (email, password) => {
    return async dispatch => {
        const responce = fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTgKoka2_tfCWtwIqHIkwpsEpY-9MMVic",
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        const responceData = await responce.json()

        if (!responce.ok) {
            const errorResponseData = await responce.json();
            const errorId = errorResponseData.error.message;
            let message = "SOMETHING_WENT_WRONG_!"
            if (errorId !== 'EMAIL_NOT_FOUND' ||
                errorId !== 'INVALID_PASSWORD' ||
                errorId !== 'USER_DISABLED') {
                throw new Error(message);
            } else {
                throw new Error(errorId);
            }
        }

        dispatch({ type: LOGIN })
    };
}