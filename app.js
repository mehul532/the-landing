'use strict';
(() => {
  const stories = window.LANDING_STORIES;
  if (!Array.isArray(stories) || stories.length !== 3) throw new Error('The three voices could not be loaded.');
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const detailNames = { railing: 'Railing', pipes: 'Pipes', top: 'The top', window: 'Window', stairs: 'Stairs' };
  const detailOrder = Object.keys(detailNames);
  let current = 0, selectedDetail = null, detailTrigger = null, comparison = 'moment', withoutWords = false;
  const visited = new Set();
  function renderStory(index, { focusTab = false, animate = true, countExplored = true } = {}) {
    current = (index + stories.length) % stories.length;
    const story = stories[current];
    if (countExplored) visited.add(story.id);
    if (withoutWords) setWithoutWords(false);
    document.documentElement.style.setProperty('--accent', story.color);
    $('#voice-subtitle').textContent = story.subtitle;
    $('#story-title').textContent = story.title;
    $('#story-copy').replaceChildren(...story.paragraphs.map(text => { const p = document.createElement('p'); p.textContent = text; return p; }));
    $$('.voice-tab').forEach(tab => {
      const active = tab.dataset.voice === story.id;
      tab.classList.toggle('is-active', active);
      tab.classList.toggle('is-visited', visited.has(tab.dataset.voice));
      tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1;
      if (active && focusTab) tab.focus({ preventScroll: true });
    });
    $('#story-panel').setAttribute('aria-labelledby', 'tab-' + story.id);
    $('#visited-count').textContent = visited.size + ' of 3 explored';
    $('#next-voice').textContent = 'Meet ' + stories[(current + 1) % stories.length].label.toLowerCase() + ' →';
    $('#presentation-voice').textContent = String(current + 1).padStart(2, '0') + ' · ' + story.label;
    if (selectedDetail) renderDetail();
    if (animate) { const panel = $('#story-panel'); panel.classList.remove('is-changing'); void panel.offsetWidth; panel.classList.add('is-changing'); }
  }
  function renderDetail() {
    const story = stories[current];
    const text = story.details[selectedDetail];
    $('#detail-caption').textContent = detailNames[selectedDetail] + ' / ' + story.label;
    $('#detail-copy').textContent = text === null ? '—' : text;
    $('#detail-copy').classList.toggle('deliberate-blank', text === null);
    $('#detail-card').hidden = false;
    $$('[data-detail]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.detail === selectedDetail)));
  }
  function closeDetail({ returnFocus = false } = {}) {
    const trigger = detailTrigger;
    selectedDetail = null; detailTrigger = null; $('#detail-card').hidden = true;
    $$('[data-detail]').forEach(b => b.setAttribute('aria-pressed', 'false'));
    if (returnFocus && trigger && trigger.isConnected) trigger.focus();
  }
  function openDetail(name, trigger) {
    if (withoutWords) setWithoutWords(false);
    if (selectedDetail === name) { closeDetail({ returnFocus: true }); return; }
    selectedDetail = name; detailTrigger = trigger; renderDetail(); $('#detail-card').focus();
  }
  function setWithoutWords(value) {
    withoutWords = value; closeDetail();
    $('#experience').classList.toggle('is-without-words', value);
    $('#story-panel').hidden = value; $('#without-words').hidden = !value;
    $('#look-button').setAttribute('aria-pressed', String(value));
    $('#look-button').textContent = value ? 'Bring the words back ↗' : 'See without words ↗';
  }
  function renderComparison() {
    $('#comparison-event').hidden = comparison !== 'moment';
    $('#comparison-grid').replaceChildren(...stories.map((story, index) => {
      const card = document.createElement('article'); card.className = 'comparison-card'; card.style.setProperty('--voice-color', story.color);
      const label = document.createElement('p'); label.className = 'eyebrow'; label.textContent = String(index + 1).padStart(2, '0') + ' / ' + story.label;
      const subtitle = document.createElement('h3'); subtitle.textContent = story.subtitle;
      const text = comparison === 'moment' ? story.doorReaction : story.details[comparison];
      const quote = document.createElement('blockquote'); quote.textContent = text === null ? '—' : '“' + text + '”'; quote.classList.toggle('deliberate-blank', text === null);
      card.append(label, subtitle, quote); return card;
    }));
    $$('[data-compare]').forEach(b => { const active = b.dataset.compare === comparison; b.classList.toggle('is-active', active); b.setAttribute('aria-pressed', String(active)); });
    $('#comparison-footnote').textContent = comparison === 'moment' ? 'One door at the bottom. Three listeners at different heights.' : 'A blank marks an omission in this voice, not a missing part of the photograph.';
  }
  function openDialog(id) { const d = $(id); d.showModal(); document.body.style.overflow = 'hidden'; d.scrollTop = 0; }
  function openComparison(detail = 'moment') { comparison = detail; renderComparison(); openDialog('#compare-dialog'); }
  function setPresentation(value) {
    document.body.classList.toggle('is-presenting', value); document.documentElement.classList.toggle('is-presenting', value);
    $('#present-button').setAttribute('aria-pressed', String(value)); $('#presentation-bar').hidden = !value;
    window.scrollTo({ top: 0, behavior: 'instant' });
    (value ? $('#tab-' + stories[current].id) : $('#present-button')).focus({ preventScroll: true });
  }
  $$('.voice-tab').forEach((tab, index) => {
    tab.addEventListener('click', () => renderStory(index));
    tab.addEventListener('keydown', e => {
      let next;
      if (e.key === 'ArrowRight') next = current + 1;
      if (e.key === 'ArrowLeft') next = current - 1;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = stories.length - 1;
      if (next !== undefined) { e.preventDefault(); e.stopPropagation(); renderStory(next, { focusTab: true }); }
    });
  });
  $('#next-voice').addEventListener('click', () => renderStory(current + 1));
  $$('[data-detail]').forEach(b => b.addEventListener('click', () => openDetail(b.dataset.detail, b)));
  $('#close-detail').addEventListener('click', () => closeDetail({ returnFocus: true }));
  $('#look-button').addEventListener('click', () => setWithoutWords(!withoutWords));
  $('#return-words').addEventListener('click', () => { setWithoutWords(false); $('#tab-' + stories[current].id).focus(); });
  $$('.about-trigger').forEach(b => b.addEventListener('click', () => openDialog('#about-dialog')));
  $$('.close-dialog').forEach(b => b.addEventListener('click', () => b.closest('dialog').close()));
  $$('dialog').forEach(d => {
    d.addEventListener('close', () => { document.body.style.overflow = ''; });
    d.addEventListener('click', e => { if (e.target !== d) return; const r = d.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close(); });
  });
  $('#compare-button').addEventListener('click', () => openComparison());
  $('#compare-lower').addEventListener('click', () => openComparison());
  $('#compare-detail').addEventListener('click', () => openComparison(selectedDetail || 'moment'));
  $$('[data-compare]').forEach(b => b.addEventListener('click', () => { comparison = b.dataset.compare; renderComparison(); }));
  $('#fourth-voice').addEventListener('input', () => { $('#fourth-count').textContent = $('#fourth-voice').value.length + ' / 1200'; });
  $('#present-button').addEventListener('click', () => setPresentation(!document.body.classList.contains('is-presenting')));
  $('#exit-presentation').addEventListener('click', () => setPresentation(false));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if ($('dialog[open]')) return;
      if (selectedDetail) { closeDetail({ returnFocus: true }); return; }
      if (withoutWords) { setWithoutWords(false); $('#look-button').focus(); return; }
      if (document.body.classList.contains('is-presenting')) setPresentation(false);
      return;
    }
    if ($('dialog[open]') || !document.body.classList.contains('is-presenting') || e.altKey || e.ctrlKey || e.metaKey || e.target.closest('input,textarea,select,[contenteditable=true]')) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); renderStory(current + (e.key === 'ArrowRight' ? 1 : -1), { focusTab: true }); }
    if (/^[1-5]$/.test(e.key)) { e.preventDefault(); const name = detailOrder[Number(e.key) - 1]; openDetail(name, $('.hotspot[data-detail="' + name + '"]')); }
  });
  renderStory(0, { animate: false, countExplored: false });
})();
