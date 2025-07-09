let jobList = [];

document.addEventListener("DOMContentLoaded", () => {
  // Fetch jobs.json and initialize jobList
  fetch("data/jobs.json")
    .then(res => res.json())
    .then(data => {
      jobList = data.map(job => ({
        title: job.title,
        dept: job.department,
        desc: `${job.type} | ${job.location} | Posted: ${job.postedDate}`
      }));
      renderJobs();
    })
    .catch(err => {
      console.error("Failed to load jobs:", err);
      renderJobs(); // Renders empty if fetch fails
    });

  document.getElementById("addJobBtn").addEventListener("click", openModal);
  document.getElementById("jobForm").addEventListener("submit", addJob);
  document.getElementById("searchInput").addEventListener("input", searchJobs);
});

function renderJobs(filtered = jobList) {
  const jobListContainer = document.getElementById("jobList");
  jobListContainer.innerHTML = "";

  if (filtered.length === 0) {
    jobListContainer.innerHTML = "<p>No jobs found.</p>";
    return;
  }

  filtered.forEach((job, index) => {
    const card = document.createElement("div");
    card.className = "job-card";
    card.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Department:</strong> ${job.dept}</p>
      <p>${job.desc}</p>
      <div class="actions">
        <button onclick="deleteJob(${index})">🗑️ Delete</button>
      </div>
    `;
    jobListContainer.appendChild(card);
  });
}

function openModal() {
  document.getElementById("jobModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("jobModal").style.display = "none";
  document.getElementById("jobForm").reset();
}

function addJob(e) {
  e.preventDefault();
  const title = document.getElementById("jobTitle").value;
  const dept = document.getElementById("jobDept").value;
  const desc = document.getElementById("jobDesc").value;

  jobList.push({ title, dept, desc });
  closeModal();
  renderJobs();
}

function deleteJob(index) {
  if (confirm("Are you sure you want to delete this job posting?")) {
    jobList.splice(index, 1);
    renderJobs();
  }
}

function searchJobs(e) {
  const keyword = e.target.value.toLowerCase();
  const filtered = jobList.filter(job =>
    job.title.toLowerCase().includes(keyword) || job.dept.toLowerCase().includes(keyword)
  );
  renderJobs(filtered);
}
