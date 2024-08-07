import axios from "axios";
import https from "https";

export const annotationServer = axios.create({
  baseURL: process.env.ANNOTATION_SERVER_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export const jupiterServer = axios.create({
  baseURL: process.env.JUPITER_SERVER_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});
