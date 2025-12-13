'use strict';
/* ================================
   SUPABASE CONFIGURATION
   ================================ */
const SUPABASE_URL = 'https://alolxtzrpobimoxoxuyl.supabase.co';
const SUPABASE_ANON_KEY = 'REPLACE_WITH_REAL_ANON_JWT'; // يجب أن يكون JWT يبدأ بـ eyJ
const SUPABASE_TABLE = 'places';

const supabaseClient = (window.supabase && typeof window.supabase.createClient === 'function' && SUPABASE_URL && SUPABASE_ANON_KEY)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

/* ================================
   DATA
   ================================ */
const categories = {
  hospitals: { name: 'مشافي وعيادات', icon: '<i class="fas fa-hospital"></i>', description: 'مشافي، عيادات، مخابر في مدينة جبلة', image: 'https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?w=800&h=400&fit=crop', color: '#ef4444' },
  pharmacies: { name: 'الصيدليات', icon: '<i class="fas fa-pills"></i>', description: 'صيدليات ومناوبات ليلية في مدينة جبلة', image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=800&h=400&fit=crop', color: '#22c55e' },
  restaurants: { name: 'مطاعم ومقاهي', icon: '<i class="fas fa-utensils"></i>', description: 'مطاعم، كافيهات، حلويات في مدينة جبلة', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop', color: '#166534' },
  services: { name: 'خدمات', icon: '<i class="fas fa-tools"></i>', description: 'تكاسي، صيانة، توصيل في مدينة جبلة', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop', color: '#8b5cf6' },
  schools: { name: 'مدارس ومعاهد', icon: '<i class="fas fa-graduation-cap"></i>', description: 'مدارس، معاهد، دورات في مدينة جبلة', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop', color: '#0ea5e9' },
  emergency: { name: 'أرقام الطوارئ', icon: '<i class="fas fa-exclamation-triangle"></i>', description: 'أرقام الطوارئ المهمة في جبلة', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=400&fit=crop', color: '#b91c1c' }
};

const places = {
  pharmacies: [{ id: 1, name: 'صيدلية الشفاء', neighborhood: 'شارع الثورة، بجانب البريد', phone: '041-123456', description: 'صيدلية متكاملة تقدم جميع الأدوية والمستلزمات الطبية. تعمل على مدار الساعة في أيام المناوبة.' }],
  hospitals: [{ id: 2, name: 'مشفى جبلة الوطني', neighborhood: 'المنطقة الصناعية', phone: '041-111111', description: 'مشفى حكومي يقدم خدمات طبية شاملة. يحتوي على أقسام للطوارئ، الجراحة، الباطنية، والأطفال.' }],
  restaurants: [{ id: 3, name: 'مطعم البحر', neighborhood: 'الكورنيش', phone: '041-333333', description: 'أشهى المأكولات البحرية الطازجة. يوفر أجواء مميزة مع إطلالة على البحر.' }],
  services: [{ id: 4, name: 'تكسي الأمان', neighborhood: 'جميع المناطق', phone: '041-555555', description: 'خدمة تكسي سريعة وموثوقة. متوفرة على مدار الساعة بأسعار مناسبة.' }],
  schools: [{ id: 5, name: 'ثانوية جبلة', neighborhood: 'حي المدارس', phone: '041-777777', description: 'مدرسة ثانوية حكومية معتمدة. تقدم التعليم للصفوف من الأول الثانوي إلى الثالث الثانوي.' }],
  emergency: [{ id: 6, name: 'الشرطة', neighborhood: 'جبلة', phone: '110', description: 'رقم الطوارئ للشرطة. للتبليغ عن الحوادث والجرائم والاستفسارات الأمنية.' }]
};

const nightSchedule = [
  { day: 'السبت', pharmacy: 'صيدلية الشفاء', address: 'شارع الثورة، بجانب البريد', phone: '041-123456', hours: '24 ساعة', notes: 'توفر أدوية الأطفال' },
  { day: 'الأحد', pharmacy: 'صيدلية الشفاء', address: 'شارع الثورة، بجانب البريد', phone: '041-123456', hours: '8:00 مساءً - 8:00 صباحاً', notes: '' },
  { day: 'الإثنين', pharmacy: 'صيدلية الشفاء', address: 'شارع الثورة، بجانب البريد', phone: '041-123456', hours: '24 ساعة', notes: '' },
  { day: 'الثلاثاء', pharmacy: 'صيدلية الشفاء', address: 'شارع الثورة، بجانب البريد', phone: '041-123456', hours: '9:00 مساءً - 7:00 صباحاً', notes: '' },
  { day: 'الأربعاء', pharmacy: 'صيدلية الشفاء', address: 'شارع الثورة، بجانب البريد', phone: '041-123456', hours: '24 ساعة', notes: 'توفر أدوية الأطفال' },
  { day: 'الخميس', pharmacy: 'صيدلية الشفاء', address: 'شارع الثورة، بجانب البريد', phone: '041-123456', hours: '8:00 مساءً - 8:00 صباحاً', notes: '' },
  { day: 'الجمعة', pharmacy: 'لا توجد مناوبة', address: '', phone: '', hours: '', notes: 'يوم عطلة' }
];

const daysArabic = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const todayIndex = new Date().getDay();
const todayArabic = daysArabic[todayIndex];
let currentCategory = 'pharmacies';

/* ================================
   HELPERS
   ================================ */
function isValidPhone(value) { return /^[0-9+\-\s()](6, 20)$/.test(value || ''); }

/* ================================
   UI / NAVIGATION
   ================================ */
function showPage(pageName) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageName);
  if (!target) return;
  target.classList.add('active');
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  const navLink = document.getElementById('nav-' + pageName);
  if (navLink) navLink.classList.add('active');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) mobileMenu.classList.remove('active');
  if (pageName === 'night') renderNightSchedule();
  if (pageName === 'add-place') resetAddPlaceForm();
  window.scrollTo(0, 0);
}

function renderNightSchedule() {
  const container = document.getElementById('weekSchedule');
  if (!container) return;
  const html = nightSchedule.map(d => {
    const isToday = d.day === todayArabic;
    return `
      <div class="day-card ${isToday ? 'today' : ''}">
        <div class="day-header">
          <span class="day-name">${d.day} ${isToday ? '(اليوم)' : ''}</span>
          ${isToday ? '<span class="status-badge">مناوبة حالياً</span>' : ''}
        </div>
        ${ d.pharmacy === 'لا توجد مناوبة'
            ? `<div class="pharmacy-info"><p><i class="fas fa-info-circle"></i> ${d.notes}</p></div>`
            : `<div class="pharmacy-info">
                 <h4>${d.pharmacy}</h4>
                 <p><i class="fas fa-map-marker-alt"></i> ${d.address}</p>
                 <p><i class="fas fa-phone"></i> ${d.phone}</p>
                 <p><i class="fas fa-clock"></i> ${d.hours}</p>
                 ${d.notes ? `<p><i class="fas fa-sticky-note"></i> ${d.notes}</p>` : ''}
               </div>`
        }
      </div>`;
  }).join('');
  container.innerHTML = html;
}

function showCategory(categoryId) {
  currentCategory = categoryId;
  const category = categories[categoryId];
  if (!category) return;
  const breadcrumb = document.getElementById('categoryBreadcrumb');
  const title = document.getElementById('categoryTitle');
  const desc = document.getElementById('categoryDesc');
  if (breadcrumb) breadcrumb.textContent = category.name;
  if (title) title.innerHTML = category.icon + ' ' + category.name;
  if (desc) desc.textContent = category.description;
  const nightBanner = document.getElementById('nightBanner');
  if (nightBanner) { if (categoryId === 'pharmacies') nightBanner.classList.add('show'); else nightBanner.classList.remove('show'); }
  const list = places[categoryId] || [];
  const grid = document.getElementById('placesGrid');
  if (grid) {
    const html = list.map(place => `
      <div class="place-card">
        <div class="place-header"><span class="place-badge">${category.icon} ${category.name}</span></div>
        <h3 class="place-name">${place.name}</h3>
        <p class="place-location"><i class="fas fa-map-marker-alt"></i> ${place.neighborhood}</p>
        <div class="place-actions">
          <a href="tel:${place.phone}" class="btn btn-call"><i class="fas fa-phone-alt"></i> اتصال</a>
          <a href="#" onclick="showPlace(${place.id}, '${categoryId}')" class="place-details-link"><i class="fas fa-info-circle"></i> تفاصيل</a>
        </div>
      </div>
    `).join('');
    grid.innerHTML = html || '<p style="text-align:center;color:var(--text-muted);">لا توجد أماكن في هذا القسم حالياً</p>';
  }
  showPage('category');
}

function showPlace(placeId, categoryId) {
  currentCategory = categoryId;
  const category = categories[categoryId];
  const place = (places[categoryId] || []).find(p => p.id === placeId);
  if (!category || !place) return;
  const el = id => document.getElementById(id);
  el('placeCategoryLink').textContent = category.name;
  el('placeBreadcrumb').textContent = place.name;
  el('placeCategoryBadge').innerHTML = category.icon + ' ' + category.name;
  el('placeTitle').textContent = place.name;
  el('placeAddressText').textContent = place.neighborhood; // استخدام ID غير متعارض
  el('placePhoneText').textContent = place.phone;          // استخدام ID غير متعارض
  const phoneNum = el('placePhoneNumber'); if (phoneNum) phoneNum.textContent = place.phone;
  el('placeDesc').textContent = place.description;
  const img = el('placeImage');
  if (img) { img.src = category.image; img.alt = `صورة ${category.name}`; }
  const callBtn = el('placeCallBtn');
  if (callBtn) {
    callBtn.href = 'tel:' + place.phone;
    callBtn.style.background = category.color;
    callBtn.onmouseover = function () { this.style.background = category.color; this.style.opacity = '0.9'; };
    callBtn.onmouseout  = function () { this.style.background = category.color; this.style.opacity = '1';   };
  }
  showPage('place');
}

function goBackToCategory() { showCategory(currentCategory); }
function toggleMobileMenu() { const m = document.getElementById('mobileMenu'); if (m) m.classList.toggle('active'); }
function handleSearch() { const input = document.getElementById('searchInput'); const q = input ? input.value.trim() : ''; if (q) alert('جاري البحث عن: ' + q + '\n\nهذه نسخة تجريبية، البحث غير مفعّل حالياً'); }

/* ================================
   ADD PLACE FORM
   ================================ */
function resetAddPlaceForm() {
  const form = document.getElementById('addPlaceForm'); if (!form) return;
  form.reset(); form.style.display = 'block';
  const success = document.getElementById('successMessage'); if (success) success.style.display = 'none';
  document.querySelectorAll('.form-error').forEach(e => e.classList.remove('show'));
  const btn = document.getElementById('submitBtn');
  if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال البيانات'; }
}

function validateForm() {
  let ok = true;
  const name = document.getElementById('placeName')?.value.trim();
  if (!name) { document.getElementById('nameError').classList.add('show'); ok = false; } else { document.getElementById('nameError').classList.remove('show'); }
  const address = document.getElementById('placeAddress')?.value.trim();
  if (!address) { document.getElementById('addressError').classList.add('show'); ok = false; } else { document.getElementById('addressError').classList.remove('show'); }
  const phone = document.getElementById('placePhone')?.value.trim();
  if (!phone || !isValidPhone(phone)) { document.getElementById('phoneError').classList.add('show'); ok = false; } else { document.getElementById('phoneError').classList.remove('show'); }
  const category = document.getElementById('placeCategory')?.value;
  if (!category) { document.getElementById('categoryError').classList.add('show'); ok = false; } else { document.getElementById('categoryError').classList.remove('show'); }
  return ok;
}

async function submitPlaceForm(e) {
  e.preventDefault();
  if (!validateForm()) return;
  if (!supabaseClient) { alert('إعداد Supabase غير صحيح. رجاءً تأكد من SUPABASE_URL و SUPABASE_ANON_KEY.'); return; }
  const btn = document.getElementById('submitBtn'); btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
  try {
    const placeData = {
      name: document.getElementById('placeName').value.trim(),
      address: document.getElementById('placeAddress').value.trim(),
      phone: document.getElementById('placePhone').value.trim(),
      category: document.getElementById('placeCategory').value,
      description: document.getElementById('placeDescription').value.trim() || null
    };
    const { error } = await supabaseClient.from(SUPABASE_TABLE).insert(placeData);
    if (error) {
      const msg = (error.code === '42501' || /RLS|policy|not allowed/i.test(error.message))
        ? 'تم رفض العملية بواسطة سياسات RLS. فعّل سياسة INSERT للـ anon.'
        : 'حدث خطأ أثناء إرسال البيانات. يرجى المحاولة لاحقاً.';
      throw new Error(msg + '\n\nالتفاصيل: ' + error.message);
    }
    document.getElementById('successMessage').style.display = 'block';
    document.getElementById('addPlaceForm').style.display = 'none';
    setTimeout(() => { showPage('home'); }, 3000);
  } catch (err) {
    console.error('خطأ في إرسال البيانات:', err);
    alert(err.message);
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال البيانات';
  }
}

/* ================================
   EVENTS & INIT
   ================================ */
document.getElementById('searchInput')?.addEventListener('keypress', e => { if (e.key === 'Enter') handleSearch(); });
document.getElementById('addPlaceForm')?.addEventListener('submit', submitPlaceForm);
document.addEventListener('click', (evt) => {
  const mobileMenu = document.getElementById('mobileMenu');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  if (mobileMenu && mobileMenu.classList.contains('active')) {
    if (!mobileMenu.contains(evt.target) && (!menuBtn || !menuBtn.contains(evt.target))) mobileMenu.classList.remove('active');
  }
});
renderNightSchedule();
document.querySelectorAll('#addPlaceForm input, #addPlaceForm select, #addPlaceForm textarea').forEach(el => {
  el.addEventListener('input', function () {
    const err = document.getElementById(this.id + 'Error');
    if (err) err.classList.remove('show');
  });
});
console.log('%c🏛️ دليل مدينة جبلة - جاهز', 'font-size:14px;color:#1e40af;');
window.showPage = showPage;
window.showCategory = showCategory;
window.showPlace = showPlace;
window.goBackToCategory = goBackToCategory;
window.toggleMobileMenu = toggleMobileMenu;
window.handleSearch = handleSearch;
