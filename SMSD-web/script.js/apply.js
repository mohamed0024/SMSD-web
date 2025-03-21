    // Form validation
    const form = document.querySelector('.application-form');
    form.addEventListener('submit', (e) => {
        const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
        if (checkboxes.length === 0 || checkboxes.length > 3) {
            e.preventDefault();
            alert('Please select 1-3 areas of interest');
        }
    });

    // File size validation
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    document.getElementById('cv').addEventListener('change', function() {
        if(this.files[0].size > MAX_SIZE) {
            alert('File size exceeds 5MB limit');
            this.value = '';
        }
    });

    document.getElementById('cover-letter').addEventListener('change', function() {
        if(this.files[0]?.size > MAX_SIZE) {
            alert('File size exceeds 5MB limit');
            this.value = '';
        }
    });
