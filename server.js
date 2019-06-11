const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const knexSession = require('connect-session-knex')(session);

const PORT = process.env.PORT || 4444;
const authRouter = require('./routers/auth');
const userRouter = require('./routers/users');
const secretRouter = require('./routers/secret');

const sessionConfig = {
  name: 'ucsid',
  secret: 'purple unicorn rainbow farts',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 600,
    secure: false,
    httpOnly: true,
  },
  store: new knexSession({
    knex: require('./data/dbConfig'),
    tablename: 'session',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60,
  }),
};

const middleware = [
  helmet(),
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  }),
  express.json(),
  session(sessionConfig),
];

const server = express();
server.use(middleware);

server.get('/', (req, res) => {
  res.json({
    message: 'API Working.',
  });
});

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);
server.use('/api/secret', secretRouter);

server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
