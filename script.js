// Function to add dynamic inputs (Internships/Projects)
function addEntry(containerId) {
    const container = document.getElementById(containerId);
    const div = document.createElement('div');
    div.className = 'entry-block';
    div.innerHTML = `
        <input type="text" class="e-title" placeholder="Title/Company">
        <textarea class="e-desc" placeholder="Details/Responsibilities"></textarea>
    `;
    container.appendChild(div);
}

// Form Submission & Live Preview
document.getElementById('resumeForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Handle Profile Photo
    const file = document.getElementById('profilePic').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.getElementById('prevImg');
            img.src = e.target.result;
            img.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    // Map Simple Fields
    document.getElementById('prevName').innerText = document.getElementById('name').value;
    document.getElementById('prevPhone').innerText = document.getElementById('phone').value;
    document.getElementById('prevEmail').innerText = document.getElementById('email').value;
    document.getElementById('prevAddress').innerText = document.getElementById('address').value;
    document.getElementById('prevDob').innerText = document.getElementById('dob').value;
    document.getElementById('prevSummary').innerText = document.getElementById('summary').value;
    document.getElementById('prevSkills').innerText = document.getElementById('skills').value;
    document.getElementById('prevCerts').innerText = document.getElementById('certs').value;
    document.getElementById('prevEdu').innerText = document.getElementById('education').value;
    document.getElementById('prevLang').innerText = document.getElementById('languages').value;

    // Map Dynamic Lists
    renderDynamic('internshipContainer', 'prevInterns');
    renderDynamic('projectContainer', 'prevProjects');
});

function renderDynamic(sourceId, targetId) {
    let html = '';
    const entries = document.querySelectorAll(`#${sourceId} .entry-block`);
    entries.forEach(entry => {
        const title = entry.querySelector('.e-title').value;
        const desc = entry.querySelector('.e-desc').value;
        if(title) {
            html += `<div class="dynamic-entry-preview"><strong>${title}</strong><p>${desc}</p></div>`;
        }
    });
    document.getElementById(targetId).innerHTML = html;
}

// PDF Export with Multi-page handling
document.getElementById('downloadPdf').addEventListener('click', () => {
    const element = document.getElementById('resumeCanvas');
    const opt = {
        margin: 0,
        filename: 'My_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        // This is key: 'avoid' prevents breaking inside a section
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
});

// Initialize with one empty field
addEntry('internshipContainer');
addEntry('projectContainer');
