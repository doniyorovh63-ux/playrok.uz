// 1. Bot va Foydalanuvchi ma'lumotlari
const BOT_TOKEN = '8766070909:AAGmzRDqY-SnflIQxRp8sntxjWwjubuJrKE';
const CHAT_ID = '8085768031';

// 2. Mahsulotlar ro'yxati
const products = [
    { 
        id: 1, 
        name: "PUBG Mobile VIP Akkaunt", 
        price: "150,000", 
        img: "https://p325k7wa.twic.pics/high/pubg/pubg-battlegrounds/00-page-setup/pubg-battlegrounds-og-image.jpg" 
    },
    { 
        id: 2, 
        name: "Free Fire Max Akkaunt", 
        price: "95,000", 
        img: "https://i.ytimg.com/vi/uCdS4itM_X8/maxresdefault.jpg" 
    },
    { 
        id: 3, 
        name: "Telegram Premium (1 yil)", 
        price: "350,000", 
        img: "https://static.euronews.com/articles/stories/06/78/34/00/1200x675_cmsv2_f21a00a8-9d29-5776-9d32-d17e3f84f09d-6783400.jpg" 
    },
    { 
        id: 4, 
        name: "Roblox Robux (1000 RBX)", 
        price: "120,000", 
        img: "https://images.rbxcdn.com/cece570e3f01447011961c0ec0cf76d4.jpg" 
    }
];

// 3. Mahsulotlarni ekranda chiqarish funksiyasi
function renderProducts() {
    const container = document.querySelector('.container');
    if (!container) return;

    container.innerHTML = products.map(p => `
        <div class="card">
            <img src="${p.img}" alt="${p.name}" style="width:100%; border-radius:15px; height:180px; object-fit:cover;">
            <h3 style="margin: 15px 0 10px;">${p.name}</h3>
            <p style="color:#00ff88; font-size:22px; font-weight:bold; margin-bottom: 15px;">${p.price} so'm</p>
            <button onclick="orderNow('${p.name}', '${p.price}')" style="cursor:pointer;">Sotib olish</button>
        </div>
    `).join('');
}

// 4. Telegramga buyurtma yuborish funksiyasi
async function orderNow(productName, price) {
    const phone = prompt(`${productName} uchun Telegram raqamingiz yoki Username'ingizni kiriting:\n(Masalan: +998901234567)`);
    
    if (phone && phone.length > 4) {
        // Xabar matni
        const message = `🚀 *YANGI BUYURTMA!*\n\n` +
                        `🎮 *Mahsulot:* ${productName}\n` +
                        `💰 *Narxi:* ${price} so'm\n` +
                        `👤 *Mijoz:* ${phone}\n\n` +
                        `🕒 *Vaqt:* ${new Date().toLocaleString()}`;
        
        try {
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });

            if (response.ok) {
                alert("✅ Rahmat! Buyurtmangiz qabul qilindi. Tez orada siz bilan bog'lanamiz!");
            } else {
                alert("❌ Xatolik! Botga /start bosganingizni tekshiring.");
            }
        } catch (error) {
            alert("🌐 Internet aloqasida muammo yoki xatolik yuz berdi.");
        }
    } else if (phone) {
        alert("⚠️ Iltimos, ma'lumotni to'g'ri kiriting!");
    }
}

// Sahifa yuklanganda mahsulotlarni chiqarish
document.addEventListener('DOMContentLoaded', renderProducts);