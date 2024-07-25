import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running : http://localhost:${PORT}`);
  console.log(`📃 Show API document : http://localhost:${PORT}/docs`)
});
