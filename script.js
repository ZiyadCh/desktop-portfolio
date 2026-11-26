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
 * Local PNG icons from the Tabler Icons library (MIT), tinted at build time.
 * See icons/README.md and icons/build-icons.py for sources and regeneration.
 */

/**
 * Build an <img> icon from the PNG icon set.
 * @param {string} name file name in icons/ (without the .png extension)
 * @param {number} [size] rendered width/height in px (default 16)
 * @returns {HTMLImageElement}
 */
function createIcon(name, size) {
  const px = size || 16;
  return createEl("img", {
    className: "icon",
    attrs: {
      src: "icons/" + name + ".png",
      alt: "",
      width: String(px),
      height: String(px),
      decoding: "async",
      draggable: "false",
    },
  });
}

/* --------------------------- Language --------------------------------- */
/*
 * The CV data is French and the desktop chrome is English. tr() translates
 * the active language's strings into the other one; everything not listed
 * here (names, brand names, numbers) passes through unchanged.
 */
let currentLang = "fr";

const TRANSLATIONS = {
  en: {
    "Développeur Full-Stack Java / Angular": "Java / Angular Full-Stack Developer",

    "Stage de développement Full-Stack": "Full-Stack Development Internship",
    "École Scolaire Nouhaila": "Nouhaila School",
    "Mai — Juillet 2026": "May — July 2026",
    "Stage full-stack au sein d'une école : de la conception à la mise en place d'une plateforme de communication interne.":
      "Full-stack internship at a school: from design through to delivering an internal communication platform.",
    "Conception et développement d'une plateforme de communication interne.":
      "Designed and developed an internal communication platform.",
    "Prise en charge du projet de bout en bout, du front-end au back-end.":
      "Owned the project end to end, from front-end to back-end.",
    "Stage de développement front-end": "Front-End Development Internship",
    "Ministère de l'Éducation nationale": "Ministry of National Education",
    "Février — Avril 2024": "February — April 2024",
    "Stage front-end sur un projet de site web dédié à la gestion des stagiaires.":
      "Front-end internship on a website project for managing interns.",
    "Responsable du côté front-end d'un projet de site web de gestion des stagiaires.":
      "Owned the front-end of a website project for managing interns.",

    "Développement web Full-Stack": "Full-Stack Web Development",
    "2025 — en cours": "2025 — ongoing",
    "En cours": "Ongoing",
    "Formation intensive en développement web Full-Stack.":
      "Intensive full-stack web development programme.",
    "Technicien Spécialisé en Développement Informatique":
      "Specialised Technician in Software Development",
    "Diplôme de technicien spécialisé en développement informatique.":
      "Diploma as a specialised technician in software development.",
    "Bases de données": "Databases",
    "PHP (POO)": "PHP (OOP)",
    "Baccalauréat — Sciences Physiques": "High School Diploma — Physical Sciences",
    "Groupe Scolaire GHAZA Privé": "GHAZA Private School Group",
    "Baccalauréat option Sciences Physiques.": "High school diploma, physical sciences track.",

    "API REST de covoiturage multi-étapes en Java 17 / Spring Boot : publication de trajets avec arrêts ordonnés, réservation de segments et calcul dynamique des prix.":
      "Multi-stop carpooling REST API in Java 17 / Spring Boot: publish trips with ordered stops, reserve segments and calculate prices dynamically.",
    "Recherche de trajets entre deux arrêts en une seule requête JPQL.":
      "Trip search between two stops in a single JPQL query.",
    "Réservation de segments avec calcul du prix et contrôle des places.":
      "Segment booking with price calculation and seat availability checks.",
    "Erreurs normalisées RFC 9457 (ProblemDetail) et tests JUnit 5 / Mockito.":
      "RFC 9457 standardised errors (ProblemDetail) and JUnit 5 / Mockito tests.",
    "API Java 17 construite avec Spring MVC, Spring Data JPA et Hibernate, avec persistance PostgreSQL et tests JUnit.":
      "Java 17 API built with Spring MVC, Spring Data JPA and Hibernate, with PostgreSQL persistence and JUnit tests.",
    "Architecture en couches controller / service / repository.":
      "Controller / service / repository layered architecture.",
    "Persistance JPA / Hibernate et échanges JSON typés.":
      "JPA / Hibernate persistence and typed JSON exchanges.",
    "Application web de gestion scolaire développée avec Laravel. Elle facilite la gestion des notes, des devoirs et de l'assiduité des élèves.":
      "School management web app built with Laravel. It simplifies handling grades, homework and student attendance.",
    "Gestion des notes des élèves.": "Student grade management.",
    "Suivi des devoirs.": "Homework tracking.",
    "Suivi de l'assiduité.": "Attendance tracking.",
    "Application web développée avec Laravel, inspirée du concept de Tricount, conçue pour simplifier la gestion des dépenses en colocation.":
      "Web app built with Laravel, inspired by Tricount, designed to simplify shared household expense management.",
    "Suivi et partage des dépenses entre colocataires.":
      "Track and split expenses between housemates.",
    "Inspirée du concept de Tricount.": "Inspired by the Tricount concept.",

    "Arabe": "Arabic",
    "Anglais": "English",
    "Français": "French",
    "Langue maternelle": "Native language",
    "Conception & méthodes": "Design & methods",
    "Outils": "Tools",
    "Une stack centrée sur Java / Spring Boot et Angular — complétée par les bases de données et l'outillage du quotidien.":
      "A stack centred on Java / Spring Boot and Angular — backed by databases and everyday tooling.",
  },
  fr: {
    "Start": "Démarrer",
    "Notepad": "Bloc-notes",
    "Notepad — welcome.txt": "Bloc-notes — bienvenue.txt",
    "welcome.txt": "bienvenue.txt",
    "Plain text": "Texte brut",
    "Document text": "Texte du document",
    "Minimize": "Réduire",
    "Maximize": "Agrandir",
    "Close": "Fermer",
    "Open": "Ouvrir",
    "Experience": "Expérience",
    "positions": "expériences",
    "Career history": "Parcours professionnel",
    "Education": "Formation",
    "degrees": "diplômes",
    "Academic background": "Parcours académique",
    "Projects": "Projets",
    "projects": "projets",
    "Selected work": "Réalisations",
    "Languages": "Langues",
    "Folders": "Dossiers",
    "Tech Stack": "Stack technique",
    "item": "élément",
    "items": "éléments",
    "Full stack": "Full stack",
    "Career so far": "Parcours professionnel",
    "Key achievements": "Réalisations clés",
    "Coursework": "Cours",
    "Thesis": "Mémoire",
    "Selected projects": "Projets sélectionnés",
    "Live demo": "Démo en ligne",
    "on GitHub": "sur GitHub",
  },
};

function tr(text) {
  const dict = TRANSLATIONS[currentLang];
  return (dict && Object.prototype.hasOwnProperty.call(dict, text) && dict[text]) || text;
}

const NOTEPAD_TEXT = {
  en:
    "Welcome to my portfolio!\n\n" +
    "Open the folders on the desktop to explore my work.\n" +
    "Double-click a folder to open it.\n",
  fr:
    "Bienvenue sur mon portfolio !\n\n" +
    "Ouvre les dossiers sur le bureau pour découvrir mon travail.\n" +
    "Double-clique sur un dossier pour l'ouvrir.\n",
};

const app = document.getElementById("app");


/* --------------------------- Portfolio data -------------------------- */
/* Content taken from Ziyad Cheto's CV. */
const PORTFOLIO = {
  profile: {
    name: "Ziyad Cheto",
    initials: "ZC",
    title: "Développeur Full-Stack Java / Angular",
    tagline: "Java · Spring Boot · Angular",
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
      name: "DriveSpace",
      icon: "server",
      period: "2026",
      description:
        "API REST de covoiturage multi-étapes en Java 17 / Spring Boot : publication de trajets avec arrêts ordonnés, réservation de segments et calcul dynamique des prix.",
      highlights: [
        "Recherche de trajets entre deux arrêts en une seule requête JPQL.",
        "Réservation de segments avec calcul du prix et contrôle des places.",
        "Erreurs normalisées RFC 9457 (ProblemDetail) et tests JUnit 5 / Mockito.",
      ],
      stack: ["Java 17", "Spring Boot", "Spring Data JPA", "PostgreSQL", "Docker"],
      links: { repo: "https://github.com/ZiyadCh/driveSpace" },
    },
    {
      name: "WeGrow API",
      icon: "workflow",
      period: "",
      description:
        "API Java 17 construite avec Spring MVC, Spring Data JPA et Hibernate, avec persistance PostgreSQL et tests JUnit.",
      highlights: [
        "Architecture en couches controller / service / repository.",
        "Persistance JPA / Hibernate et échanges JSON typés.",
      ],
      stack: ["Java 17", "Spring MVC", "Spring Data JPA", "Hibernate", "PostgreSQL"],
      links: { repo: "https://github.com/ZiyadCh/wegrow-api" },
    },
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
  /* Grouped by section so the Technologies window can show labelled blocks. */
  technologySections: [
    {
      id: "frontend",
      label: "Front-end",
      icon: "layout",
      items: [
        { name: "Angular", icon: "triangle" },
        { name: "TypeScript", icon: "file-code" },
        { name: "JavaScript", icon: "braces" },
        { name: "React.js", icon: "atom" },
      ],
    },
    {
      id: "backend",
      label: "Java & back-end",
      icon: "server",
      items: [
        { name: "Java 17 / Spring Boot", icon: "coffee" },
        { name: "Spring Data JPA / Hibernate", icon: "layers" },
        { name: "PHP (POO)", icon: "code" },
        { name: "Laravel", icon: "flame" },
        { name: "PostgreSQL", icon: "database" },
        { name: "MySQL / MariaDB", icon: "database-mysql" },
      ],
    },
    {
      id: "methods",
      label: "Conception & méthodes",
      icon: "workflow",
      items: [
        { name: "UML", icon: "workflow" },
        { name: "ERD", icon: "table" },
        { name: "Use case", icon: "target" },
        { name: "Figma", icon: "pencil" },
        { name: "Scrum", icon: "repeat" },
        { name: "Kanban", icon: "columns" },
        { name: "JIRA / Trello", icon: "clipboard-list" },
      ],
    },
    {
      id: "tools",
      label: "Outils",
      icon: "wrench",
      items: [
        { name: "Git / GitHub", icon: "git-branch" },
        { name: "Docker", icon: "layers" },
        { name: "Linux", icon: "terminal" },
        { name: "VS Code", icon: "square-code" },
        { name: "Vim", icon: "keyboard" },
      ],
    },
  ],
};

/* Flat list kept for counts; the sections above drive the actual layout. */
const ALL_TECHNOLOGIES = PORTFOLIO.technologySections.reduce(function (all, section) {
  return all.concat(section.items);
}, []);

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

/* ------------------------- Language toggle ---------------------------- */

const langButton = createEl("button", {
  className: "lang-toggle",
  attrs: { type: "button", "aria-label": "Passer en anglais" },
});
const langFr = createEl("span", { className: "lang-code is-active", text: "FR" });
const langEn = createEl("span", { className: "lang-code", text: "EN" });
langButton.appendChild(langFr);
langButton.appendChild(createEl("span", { className: "lang-divider", text: "/" }));
langButton.appendChild(langEn);
desktop.appendChild(langButton);

langButton.addEventListener("click", function () {
  setLanguage(currentLang === "fr" ? "en" : "fr");
});

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
    status: function () {
      return [tr("welcome.txt"), "UTF-8  •  " + tr("Plain text")];
    },
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
    status: function () {
      return [PORTFOLIO.experience.length + " " + tr("positions"), tr("Career history")];
    },
    buildContent: buildExperienceContent,
  },
  education: {
    id: "education",
    label: "Education",
    icon: "graduation-cap",
    title: "Education",
    status: function () {
      return [PORTFOLIO.education.length + " " + tr("degrees"), tr("Academic background")];
    },
    buildContent: buildEducationContent,
  },
  projects: {
    id: "projects",
    label: "Projects",
    icon: "folder-kanban",
    title: "Projects",
    status: function () {
      return [PORTFOLIO.projects.length + " " + tr("projects"), tr("Selected work")];
    },
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
const DESKTOP_APPS = [
  { appId: "notepad", icon: APPS.notepad.icon, label: APPS.notepad.label },
].concat(
  FOLDER_ORDER.map(function (id) {
    return { appId: id, icon: FOLDERS[id].icon, label: FOLDERS[id].label };
  })
);

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
    title: tr(def.title),
    label: tr(def.label),
    content: buildAppContent(def),
    width: def.width,
    height: def.height,
    alignRight: appId === "notepad",
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
    title: tr(def.title),
    label: tr(def.label),
    content: buildAppContent(def),
    width: FOLDER_WIN_SIZE.width,
    height: FOLDER_WIN_SIZE.height,
  });
}

/** Build an app/folder content element and append its status bar (if any). */
function buildAppContent(def) {
  const content = def.buildContent();
  if (def.status) {
    const status = typeof def.status === "function" ? def.status() : def.status;
    const statusBar = createEl("div", { className: "status-bar" });
    statusBar.appendChild(createEl("span", { text: status[0] }));
    statusBar.appendChild(createEl("span", { text: status[1] }));
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
  /* Notepad opens docked to the right; other windows cascade from the left. */
  const left = size.alignRight ? Math.max(0, maxLeft - 24) : Math.min(110 + offset, maxLeft);
  win.style.left = left + "px";
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
    attrs: { type: "button", title: tr("Minimize"), "aria-label": tr("Minimize") },
  });
  const btnMax = createEl("button", {
    className: "win-btn win-maximize",
    text: "□",
    attrs: { type: "button", title: tr("Maximize"), "aria-label": tr("Maximize") },
  });
  const btnClose = createEl("button", {
    className: "win-btn win-close",
    text: "✕",
    attrs: { type: "button", title: tr("Close"), "aria-label": tr("Close") },
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

  titleBar.addEventListener("pointerdown", function (e) {
    startDrag(e, winState);
  });

  win.addEventListener("mousedown", function () {
    focusWindow(winState);
  });

  return win;
}

/* ---------------------------- Dragging ------------------------------- */

let dragState = null;
let dragFrame = 0;
let pendingDragX = 0;
let pendingDragY = 0;

function startDrag(e, winState) {
  if (e.button !== 0) return; // primary button only
  if (e.target.closest(".win-btn")) return; // don't drag from control buttons
  if (winState.el.classList.contains("is-maximized")) return;

  focusWindow(winState);

  const el = winState.el;
  /* Read geometry once per drag instead of on every pointer move. */
  dragState = {
    winState: winState,
    pointerId: e.pointerId,
    startX: e.clientX,
    startY: e.clientY,
    originLeft: el.offsetLeft,
    originTop: el.offsetTop,
    maxX: Math.max(0, desktop.clientWidth - el.offsetWidth),
    maxY: Math.max(0, desktop.clientHeight - el.offsetHeight),
  };
  pendingDragX = dragState.originLeft;
  pendingDragY = dragState.originTop;
  el.classList.add("is-dragging");
}

function onDrag(e) {
  if (!dragState || e.pointerId !== dragState.pointerId) return;

  /* Clamp to the desktop, then coalesce writes into one frame. */
  pendingDragX = Math.max(
    0,
    Math.min(dragState.originLeft + e.clientX - dragState.startX, dragState.maxX)
  );
  pendingDragY = Math.max(
    0,
    Math.min(dragState.originTop + e.clientY - dragState.startY, dragState.maxY)
  );

  if (!dragFrame) dragFrame = requestAnimationFrame(paintDrag);
}

function paintDrag() {
  dragFrame = 0;
  if (!dragState) return;
  const el = dragState.winState.el;
  el.style.transform =
    "translate3d(" +
    (pendingDragX - dragState.originLeft) +
    "px," +
    (pendingDragY - dragState.originTop) +
    "px,0)";
}

function stopDrag(e) {
  if (!dragState || (e && e.pointerId !== dragState.pointerId)) return;
  if (dragFrame) {
    cancelAnimationFrame(dragFrame);
    dragFrame = 0;
  }

  /* Commit the transform to layout once, on release. */
  const el = dragState.winState.el;
  el.style.left = pendingDragX + "px";
  el.style.top = pendingDragY + "px";
  el.style.transform = "";

  /* Drop the no-transition flag only after the committed position is painted. */
  requestAnimationFrame(function () {
    if (!dragState) el.classList.remove("is-dragging");
  });
  dragState = null;
}

/* Registered once; no per-drag listener churn. */
document.addEventListener("pointermove", onDrag, { passive: true });
document.addEventListener("pointerup", stopDrag);
document.addEventListener("pointercancel", stopDrag);

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

function buildStartMenu() {
  const profile = PORTFOLIO.profile;

  /* Profile header */
  const header = createEl("div", { className: "cv-header" });
  const avatar = createEl("img", {
    className: "cv-avatar",
    attrs: {
      src: "pfp.jpg",
      alt: profile.name,
      width: "52",
      height: "52",
      loading: "lazy",
      decoding: "async",
    },
  });
  header.appendChild(avatar);
  const headText = createEl("div", { className: "cv-head-text" });
  headText.appendChild(createEl("div", { className: "cv-name", text: profile.name }));
  headText.appendChild(createEl("div", { className: "cv-role", text: tr(profile.title) }));
  headText.appendChild(createEl("div", { className: "cv-tagline", text: tr(profile.tagline) }));
  header.appendChild(headText);
  startMenu.appendChild(header);

  /* Experience */
  startMenu.appendChild(menuHeader(tr("Experience")));
  PORTFOLIO.experience.forEach(function (job) {
    startMenu.appendChild(
      cvEntry(tr(job.role), tr(job.company), tr(job.period), job.achievements.slice(0, 2).map(tr))
    );
  });

  /* Education */
  startMenu.appendChild(menuHeader(tr("Education")));
  PORTFOLIO.education.forEach(function (entry) {
    startMenu.appendChild(cvEntry(tr(entry.degree), tr(entry.school), tr(entry.period), null));
  });

  /* Languages */
  startMenu.appendChild(menuHeader(tr("Languages")));
  const langList = createEl("div", { className: "lang-list" });
  PORTFOLIO.languages.forEach(function (lang) {
    const chip = createEl("div", { className: "lang-chip" });
    chip.appendChild(createEl("span", { className: "lang-name", text: tr(lang.name) }));
    chip.appendChild(createEl("span", { className: "lang-level", text: tr(lang.level) }));
    langList.appendChild(chip);
  });
  startMenu.appendChild(langList);

  /* Contact links */
  const contacts = createEl("div", { className: "cv-links" });
  [
    { href: "mailto:" + profile.email, icon: "mail", text: profile.email },
    {
      href: "https://www.linkedin.com/in/ziyad-cheto-5b7638328/",
      icon: "linkedin",
      text: "LinkedIn",
    },
    { href: "https://github.com/ZiyadCh", icon: "github", text: "GitHub" },
  ].forEach(function (contact) {
    const attrs = { href: contact.href };
    if (contact.href.indexOf("http") === 0) {
      attrs.target = "_blank";
      attrs.rel = "noopener noreferrer";
    }
    const link = createEl("a", { className: "cv-footer", attrs: attrs });
    link.appendChild(createIcon(contact.icon, 14));
    link.appendChild(createEl("span", { text: contact.text }));
    contacts.appendChild(link);
  });
  startMenu.appendChild(contacts);
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

/* --------------------------- Language swap ----------------------------- */

function syncLangButton() {
  langFr.classList.toggle("is-active", currentLang === "fr");
  langEn.classList.toggle("is-active", currentLang === "en");
  langButton.setAttribute(
    "aria-label",
    currentLang === "fr" ? "Passer en anglais" : "Switch to French"
  );
}

/** Rebuild all text in place, keeping window positions and Notepad edits. */
function setLanguage(lang) {
  if (lang === currentLang) return;
  const previousLang = currentLang;
  currentLang = lang;
  document.documentElement.lang = lang;
  syncLangButton();

  lastClockKey = "";
  updateClock();

  startMenu.textContent = "";
  buildStartMenu();
  iconsLayer.textContent = "";
  buildDesktopIcons();

  windows.forEach(function (winState) {
    const def = APPS[winState.id] || FOLDERS[winState.id];
    if (!def || !winState.el) return;

    winState.titleTextEl.textContent = tr(def.title);
    if (winState.taskLabelEl) winState.taskLabelEl.textContent = tr(def.label);
    if (winState.taskButton) winState.taskButton.title = tr(def.label);

    const oldContent = winState.el.querySelector(".window-content");
    const oldTextarea = oldContent && oldContent.querySelector("textarea");
    /* Keep user edits, but let the untouched welcome text follow the language. */
    const typedText =
      oldTextarea && oldTextarea.value !== NOTEPAD_TEXT[previousLang]
        ? oldTextarea.value
        : null;
    const newContent = buildAppContent(def);
    if (typedText !== null) {
      const textarea = newContent.querySelector("textarea");
      if (textarea) textarea.value = typedText;
    }
    if (oldContent) oldContent.replaceWith(newContent);

    const controlLabels = {
      "win-minimize": "Minimize",
      "win-maximize": "Maximize",
      "win-close": "Close",
    };
    Object.keys(controlLabels).forEach(function (className) {
      const btn = winState.el.querySelector("." + className);
      if (btn) {
        btn.title = tr(controlLabels[className]);
        btn.setAttribute("aria-label", tr(controlLabels[className]));
      }
    });
  });
}

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
      attrs: { type: "button", title: tr("Open") + " " + tr(item.label) },
    });
    icon.appendChild(createIcon(item.icon, 48));
    icon.lastChild.classList.add("icon-glyph");
    icon.appendChild(createEl("span", { className: "icon-label", text: tr(item.label) }));

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
    attrs: { spellcheck: "false", "aria-label": tr("Document text") },
  });
  textarea.value = NOTEPAD_TEXT[currentLang];
  content.appendChild(textarea);
  return content;
}

/* Tracks the last opened tech category so navigation back restores it. */
function folderCount(folderId) {
  if (folderId === "technologies") return ALL_TECHNOLOGIES.length;
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
    attrs: { "aria-label": tr("Folders") },
  });
  nav.appendChild(createEl("div", { className: "side-heading", text: tr("Folders") }));

  FOLDER_ORDER.forEach(function (folderId) {
    const def = FOLDERS[folderId];
    const btn = createEl("button", {
      className: "side-item" + (folderId === activeFolderId ? " is-active" : ""),
      attrs: { type: "button", "data-folder-id": folderId, title: tr(def.label) },
    });
    btn.appendChild(createIcon(def.icon, 15));
    btn.lastChild.classList.add("side-icon");
    btn.appendChild(createEl("span", { className: "side-label", text: tr(def.label) }));
    btn.appendChild(createEl("span", { className: "side-count", text: String(folderCount(folderId)) }));
    btn.addEventListener("click", function () {
      openFolder(folderId);
    });
    nav.appendChild(btn);
  });

  return nav;
}

function techCard(tech) {
  const name = tr(tech.name);
  const card = createEl("div", { className: "tech-card", attrs: { title: name } });
  card.appendChild(createIcon(tech.icon, 22));
  card.lastChild.classList.add("tech-icon");

  const info = createEl("div", { className: "tech-info" });
  info.appendChild(createEl("span", { className: "tech-name", text: name }));

  card.appendChild(info);
  return card;
}

function buildTechnologiesContent() {
  const content = createEl("div", { className: "window-content" });
  const scroll = createEl("div", { className: "tech-scroll" });

  const intro = createEl("div", { className: "tech-intro" });
  intro.appendChild(createEl("div", { className: "tech-intro-title", text: tr("Tech Stack") }));
  intro.appendChild(
    createEl("div", {
      className: "tech-intro-blurb",
      text: tr("Une stack centrée sur Java / Spring Boot et Angular — complétée par les bases de données et l'outillage du quotidien."),
    })
  );
  scroll.appendChild(intro);

  PORTFOLIO.technologySections.forEach(function (section) {
    const block = createEl("section", { className: "tech-section" });

    const head = createEl("div", { className: "tech-section-head" });
    const sectionIcon = createIcon(section.icon, 15);
    sectionIcon.classList.add("tech-section-icon");
    head.appendChild(sectionIcon);
    head.appendChild(createEl("h3", { className: "tech-section-title", text: tr(section.label) }));
    head.appendChild(
      createEl("span", {
        className: "tech-section-count",
        text:
          section.items.length +
          " " +
          tr(section.items.length === 1 ? "item" : "items"),
      })
    );
    block.appendChild(head);

    const grid = createEl("div", { className: "tech-grid" });
    section.items.forEach(function (tech) {
      grid.appendChild(techCard(tech));
    });
    block.appendChild(grid);
    scroll.appendChild(block);
  });
  content.appendChild(scroll);

  const status = createEl("div", { className: "status-bar" });
  status.appendChild(
    createEl("span", {
      text: ALL_TECHNOLOGIES.length + " technologies · " + PORTFOLIO.technologySections.length + " sections",
    })
  );
  status.appendChild(createEl("span", { text: tr("Full stack") }));
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
      tr("Career so far"),
      currentLang === "fr"
        ? PORTFOLIO.experience.length + " expériences chez " + companies +
          " entreprises — la version détaillée du résumé affiché dans le menu Démarrer."
        : PORTFOLIO.experience.length + " positions across " + companies +
          " companies — the expanded version of the summary shown in the Start menu."
    )
  );

  PORTFOLIO.experience.forEach(function (job) {
    const article = createEl("article", { className: "detail-entry" });

    const top = createEl("div", { className: "entry-top" });
    top.appendChild(createEl("div", { className: "entry-title", text: tr(job.role) }));
    top.appendChild(createEl("span", { className: "entry-period", text: tr(job.period) }));
    article.appendChild(top);

    article.appendChild(
      createEl("div", { className: "entry-sub", text: tr(job.company) + " · " + job.location })
    );
    article.appendChild(createEl("p", { className: "entry-text", text: tr(job.summary) }));

    article.appendChild(createEl("div", { className: "entry-sub-title", text: tr("Key achievements") }));
    article.appendChild(bulletList(job.achievements.map(tr)));

    article.appendChild(createEl("div", { className: "entry-sub-title", text: tr("Stack") }));
    article.appendChild(chipRow(job.stack.map(tr)));

    scroll.appendChild(article);
  });

  return shell.content;
}

function buildEducationContent() {
  const shell = buildDetailShell("education");
  const scroll = shell.scroll;

  scroll.appendChild(
    detailHero(
      tr("Academic background"),
      currentLang === "fr"
        ? PORTFOLIO.education.length + " diplômes, avec cours, mentions et mémoire — au-delà de l'entrée courte du menu Démarrer."
        : PORTFOLIO.education.length + " degrees with coursework, honours and thesis details — beyond the short entry in the Start menu."
    )
  );

  PORTFOLIO.education.forEach(function (entry) {
    const article = createEl("article", { className: "detail-entry" });

    const top = createEl("div", { className: "entry-top" });
    top.appendChild(createEl("div", { className: "entry-title", text: tr(entry.degree) }));
    top.appendChild(createEl("span", { className: "entry-period", text: tr(entry.period) }));
    article.appendChild(top);

    const subRow = createEl("div", { className: "entry-sub" });
    subRow.appendChild(createEl("span", { text: tr(entry.school) }));
    if (entry.honors) subRow.appendChild(createEl("span", { className: "badge", text: tr(entry.honors) }));
    article.appendChild(subRow);

    article.appendChild(createEl("p", { className: "entry-text", text: tr(entry.summary) }));

    if (entry.courses && entry.courses.length) {
      article.appendChild(createEl("div", { className: "entry-sub-title", text: tr("Coursework") }));
      article.appendChild(chipRow(entry.courses.map(tr)));
    }

    if (entry.thesis) {
      article.appendChild(createEl("div", { className: "entry-sub-title", text: tr("Thesis") }));
      article.appendChild(createEl("p", { className: "entry-text", text: tr(entry.thesis) }));
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
      tr("Selected projects"),
      currentLang === "fr"
        ? PORTFOLIO.projects.length + " projets avec descriptions, stacks techniques et liens — plus de détails que partout ailleurs sur le bureau."
        : PORTFOLIO.projects.length + " projects with descriptions, tech stacks and links — more detail than anywhere else on the desktop."
    )
  );

  const grid = createEl("div", { className: "project-grid" });

  PORTFOLIO.projects.forEach(function (project) {
    const links = project.links || {};
    const primaryUrl = links.repo || links.demo || "";
    const card = createEl("article", { className: "project-card" });

    /* One overlay link makes the whole card clickable without nesting anchors. */
    if (primaryUrl) {
      card.classList.add("is-clickable");
      card.appendChild(
        createEl("a", {
          className: "project-overlay-link",
          attrs: {
            href: primaryUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": links.repo
              ? tr("Open") + " " + project.name + " " + tr("on GitHub")
              : tr("Open") + " " + project.name,
          },
        })
      );
    }

    const top = createEl("div", { className: "project-top" });
    const name = createEl("div", { className: "project-name" });
    name.appendChild(createIcon(project.icon, 15));
    name.lastChild.classList.add("project-icon");
    name.appendChild(createEl("span", { text: project.name }));
    top.appendChild(name);
    if (project.period) {
      top.appendChild(createEl("span", { className: "project-period", text: tr(project.period) }));
    }

    const body = createEl("div", { className: "card-link" });
    body.appendChild(top);
    body.appendChild(createEl("p", { className: "project-desc", text: tr(project.description) }));
    body.appendChild(bulletList(project.highlights.map(tr)));
    body.appendChild(chipRow(project.stack.map(tr)));

    const linksRow = createEl("div", { className: "project-links" });
    if (links.demo) {
      const demoLink = createEl("a", {
        className: "project-link",
        attrs: { href: links.demo, target: "_blank", rel: "noopener noreferrer" },
      });
      demoLink.appendChild(createIcon("play", 12));
      demoLink.appendChild(createEl("span", { text: tr("Live demo") }));
      linksRow.appendChild(demoLink);
    }
    if (links.repo) {
      const repoLink = createEl("a", {
        className: "project-link",
        attrs: { href: links.repo, target: "_blank", rel: "noopener noreferrer" },
      });
      repoLink.appendChild(createIcon("github", 12));
      repoLink.appendChild(createEl("span", { text: "GitHub" }));
      linksRow.appendChild(repoLink);
    }
    if (linksRow.children.length) body.appendChild(linksRow);

    card.appendChild(body);
    grid.appendChild(card);
  });

  scroll.appendChild(grid);
  return shell.content;
}

/* ------------------------------ Clock -------------------------------- */

let lastClockKey = "";

function updateClock() {
  const now = new Date();
  /* The clock only shows minutes, so skip redundant DOM writes. */
  const key =
    now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate() +
    "-" + now.getHours() + ":" + now.getMinutes();
  if (key === lastClockKey) return;
  lastClockKey = key;

  const locale = currentLang === "fr" ? "fr-FR" : "en-US";
  clockTime.textContent = now.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
  clockDate.textContent = now.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
  });
}

/* Wake up just after each minute boundary instead of every second. */
function scheduleClockTick() {
  const now = new Date();
  const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds() + 25;
  setTimeout(function () {
    if (!document.hidden) updateClock();
    scheduleClockTick();
  }, msToNextMinute);
}

updateClock();
scheduleClockTick();

/* Background tabs skip ticks; catch up as soon as the tab is visible. */
document.addEventListener("visibilitychange", function () {
  if (!document.hidden) updateClock();
});

/* --------------------- Keep windows inside the desktop ----------------- */

let resizeFrame = 0;

window.addEventListener(
  "resize",
  function () {
    if (resizeFrame) return; // at most one layout pass per frame
    resizeFrame = requestAnimationFrame(function () {
      resizeFrame = 0;
      const maxX = desktop.clientWidth;
      const maxY = desktop.clientHeight;
      windows.forEach(function (winState) {
        const win = winState.el;
        if (!win || !win.isConnected || win.classList.contains("is-maximized")) return;

        const x = Math.max(0, Math.min(win.offsetLeft, maxX - win.offsetWidth));
        const y = Math.max(0, Math.min(win.offsetTop, maxY - win.offsetHeight));
        win.style.left = x + "px";
        win.style.top = y + "px";
      });
    });
  },
  { passive: true }
);

/* ------------------------------ Boot ---------------------------------- */

buildDesktopIcons();
desktop.appendChild(iconsLayer);
buildStartMenu();
syncLangButton();

app.appendChild(desktop);
app.appendChild(taskbar);
openApp("notepad");
