// ============================================
// MyTalent.MyDream — Submit Form
// ============================================

const talentForm = document.getElementById('talentForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

if (talentForm) {
    talentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        const formData = new FormData(talentForm);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                talentForm.style.display = 'none';
                formSuccess.style.display = 'block';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                throw new Error('Submission failed');
            }
        } catch (err) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit My Talent';
            alert('Something went wrong. Please try again or contact us directly.');
        }
    });
}
