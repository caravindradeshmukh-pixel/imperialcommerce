/* Imperial Commerce Tutorials, Nashik - Core Bootstrapper */

import { state } from './state.js';
import { renderNavbar } from './components/navbar.js';
import { renderPublicSite } from './components/publicSite.js';
import { renderDirectorPortal } from './components/directorPortal.js';
import { renderAdminPortal } from './components/adminPortal.js';
import { renderTeacherPortal } from './components/teacherPortal.js';
import { renderStudentPortal } from './components/studentPortal.js';
import { renderParentPortal } from './components/parentPortal.js';

// Sync data-theme attribute immediately on root
if (typeof document !== 'undefined' && document.documentElement) {
  document.documentElement.setAttribute('data-theme', state.theme);
}

// Global Toast Notification System
export function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = `toast-item ${type}`;

  const icon = type === 'success' ? '✓' : type === 'warning' ? '⚠️' : 'ℹ️';

  toast.innerHTML = `
    <span style="font-weight: 800; font-size: 1.1rem;">${icon}</span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4200);
}

function renderApp() {
  const navContainer = document.getElementById('role-dock-container');
  const appRoot = document.getElementById('app-root');

  // Render navigation dock
  renderNavbar(navContainer);

  // Strict Confidentiality Gate: Never render confidential portals if unauthenticated
  if (state.currentRole !== 'public' && !state.currentUser) {
    state.currentRole = 'public';
    renderPublicSite(appRoot, showToast);
    return;
  }

  // If Director is logged in but has not yet reset initial password, trigger mandatory reset modal
  if (state.currentUser && state.currentUser.role === 'director' && state.currentUser.mustResetPassword) {
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer && modalContainer.classList.contains('hidden')) {
      import('./components/passwordResetModal.js').then(({ openMandatoryPasswordResetModal }) => {
        openMandatoryPasswordResetModal(state.currentUser, showToast, () => {
          renderApp();
        });
      });
    }
  }

  // Render active role view
  switch (state.currentRole) {
    case 'public':
      renderPublicSite(appRoot, showToast);
      break;
    case 'director':
      renderDirectorPortal(appRoot, showToast);
      break;
    case 'admin':
      renderAdminPortal(appRoot, showToast);
      break;
    case 'teacher':
      renderTeacherPortal(appRoot, showToast);
      break;
    case 'student':
      renderStudentPortal(appRoot, showToast);
      break;
    case 'parent':
      renderParentPortal(appRoot, showToast);
      break;
    default:
      renderPublicSite(appRoot, showToast);
      break;
  }
}

// Global modal backdrop close listener
const modalContainer = document.getElementById('modal-container');
if (modalContainer) {
  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
      modalContainer.classList.add('hidden');
    }
  });
}

// Subscribe to state updates
state.subscribe(() => {
  renderApp();
});

// Support URL query parameters with strict security validation
const urlParams = new URLSearchParams(window.location.search);
const queryTheme = urlParams.get('theme');
if (queryTheme === 'light' || queryTheme === 'dark') {
  state.setTheme(queryTheme);
}

const queryRole = urlParams.get('role');
if (queryRole) {
  if (queryRole === 'recruitment' || queryRole === 'careers') {
    state.currentRole = 'public';
    state.currentPublicTab = 'recruitment';
  } else if (state.currentUser && state.canAccessRole(queryRole)) {
    state.currentRole = queryRole;
  } else {
    // Unauthenticated attempt to access private portal: Keep public, open login modal
    state.currentRole = 'public';
    setTimeout(() => {
      import('./components/loginModal.js').then(({ openLoginModal }) => {
        openLoginModal(queryRole);
      });
    }, 300);
  }
}

const queryTab = urlParams.get('tab');
if (queryTab) {
  if (['recruitment', 'careers', 'join-team', 'join'].includes(queryTab)) {
    state.currentRole = 'public';
    state.currentPublicTab = 'recruitment';
  } else if (['overview', 'courses', 'branches', 'toppers'].includes(queryTab)) {
    state.currentRole = 'public';
    state.currentPublicTab = queryTab;
  } else if (state.currentUser) {
    if (state.currentRole === 'director') {
      state.currentDirectorTab = queryTab;
    } else if (state.currentRole === 'admin') {
      state.currentAdminTab = queryTab;
    } else if (state.currentRole === 'student') {
      state.currentStudentTab = queryTab;
    } else if (state.currentRole === 'teacher') {
      state.currentTeacherTab = queryTab;
    }
  }
}

const queryStudent = urlParams.get('student');
if (queryStudent) {
  state.currentStudentId = queryStudent;
}

const queryWard = urlParams.get('ward');
if (queryWard) {
  state.currentParentStudentId = queryWard;
}

const queryVoucher = urlParams.get('voucher');
if (queryVoucher) {
  setTimeout(() => {
    const v = state.expenses.find(e => e.voucherNo === queryVoucher);
    if (v) {
      const modalContainer = document.getElementById('modal-container');
      if (modalContainer) {
        import('./components/voucherModal.js').then(({ openVoucherModal }) => {
          openVoucherModal(v, modalContainer);
        });
      }
    }
  }, 250);
}

const queryPay = urlParams.get('pay');
if (queryPay) {
  setTimeout(() => {
    const s = state.students.find(item => item.id === (queryWard || queryPay)) || state.students[1] || state.students[0];
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer && s) {
      import('./components/qrPayModal.js').then(({ openQRPayModal }) => {
        openQRPayModal(s, modalContainer, showToast);
      });
    }
  }, 300);
}

// Initial boot
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});
