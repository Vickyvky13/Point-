const search = document.querySelector('#search');
const table_rows = document.querySelectorAll('tbody tr');
const table_headings = document.querySelectorAll('thead th');

// Ensure IDs remain sequential
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('tbody');
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        return parseInt(a.dataset.originalIndex) - parseInt(b.dataset.originalIndex);
    });

    rows.forEach((row, index) => {
        row.cells[0].innerText = index + 1; // Set sequential IDs (1,2,3...)
        tableBody.appendChild(row);
    });
});

// Search functionality
search.addEventListener('input', () => {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();

        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
    });
});

// Sorting functionality
table_headings.forEach((head, i) => {
    let sort_asc = true;
    head.onclick = () => {
        table_headings.forEach(h => h.classList.remove('active'));
        head.classList.add('active');

        const sortedRows = Array.from(table_rows).sort((a, b) => {
            let first = a.cells[i].innerText.toLowerCase(),
                second = b.cells[i].innerText.toLowerCase();
            return sort_asc ? first.localeCompare(second) : second.localeCompare(first);
        });

        sort_asc = !sort_asc;
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '';
        sortedRows.forEach(row => tbody.appendChild(row));
    };
});