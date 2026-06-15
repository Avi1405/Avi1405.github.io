const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
  document.body.classList.add("dark");
  themeToggle.setAttribute("aria-label", "Switch to light theme");
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  themeIcon.style.transform = "rotate(180deg)";
  window.setTimeout(() => { themeIcon.style.transform = ""; }, 300);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.querySelector("#year").textContent = new Date().getFullYear();

const emailParts = ["antigen_backing.4s", "icloud.com"];

document.querySelectorAll("[data-email-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const email = emailParts.join("@");
    const link = document.createElement("a");
    link.className = trigger.className;
    link.href = `mailto:${email}`;
    link.textContent = email;
    link.setAttribute("aria-label", `Email ${email}`);
    trigger.replaceWith(link);
  });
});
