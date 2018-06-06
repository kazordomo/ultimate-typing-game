export function authenticateUser(token) {
    localStorage.setItem('token', token);
}
export function isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
}
export function removeToken() {
    localStorage.removeItem('token');
}
export function getToken() {
    return localStorage.getItem('token');
}