// التحكم في القائمة الجانبية (الثلاث شرط)
const menuBtn = document.getElementById('menuBtn');
const sideDrawer = document.getElementById('sideDrawer');
const overlay = document.getElementById('overlay');
const closeDrawer = document.getElementById('closeDrawer');

function toggleDrawer() {
    sideDrawer.classList.toggle('open');
    overlay.classList.toggle('active');
}

if(menuBtn) menuBtn.addEventListener('click', toggleDrawer);
if(closeDrawer) closeDrawer.addEventListener('click', toggleDrawer);
if(overlay) overlay.addEventListener('click', toggleDrawer);

// التحكم في النوافذ المنبثقة (Login & Publish Modals)
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeLoginModal = document.getElementById('closeLoginModal');

const openPublishModal = document.getElementById('openPublishModal');
const publishModal = document.getElementById('publishModal');
const closePublishModal = document.getElementById('closePublishModal');

if(loginBtn) loginBtn.addEventListener('click', () => loginModal.classList.add('active'));
if(closeLoginModal) closeLoginModal.addEventListener('click', () => loginModal.classList.remove('active'));

if(openPublishModal) {
    openPublishModal.addEventListener('click', (e) => {
        e.preventDefault();
        sideDrawer.classList.remove('open');
        overlay.classList.remove('active');
        publishModal.classList.add('active');
    });
}

if(closePublishModal) {
    closePublishModal.addEventListener('click', () => publishModal.classList.remove('active'));
}

window.addEventListener('click', (e) => {
    if (e.target === loginModal) loginModal.classList.remove('active');
    if (e.target === publishModal) publishModal.classList.remove('active');
});

// ==========================================
// نظام حفظ وعرض المقالات الجديدة تلقائياً
// ==========================================

const publishForm = document.getElementById('publishForm');
if(publishForm) {
    publishForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // جلب البيانات المدخلة في الفورم
        const authorName = publishForm.querySelector('input[type="text"]').value;
        const articleTitle = publishForm.querySelectorAll('input[type="text"]')[1].value;
        const articleCategory = publishForm.querySelector('select').value;
        const articleContent = publishForm.querySelector('textarea').value;
        
        // تجهيز كائن المقال الجديد
        const newArticle = {
            author: authorName,
            title: articleTitle,
            category: articleCategory,
            content: articleContent,
            date: "12 نوفمبر 2026",
            modDate: "الآن"
        };

        // حفظ المقال في LocalStorage
        let storedArticles = JSON.parse(localStorage.getItem('mdarArticles')) || [];
        storedArticles.unshift(newArticle); // إضافة المقال الجديد في البداية
        localStorage.setItem('mdarArticles', JSON.stringify(storedArticles));

        alert('تم نشر المقال بنجاح! سيظهر في الموقع فوراً.');
        publishModal.classList.remove('active');
        publishForm.reset();
        
        // إعادة تحميل الصفحة لتحديث العرض
        location.reload();
    });
}

// دالة لعرض المقالات المخزنة تلقائياً عند فتح الصفحة
window.addEventListener('DOMContentLoaded', () => {
    const articlesContainer = document.getElementById('dynamicArticlesContainer');
    if(articlesContainer) {
        let storedArticles = JSON.parse(localStorage.getItem('mdarArticles')) || [];
        
        storedArticles.forEach(art => {
            const articleHTML = `
                <article class="article-card">
                    <h3>${art.title}</h3>
                    <div class="meta-info">
                        <span class="author">بقلم: ${art.author}</span>
                        <span>تاريخ النشر: ${art.date}</span>
                        <span>التصنيف: ${art.category}</span>
                    </div>
                    <div class="article-content">
                        <p>${art.content}</p>
                    </div>
                </article>
            `;
            articlesContainer.insertAdjacentHTML('afterbegin', articleHTML);
        });
    }
});

const loginForm = document.getElementById('loginForm');
if(loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('تم تسجيل الدخول بنجاح!');
        loginModal.classList.remove('active');
        e.target.reset();
    });
}