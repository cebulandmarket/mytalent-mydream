// ============================================
// MyTalent.MyDream — Main App JS
// ============================================

// --- Mobile Menu ---
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navLinks.classList.remove('open');
        }
    });
}

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- Helper: Get initials ---
function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

// --- Helper: Get category by ID ---
function getCategoryById(id) {
    return CATEGORIES.find(c => c.id === id) || { name: 'Other', icon: '✨' };
}

// --- Helper: Create talent card HTML ---
function createTalentCard(talent) {
    const cat = getCategoryById(talent.category);
    const initials = getInitials(talent.name);
    const photoHTML = talent.photo
        ? `<img src="${talent.photo}" alt="${talent.name}" class="talent-card-image">`
        : `<div class="talent-card-placeholder">${initials}</div>`;

    return `
        <a href="profile.html?id=${talent.id}" class="talent-card">
            ${photoHTML}
            <div class="talent-card-body">
                <span class="talent-card-category">${cat.icon} ${cat.name}</span>
                <h3 class="talent-card-name">${talent.name}</h3>
                <p class="talent-card-location">📍 ${talent.location}</p>
                <p class="talent-card-dream">"${talent.dream}"</p>
            </div>
            <div class="talent-card-footer">
                <span class="talent-card-age">Age ${talent.age}</span>
                <span class="talent-card-link">View Profile →</span>
            </div>
        </a>
    `;
}

// --- Homepage: Featured Talents ---
const featuredGrid = document.getElementById('featuredGrid');
if (featuredGrid && typeof TALENTS !== 'undefined') {
    const featured = TALENTS.filter(t => t.featured).slice(0, 6);
    featuredGrid.innerHTML = featured.map(createTalentCard).join('');
}

// --- Homepage: Stats ---
const talentCount = document.getElementById('talentCount');
const categoryCount = document.getElementById('categoryCount');
const dreamCount = document.getElementById('dreamCount');

if (talentCount && typeof TALENTS !== 'undefined') {
    const usedCategories = [...new Set(TALENTS.map(t => t.category))];
    animateNumber(talentCount, TALENTS.length);
    animateNumber(categoryCount, usedCategories.length);
    animateNumber(dreamCount, TALENTS.filter(t => t.dream).length);
}

function animateNumber(el, target) {
    let current = 0;
    const step = Math.max(1, Math.floor(target / 30));
    const interval = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        el.textContent = current;
    }, 40);
}

// --- Homepage: Categories ---
const categoriesGrid = document.getElementById('categoriesGrid');
if (categoriesGrid && typeof TALENTS !== 'undefined') {
    categoriesGrid.innerHTML = CATEGORIES.map(cat => {
        const count = TALENTS.filter(t => t.category === cat.id).length;
        return `
            <a href="browse.html?category=${cat.id}" class="category-card">
                <span class="category-icon">${cat.icon}</span>
                <span class="category-name">${cat.name}</span>
                <span class="category-count">${count} talent${count !== 1 ? 's' : ''}</span>
            </a>
        `;
    }).join('');
}

// --- Footer Categories ---
const footerCategories = document.getElementById('footerCategories');
if (footerCategories) {
    const topCats = CATEGORIES.slice(0, 5);
    footerCategories.innerHTML = topCats.map(cat =>
        `<li><a href="browse.html?category=${cat.id}">${cat.name}</a></li>`
    ).join('');
}
