const axios = require('axios');
const firebaseBaseUrl = process.env.REACT_APP_DATA_BASEURL;
const instance = axios.create({
    baseURL: firebaseBaseUrl
})

/**
 * Gets a list of sample users from Firebase via Ajax
 * @returns {Promise<[]>}
 */
export const getUsersFromAxios = () => {
    let users = [];
    return instance.get('/users.json')
        .then(response => {
            const usersVal = response.data;
            for (let user in usersVal) {
                users.push({ ...{ id: user }, ...response.data[user] })
            }
            return users;
        });
};
