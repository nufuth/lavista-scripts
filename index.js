import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Lavista App is Working! 🚀');
});

app.get('/callback', (req, res) => {
  res.send('تم الاتصال بنجاح!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
