import express from 'express';
import { Salla } from '@salla.sa/cli';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Lavista App is Running! 🚀');
});

// هذا الرابط الذي ستضعه في سلة (Callback URL)
app.get('/callback', async (req, res) => {
  res.send('تم ربط التطبيق بنجاح! يمكنك إغلاق الصفحة.');
  console.log("تم استدعاء الكول باك");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
