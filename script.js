// 1. Sozlamalar
const BOT_TOKEN = '8766070909:AAGmzRDqY-SnflIQxRp8sntxjWwjubuJrKE';
const CHAT_ID = '8085768031';

// 2. Mahsulotlar (Buni xohlagancha o'zgartirishingiz mumkin)
const products = [
    { id: 1, name: "PUBG Mobile VIP", price: "150,000", img: "https://p325k7wa.twic.pics/high/pubg/pubg-battlegrounds/00-page-setup/pubg-battlegrounds-og-image.jpg" },
    { id: 2, name: "Free Fire Max", price: "95,000", img: "https://i.ytimg.com/vi/uCdS4itM_X8/maxresdefault.jpg" },
    { id: 3, name: "Telegram Premium", price: "350,000", img: "https://static.euronews.com/articles/stories/06/78/34/00/1200x675_cmsv2_f21a00a8-9d29-5776-9d32-d17e3f84f09d-6783400.jpg" }
];

// 3. Mahsulotlarni ekranda chiqarish
function render() {
    const container = document.querySelector('.container');
    if (!container) return;
    
    container.innerHTML = ''; // Konteynerni tozalash
    products.forEach(p => {
        container.innerHTML += `
            <div class="card">
                <img src="${p.img}" alt="${p.name}" style="width:100%; border-radius:15px; height:180px; object-fit:cover;">
                <h3>${p.name}</h3>
                <p style="color:#00ff88; font-size:22px; font-weight:bold;">${p.price} so'm</p>
                <button onclick="order('${p.name}', '${p.price}')">Sotib olish</button>
            </div>
        `;
    });
}

// 4. Buyurtmani Telegramga yuborish
async function order(name, price) {
    const contact = prompt(`${name} uchun raqamingizni kiriting:`);

    if (contact && contact.trim() !== "") {
        const text = `🚀 *YANGI BUYURTMA!*\n\n🎮 *Mahsulot:* ${name}\n💰 *Narxi:* ${price} so'm\n👤 *Mijoz:* ${contact}`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: text,
                    parse_mode: 'Markdown'
                })
            });

            if (response.ok) {
                alert("✅ Buyurtma yuborildi! Tez orada sizga yozamiz.");
            } else {
                alert("❌ Xatolik yuz berdi. Bot sozlamalarini tekshiring.");
            }
        } catch (err) {
            alert("🌐 Internetda muammo yoki server xatosi.");
        }
    }
}

// Sahifa yuklanganda render qilish
document.addEventListener('DOMContentLoaded', render);
