const fs = require('fs')
const fileName = './db/store.json'

const loadData = () => {
    console.log('CALLING LOAD DATA')
    let rawData = fs.readFileSync(fileName)
    return JSON.parse(rawData);
}

const saveData = (data) => {
    console.log('SAVING DATA')
    fs.writeFileSync(fileName, JSON.stringify(data))
}

const createUser = async (user) => {
    const data = await loadData();

    const existingUser = await data.users.find(dataUser => dataUser.email === user.email)

    // if existing user, update it
    if(existingUser){
       console.error('USER ALREADY EXISTS')
        throw new Error('USER EXISTS');
    }else { // create new user
        data.users.push(user);
    }
    await saveData(data)

    return getUserByEmail(user.email);
}

const addSubreddit = async(email, subReddit) => {
    const data = await loadData();
    // throw error if values missing
    if(!email || !subReddit){
        throw new Error('addSubredit: "email" and "subReddit" required')
    }

    // find user
    const existingUser = await data.users.find(dataUser => dataUser.email === email);

    // throw error if user not found
    if(!existingUser){
        throw new Error('addSubredit: user not found')
    }

    // check if subReddit already in list, if so just return
    if(existingUser.subReddits.includes(subReddit))
        return

    existingUser.subReddits.push(subReddit);

    await saveData(data);
}

const removeSubreddit = async(email, subreddit) => {
    const data = await loadData();

    // throw error if values missing
    if(!email || !subreddit){
        throw new Error('removeSubredit: "email" and "subreddit" required')
    }

    // find user
    const existingUser = await data.users.find(dataUser => dataUser.email === email);
    // throw error if user not found
    if(!existingUser){
        throw new Error('removeSubredit: user not found')
    }

    existingUser.subReddits = existingUser.subReddits.filter(existingSubreddit => existingSubreddit !== subreddit)

    await saveData(data);

}

const listUsers = async(email, subreddit) => {
    const data = await loadData();
    return data.users;
}

const getUserByEmail = async (email) => {
    const data = await loadData();
    const user = data.users.find(user => user.email === email)
    return user
}

module.exports = {
    createUser,
    addSubreddit,
    removeSubreddit,
    listUsers,
    getUserByEmail
}