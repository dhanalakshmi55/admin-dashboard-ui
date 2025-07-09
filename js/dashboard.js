// dashboard.js

// Auth check
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

// Dummy dashboard data (can be dynamic later)
const kpis = [
  {
    id: "totalApplicants",
    label: "Total Applicants",
    value: 186,
    icon: "👥",
  },
  {
    id: "jobPosts",
    label: "Job Openings",
    value: 12,
    icon: "📄",
  },
  {
    id: "interviews",
    label: "Interviews Scheduled",
    value: 8,
    icon: "📅",
  },
  {
    id: "logs",
    label: "System Logs",
    value: 32,
    icon: "🧾",
  }
];

// Inject KPI cards dynamically
kpis.forEach(kpi => {
  const container = document.getElementById(kpi.id + "Container");
  container.innerHTML = `
    <div class="kpi-card">
      <div class="kpi-icon">${kpi.icon}</div>
      <div class="kpi-metric">${kpi.value}</div>
      <div class="kpi-label">${kpi.label}</div>
    </div>
  `;
});


// Logout
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

// === Sample Data ===
const jobs = [
  { status: "Open" },
  { status: "Open" },
  { status: "Open" },
  { status: "Closed" },
  { status: "Open" },
  { status: "Closed" },
  { status: "Open" },
  { status: "Closed" },
  { status: "Open" },
];
const applicants = [
  { position: "Frontend Developer", status: "Pending" },
  { position: "Frontend Developer", status: "Accepted" },
  { position: "Frontend Developer", status: "Reviewed" },
  { position: "Frontend Developer", status: "Reviewed" },
  { position: "Backend Developer", status: "Accepted" },
  { position: "Backend Developer", status: "Pending" },
  { position: "UI/UX Designer", status: "Reviewed" },
  { position: "Project Manager", status: "Pending" },
  { position: "Project Manager", status: "Rejected" },
  { position: "Project Manager", status: "Accepted" },
  { position: "HR Manager", status: "Accepted" },
  { position: "HR Manager", status: "Rejected" },
  { position: "HR Manager", status: "Reviewed" },
  { position: "HR Manager", status: "Pending" },
  { position: "HR Manager", status: "Accepted" },
];

// === Chart 1: Job Status ===
const jobStatusCtx = document.getElementById("jobStatusChart").getContext("2d");
const jobStatusCounts = jobs.reduce((acc, job) => {
  acc[job.status] = (acc[job.status] || 0) + 1;
  return acc;
}, {});

new Chart(jobStatusCtx, {
  type: "doughnut",
  data: {
    labels: Object.keys(jobStatusCounts),
    datasets: [
      {
        data: Object.values(jobStatusCounts),
        backgroundColor: ["#28a745", "#dc3545"],
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Job Status Distribution",
      },
    },
  },
});

// === Chart 2: Applicant Status ===
const applicantStatusCtx = document
  .getElementById("applicantStatusChart")
  .getContext("2d");
const applicantStatusCounts = applicants.reduce((acc, app) => {
  const status =
    app.status.charAt(0).toUpperCase() + app.status.slice(1).toLowerCase();
  acc[status] = (acc[status] || 0) + 1;
  return acc;
}, {});

new Chart(applicantStatusCtx, {
  type: "bar",
  data: {
    labels: Object.keys(applicantStatusCounts),
    datasets: [
      {
        label: "Applicants",
        data: Object.values(applicantStatusCounts),
        backgroundColor: "#007bff",
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Applicants per Job Position",
      },
      legend: {
        display: false, // 👈 Hides the legend
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// === Chart 3: Applicants per Position ===
const applicantsByJobCtx = document
  .getElementById("applicantsPerPositionChart")
  .getContext("2d");
const applicantsPerPosition = applicants.reduce((acc, app) => {
  acc[app.position] = (acc[app.position] || 0) + 1;
  return acc;
}, {});

new Chart(applicantsByJobCtx, {
  type: "bar",
  data: {
    labels: Object.keys(applicantsPerPosition),
    datasets: [
      {
        label: "Applicants",
        data: Object.values(applicantsPerPosition),
        backgroundColor: "#17a2b8",
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Applicants per Job Position",
      },
      legend: {
        display: false, // 👈 Hides the legend
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
