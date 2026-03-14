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
});document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    // لمسة أمنية: منع إدخال أكواد سكريبت (XSS Protection بسيط)
    if(message.includes("<script>") || message.includes("http")) {
        alert("Security Alert: Links and scripts are not allowed!");
        return;
    }

    alert("Thank you, " + name + "! Your message has been sent securely.");
    this.reset();
});
// كود تأمين الفورم ومعالجة البيانات
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // استلام القيم من الخانات
    let name = document.getElementById('name').value;
    let message = document.getElementById('message').value;

    // تنظيف البيانات (Sanitization) لمنع هجمات XSS
    const cleanName = name.replace(/[<>]/g, "");
    const cleanMessage = message.replace(/[<>]/g, "");

    // فحص الروابط المشبوهة
    if(cleanMessage.toLowerCase().includes("http") || cleanMessage.toLowerCase().includes("www")) {
        alert("Security Alert: Sending links is not allowed for security reasons!");
        return;
    }

    // إظهار رسالة النجاح بالبيانات الآمنة
    alert("Thank you, " + cleanName + "! Your message has been sent securely.");
    
    // إعادة تعيين الفورم
    this.reset();
});
// تهيئة مكتبة Lenis للـ Smooth Scroll الاحترافي
const lenis = new Lenis({
  duration: 1.2, // سرعة الحركة (كل ما زادت كل ما بقى أنعم)
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // معادلة أبل للحركة
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
// كود الـ advanced لتبديل الثيم
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme'); // بنشوف الـ User كان مختار إيه

// دالة لتطبيق الثيم
function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-mode');
        if (toggleSwitch) toggleSwitch.checked = true;
    } else {
        document.body.classList.remove('light-mode');
        if (toggleSwitch) toggleSwitch.checked = false;
    }
}

// 1. فحص الـ user preference عند التحميل
if (currentTheme) {
    applyTheme(currentTheme);
} else {
    // لو لسه أول مرة، بنشوف هو عامل الـ Device بتاعه Dark ولا Light
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light'); // default
    }
}

// 2. دالة لتبديل الثيم عند الضغط على الزرار
function switchTheme(e) {
    if (e.target.checked) {
        // Light Mode
        localStorage.setItem('theme', 'light');
        applyTheme('light');
    } else {
        // Dark Mode
        localStorage.setItem('theme', 'dark');
        applyTheme('dark');
    }
}

// 3. ربط الزرار بالدالة
if (toggleSwitch) {
    toggleSwitch.addEventListener('change', switchTheme, false);
}
const toggleSwitch = document.querySelector('#checkbox');
toggleSwitch.addEventListener('change', () => {
    document.body.classList.toggle('light-mode');
});
const checkbox = document.getElementById('checkbox');

checkbox.addEventListener('change', () => {
  // تبديل كلاس light-mode في جسم الصفحة كله
  document.body.classList.toggle('light-mode');
  
  // حفظ اختيار المستخدم عشان لما يعمل refresh يفضل زي ما هو
  if (document.body.classList.contains('light-mode')) {
    localStorage.setItem('theme', 'light');
  } else {
    localStorage.setItem('theme', 'dark');
  }
});

// التأكد من الثيم المحفوظ عند فتح الصفحة
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
  checkbox.checked = true;
}
// تأكد أن الكود يعمل بعد تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', () => {

    // 1. كود تبديل الثيم (Theme Switch)
    const checkbox = document.getElementById('checkbox');
    if (checkbox) {
        checkbox.addEventListener('change', () => {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        });

        // استرجاع الثيم المحفوظ
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-mode');
            checkbox.checked = true;
        }
    }

    // 2. إخفاء شاشة التحميل (الـ Loader) يدوياً للتأكد أنها ستختفي
    const loader = document.querySelector('.loader') || document.querySelector('#preloader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// 3. كود الـ Smooth Scroll (Lenis) - ضعه خارج الـ DOMContentLoaded
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
// 1. كود تبديل الثيم
const checkbox = document.getElementById('checkbox');

if (checkbox) {
    checkbox.addEventListener('change', () => {
        document.body.classList.toggle('light-mode');
        // حفظ الاختيار
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });

    // تشغيل الثيم المحفوظ
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        checkbox.checked = true;
    }
}

// 2. كود الـ Smooth Scroll (النسخة البسيطة)
// لو الـ Lenis عامل مشكلة، الكود ده بديل آمن جداً
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// كود تبديل الثيم فقط
const checkbox = document.getElementById('checkbox');

if (checkbox) {
    checkbox.addEventListener('change', () => {
        document.body.classList.toggle('light-mode');
    });
}

// كود بديل للـ Scroll الناعم بدون مكتبات خارجية
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
