// =============================================
// ROUTER & PAGE MANAGER
// =============================================

const Router = {
  currentPage: null,
  currentLectureId: null,

  pages: [
    'page-home',
    'page-login',
    'page-register',
    'page-forgot',
    'page-dashboard',
    'page-curriculum',
    'page-lecture',
    'page-tasks',
    'page-final-project',
    'page-git',
    'page-materials',
    'page-support',
    'page-admin'
  ],

  go(pageId, params = {}) {
    // Auth guard — only truly personal pages require login
    const protectedPages = ['page-dashboard','page-tasks','page-final-project'];
    const adminPages = ['page-admin'];
    const user = State.getCurrentUser();

    if (protectedPages.includes(pageId) && !user) {
      this.go('page-login');
      return;
    }
    if (adminPages.includes(pageId)) {
      if (!user || user.role !== 'admin') {
        this.go('page-login');
        return;
      }
    }

    // Hide all pages
    this.pages.forEach(p => {
      const el = document.getElementById(p);
      if (el) el.classList.remove('active');
    });

    // Show target
    const target = document.getElementById(pageId);
    if (target) {
      target.classList.add('active');
      this.currentPage = pageId;
      window.scrollTo(0, 0);
    }

    // Store lecture id
    if (params.lectureId) this.currentLectureId = params.lectureId;

    // Run page-specific init
    if (typeof PageInits[pageId] === 'function') {
      PageInits[pageId](params);
    }

    // Update navbar
    UI.updateNavbar();
    UI.closeMobileMenu();
  }
};

// =============================================
// UI HELPERS
// =============================================
const UI = {
  toast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
    container.appendChild(t);
    setTimeout(() => {
      t.style.animation = 'toastIn .3s ease reverse';
      setTimeout(() => t.remove(), 300);
    }, 3500);
  },

  updateNavbar() {
    const user = State.getCurrentUser();
    const navGuest = document.getElementById('nav-guest');
    const navUser = document.getElementById('nav-user');
    const navAdmin = document.getElementById('nav-admin-link');
    const navUserName = document.getElementById('nav-user-name');
    const navAvatar = document.getElementById('nav-avatar');

    if (user) {
      if (navGuest) navGuest.classList.add('hidden');
      if (navUser) navUser.classList.remove('hidden');
      if (navUserName) navUserName.textContent = user.name.split(' ')[0];
      if (navAvatar) navAvatar.textContent = user.name[0].toUpperCase();
      if (navAdmin) {
        navAdmin.style.display = user.role === 'admin' ? '' : 'none';
      }
    } else {
      if (navGuest) navGuest.classList.remove('hidden');
      if (navUser) navUser.classList.add('hidden');
      if (navAdmin) navAdmin.style.display = 'none';
    }
  },

  closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const ham = document.getElementById('hamburger');
    if (menu) menu.classList.remove('open');
    if (ham) ham.classList.remove('open');
  },

  modal(html) {
    const overlay = document.getElementById('modal-overlay');
    const box = document.getElementById('modal-box');
    if (!overlay || !box) return;
    box.innerHTML = html;
    overlay.classList.add('open');
    box.querySelector('.modal-close')?.addEventListener('click', () => this.closeModal());
    overlay.addEventListener('click', e => { if (e.target === overlay) this.closeModal(); });
  },

  closeModal() {
    document.getElementById('modal-overlay')?.classList.remove('open');
  },

  progressBar(pct, gold = false) {
    return `<div class="progress-bar-wrap"><div class="progress-bar-fill ${gold ? 'gold' : ''}" style="width:${pct}%"></div></div>`;
  },

  lectureTag(tag) {
    const map = { html: 'HTML', css: 'CSS', js: 'JavaScript', git: 'Git & GitHub', deploy: 'Deployment' };
    return `<span class="lecture-tag ${tag}">${map[tag] || tag}</span>`;
  },

  statusDot(userId, lectureId) {
    const prog = State.getProgress(userId);
    if (prog[lectureId]) return '<span class="status-dot completed"></span> مكتملة';
    return '<span class="status-dot"></span> لم تبدأ';
  }
};

// =============================================
// SCROLL REVEAL
// =============================================
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

// =============================================
// PAGE INITIALIZERS
// =============================================
const PageInits = {};

PageInits['page-home'] = function() {
  initReveal();
};

PageInits['page-dashboard'] = function() {
  const user = State.getCurrentUser();
  if (!user) return;

  // Update sidebar user info
  const av = document.getElementById('dash-avatar');
  if (av) av.textContent = user.name[0].toUpperCase();
  const sn = document.getElementById('dash-sidebar-name');
  if (sn) sn.textContent = user.name;

  const pct = State.getProgressPct(user.id);
  const done = State.getCompletedCount(user.id);
  const remaining = COURSE_DATA.totalLectures - done;
  const prog = State.getProgress(user.id);

  // Next lecture
  let nextLecture = COURSE_DATA.lectures.find(l => !prog[l.id]);

  // Update DOM
  document.getElementById('dash-greeting-name').textContent = user.name;
  document.getElementById('dash-pct').textContent = pct + '%';
  document.getElementById('dash-done').textContent = done;
  document.getElementById('dash-remaining').textContent = remaining;
  document.getElementById('dash-total').textContent = COURSE_DATA.totalLectures;

  // Progress bar
  const pbEl = document.getElementById('dash-progress-bar');
  if (pbEl) pbEl.innerHTML = UI.progressBar(pct);

  // Sidebar progress
  const spEl = document.getElementById('sidebar-progress-bar');
  if (spEl) spEl.innerHTML = UI.progressBar(pct);
  const spPct = document.getElementById('sidebar-pct');
  if (spPct) spPct.textContent = pct + '%';

  // Next lecture button
  const contBtn = document.getElementById('continue-btn');
  if (contBtn && nextLecture) {
    contBtn.onclick = () => Router.go('page-lecture', { lectureId: nextLecture.id });
    contBtn.textContent = '▶ ' + nextLecture.title;
  } else if (contBtn) {
    contBtn.textContent = '🎉 Course Complete!';
    contBtn.disabled = true;
  }

  // Recent lectures list
  const recentEl = document.getElementById('recent-lectures-list');
  if (recentEl) {
    const recent = COURSE_DATA.lectures.slice(0, 6);
    recentEl.innerHTML = recent.map(l => {
      const isDone = prog[l.id];
      return `<div class="lecture-mini" onclick="Router.go('page-lecture',{lectureId:${l.id}})">
        <div class="lecture-mini-num ${l.tag}">${String(l.id).padStart(2,'0')}</div>
        <div class="lecture-mini-info">
          <div class="lecture-mini-title">${l.title}</div>
          <div class="lecture-mini-sub">${l.titleAr}</div>
        </div>
        ${isDone ? '<span class="check-icon">✓</span>' : ''}
      </div>`;
    }).join('');
  }

  // Pending tasks
  const tasksEl = document.getElementById('pending-tasks-list');
  if (tasksEl) {
    const pending = COURSE_DATA.lectures
      .filter(l => State.getTaskStatus(user.id, l.id) === 'pending' && prog[l.id])
      .slice(0, 4);
    if (pending.length === 0) {
      tasksEl.innerHTML = '<p style="color:var(--white-50);font-size:.82rem">لا توجد مهام معلقة 🎉</p>';
    } else {
      tasksEl.innerHTML = pending.map(l => `
        <div class="lecture-mini" onclick="Router.go('page-lecture',{lectureId:${l.id}})">
          <div class="lecture-mini-num ${l.tag}">${String(l.id).padStart(2,'0')}</div>
          <div class="lecture-mini-info">
            <div class="lecture-mini-title">${l.task.title}</div>
            <div class="lecture-mini-sub">${l.title}</div>
          </div>
          <span class="task-status-badge pending" style="font-size:.68rem;padding:2px 8px">معلقة</span>
        </div>
      `).join('');
    }
  }

  // Course completion message
  if (pct === 100) {
    const el = document.getElementById('completion-banner');
    if (el) el.classList.remove('hidden');
  }
};

PageInits['page-git'] = function() {
  const tabsEl = document.getElementById('git-tabs');
  if (tabsEl) initTabs(tabsEl);
};

PageInits['page-curriculum'] = function() {
  const user = State.getCurrentUser();
  const prog = user ? State.getProgress(user.id) : {};

  const container = document.getElementById('curriculum-list');
  if (!container) return;

  let html = '';
  let lastWeek = 0;

  COURSE_DATA.lectures.forEach(l => {
    // Skip hidden lectures for non-admin users
    const isHiddenLecture = State.isHidden('lecture', l.id);
    if (isHiddenLecture && user?.role !== 'admin') return;

    if (l.week !== lastWeek) {
      if (lastWeek !== 0) html += '</div>';
      html += `<div class="week-header"><div class="week-line"></div><div class="week-label">الأسبوع ${l.week} — Week ${l.week}</div><div class="week-line"></div></div><div class="curriculum-grid">`;
      lastWeek = l.week;
    }

    const isDone = prog[l.id];
    const isCurrent = !isDone && COURSE_DATA.lectures.filter(x => !prog[x.id] && x.id < l.id).length === 0;

    html += `
      <div class="lecture-card ${isDone ? 'completed' : ''} ${isCurrent ? 'current' : ''}"
           onclick="Router.go('page-lecture',{lectureId:${l.id}})">
        <div class="lecture-card-inner">
          <div class="lecture-num ${l.tag}">${String(l.id).padStart(2,'0')}</div>
          <div class="lecture-info">
            ${UI.lectureTag(l.tag)}
            <div class="lecture-title">${l.title}</div>
            <div class="lecture-desc">${l.titleAr}</div>
          </div>
          <div class="lecture-status">
            ${user ? UI.statusDot(user.id, l.id) : ''}
            <span style="color:var(--white-30);font-size:.75rem">${l.duration}</span>
          </div>
        </div>
      </div>`;
  });

  html += '</div>';
  container.innerHTML = html;
};

PageInits['page-lecture'] = function({ lectureId } = {}) {
  const id = lectureId || Router.currentLectureId || 1;
  const lecture = COURSE_DATA.lectures.find(l => l.id === id);
  if (!lecture) return;

  const user = State.getCurrentUser();
  const prog = user ? State.getProgress(user.id) : {};
  const isDone = user ? !!prog[id] : false;
  const taskStatus = user ? State.getTaskStatus(user.id, id) : 'pending';
  const taskSub = user ? State.getTaskSubmission(user.id, id) : null;

  // Breadcrumb
  document.getElementById('lec-breadcrumb').innerHTML =
    `<span class="breadcrumb-sep" onclick="Router.go('page-home')" style="cursor:pointer">🏠</span>
     <span class="breadcrumb-sep">›</span>
     <span onclick="Router.go('page-curriculum')" style="cursor:pointer;color:var(--electric-2)">المنهج</span>
     <span class="breadcrumb-sep">›</span>
     <span>محاضرة ${id}</span>`;

  // Title & tag
  const tagEl = document.getElementById('lec-tag');
  if (tagEl) {
    tagEl.className = `lecture-tag ${lecture.tag}`;
    tagEl.textContent = { html:'HTML', css:'CSS', js:'JavaScript', git:'Git & GitHub', deploy:'Deployment' }[lecture.tag] || lecture.tag;
  }
  document.getElementById('lec-title').textContent = lecture.title;
  document.getElementById('lec-title-ar').textContent = lecture.titleAr;
  document.getElementById('lec-duration').textContent = lecture.duration;

  // Video player
  const videoPlayer = document.getElementById('video-player');
  const videoPlaceholder = document.getElementById('video-placeholder');
  const videoIframe = document.getElementById('video-iframe');
  const videoPlayBtn = document.getElementById('video-play-btn');
  const videoLabel = document.getElementById('video-label');

  if (lecture.videoUrl) {
    if (videoPlaceholder) videoPlaceholder.style.display = 'none';
    if (videoPlayer) videoPlayer.style.display = 'block';
    if (videoIframe) videoIframe.src = lecture.videoUrl;
  } else {
    if (videoPlaceholder) videoPlaceholder.style.display = 'flex';
    if (videoPlayer) videoPlayer.style.display = 'none';
    if (videoLabel) videoLabel.textContent = '📹 سيتم إضافة الفيديو قريباً — Video coming soon';
  }
  document.getElementById('lec-desc').innerHTML = lecture.content.replace(/\n/g,'<br>');

  // Materials button
  const matDownload = document.getElementById('lec-material-download');
  if (matDownload) {
    if (lecture.materialUrl) {
      const previewUrl = lecture.materialUrl.replace('/view', '/preview');
      matDownload.innerHTML = `
        <button class="btn btn-gold btn-full" style="padding:18px;font-size:1rem;border-radius:var(--radius-lg)"
          onclick="openMaterial('${previewUrl}', '${lecture.title}')">
          📚 Materials
        </button>`;
    } else {
      matDownload.innerHTML = `
        <button class="btn btn-ghost btn-full" style="padding:18px;font-size:1rem;border-radius:var(--radius-lg)" disabled>
          📚 Materials — Coming Soon
        </button>`;
    }
  }

  // Objectives
  document.getElementById('lec-objectives').innerHTML = lecture.objectives
    .map(o => `<div class="objective-item"><span class="objective-check">◆</span><span>${o}</span></div>`)
    .join('');

  // Code example
  document.getElementById('lec-code-lang').textContent = lecture.codeExample.lang;
  document.getElementById('lec-code-content').textContent = lecture.codeExample.code;

  // Materials
  document.getElementById('lec-materials').innerHTML = lecture.materials.map(m => {
    const icons = { pdf: '📄', code: '💻', zip: '📦', link: '🔗' };
    return `<div class="material-card">
      <div class="material-icon ${m.type}">${icons[m.type] || '📎'}</div>
      <div class="material-info">
        <h4>${m.name}</h4>
        <p>${m.size}</p>
      </div>
    </div>`;
  }).join('');

  // Completion button
  const markBtn = document.getElementById('mark-complete-btn');
  if (markBtn) {
    if (isDone) {
      markBtn.textContent = '✓ مكتملة';
      markBtn.classList.remove('btn-primary');
      markBtn.classList.add('btn-success');
      markBtn.disabled = true;
    } else {
      markBtn.textContent = '✓ اضغط لتأشير كمكتملة';
      markBtn.classList.add('btn-primary');
      markBtn.classList.remove('btn-success');
      markBtn.disabled = false;
      markBtn.onclick = () => {
        if (!user) { Router.go('page-login'); return; }
        State.markLectureComplete(user.id, id);
        UI.toast('تم تأشير المحاضرة كمكتملة! 🎉', 'success');
        PageInits['page-lecture']({ lectureId: id });
      };
    }
  }

  // Task section — hide if admin marked it hidden
  const taskSidebarEl = document.querySelector('.task-card');
  if (taskSidebarEl) {
    if (State.isHidden('task', id)) {
      taskSidebarEl.innerHTML = `<div style="text-align:center;padding:24px;color:var(--white-50)">
        <div style="font-size:2rem;margin-bottom:8px">🔒</div>
        <div style="font-size:.85rem">التاسك غير متاح حالياً</div>
      </div>`;
    } else {
      document.getElementById('task-title').textContent = lecture.task.title;
      document.getElementById('task-title-ar').textContent = lecture.task.titleAr;
      document.getElementById('task-desc').textContent = lecture.task.desc;
      document.getElementById('task-requirements').innerHTML = lecture.task.requirements
        .map(r => `<div class="task-req-item"><span class="req-bullet">▸</span><span>${r}</span></div>`)
        .join('');
    }
  }

  // Task status badge
  const statusBadge = document.getElementById('task-status-badge');
  if (statusBadge) {
    const labels = { pending: '⏳ معلقة', submitted: '📤 مُقدَّمة', completed: '✅ مكتملة' };
    statusBadge.className = `task-status-badge ${taskStatus}`;
    statusBadge.textContent = labels[taskStatus];
  }

  // Task submission form
  const submitForm = document.getElementById('task-submit-form');
  if (submitForm && taskSub) {
    document.getElementById('task-url').value = taskSub.url || '';
    document.getElementById('task-note').value = taskSub.note || '';
  }

  // Submit task button
  const submitBtn = document.getElementById('submit-task-btn');
  if (submitBtn) {
    submitBtn.onclick = () => {
      if (!user) { Router.go('page-login'); return; }
      const url = document.getElementById('task-url').value.trim();
      const note = document.getElementById('task-note').value.trim();
      State.submitTask(user.id, id, url, note);
      UI.toast('تم تسليم المهمة بنجاح! 📤', 'success');
      PageInits['page-lecture']({ lectureId: id });
    };
  }

  // Prev / Next
  const prevBtn = document.getElementById('prev-lecture-btn');
  const nextBtn = document.getElementById('next-lecture-btn');
  if (prevBtn) {
    if (id > 1) {
      prevBtn.disabled = false;
      prevBtn.onclick = () => Router.go('page-lecture', { lectureId: id - 1 });
    } else {
      prevBtn.disabled = true;
    }
  }
  if (nextBtn) {
    if (id < COURSE_DATA.totalLectures) {
      nextBtn.disabled = false;
      nextBtn.onclick = () => Router.go('page-lecture', { lectureId: id + 1 });
    } else {
      nextBtn.disabled = true;
      nextBtn.textContent = 'النهاية 🎉';
    }
  }
};

PageInits['page-tasks'] = function() {
  const user = State.getCurrentUser();
  if (!user) return;

  const container = document.getElementById('all-tasks-list');
  if (!container) return;

  container.innerHTML = COURSE_DATA.lectures.map(l => {
    const status = State.getTaskStatus(user.id, l.id);
    const sub = State.getTaskSubmission(user.id, l.id);
    const labels = { pending: '⏳ معلقة', submitted: '📤 مُقدَّمة', completed: '✅ مكتملة' };
    return `
      <div class="card mb-12">
        <div class="d-flex align-center justify-between mb-12">
          <div class="d-flex align-center gap-12">
            <div class="lecture-mini-num ${l.tag}">${String(l.id).padStart(2,'0')}</div>
            <div>
              <div class="font-bold" style="font-size:.9rem">${l.task.title}</div>
              <div style="font-size:.78rem;color:var(--white-50)">${l.title}</div>
            </div>
          </div>
          <span class="task-status-badge ${status}">${labels[status]}</span>
        </div>
        <p style="font-size:.82rem;color:var(--white-70);margin-bottom:12px">${l.task.desc}</p>
        ${sub ? `<div style="font-size:.78rem;color:var(--electric-2);margin-bottom:8px">🔗 ${sub.url || 'لا يوجد رابط'}</div>` : ''}
        <button class="btn btn-primary btn-sm" onclick="Router.go('page-lecture',{lectureId:${l.id}})">
          ${status === 'pending' ? 'افتح المحاضرة وسلّم المهمة' : 'عرض / تعديل'}
        </button>
      </div>`;
  }).join('');
};

PageInits['page-final-project'] = function() {
  const user = State.getCurrentUser();
  const key = 'wdc_final_' + (user?.id || 'guest');
  const saved = JSON.parse(localStorage.getItem(key) || '{}');

  if (saved.githubUrl) document.getElementById('fp-github').value = saved.githubUrl;
  if (saved.liveUrl) document.getElementById('fp-live').value = saved.liveUrl;
  if (saved.notes) document.getElementById('fp-notes').value = saved.notes;

  const statusEl = document.getElementById('fp-status');
  if (statusEl && saved.submitted) {
    statusEl.innerHTML = `<span class="task-status-badge completed">✅ تم التسليم</span>`;
  }

  document.getElementById('fp-submit-btn').onclick = () => {
    if (!user) { Router.go('page-login'); return; }
    const data = {
      githubUrl: document.getElementById('fp-github').value,
      liveUrl: document.getElementById('fp-live').value,
      notes: document.getElementById('fp-notes').value,
      submitted: true,
      date: new Date().toLocaleDateString('ar-EG')
    };
    localStorage.setItem(key, JSON.stringify(data));
    if (statusEl) statusEl.innerHTML = `<span class="task-status-badge completed">✅ تم التسليم</span>`;
    UI.toast('تم تسليم المشروع النهائي! 🎉', 'success');
  };
};

PageInits['page-materials'] = function() {
  const container = document.getElementById('materials-by-lecture');
  if (!container) return;

  container.innerHTML = COURSE_DATA.lectures.map(l => {
    const icons = { pdf: '📄', code: '💻', zip: '📦', link: '🔗' };
    return `
      <div class="mb-32">
        <div class="d-flex align-center gap-12 mb-16">
          <div class="lecture-mini-num ${l.tag}" style="width:36px;height:36px;font-size:.8rem">${String(l.id).padStart(2,'0')}</div>
          <div>
            ${UI.lectureTag(l.tag)}
            <div class="font-bold">${l.title}</div>
          </div>
        </div>
        <div class="materials-grid">
          ${l.materials.map(m => `
            <div class="material-card" onclick="UI.toast('المواد ستكون متاحة قريباً 📚','info')">
              <div class="material-icon ${m.type}">${icons[m.type] || '📎'}</div>
              <div class="material-info">
                <h4>${m.name}</h4>
                <p>${m.size}</p>
              </div>
            </div>`).join('')}
        </div>
      </div>`;
  }).join('');
};

PageInits['page-support'] = function() {
  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(q => {
    q.onclick = () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    };
  });

  // Contact form
  document.getElementById('support-form').onsubmit = e => {
    e.preventDefault();
    const data = {
      name: document.getElementById('support-name').value,
      email: document.getElementById('support-email').value,
      message: document.getElementById('support-message').value
    };
    State.addMessage(data);
    UI.toast('تم إرسال رسالتك بنجاح! سيتم الرد قريباً ✉️', 'success');
    e.target.reset();
  };
};

PageInits['page-admin'] = async function() {
  // جلب الطلاب من Firebase أولاً
  let firebaseStudents = [];
  if (typeof getStudentsFromFirebase === 'function') {
    firebaseStudents = await getStudentsFromFirebase();
  }

  // دمج طلاب Firebase مع localStorage
  const localUsers = State.getUsers();
  const allEmails = new Set(localUsers.map(u => u.email));
  const mergedStudents = [...localUsers];
  firebaseStudents.forEach(fs => {
    if (!allEmails.has(fs.email)) mergedStudents.push(fs);
  });

  const users = mergedStudents;
  const messages = State.getMessages();

  // Stats
  document.getElementById('admin-total-students').textContent = users.length;
  document.getElementById('admin-active-students').textContent = users.filter(u => Object.keys(u.progress || {}).length > 0).length;

  let totalCompleted = 0, totalSubmitted = 0;
  users.forEach(u => {
    totalCompleted += Object.values(u.progress || {}).filter(Boolean).length;
    totalSubmitted += Object.values(u.taskSubmissions || {}).length;
  });
  document.getElementById('admin-completed-lectures').textContent = totalCompleted;
  document.getElementById('admin-submitted-tasks').textContent = totalSubmitted;
  document.getElementById('admin-messages').textContent = messages.filter(m => !m.read).length;

  // Students table
  const studentsTable = document.getElementById('admin-students-tbody');
  if (studentsTable) {
    if (users.length === 0) {
      studentsTable.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--white-50);padding:32px">لا يوجد طلاب مسجلون بعد</td></tr>';
    } else {
      studentsTable.innerHTML = users.map(u => {
        const done = Object.values(u.progress || {}).filter(Boolean).length;
        const pct = Math.round((done / COURSE_DATA.totalLectures) * 100);
        return `<tr>
          <td>${u.name}</td>
          <td style="color:var(--white-50)">${u.email}</td>
          <td>${u.joinDate}</td>
          <td>
            <div style="min-width:100px">
              ${UI.progressBar(pct)}
              <div style="font-size:.72rem;color:var(--white-50);margin-top:3px">${done}/${COURSE_DATA.totalLectures} (${pct}%)</div>
            </div>
          </td>
          <td>${Object.values(u.taskSubmissions||{}).length}</td>
          <td><button class="btn btn-ghost btn-sm" onclick="showStudentDetail('${u.id}')">عرض</button></td>
        </tr>`;
      }).join('');
    }
  }

  // Tasks table
  const tasksTable = document.getElementById('admin-tasks-tbody');
  if (tasksTable) {
    let rows = '';
    users.forEach(u => {
      Object.entries(u.taskSubmissions || {}).forEach(([lecId, sub]) => {
        const lecture = COURSE_DATA.lectures.find(l => l.id == lecId);
        const labels = { pending: '⏳ معلقة', submitted: '📤 مُقدَّمة', completed: '✅ مكتملة' };
        rows += `<tr>
          <td>${u.name}</td>
          <td>${lecture?.title || 'محاضرة ' + lecId}</td>
          <td>${sub.date}</td>
          <td><a href="${sub.url}" target="_blank" style="color:var(--electric-2)">${sub.url ? '🔗 رابط' : '—'}</a></td>
          <td><span class="badge ${sub.status === 'completed' ? 'badge-green' : sub.status === 'submitted' ? 'badge-blue' : 'badge-gold'}">${labels[sub.status]}</span></td>
          <td>
            <button class="btn btn-success btn-sm" onclick="State.updateTaskStatus('${u.id}',${lecId},'completed');UI.toast('تم تأشير المهمة كمكتملة','success');PageInits['page-admin']()">✓</button>
          </td>
        </tr>`;
      });
    });
    tasksTable.innerHTML = rows || '<tr><td colspan="6" style="text-align:center;color:var(--white-50);padding:32px">لا توجد تسليمات بعد</td></tr>';
  }

  // Messages
  const msgsEl = document.getElementById('admin-messages-list');
  if (msgsEl) {
    if (messages.length === 0) {
      msgsEl.innerHTML = '<p style="color:var(--white-50)">لا توجد رسائل</p>';
    } else {
      msgsEl.innerHTML = messages.map(m => `
        <div class="card mb-12 ${m.read ? '' : 'card-gold'}" style="border-color:${m.read ? '' : 'rgba(245,158,11,.3)'}">
          <div class="d-flex align-center justify-between mb-8">
            <div class="font-bold">${m.name} <span style="color:var(--white-50);font-weight:400">&lt;${m.email}&gt;</span></div>
            <div style="font-size:.75rem;color:var(--white-50)">${m.date} ${m.read ? '' : '<span class="badge badge-gold">جديد</span>'}</div>
          </div>
          <p style="font-size:.85rem;color:var(--white-70)">${m.message}</p>
          ${!m.read ? `<button class="btn btn-ghost btn-sm mt-16" onclick="State.markMessageRead('${m.id}');PageInits['page-admin']()">تأشير كمقروء</button>` : ''}
        </div>
      `).join('');
    }
  }

  // Tasks visibility list
  const tasksVisEl = document.getElementById('admin-tasks-visibility-list');
  if (tasksVisEl) {
    tasksVisEl.innerHTML = COURSE_DATA.lectures.map(l => {
      const isHidden = State.isHidden('task', l.id);
      return `
      <div class="lecture-mini" style="border-bottom:1px solid var(--white-05);padding:10px 0;opacity:${isHidden ? '0.45' : '1'}">
        <div class="lecture-mini-num ${l.tag}">${String(l.id).padStart(2,'0')}</div>
        <div class="lecture-mini-info">
          <div class="lecture-mini-title">${l.task.title} ${isHidden ? '<span style="color:var(--warning);font-size:.7rem">● مخفي</span>' : ''}</div>
          <div class="lecture-mini-sub">${l.title}</div>
        </div>
        <button class="btn btn-sm ${isHidden ? 'btn-success' : 'btn-ghost'}" style="${isHidden ? '' : 'border-color:rgba(245,158,11,.4);color:var(--gold)'}"
          onclick="State.toggleHidden('task',${l.id});PageInits['page-admin']();UI.toast('${isHidden ? 'تم إظهار' : 'تم إخفاء'} التاسك مؤقتاً','info')">
          ${isHidden ? '👁 إظهار' : '🙈 إخفاء'}
        </button>
      </div>`;
    }).join('');
  }
  const adminLecEl = document.getElementById('admin-lectures-list');
  if (adminLecEl) {
    adminLecEl.innerHTML = COURSE_DATA.lectures.map(l => {
      const isHidden = State.isHidden('lecture', l.id);
      return `
      <div class="lecture-mini" style="border-bottom:1px solid var(--white-05);padding:12px 0;opacity:${isHidden ? '0.45' : '1'}">
        <div class="lecture-mini-num ${l.tag}">${String(l.id).padStart(2,'0')}</div>
        <div class="lecture-mini-info">
          <div class="lecture-mini-title">${l.title} ${isHidden ? '<span style="color:var(--warning);font-size:.7rem">● مخفية</span>' : ''}</div>
          <div class="lecture-mini-sub">${l.titleAr}</div>
        </div>
        <div style="display:flex;gap:6px">
          <button class="btn btn-ghost btn-sm" onclick="Router.go('page-lecture',{lectureId:${l.id}})">عرض</button>
          <button class="btn btn-sm ${isHidden ? 'btn-success' : 'btn-ghost'}" style="${isHidden ? '' : 'border-color:rgba(245,158,11,.4);color:var(--gold)'}"
            onclick="State.toggleHidden('lecture',${l.id});PageInits['page-admin']();UI.toast('${isHidden ? 'تم إظهار' : 'تم إخفاء'} المحاضرة مؤقتاً','info')">
            ${isHidden ? '👁 إظهار' : '🙈 إخفاء'}
          </button>
        </div>
      </div>`;
    }).join('');
  }
};

function showStudentDetail(userId) {
  const user = State.getUserById(userId);
  if (!user) return;
  const done = Object.values(user.progress || {}).filter(Boolean).length;
  const pct = Math.round((done / COURSE_DATA.totalLectures) * 100);

  UI.modal(`
    <div class="modal-header">
      <div class="modal-title">تفاصيل الطالب: ${user.name}</div>
      <button class="modal-close">✕</button>
    </div>
    <div style="margin-bottom:16px">
      <div style="font-size:.85rem;color:var(--white-50);margin-bottom:4px">${user.email} | انضم: ${user.joinDate}</div>
      <div class="d-flex align-center gap-8 mb-8">
        <span>التقدم:</span><strong>${pct}%</strong>
        <span style="color:var(--white-50)">(${done}/${COURSE_DATA.totalLectures} محاضرة)</span>
      </div>
      ${UI.progressBar(pct)}
    </div>
    <div>
      <div class="font-bold mb-12" style="font-size:.85rem">المحاضرات المكتملة:</div>
      ${COURSE_DATA.lectures.map(l => {
        const done2 = user.progress?.[l.id];
        return `<div class="d-flex align-center gap-8" style="font-size:.82rem;padding:4px 0">
          ${done2 ? '✅' : '⬜'} ${String(l.id).padStart(2,'0')}. ${l.title}
        </div>`;
      }).join('')}
    </div>
  `);
}

// Tabs
function initTabs(container) {
  const btns = container.querySelectorAll('.tab-btn');
  const panels = container.querySelectorAll('.tab-panel');
  btns.forEach(btn => {
    btn.onclick = () => {
      btns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = container.querySelector('#' + btn.dataset.tab);
      if (target) target.classList.add('active');
    };
  });
}
