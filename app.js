const express = require('express');
const path = require('path');

// import routes
const usersRouter = require('./routes/users');
const subRedditsRouter = require('./routes/subReddits');

const app = express();

const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
// use routes
app.use('/', subRedditsRouter);

module.exports = app;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
