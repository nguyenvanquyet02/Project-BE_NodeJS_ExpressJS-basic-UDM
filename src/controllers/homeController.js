const connection = require('../config/database');
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../services/CRUDservice');
const User = require('../models/user');


const getHomePage = async (req, res, next) => {
    await User.find({})
        .then(user => res.render('home.ejs', { listUsers: user }))
        .catch(next)
}
const getName = (req, res) => {
    res.render('sample.ejs');
}
const postCreateUsers = async (req, res) => {
    let { email, name, city } = req.body;// req.body get data from clients
    // let [results, fields] = await connection.query(
    //     `INSERT INTO Users(email, name, city)
    //     VALUES(?, ?, ?)`, [email, name, city]
    // )
    User.create({
        name, email, city
    });
    res.redirect('/');
}
const getCreate = (req, res) => {
    res.render('create.ejs');
}
// req.params lay id
const getUpdate = async (req, res) => {
    let userId = req.params.id;
    let user = await getUserById(userId);
    // User.findById(req.params.id)
    // .then(user => res.render('edit.ejs', { userEdit: user }))
    // .catch(() => { })
    res.render('edit.ejs', { userEdit: user })
}
const postUpdateUsers = async (req, res) => {
    let { userId, email, name, city } = req.body;
    // await updateUserById(email, name, city, userId);
    await User.updateOne({ _id: userId }, { name, email, city });// fillter, nd update
    res.redirect('/');
}
const postDeleteUser = async (req, res) => {
    let userId = req.params.id;
    let user = await getUserById(userId);
    res.render('delete.ejs', { userEdit: user });
}
const postHandleRemoveUser = async (req, res) => {
    let userId = req.body.userId;
    // await deleteUserById(userId);
    await User.deleteOne({ _id: userId });
    res.redirect('/');
}
module.exports = {
    getHomePage, getName, postCreateUsers, getCreate, getUpdate,
    postUpdateUsers, postDeleteUser, postHandleRemoveUser
}