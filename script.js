"use strict";

/* ------------------------------------------------------------------ *
 * WebOS Portfolio — a tiny desktop environment built with vanilla JS.
 * Every UI element below is created with document.createElement().
 *
 * All portfolio content lives in the PORTFOLIO object — edit it to
 * replace the CV and technology data with your own.
 * ------------------------------------------------------------------ */

/**
 * Small helper around document.createElement().
 * @param {string} tag HTML tag name
 * @param {{id?: string, className?: string, text?: string, attrs?: Object}} options
 * @returns {HTMLElement}
 */
function createEl(tag, options) {
  options = options || {};
  const el = document.createElement(tag);
  if (options.id) el.id = options.id;
  if (options.className) el.className = options.className;
  if (options.text !== undefined) el.textContent = options.text;
  if (options.attrs) {
    Object.keys(options.attrs).forEach(function (name) {
      el.setAttribute(name, options.attrs[name]);
    });
  }
  return el;
}

/* ------------------------------ Icons -------------------------------- */
/*
 * Inline SVG icon set in the Lucide style (24×24, stroke = currentColor).
 * Keeps the whole UI emoji-free with no external dependency.
 */
const ICONS = {
  "file-text":
    '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/>',
  folder:
    '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  "folder-code":
    '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="m10 13-2 2 2 2"/><path d="m14 17 2-2-2-2"/>',
  "folder-kanban":
    '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="M8 13v3"/><path d="M12 11v5"/><path d="M16 12v2"/>',
  briefcase:
    '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
  "graduation-cap":
    '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  layout:
    '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>',
  server:
    '<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>',
  workflow:
    '<rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/>',
  wrench:
    '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  atom:
    '<circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/>',
  triangle:
    '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>',
  braces:
    '<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>',
  "file-code":
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m10 13-2 2 2 2"/><path d="m14 17 2-2-2-2"/>',
  coffee:
    '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>',
  code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  flame:
    '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  database:
    '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',
  table:
    '<path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/>',
  target:
    '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  pencil:
    '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>',
  repeat:
    '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  columns:
    '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/>',
  "clipboard-list":
    '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
  "git-branch":
    '<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="6" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
  layers:
    '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
  keyboard:
    '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/><path d="M7 16h10"/>',
  building:
    '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
  home:
    '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  mail:
    '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  "square-code": '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  "database-mysql":
    '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',
};

/*
 * Icon colours — official brand colours where the icon represents a
 * technology, otherwise a distinct hue per context.
 */
const ICON_COLORS = {
  /* Apps & folders */
  "file-text": "#4e8cff",
  "folder-code": "#f0b429",
  briefcase: "#4e8cff",
  "graduation-cap": "#9d7cf4",
  "folder-kanban": "#2ec4b6",
  /* Tech categories */
  layout: "#ff7aa2",
  server: "#7f9cf5",
  workflow: "#c792ea",
  wrench: "#ff9f43",
  /* Front-end */
  atom: "#61dafb",
  triangle: "#f0495c",
  braces: "#f7df1e",
  "file-code": "#3178c6",
  /* Back-end */
  coffee: "#e76f00",
  code: "#777bb4",
  flame: "#ff3c28",
  database: "#7b9fff",
  "database-mysql": "#00a8b5",
  /* Conception & Méthodes */
  table: "#4cc9f0",
  target: "#ff7a45",
  pencil: "#f24e1e",
  repeat: "#2f80ed",
  columns: "#56ccf2",
  "clipboard-list": "#2684ff",
  /* Outils */
  "git-branch": "#f05033",
  layers: "#2496ed",
  terminal: "#fcc624",
  "square-code": "#22a0ee",
  keyboard: "#019833",
  /* Projects */
  building: "#45b7d1",
  home: "#36b37e",
  /* Misc */
  mail: "#7aa2f7",
  play: "#36b37e",
};

/**
 * Build an <svg> icon from the ICONS set above.
 * @param {string} name key of the icon in ICONS
 * @param {number} [size] rendered width/height in px (default 16)
 * @returns {SVGElement}
 */
function createIcon(name, size) {
  const px = size || 16;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", String(px));
  svg.setAttribute("height", String(px));
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", ICON_COLORS[name] || "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add("icon");
  svg.innerHTML = ICONS[name] || "";
  return svg;
}

const app = document.getElementById("app");


/* --------------------------- Portfolio data -------------------------- */
/* Content taken from Ziyad Cheto's CV. */
const PORTFOLIO = {
  profile: {
    name: "Ziyad Cheto",
    initials: "ZC",
    title: "Développeur Web Full-Stack",
    tagline: "React · Laravel · PHP",
    email: "chetoziyad@gmail.com",
  },
  experience: [
    {
      role: "Stage de développement Full-Stack",
      company: "École Scolaire Nouhaila",
      location: "Casablanca",
      period: "Mai — Juillet 2026",
      summary:
        "Stage full-stack au sein d'une école : de la conception à la mise en place d'une plateforme de communication interne.",
      achievements: [
        "Conception et développement d'une plateforme de communication interne.",
        "Prise en charge du projet de bout en bout, du front-end au back-end.",
      ],
      stack: ["React.js", "PHP", "Laravel", "MySQL"],
    },
    {
      role: "Stage de développement front-end",
      company: "Ministère de l'Éducation nationale",
      location: "Rabat",
      period: "Février — Avril 2024",
      summary:
        "Stage front-end sur un projet de site web dédié à la gestion des stagiaires.",
      achievements: [
        "Responsable du côté front-end d'un projet de site web de gestion des stagiaires.",
      ],
      stack: ["React.js", "JavaScript", "TypeScript"],
    },
  ],
  education: [
    {
      degree: "Développement web Full-Stack",
      school: "YouCode (UM6P)",
      period: "2025 — en cours",
      honors: "En cours",
      summary: "Formation intensive en développement web Full-Stack.",
      courses: ["React.js", "TypeScript", "PHP (POO)", "Laravel", "Docker", "Scrum / Kanban"],
      thesis: null,
    },
    {
      degree: "Technicien Spécialisé en Développement Informatique",
      school: "Miage Temara",
      period: "2024",
      honors: null,
      summary: "Diplôme de technicien spécialisé en développement informatique.",
      courses: ["UML / ERD", "Bases de données", "PHP (POO)", "JavaScript"],
      thesis: null,
    },
    {
      degree: "Baccalauréat — Sciences Physiques",
      school: "Groupe Scolaire GHAZA Privé",
      period: "2022",
      honors: null,
      summary: "Baccalauréat option Sciences Physiques.",
      courses: [],
      thesis: null,
    },
  ],
  projects: [
    {
      name: "SchoolWay",
      icon: "building",
      period: "",
      description:
        "Application web de gestion scolaire développée avec Laravel. Elle facilite la gestion des notes, des devoirs et de l'assiduité des élèves.",
      highlights: [
        "Gestion des notes des élèves.",
        "Suivi des devoirs.",
        "Suivi de l'assiduité.",
      ],
      stack: ["Laravel", "PHP", "MySQL"],
      links: { repo: "https://github.com/ZiyadCh/SchoolWay" },
    },
    {
      name: "EasyColoc",
      icon: "home",
      period: "",
      description:
        "Application web développée avec Laravel, inspirée du concept de Tricount, conçue pour simplifier la gestion des dépenses en colocation.",
      highlights: [
        "Suivi et partage des dépenses entre colocataires.",
        "Inspirée du concept de Tricount.",
      ],
      stack: ["Laravel", "PHP", "MySQL"],
      links: { repo: "https://github.com/ZiyadCh/EasyColoc" },
    },
  ],
  languages: [
    { name: "Arabe", level: "Langue maternelle" },
    { name: "Anglais", level: "B2" },
    { name: "Français", level: "B1" },
  ],
  technologies: [
    /* Front-end */
    { name: "React.js", icon: "atom" },
    { name: "Angular", icon: "triangle" },
    { name: "JavaScript", icon: "braces" },
    { name: "TypeScript", icon: "file-code" },
    /* Back-end */
    { name: "Java (Jakarta EE · Spring Boot)", icon: "coffee" },
    { name: "PHP (POO)", icon: "code" },
    { name: "Laravel", icon: "flame" },
    { name: "PostgreSQL", icon: "database" },
    { name: "MySQL / MariaDB", icon: "database-mysql" },
    /* Conception & Méthodes */
    { name: "UML", icon: "workflow" },
    { name: "ERD", icon: "table" },
    { name: "Use case", icon: "target" },
    { name: "Figma", icon: "pencil" },
    { name: "Scrum", icon: "repeat" },
    { name: "Kanban", icon: "columns" },
    { name: "JIRA / Trello", icon: "clipboard-list" },
    /* Outils */
    { name: "Git / GitHub", icon: "git-branch" },
    { name: "Docker", icon: "layers" },
    { name: "Linux", icon: "terminal" },
    { name: "VS Code", icon: "square-code" },
    { name: "Vim", icon: "keyboard" },
  ],
};

/* ----------------------------- Desktop ------------------------------- */

const desktop = createEl("div", { id: "desktop", className: "desktop" });
const iconsLayer = createEl("div", { className: "desktop-icons" });

/* ----------------------------- Taskbar ------------------------------- */

const taskbar = createEl("div", { id: "taskbar", className: "taskbar" });

const startButton = createEl("button", {
  className: "start-button",
  attrs: { type: "button", "aria-haspopup": "true", "aria-expanded": "false" },
});
startButton.appendChild(createEl("span", { className: "start-logo" }));
startButton.appendChild(createEl("span", { text: "Start" }));

const startMenu = createEl("div", { className: "start-menu is-hidden", id: "start-menu" });

const taskButtons = createEl("div", { className: "task-buttons", id: "task-buttons" });

const tray = createEl("div", { className: "tray" });
const clock = createEl("div", { className: "clock", id: "clock" });
const clockTime = createEl("span", { text: "--:--" });
const clockDate = createEl("span", { className: "date", text: "" });
clock.appendChild(clockTime);
clock.appendChild(clockDate);
tray.appendChild(clock);

taskbar.appendChild(startButton);
taskbar.appendChild(taskButtons);
taskbar.appendChild(tray);
taskbar.appendChild(startMenu);

/* ------------------------------ Apps --------------------------------- */
/* Classic app windows (one instance per app); folders live in FOLDERS. */

const APPS = {
  notepad: {
    id: "notepad",
    label: "Notepad",
    icon: "file-text",
    title: "Notepad — welcome.txt",
    width: 560,
    height: 380,
    status: ["welcome.txt", "UTF-8  •  Plain text"],
    buildContent: buildNotepadContent,
  },
};

/* Folder apps — each opens in its own window; all share one sidebar. */
const FOLDERS = {
  technologies: {
    id: "technologies",
    label: "Technologies",
    icon: "folder-code",
    title: "Technologies",
    // Status bar is built inside buildTechnologiesContent.
    buildContent: buildTechnologiesContent,
  },
  experience: {
    id: "experience",
    label: "Experience",
    icon: "briefcase",
    title: "Experience",
    status: [PORTFOLIO.experience.length + " positions", "Career history"],
    buildContent: buildExperienceContent,
  },
  education: {
    id: "education",
    label: "Education",
    icon: "graduation-cap",
    title: "Education",
    status: [PORTFOLIO.education.length + " degrees", "Academic background"],
    buildContent: buildEducationContent,
  },
  projects: {
    id: "projects",
    label: "Projects",
    icon: "folder-kanban",
    title: "Projects",
    status: [PORTFOLIO.projects.length + " projects", "Selected work"],
    buildContent: buildProjectsContent,
  },
};

const FOLDER_ORDER = ["technologies", "experience", "education", "projects"];
const FOLDER_WIN_SIZE = { width: 840, height: 560 };

/** Open an app window or a folder window. */
function launch(id) {
  if (APPS[id]) openApp(id);
  else openFolder(id);
}

/* Desktop icon configuration (single click selects, double click / Enter opens). */
const DESKTOP_APPS = FOLDER_ORDER.map(function (id) {
  return { appId: id, icon: FOLDERS[id].icon, label: FOLDERS[id].label };
});

/* --------------------------- Windows --------------------------------- */

const windows = new Map();
let zCounter = 10;
let cascadeIndex = 0;
let focusedWindow = null;

function newWindowRecord(id) {
  return {
    id: id,
    el: null,
    taskButton: null,
    taskIconEl: null,
    taskLabelEl: null,
    titleIconEl: null,
    titleTextEl: null,
    isMinimized: false,
    savedRect: null,
  };
}

function openApp(appId) {
  const def = APPS[appId];
  if (!def) return;

  const existing = windows.get(appId);
  if (existing) {
    if (existing.isMinimized) restoreWindow(existing);
    else focusWindow(existing);
    return;
  }

  const winState = newWindowRecord(appId);
  mountWindow(winState, {
    icon: def.icon,
    title: def.title,
    label: def.label,
    content: buildAppContent(def),
    width: def.width,
    height: def.height,
  });
}

/* Folder apps each open in their own window; the sidebar jumps between them. */
function openFolder(folderId) {
  const def = FOLDERS[folderId];
  if (!def) return;

  const existing = windows.get(folderId);
  if (existing) {
    if (existing.isMinimized) restoreWindow(existing);
    else focusWindow(existing);
    return;
  }

  const winState = newWindowRecord(folderId);
  mountWindow(winState, {
    icon: def.icon,
    title: def.title,
    label: def.label,
    content: buildAppContent(def),
    width: FOLDER_WIN_SIZE.width,
    height: FOLDER_WIN_SIZE.height,
  });
}

/** Build an app/folder content element and append its status bar (if any). */
function buildAppContent(def) {
  const content = def.buildContent();
  if (def.status) {
    const statusBar = createEl("div", { className: "status-bar" });
    statusBar.appendChild(createEl("span", { text: def.status[0] }));
    statusBar.appendChild(createEl("span", { text: def.status[1] }));
    content.appendChild(statusBar);
  }
  return content;
}

function mountWindow(winState, opts) {
  winState.el = buildWindow(winState, opts);
  placeWindow(winState.el, opts);
  desktop.appendChild(winState.el);
  windows.set(winState.id, winState);
  createTaskButton(winState, opts);
  focusWindow(winState);
}

function placeWindow(win, size) {
  // Clamp to the desktop so windows stay usable on small screens.
  const width = Math.min(size.width, Math.max(280, desktop.clientWidth - 24));
  const height = Math.min(size.height, Math.max(180, desktop.clientHeight - 24));
  win.style.width = width + "px";
  win.style.height = height + "px";

  const offset = (cascadeIndex++ % 5) * 30;
  const maxLeft = Math.max(0, desktop.clientWidth - width);
  const maxTop = Math.max(0, desktop.clientHeight - height);
  win.style.left = Math.min(110 + offset, maxLeft) + "px";
  win.style.top = Math.min(46 + offset, maxTop) + "px";
}

function buildWindow(winState, opts) {
  const win = createEl("div", { id: "window-" + winState.id, className: "window" });

  /* Title bar (drag handle) */
  const titleBar = createEl("div", { className: "title-bar" });
  winState.titleIconEl = createIcon(opts.icon, 15);
  winState.titleIconEl.classList.add("title-icon");
  winState.titleTextEl = createEl("span", { className: "title-text", text: opts.title });
  titleBar.appendChild(winState.titleIconEl);
  titleBar.appendChild(winState.titleTextEl);

  const controls = createEl("div", { className: "window-controls" });
  const btnMin = createEl("button", {
    className: "win-btn win-minimize",
    text: "–",
    attrs: { type: "button", title: "Minimize", "aria-label": "Minimize" },
  });
  const btnMax = createEl("button", {
    className: "win-btn win-maximize",
    text: "□",
    attrs: { type: "button", title: "Maximize", "aria-label": "Maximize" },
  });
  const btnClose = createEl("button", {
    className: "win-btn win-close",
    text: "✕",
    attrs: { type: "button", title: "Close", "aria-label": "Close" },
  });
  controls.appendChild(btnMin);
  controls.appendChild(btnMax);
  controls.appendChild(btnClose);
  titleBar.appendChild(controls);

  win.appendChild(titleBar);
  win.appendChild(opts.content);

  /* Behaviour */
  btnMin.addEventListener("click", function () {
    minimizeWindow(winState);
  });

  btnMax.addEventListener("click", function () {
    toggleMaximize(winState);
  });

  btnClose.addEventListener("click", function () {
    closeWindow(winState);
  });

  titleBar.addEventListener("dblclick", function (e) {
    if (e.target.closest(".win-btn")) return;
    toggleMaximize(winState);
  });

  titleBar.addEventListener("mousedown", function (e) {
    startDrag(e, winState);
  });

  win.addEventListener("mousedown", function () {
    focusWindow(winState);
  });

  return win;
}

/* ---------------------------- Dragging ------------------------------- */

let dragState = null;

function startDrag(e, winState) {
  if (e.button !== 0) return; // left button only
  if (e.target.closest(".win-btn")) return; // don't drag from control buttons
  if (winState.el.classList.contains("is-maximized")) return;

  focusWindow(winState);
  dragState = {
    winState: winState,
    offsetX: e.clientX - winState.el.offsetLeft,
    offsetY: e.clientY - winState.el.offsetTop,
  };

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
  e.preventDefault();
}

function onDrag(e) {
  if (!dragState) return;

  const bounds = desktop.getBoundingClientRect();
  const win = dragState.winState.el;

  let x = e.clientX - bounds.left - dragState.offsetX;
  let y = e.clientY - bounds.top - dragState.offsetY;

  // Clamp so the window stays inside the desktop area
  x = Math.max(0, Math.min(x, desktop.clientWidth - win.offsetWidth));
  y = Math.max(0, Math.min(y, desktop.clientHeight - win.offsetHeight));

  win.style.left = x + "px";
  win.style.top = y + "px";
}

function stopDrag() {
  dragState = null;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
}

/* --------------------- Window state management ----------------------- */

function focusWindow(winState) {
  if (!winState.el || !winState.el.isConnected) return;
  if (focusedWindow && focusedWindow !== winState) syncTaskButton(focusedWindow);
  focusedWindow = winState;
  winState.el.style.zIndex = String(++zCounter);
  syncTaskButton(winState);
}

function minimizeWindow(winState) {
  winState.isMinimized = true;
  winState.el.classList.add("is-hidden");
  syncTaskButton(winState);
}

function restoreWindow(winState) {
  winState.isMinimized = false;
  winState.el.classList.remove("is-hidden");
  focusWindow(winState);
}

function toggleMaximize(winState) {
  const win = winState.el;

  if (win.classList.contains("is-maximized")) {
    const rect = winState.savedRect || { left: "140px", top: "60px", width: "", height: "" };
    win.classList.remove("is-maximized");
    win.style.left = rect.left;
    win.style.top = rect.top;
    win.style.width = rect.width;
    win.style.height = rect.height;
  } else {
    winState.savedRect = {
      left: win.style.left,
      top: win.style.top,
      width: win.style.width,
      height: win.style.height,
    };
    win.classList.add("is-maximized");
    win.style.left = "0";
    win.style.top = "0";
    win.style.width = "100%";
    win.style.height = "100%";
  }
  focusWindow(winState);
}

function closeWindow(winState) {
  winState.el.remove();
  windows.delete(winState.id);

  if (focusedWindow === winState) {
    focusedWindow = null;
    focusTopmostWindow();
  }
  syncTaskButton(winState);
}

function focusTopmostWindow() {
  let top = null;
  let topZ = -1;
  windows.forEach(function (w) {
    if (w.isMinimized || !w.el.isConnected) return;
    const z = parseInt(w.el.style.zIndex || "10", 10);
    if (z > topZ) {
      topZ = z;
      top = w;
    }
  });
  if (top) focusWindow(top);
}

/* ------------------------ Taskbar integration ------------------------ */

function createTaskButton(winState, opts) {
  const btn = createEl("button", {
    className: "task-button",
    attrs: { type: "button", title: opts.label },
  });
  winState.taskIconEl = createIcon(opts.icon, 15);
  winState.taskLabelEl = createEl("span", { text: opts.label });
  btn.appendChild(winState.taskIconEl);
  btn.appendChild(winState.taskLabelEl);

  btn.addEventListener("click", function () {
    if (winState.isMinimized) {
      restoreWindow(winState);
    } else if (focusedWindow !== winState) {
      focusWindow(winState);
    } else {
      // Clicking the taskbar button of the focused window minimizes it
      minimizeWindow(winState);
    }
  });

  winState.taskButton = btn;
  taskButtons.appendChild(btn);
  syncTaskButton(winState);
}

function syncTaskButton(winState) {
  const btn = winState.taskButton;
  if (!btn) return;

  if (!windows.has(winState.id)) {
    btn.remove();
    winState.taskButton = null;
    return;
  }

  btn.classList.toggle("is-active", !winState.isMinimized && focusedWindow === winState);
  btn.classList.toggle("is-minimized", winState.isMinimized);
}

/* --------------------------- Start menu (CV) -------------------------- */

function menuHeader(text) {
  return createEl("div", { className: "menu-header", text: text });
}

function cvEntry(title, subtitle, period, highlights) {
  const entry = createEl("div", { className: "cv-entry" });

  const head = createEl("div", { className: "cv-entry-head" });
  head.appendChild(createEl("span", { className: "cv-entry-title", text: title }));
  if (period) head.appendChild(createEl("span", { className: "cv-entry-period", text: period }));
  entry.appendChild(head);

  if (subtitle) entry.appendChild(createEl("div", { className: "cv-entry-sub", text: subtitle }));

  if (highlights && highlights.length) {
    const list = createEl("ul", { className: "cv-entry-list" });
    highlights.forEach(function (line) {
      list.appendChild(createEl("li", { text: line }));
    });
    entry.appendChild(list);
  }
  return entry;
}

function appMenuItem(def) {
  const item = createEl("button", {
    className: "menu-item",
    attrs: { type: "button" },
  });
  item.appendChild(createIcon(def.icon, 17));
  item.appendChild(createEl("span", { text: def.label }));
  item.addEventListener("click", function () {
    launch(def.id);
    toggleStartMenu(false);
  });
  return item;
}

function buildStartMenu() {
  const profile = PORTFOLIO.profile;

  /* Profile header */
  const header = createEl("div", { className: "cv-header" });
  const avatar = createEl("img", {
    className: "cv-avatar",
    attrs: { src: "pfp.jpg", alt: profile.name },
  });
  header.appendChild(avatar);
  const headText = createEl("div", { className: "cv-head-text" });
  headText.appendChild(createEl("div", { className: "cv-name", text: profile.name }));
  headText.appendChild(createEl("div", { className: "cv-role", text: profile.title }));
  headText.appendChild(createEl("div", { className: "cv-tagline", text: profile.tagline }));
  header.appendChild(headText);
  startMenu.appendChild(header);

  /* Applications */
  startMenu.appendChild(menuHeader("Applications"));
  Object.keys(APPS).forEach(function (id) {
    startMenu.appendChild(appMenuItem(APPS[id]));
  });
  FOLDER_ORDER.forEach(function (id) {
    startMenu.appendChild(appMenuItem(FOLDERS[id]));
  });

  /* Experience */
  startMenu.appendChild(menuHeader("Experience"));
  PORTFOLIO.experience.forEach(function (job) {
    startMenu.appendChild(cvEntry(job.role, job.company, job.period, job.achievements.slice(0, 2)));
  });

  /* Education */
  startMenu.appendChild(menuHeader("Education"));
  PORTFOLIO.education.forEach(function (entry) {
    startMenu.appendChild(cvEntry(entry.degree, entry.school, entry.period, null));
  });

  /* Languages */
  startMenu.appendChild(menuHeader("Languages"));
  const langList = createEl("div", { className: "lang-list" });
  PORTFOLIO.languages.forEach(function (lang) {
    const chip = createEl("div", { className: "lang-chip" });
    chip.appendChild(createEl("span", { className: "lang-name", text: lang.name }));
    chip.appendChild(createEl("span", { className: "lang-level", text: lang.level }));
    langList.appendChild(chip);
  });
  startMenu.appendChild(langList);

  /* Contact footer */
  startMenu.appendChild(
    createEl("a", {
      className: "cv-footer",
      attrs: { href: "mailto:" + profile.email },
    })
  );
  const footer = startMenu.lastChild;
  footer.appendChild(createIcon("mail", 14));
  footer.appendChild(createEl("span", { text: profile.email }));
}

function toggleStartMenu(force) {
  const shouldOpen =
    typeof force === "boolean" ? force : startMenu.classList.contains("is-hidden");

  startMenu.classList.toggle("is-hidden", !shouldOpen);
  startButton.classList.toggle("is-open", shouldOpen);
  startButton.setAttribute("aria-expanded", String(shouldOpen));
}

startButton.addEventListener("click", function (e) {
  e.stopPropagation();
  toggleStartMenu();
});

document.addEventListener("click", function (e) {
  if (startMenu.classList.contains("is-hidden")) return;
  if (e.target.closest("#start-menu") || e.target.closest(".start-button")) return;
  toggleStartMenu(false);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") toggleStartMenu(false);
});

/* -------------------------- Desktop icons ---------------------------- */

let lastIconTap = 0;

function selectDesktopIcon(icon) {
  Array.prototype.forEach.call(iconsLayer.children, function (el) {
    el.classList.toggle("is-selected", el === icon);
  });
}

function buildDesktopIcons() {
  DESKTOP_APPS.forEach(function (item) {
    const icon = createEl("button", {
      className: "desktop-icon",
      attrs: { type: "button", title: "Open " + item.label },
    });
    icon.appendChild(createIcon(item.icon, 34));
    icon.lastChild.classList.add("icon-glyph");
    icon.appendChild(createEl("span", { className: "icon-label", text: item.label }));

    icon.addEventListener("click", function (e) {
      e.stopPropagation();
      selectDesktopIcon(icon);

      /* Two quick clicks (mouse double-click or touch double-tap) open the app. */
      const now = Date.now();
      if (now - lastIconTap < 400) {
        lastIconTap = 0;
        launch(item.appId);
      } else {
        lastIconTap = now;
      }
    });

    icon.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        launch(item.appId);
      }
    });

    iconsLayer.appendChild(icon);
  });
}

desktop.addEventListener("click", function (e) {
  if (!e.target.closest(".desktop-icon")) selectDesktopIcon(null);
});

/* --------------------------- App contents ---------------------------- */

function buildNotepadContent() {
  const content = createEl("div", { className: "window-content" });
  const textarea = createEl("textarea", {
    attrs: { spellcheck: "false", "aria-label": "Document text" },
  });
  textarea.value =
    "Welcome to my portfolio desktop!\n\n" +
    "- Double-click the Technologies folder on the desktop to explore my stack.\n" +
    "- Click Start to open my CV: experience, education and languages.\n" +
    "- Drag windows by the title bar. Use – to minimize, □ to maximize, ✕ to close.\n" +
    "- Re-open apps any time from the Start menu or the taskbar.\n" +
    "- Double-click a title bar to toggle maximize.\n";
  content.appendChild(textarea);
  return content;
}

/* Tracks the last opened tech category so navigation back restores it. */
function folderCount(folderId) {
  if (folderId === "technologies") return PORTFOLIO.technologies.length;
  if (folderId === "experience") return PORTFOLIO.experience.length;
  if (folderId === "education") return PORTFOLIO.education.length;
  return PORTFOLIO.projects.length;
}

/**
 * Sidebar shared by every folder window: lists all desktop folders and
 * opens the clicked one in its own window.
 */
function buildFolderSidebar(activeFolderId) {
  const nav = createEl("nav", {
    className: "folder-sidebar",
    attrs: { "aria-label": "Folders" },
  });
  nav.appendChild(createEl("div", { className: "side-heading", text: "Folders" }));

  FOLDER_ORDER.forEach(function (folderId) {
    const def = FOLDERS[folderId];
    const btn = createEl("button", {
      className: "side-item" + (folderId === activeFolderId ? " is-active" : ""),
      attrs: { type: "button", "data-folder-id": folderId, title: def.label },
    });
    btn.appendChild(createIcon(def.icon, 15));
    btn.lastChild.classList.add("side-icon");
    btn.appendChild(createEl("span", { className: "side-label", text: def.label }));
    btn.appendChild(createEl("span", { className: "side-count", text: String(folderCount(folderId)) }));
    btn.addEventListener("click", function () {
      openFolder(folderId);
    });
    nav.appendChild(btn);
  });

  return nav;
}

function techCard(tech) {
  const card = createEl("div", { className: "tech-card", attrs: { title: tech.name } });
  card.appendChild(createIcon(tech.icon, 22));
  card.lastChild.classList.add("tech-icon");

  const info = createEl("div", { className: "tech-info" });
  info.appendChild(createEl("span", { className: "tech-name", text: tech.name }));

  card.appendChild(info);
  return card;
}

function buildTechnologiesContent() {
  const content = createEl("div", { className: "window-content" });
  const scroll = createEl("div", { className: "tech-scroll" });

  const intro = createEl("div", { className: "tech-intro" });
  intro.appendChild(createEl("div", { className: "tech-intro-title", text: "Tech Stack" }));
  intro.appendChild(
    createEl("div", {
      className: "tech-intro-blurb",
      text: "Les technologies que j'utilise au quotidien — front-end, back-end, bases de données et outillage.",
    })
  );
  scroll.appendChild(intro);

  const grid = createEl("div", { className: "tech-grid" });
  PORTFOLIO.technologies.forEach(function (tech) {
    grid.appendChild(techCard(tech));
  });
  scroll.appendChild(grid);
  content.appendChild(scroll);

  const status = createEl("div", { className: "status-bar" });
  status.appendChild(
    createEl("span", { text: PORTFOLIO.technologies.length + " technologies" })
  );
  status.appendChild(createEl("span", { text: "Full stack" }));
  content.appendChild(status);
  return content;
}

/* ------------------------ Detail window helpers ------------------------ */

/**
 * Shell used by Experience / Education / Projects: shared folder sidebar on
 * the left, scrollable detail content on the right.
 */
function buildDetailShell(folderId) {
  const content = createEl("div", { className: "window-content" });
  const layout = createEl("div", { className: "folder-layout" });
  layout.appendChild(buildFolderSidebar(folderId));

  const panel = createEl("div", { className: "folder-panel" });
  const scroll = createEl("div", { className: "detail-scroll" });
  panel.appendChild(scroll);

  layout.appendChild(panel);
  content.appendChild(layout);
  return { content: content, scroll: scroll };
}

function detailHero(title, text) {
  const hero = createEl("div", { className: "detail-hero" });
  hero.appendChild(createEl("div", { className: "detail-hero-title", text: title }));
  hero.appendChild(createEl("div", { className: "detail-hero-text", text: text }));
  return hero;
}

function chipRow(items) {
  const row = createEl("div", { className: "chip-row" });
  (items || []).forEach(function (item) {
    row.appendChild(createEl("span", { className: "chip", text: item }));
  });
  return row;
}

function bulletList(items) {
  const list = createEl("ul", { className: "entry-list" });
  (items || []).forEach(function (line) {
    list.appendChild(createEl("li", { text: line }));
  });
  return list;
}

function buildExperienceContent() {
  const shell = buildDetailShell("experience");
  const scroll = shell.scroll;

  const companies = PORTFOLIO.experience.filter(function (job, i, all) {
    return (
      all.findIndex(function (j) {
        return j.company === job.company;
      }) === i
    );
  }).length;

  scroll.appendChild(
    detailHero(
      "Career so far",
      PORTFOLIO.experience.length +
      " positions across " +
      companies +
      " companies — the expanded version of the summary shown in the Start menu."
    )
  );

  PORTFOLIO.experience.forEach(function (job) {
    const article = createEl("article", { className: "detail-entry" });

    const top = createEl("div", { className: "entry-top" });
    top.appendChild(createEl("div", { className: "entry-title", text: job.role }));
    top.appendChild(createEl("span", { className: "entry-period", text: job.period }));
    article.appendChild(top);

    article.appendChild(
      createEl("div", { className: "entry-sub", text: job.company + " · " + job.location })
    );
    article.appendChild(createEl("p", { className: "entry-text", text: job.summary }));

    article.appendChild(createEl("div", { className: "entry-sub-title", text: "Key achievements" }));
    article.appendChild(bulletList(job.achievements));

    article.appendChild(createEl("div", { className: "entry-sub-title", text: "Stack" }));
    article.appendChild(chipRow(job.stack));

    scroll.appendChild(article);
  });

  return shell.content;
}

function buildEducationContent() {
  const shell = buildDetailShell("education");
  const scroll = shell.scroll;

  scroll.appendChild(
    detailHero(
      "Academic background",
      PORTFOLIO.education.length +
      " degrees with coursework, honours and thesis details — beyond the short entry in the Start menu."
    )
  );

  PORTFOLIO.education.forEach(function (entry) {
    const article = createEl("article", { className: "detail-entry" });

    const top = createEl("div", { className: "entry-top" });
    top.appendChild(createEl("div", { className: "entry-title", text: entry.degree }));
    top.appendChild(createEl("span", { className: "entry-period", text: entry.period }));
    article.appendChild(top);

    const subRow = createEl("div", { className: "entry-sub" });
    subRow.appendChild(createEl("span", { text: entry.school }));
    if (entry.honors) subRow.appendChild(createEl("span", { className: "badge", text: entry.honors }));
    article.appendChild(subRow);

    article.appendChild(createEl("p", { className: "entry-text", text: entry.summary }));

    if (entry.courses && entry.courses.length) {
      article.appendChild(createEl("div", { className: "entry-sub-title", text: "Coursework" }));
      article.appendChild(chipRow(entry.courses));
    }

    if (entry.thesis) {
      article.appendChild(createEl("div", { className: "entry-sub-title", text: "Thesis" }));
      article.appendChild(createEl("p", { className: "entry-text", text: entry.thesis }));
    }

    scroll.appendChild(article);
  });

  return shell.content;
}

function buildProjectsContent() {
  const shell = buildDetailShell("projects");
  const scroll = shell.scroll;

  scroll.appendChild(
    detailHero(
      "Selected projects",
      PORTFOLIO.projects.length +
      " projects with descriptions, tech stacks and links — more detail than anywhere else on the desktop."
    )
  );

  const grid = createEl("div", { className: "project-grid" });

  PORTFOLIO.projects.forEach(function (project) {
    const hasLink = project.links && (project.links.repo || project.links.demo);
    const card = createEl(hasLink ? "a" : "article", { className: "project-card" });
    if (hasLink) {
      card.setAttribute("href", project.links.repo || project.links.demo);
      card.setAttribute("target", "_blank");
      card.setAttribute("rel", "noopener noreferrer");
      card.classList.add("is-clickable");
    }

    const top = createEl("div", { className: "project-top" });
    const name = createEl("div", { className: "project-name" });
    name.appendChild(createIcon(project.icon, 15));
    name.lastChild.classList.add("project-icon");
    name.appendChild(createEl("span", { text: project.name }));
    top.appendChild(name);
    if (project.period) {
      top.appendChild(createEl("span", { className: "project-period", text: project.period }));
    }

    const body = createEl("div", { className: "card-link" });
    body.appendChild(top);
    body.appendChild(createEl("p", { className: "project-desc", text: project.description }));
    body.appendChild(bulletList(project.highlights));
    body.appendChild(chipRow(project.stack));

    const links = createEl("div", { className: "project-links" });
    if (project.links && project.links.demo) {
      const demoLink = createEl("a", {
        className: "project-link",
        attrs: { href: project.links.demo, target: "_blank", rel: "noopener noreferrer" },
      });
      demoLink.appendChild(createIcon("play", 12));
      demoLink.appendChild(createEl("span", { text: "Live demo" }));
      links.appendChild(demoLink);
    }
    if (project.links && project.links.repo) {
      const repoLink = createEl("a", {
        className: "project-link",
        attrs: { href: project.links.repo, target: "_blank", rel: "noopener noreferrer" },
      });
      repoLink.appendChild(createIcon("code", 12));
      repoLink.appendChild(createEl("span", { text: "Source code" }));
      repoLink.addEventListener("click", function (e) {
        e.stopPropagation();
      });
      links.appendChild(repoLink);
    }
    if (links.children.length) body.appendChild(links);

    card.appendChild(body);
    grid.appendChild(card);
  });

  scroll.appendChild(grid);
  return shell.content;
}

/* ------------------------------ Clock -------------------------------- */

function updateClock() {
  const now = new Date();
  clockTime.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  clockDate.textContent = now.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
}

updateClock();
setInterval(updateClock, 1000);

/* --------------------- Keep windows inside the desktop ----------------- */

window.addEventListener("resize", function () {
  windows.forEach(function (winState) {
    const win = winState.el;
    if (!win || !win.isConnected || win.classList.contains("is-maximized")) return;

    const x = Math.max(0, Math.min(win.offsetLeft, desktop.clientWidth - win.offsetWidth));
    const y = Math.max(0, Math.min(win.offsetTop, desktop.clientHeight - win.offsetHeight));
    win.style.left = x + "px";
    win.style.top = y + "px";
  });
});

/* ------------------------------ Boot ---------------------------------- */

buildDesktopIcons();
desktop.appendChild(iconsLayer);
buildStartMenu();

app.appendChild(desktop);
app.appendChild(taskbar);
openApp("notepad");
