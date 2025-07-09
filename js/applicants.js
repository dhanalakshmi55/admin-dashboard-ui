let applicants = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/applicants.json")
    .then(res => res.json())
    .then(data => {
      applicants = data;
      renderApplicants();
    })
    .catch(err => console.error("Failed to load applicants:", err));

  document.getElementById("searchInput").addEventListener("input", searchApplicants);
});

function renderApplicants(filtered = applicants) {
  const tableBody = document.getElementById("applicantTableBody");
  tableBody.innerHTML = "";

  if (filtered.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='8'>No applicants found.</td></tr>";
    return;
  }

  filtered.forEach((applicant, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${applicant.name}</td>
      <td>${applicant.email}</td>
      <td>${applicant.phone}</td>
      <td>${applicant.position}</td>
      <td><span class="status ${applicant.status.toLowerCase()}">${applicant.status}</span></td>
      <td>${applicant.appliedDate}</td>
      <td><a href="${applicant.resume}" class="resume-link" target="_blank">View</a></td>
      <td class="action-buttons">
        <button class="delete" onclick="deleteApplicant(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}


function searchApplicants(e) {
  const keyword = e.target.value.toLowerCase();
  const filtered = applicants.filter(applicant =>
    applicant.name.toLowerCase().includes(keyword) ||
    applicant.email.toLowerCase().includes(keyword) ||
    applicant.position.toLowerCase().includes(keyword)
  );
  renderApplicants(filtered);
}

function deleteApplicant(index) {
  const confirmDelete = confirm("Are you sure you want to delete this applicant?");
  if (confirmDelete) {
    applicants.splice(index, 1);
    renderApplicants();
  }
}
