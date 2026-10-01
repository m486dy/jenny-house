// 휴대폰 메뉴 열기/닫기
const nav = document.getElementById("nav");
const menu = document.getElementById("menu");
const burger = document.getElementById("burger");

burger.addEventListener("click", () => {
  menu.classList.toggle("open");
  nav.classList.toggle("menu-open");
});
menu.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    nav.classList.remove("menu-open");
  })
);

// 스크롤하면 메뉴 아래에 선 표시
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 10);
});

// 스크롤할 때 내용이 부드럽게 나타나는 효과
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// 메뉴 탭 (여성 / 남성) 전환
document.querySelectorAll(".tab").forEach((tab) =>
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => {
      const on = t === tab;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on);
      document.getElementById("panel-" + t.dataset.tab).hidden = !on;
    });
  })
);

// 프리미엄 컬러 영상: 화면에 보일 때만 재생
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const videoObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting && !reduceMotion) video.play().catch(() => {});
      else video.pause();
    }),
  { threshold: 0.4 }
);
document.querySelectorAll(".video-strip video").forEach((v) => videoObserver.observe(v));

// 하단 연도 자동 표시
document.getElementById("year").textContent = new Date().getFullYear();
