/* ============================================================
   tcm-music.js  —  Five-tone music player + Keep-screen-awake toggle
   ============================================================
   Auto-selects the meridian organ's track set based on the current
   hour. The user can play / pause / skip and pick loop or shuffle.
   A separate "keep screen awake" toggle uses the Wake Lock API to
   prevent the screen from auto-locking during long viewing sessions.
   ============================================================ */

(function () {
  // ---------- Music player ----------

  let audio = null;             // <audio> element
  let currentOrganName = null;  // e.g. '心'
  let trackIdx = 0;
  let mode = 'loop';            // 'loop' or 'shuffle'
  let userPaused = true;        // start paused — autoplay would be blocked anyway

  function getCurrentOrganName() {
    if (typeof getCurrentIdx !== 'function' || typeof ORGANS === 'undefined') return null;
    const idx = getCurrentIdx();
    if (idx < 0) return null;
    return ORGANS[idx].cnSimp || ORGANS[idx].cn;
  }

  function currentPlaylist() {
    const name = currentOrganName;
    if (!name) return [];
    const data = (typeof MUSIC_DATA !== 'undefined') ? MUSIC_DATA[name] : null;
    return data ? data.tracks : [];
  }

  function currentTone() {
    const name = currentOrganName;
    if (!name) return '';
    const data = (typeof MUSIC_DATA !== 'undefined') ? MUSIC_DATA[name] : null;
    return data ? data.tone : '';
  }

  function loadTrack() {
    const playlist = currentPlaylist();
    if (!playlist.length) {
      updateNowPlaying('No track loaded');
      return;
    }
    if (trackIdx < 0 || trackIdx >= playlist.length) trackIdx = 0;
    const filename = playlist[trackIdx];
    audio.src = (typeof musicTrackUrl === 'function')
      ? musicTrackUrl(filename)
      : ('assets/CTM-Music/' + filename);
    updateNowPlaying(filename.replace(/\.mp3$/, ''));
  }

  function playPause() {
    if (!audio.src || audio.src === window.location.href) {
      // No source yet — pick the first track for the current organ
      ensureCurrentOrgan();
      loadTrack();
    }
    if (audio.paused) {
      audio.play().then(() => { userPaused = false; updateButtonStates(); })
        .catch(err => { console.warn('Playback blocked or failed:', err); });
    } else {
      audio.pause();
      userPaused = true;
      updateButtonStates();
    }
  }

  function next() {
    const playlist = currentPlaylist();
    if (!playlist.length) return;
    if (mode === 'shuffle') {
      let n = trackIdx;
      while (n === trackIdx && playlist.length > 1) n = Math.floor(Math.random() * playlist.length);
      trackIdx = n;
    } else {
      trackIdx = (trackIdx + 1) % playlist.length;
    }
    loadTrack();
    if (!userPaused) audio.play().catch(() => {});
  }

  function prev() {
    const playlist = currentPlaylist();
    if (!playlist.length) return;
    trackIdx = (trackIdx - 1 + playlist.length) % playlist.length;
    loadTrack();
    if (!userPaused) audio.play().catch(() => {});
  }

  function ensureCurrentOrgan() {
    const name = getCurrentOrganName();
    if (name && name !== currentOrganName) {
      currentOrganName = name;
      trackIdx = 0;
    }
  }

  // Watch for hour-change → switch playlist
  function checkOrganChange() {
    const name = getCurrentOrganName();
    if (name && name !== currentOrganName) {
      currentOrganName = name;
      trackIdx = 0;
      loadTrack();
      if (!userPaused) audio.play().catch(() => {});
    }
  }

  function updateNowPlaying(text) {
    const el = document.getElementById('music-now');
    if (!el) return;
    const tone = currentTone();
    const organ = currentOrganName || '—';
    el.innerHTML = `<span class="music-organ">${organ}</span>` +
                   (tone ? `<span class="music-tone">${tone}</span>` : '') +
                   `<span class="music-track">${text}</span>`;
  }

  function updateButtonStates() {
    const btn = document.getElementById('music-play');
    if (!btn) return;
    btn.textContent = (audio && !audio.paused) ? '⏸' : '▶';
  }

  // Build the floating music panel (collapsed by default).
  function buildPanel() {
    if (document.getElementById('music-panel')) return;
    const panel = document.createElement('div');
    panel.id = 'music-panel';
    panel.className = 'music-panel collapsed';
    panel.innerHTML = `
      <button class="music-toggle" id="music-toggle" type="button"
              aria-label="Toggle music panel" title="Music panel">♫</button>
      <div class="music-body">
        <div class="music-head" data-zh-s="五音乐" data-zh-t="五音樂">Five-Tone Music</div>
        <div class="music-controls">
          <button id="music-prev"  type="button" aria-label="Previous">⏮</button>
          <button id="music-play"  type="button" aria-label="Play / Pause">▶</button>
          <button id="music-next"  type="button" aria-label="Next">⏭</button>
          <select id="music-mode" aria-label="Play mode">
            <option value="loop">Loop</option>
            <option value="shuffle">Shuffle</option>
          </select>
        </div>
        <div id="music-now" class="music-now">—</div>
        <div class="music-hint" data-zh-s="按播放后会自动选择当前时辰对应的脏腑乐曲。" data-zh-t="按播放後會自動選擇當前時辰對應的臟腑樂曲。">Press play to auto-select the music matched to the current organ-meridian hour.</div>
      </div>
    `;
    document.body.appendChild(panel);

    audio = document.createElement('audio');
    audio.id = 'music-audio';
    audio.preload = 'none';
    audio.volume = 0.5;
    document.body.appendChild(audio);

    audio.addEventListener('ended', next);
    audio.addEventListener('error', () => {
      console.warn('Track failed to load — skipping:', audio.src);
      next();
    });
    audio.addEventListener('play',  updateButtonStates);
    audio.addEventListener('pause', updateButtonStates);

    document.getElementById('music-toggle').addEventListener('click', () => {
      panel.classList.toggle('collapsed');
    });
    document.getElementById('music-prev').addEventListener('click', prev);
    document.getElementById('music-play').addEventListener('click', playPause);
    document.getElementById('music-next').addEventListener('click', next);
    document.getElementById('music-mode').addEventListener('change', (e) => {
      mode = e.target.value;
    });

    // Initialise display
    ensureCurrentOrgan();
    if (currentOrganName) {
      updateNowPlaying('Press play to start');
    } else {
      updateNowPlaying('—');
    }

    // Re-check organ change once a minute
    setInterval(checkOrganChange, 60000);
  }

  // ---------- Wake Lock (keep screen awake) ----------

  let wakeLock = null;
  let wakeLockSupported = ('wakeLock' in navigator);

  async function enableWakeLock() {
    if (!wakeLockSupported) return false;
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => {
        wakeLock = null;
        updateWakeLockButton(false);
      });
      return true;
    } catch (e) {
      console.warn('Wake lock failed:', e);
      return false;
    }
  }

  function disableWakeLock() {
    if (wakeLock) {
      wakeLock.release().catch(() => {});
      wakeLock = null;
    }
  }

  function updateWakeLockButton(on) {
    const btn = document.getElementById('wake-lock-toggle');
    if (!btn) return;
    btn.classList.toggle('on', on);
    btn.textContent = on ? '🔆' : '☾';
    btn.title = on ? 'Screen will stay awake — click to allow auto-lock'
                   : 'Click to keep screen awake (prevent auto-lock)';
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  }

  function buildWakeLockButton() {
    const topbar = document.querySelector('.topbar');
    if (!topbar) return;
    if (document.getElementById('wake-lock-toggle')) return;

    const btn = document.createElement('button');
    btn.id = 'wake-lock-toggle';
    btn.className = 'wake-lock-toggle';
    btn.type = 'button';
    btn.textContent = '☾';
    btn.title = 'Click to keep screen awake (prevent auto-lock)';
    btn.setAttribute('aria-pressed', 'false');

    if (!wakeLockSupported) {
      btn.disabled = true;
      btn.title = 'Wake Lock API not supported in this browser';
      btn.style.opacity = '0.4';
      btn.style.cursor = 'not-allowed';
    }

    btn.addEventListener('click', async () => {
      if (wakeLock) {
        disableWakeLock();
        updateWakeLockButton(false);
      } else {
        const ok = await enableWakeLock();
        updateWakeLockButton(ok);
        if (!ok && !wakeLockSupported) {
          alert('Your browser does not support the Wake Lock API. Try Chrome, Edge, or Safari.');
        }
      }
    });

    // Insert just before the script-toggle if present, otherwise at the end
    const scriptToggle = document.getElementById('script-toggle');
    if (scriptToggle) topbar.insertBefore(btn, scriptToggle);
    else topbar.appendChild(btn);

    // Re-acquire if visibility comes back (browsers auto-release on hide)
    document.addEventListener('visibilitychange', async () => {
      if (document.visibilityState === 'visible' &&
          document.getElementById('wake-lock-toggle')?.classList.contains('on') &&
          !wakeLock) {
        const ok = await enableWakeLock();
        updateWakeLockButton(ok);
      }
    });
  }

  // ---------- Boot ----------

  document.addEventListener('DOMContentLoaded', () => {
    buildPanel();
    buildWakeLockButton();
  });
})();
