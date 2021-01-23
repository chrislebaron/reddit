# hear.com backend project

## Setup
####Install dependencies

`yarn install`

####Run the server:

`node app.js`

The server will run at `localhost:3000`

## Endpoints

#### List users
GET localhost:3000/users

#### View single user
GET localhost:3000/users/:email-address

For example
localhost:3000/users/chrislebaron@gmail.com

#### Create user
POST to localhost:3000/users

Example body object
```
{
    "error": "User already exists",
    "user": {
        "email": "chrislebaron@gmail.com",
        "firstName": "Chris",
        "lastName": "LeBaron",
        "sendTime": "08:00", // time on 24 hour clock
        "send": true, // whether or not to send
    }
}
```

#### Update user
PUT TO localhost:3000/users/:email-address

The PUT endpoint can handle any or all of the properties the Create user 


#### Add a SubReddit to a user
POST to localhost:3000/users/:email-address/sub-reddits

Example body object:
```
{
    "subReddit": "https://www.reddit.com/r/funny/"
}
```

#### Remove a subreddit from a user
DELETE to localhost:3000/users/chrislebaron@gmail.com/sub-reddits
Example body object:
```
{
    "subReddit": "https://www.reddit.com/r/AskReddit/"
}
```

## Email cron job
I've created a script that will run every minute, it checks for users that have the current minute set as their send time, get's the data from the Reddit API, and prints out the data needed for each email.

To run it:
```
node email-cron.js
```


# What I would have done in a real project
### Database

This project uses a JSON file for the database for simplicity. In a real project I would use a proper database with Sequelize, broken out into separate user and subreddit tables.

## Validation
### there were a few endpoints where I just didn't have time to create as much validation as I'd have liked.

## Error handling
### Again, because of time, I didn't do much to handle errors or edge cases.

# Handling Slack
To handle sending to Slack instead of an email, I don't think we'd have to do much different. We could add a new table to the database that would house our "sendTypes". We could then set a sendType to each user, and then when sending, we can choose Email, Slack or some other future sendType that gets added.