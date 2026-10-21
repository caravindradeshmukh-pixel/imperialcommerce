/* Imperial Commerce Tutorials - Mandatory First-Time Director Password Reset Modal
   Guarantees that both Directors must reset their initial password (Password@123) before accessing the Executive Console */

import { state } from '../state.js';

export function openMandatoryPasswordResetModal(director, showToast, onSuccess = null) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const directorName = director.name || 'Executive Director';

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 540px; background: #ffffff; border: 1px solid #cbd5e1; border-top: 6px solid #0f2042; box-shadow: 0 25px 75px rgba(15, 32, 66, 0.35); border-radius: 14px; color: #0f172a; padding: 2rem;">
      
      <!-- Security Emblem & Header -->
      <div style="display: flex; align-items: flex-start; gap: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 1.25rem; margin-bottom: 1.5rem;">
        <div style="width: 52px; height: 52px; border-radius: 12px; background: linear-gradient(135deg, #0f2042, #1e3a8a); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: #ffffff; flex-shrink: 0; box-shadow: 0 4px 14px rgba(15, 32, 66, 0.25);">
          🔒
        </div>
        <div>
          <div style="display: inline-block; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; background: #eff6ff; color: #1e3a8a; border: 1px solid #bfdbfe; padding: 0.15rem 0.55rem; border-radius: 4px; font-weight: 800; margin-bottom: 0.35rem;">
            MANDATORY SECURITY GOVERNANCE
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 800; color: #0f2042; margin: 0; line-height: 1.3;">
            Reset Your Initial Director Password
          </h3>
          <div style="font-size: 0.84rem; color: #64748b; margin-top: 0.25rem; font-weight: 500;">
            Welcome, <strong>${directorName}</strong>
          </div>
        </div>
      </div>

      <!-- Explanatory Notice Banner -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #966f1e; padding: 0.85rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.82rem; color: #334155; line-height: 1.5;">
        As an Executive Director of Imperial Commerce Tutorials, your account commands full authority over student records, academic syllabi, fees, and accounting. 
        <br/><strong style="color: #0f2042;">For strict confidentiality, you must change your initial temporary password (<code style="background: #e2e8f0; padding: 0.1rem 0.35rem; border-radius: 4px;">Password@123</code>) before entering.</strong>
      </div>

      <!-- Reset Form -->
      <form id="mandatory-reset-form">
        <!-- Current Temporary Password -->
        <div class="form-group" style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #0f2042; margin-bottom: 0.35rem;">
            Current Initial Password <span style="color: #b91c1c;">*</span>
          </label>
          <input 
            type="password" 
            id="reset-current-pass" 
            class="form-control" 
            value="Password@123" 
            placeholder="Enter initial password (Password@123)"
            style="width: 100%; padding: 0.7rem 0.85rem; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; color: #0f172a; font-size: 0.92rem; font-family: monospace;"
            required 
          />
        </div>

        <!-- New Private Password -->
        <div class="form-group" style="margin-bottom: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <label style="font-size: 0.84rem; font-weight: 700; color: #0f2042;">
              New Private Password <span style="color: #b91c1c;">*</span>
            </label>
            <span style="font-size: 0.74rem; color: #64748b;">Min. 6 characters</span>
          </div>
          <div style="position: relative;">
            <input 
              type="password" 
              id="reset-new-pass" 
              class="form-control" 
              placeholder="Create your new strong password"
              style="width: 100%; padding: 0.7rem 0.85rem; padding-right: 2.5rem; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; color: #0f172a; font-size: 0.92rem; font-family: monospace;"
              required 
            />
            <button 
              type="button" 
              id="toggle-new-pass-btn" 
              style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #64748b; cursor: pointer; font-size: 1rem;"
              title="Show/Hide Password"
            >
              👁️
            </button>
          </div>
        </div>

        <!-- Confirm New Password -->
        <div class="form-group" style="margin-bottom: 1.25rem;">
          <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #0f2042; margin-bottom: 0.35rem;">
            Confirm New Password <span style="color: #b91c1c;">*</span>
          </label>
          <input 
            type="password" 
            id="reset-confirm-pass" 
            class="form-control" 
            placeholder="Re-enter your new strong password"
            style="width: 100%; padding: 0.7rem 0.85rem; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; color: #0f172a; font-size: 0.92rem; font-family: monospace;"
            required 
          />
        </div>

        <!-- Error Feedback Box -->
        <div id="reset-error-msg" style="display: none; padding: 0.65rem 0.85rem; border-radius: 6px; background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 0.82rem; font-weight: 600; margin-bottom: 1rem;">
        </div>

        <!-- Submit Button -->
        <div style="display: flex; justify-content: flex-end; border-top: 1px solid #e2e8f0; padding-top: 1.25rem;">
          <button 
            type="submit" 
            id="btn-save-new-password" 
            class="btn btn-primary" 
            style="width: 100%; padding: 0.8rem 1.5rem; background: linear-gradient(135deg, #0f2042, #1e3a8a); color: #ffffff; font-weight: 800; border: none; border-radius: 8px; font-size: 0.95rem; cursor: pointer; box-shadow: 0 4px 15px rgba(15, 32, 66, 0.25);"
          >
            💾 Set New Password & Enter Director Console →
          </button>
        </div>
      </form>

    </div>
  `;

  modalContainer.classList.remove('hidden');

  // Prevent clicking backdrop to dismiss
  const originalHandler = modalContainer.onclick;
  modalContainer.onclick = (e) => {
    // Block clicks outside
    if (e.target === modalContainer) {
      e.stopPropagation();
      showToast('Password reset is mandatory for directors before accessing console.', 'warning');
    }
  };

  // Toggle password visibility
  const toggleBtn = modalContainer.querySelector('#toggle-new-pass-btn');
  const newPassInput = modalContainer.querySelector('#reset-new-pass');
  toggleBtn.addEventListener('click', () => {
    if (newPassInput.type === 'password') {
      newPassInput.type = 'text';
      toggleBtn.textContent = '🔒';
    } else {
      newPassInput.type = 'password';
      toggleBtn.textContent = '👁️';
    }
  });

  // Submit Handler
  const form = modalContainer.querySelector('#mandatory-reset-form');
  const currentPassInput = modalContainer.querySelector('#reset-current-pass');
  const confirmPassInput = modalContainer.querySelector('#reset-confirm-pass');
  const errorBox = modalContainer.querySelector('#reset-error-msg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const current = currentPassInput.value.trim();
    const newPass = newPassInput.value.trim();
    const confirmPass = confirmPassInput.value.trim();

    if (!current) {
      errorBox.textContent = 'Please enter your current initial password.';
      errorBox.style.display = 'block';
      return;
    }

    if (newPass.length < 6) {
      errorBox.textContent = 'New password must be at least 6 characters long.';
      errorBox.style.display = 'block';
      return;
    }

    if (newPass.toLowerCase() === 'password@123') {
      errorBox.textContent = 'New password cannot be the default "Password@123". Please pick a unique password.';
      errorBox.style.display = 'block';
      return;
    }

    if (newPass !== confirmPass) {
      errorBox.textContent = 'New password and confirmation do not match.';
      errorBox.style.display = 'block';
      return;
    }

    const res = state.changeDirectorPassword(director.id, current, newPass);
    if (!res.success) {
      errorBox.textContent = res.message;
      errorBox.style.display = 'block';
      return;
    }

    // Success! Restore backdrop handler and close
    modalContainer.onclick = originalHandler;
    modalContainer.classList.add('hidden');
    modalContainer.innerHTML = '';

    if (showToast) {
      showToast('Director password established securely. Welcome to the Executive Console!', 'success');
    }

    if (onSuccess) {
      onSuccess(res.account);
    }
  });
}
