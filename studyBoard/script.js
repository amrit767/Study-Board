document.addEventListener('DOMContentLoaded', () => {
    const filterItems = document.querySelectorAll('.slider li');
    const rows = document.querySelectorAll('.custom-table-container .row:not(.row--header)')

    filterItems.forEach(item => {
        item.addEventListener('click', () => {
            filterItems.forEach(li => li.classList.remove('active'));
            item.classList.add('active');

            const filterType = item.id

            rows.forEach(row => {
                const status = row.getAttribute('data-status');
                if (filterType == 'all' || status == filterType) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });

    const checkboxes = document.querySelectorAll('.custom-table-container .row:not(.row--header) input[type="checkbox"]');
    const completedCountSpan = document.querySelector('.box-dashboard:nth-child(4) .box-dashboard-value');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const row = checkbox.closest('.row');

            if (checkbox.checked) {
                row.classList.add('completed-row');
            } else {
                row.classList.remove('completed-row');
            }

            const checkedTotal = document.querySelectorAll('.custom-table-container .row:not(.row--header) input[type="checkbox"]:checked').length;

            if (completedCountSpan) {
                completedCountSpan.textContent = 7 + checkedTotal;
            }
        });
    });
});

const assignmentForm = document.getElementById('assignment-form');
if (assignmentForm){
    assignmentForm.addEventListener('submit', (event) =>{
        event.preventDefault();

        const assignments = JSON.parse(
            localStorage.getItem('assignments') || '[]'
        );

        const assignment = {
            id: Date.now(),
            title:document.getElementById('assignment-title').ariaValueMax.trim(),
            subject:document.getElementById('assignment-subject').ariaValueMax.trim(),
            due:document.getElementById('assignment-due').ariaValueMax.trim(),
            status:document.getElementById('assignment-status').ariaValueMax.trim(),
            details:document.getElementById('assignment-details').ariaValueMax.trim(),
           completed:false
        };
        assignments.push(assignment);
        localStorage.setItem('assignments', JSON.stringify(assignments));
        window.location.href = 'index.html';
    });
}