'use strict';

(function () {
  const stories = window.LANDING_STORIES;
  const tabs = Array.from(document.querySelectorAll('.voice-tab'));
  let current = 0;

  // Show one person's story and mark their tab as selected.
  function showStory(index, moveFocus) {
    current = (index + stories.length) % stories.length;
    const story = stories[current];

    document.getElementById('story-place').textContent = story.place + ' · 4:17 p.m.';
    document.getElementById('story-title').textContent = story.title;

    const copy = document.getElementById('story-copy');
    copy.innerHTML = '';
    story.paragraphs.forEach(function (text) {
      const p = document.createElement('p');
      p.textContent = text;
      copy.appendChild(p);
    });

    tabs.forEach(function (tab) {
      const selected = tab.dataset.voice === story.id;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && moveFocus) tab.focus();
    });
    document.getElementById('story-panel').setAttribute('aria-labelledby', 'tab-' + story.id);
  }

  // Build the comparison table: one row per detail, one column per person.
  function buildTable() {
    const rows = [
      ['The door closing below', function (s) { return s.door; }],
      ['Railing', function (s) { return s.details.railing; }],
      ['Pipes', function (s) { return s.details.pipes; }],
      ['The top', function (s) { return s.details.top; }],
      ['Window', function (s) { return s.details.window; }],
      ['Stairs', function (s) { return s.details.stairs; }]
    ];

    const table = document.getElementById('compare-table');
    let html = '<thead><tr><th scope="col">Detail</th>';
    stories.forEach(function (s) { html += '<th scope="col">' + s.label + '</th>'; });
    html += '</tr></thead><tbody>';

    rows.forEach(function (row) {
      html += '<tr><th scope="row">' + row[0] + '</th>';
      stories.forEach(function (s) {
        const text = row[1](s);
        const label = ' data-label="' + s.label + '"';
        html += text
          ? '<td' + label + '>' + text + '</td>'
          : '<td class="blank"' + label + '><span aria-hidden="true">–</span><span class="visually-hidden">Doesn\'t notice</span></td>';
      });
      html += '</tr>';
    });

    table.innerHTML = html + '</tbody>';
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () { showStory(index, false); });
    tab.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); showStory(current + 1, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); showStory(current - 1, true); }
    });
  });

  showStory(0, false);
  buildTable();
})();
