const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const navbar = document.querySelector(".navbar");
const progressBar = document.querySelector(".scroll-progress");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");

const navigationLinks = document.querySelectorAll(
  '.nav-links a[href^="#"]'
);

function closeMenu() {
  menuButton?.classList.remove("active");
  navigation?.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

menuButton?.addEventListener("click", () => {
  const isOpen = navigation?.classList.toggle("open");

  menuButton.classList.toggle("active", isOpen);
  menuButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
  document.body.classList.toggle("menu-open", Boolean(isOpen));
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

function updatePagePosition() {
  const scrollTop = window.scrollY;

  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    scrollableHeight > 0
      ? (scrollTop / scrollableHeight) * 100
      : 0;

  navbar?.classList.toggle("navbar-scrolled", scrollTop > 30);

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
}

window.addEventListener("scroll", updatePagePosition, {
  passive: true
});

updatePagePosition();

const revealElements = document.querySelectorAll(".reveal");

revealElements.forEach((element, index) => {
  element.style.setProperty(
    "--delay",
    `${(index % 4) * 70}ms`
  );
});

if (
  reduceMotion ||
  !("IntersectionObserver" in window)
) {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -45px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navigationLinks.forEach((link) => {
          const currentSection =
            link.getAttribute("href") ===
            `#${entry.target.id}`;

          link.classList.toggle(
            "active",
            currentSection
          );
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

const rotatingWord =
  document.querySelector(".rotating-word");

const rotatingPhrases = [
  "soluções digitais.",
  "plataformas eficientes.",
  "processos automatizados.",
  "experiências inteligentes."
];

if (rotatingWord && !reduceMotion) {
  let phraseIndex = 0;

  window.setInterval(() => {
    rotatingWord.classList.add("changing");

    window.setTimeout(() => {
      phraseIndex =
        (phraseIndex + 1) %
        rotatingPhrases.length;

      rotatingWord.textContent =
        rotatingPhrases[phraseIndex];

      rotatingWord.classList.remove("changing");
    }, 260);
  }, 3200);
}

const interactiveCards =
  document.querySelectorAll(".project-card");

interactiveCards.forEach((card) => {
  card.addEventListener(
    "pointermove",
    (event) => {
      const bounds =
        card.getBoundingClientRect();

      const mouseX =
        event.clientX - bounds.left;

      const mouseY =
        event.clientY - bounds.top;

      card.style.setProperty(
        "--mouse-x",
        `${mouseX}px`
      );

      card.style.setProperty(
        "--mouse-y",
        `${mouseY}px`
      );
    }
  );
});

const cursorGlow =
  document.querySelector(".cursor-glow");

if (cursorGlow && !reduceMotion) {
  window.addEventListener(
    "pointermove",
    (event) => {
      cursorGlow.style.left =
        `${event.clientX}px`;

      cursorGlow.style.top =
        `${event.clientY}px`;
    },
    {
      passive: true
    }
  );
}

const codeLayer =
  document.querySelector("#code-background");

const codeLibrary = [
  "const ideia = transformar();",
  "<solucaoDigital />",
  "deploy({ qualidade: true });",
  "AI.connect(negocio);",
  "while (desafio) { inovar(); }",
  "system.status = 'online';",
  "build(); test(); evolve();",
  "010101 110010 101101",
  "API • CLOUD • DATA",
  "interface Experiencia {}",
  "git commit -m 'evoluir'",
  "await projeto.entregar();",
  "function criarValor() {}",
  "UX + CODE + STRATEGY",
  "database.connect();",
  "npm run build",
  "{ performance: 100 }",
  "nextStep => innovation",
  "[ SYSTEM READY ]",
  "design.withPurpose();"
];

if (codeLayer && !reduceMotion) {
  const fragmentCount =
    window.innerWidth < 700 ? 16 : 30;

  for (
    let index = 0;
    index < fragmentCount;
    index += 1
  ) {
    const fragment =
      document.createElement("span");

    fragment.className = "code-fragment";

    fragment.textContent =
      codeLibrary[
        index % codeLibrary.length
      ];

    fragment.style.left =
      `${3 + ((index * 31) % 92)}%`;

    fragment.style.top =
      `${2 + ((index * 23) % 94)}%`;

    fragment.style.setProperty(
      "--duration",
      `${18 + (index % 8) * 2}s`
    );

    fragment.style.setProperty(
      "--delay",
      `${-(index % 10) * 2.7}s`
    );

    codeLayer.appendChild(fragment);
  }

  const fragments = [
    ...codeLayer.querySelectorAll(
      ".code-fragment"
    )
  ];

  let previousStage = -1;

  window.addEventListener(
    "scroll",
    () => {
      const stage =
        Math.floor(window.scrollY / 520);

      if (stage === previousStage) {
        return;
      }

      previousStage = stage;

      fragments.forEach(
        (fragment, index) => {
          fragment.textContent =
            codeLibrary[
              (index + stage * 3) %
              codeLibrary.length
            ];

          fragment.style.setProperty(
            "--code-shift",
            `${((stage + index) % 5) * 5}px`
          );
        }
      );
    },
    {
      passive: true
    }
  );
}

const canvas =
  document.querySelector("#tech-canvas");

const context =
  canvas?.getContext("2d");

if (canvas && context && !reduceMotion) {
  let canvasWidth = 0;
  let canvasHeight = 0;
  let nodes = [];
  let animationFrame = 0;
  let scrollEnergy = 0;

  const pointer = {
    x: -1000,
    y: -1000
  };

  function createNodes() {
    const amount = Math.min(
      58,
      Math.max(
        26,
        Math.floor(canvasWidth / 30)
      )
    );

    nodes = Array.from(
      {
        length: amount
      },
      (_, index) => ({
        x: (index * 97) % canvasWidth,
        y: (index * 53) % canvasHeight,

        vx:
          0.08 +
          (index % 5) * 0.035,

        vy:
          0.05 +
          (index % 4) * 0.025,

        size:
          0.8 +
          (index % 3) * 0.45
      })
    );
  }

  function resizeCanvas() {
    const ratio = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    canvas.width =
      Math.floor(canvasWidth * ratio);

    canvas.height =
      Math.floor(canvasHeight * ratio);

    canvas.style.width =
      `${canvasWidth}px`;

    canvas.style.height =
      `${canvasHeight}px`;

    context.setTransform(
      ratio,
      0,
      0,
      ratio,
      0,
      0
    );

    createNodes();
  }

  function drawCanvas() {
    context.clearRect(
      0,
      0,
      canvasWidth,
      canvasHeight
    );

    scrollEnergy *= 0.94;

    nodes.forEach((node) => {
      node.x +=
        node.vx * (1 + scrollEnergy);

      node.y +=
        node.vy * (1 + scrollEnergy);

      if (node.x > canvasWidth + 10) {
        node.x = -10;
      }

      if (node.y > canvasHeight + 10) {
        node.y = -10;
      }

      context.beginPath();

      context.arc(
        node.x,
        node.y,
        node.size,
        0,
        Math.PI * 2
      );

      context.fillStyle =
        "rgba(139, 233, 255, 0.34)";

      context.fill();
    });

    for (
      let first = 0;
      first < nodes.length;
      first += 1
    ) {
      for (
        let second = first + 1;
        second < nodes.length;
        second += 1
      ) {
        const dx =
          nodes[first].x -
          nodes[second].x;

        const dy =
          nodes[first].y -
          nodes[second].y;

        const distance =
          Math.hypot(dx, dy);

        if (distance < 125) {
          context.beginPath();

          context.moveTo(
            nodes[first].x,
            nodes[first].y
          );

          context.lineTo(
            nodes[second].x,
            nodes[second].y
          );

          context.strokeStyle =
            `rgba(0, 255, 170, ${
              0.085 *
              (1 - distance / 125)
            })`;

          context.lineWidth = 0.7;
          context.stroke();
        }
      }

      const pointerDistance =
        Math.hypot(
          nodes[first].x - pointer.x,
          nodes[first].y - pointer.y
        );

      if (pointerDistance < 170) {
        context.beginPath();

        context.moveTo(
          nodes[first].x,
          nodes[first].y
        );

        context.lineTo(
          pointer.x,
          pointer.y
        );

        context.strokeStyle =
          `rgba(139, 233, 255, ${
            0.12 *
            (1 - pointerDistance / 170)
          })`;

        context.stroke();
      }
    }

    animationFrame =
      window.requestAnimationFrame(
        drawCanvas
      );
  }

  window.addEventListener(
    "resize",
    resizeCanvas
  );

  window.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    },
    {
      passive: true
    }
  );

  window.addEventListener(
    "scroll",
    () => {
      scrollEnergy = Math.min(
        2.2,
        scrollEnergy + 0.25
      );
    },
    {
      passive: true
    }
  );

  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) {
        window.cancelAnimationFrame(
          animationFrame
        );
      } else {
        animationFrame =
          window.requestAnimationFrame(
            drawCanvas
          );
      }
    }
  );

  resizeCanvas();
  drawCanvas();
}