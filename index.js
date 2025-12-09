import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// الرابط المباشر لملفك في GitHub (تأكد أنه صحيح)
const SCRIPT_URL = "https://cdn.jsdelivr.net/gh/nufuth/lavista-scripts/lavista-pro.js";

app.get('/', (req, res) => {
  res.send('<h1>🚀 Lavista App Server is Running!</h1>');
});

// هذا هو الرابط الذي تستدعيه سلة عند التثبيت
app.get('/callback', async (req, res) => {
  const authCode = req.query.code;

  if (!authCode) {
    return res.status(400).send('❌ خطأ: لم يتم استلام كود الترخيص من سلة.');
  }

  try {
    console.log("🔄 جاري تبادل الكود للحصول على التوكن...");

    // 1. الحصول على التوكن (Access Token)
    const tokenResponse = await axios.post('https://accounts.salla.sa/oauth2/token', {
      client_id: process.env.SALLA_CLIENT_ID,
      client_secret: process.env.SALLA_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: 'https://lavista-smart-app.onrender.com/callback', // تأكد أن هذا يطابق رابطك في ريندر
      code: authCode
    });

    const accessToken = tokenResponse.data.access_token;
    console.log("✅ تم الحصول على التوكن بنجاح.");

    // 2. حقن السكريبت في المتجر
    console.log("💉 جاري حقن السكريبت...");
    await axios.post('https://api.salla.dev/admin/v2/stores/scripts', {
      name: "Lavista Smart Assistant",
      src: SCRIPT_URL,
      event: "on_store_load",
      location: "head"
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    // رسالة النجاح التي تظهر للتاجر
    res.send(`
      <div style="text-align:center; font-family:sans-serif; margin-top:50px;">
        <h1 style="color:green;">✅ تم تفعيل المساعد الذكي بنجاح!</h1>
        <p>يمكنك الآن الذهاب لمتجرك وستجد المساعد يعمل.</p>
      </div>
    `);

  } catch (error) {
    console.error("❌ حدث خطأ:", error.response?.data || error.message);
    res.send(`
      <div style="text-align:center; font-family:sans-serif; margin-top:50px;">
        <h1 style="color:red;">❌ حدث خطأ أثناء التثبيت</h1>
        <p>${JSON.stringify(error.response?.data || error.message)}</p>
      </div>
    `);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
