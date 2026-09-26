// =============================================
// AUTHENTICATION HANDLERS
// =============================================

function initAuth() {
  // LOGIN FORM
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.onsubmit = (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      const alert = document.getElementById('login-alert');

      if (!email || !password) {
        showAlert(alert, 'الرجاء ملء جميع الحقول', 'error');
        return;
      }

      const result = State.loginUser(email, password);
      if (!result.ok) {
        showAlert(alert, result.msg, 'error');
        return;
      }

      State.setCurrentUser(result.user);
      UI.toast('مرحباً ' + result.user.name + '! 👋', 'success');
      loginForm.reset();

      if (result.user.role === 'admin') {
        Router.go('page-admin');
      } else {
        Router.go('page-dashboard');
      }
    };
  }

  // REGISTER FORM
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = document.getElementById('reg-password').value;
      const confirm = document.getElementById('reg-confirm').value;
      const alert = document.getElementById('register-alert');

      if (!name || !email || !password || !confirm) {
        showAlert(alert, 'الرجاء ملء جميع الحقول', 'error');
        return;
      }
      if (password.length < 6) {
        showAlert(alert, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error');
        return;
      }
      if (password !== confirm) {
        showAlert(alert, 'كلمتا المرور غير متطابقتين', 'error');
        return;
      }

      const result = State.registerUser({ name, email, password });
      if (!result.ok) {
        showAlert(alert, result.msg, 'error');
        return;
      }

      State.setCurrentUser(result.user);
      UI.toast('مرحباً ' + name + '! تم التسجيل بنجاح 🎉', 'success');
      // Save to Firebase
      if (typeof saveUserToFirebase === 'function') saveUserToFirebase(result.user);
      registerForm.reset();
      Router.go('page-dashboard');
    };
  }

  // FORGOT PASSWORD FORM
  const forgotForm = document.getElementById('forgot-form');
  if (forgotForm) {
    forgotForm.onsubmit = (e) => {
      e.preventDefault();
      const email = document.getElementById('forgot-email').value.trim();
      const alertEl = document.getElementById('forgot-alert');
      const users = State.getUsers();
      const user = users.find(u => u.email === email);

      if (!user) {
        showAlert(alertEl, 'لم يتم العثور على حساب بهذا البريد الإلكتروني', 'error');
        return;
      }

      showAlert(alertEl, 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني (ميزة قيد التطوير)', 'success');
    };
  }
}

function showAlert(el, msg, type) {
  if (!el) return;
  el.className = `alert alert-${type} show`;
  el.innerHTML = (type === 'error' ? '⚠️ ' : '✅ ') + msg;
  setTimeout(() => el.classList.remove('show'), 5000);
}

function logout() {
  State.logout();
  UI.toast('تم تسجيل الخروج', 'info');
  Router.go('page-home');
}
