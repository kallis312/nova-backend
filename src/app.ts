import express, { Application } from 'express';
import morgan from 'morgan';
import swaggerUi from "swagger-ui-express";
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import passport from '@/config/passport';
import requestLogger from '@/middlewares/requestLogger';
import { errorHandler } from '@/middlewares/errorHandler';
import routes from '@/routes';
import path from 'path'

const app: Application = express();

const apiPrefix = process.env.API_PREFIX || '/api';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(requestLogger);

// Session configuration
app.use(
  session({
    secret: process.env.JWT_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/openapi.yaml",
    },
  })
);

app.use(express.static(path.join(__dirname, "../public")));
// Routes
app.use(apiPrefix, routes);

// Error handling
app.use(errorHandler);

export default app;
