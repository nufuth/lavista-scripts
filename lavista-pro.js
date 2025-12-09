/**
 * ====================================================================
 * 🚀 SMART SALES BOOSTER ENGINE (Generic Version)
 * هذا المحرك يعمل لدى أي متجر سلة بناءً على الإعدادات المحقونة
 * ====================================================================
 */

// 1. استقبال الإعدادات من المتجر
// التطبيق سيبحث عن متغير عالمي اسمه (SmartAppConfig) حقنه التطبيق مسبقاً
const DefaultConfig = {
    widget: { enabled: false },
    salesPop: { enabled: false }
};

// دمج الإعدادات المحقونة مع الافتراضية لتجنب الأخطاء
const Config = window.SmartAppConfig || DefaultConfig;

window.addEventListener('load', function() {
    // التأكد من أن التاجر فعل الخيارات قبل التشغيل
    if (Config.widget && Config.widget.enabled) initSmartWidget();
    if (Config.salesPop && Config.salesPop.enabled) setTimeout(initSalesPop, 5000);
    injectGlobalStyles();
});

// --- 1. منطق المساعد الذكي (عام) ---
function initSmartWidget() {
    var widget = document.createElement('div');
    widget.id = 'smart-widget-container';
    widget.innerHTML = `
        <div id="smart-widget-btn" onclick="toggleWidget()">
            <span>${Config.widget.btn_text || "✨ مساعد التسوق"}</span>
        </div>
        <div id="smart-popup" style="display:none;">
            <div class="popup-header">
                <h3>${Config.widget.popup_title || "مساعدك الذكي 🤖"}</h3>
                <span onclick="toggleWidget()" class="close-btn">×</span>
            </div>
            <div id="step-1">
                <p>${Config.widget.question_text || "كيف نقدر نساعدك اليوم؟"}</p>
                
                ${generateButtons()}
                
            </div>
        </div>
    `;
    document.body.appendChild(widget);
}

// دالة لتوليد الأزرار بناءً على عدد الخيارات التي وضعها التاجر
function generateButtons() {
    let html = '';
    // التاجر قد يضع خيارين أو ثلاثة، نحن ندعم ذلك
    if(Config.widget.options) {
        Config.widget.options.forEach(opt => {
            html += `<button onclick="window.location.href='${opt.url}'" class="choice-btn">${opt.label}</button>`;
        });
    }
    return html;
}

function toggleWidget() {
    var popup = document.getElementById('smart-popup');
    var btn = document.getElementById('smart-widget-btn');
    if (popup.style.display === 'none') {
        popup.style.display = 'block';
        btn.style.display = 'none';
    } else {
        popup.style.display = 'none';
        btn.style.display = 'flex';
    }
}

// --- 2. منطق إشعارات الشراء (عام) ---
function initSalesPop() {
    var notification = document.createElement('div');
    notification.id = 'sales-notification';
    notification.innerHTML = `
        <div class="sales-pop-img"><img id="pop-img" src="" alt=""></div>
        <div class="sales-pop-content">
            <p id="pop-text"></p>
            <span id="pop-time"></span>
            <div class="verified-badge">✔ شراء موثق</div>
        </div>
    `;
    document.body.appendChild(notification);
    cycleSales();
}

function cycleSales() {
    showNewNotification();
    var randomTime = Math.floor(Math.random() * (20000 - 10000 + 1) + 10000);
    setTimeout(cycleSales, randomTime);
}

function showNewNotification() {
    if(!Config.salesPop.products || Config.salesPop.products.length === 0) return;

    var notify = document.getElementById('sales-notification');
    
    // بيانات عشوائية من مدخلات التاجر
    var randomName = Config.salesPop.names[Math.floor(Math.random() * Config.salesPop.names.length)];
    var randomCity = Config.salesPop.cities[Math.floor(Math.random() * Config.salesPop.cities.length)];
    var randomProduct = Config.salesPop.products[Math.floor(Math.random() * Config.salesPop.products.length)];
    var randomTime = Math.floor(Math.random() * 9) + 1;

    document.getElementById('pop-text').innerHTML = `<strong>${randomName}</strong> من <strong>${randomCity}</strong> طلب <br>${randomProduct.name}`;
    document.getElementById('pop-time').innerText = `منذ ${randomTime} دقائق`;
    // صورة افتراضية إذا لم يضع التاجر صورة
    document.getElementById('pop-img').src = randomProduct.image || "https://cdn-icons-png.flaticon.com/512/2956/2956820.png";

    notify.classList.add('show-pop');
    setTimeout(() => { notify.classList.remove('show-pop'); }, 6000);
}

// --- 3. الستايل (ديناميكي حسب لون التاجر) ---
function injectGlobalStyles() {
    var mainColor = Config.main_color || "#000000"; // لون التاجر المفضل
    var style = document.createElement('style');
    style.innerHTML = `
        #smart-widget-btn {
            position: fixed; bottom: 20px; left: 20px;
            background: ${mainColor}; color: #fff;
            padding: 12px 20px; border-radius: 50px; cursor: pointer;
            z-index: 999999; font-weight: bold; font-family: 'Tajawal', sans-serif;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3); animation: bounce 2s infinite;
            display: flex; align-items: center; justify-content: center;
        }
        #smart-popup {
            position: fixed; bottom: 80px; left: 20px; width: 300px;
            background: #fff; border-radius: 15px; box-shadow: 0 5px 25px rgba(0,0,0,0.2);
            z-index: 999999; font-family: 'Tajawal', sans-serif; overflow: hidden; text-align: center;
        }
        .popup-header { background: ${mainColor}; color: #fff; padding: 15px; display: flex; justify-content: space-between; align-items: center;}
        .choice-btn { display: block; width: 90%; margin: 10px auto; padding: 12px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; transition: 0.3s; font-weight: bold; }
        .choice-btn:hover { background: ${mainColor}; color: #fff; border-color: ${mainColor}; }

        /* ستايل الإشعارات */
        #sales-notification {
            position: fixed; bottom: 20px; right: 20px; background: #fff;
            width: 300px; border-radius: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            display: flex; align-items: center; padding: 15px; z-index: 999990;
            transform: translateY(150px); transition: all 0.5s;
            font-family: 'Tajawal', sans-serif; border-left: 4px solid #27ae60; direction: rtl;
        }
        #sales-notification.show-pop { transform: translateY(0); }
        .sales-pop-img { width: 50px; height: 50px; background: #f9f9f9; border-radius: 5px; margin-left: 10px; display: flex; align-items: center; justify-content: center; }
        .sales-pop-img img { width: 35px; height: 35px; object-fit: contain; }
        .sales-pop-content p { margin: 0; font-size: 13px; line-height: 1.4; color: #333; }
        
        @keyframes bounce { 0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 40% {transform: translateY(-10px);} 60% {transform: translateY(-5px);} }
        @media (max-width: 480px) { #sales-notification { width: 90%; right: 5%; bottom: 10px; } }
    `;
    document.head.appendChild(style);
}
