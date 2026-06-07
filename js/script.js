(function () {
  'use strict';

  // ────────────────────────────────────────────
  // TYPING ANIMATION
  // ────────────────────────────────────────────

  var text = "Hey, I'm Encore.\n    Engineer Manager &\n    AI Researcher.";
  var heroRestoreText = text;

  var typedEl   = document.getElementById('typed-name');
  var cursorEl  = document.getElementById('cursor');
  var taglineEl = document.getElementById('tagline');
  var heroLinks = document.getElementById('hero-links');
  var heroBadges = document.getElementById('hero-badges');

  var charIdx = 0;

  function typeNext() {
    if (charIdx < text.length) {
      typedEl.textContent += text[charIdx];
      charIdx++;
      setTimeout(typeNext, 35 + Math.random() * 30);
    } else {
      setTimeout(function () {
        taglineEl.textContent = 'Rails at scale, agentic AI & MCP in production.\nShanghai · Open source @encoreshao';
        taglineEl.classList.add('visible');
        if (heroBadges) heroBadges.classList.add('visible');
        heroLinks.classList.add('visible');
        cursorEl.style.display = 'none';
      }, 300);
    }
  }

  setTimeout(typeNext, 400);

  // ────────────────────────────────────────────
  // GITHUB PROFILE (public API)
  // ────────────────────────────────────────────

  function formatGitHubSince(iso) {
    if (!iso) return '';
    var y = new Date(iso).getFullYear();
    var now = new Date().getFullYear();
    return (now - y) + '+ years on GitHub';
  }

  fetch('https://api.github.com/users/encoreshao')
    .then(function (res) { return res.ok ? res.json() : null; })
    .then(function (user) {
      if (!user) return;
      var line = user.public_repos + ' public repos · ' + user.followers + ' followers · ' +
        formatGitHubSince(user.created_at);
      var statsEl = document.getElementById('github-stats');
      if (statsEl) statsEl.textContent = '@encoreshao — ' + line;
      var readmeLine = document.getElementById('readme-github-line');
      if (readmeLine) {
        readmeLine.textContent = 'GitHub @encoreshao — ' + user.public_repos + ' public repos, ' +
          user.followers + ' followers. ' + (user.bio || 'Engineer Manager | AI Researcher') + '.';
      }
      var footerStats = document.getElementById('footer-stats');
      if (footerStats) {
        footerStats.innerHTML =
          '<li><span>|-- ' + user.public_repos + ' public repos</span></li>' +
          '<li><span>|-- ' + user.followers + ' followers · ' + user.following + ' following</span></li>' +
          '<li><span>`-- Shanghai, CN</span></li>';
      }
    })
    .catch(function () { /* offline or rate limit — static copy remains */ });

  // ────────────────────────────────────────────
  // COMMIT HASH
  // ────────────────────────────────────────────

  var commitEl = document.getElementById('sb-commit');
  var hex = '0123456789abcdef';
  var hash = '';
  for (var j = 0; j < 7; j++) hash += hex[Math.floor(Math.random() * 16)];
  var mins = Math.floor(Math.random() * 55) + 5;
  commitEl.textContent = hash + ' \u00b7 pushed ' + mins + 'm ago';

  // ────────────────────────────────────────────
  // FILE TREE NAVIGATION
  // ────────────────────────────────────────────

  var fileItems     = document.querySelectorAll('.tree-item.file');
  var contents      = document.querySelectorAll('.readme-content');
  var readmeHeaderVal  = document.getElementById('readme-header-text');
  var termFilename  = document.getElementById('term-filename');
  var sbFile        = document.getElementById('sb-file');
  var sbFiletype    = document.getElementById('sb-filetype');

  var fileMeta = {
    'readme':                  { header: 'about/README.md',                           name: 'README.md',              type: 'Markdown' },
    'pinned':                  { header: 'opensource/PINNED.md',                      name: 'PINNED.md',              type: 'Markdown' },
    'china-regions':           { header: 'opensource/china_regions/README.md',        name: 'china_regions',          type: 'Ruby' },
    'bamboohr-mcp':            { header: 'opensource/bamboohr-mcp/README.md',         name: 'bamboohr-mcp',           type: 'TypeScript' },
    'github-trending':         { header: 'opensource/github-trending/README.md',      name: 'github-trending',        type: 'Jupyter' },
    'search-engines-scraper':  { header: 'opensource/search-engines-scraper/README.md', name: 'search-engines-scraper', type: 'Python' },
    'ai-rss-reader':           { header: 'opensource/ai-rss-reader/README.md',        name: 'ai-rss-reader',          type: 'TypeScript' },
    'erp-hub':                 { header: 'products/erp-hub/README.md',                name: 'erp-hub',                type: 'Rails' },
    'ranbot':                  { header: 'products/ranbot/README.md',                   name: 'ranbot',                 type: 'Agentic AI' },
    'data-graph':              { header: 'products/data-graph/README.md',               name: 'data-graph',             type: 'Data' },
    'github-explorer':         { header: 'products/github-explorer/README.md',        name: 'github-explorer',        type: 'TypeScript' },
    'icmoc-web':               { header: 'products/icmoc.web/README.md',                name: 'icmoc.web',              type: 'HTML' },
    'bookmark-dashboard':      { header: 'products/bookmark-dashboard/README.md',       name: 'bookmark-dashboard',     type: 'TypeScript' },
    'skills-tracker':          { header: 'products/skills-tracker/README.md',           name: 'skills-tracker',         type: 'Learning' },
    'stack':                   { header: 'skills/stack.md',                             name: 'stack.md',               type: 'Markdown' },
    'thinking':                { header: 'notes/thinking.txt',                          name: 'thinking.txt',           type: 'Plain Text' },
  };

  function switchTo(file) {
    // Update tree active state
    fileItems.forEach(function (el) {
      el.classList.toggle('active', el.dataset.file === file);
    });

    // Update content
    contents.forEach(function (c) { c.classList.remove('active'); });
    var target = document.getElementById('content-' + file);
    if (target) target.classList.add('active');

    // Update headers
    var meta = fileMeta[file];
    if (meta) {
      readmeHeaderVal.textContent = meta.header;
      termFilename.textContent = meta.header;
      sbFile.textContent = meta.name;
      sbFiletype.textContent = meta.type;

      // Dynamic mascot injector
      var mascotContainer = document.getElementById('readme-header-mascot');
      if (mascotContainer) {
        if (file === 'stack' || file === 'pinned') {
          if (!mascotContainer.querySelector('dotlottie-wc')) {
            mascotContainer.innerHTML = '<dotlottie-wc src="https://lottie.host/1f4326dd-8564-46d4-a96d-ca3c7d09d210/R5FAabJUmz.lottie" style="width: 100px; height: 100px; flex-shrink: 0; margin-top: -32px; margin-bottom: -32px; margin-left: 0 !important;" autoplay loop></dotlottie-wc>';
          }
        } else {
          mascotContainer.innerHTML = '';
        }
      }
    }
  }

  fileItems.forEach(function (item) {
    item.addEventListener('click', function () { switchTo(item.dataset.file); });
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        switchTo(item.dataset.file);
      }
    });
  });

  // ────────────────────────────────────────────
  // KEYBOARD NAVIGATION (j/k)
  // ────────────────────────────────────────────

  var fileList = Array.from(fileItems);
  var focusIdx = fileList.findIndex(function (el) { return el.classList.contains('active'); });

  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'j' || e.key === 'ArrowDown') {
      e.preventDefault();
      focusIdx = Math.min(focusIdx + 1, fileList.length - 1);
      fileList[focusIdx].focus();
    } else if (e.key === 'k' || e.key === 'ArrowUp') {
      e.preventDefault();
      focusIdx = Math.max(focusIdx - 1, 0);
      fileList[focusIdx].focus();
    } else if (e.key === 'Enter' && document.activeElement.classList.contains('file')) {
      switchTo(document.activeElement.dataset.file);
      focusIdx = fileList.indexOf(document.activeElement);
    }
  });

  // ────────────────────────────────────────────
  // SCROLL REVEAL
  // ────────────────────────────────────────────

  var reveals = document.querySelectorAll('.tree-section, .footer-inner');
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    obs.observe(el);
  });

  // ────────────────────────────────────────────
  // EASTER EGG: Konami Code
  // ────────────────────────────────────────────

  var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  var konamiIdx = 0;
  var easterEgg = document.getElementById('easter-egg');

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === konami[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === konami.length) {
        easterEgg.classList.add('active');
        playSynthSound('powerup');
        konamiIdx = 0;
      }
    } else {
      konamiIdx = 0;
    }
  });

  easterEgg.addEventListener('click', function () {
    easterEgg.classList.remove('active');
  });

  // ────────────────────────────────────────────
  // EASTER EGGS IMPLEMENTATION
  // ────────────────────────────────────────────

  // --- 1. Scramble Text Helper ---
  function scramble(el, targetText, duration) {
    var chars = '!@#$%^&*()_+~`|}{[]:;?><,./-=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var originalText = el.textContent;
    var length = Math.max(originalText.length, targetText.length);
    var frame = 0;
    var totalFrames = Math.floor(duration / 16);

    function update() {
      if (frame >= totalFrames) {
        el.textContent = targetText;
        return;
      }
      var progress = frame / totalFrames;
      var output = '';
      for (var i = 0; i < length; i++) {
        if (i < targetText.length && progress > i / targetText.length) {
          output += targetText[i];
        } else if (i < originalText.length && progress < i / originalText.length) {
          output += originalText[i];
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      el.textContent = output;
      frame++;
      requestAnimationFrame(update);
    }
    update();
  }

  // Bind scramble on hover
  var scrambleElements = document.querySelectorAll('.scramble-hover');
  scrambleElements.forEach(function(el) {
    var original = el.textContent;
    var target = el.getAttribute('data-scramble');
    el.addEventListener('mouseenter', function() {
      scramble(el, target, 350);
    });
    el.addEventListener('mouseleave', function() {
      scramble(el, original, 350);
    });
  });

  // --- 2. Web Audio Sound Synthesizer ---
  var audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSynthSound(type) {
    try {
      var ctx = getAudioContext();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      var now = ctx.currentTime;

      if (type === 'coin') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(987.77, now); // B5
        osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'laser') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'powerup') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'squish') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.12);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      }
    } catch (e) {
      console.warn("AudioContext block/error", e);
    }
  }

  // --- 3. Footer Avatar Spin Soundboard ---
  var avatarEl = document.querySelector('.footer-avatar');
  var sounds = ['coin', 'laser', 'powerup'];
  var soundIdx = 0;
  if (avatarEl) {
    avatarEl.addEventListener('click', function() {
      playSynthSound(sounds[soundIdx]);
      soundIdx = (soundIdx + 1) % sounds.length;
    });
  }

  // --- 4. Branch Switcher ---
  var branches = ['main', 'feature/agentic-ai', 'rails/erp-hub', 'mcp-servers', 'shanghai-prod'];
  var branchIdx = 0;
  var branchNameEl = document.getElementById('branch-name');
  var branchBtn = document.getElementById('sb-branch');
  var statusbar = document.getElementById('statusbar');

  if (branchBtn) {
    branchBtn.addEventListener('click', function() {
      branchIdx = (branchIdx + 1) % branches.length;
      branchNameEl.textContent = branches[branchIdx];
      playSynthSound('coin');

      // Glow status bar
      statusbar.style.background = '#1e3a5f';
      statusbar.style.transition = 'background 0.1s';
      setTimeout(function() {
        statusbar.style.background = '';
      }, 150);
    });
  }

  // --- 5. Commit Drawer ---
  var commits = [
    { hash: '7c3f91a', msg: 'feat(mcp): extend bamboohr-mcp tool surface', author: 'es' },
    { hash: '4b9d02e', msg: 'china_regions: bump gem version', author: 'es' },
    { hash: 'a12b98f', msg: 'ai-rss-reader: daily digest prompt tuning', author: 'es' },
    { hash: 'e5f2a11', msg: 'icmoc.web: sync portfolio sections', author: 'es' },
    { hash: '9b8c7d6', msg: 'github-trending: weekly scrape job', author: 'es' },
    { hash: '3a4b5c6', msg: 'bookmark-dashboard: new tab layout polish', author: 'es' },
    { hash: '1f8d9e2', msg: 'coffee supply replenishment commit', author: 'es' }
  ];

  var commitBtn = document.getElementById('sb-commit');
  var drawer = document.getElementById('git-log-drawer');
  var drawerContent = document.getElementById('git-log-content');
  var drawerClose = document.getElementById('drawer-close');

  function showGitLog() {
    drawerContent.innerHTML = '';
    var displayed = commits.slice().sort(function() { return 0.5 - Math.random(); }).slice(0, 5);

    displayed.forEach(function(c, idx) {
      var age = (idx + 1) * 10 + Math.floor(Math.random() * 8);
      var item = document.createElement('div');
      item.className = 'git-log-item';
      item.innerHTML = '<span class="git-log-hash">' + c.hash + '</span>' +
                       '<span class="git-log-msg">' + c.msg + '</span>' +
                       '<span class="git-log-meta">(' + age + 'm ago by ' + c.author + ')</span>';
      drawerContent.appendChild(item);
    });

    drawer.classList.add('active');
    playSynthSound('laser');
  }

  if (commitBtn) {
    commitBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      showGitLog();
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', function(e) {
      e.stopPropagation();
      drawer.classList.remove('active');
    });
  }

  document.addEventListener('click', function(e) {
    if (drawer && !drawer.contains(e.target) && drawer.classList.contains('active')) {
      drawer.classList.remove('active');
    }
  });

  // --- 6. Caffeine State, Coffee Meter & Crash ---
  var caffeine = 40;
  var caffeineMeter = document.getElementById('caffeine-meter');
  var coffeeBtn = document.getElementById('sb-caffeine');
  var coffeeCup = document.getElementById('coffee-cup');
  var typedCursor = document.getElementById('cursor');

  function updateCaffeineUI() {
    var blocks = Math.round(caffeine / 10);
    var meter = '[';
    for (var i = 0; i < 10; i++) {
      meter += (i < blocks) ? '█' : '░';
    }
    meter += ']';
    caffeineMeter.textContent = meter;

    if (typedCursor) {
      if (caffeine >= 80) {
        typedCursor.style.animation = 'blink 0.2s step-end infinite';
      } else if (caffeine >= 60) {
        typedCursor.style.animation = 'blink 0.5s step-end infinite';
      } else {
        typedCursor.style.animation = 'blink 1s step-end infinite';
      }
    }

  }

  if (coffeeBtn) {
    coffeeBtn.addEventListener('click', function() {
      coffeeCup.style.transform = 'scale(1.4) rotate(-20deg)';
      setTimeout(function() {
        coffeeCup.style.transform = '';
      }, 200);

      if (caffeine >= 100) {
        playSynthSound('laser');
        document.body.classList.add('crash-flash');
        caffeine = 0;
        updateCaffeineUI();
        showToast("⚠️ CAFFEINE OVERLOAD CRASH DETECTED\nSystem rebooting. Please supply decaf.");
        setTimeout(function() {
          document.body.classList.remove('crash-flash');
        }, 800);
        return;
      }

      caffeine += 20;
      updateCaffeineUI();
      playSynthSound('coin');

      if (caffeine === 100) {
        showToast("⚡ Caffeine: 100%\nVibe levels peaking! Shaky hands ahead.");
      }
    });
  }

  var toastTimeout = null;
  function showToast(message) {
    var toast = document.getElementById('terminal-toast');
    if (toast) {
      toast.textContent = message;
      toast.classList.add('active');
      if (toastTimeout) clearTimeout(toastTimeout);
      toastTimeout = setTimeout(function() {
        toast.classList.remove('active');
      }, 4000);
    }
  }

  updateCaffeineUI();

  // --- 7. Hacker Phosphor CRT Mode ---
  function toggleHackerMode() {
    var isHacker = document.body.classList.toggle('hacker-mode');
    playSynthSound(isHacker ? 'powerup' : 'laser');
    showToast(isHacker ? "🔌 Phosphor CRT mode initialized." : "🔌 Standard styling restored.");

    var matrixCanvas = document.getElementById('matrix-canvas');
    if (matrixCanvas) {
      if (isHacker) {
        matrixCanvas.classList.add('active');
        startMatrixRain();
      } else {
        matrixCanvas.classList.remove('active');
        stopMatrixRain();
      }
    }
  }

  document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'h' || e.key === 'H') {
      toggleHackerMode();
    }
  });

  if (statusbar) {
    statusbar.addEventListener('dblclick', toggleHackerMode);
  }

  // --- 8. Console Mode in Greeting ---
  var heroPrompt = document.getElementById('hero-prompt');
  var typedNameEl = document.getElementById('typed-name');

  if (heroPrompt && typedNameEl) {
    heroPrompt.addEventListener('dblclick', function() {
      if (document.getElementById('console-input')) return;

      playSynthSound('coin');

      var wrapper = document.createElement('span');
      wrapper.className = 'console-input-wrapper';

      var input = document.createElement('input');
      input.type = 'text';
      input.id = 'console-input';
      input.placeholder = 'type help...';
      input.maxLength = 30;

      wrapper.appendChild(input);
      typedNameEl.textContent = '';
      typedNameEl.appendChild(wrapper);
      input.focus();

      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          var cmd = input.value.trim().toLowerCase();
          executeConsoleCommand(cmd);

          typedNameEl.innerHTML = '';
          typedNameEl.textContent = heroRestoreText;
        } else if (e.key === 'Escape') {
          typedNameEl.innerHTML = '';
          typedNameEl.textContent = heroRestoreText;
        }
      });

      setTimeout(function() {
        document.addEventListener('click', function clickOut(e) {
          if (!wrapper.contains(e.target) && !heroPrompt.contains(e.target)) {
            if (document.getElementById('console-input')) {
              typedNameEl.innerHTML = '';
              typedNameEl.textContent = heroRestoreText;
            }
            document.removeEventListener('click', clickOut);
          }
        });
      }, 100);
    });
  }

  function executeConsoleCommand(cmd) {
    if (!cmd) return;
    playSynthSound('laser');

    if (cmd === 'help') {
      showToast("⌨️ COMMANDS AVAILABLE:\n\n• matrix  - Toggle Digital Rain\n• coffee  - Drink instant double espresso\n• weather - Shanghai weather\n• github  - Open encoreshao profile\n• bugs    - Release the bugs\n• sudo    - Request root access\n• exit    - Close console");
    } else if (cmd === 'matrix') {
      var canvas = document.getElementById('matrix-canvas');
      if (canvas) {
        var isActive = canvas.classList.toggle('active');
        if (isActive) {
          startMatrixRain();
          showToast("🟢 Digital Rain initialized on background.");
        } else {
          stopMatrixRain();
          showToast("🔴 Digital Rain terminated.");
        }
      }
    } else if (cmd === 'coffee') {
      caffeine = 100;
      updateCaffeineUI();
      showToast("⚡ Coffee loaded. System running at max capacity.");
    } else if (cmd === 'github') {
      window.open('https://github.com/encoreshao', '_blank', 'noopener');
      showToast("🐙 Opened github.com/encoreshao in a new tab.");
    } else if (cmd === 'weather') {
      showToast("🌦️ Shanghai Weather Report:\n\nTemp: 24°C\nWind: 12km/h (East)\nHumidity: 68% — ideal coding weather.");
    } else if (cmd === 'bugs') {
      showToast("🪲 Encore's codebase contains 0 bugs.\nRails + tests = stable ship.");
    } else if (cmd === 'sudo') {
      showToast("❌ Permission Denied:\nencore is not in the sudoers file. This incident will be reported.");
    } else if (cmd === 'exit' || cmd === 'clear') {
      showToast("🔌 Exited terminal mode.");
    } else {
      showToast("❓ Unknown command: " + cmd + "\nType 'help' to see valid commands.");
    }
  }

  // --- 9. Matrix Rain Effect ---
  var matrixInterval = null;
  function startMatrixRain() {
    if (matrixInterval) clearInterval(matrixInterval);

    var canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    var columns = Math.floor(canvas.width / 20) + 1;
    var yPositions = Array(columns).fill(0);

    var katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890";
    var chars = katakana.split("");

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      var isHacker = document.body.classList.contains('hacker-mode');
      ctx.fillStyle = isHacker ? '#39ff14' : '#3B82F6';
      ctx.font = '14px Fira Code, JetBrains Mono, Courier';

      for (var i = 0; i < yPositions.length; i++) {
        var text = chars[Math.floor(Math.random() * chars.length)];
        var x = i * 20;
        var y = yPositions[i];
        ctx.fillText(text, x, y);

        if (y > 100 + Math.random() * 10000) {
          yPositions[i] = 0;
        } else {
          yPositions[i] += 20;
        }
      }
    }
    matrixInterval = setInterval(draw, 33);
  }

  function stopMatrixRain() {
    if (matrixInterval) {
      clearInterval(matrixInterval);
      matrixInterval = null;
    }
    var canvas = document.getElementById('matrix-canvas');
    if (canvas) {
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

 })();
