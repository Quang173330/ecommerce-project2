function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateUsername(username) {
    return username.length >= 4 || username.length <= 30;
}
function validateName(name){
    return name.length>=4;
}
function validatePhone(phone){
    return phone.length>=10;
}
function validateAddress(address){
    return address.length>=10;
}
function validatePassword(password) {
    return password.length >= 6;
}

function validateImage(type) {
    return type === "image/jpeg" || type === "image/jpg" || type === "image/png";
}

module.exports = {
    validateName,
    validatePhone,
    validateAddress,
    validateEmail,
    validateUsername,
    validatePassword,
    validateImage
};