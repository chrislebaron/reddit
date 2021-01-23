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

