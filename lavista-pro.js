/* ====================================================================
 * 🚀 المساعد الذكي - النسخة العامة (General Version)
 * هذا الملف يعمل في أي متجر سلة فوراً
 * ==================================================================== */

(function() {
    // 1. الإعدادات الافتراضية (تعمل عند الجميع)
    const Defaults = {
        color: "#000000", // لون أسود ملكي يناسب الجميع
        btnText: "✨ مساعد التسوق",
        popupTitle: "مرحباً بك! 👋",
        question: "كيف نقدر نساعدك اليوم؟",
        options: [
            { label: "🔥 العروض الجديدة", url: "/offers" },
            { label: "📦 تتبع طلبي", url: "/orders" },
            { label: "💬 تواصل معنا", url: "/whatsapp/send" }
        ],
        salesPop: {
            enabled: true,
            names: ["عميل من الرياض", "عميل من جدة", "عميل من الدمام", "عميل من مكة"],
            products: ["طلب جديد", "طلب مكتمل", "شراء موثق"]
        }
    };

    // دمج إعدادات التاجر (إذا وجدت) مع الافتراضية
    const Config = window.SmartAppConfig || Defaults;

    // 2. تشغيل التطبيق عند التحميل
    window.addEventListener('load', function() {
        console.log("🚀 Smart Assistant Started...");
        initWidget();
        if (Defaults.salesPop.enabled) setTimeout(initSalesPop, 5000);
        injectStyles(Config.color);
    });

    // --- بناء المساعد الذكي ---
    function initWidget() {
        if (document.getElementById('smart-widget-btn')) return; // منع التكرار

        const widgetHTML = `
            <div id="smart-widget-btn" onclick="toggleSmartWidget()">
                <span>${Config.btnText}</span>
            </div>
            <div id="smart-popup" style="display:none;">
                <div class="popup-header">
                    <h3>${Config.popupTitle}</h3>
                    <span onclick="toggleSmartWidget()" class="close-btn">×</span>
                </div>
                <div class="popup-body">
                    <p>${Config.question}</p>
                    ${Config.options.map(opt => 
                        `<button onclick="window.location.href='${opt.url}'" class="choice-btn">${opt.label}</button>`
                    ).join('')}
                </div>
            </div>
        `;
        
        const div = document.createElement('div');
        div.innerHTML = widgetHTML;
        document.body.appendChild(div);
    }

    // جعل الدالة متاحة عالمياً
    window.toggleSmartWidget = function() {
        const popup = document.getElementById('smart-popup');
        const btn = document.getElementById('smart-widget-btn');
        if (popup.style.display === 'none') {
            popup.style.display = 'block';
            btn.style.display = 'none';
        } else {
            popup.style.display = 'none';
            btn.style.display = 'flex';
        }
    };

    // --- بناء إشعارات الطلبات ---
    function initSalesPop() {
        const popDiv = document.createElement('div');
        popDiv.id = 'sales-notification';
        popDiv.innerHTML = `
            <div class="pop-icon">🛍️</div>
            <div class="pop-content">
                <p id="pop-text"></p>
                <small id="pop-time">منذ دقيقة</small>
            </div>
        `;
        document.body.appendChild(popDiv);
        cycleSales();
    }

    function cycleSales() {
        const notify = document.getElementById('sales-notification');
        const randomName = Config.salesPop.names[Math.floor(Math.random() * Config.salesPop.names.length)];
        const randomAction = Config.salesPop.products[Math.floor(Math.random() * Config.salesPop.products.length)];
        
        document.getElementById('pop-text').innerHTML = `<strong>${randomName}</strong> قام بعمل <br>${randomAction}`;
        
        notify.classList.add('show-pop');
        setTimeout(() => notify.classList.remove('show-pop'), 5000); // اختفاء
        setTimeout(cycleSales, Math.random() * 10000 + 10000); // تكرار عشوائي
    }

    // --- الستايل (CSS) ---
    function injectStyles(mainColor) {
        const style = document.createElement('style');
        style.innerHTML = `
            #smart-widget-btn {
                position: fixed; bottom: 20px; left: 20px;
                background: ${mainColor}; color: #fff;
                padding: 12px 20px; border-radius: 50px; cursor: pointer;
                z-index: 999999; font-family: 'Tajawal', sans-serif;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2); font-weight: bold;
                display: flex; align-items: center; gap: 8px;
            }
            #smart-popup {
                position: fixed; bottom: 80px; left: 20px; width: 300px;
                background: #fff; border-radius: 12px; box-shadow: 0 5px 30px rgba(0,0,0,0.15);
                z-index: 999999; font-family: 'Tajawal', sans-serif; overflow: hidden;
                text-align: center; border: 1px solid #eee;
            }
            .popup-header { background: ${mainColor}; color: #fff; padding: 15px; display: flex; justify-content: space-between; align-items: center; }
            .popup-body { padding: 20px; }
            .choice-btn {
                display: block; width: 100%; padding: 12px; margin: 8px 0;
                background: #f8f9fa; border: 1px solid #ddd; border-radius: 8px;
                cursor: pointer; font-weight: bold; transition: 0.2s;
            }
            .choice-btn:hover { background: ${mainColor}; color: #fff; border-color: ${mainColor}; }
            
            /* إشعارات */
            #sales-notification {
                position: fixed; bottom: 20px; right: 20px; background: #fff;
                padding: 12px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                display: flex; align-items: center; gap: 12px; z-index: 9999;
                transform: translateY(150%); transition: transform 0.5s;
                font-family: 'Tajawal', sans-serif; border-right: 4px solid #27ae60;
                direction: rtl; width: 260px;
            }
            #sales-notification.show-pop { transform: translateY(0); }
            .pop-icon { font-size: 24px; }
            .pop-content p { margin: 0; font-size: 13px; color: #333; line-height: 1.4; }
            .pop-content small { color: #888; font-size: 11px; }
            
            @media (max-width: 768px) { #sales-notification { left: 20px; right: auto; border-right: none; border-left: 4px solid #27ae60; } }
        `;
        document.head.appendChild(style);
    }
})();
