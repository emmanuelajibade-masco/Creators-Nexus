(function () {
  "use strict";

  // sticky nav solid state
  var nav = document.querySelector(".site-nav");
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 24) nav.classList.add("solid");
      else nav.classList.remove("solid");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  var scrim = document.querySelector(".nav-scrim");
  if (toggle && links) {
    var closeNav = function () {
      toggle.setAttribute("aria-expanded", "false");
      links.classList.remove("open");
      if (scrim) scrim.classList.remove("open");
      document.body.style.overflow = "";
    };
    var openNav = function () {
      toggle.setAttribute("aria-expanded", "true");
      links.classList.add("open");
      if (scrim) scrim.classList.add("open");
      document.body.style.overflow = "hidden";
    };
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) closeNav();
      else openNav();
    });
    if (scrim) scrim.addEventListener("click", closeNav);
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  // scroll reveal (progressive enhancement — see .reveal.pre in style.css)
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  if (!reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    reveals.forEach(function (el) {
      el.classList.add("pre");
      io.observe(el);
    });
  }
})();
