// ============================================
// MyTalent.MyDream — Profile Page
// ============================================

const profileCard = document.getElementById('profileCard');
const profileNotFound = document.getElementById('profileNotFound');

function getVideoEmbed(url) {
    if (!url) return '';
    // YouTube
    let match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (match) return `<iframe src="https://www.youtube.com/embed/${match[1]}" allowfullscreen></iframe>`;
    // Facebook
    if (url.includes('facebook.com')) {
        return `<iframe src="https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0" allowfullscreen></iframe>`;
    }
    // TikTok - just link
    if (url.includes('tiktok.com')) {
        return `<a href="${url}" target="_blank" class="btn btn-secondary">Watch on TikTok</a>`;
    }
    return `<a href="${url}" target="_blank" class="btn btn-secondary">Watch Video</a>`;
}

function renderProfile() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id || typeof TALENTS === 'undefined') {
        profileCard.style.display = 'none';
        profileNotFound.style.display = 'block';
        return;
    }

    const talent = TALENTS.find(t => t.id === id);
    if (!talent) {
        profileCard.style.display = 'none';
        profileNotFound.style.display = 'block';
        return;
    }

    const cat = getCategoryById(talent.category);
    const initials = getInitials(talent.name);

    const avatarHTML = talent.photo
        ? `<img src="${talent.photo}" alt="${talent.name}" class="profile-avatar">`
        : `<div class="profile-avatar-placeholder">${initials}</div>`;

    const videoHTML = talent.video
        ? `<div class="profile-video">${getVideoEmbed(talent.video)}</div>`
        : '';

    const helpHTML = talent.howToHelp
        ? `<div class="profile-help-box">
               <p class="profile-section-title">How You Can Help</p>
               <p class="profile-text" style="margin-bottom:0;">${talent.howToHelp}</p>
           </div>`
        : '';

    const gofundmeHTML = talent.gofundme
        ? `<div class="profile-gofundme">
               <div class="gofundme-icon">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="32" height="32"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
               </div>
               <h3>Support ${talent.name}'s Dream</h3>
               <p>Help make this dream a reality. Every donation — big or small — brings them closer.</p>
               <a href="${talent.gofundme}" target="_blank" class="btn btn-gofundme">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                   Donate on GoFundMe
               </a>
           </div>`
        : '';

    // Update page title
    document.title = `${talent.name} — MyTalent.MyDream`;

    profileCard.innerHTML = `
        <div class="profile-header">
            ${avatarHTML}
            <h1 class="profile-name">${talent.name}</h1>
            <div class="profile-meta">
                <span>📍 ${talent.location}</span>
                <span>Age ${talent.age}</span>
            </div>
            <span class="profile-category-badge">${cat.icon} ${cat.name}</span>
        </div>
        <div class="profile-body">
            <p class="profile-section-title">The Talent</p>
            <p class="profile-text">${talent.talent}</p>

            ${videoHTML}

            <div class="profile-dream-box">
                <p class="profile-section-title">The Dream</p>
                <p class="profile-text" style="margin-bottom:0;">"${talent.dream}"</p>
            </div>

            ${helpHTML}

            ${gofundmeHTML}
        </div>
        <div class="profile-actions">
            <button class="btn btn-primary" onclick="shareTalent()">Share This Talent</button>
            ${talent.gofundme ? `<a href="${talent.gofundme}" target="_blank" class="btn btn-gofundme-sm">Donate</a>` : ''}
            <a href="browse.html" class="btn btn-secondary">Browse More Talents</a>
        </div>
    `;
}

function shareTalent() {
    const url = window.location.href;
    if (navigator.share) {
        navigator.share({ title: document.title, url: url });
    } else {
        navigator.clipboard.writeText(url).then(() => {
            alert('Profile link copied! Share it on Facebook or anywhere.');
        });
    }
}

renderProfile();
