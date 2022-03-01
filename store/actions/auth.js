export const SIGNUP = 'SIGNUP';

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
            throw new Error("Something went wrong");
        }

        dispatch({ type: SIGNUP })
    };
}