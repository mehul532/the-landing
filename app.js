'use strict';

// Switches between the three stories. All three are already written in index.html,
// so if this script doesn't run, the page simply shows them one after another.
(function () {
  const tabs = Array.from(document.querySelectorAll('.voice-tab'));
  let current = 0;

  function select(index, moveFocus) {
    current = (index + tabs.length) % tabs.length;
    tabs.forEach(function (tab, n) {
      const selected = n === current;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
    });
    if (moveFocus) tabs[current].focus();
  }

  tabs.forEach(function (tab, n) {
    tab.addEventListener('click', function () { select(n, false); });
    tab.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); select(current + 1, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); select(current - 1, true); }
    });
  });
})();
