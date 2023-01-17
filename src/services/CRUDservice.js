const connection = require('../config/database');
const getAllUsers = async () => {
    let [results, fields] = await connection.query(
        `SELECT * FROM Users`
    )
    return results;
}
const getUserById = async (userId) => {
    let [results, fields] = await connection.query(
        `SELECT * FROM Users WHERE Users.id = ?`, [userId]);
    let user = results && results.length > 0 ? results[0] : {};
    return user;
}
const updateUserById = async (email, name, city, userId) => {
    let [results, fields] = await connection.query(`
        UPDATE Users
        SET email = ?,name = ?, city = ?
        WHERE id = ?`, [email, name, city, userId]
    )
}
const deleteUserById = async (userId) => {
    let [results, fields] = await connection.query(`
        DELETE FROM Users WHERE id = ?
    `, [userId]);
}
module.exports = {
    getAllUsers, getUserById, updateUserById, deleteUserById
}