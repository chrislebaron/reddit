const fs = require('fs')
const fileName = 'store.json'

const loadData = () => {
    let rawData = fs.readFileSync(fileName)
    return JSON.parse(data);
}

const saveData = (data) => {
    fs.writeFileSync(fileName, data)
}

const saveUser = async (user) => {
    const data = await loadData();

    const existingUser = await data.users.find(dataUser => dataUser.email === user.email)

    // if existing user, update it
    if(existingUser){
       console.log('NEED TO UPDATE THE USER')
    }else { // create new user
        data.users.push(user);
    }
    await saveData(data)
}

const addSubreddit = async(email, subreddit) => {
    const data = await loadData();
    // throw error if values missing
    if(!email || !subreddit){
        throw new Error('addSubredit: "email" and "subreddit" required')
    }

    // find user
    const existingUser = await data.users.find(dataUser => dataUser.email === email);

    // throw error if user not found
    if(!existingUser){
        throw new Error('addSubredit: user not found')
    }

    // check if subreddit already in list, if so just return
    if(existingUser.subReddits.includes(subreddit))
        return

    existingUser.subReddits.push(subreddit);

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
}

module.exports = {saveUser, addSubreddit, removeSubreddit}