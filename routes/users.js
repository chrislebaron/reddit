var express = require('express');
var router = express.Router();

const db = require('../db/db.js')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const users = await db.listUsers();
  return res.json(users);
});

router.get('/:email', async (req, res, next) => {
  const user = await db.getUserByEmail(req.params.email)
  if(user){
    return res.json(user);
  }

  return res.status(404).send();
});

router.post('/', async(req, res, next) => {
  const {email, firstName, lastName, sendTime, send} = req.body

  const errors = [];

  // validate user
  if(!email || typeof email !== 'string')
    errors.push("'email' is required and must be a string")
  if(!firstName || typeof firstName !== 'string')
    errors.push("'firstName' is required and must be a string")
  if(!lastName || typeof lastName !== 'string')
    errors.push("'lastName' is required and must be a string")
  if(!sendTime || typeof sendTime !== 'string')
    errors.push("'sendTime' is required and must be a string formatted in 'hh:mm' format")
  if(!send || typeof send !== 'boolean')
    errors.push("'send' is required and must be boolean value")
  if(errors.length)
    return res.status(400).send(errors)

  // create user
  try {
    const user = await db.createUser({
      email,
      firstName,
      lastName,
      sendTime,
      send,
      subReddits: []
    })
  } catch(e){
    if(e.message && e.message === 'USER EXISTS'){
      return res.status(400).json({error: "User already exists", user: await db.getUserByEmail(email)})
    }
  }
})


module.exports = router;
