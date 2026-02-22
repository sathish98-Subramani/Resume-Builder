// Dynamic Field Generators
function addExperience() {
    const container = document.getElementById('experienceList');
    const html = `
        <div class="entry-card" style="border: 1px solid #eee; padding: 10px; margin-top: 10px; border-radius: 8px;">
            <input type="text" class="exp-title" placeholder="Job Title">
            <input type="text" class="exp-company" placeholder="Company">
            <input type="text" class="exp-date" placeholder="Duration (e.g., 2021 - 2023)">
            <textarea class="exp-desc" placeholder="Responsibilities"></textarea>
        </div>`;
    container.insertAdjacentHTML('beforeend', html);
}

function addProject() {
    const container = document.getElementById('projectList');
    const html = `
        <div class="entry-card" style="border: 1px solid #eee; padding: 10px; margin-top: 10px; border-radius: 8px;">
            <input type="text" class="proj-name" placeholder="Project Name">
            <textarea class="proj-desc" placeholder="Project Description"></textarea>
        </div>`;
    container.insertAdjacentHTML('beforeend', html);
}

// Form Handling
document.getElementById('resumeForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Profile Photo
    const file = document.getElementById('profilePic').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.getElementById('resPhoto');
            img.src = e.target.result;
            img.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }

    // Map Header
    document.getElementById('resName').innerText = document.getElementById('name').value;
    document.getElementById('resContact').innerText = 
        `${document.getElementById('email').value} | ${document.getElementById('phone').value} \n ${document.getElementById('linkedin').value}`;

    // Map Work Experience
    let expContent = '<div class="res-section-title">Experience</div>';
    document.querySelectorAll('#experienceList .entry-card').forEach(card => {
        expContent += `
            <div class="entry">
                <div class="entry-head">
                    <span>${card.querySelector('.exp-title').value}</span>
                    <small>${card.querySelector('.exp-date').value}</small>
                </div>
                <div style="font-size: 0.9rem; color: #666;">${card.querySelector('.exp-company').value}</div>
                <p style="font-size: 0.85rem;">${card.querySelector('.exp-desc').value}</p>
            </div>`;
    });

    // Map Skills & Education
    const extraContent = `
        <div class="res-section-title">Skills</div>
        <p style="font-size: 0.9rem;">${document.getElementById('skills').value}</p>
        <div class="res-section-title">Education</div>
        <p style="font-size: 0.9rem;">${document.getElementById('education').value}</p>
    `;

    document.getElementById('resContent').innerHTML = `
        <div class="res-section-title">Objective</div>
        <p style="font-size: 0.9rem;">${document.getElementById('objective').value}</p>
        ${expContent}
        ${extraContent}
    `;
});

// Theme Switcher
document.getElementById('themeSelect').addEventListener('change', function() {
    document.getElementById('resumeTemplate').setAttribute('data-theme', this.value);
});

// PDF Download
document.getElementById('downloadPdf').addEventListener('click', () => {
    const element = document.getElementById('resumeTemplate');
    const opt = {
        margin: 0,
        filename: 'My_Professional_Resume.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
});

// Initialize with one entry
addExperience();