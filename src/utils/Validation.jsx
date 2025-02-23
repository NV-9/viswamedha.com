
export const validateUsername = (username) => {
    const regex = /^[a-z0-9]+$/;
    return regex.test(username);
}

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>?\/\\|`~])[A-Za-z\d!@#$%^&*()_\-+=\[\]{};:'",.<>?\/\\|`~]{8,}$/;
    return regex.test(password);
};
