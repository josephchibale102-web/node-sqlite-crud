const API_URL = 'http://localhost:3000/api/clubs';

// Fetch and display clubs on page load
window.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded, fetching clubs...");
    fetchClubs();
});

async function fetchClubs() {
    try {
        console.log("Fetching from:", API_URL);
        const response = await fetch(API_URL);
        const result = await response.json();
        console.log("Data received:", result);

        const tbody = document.getElementById('club-table-body');
        tbody.innerHTML = '';

        if (!result.data || result.data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">No clubs found</td></tr>';
            return;
        }

        result.data.forEach(club => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${club.id}</td>
                <td>${club.name}</td>
                <td>${club.category || ''}</td>
                <td>${club.president_name || ''}</td>
                <td>${club.member_count || ''}</td>
                <td>${club.meeting_day || ''}</td>
                <td>
                    <button onclick="editClub(${club.id}, '${escapeQuote(club.name)}', '${escapeQuote(club.description)}', '${escapeQuote(club.category)}', '${escapeQuote(club.president_name)}', ${club.member_count}, '${escapeQuote(club.meeting_day)}')">Edit</button>
                    <button class="delete-btn" onclick="deleteClub(${club.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error('Error fetching clubs:', err);
    }
}

// Handle Form Submission (Create or Update)
document.getElementById('club-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('club-id').value;
    const clubData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        president_name: document.getElementById('president_name').value,
        member_count: parseInt(document.getElementById('member_count').value) || 0,
        meeting_day: document.getElementById('meeting_day').value
    };

    try {
        let response;
        if (id) {
            response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clubData)
            });
        } else {
            response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clubData)
            });
        }

        if (response.ok) {
            resetForm();
            fetchClubs();
        } else {
            alert('Failed to save club');
        }
    } catch (err) {
        console.error('Error saving club:', err);
    }
});

// Load club data into form for editing
function editClub(id, name, description, category, president_name, member_count, meeting_day) {
    document.getElementById('club-id').value = id;
    document.getElementById('name').value = name === 'null' ? '' : name;
    document.getElementById('description').value = description === 'null' ? '' : description;
    document.getElementById('category').value = category === 'null' ? '' : category;
    document.getElementById('president_name').value = president_name === 'null' ? '' : president_name;
    document.getElementById('member_count').value = member_count === 'null' ? '' : member_count;
    document.getElementById('meeting_day').value = meeting_day === 'null' ? '' : meeting_day;

    document.getElementById('form-title').innerText = 'Edit Club';
    document.getElementById('submit-btn').innerText = 'Update Club';
    document.getElementById('cancel-btn').style.display = 'inline-block';
}

// Delete club by ID
async function deleteClub(id) {
    if (confirm('Are you sure you want to delete this club?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                fetchClubs();
            } else {
                alert('Failed to delete club');
            }
        } catch (err) {
            console.error('Error deleting club:', err);
        }
    }
}

// Reset Form Helper
function resetForm() {
    document.getElementById('club-form').reset();
    document.getElementById('club-id').value = '';
    document.getElementById('form-title').innerText = 'Add New Club';
    document.getElementById('submit-btn').innerText = 'Save Club';
    document.getElementById('cancel-btn').style.display = 'none';
}

function escapeQuote(str) {
    if (!str) return '';
    return String(str).replace(/'/g, "\\'");
}