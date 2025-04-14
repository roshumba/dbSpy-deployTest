import { config } from 'dotenv';
import express, { Express } from 'express';
import log from './logger/index';
import routes from './routes';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// import serverlessExpress from '@vendia/serverless-express';

config();

// const port: number = Number(process.env.PORT) || 3000; // 🍊

const app: Express = express();
// app.get("/", (req, res) => res.send("Express on Vercel from server.ts >> index.ts 2")); // ❌

// Set the payload limit size to 1mb when save a large database data which is TableData in featureTab.
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      path: '/',
      sameSite: true,
      maxAge: 24 * 60 * 60 * 1000
    },
  })
);


app.get("/", (req, res) => res.send("Express on Vercel from server.ts >> index.ts 2")); //✅
// place outside listen for vercel
// routes(app); // ❌

// ❌ Remove for serverless deployment, not used
// 🔑 MUST BE USED FOR LOCALHOST RUNNING
app.listen(4000, () => {
  // log.info(`Securely Running at ${port}`); //🍊
  log.info(`Securely Running at 3000`);
  routes(app); //✅ 
});

// export default app;

// Export wrapped handler
// exports.handler = serverlessExpress({ app });
module.exports = app;
