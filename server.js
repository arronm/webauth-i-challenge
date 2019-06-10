const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const PORT = process.env.PORT || 4444;
const authRouter = require('./routers/auth');
const userRouter = require('./routers/users');
const secretRouter = require('./routers/secret');

const middleware = [
  helmet(),
  cors(),
  express.json(),
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
