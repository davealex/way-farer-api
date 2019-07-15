import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routerV1 from './routes/api/v1/api';
import config from './config/app';
import specs from './config/swagger';
import getIndex from './controllers/indexController';
const { PORT } = config;

const app = express();
// serve API docs over this url
app.use('/api/v1/documentation', swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// prefixed v1 router
app.use('/api/v1', routerV1);

// respond to GET '/'
app.use((req, res, next) => {
  if (req.originalUrl === '/') getIndex(req, res);
  next();
});

app.use((req, res) => {
  res.status(404);

  // respond with json
  if (req.accepts('json')) res.send({ status: 404, error: 'Invalid route/URL' });
});

app.listen(PORT || 3000);

export default app;
