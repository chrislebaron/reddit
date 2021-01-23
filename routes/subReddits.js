var express = require('express');
var router = express.Router();

const db = require('../db/db.js')

router.post('/users/:email/sub-reddits', async(req, res, next) => {
  const {subReddit} = req.body

  if(!subReddit || typeof subReddit !== 'string')
    return res.json({error: "'subReddit' is required and must be a string"});

  const email = req.params.email;

  const dbResult = await db.addSubreddit(email, subReddit)
  const user = await db.getUserByEmail(email);
  return res.json(user)

})

router.delete('/users/:email/sub-reddits', async (req, res, next) => {

  const {subReddit} = req.body

  if(!subReddit || typeof subReddit !== 'string')
    return res.json({error: "'subReddit' is required and must be a string"});

  const email = req.params.email;

  await db.removeSubreddit(email, subReddit);
  const user = await db.getUserByEmail(email);

  return res.json(user)

})


module.exports = router;
