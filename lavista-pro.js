/**
 * ====================================================================
 * 🛒 LAVISTA PRO SUITE v1.0
 * حقوق الملكية: لافيستا (La Vista)
 * الوصف: حزمة تسويقية ذكية تشمل (المساعد الذكي + إشعارات الشراء)
 * ====================================================================
 */

// ⚙️ إعدادات المتجر (لوحة التحكم)
// غير البيانات هنا فقط، وسيتغير كل شيء في الموقع تلقائياً
const AppConfig = {
    // 1. إعدادات المساعد الذكي (البوت)
    widget: {
        enabled: true, // تفعيل أو إيقاف (true/false)
        buttonText: "✨ محتار وش تختار؟",
        color: "#000000", // لون الزر
        links: {
            option1: "https://lavista.sa/ar/lavista-d28-%D8%B9%D8%B7%D8%B1-%D9%84%D8%A7%D9%81%D9%8A%D8%B3%D8%AA%D8%A7-%D8%AF%D9%8A-28/p1238965791", // رابط خيار الفخم (D28)
            option2: "https://lavista.sa/ar/lavista-d27-%D9%84%D8%A7%D9%81%D9%8A%D8%B3%D8%AA%D8%A7-%D8%AF%D9%8A27/p1835144273", // رابط خيار اليومي (D27)
            option3: "https://lavista.sa/ar/%D8%B9%D8%B1%D8%B6-%D8%A7%D9%84%D9%85%D8%AC%D9%85%D9%88%D8%B9%D8%A9-%D8%A7%D9%84%D9%83%D8%A7%D9%85%D9%84%D8%A9/p37632762"      // رابط المجموعة الكاملة
        }
    },

    // 2. إعدادات إشعارات الشراء (Social Proof)
    salesPop: {
        enabled: true, // تفعيل أو إيقاف
        cycleTime: 15000, // الوقت بين كل إشعار (15 ثانية)
        names: ["عبدالله", "سارة", "محمد", "نورة", "فهد", "ريم", "خالد", "مها", "سعود"],
        cities: ["الرياض", "جدة", "الدمام", "مكة", "القصيم", "الخبر", "أبها", "حائل"],
        products: [
            { name: "لافيستا D27", img: "https://cdn-icons-png.flaticon.com/512/2956/2956820.png" },
            { name: "لافيستا D28", img: "https://cdn-icons-png.flaticon.com/512/2956/2956820.png" },
            { name: "المجموعة الكاملة", img: "https://cdn-icons-png.flaticon.com/512/2956/2956820.png" }
        ]
    }
};

/* ====================================================================
   🛑 منطقة المطورين (لا تقم بالتعديل أسفل هذا الخط إلا إذا كنت مبرمجاً)
   ==================================================================== */

window.addEventListener('load', function() {
    if (AppConfig.widget.enabled) initSmartWidget();
    if (AppConfig.salesPop.enabled) setTimeout(initSalesPop, 5000);
    injectGlobalStyles();
});

// --- 1. منطق المساعد الذكي ---
function initSmartWidget() {
    var widget = document.createElement('div');
    widget.id = 'lavista-smart-widget';
    widget.innerHTML = `
        <div id="lavista-widget-btn" onclick="toggleWidget()">
            <span>${AppConfig.widget.buttonText}</span>
        </div>
        <div id="lavista-popup" style="display:none;">
            <div class="popup-header">
                <h3>مستشارك العطري 🤖</h3>
                <span onclick="toggleWidget()" class="close-btn">×</span>
            </div>
            <div id="step-1">
                <p>عشان نخدمك صح.. وش جوك في العطور؟</p>
                <button onclick="goToLink('${AppConfig.widget.links.option1}')" class="choice-btn">🎩 فخم ورسمي (للمناسبات)</button>
                <button onclick="goToLink('${AppConfig.widget.links.option2}')" class="choice-btn">❄️ بارد ومنعش (يومي)</button>
                <button onclick="goToLink('${AppConfig.widget.links.option3}')" class="choice-btn">🎁 أبي هدية تبيّض الوجه</button>
            </div>
        </div>
    `;
    document.body.appendChild(widget);
}

function toggleWidget() {
    var popup = document.getElementById('lavista-popup');
    var btn = document.getElementById('lavista-widget-btn');
    if (popup.style.display === 'none') {
        popup.style.display = 'block';
        btn.style.display = 'none';
    } else {
        popup.style.display = 'none';
        btn.style.display = 'flex';
    }
}

function goToLink(url) {
    window.location.href = url;
}

// --- 2. منطق إشعارات الشراء ---
function initSalesPop() {
    var notification = document.createElement('div');
    notification.id = 'sales-notification';
    notification.innerHTML = `
        <div class="sales-pop-img"><img id="pop-img" src="" alt=""></div>
        <div class="sales-pop-content">
            <p id="pop-text"></p>
            <span id="pop-time">منذ دقيقتين</span>
            <div class="verified-badge">✔ شراء موثق</div>
        </div>
    `;
    document.body.appendChild(notification);
    cycleSales();
}

function cycleSales() {
    showNewNotification();
    var randomTime = Math.floor(Math.random() * (AppConfig.salesPop.cycleTime - 5000 + 1) + 5000);
    setTimeout(cycleSales, randomTime);
}

function showNewNotification() {
    var notify = document.getElementById('sales-notification');
    var randomName = AppConfig.salesPop.names[Math.floor(Math.random() * AppConfig.salesPop.names.length)];
    var randomCity = AppConfig.salesPop.cities[Math.floor(Math.random() * AppConfig.salesPop.cities.length)];
    var randomProduct = AppConfig.salesPop.products[Math.floor(Math.random() * AppConfig.salesPop.products.length)];
    var randomTime = Math.floor(Math.random() * 9) + 1;

    document.getElementById('pop-text').innerHTML = `<strong>${randomName}</strong> من <strong>${randomCity}</strong> طلب <br>${randomProduct.name}`;
    document.getElementById('pop-time').innerText = `منذ ${randomTime} دقائق`;
    document.getElementById('pop-img').src = randomProduct.img;

    notify.classList.add('show-pop');
    setTimeout(() => { notify.classList.remove('show-pop'); }, 6000);
}

// --- 3. الستايل (CSS) ---
function injectGlobalStyles() {
    var style = document.createElement('style');
    style.innerHTML = `
        /* Smart Widget Styles */
        #lavista-widget-btn {
            position: fixed; bottom: 20px; left: 20px;
            background: ${AppConfig.widget.color}; color: #fff;
            padding: 12px 20px; border-radius: 50px; cursor: pointer;
            z-index: 999999; font-weight: bold; font-family: 'Tajawal', sans-serif;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3); animation: bounce 2s infinite;
            display: flex; align-items: center; justify-content: center;
        }
        #lavista-popup {
            position: fixed; bottom: 80px; left: 20px; width: 300px;
            background: #fff; border-radius: 15px; box-shadow: 0 5px 25px rgba(0,0,0,0.2);
            z-index: 999999; font-family: 'Tajawal', sans-serif; overflow: hidden; text-align: center;
        }
        .popup-header { background: ${AppConfig.widget.color}; color: #fff; padding: 15px; display: flex; justify-content: space-between; align-items: center;}
        .popup-header h3 { margin: 0; font-size: 16px; font-weight: bold; }
        .close-btn { cursor: pointer; font-size: 20px; }
        #step-1 { padding: 20px; }
        .choice-btn { display: block; width: 100%; margin: 10px 0; padding: 12px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; transition: 0.3s; font-weight: bold; }
        .choice-btn:hover { background: #000; color: #fff; }

        /* Sales Pop Styles */
        #sales-notification {
            position: fixed; bottom: 20px; right: 20px; background: #fff;
            width: 300px; border-radius: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            display: flex; align-items: center; padding: 15px; z-index: 999990;
            transform: translateY(150px); transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            font-family: 'Tajawal', sans-serif; border-left: 4px solid #27ae60; direction: rtl;
        }
        #sales-notification.show-pop { transform: translateY(0); }
        .sales-pop-img { width: 50px; height: 50px; background: #f9f9f9; border-radius: 5px; margin-left: 10px; display: flex; align-items: center; justify-content: center; }
        .sales-pop-img img { width: 35px; height: 35px; object-fit: contain; }
        .sales-pop-content p { margin: 0; font-size: 13px; line-height: 1.4; color: #333; }
        .verified-badge { font-size: 10px; color: #27ae60; background: #eafaf1; padding: 2px 5px; border-radius: 4px; display: inline-block; margin-top: 2px; }

        @keyframes bounce { 0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 40% {transform: translateY(-10px);} 60% {transform: translateY(-5px);} }
        @media (max-width: 480px) { #sales-notification { width: 90%; right: 5%; bottom: 10px; } }
    `;
    document.head.appendChild(style);
}