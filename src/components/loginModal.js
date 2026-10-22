/* Imperial Commerce Tutorials - Multi-Role Portal Authentication Modal
   Strict Confidentiality & Direct Manual Credentials Gateway
   Zero Dropdowns - 100% Manually Typewritten Credentials */

import { state } from '../state.js';
import { openMandatoryPasswordResetModal } from './passwordResetModal.js';

export function openLoginModal(initialRole = 'director', onLoginSuccess = null) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  let selectedPortalCategory = (initialRole && typeof initialRole === 'string' && initialRole.toLowerCase().includes('admin'))
    ? 'admin'
    : (initialRole && typeof initialRole === 'string' && initialRole.toLowerCase().includes('teacher'))
    ? 'teacher'
    : (initialRole && typeof initialRole === 'string' && initialRole.toLowerCase().includes('student'))
    ? 'student'
    : (initialRole && typeof initialRole === 'string' && initialRole.toLowerCase().includes('parent'))
    ? 'parent'
    : 'director';

  const portalRoles = [
    { 
      id: 'director', 
      label: 'Director Console', 
      icon: '👑', 
      desc: 'Directors Ishwari & Shrikrishna Deshmukh',
      placeholder: 'Enter Director User ID (e.g. ishwari.deshmukh, shrikrishna.deshmukh)'
    },
    { 
      id: 'admin', 
      label: 'Admin Desk', 
      icon: '🛡️', 
      desc: 'Office Administration & Accounts',
      placeholder: 'Enter Admin User ID (e.g. admin.pranav or toradmalpranav33@gmail.com)'
    },
    { 
      id: 'teacher', 
      label: 'Teaching Faculty', 
      icon: '👨‍🏫', 
      desc: 'Senior Faculty & Subject Leads',
      placeholder: 'Enter Faculty User ID (e.g. ca.ravindra, faculty.pranav, kavita.oak)'
    },
    { 
      id: 'student', 
      label: 'Student Desk', 
      icon: '🎓', 
      desc: 'Enrolled Students (10th, 11th, 12th, CA, FY BCom)',
      placeholder: 'Enter Student User ID (e.g. arush.thorat, jatin.avhad, rutuja.shekokar)'
    },
    { 
      id: 'parent', 
      label: 'Parent Connect', 
      icon: '👨‍👩‍👧', 
      desc: 'Parents & Verified Guardians',
      placeholder: 'Enter Parent User ID (e.g. parent.thorat, parent.avhad, parent.shekokar)'
    }
  ];

  function getActiveRole() {
    return portalRoles.find(r => r.id === selectedPortalCategory) || portalRoles[0];
  }

  function renderModal(preserveUserId = '') {
    const activeRole = getActiveRole();

    modalContainer.innerHTML = `
      <div class="modal-box" style="max-width: 530px; background: #ffffff; border: 1px solid #cbd5e1; border-top: 5px solid #0f2042; box-shadow: 0 25px 75px rgba(15, 32, 66, 0.28); border-radius: 14px; color: #0f172a; padding: 1.85rem;">
        
        <!-- Modal Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 1.1rem; margin-bottom: 1.25rem;">
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <div style="width: 46px; height: 46px; border-radius: 10px; background: linear-gradient(135deg, #0f2042, #1e3a8a); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.35rem; color: #ffffff; box-shadow: 0 4px 12px rgba(15,32,66,0.25);">
              🔐
            </div>
            <div>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: #0f2042; margin: 0;">Secure Portal Sign In</h3>
              <div style="font-size: 0.82rem; color: #64748b; font-weight: 500;">Imperial Commerce Tutorials • Confidential Gateway</div>
            </div>
          </div>
          <button id="close-login-btn" style="background: none; border: none; color: #64748b; font-size: 1.5rem; cursor: pointer; padding: 0.25rem 0.5rem; line-height: 1;">✕</button>
        </div>

        <!-- Portal Role Selector Tabs -->
        <div style="margin-bottom: 1.25rem;">
          <div style="font-size: 0.74rem; text-transform: uppercase; letter-spacing: 0.06em; color: #475569; margin-bottom: 0.5rem; font-weight: 800;">
            SELECT TARGET PORTAL:
          </div>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.4rem;">
            ${portalRoles.map(r => {
              const isSelected = r.id === selectedPortalCategory;
              return `
                <button 
                  type="button" 
                  class="portal-category-tab-btn" 
                  data-role="${r.id}"
                  title="${r.desc}"
                  style="padding: 0.55rem 0.25rem; font-size: 0.75rem; border-radius: 8px; border: 1.5px solid ${isSelected ? '#0f2042' : '#cbd5e1'}; background: ${isSelected ? '#0f2042' : '#f8fafc'}; color: ${isSelected ? '#ffffff' : '#0f172a'}; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 0.25rem; transition: all 0.18s ease; font-weight: ${isSelected ? '700' : '600'};"
                >
                  <span style="font-size: 1.15rem;">${r.icon}</span>
                  <span style="white-space: nowrap; font-size: 0.72rem;">${r.label.split(' ')[0]}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Login Form: Strictly Manual Typewritten Input (Zero Dropdowns) -->
        <form id="portal-login-form">
          
          <!-- Clean Manual User ID Input -->
          <div class="form-group" style="margin-bottom: 1.15rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <label for="login-userid-input" style="font-size: 0.85rem; font-weight: 700; color: #0f2042; margin: 0;">
                User ID / Registered Email / Mobile <span style="color: #b91c1c;">*</span>
              </label>
              <span id="role-pill-badge" style="font-size: 0.72rem; background: #e0f2fe; color: #0369a1; padding: 0.15rem 0.5rem; border-radius: 12px; font-weight: 700;">
                ${activeRole.label}
              </span>
            </div>
            <div style="position: relative;">
              <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 1rem; color: #64748b; pointer-events: none;">👤</span>
              <input 
                type="text" 
                id="login-userid-input" 
                class="form-control" 
                placeholder="${activeRole.placeholder}"
                value="${preserveUserId}"
                style="width: 100%; padding: 0.72rem 0.85rem 0.72rem 2.45rem; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; color: #0f172a; font-size: 0.92rem; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; box-sizing: border-box;" 
                required 
                autocomplete="username"
                autofocus
                spellcheck="false"
              />
            </div>
            <div id="login-role-hint" style="font-size: 0.75rem; color: #64748b; margin-top: 0.4rem; display: flex; align-items: center; gap: 0.35rem;">
              <span>ℹ️</span>
              <span>${activeRole.desc} • Type your credentials manually</span>
            </div>
          </div>

          <!-- Password Field -->
          <div class="form-group" style="margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <label for="login-password-input" style="font-size: 0.85rem; font-weight: 700; color: #0f2042; margin: 0;">
                Confidential Password <span style="color: #b91c1c;">*</span>
              </label>
              <span style="font-size: 0.74rem; color: #64748b; font-weight: 500;">
                🔒 Authorized Personnel Only
              </span>
            </div>
            <div style="position: relative;">
              <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 1rem; color: #64748b; pointer-events: none;">🔑</span>
              <input 
                type="password" 
                id="login-password-input" 
                class="form-control" 
                placeholder="Enter your confidential password" 
                style="width: 100%; padding: 0.72rem 2.6rem 0.72rem 2.45rem; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; color: #0f172a; font-size: 0.95rem; font-family: monospace; box-sizing: border-box;"
                required 
                autocomplete="current-password"
              />
              <button 
                type="button" 
                id="toggle-pwd-btn" 
                style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #64748b; cursor: pointer; font-size: 1rem; padding: 4px;"
                title="Show/Hide Password"
              >
                👁️
              </button>
            </div>
          </div>

          <!-- Error Alert Box -->
          <div id="login-error-msg" style="display: none; padding: 0.65rem 0.85rem; border-radius: 6px; background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 0.84rem; font-weight: 600; margin-bottom: 1rem;">
          </div>

          <!-- Action Buttons -->
          <div style="display: flex; gap: 0.75rem; justify-content: flex-end; border-top: 1px solid #e2e8f0; padding-top: 1.1rem;">
            <button 
              type="button" 
              id="cancel-login-btn" 
              class="btn btn-secondary" 
              style="padding: 0.65rem 1.25rem; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; color: #334155; font-weight: 600; cursor: pointer;"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              id="submit-login-btn" 
              class="btn btn-primary" 
              style="padding: 0.65rem 1.75rem; background: linear-gradient(135deg, #0f2042, #1e3a8a); color: #ffffff; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 15px rgba(15,32,66,0.25);"
            >
              Sign In to Portal →
            </button>
          </div>
        </form>
      </div>
    `;

    attachEvents(preserveUserId);
  }

  function attachEvents(preserveUserId = '') {
    const userIdInput = modalContainer.querySelector('#login-userid-input');
    const pwdInput = modalContainer.querySelector('#login-password-input');
    const toggleBtn = modalContainer.querySelector('#toggle-pwd-btn');
    const errorBox = modalContainer.querySelector('#login-error-msg');

    // Portal role selector tabs: switch visual mode while preserving typed text
    modalContainer.querySelectorAll('.portal-category-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedPortalCategory = btn.getAttribute('data-role');
        const currentTyped = userIdInput ? userIdInput.value : '';
        renderModal(currentTyped);
      });
    });

    // Toggle password visibility
    if (toggleBtn && pwdInput) {
      toggleBtn.addEventListener('click', () => {
        if (pwdInput.type === 'password') {
          pwdInput.type = 'text';
          toggleBtn.textContent = '🔒';
        } else {
          pwdInput.type = 'password';
          toggleBtn.textContent = '👁️';
        }
      });
    }

    // Close modal handlers
    const closeModal = () => {
      modalContainer.classList.add('hidden');
      modalContainer.innerHTML = '';
    };

    modalContainer.querySelector('#close-login-btn').addEventListener('click', closeModal);
    modalContainer.querySelector('#cancel-login-btn').addEventListener('click', closeModal);

    // Form submit: validates manual typewritten credentials
    modalContainer.querySelector('#portal-login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const identifier = userIdInput ? userIdInput.value.trim() : '';
      const password = pwdInput ? pwdInput.value.trim() : '';

      if (!identifier) {
        errorBox.textContent = 'Please enter your User ID, registered email, or mobile number.';
        errorBox.style.display = 'block';
        if (userIdInput) userIdInput.focus();
        return;
      }

      if (!password) {
        errorBox.textContent = 'Please enter your confidential password.';
        errorBox.style.display = 'block';
        if (pwdInput) pwdInput.focus();
        return;
      }

      const res = state.login(identifier, password);
      if (!res.success) {
        errorBox.textContent = res.message;
        errorBox.style.display = 'block';
        return;
      }

      // Check if Director requires mandatory first-time password reset
      if (res.requiresPasswordReset) {
        closeModal();
        openMandatoryPasswordResetModal(res.user, null, (updatedDirector) => {
          if (onLoginSuccess) {
            onLoginSuccess(updatedDirector);
          }
        });
        return;
      }

      closeModal();
      if (onLoginSuccess) {
        onLoginSuccess(res.user);
      }
    });

    // Autofocus on the User ID input
    setTimeout(() => {
      if (userIdInput && !preserveUserId) {
        userIdInput.focus();
      }
    }, 60);
  }

  renderModal();
  modalContainer.classList.remove('hidden');
}
