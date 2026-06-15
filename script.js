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

const projectsStyles = document.createElement("link");
projectsStyles.rel = "stylesheet";
projectsStyles.href = "projects.css";
document.head.append(projectsStyles);

const projectsNav = document.createElement("a");
projectsNav.href = "#projects";
projectsNav.textContent = "Projects";
document.querySelector('.desktop-nav a[href="#credentials"]').before(projectsNav);

const projectsSection = document.createElement("section");
projectsSection.className = "projects section-shell";
projectsSection.id = "projects";
projectsSection.innerHTML = `
  <div class="section-label reveal"><span>05</span><p>Projects</p></div>
  <div class="projects-content">
    <div class="section-heading reveal"><p class="eyebrow"><span></span> Selected work</p><h2>Ideas made tangible.<br><em>Systems made useful.</em></h2></div>
    <div class="project-grid">
      <a class="project-card project-card-featured reveal" href="https://github.com/Avi1405/distributed-task-queue" target="_blank" rel="noreferrer">
        <div class="project-top"><span>Backend architecture</span><span aria-hidden="true">↗</span></div>
        <div><p class="project-number">01</p><h3>Distributed Task Queue</h3><p>A Spring Boot and Redis architecture prototype for priority queues, retry handling, observability, integration testing, and containerized deployment.</p></div>
        <div class="project-stack"><span>Java 17</span><span>Spring Boot</span><span>Redis</span><span>Docker</span></div>
      </a>
      <a class="project-card reveal delay-1" href="https://github.com/Avi1405/mygptapp" target="_blank" rel="noreferrer">
        <div class="project-top"><span>Product engineering</span><span aria-hidden="true">↗</span></div>
        <div><p class="project-number">02</p><h3>World Cup 2026 Schedule</h3><p>An SEO-first schedule experience covering 104 matches with local-time conversion, country filtering, fallback data, and SportsEvent structured metadata.</p></div>
        <div class="project-stack"><span>JavaScript</span><span>HTML/CSS</span><span>JSON-LD</span><span>Responsive UI</span></div>
      </a>
    </div>
  </div>`;

const credentialsSection = document.querySelector("#credentials");
credentialsSection.before(projectsSection);
credentialsSection.querySelector(".section-label span").textContent = "06";
projectsSection.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
