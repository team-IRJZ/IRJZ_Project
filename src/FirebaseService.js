import { getFirebase } from './firebaseConfig';

/**
 * Gets a list of sample users from Firebase using the Firebase SDK
 * @returns {Promise<[]>}
 */
export const getUsers = () => {
    let users = [];
    return getFirebase()
        .database()
        .ref('/users')
        .once('value')
        .then(u => {
            const usersVal = u.val();
            for (let user in usersVal) {
                users.push({ ...{ id: user }, ...usersVal[user] });
            }
            return users;
        });
};
