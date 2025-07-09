document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("settingsForm");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("adminName").value;
    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;

    // Here you can add localStorage, fetch to API, or show a confirmation
    console.log("Saved Settings:", { name, email, password });

    alert("Settings saved successfully!");
    form.reset();
  });
});
