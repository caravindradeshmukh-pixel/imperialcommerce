/* Imperial Commerce Tutorials - Multi-Role Portal Authentication Modal */

import { state } from '../state.js';
import { UNIVERSAL_PASSWORD } from '../mockData.js';

export function openLoginModal(initialUserId = 'Director', onLoginSuccess = null) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const userAccounts = state.getUserAccounts ? state.getUserAccounts() : [];

  const selectedUser = (initialUserId === 'Director' || !initialUserId)
    ? (state.activeDirectorId === 'dir_shrikrishna' ? 'Director - Shrikrishna Deshmukh' : 'Director - Ishwari Deshmukh')
    : initialUserId;

  const quickPickRoles = [
    { id: 'Director - Ishwari Deshmukh', label: 'Ishwari Deshmukh', icon: '👑' },
    { id: 'Director - Shrikrishna Deshmukh', label: 'Shrikrishna Deshmukh', icon: '👑' },
    { id: 'Admin Staff', label: 'Pranav Toradmal (Admin)', icon: '🛡️' },
    { id: 'Teacher - CA Ravindra Deshmukh', label: 'CA Ravindra Deshmukh', icon: '👨‍🏫' },
    { id: 'Student - Arush Thorat', label: 'Arush Thorat', icon: '🎓' },
    { id: 'Parents', label: 'Parents', icon: '👨‍👩‍👧' }
  ];

  // Build options from live user accounts
  const accountsOptions = userAccounts.length > 0 ? userAccounts.map(u => ({
    id: u.userId,
    personaKey: u.id,
    label: `${u.name} (${u.role.toUpperCase()})`,
    desc: `User ID: ${u.userId} • ${u.phone} • ${u.branch || 'Head Office'}`
  })) : [
    { id: 'DIR-ISHWARI', label: 'Ishwari Deshmukh (Director)', desc: 'Director • 9850311082' },
    { id: 'DIR-SHRIKRISHNA', label: 'Shrikrishna Deshmukh (Director)', desc: 'Director • 9823979878' },
    { id: 'ADM-PRANAV', label: 'Pranav Toradmal (Admin Staff)', desc: 'Admin Staff • 9850311082' },
    { id: 'FAC-RAVINDRA', label: 'CA Ravindra Deshmukh (Faculty)', desc: 'Faculty • Account & Economics' },
    { id: 'STU-ARUSH', label: 'Arush Thorat (Student)', desc: 'Student • Gangapur Road' }
  ];

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 560px; background: #ffffff; border: 1px solid #cbd5e1; border-top: 5px solid #0f2042; box-shadow: 0 25px 70px rgba(15, 32, 66, 0.25); border-radius: 12px; color: #0f172a; padding: 1.75rem;">
      <!-- Modal Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 1.1rem; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.85rem;">
          <div style="width: 46px; height: 46px; border-radius: 10px; background: linear-gradient(135deg, #0f2042, #1e3a8a); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.35rem; color: #ffffff; box-shadow: 0 4px 12px rgba(15,32,66,0.25);">
            🔐
          </div>
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: #0f2042; margin: 0;">Portal Authentication</h3>
            <div style="font-size: 0.82rem; color: #64748b; font-weight: 500;">Imperial Commerce Tutorials • Nashik</div>
          </div>
        </div>
        <button id="close-login-btn" style="background: none; border: none; color: #64748b; font-size: 1.5rem; cursor: pointer; padding: 0.25rem 0.5rem; line-height: 1;">✕</button>
      </div>

      <!-- Quick 1-Click Role Pickers -->
      <div style="margin-bottom: 1.25rem; background: #f8fafc; padding: 0.85rem; border-radius: 8px; border: 1px solid #e2e8f0;">
        <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.06em; color: #0f2042; margin-bottom: 0.5rem; font-weight: 800; display: flex; align-items: center; gap: 0.4rem;">
          <span>⚡ QUICK 1-CLICK PERSONA SELECTOR:</span>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
          ${quickPickRoles.map(r => `
            <button 
              type="button" 
              class="quick-fill-btn ${r.id === selectedUser ? 'active-quick-fill' : ''}" 
              data-role-id="${r.id}"
              style="padding: 0.4rem 0.65rem; font-size: 0.78rem; border-radius: 6px; border: 1px solid ${r.id === selectedUser ? '#0f2042' : '#cbd5e1'}; background: ${r.id === selectedUser ? '#0f2042' : '#ffffff'}; color: ${r.id === selectedUser ? '#ffffff' : '#0f172a'}; cursor: pointer; display: flex; align-items: center; gap: 0.35rem; transition: all 0.2s ease; font-weight: 600;"
            >
              <span>${r.icon}</span>
              <span>${r.label}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Login Form -->
      <form id="portal-login-form">
        <div class="form-group" style="margin-bottom: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
            <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #0f2042;">
              Select User Account or Persona <span style="color: #b91c1c;">*</span>
            </label>
            <span style="font-size: 0.75rem; color: #64748b;">Issued by Director Ishwari Deshmukh</span>
          </div>
          <select id="login-userid-input" class="form-control" style="width: 100%; padding: 0.75rem; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; color: #0f172a; font-size: 0.92rem; font-weight: 600;">
            <optgroup label="Official User Accounts (Users.xlsx)">
              ${accountsOptions.map(u => `
                <option value="${u.id}" ${u.id === selectedUser || u.personaKey === selectedUser ? 'selected' : ''}>${u.label} - ${u.desc}</option>
              `).join('')}
            </optgroup>
            <optgroup label="Direct Role Shortcuts">
              <option value="Director - Ishwari Deshmukh">Ishwari Deshmukh (Executive Director)</option>
              <option value="Director - Shrikrishna Deshmukh">Shrikrishna Deshmukh (Managing Director)</option>
              <option value="Admin Staff">Pranav Toradmal (Admin Desk)</option>
              <option value="Teacher - CA Ravindra Deshmukh">CA Ravindra Deshmukh (Senior Faculty)</option>
              <option value="Student - Arush Thorat">Arush Thorat (Student Portal)</option>
              <option value="Parents">Parents Portal Connect</option>
            </optgroup>
          </select>
        </div>

        <!-- Custom User ID Input Field (Alternative) -->
        <div class="form-group" style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.8rem; font-weight: 600; color: #475569; margin-bottom: 0.3rem;">
            Or Type Custom User ID / Phone Number (Optional override)
          </label>
          <input 
            type="text" 
            id="login-custom-id" 
            class="form-control" 
            placeholder="e.g. DIR-ISHWARI, STU-ARUSH, or Phone number"
            style="width: 100%; padding: 0.65rem 0.75rem; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; color: #0f172a; font-size: 0.88rem; font-family: monospace;"
          />
        </div>

        <div class="form-group" style="margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
            <label style="font-size: 0.85rem; font-weight: 700; color: #0f2042;">
              Password <span style="color: #b91c1c;">*</span>
            </label>
            <span style="font-size: 0.75rem; color: #0f2042; background: #e0f2fe; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 600;">
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
              style="width: 100%; padding: 0.75rem; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; color: #0f172a; font-size: 0.95rem; font-family: monospace;"
              required 
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

        <!-- Feedback Error Box -->
        <div id="login-error-msg" style="display: none; padding: 0.65rem; border-radius: 6px; background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 0.85rem; font-weight: 600; margin-bottom: 1rem;">
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

  modalContainer.classList.remove('hidden');

  // Interactive quick-fill chips
  const quickBtns = modalContainer.querySelectorAll('.quick-fill-btn');
  const userSelect = modalContainer.querySelector('#login-userid-input');
  const customIdInput = modalContainer.querySelector('#login-custom-id');
  const pwdInput = modalContainer.querySelector('#login-password-input');
  const errorBox = modalContainer.querySelector('#login-error-msg');

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const roleId = btn.getAttribute('data-role-id');
      userSelect.value = roleId;
      customIdInput.value = '';
      pwdInput.value = UNIVERSAL_PASSWORD;
      quickBtns.forEach(b => {
        b.style.borderColor = '#cbd5e1';
        b.style.background = '#ffffff';
        b.style.color = '#0f172a';
      });
      btn.style.borderColor = '#0f2042';
      btn.style.background = '#0f2042';
      btn.style.color = '#ffffff';
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
    const customId = customIdInput.value.trim();
    const userId = customId || userSelect.value;
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

