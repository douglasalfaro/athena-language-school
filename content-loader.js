/**
 * content-loader.js
 * Fetches JSON data files from /content/ and populates the DOM.
 * Elements use data-content attributes to map to JSON paths.
 * Falls back to hardcoded HTML if JSON fails to load.
 */
(function () {
  'use strict';

  // Map data-content attributes to JSON file + key path
  // Format: data-content="file.key.subkey" or data-content="file[].key" for list items
  const CONTENT_FILES = ['hero', 'features', 'courses', 'teachers', 'contact'];

  function loadJSON(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }

  function getNested(obj, path) {
    return path.split('.').reduce(function (acc, key) {
      return acc && acc[key] !== undefined ? acc[key] : null;
    }, obj);
  }

  function renderHero(data) {
    setText('[data-content="hero.tag"]', data.tag);
    setHTML('[data-content="hero.title"]', data.title);
    setHTML('[data-content="hero.subtitle"]', data.subtitle);

    // Highlights
    var container = document.querySelector('[data-content="hero.highlights"]');
    if (container && data.highlights) {
      container.innerHTML = '';
      data.highlights.forEach(function (h) {
        var div = document.createElement('div');
        div.className = 'hero-highlight-card';
        div.innerHTML = '<span class="emoji">' + h.emoji + '</span><span class="label">' + h.label + '</span>';
        container.appendChild(div);
      });
    }

    // Photos
    var photosContainer = document.querySelector('[data-content="hero.photos"]');
    if (photosContainer && data.photos) {
      photosContainer.innerHTML = '';
      data.photos.forEach(function (p) {
        var div = document.createElement('div');
        div.className = 'hero-photo';
        div.setAttribute('onclick', 'openLightbox(this)');
        div.innerHTML =
          '<img src="' + p.src + '" alt="' + escapeAttr(p.alt) + '" loading="lazy">' +
          '<div class="hero-photo-badge">' + p.badge + '</div>' +
          '<div style="display:none" class="caption-text">' + escapeHtml(p.caption) + '</div>';
        photosContainer.appendChild(div);
      });
    }
  }

  function renderFeatures(data) {
    setText('[data-content="features.section_tag"]', data.section_tag);
    setText('[data-content="features.section_title"]', data.section_title);
    setText('[data-content="features.section_desc"]', data.section_desc);

    var container = document.querySelector('[data-content="features.items"]');
    if (container && data.items) {
      container.innerHTML = '';
      data.items.forEach(function (f) {
        var div = document.createElement('div');
        div.className = 'feature-card reveal';
        div.innerHTML =
          '<span class="feature-icon">' + f.icon + '</span>' +
          '<h3>' + escapeHtml(f.title) + '</h3>' +
          '<p>' + escapeHtml(f.desc) + '</p>';
        container.appendChild(div);
      });
      observeReveal(container);
    }
  }

  function renderCourses(data) {
    setText('[data-content="courses.section_tag"]', data.section_tag);
    setText('[data-content="courses.section_title"]', data.section_title);
    setText('[data-content="courses.section_desc"]', data.section_desc);

    var container = document.querySelector('[data-content="courses.items"]');
    if (container && data.items) {
      container.innerHTML = '';
      data.items.forEach(function (c) {
        var tagsHtml = c.tags.map(function (t) { return '<span class="course-tag">' + escapeHtml(t) + '</span>'; }).join('');
        var div = document.createElement('div');
        div.className = 'course-card reveal';
        div.innerHTML =
          '<div class="course-header"><span class="course-emoji">' + c.emoji + '</span><span class="course-age">' + escapeHtml(c.age) + '</span><div class="course-title">' + escapeHtml(c.title) + '</div></div>' +
          '<div class="course-body"><p>' + escapeHtml(c.desc) + '</p><div class="course-tags">' + tagsHtml + '</div></div>';
        container.appendChild(div);
      });
      observeReveal(container);
    }
  }

  function renderTeachers(data) {
    setText('[data-content="teachers.section_tag"]', data.section_tag);
    setText('[data-content="teachers.section_title"]', data.section_title);
    setText('[data-content="teachers.section_desc"]', data.section_desc);

    var container = document.querySelector('[data-content="teachers.items"]');
    if (container && data.items) {
      container.innerHTML = '';
      data.items.forEach(function (t) {
        var div = document.createElement('div');
        div.className = 'teacher-card reveal';
        div.innerHTML =
          '<div class="teacher-avatar"><img src="' + t.photo + '" alt="' + escapeAttr(t.name) + ' portrait" loading="lazy"></div>' +
          '<div class="teacher-name">' + escapeHtml(t.name) + '</div>' +
          '<div class="teacher-title">' + escapeHtml(t.title) + '</div>' +
          '<p class="teacher-desc">' + escapeHtml(t.desc) + '</p>';
        container.appendChild(div);
      });
      observeReveal(container);
    }
  }

  function renderContact(data) {
    // Info list items
    var infoContainer = document.querySelector('[data-content="contact.info_list"]');
    if (infoContainer) {
      infoContainer.innerHTML =
        '<div class="info-item"><span class="info-icon">📍</span><div class="info-text"><strong>地址</strong><a href="' + escapeAttr(data.address_link) + '" target="_blank" rel="noopener">' + escapeHtml(data.address) + '</a></div></div>' +
        '<div class="info-item"><span class="info-icon">📞</span><div class="info-text"><strong>電話</strong><a href="' + escapeAttr(data.phone_link) + '">' + escapeHtml(data.phone) + '</a></div></div>' +
        '<div class="info-item"><span class="info-icon">🕐</span><div class="info-text"><strong>營業時間</strong><span>' + data.hours + '</span></div></div>' +
        '<div class="info-item"><span class="info-icon">💰</span><div class="info-text"><strong>學費</strong><span>' + escapeHtml(data.tuition) + '</span></div></div>';
    }

    // Map embed
    var mapIframe = document.querySelector('[data-content="contact.map_embed"]');
    if (mapIframe) mapIframe.src = data.map_embed_url;

    // Map overlay link
    var mapOverlay = document.querySelector('[data-content="contact.map_overlay_link"]');
    if (mapOverlay) mapOverlay.href = data.address_link;

    // LINE QR
    var lineImg = document.querySelector('[data-content="contact.line_qr"]');
    if (lineImg) lineImg.src = data.line_qr;
    var lineLink = document.querySelector('[data-content="contact.line_link"]');
    if (lineLink) lineLink.href = data.line_link;
    var lineId = document.querySelector('[data-content="contact.line_id"]');
    if (lineId) lineId.textContent = data.line_id;

    // Footer contact details
    var footerAddress = document.querySelector('[data-content="contact.footer_address"]');
    if (footerAddress) { footerAddress.innerHTML = '<a href="' + escapeAttr(data.address_link) + '" target="_blank" rel="noopener">' + data.address.replace(' ', '<br>') + '</a>'; }
    var footerPhone = document.querySelector('[data-content="contact.footer_phone"]');
    if (footerPhone) footerPhone.innerHTML = '<a href="' + escapeAttr(data.phone_link) + '">' + escapeHtml(data.phone) + '</a>';
    var footerHours = document.querySelector('[data-content="contact.footer_hours"]');
    if (footerHours) footerHours.innerHTML = data.hours;
    var footerFacebook = document.querySelector('[data-content="contact.footer_facebook"]');
    if (footerFacebook) footerFacebook.innerHTML = '<a href="' + escapeAttr(data.facebook_link) + '" target="_blank" rel="noopener">Facebook 粉絲專頁</a>';

    // Footer LINE card
    var footerLineImg = document.querySelector('[data-content="contact.footer_line_qr"]');
    if (footerLineImg) footerLineImg.src = data.line_qr;
    var footerLineLink = document.querySelector('[data-content="contact.footer_line_link"]');
    if (footerLineLink) footerLineLink.href = data.line_link;
    var footerLineId = document.querySelector('[data-content="contact.footer_line_id"]');
    if (footerLineId) footerLineId.textContent = data.line_id;

    // Footer brand address
    var brandAddress = document.querySelector('[data-content="contact.brand_address"]');
    if (brandAddress) brandAddress.textContent = data.address;

    // Stats
    var statsContainer = document.querySelector('[data-content="contact.stats"]');
    if (statsContainer && data.stats) {
      statsContainer.innerHTML = '';
      data.stats.forEach(function (s) {
        var div = document.createElement('div');
        div.className = 'reveal';
        div.innerHTML = '<div class="stat-num">' + escapeHtml(s.num) + '</div><div class="stat-label">' + escapeHtml(s.label) + '</div>';
        statsContainer.appendChild(div);
      });
      observeReveal(statsContainer);
    }
  }

  // Helpers
  function setText(selector, val) {
    var el = document.querySelector(selector);
    if (el && val !== null) el.textContent = val;
  }

  function setHTML(selector, val) {
    var el = document.querySelector(selector);
    if (el && val !== null) el.innerHTML = val;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function observeReveal(container) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    container.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
  }

  // Load all content files in parallel
  Promise.all(CONTENT_FILES.map(function (f) {
    return loadJSON('content/' + f + '.json').then(function (data) {
      switch (f) {
        case 'hero': renderHero(data); break;
        case 'features': renderFeatures(data); break;
        case 'courses': renderCourses(data); break;
        case 'teachers': renderTeachers(data); break;
        case 'contact': renderContact(data); break;
      }
    }).catch(function (err) {
      console.warn('Content loader: failed to load ' + f + '.json, using fallback HTML.', err);
    });
  }));
})();
