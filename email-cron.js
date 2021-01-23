const cron = require('cron').CronJob;
const axios = require('axios')
const format = require('date-fns/format')

const db = require('./db/db')

const sendEmails =  async (ignoreTime = false) => {
    const data = await db.loadData();
    const users = data.users
    const now = format(new Date(), 'HH:mm')
    if(ignoreTime === false){
        console.log('SENDING TO EMAILS TO USERS WITH MATCHED TIME: ', now);
    }


    for (const user of users){
        if(!ignoreTime){
            if(now !== user.sendTime)
                continue;
        }
        const emailData = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            redditData: []
        }
        for(const subReddit of user.subReddits){
            emailData.redditData.push(await getRedditPosts(subReddit))
        }
        console.log('EMAIL DATA: ', JSON.stringify(emailData));
    }
}

const getRedditPosts = async (subReddit) => {
    // ADD SLASH TO URL IF NEEDED
    const lastChar = subReddit.slice(-1);
    if(lastChar !== '/')
        subReddit += '/'

    // GET JSON RESULTS FROM REDDIT
    const url = subReddit + 'top.json?limit=3'
    console.log('SUBREDDIT URL:', url);
    const redditResult = await axios.get(url);
    console.log('SUB REDDIT DATA', redditResult.data);
    const subRedditUrl= subReddit + 'top'


    // LOOP THROUGH RETURNED RESULTS AND GET DATA FOR EMAIL
    const emailData = []
    for(const result of redditResult.data.data.children){
        // console.log('CHILD!', JSON.stringify(result))
        console.log('');
        const data = {
            subredditName: result.data.subreddit,
            subredditUrl: subRedditUrl,
            postUrl: `https://reddit.com${result.data.permalink}`,
            ups: result.data.ups,
            thumbnail: result.data.thumbnail,
            title: result.data.title
        }
        emailData.push(data);
    }

    return emailData;
}

module.exports = {sendEmails}

new cron('* * * * *', sendEmails(false), null, true);