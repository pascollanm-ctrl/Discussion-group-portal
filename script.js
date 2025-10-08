// Login
const loginBtn = document.getElementById("loginBtn");
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginMessage = document.getElementById("login-message");
const dashboard = document.getElementById("dashboard");
const loginPage = document.getElementById("login-page");
const logoutBtn = document.getElementById("logoutBtn");

loginBtn.addEventListener("click", async () => {
  try {
    await auth.signInWithEmailAndPassword(email.value, password.value);
  } catch (err) {
    loginMessage.textContent = "Login failed: " + err.message;
  }
});

auth.onAuthStateChanged(user => {
  if (user) {
    loginPage.classList.add("hidden");
    dashboard.classList.remove("hidden");
  } else {
    dashboard.classList.add("hidden");
    loginPage.classList.remove("hidden");
  }
});

logoutBtn.addEventListener("click", () => auth.signOut());

// Announcements
document.getElementById("postAnnouncement").addEventListener("click", async () => {
  const text = document.getElementById("announcement").value;
  if (!text) return;
  await db.collection("announcements").add({ text, date: new Date() });
  document.getElementById("announcement").value = "";
});

// Notes upload
document.getElementById("uploadNotes").addEventListener("click", async () => {
  const unit = document.getElementById("notesUnit").value;
  const file = document.getElementById("notesFile").files[0];
  if (!unit || !file) return alert("Fill all fields");
  const ref = storage.ref("notes/" + unit + "/" + file.name);
  await ref.put(file);
  alert("Notes uploaded successfully");
});

// Past papers upload
document.getElementById("uploadPaper").addEventListener("click", async () => {
  const unit = document.getElementById("papersUnit").value;
  const file = document.getElementById("papersFile").files[0];
  if (!unit || !file) return alert("Fill all fields");
  const ref = storage.ref("past-papers/" + unit + "/" + file.name);
  await ref.put(file);
  alert("Past paper uploaded successfully");
});