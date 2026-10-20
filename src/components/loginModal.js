/* Imperial Commerce Tutorials - Multi-Role Portal Authentication Modal */

import { state } from '../state.js';
import { UNIVERSAL_PASSWORD, USER_CREDENTIALS } from '../mockData.js';

export function openLoginModal(initialUserId = 'Director', onLoginSuccess = null) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const validRoles = [
    { id: 'Director', label: 'Director', icon: '👑', desc: 'Academic & Executive Administration' },
    { id: 'Admin Staff', label: 'Admin Staff', icon: '🛡️', desc: 'Receipts, Vouchers, Attendance & Alerts' },
    { id: 'Teacher', label: 'Teacher', icon: '👨‍🏫', desc: 'Notes, Homework, Exams & 60% Remuneration' },
    { id: 'Student', label: 'Student', icon: '🎓', desc: 'Notes, Homework, Leave, Exams & Marks' },
    { id: 'Parents', label: 'Parents', icon: '👨‍👩‍👧', desc: 'Attendance, Performance, Remarks & Fee UPI' }
  ];

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 520px; border: 1px solid var(--border-gold); box-shadow: 0 20px 60px rgba(0,0,0,0.85); background: #0c1424;">
      <!-- Modal Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #cfa84e, #856116); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.3rem; color: #070b14;">
            🔐
          </div>
          <div>
            <h3 style="font-size: 1.2rem; color: var(--accent-gold-light); margin: 0;">Portal Authentication</h3>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Imperial Commerce Tutorials, Nashik</div>
          </div>
        </div>
        <button id="close-login-btn" style="background: none; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer; padding: 0.25rem 0.5rem; line-height: 1;">✕</button>
      </div>

      <!-- Quick 1-Click Role Pickers -->
      <div style="margin-bottom: 1.25rem;">
        <div style="font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-gold); margin-bottom: 0.5rem; font-weight: 700;">
          Quick 1-Click Role Selector:
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
          ${validRoles.map(r => `
            <button 
              type="button" 
              class="quick-fill-btn ${r.id === initialUserId ? 'active-quick-fill' : ''}" 
              data-role-id="${r.id}"
              style="padding: 0.4rem 0.65rem; font-size: 0.78rem; border-radius: 6px; border: 1px solid var(--border-light); background: rgba(255,255,255,0.05); color: #e2e8f0; cursor: pointer; display: flex; align-items: center; gap: 0.35rem; transition: all 0.2s ease;"
            >
              <span>${r.icon}</span>
              <span style="font-weight: 600;">${r.label}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Login Form -->
      <form id="portal-login-form">
        <div class="form-group" style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-main); margin-bottom: 0.4rem;">
            User ID <span style="color: var(--accent-gold);">*</span>
          </label>
          <select id="login-userid-input" class="form-control" style="width: 100%; padding: 0.75rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 8px; color: #fff; font-size: 0.95rem;">
            ${validRoles.map(r => `
              <option value="${r.id}" ${r.id === initialUserId ? 'selected' : ''}>${r.id} - ${r.desc}</option>
            `).join('')}
          </select>
        </div>

        <div class="form-group" style="margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--text-main);">
              Password <span style="color: var(--accent-gold);">*</span>
            </label>
            <span style="font-size: 0.75rem; color: var(--accent-gold); background: rgba(207,168,78,0.12); padding: 0.15rem 0.5rem; border-radius: 4px;">
              Default: Password@123
            </span>
          </div>
          <div style="position: relative;">
            <input 
              type="password" 
              id="login-password-input" 
              class="form-control" 
              value="${UNIVERSAL_PASSWORD}" 
              placeholder="Enter Password@123" 
              style="width: 100%; padding: 0.75rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 8px; color: #fff; font-size: 0.95rem; font-family: monospace;"
              required 
            />
            <button 
              type="button" 
              id="toggle-pwd-btn" 
              style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1rem;"
              title="Show/Hide Password"
            >
              👁️
            </button>
          </div>
        </div>

        <!-- Feedback Error Box -->
        <div id="login-error-msg" style="display: none; padding: 0.65rem; border-radius: 6px; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #fca5a5; font-size: 0.82rem; margin-bottom: 1rem;">
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          <button 
            type="button" 
            id="cancel-login-btn" 
            class="btn btn-secondary" 
            style="padding: 0.65rem 1.25rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 8px; color: #cbd5e1; cursor: pointer;"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            id="submit-login-btn" 
            class="btn btn-primary" 
            style="padding: 0.65rem 1.75rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 15px rgba(207,168,78,0.35);"
          >
            Sign In to Portal →
          </button>
        </div>
      </form>
    </div>
  `;

  modalContainer.classList.remove('hidden');

  // Interactive quick-fill chips
  const quickBtns = modalContainer.querySelectorAll('.quick-fill-btn');
  const userSelect = modalContainer.querySelector('#login-userid-input');
  const pwdInput = modalContainer.querySelector('#login-password-input');
  const errorBox = modalContainer.querySelector('#login-error-msg');

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const roleId = btn.getAttribute('data-role-id');
      userSelect.value = roleId;
      pwdInput.value = UNIVERSAL_PASSWORD;
      quickBtns.forEach(b => {
        b.style.borderColor = 'var(--border-light)';
        b.style.background = 'rgba(255,255,255,0.05)';
      });
      btn.style.borderColor = 'var(--accent-gold)';
      btn.style.background = 'rgba(207,168,78,0.18)';
      errorBox.style.display = 'none';
    });
  });

  // Toggle password visibility
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

  // Form submit handler
  modalContainer.querySelector('#portal-login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const userId = userSelect.value;
    const password = pwdInput.value;

    const res = state.login(userId, password);
    if (!res.success) {
      errorBox.textContent = res.message;
      errorBox.style.display = 'block';
      return;
    }

    closeModal();
    if (onLoginSuccess) {
      onLoginSuccess(res.user);
    }
  });
}
