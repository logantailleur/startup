const { MongoClient } = require('mongodb');

const bcrypt = require('bcrypt');
const uuid = require('uuid');
const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const userCollection = client.db('chicken').collection('user');
const voteCollection = client.db('chicken').collection('votes');

function getUser(username) {
    return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function createUser(userName, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: userName,
        password: passwordHash,
        token: uuid.v4,
    };
    await userCollection.insertOne(user);

    var input = {User: userName, Restaurant: "restaurant"};

    await voteCollection.insertOne(input);

    return user;
}

function addVote(vote) {
  var output = voteCollection.updateOne(
    { "User" : vote.User },
    { $set: {"Restaurant" : vote.Restaurant}});
}

function getVotes() {
  const cursor = voteCollection.find();
  return cursor.toArray();
}

module.exports = { 
    addVote, 
    getVotes,
    getUser,
    getUserByToken,
    createUser,
    };