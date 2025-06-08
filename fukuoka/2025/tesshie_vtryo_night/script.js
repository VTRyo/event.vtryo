// DOM要素が読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    // 環境に応じた画像パス生成関数
    window.buildImagePath = function(imagePath) {
        // 既に絶対パスの場合はそのまま返す
        if (imagePath.startsWith('/')) {
            // ローカルファイル環境の場合は相対パスに変換
            if (window.location.protocol === 'file:') {
                // /images/fukuoka/2025/tesshie_vtryo_night/gallery/IMG_XXXX.jpg
                // → ../../../images/fukuoka/2025/tesshie_vtryo_night/gallery/IMG_XXXX.jpg
                return '../../../' + imagePath.substring(1);
            }
            return imagePath;
        }
        
        // 相対パスの場合（後方互換性のため）
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/').filter(part => part);
        
        let eventImageBasePath = '/images';
        if (pathParts.length >= 3) {
            const location = pathParts[0];
            const year = pathParts[1];
            const eventName = pathParts[2];
            eventImageBasePath = `/images/${location}/${year}/${eventName}`;
        }
        
        const fullPath = eventImageBasePath + '/' + imagePath;
        
        // ローカルファイル環境の場合は相対パスに変換
        if (window.location.protocol === 'file:') {
            return '../../../' + fullPath.substring(1);
        }
        
        return fullPath;
    };
    
    // イベント情報の表示
    document.getElementById('event-title').textContent = EVENT_CONFIG.event.title;
    document.getElementById('event-catchphrase').textContent = EVENT_CONFIG.event.catchphrase;
    document.getElementById('event-date').textContent = formatDate(EVENT_CONFIG.event.date) + ' ' + EVENT_CONFIG.event.time;
    
    // カウントダウンタイマーの開始
    startCountdown(EVENT_CONFIG.event.date);
    
    // シェフプロフィールの生成
    generateChefProfiles();
    
    // ギャラリーの初期化
    initGallery();
    
    // ヒーロー背景スライドショーの初期化
    initHeroSlideshow();
    
    // 会場情報の表示
    document.getElementById('venue-name').textContent = EVENT_CONFIG.venue.name;
    document.getElementById('venue-address').textContent = EVENT_CONFIG.venue.address;
    document.getElementById('venue-phone').textContent = EVENT_CONFIG.venue.phone;
    document.getElementById('venue-access').textContent = EVENT_CONFIG.venue.access;
    
    // 地図の埋め込み
    const venueMap = document.getElementById('venue-map');
    const iframe = document.createElement('iframe');
    iframe.src = EVENT_CONFIG.venue.mapEmbed;
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    venueMap.appendChild(iframe);
    
    // ハンバーガーメニューの動作
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // ナビゲーションリンクをクリックしたらメニューを閉じる
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});

// 日付のフォーマット
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
    
    return `${year}年${month}月${day}日(${dayOfWeek})`;
}

// カウントダウンタイマー
function startCountdown(dateString) {
    const targetDate = new Date(dateString);
    targetDate.setHours(18, 0, 0, 0); // 18:00に設定
    
    function updateCountdown() {
        const now = new Date();
        const difference = targetDate - now;
        
        if (difference <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
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
    
    EVENT_CONFIG.chefs.forEach(chef => {
        const chefCard = document.createElement('div');
        chefCard.className = 'chef-card';
        
        const imageHtml = chef.image 
            ? `<img src="${chef.image}" alt="${chef.fullName}" class="chef-image">`
            : `<div class="chef-image" style="background-color: #e8c39e; display: flex; align-items: center; justify-content: center;"><span style="font-size: 2rem; color: white;">${chef.name.charAt(0)}</span></div>`;
        
        chefCard.innerHTML = `
            ${imageHtml}
            <div class="chef-info">
                <h3 class="chef-name">${chef.fullName} (${chef.name})</h3>
                <p class="chef-specialty">専門: ${chef.speciality}</p>
                <p class="chef-bio">${chef.profile}</p>
            </div>
        `;
        
        container.appendChild(chefCard);
    });
}

// ギャラリーの初期化
function initGallery() {
    const slidesContainer = document.getElementById('gallery-slides');
    const prevButton = document.getElementById('gallery-prev');
    const nextButton = document.getElementById('gallery-next');
    let currentSlide = 0;
    
    // ギャラリー画像のスライドを生成
    EVENT_CONFIG.gallery.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        slide.style.backgroundImage = `url('${window.buildImagePath(image)}')`;
        
        if (index === 0) {
            slide.classList.add('active');
        }
        
        slidesContainer.appendChild(slide);
    });
    
    const slides = document.querySelectorAll('.gallery-slide');
    const totalSlides = slides.length;
    
    // 前のスライドに移動
    prevButton.addEventListener('click', () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
    });
    
    // 次のスライドに移動
    nextButton.addEventListener('click', () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].classList.add('active');
    });
    
    // タッチスワイプ対応（モバイル向け）
    let touchStartX = 0;
    let touchEndX = 0;
    
    slidesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    slidesContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX) {
            // 左スワイプ（次へ）
            nextButton.click();
        } else if (touchEndX > touchStartX) {
            // 右スワイプ（前へ）
            prevButton.click();
        }
    }
}

// ヒーロー背景スライドショーの初期化
function initHeroSlideshow() {
    const slideshowContainer = document.querySelector('.hero-slideshow');
    let currentSlide = 0;
    
    // スライドを生成
    EVENT_CONFIG.heroBackgrounds.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.backgroundImage = `url('${window.buildImagePath(image)}')`;
        
        if (index === 0) {
            slide.classList.add('active');
        }
        
        slideshowContainer.appendChild(slide);
    });
    
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    const totalSlides = slides.length;
    
    // 3秒ごとに背景画像を切り替え
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].classList.add('active');
    }, 3000);
}
