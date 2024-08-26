import dotenv from 'dotenv';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptionsWithoutRequest } from 'passport-jwt';
import prisma from './dbConfig';

dotenv.config();

declare global {
  namespace Express {
    interface User {
      id: number
      username: string
      password: string
    }
  }
}

const options: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET ?? '',

};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
