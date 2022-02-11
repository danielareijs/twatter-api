const Pool = require('pg').Pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.IS_LOCAL ? undefined : {rejectUnauthorized: false},
})
// const pool = new Pool({
//   user: 'me',
//   host: 'localhost',
//   database: 'twitter',
//   password: 'password',
//   port: 5432,
// })


const getUserByUsername = (username) => {
    const sql =
    `SELECT * FROM users WHERE username = $1`;

    return pool.query(sql, [username])
    .then(res => {
        console.log(res.rows[0])
        return res.rows[0]
    })
    .catch(err => err)
}

const getAllTweets = () => {
    const sql = 
    `SELECT tweets.id, tweets.message, tweets.created_at, users.username, users.name, users.image, users.description
    FROM tweets
    JOIN users ON tweets.user_id = users.id
    ORDER BY created_at DESC`;

    return pool.query(sql)
    .then(res => res.rows)
    .catch(err => err)
}

const getTweetsByUser = (username) => {
    const sql = 
    `SELECT tweets.id, tweets.message, tweets.created_at, users.username, users.name, users.image, users.description
    FROM tweets
    JOIN users ON tweets.user_id = users.id
    WHERE users.username = $1
    ORDER BY created_at DESC`;
    
    return pool.query(sql, [username])
    .then(res => res.rows)
    .catch(err => err)
}

const createTweet = (message, id) => {
    
    const sql = 
    `INSERT INTO tweets (user_id, message)
    VALUES ($1, $2)`;
    
    return pool.query(sql, [id, message])
    .then(res => res.rows[0])
    .catch(err => err);
}

const deleteTweet = (id) => {
    pool.query('DELETE FROM tweets WHERE id = $1', [id])
    .then(res => res.rows[0])
    .catch(err => err);
}

module.exports = { 
    getUserByUsername,
    getAllTweets, 
    getTweetsByUser, 
    createTweet, 
    deleteTweet 
}

