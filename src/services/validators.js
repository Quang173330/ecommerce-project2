export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function validateUsername(username) {
    return username.length >= 4 && username.length <= 30;
} 

export function validatePassword(password) {
    return password.length >= 6;
}

export function validateImage(type) {
    return type === "image/jpeg" || type === "image/jpg" || type === "image/png";
}