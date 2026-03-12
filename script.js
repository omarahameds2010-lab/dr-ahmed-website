// 1. اخفاء شاشة التحميل
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => { preloader.style.display = 'none'; }, 500);
});

// 2. تشغيل العدادات
const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });
};

// تشغيل العدادات لما توصل عندها بالسكرول
let started = false;
window.onscroll = () => {
    if (window.scrollY >= document.querySelector('.stats').offsetTop - 400) {
        if (!started) startCounters();
        started = true;
    }
};const backToTopBtn = document.getElementById("backToTop");

window.onscroll = function() {
    // إظهار الزرار لما المستخدم ينزل 300 بيكسل
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "flex";
    } else {
        backToTopBtn.style.display = "none";
    }
};

// حركة الطلوع لفوق بنعومة
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});