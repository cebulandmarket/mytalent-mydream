// ============================================
// MyTalent.MyDream — Talent Data
// Add new talents here. Each talent gets a profile page.
// ============================================

const CATEGORIES = [
    { id: 'singing', name: 'Singing', icon: '🎤' },
    { id: 'dancing', name: 'Dancing', icon: '💃' },
    { id: 'art', name: 'Art & Drawing', icon: '🎨' },
    { id: 'music', name: 'Music & Instruments', icon: '🎵' },
    { id: 'crafts', name: 'Crafts & Handmade', icon: '🧵' },
    { id: 'cooking', name: 'Cooking', icon: '🍳' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'writing', name: 'Writing & Poetry', icon: '✍️' },
    { id: 'acting', name: 'Acting & Performance', icon: '🎭' },
    { id: 'tech', name: 'Tech & Building', icon: '🔧' },
    { id: 'other', name: 'Other', icon: '✨' }
];

const TALENTS = [
    // === SAMPLE TALENTS (Replace with real people) ===
    {
        id: 'maria-santos',
        name: 'Maria Santos',
        age: 14,
        location: 'Cebu City',
        category: 'singing',
        talent: 'Maria has been singing since she was 6. She performs at local fiestas and church events. Her voice has a raw, emotional quality that moves everyone who hears her. She learned entirely by ear — no formal training.',
        dream: 'I dream of becoming a professional singer and recording my own song. I want to prove that you don\'t need to be rich to have a beautiful voice.',
        howToHelp: 'Vocal training, a chance to perform, or recording studio time',
        photo: '',
        video: '',
        featured: true,
        dateAdded: '2026-03-20'
    },
    {
        id: 'juan-dela-cruz',
        name: 'Juan Dela Cruz',
        age: 12,
        location: 'Mandaue City',
        category: 'art',
        talent: 'Juan draws incredibly detailed portraits using only a pencil and paper. His classmates and teachers are amazed by his skill. He draws during breaks and after school — it\'s all he wants to do.',
        dream: 'I want to go to art school and become an illustrator. I want to draw comics and make people happy with my art.',
        howToHelp: 'Art supplies, sketchbooks, art school scholarship',
        photo: '',
        video: '',
        featured: true,
        dateAdded: '2026-03-20'
    },
    {
        id: 'anna-reyes',
        name: 'Anna Reyes',
        age: 16,
        location: 'Lapu-Lapu City',
        category: 'dancing',
        talent: 'Anna is a self-taught dancer who learned from watching YouTube videos on borrowed phones. She choreographs her own routines and teaches other kids in her barangay for free.',
        dream: 'I want to join a professional dance group and travel to perform. Dancing makes me feel alive — I want to share that feeling with the world.',
        howToHelp: 'Dance training, performance opportunities, proper dance shoes',
        photo: '',
        video: '',
        featured: true,
        dateAdded: '2026-03-20'
    }
];
