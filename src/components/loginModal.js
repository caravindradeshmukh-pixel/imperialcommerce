/* Imperial Commerce Tutorials - Multi-Role Portal Authentication Modal
   Strict Confidentiality & Role Gateway */

import { state } from '../state.js';
import { openMandatoryPasswordResetModal } from './passwordResetModal.js';

export function openLoginModal(initialRole = 'director', onLoginSuccess = null) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const userAccounts = state.getUserAccounts ? state.getUserAccounts() : [];

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
    { id: 'director', label: 'Director Console', icon: '👑', desc: 'Directors Ishwari & Shrikrishna Deshmukh' },
    { id: 'admin', label: 'Admin Desk', icon: '🛡️', desc: 'Office Administration & Accounts' },
    { id: 'teacher', label: 'Teaching Faculty', icon: '👨‍🏫', desc: 'Class Portions & Honorarium' },
    { id: 'student', label: 'Student Desk', icon: '🎓', desc: 'Timetable, Notes & Tests' },
    { id: 'parent', label: 'Parent Connect', icon: '👨‍👩‍👧', desc: 'Attendance & Fee Receipts' }
  ];

  function renderModal() {
    const filteredAccounts = userAccounts.filter(u => u.role === selectedPortalCategory);

    modalContainer.innerHTML = `
      <div class="modal-box" style="max-width: 540px; background: #ffffff; border: 1px solid #cbd5e1; border-top: 5px solid #0f2042; box-shadow: 0 25px 75px rgba(15, 32, 66, 0.28); border-radius: 14px; color: #0f172a; padding: 1.85rem;">
        
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
            SELECT YOUR PORTAL ROLE:
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(95px, 1fr)); gap: 0.4rem;">
            ${portalRoles.map(r => {
              const isSelected = r.id === selectedPortalCategory;
              return `
                <button 
                  type="button" 
                  class="portal-category-tab-btn" 
                  data-role="${r.id}"
                  style="padding: 0.55rem 0.4rem; font-size: 0.76rem; border-radius: 8px; border: 1px solid ${isSelected ? '#0f2042' : '#cbd5e1'}; background: ${isSelected ? '#0f2042' : '#f8fafc'}; color: ${isSelected ? '#ffffff' : '#0f172a'}; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 0.25rem; transition: all 0.18s ease; font-weight: ${isSelected ? '700' : '600'};"
                >
                  <span style="font-size: 1.1rem;">${r.icon}</span>
                  <span style="white-space: nowrap;">${r.label.split(' ')[0]}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Login Form -->
        <form id="portal-login-form">
          
          <!-- Select Profile / User ID -->
          <div class="form-group" style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #0f2042; margin-bottom: 0.4rem;">
              Select Account or Enter User ID <span style="color: #b91c1c;">*</span>
            </label>
            <select id="login-userid-select" class="form-control" style="width: 100%; padding: 0.72rem 0.85rem; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; color: #0f172a; font-size: 0.9rem; font-weight: 600;">
              ${filteredAccounts.map(u => `
                <option value="${u.userId}">${u.name} — User ID: ${u.userId}</option>
              `).join('')}
              <option value="__custom__">✍️ Enter Other User ID / Email Manually...</option>
            </select>
          </div>

          <!-- Manual User ID override (shown if custom chosen) -->
          <div class="form-group" id="custom-userid-group" style="display: none; margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.8rem; font-weight: 600; color: #475569; margin-bottom: 0.3rem;">
              Manual User ID / Email / Phone
            </label>
            <input 
              type="text" 
              id="login-custom-id" 
              class="form-control" 
              placeholder="e.g. ishwari.deshmukh or your mobile number"
              style="width: 100%; padding: 0.65rem 0.75rem; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; color: #0f172a; font-size: 0.88rem; font-family: monospace;"
            />
          </div>

          <!-- Password Field -->
          <div class="form-group" style="margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <label style="font-size: 0.85rem; font-weight: 700; color: #0f2042;">
                Confidential Password <span style="color: #b91c1c;">*</span>
              </label>
              <span style="font-size: 0.74rem; color: #64748b; font-weight: 500;">
                🔒 Authorized Personnel Only
              </span>
            </div>
            <div style="position: relative;">
              <input 
                type="password" 
                id="login-password-input" 
                class="form-control" 
                value="" 
                placeholder="Enter your confidential password" 
                style="width: 100%; padding: 0.72rem 0.85rem; padding-right: 2.5rem; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; color: #0f172a; font-size: 0.95rem; font-family: monospace;"
                required 
                autocomplete="current-password"
              />
              <button 
                type="button" 
                id="toggle-pwd-btn" 
                style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #64748b; cursor: pointer; font-size: 1rem;"
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

    attachEvents();
  }

  function attachEvents() {
    // Portal role selector
    modalContainer.querySelectorAll('.portal-category-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedPortalCategory = btn.getAttribute('data-role');
        renderModal();
      });
    });

    const userSelect = modalContainer.querySelector('#login-userid-select');
    const customGroup = modalContainer.querySelector('#custom-userid-group');
    const customInput = modalContainer.querySelector('#login-custom-id');

    if (userSelect && customGroup) {
      userSelect.addEventListener('change', () => {
        if (userSelect.value === '__custom__') {
          customGroup.style.display = 'block';
          customInput.focus();
        } else {
          customGroup.style.display = 'none';
        }
      });
    }

    // Toggle password
    const pwdInput = modalContainer.querySelector('#login-password-input');
    const toggleBtn = modalContainer.querySelector('#toggle-pwd-btn');
    toggleBtn.addEventListener('click', () => {
      if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        toggleBtn.textContent = '🔒';
      } else {
        pwdInput.type = 'password';
        toggleBtn.textContent = '👁️';
      }
    });

    // Close handlers
    const closeModal = () => {
      modalContainer.classList.add('hidden');
      modalContainer.innerHTML = '';
    };

    modalContainer.querySelector('#close-login-btn').addEventListener('click', closeModal);
    modalContainer.querySelector('#cancel-login-btn').addEventListener('click', closeModal);

    // Form submit
    modalContainer.querySelector('#portal-login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const errorBox = modalContainer.querySelector('#login-error-msg');
      const password = pwdInput.value;

      let identifier = userSelect ? userSelect.value : '';
      if (identifier === '__custom__') {
        identifier = customInput.value.trim();
      }

      if (!identifier) {
        errorBox.textContent = 'Please select an account or enter your User ID.';
        errorBox.style.display = 'block';
        return;
      }

      if (!password) {
        errorBox.textContent = 'Please enter your password.';
        errorBox.style.display = 'block';
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
  }

  renderModal();
  modalContainer.classList.remove('hidden');
}
