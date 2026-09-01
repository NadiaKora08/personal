/* Scroll reveal for the alternating bands.

   The .js class is set from here rather than in the markup, so a browser with
   scripting off never hides anything: the CSS that sets opacity: 0 is scoped
   under .js and simply never applies. */

(function () {
  document.documentElement.classList.add("js");

  var targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  // No IntersectionObserver (or the reader asked for less motion): show
  // everything immediately and skip the observer entirely.
  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (still || !("IntersectionObserver" in window)) {
    for (var i = 0; i < targets.length; i++) targets[i].classList.add("is-in");
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        // Toggling rather than unobserving is deliberate — the band slides
        // back out on the way down and replays when you scroll back up.
        entry.target.classList.toggle("is-in", entry.isIntersecting);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  for (var j = 0; j < targets.length; j++) observer.observe(targets[j]);
})();
