// DOM要素が読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    // ===== データの適用 =====
    // ヒーローセクションの更新
    document.getElementById('event-title').textContent = EVENT_CONFIG.event.title;
    document.getElementById('event-catchphrase').textContent = EVENT_CONFIG.event.catchphrase;
    document.getElementById('event-date').textContent = `${formatDate(EVENT_CONFIG.event.date)} ${EVENT_CONFIG.event.time}`;
    
    // カウントダウンタイマーの設定
    startCountdown(EVENT_CONFIG.event.date);
    
    // シェフプロフィールの生成
    generateChefProfiles();
    
    // コース詳細の生成
    generateCourseDetails();
    
    // ドリンクメニューの生成
    generateDrinkMenu();
    
    // 料金情報の更新
    updatePricing();
    
    // 会場情報の更新
    updateVenueInfo();
    
    // ===== イベントリスナー =====
    // ハンバーガーメニューの動作
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // ナビゲーションリンクをクリックしたらメニューを閉じる
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // モーダルの動作
    const modal = document.getElementById('reservation');
    const reserveButtons = document.querySelectorAll('.btn-reserve, .btn-primary');
    const closeButton = document.querySelector('.close-button');
    
    reserveButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#reservation') {
                e.preventDefault();
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // 予約フォームの送信
    const reservationForm = document.getElementById('reservation-form');
    
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('予約が完了しました。ご予約の詳細は登録されたメールアドレスに送信されます。');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.reset();
    });
});

// ===== ユーティリティ関数 =====
// 日付のフォーマット
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
    
    return `${year}年${month}月${day}日(${dayOfWeek})`;
}

// カウントダウンタイマーの開始
function startCountdown(dateString) {
    const targetDate = new Date(dateString);
    targetDate.setHours(targetDate.getHours() + 18); // 18:00開始と仮定
    
    function updateCountdown() {
        const currentDate = new Date();
        const difference = targetDate - currentDate;
        
        if (difference <= 0) {
            document.querySelector('.countdown').innerHTML = '<p>イベント開催中！</p>';
            return;
        }
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// シェフプロフィールの生成
function generateChefProfiles() {
    const container = document.getElementById('chefs-container');
    let html = '';
    
    EVENT_CONFIG.chefs.forEach(chef => {
        html += `
            <div class="chef-card">
                <img src="${chef.image}" alt="${chef.name}" class="chef-image">
                <div class="chef-info">
                    <h3 class="chef-name">${chef.fullName} (${chef.name})</h3>
                    <p class="chef-specialty">専門: ${chef.speciality}</p>
                    <p class="chef-bio">${chef.profile}</p>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// コース詳細の生成
function generateCourseDetails() {
    const container = document.getElementById('course-container');
    let html = '';
    
    EVENT_CONFIG.courses.forEach(course => {
        html += `
            <div class="course-item">
                <div class="course-image">
                    <img src="${course.image}" alt="${course.name}">
                </div>
                <div class="course-info">
                    <h3 class="course-name">${course.name}</h3>
                    <p class="course-description">${course.description}</p>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ドリンクメニューの生成
function generateDrinkMenu() {
    const container = document.getElementById('drinks-container');
    let html = '';
    
    EVENT_CONFIG.drinks.forEach(category => {
        html += `
            <div class="drink-category">
                <h3 class="category-title">${category.category}</h3>
                <div class="drink-list">
        `;
        
        category.items.forEach(drink => {
            html += `
                <div class="drink-item">
                    <div class="drink-name">
                        ${drink.name}
                        <span class="drink-price">¥${drink.price.toLocaleString()}</span>
                    </div>
                    <p class="drink-description">${drink.description}</p>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// 料金情報の更新
function updatePricing() {
    const coursePrice = document.getElementById('course-price');
    const drinksPrice = document.getElementById('drinks-price');
    const taxInfo = document.getElementById('tax-info');
    
    coursePrice.textContent = `¥${EVENT_CONFIG.pricing.course.toLocaleString()}`;
    drinksPrice.textContent = `¥${EVENT_CONFIG.pricing.drinksPairing.toLocaleString()}`;
    taxInfo.textContent = `※表示価格は${EVENT_CONFIG.pricing.tax}%の消費税を含みます`;
}

// 会場情報の更新
function updateVenueInfo() {
    document.getElementById('venue-name').textContent = EVENT_CONFIG.venue.name;
    document.getElementById('venue-address').textContent = EVENT_CONFIG.venue.address;
    document.getElementById('venue-phone').textContent = EVENT_CONFIG.venue.phone;
    document.getElementById('venue-access').textContent = EVENT_CONFIG.venue.access;
    
    const mapContainer = document.getElementById('venue-map');
    mapContainer.innerHTML = `<iframe src="${EVENT_CONFIG.venue.mapEmbed}" allowfullscreen="" loading="lazy"></iframe>`;
}
