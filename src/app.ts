import express, { Application } from 'express';
import morgan from 'morgan';
import swaggerUi from "swagger-ui-express";
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import passport from '@/config/passport';
// import userRoutes from './routes/userRoutes';
import requestLogger from '@/middlewares/requestLogger';
import { errorHandler } from '@/middlewares/errorHandler';
import authRoutes from '@/routes/authRoutes';
import dicomRoutes from '@/routes/dicomRoutes';

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

app.use(express.static('public'))
// Routes
app.use(apiPrefix + '/auth', authRoutes);
app.use(apiPrefix + '/dicom', dicomRoutes);
// app.use('/api/users', userRoutes);

// Error handling
app.use(errorHandler);

export default app;
