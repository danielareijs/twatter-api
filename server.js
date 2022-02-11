require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const cors = require('cors');
const jwt = require('jsonwebtoken');
const port = process.env.PORT;
const secret = process.env.SECRET;


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors());

const verifyToken = (req, res, next) =>{
  console.log(req.headers);
  const token = req.headers['x-auth-token'];
  console.log('Token: ', token);

  try {
    const payload = jwt.verify(token, Buffer.from(secret, 'base64'));
    req.payload = payload;
    next();
  } catch (error) {
    res.status(401).send({
      error: 'Invalid token',
    });
  }
}

app.get('/tweets', async (req, res) => {
  const tweets = await db.getAllTweets();
  res.send(tweets);
})

app.get('/tweets/:username', async (req, res) => {
  const username = req.params.username;
  const tweets = await db.getTweetsByUser(username);
  res.send(tweets);
})

app.post('/tweets', verifyToken, async (req, res) => {
  const id = req.payload.id
  const message = req.body.message;

  const tweet = await db.createTweet(message, id);
  res.send(tweet);
})

app.delete('/tweets/:id', verifyToken, async (req, res) => {
  // const id = req.payload.id
  const id = req.params.id;

  await db.deleteTweet(id);
  res.send('Post deleted');
})

app.get('/users/:username', async (req, res) => {
  const username = req.params.username;
  const user = await db.getUserByUsername(username);
  res.send(user);
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.getUserByUsername(username);

    if (!user) {
      return res
      .status(401)
      .send({ error: 'Invalid username' });
    }
  
    if (password !== user.password) {
      return res
      .status(401)
      .send({ error: 'Wrong password' });
    }
  
    const token = jwt.sign({
      id: user.id,
      username: user.username,
      name: user.name,
    }, Buffer.from(secret, 'base64'));
  
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
});


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })