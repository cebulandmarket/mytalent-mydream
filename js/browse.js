// ============================================
// MyTalent.MyDream — Browse Page
// ============================================

const searchInput = document.getElementById('searchInput');
const filterTabs = document.getElementById('filterTabs');
const talentsGrid = document.getElementById('talentsGrid');
const resultsCount = document.getElementById('resultsCount');
const noResults = document.getElementById('noResults');

let activeCategory = 'all';

// --- Build filter tabs from categories ---
if (typeof CATEGORIES !== 'undefined') {
    CATEGORIES.forEach(cat => {
        const count = TALENTS.filter(t => t.category === cat.id).length;
        if (count > 0) {
            const btn = document.createElement('button');
            btn.className = 'filter-tab';
            btn.dataset.category = cat.id;
            btn.textContent = `${cat.icon} ${cat.name}`;
            filterTabs.appendChild(btn);
        }
    });
}

// --- Check URL for pre-selected category ---
const urlParams = new URLSearchParams(window.location.search);
const urlCategory = urlParams.get('category');
if (urlCategory) {
    activeCategory = urlCategory;
}

// --- Render talents ---
function renderTalents() {
    const search = searchInput.value.toLowerCase().trim();
    let filtered = TALENTS;

    if (activeCategory !== 'all') {
        filtered = filtered.filter(t => t.category === activeCategory);
    }

    if (search) {
        filtered = filtered.filter(t =>
            t.name.toLowerCase().includes(search) ||
            t.talent.toLowerCase().includes(search) ||
            t.location.toLowerCase().includes(search) ||
            t.dream.toLowerCase().includes(search)
        );
    }

    if (filtered.length === 0) {
        talentsGrid.innerHTML = '';
        talentsGrid.style.display = 'none';
        noResults.style.display = 'block';
        resultsCount.textContent = '0 talents found';
    } else {
        talentsGrid.style.display = 'grid';
        noResults.style.display = 'none';
        talentsGrid.innerHTML = filtered.map(createTalentCard).join('');
        resultsCount.textContent = `${filtered.length} talent${filtered.length !== 1 ? 's' : ''} found`;
    }

    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === activeCategory);
    });
}

// --- Event listeners ---
searchInput.addEventListener('input', renderTalents);

filterTabs.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-tab')) {
        activeCategory = e.target.dataset.category;
        renderTalents();
    }
});

// --- Initial render ---
renderTalents();
