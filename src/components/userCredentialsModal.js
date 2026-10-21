/* Imperial Commerce Tutorials - User Credentials & Password Authority Desk
   Full executive authority granted to Director Ishwari Deshmukh to reset/create user IDs and passwords */

import { state } from '../state.js';
import { UNIVERSAL_PASSWORD } from '../mockData.js';

export function renderUserCredentialsTab(container, showToast) {
  if (!state.currentUser || state.currentUser.role !== 'director') {
    container.innerHTML = `
      <div class="card" style="padding: 3rem 2rem; text-align: center; background: #ffffff; border: 1px solid #cbd5e1; border-top: 4px solid #b91c1c; border-radius: 12px; max-width: 600px; margin: 3rem auto;">
        <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔒</div>
        <h3 style="color: #0f2042; font-weight: 800; margin-bottom: 0.5rem;">Confidentiality Restriction</h3>
        <p style="color: #64748b; font-size: 0.9rem; line-height: 1.5;">
          This master credentials desk is strictly confidential and reserved exclusively for Director Ishwari Deshmukh and Director Shrikrishna Deshmukh.
        </p>
      </div>
    `;
    return;
  }

  const activeDirector = state.getActiveDirector();
  let filterRole = 'all';
  let searchQuery = '';

  function renderView() {
    let accounts = state.getUserAccounts(filterRole === 'all' ? null : filterRole);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      accounts = accounts.filter(a => 
        a.name.toLowerCase().includes(q) ||
        a.userId.toLowerCase().includes(q) ||
        (a.email && a.email.toLowerCase().includes(q)) ||
        (a.phone && a.phone.includes(q)) ||
        (a.role && a.role.toLowerCase().includes(q)) ||
        (a.courseName && a.courseName.toLowerCase().includes(q))
      );
    }

    const directorsCount = state.userAccounts.filter(u => u.role === 'director').length;
    const adminCount = state.userAccounts.filter(u => u.role === 'admin').length;
    const facultyCount = state.userAccounts.filter(u => u.role === 'teacher').length;
    const studentCount = state.userAccounts.filter(u => u.role === 'student').length;
    const parentCount = state.userAccounts.filter(u => u.role === 'parent').length;

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Authority Header Banner -->
        <div class="card" style="background: linear-gradient(135deg, #0f2042 0%, #1e3a8a 100%); color: #ffffff; border: 1px solid rgba(207,168,78,0.4); padding: 1.5rem; border-radius: 12px; box-shadow: 0 8px 24px rgba(15, 32, 66, 0.15); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 52px; height: 52px; border-radius: 12px; background: linear-gradient(135deg, #cfa84e, #966f1e); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: #070b14; font-weight: 800; box-shadow: 0 4px 15px rgba(207,168,78,0.3);">
              🔑
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
                <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: #ffffff;">
                  USER ID & PASSWORD MANAGEMENT DESK
                </h3>
                <span style="background: rgba(207,168,78,0.25); border: 1px solid #cfa84e; color: #fef08a; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.72rem; font-weight: 700;">
                  Executive Authority: ${activeDirector.name}
                </span>
              </div>
              <div style="font-size: 0.82rem; color: #e2e8f0; margin-top: 0.35rem; max-width: 720px; line-height: 1.5;">
                Director Ishwari Deshmukh holds full administrative authority to reset passwords, customize user IDs, and dispatch official credentials directly via WhatsApp or copy slips to real students, parents, faculty, and administration.
              </div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
            <button 
              id="btn-create-new-user" 
              class="btn"
              style="padding: 0.65rem 1.25rem; background: linear-gradient(135deg, #cfa84e, #b48a3c); color: #070b14; font-weight: 800; border: none; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 0.45rem; box-shadow: 0 4px 12px rgba(207,168,78,0.3);"
            >
              <span>➕</span> Create New User ID
            </button>
          </div>
        </div>

        <!-- Metric KPI Tiles -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 0.85rem;">
          <div class="card" style="padding: 1rem; border-radius: 10px; border-left: 4px solid #1e3a8a; background: #ffffff;">
            <div style="font-size: 0.72rem; text-transform: uppercase; color: #64748b; font-weight: 700;">Total Active Users</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: #0f172a; margin-top: 0.25rem;">${state.userAccounts.length}</div>
            <div style="font-size: 0.72rem; color: #059669; font-weight: 600;">100% Verified Real Users</div>
          </div>

          <div class="card" style="padding: 1rem; border-radius: 10px; border-left: 4px solid #966f1e; background: #ffffff;">
            <div style="font-size: 0.72rem; text-transform: uppercase; color: #64748b; font-weight: 700;">Directors & Admin</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: #966f1e; margin-top: 0.25rem;">${directorsCount + adminCount}</div>
            <div style="font-size: 0.72rem; color: #475569;">${directorsCount} Directors • ${adminCount} Admin</div>
          </div>

          <div class="card" style="padding: 1rem; border-radius: 10px; border-left: 4px solid #2563eb; background: #ffffff;">
            <div style="font-size: 0.72rem; text-transform: uppercase; color: #64748b; font-weight: 700;">Teaching Faculty</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: #1d4ed8; margin-top: 0.25rem;">${facultyCount}</div>
            <div style="font-size: 0.72rem; color: #475569;">Satpur & Gangapur</div>
          </div>

          <div class="card" style="padding: 1rem; border-radius: 10px; border-left: 4px solid #059669; background: #ffffff;">
            <div style="font-size: 0.72rem; text-transform: uppercase; color: #64748b; font-weight: 700;">Students & Parents</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: #059669; margin-top: 0.25rem;">${studentCount + parentCount}</div>
            <div style="font-size: 0.72rem; color: #475569;">${studentCount} Students • ${parentCount} Parents</div>
          </div>
        </div>

        <!-- Filter Bar & Search -->
        <div class="card" style="padding: 1rem 1.25rem; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.85rem;">
          <!-- Role Filters -->
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; align-items: center;">
            <span style="font-size: 0.78rem; font-weight: 700; color: #475569; margin-right: 0.3rem;">Filter:</span>
            ${[
              { id: 'all', label: `All (${state.userAccounts.length})` },
              { id: 'director', label: `Directors (${directorsCount})` },
              { id: 'admin', label: `Admin (${adminCount})` },
              { id: 'teacher', label: `Faculty (${facultyCount})` },
              { id: 'student', label: `Students (${studentCount})` },
              { id: 'parent', label: `Parents (${parentCount})` }
            ].map(f => `
              <button 
                class="user-filter-btn" 
                data-filter="${f.id}"
                style="padding: 0.4rem 0.85rem; font-size: 0.78rem; font-weight: 700; border-radius: 20px; border: 1px solid ${filterRole === f.id ? '#1e3a8a' : '#e2e8f0'}; background: ${filterRole === f.id ? '#1e3a8a' : '#f8fafc'}; color: ${filterRole === f.id ? '#ffffff' : '#334155'}; cursor: pointer; transition: all 0.2s ease;"
              >
                ${f.label}
              </button>
            `).join('')}
          </div>

          <!-- Search Box -->
          <div style="display: flex; align-items: center; gap: 0.5rem; min-width: 260px;">
            <input 
              type="text" 
              id="user-search-input" 
              placeholder="Search by name, User ID, mobile..." 
              value="${searchQuery}"
              style="width: 100%; padding: 0.45rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.85rem; background: #f8fafc; color: #0f172a;"
            />
          </div>
        </div>

        <!-- User Accounts Table -->
        <div class="card" style="padding: 0; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);">
          <div style="padding: 1rem 1.25rem; background: #0f2042; color: #ffffff; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-weight: 800; font-size: 0.95rem; display: flex; align-items: center; gap: 0.5rem;">
              <span>📋</span> Official User Directory (${accounts.length} Accounts Displayed)
            </div>
            <div style="font-size: 0.78rem; color: #e2e8f0; display: flex; align-items: center; gap: 0.4rem;">
              <span>🛡️</span> Director Ishwari Deshmukh Authority • Encrypted Credentials
            </div>
          </div>

          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.84rem; text-align: left;">
              <thead>
                <tr style="background: #f1f5f9; border-bottom: 2px solid #e2e8f0; color: #0f172a;">
                  <th style="padding: 0.75rem 1rem;">User / Profile</th>
                  <th style="padding: 0.75rem 1rem;">Role / Designation</th>
                  <th style="padding: 0.75rem 1rem;">Official User ID</th>
                  <th style="padding: 0.75rem 1rem;">Password</th>
                  <th style="padding: 0.75rem 1rem;">Contact Details</th>
                  <th style="padding: 0.75rem 1rem; text-align: right;">Director Actions</th>
                </tr>
              </thead>
              <tbody>
                ${accounts.length === 0 ? `
                  <tr>
                    <td colspan="6" style="padding: 2.5rem; text-align: center; color: #64748b;">
                      No users found matching "${searchQuery}".
                    </td>
                  </tr>
                ` : accounts.map((acc, index) => {
                  const roleBadgeColor = acc.role === 'director' 
                    ? 'background: #fef3c7; color: #92400e; border: 1px solid #fcd34d;' 
                    : acc.role === 'admin' 
                    ? 'background: #ede9fe; color: #5b21b6; border: 1px solid #ddd6fe;'
                    : acc.role === 'teacher'
                    ? 'background: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe;'
                    : acc.role === 'student'
                    ? 'background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;'
                    : 'background: #fce7f3; color: #9d174d; border: 1px solid #fbcfe8;';

                  return `
                    <tr style="border-bottom: 1px solid #e2e8f0; background: ${index % 2 === 0 ? '#ffffff' : '#f8fafc'}; transition: background 0.15s ease;">
                      <!-- User & Avatar -->
                      <td style="padding: 0.85rem 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                          <div style="width: 38px; height: 38px; border-radius: 50%; background: #0f2042; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.85rem; border: 1.5px solid #1e3a8a;">
                            ${acc.role === 'director' ? '👑' : acc.role === 'teacher' ? '👨‍🏫' : acc.role === 'student' ? '🎓' : acc.role === 'parent' ? '👨‍👩‍👧' : '🛡️'}
                          </div>
                          <div>
                            <div style="font-weight: 700; color: #0f172a; font-size: 0.92rem;">${acc.name}</div>
                            <div style="font-size: 0.75rem; color: #64748b;">
                              ${acc.courseName ? `${acc.courseName} • ` : ''}${acc.branch || 'Nashik'}
                            </div>
                          </div>
                        </div>
                      </td>

                      <!-- Role & Badge -->
                      <td style="padding: 0.85rem 1rem;">
                        <span style="display: inline-block; padding: 0.2rem 0.65rem; border-radius: 12px; font-size: 0.74rem; font-weight: 700; ${roleBadgeColor}">
                          ${acc.category || acc.role.toUpperCase()}
                        </span>
                        <div style="font-size: 0.72rem; color: #64748b; margin-top: 0.25rem;">
                          ${acc.title || acc.badge || ''}
                        </div>
                      </td>

                      <!-- User ID -->
                      <td style="padding: 0.85rem 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.4rem;">
                          <span style="font-family: monospace; font-weight: 800; color: #1e3a8a; font-size: 0.92rem; background: #eff6ff; padding: 0.25rem 0.55rem; border-radius: 5px; border: 1px solid #bfdbfe;">
                            ${acc.userId}
                          </span>
                          <button 
                            class="copy-btn" 
                            data-copy="${acc.userId}" 
                            title="Copy User ID"
                            style="background: none; border: none; cursor: pointer; color: #64748b; font-size: 0.9rem;"
                          >
                            📋
                          </button>
                        </div>
                      </td>

                      <!-- Password -->
                      <td style="padding: 0.85rem 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.4rem;">
                          <input 
                            type="password" 
                            class="pwd-display-input" 
                            value="${acc.password || UNIVERSAL_PASSWORD}" 
                            readonly 
                            style="width: 110px; font-family: monospace; font-weight: 700; font-size: 0.86rem; border: 1px solid #cbd5e1; border-radius: 4px; padding: 0.2rem 0.4rem; background: #f8fafc; color: #0f172a;"
                          />
                          <button 
                            class="toggle-single-pwd-btn" 
                            title="Show / Hide Password"
                            style="background: none; border: none; cursor: pointer; color: #475569; font-size: 0.9rem;"
                          >
                            👁️
                          </button>
                          <button 
                            class="copy-btn" 
                            data-copy="${acc.password || UNIVERSAL_PASSWORD}" 
                            title="Copy Password"
                            style="background: none; border: none; cursor: pointer; color: #64748b; font-size: 0.9rem;"
                          >
                            📋
                          </button>
                        </div>
                      </td>

                      <!-- Contact Details -->
                      <td style="padding: 0.85rem 1rem;">
                        <div style="color: #0f172a; font-weight: 600;">📞 +91 ${acc.phone || '9850311082'}</div>
                        <div style="font-size: 0.75rem; color: #64748b;">✉️ ${acc.email || 'N/A'}</div>
                      </td>

                      <!-- Action Buttons -->
                      <td style="padding: 0.85rem 1rem; text-align: right;">
                        <div style="display: flex; justify-content: flex-end; align-items: center; gap: 0.4rem;">
                          <!-- Reset / Edit Credentials -->
                          <button 
                            class="edit-user-credentials-btn" 
                            data-user-id="${acc.id}"
                            style="padding: 0.35rem 0.75rem; font-size: 0.78rem; font-weight: 700; background: #1e3a8a; color: #ffffff; border: none; border-radius: 5px; cursor: pointer; display: flex; align-items: center; gap: 0.25rem; transition: background 0.15s ease;"
                            title="Reset Password or Change User ID"
                          >
                            <span>✏️</span> Reset
                          </button>

                          <!-- WhatsApp Credentials Dispatch -->
                          <button 
                            class="whatsapp-user-credentials-btn" 
                            data-user-id="${acc.id}"
                            style="padding: 0.35rem 0.65rem; font-size: 0.78rem; font-weight: 700; background: #059669; color: #ffffff; border: none; border-radius: 5px; cursor: pointer; display: flex; align-items: center; gap: 0.25rem;"
                            title="Send User ID & Password via WhatsApp"
                          >
                            <span>📲</span> Send
                          </button>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>

          <!-- Table Footer Info -->
          <div style="padding: 0.85rem 1.25rem; background: #f8fafc; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; color: #64748b; flex-wrap: wrap; gap: 0.5rem;">
            <div>
              🔒 <strong>Security Policy:</strong> All credentials managed directly by Managing Director Ishwari Deshmukh. Users may also log in using the Institute Universal Master Password if needed.
            </div>
            <div>
              Total: <strong>${accounts.length}</strong> active profiles
            </div>
          </div>
        </div>

      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    // Filter Buttons
    container.querySelectorAll('.user-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterRole = btn.getAttribute('data-filter');
        renderView();
      });
    });

    // Search Input
    const searchInput = container.querySelector('#user-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderView();
      });
    }

    // Password Reveal Toggle
    container.querySelectorAll('.toggle-single-pwd-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const row = btn.closest('tr');
        const input = row.querySelector('.pwd-display-input');
        if (input.type === 'password') {
          input.type = 'text';
          btn.textContent = '🔒';
        } else {
          input.type = 'password';
          btn.textContent = '👁️';
        }
      });
    });

    // 1-Click Copy
    container.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const textToCopy = btn.getAttribute('data-copy');
        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(`Copied "${textToCopy}" to clipboard!`, 'success');
          }).catch(() => {
            showToast(`Copied: ${textToCopy}`, 'info');
          });
        }
      });
    });

    // Edit / Reset Modal
    container.querySelectorAll('.edit-user-credentials-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const accId = btn.getAttribute('data-user-id');
        const user = state.getUserAccountById(accId);
        if (user) {
          openEditUserCredentialsModal(user, showToast, () => renderView());
        }
      });
    });

    // Send via WhatsApp
    container.querySelectorAll('.whatsapp-user-credentials-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const accId = btn.getAttribute('data-user-id');
        const user = state.getUserAccountById(accId);
        if (user) {
          sendCredentialsViaWhatsApp(user, showToast);
        }
      });
    });

    // Create New User
    const createBtn = container.querySelector('#btn-create-new-user');
    if (createBtn) {
      createBtn.addEventListener('click', () => {
        openCreateUserAccountModal(showToast, () => renderView());
      });
    }
  }

  renderView();
}

/**
 * Format and trigger WhatsApp message with official credentials
 */
export function sendCredentialsViaWhatsApp(user, showToast) {
  const phone = (user.phone || '9850311082').replace(/\D/g, '');
  const targetPhone = phone.length === 10 ? `91${phone}` : phone;

  const msg = `*IMPERIAL COMMERCE TUTORIALS, NASHIK* 🏛️%0A` +
    `_Premier Commerce & Professional Coaching (Gangapur Road & Satpur Colony)_%0A%0A` +
    `Dear *${user.name}*,%0A` +
    `Your official portal login credentials have been approved and activated by *Director Ishwari Deshmukh*.%0A%0A` +
    `🌐 *Portal Link:* https://imperialcommerce.edu.in%0A` +
    `👤 *Role:* ${user.category || user.role}%0A` +
    `🔑 *User ID:* *${user.userId}*%0A` +
    `🔒 *Password:* *${user.password || UNIVERSAL_PASSWORD}*%0A%0A` +
    `_Please log in to access your daily attendance, fee receipts, portion notes, homework checking, and exam results._%0A%0A` +
    `*Authorized by:* Director Ishwari Deshmukh%0A` +
    `Imperial Commerce Tutorials • Nashik`;

  const waUrl = `https://wa.me/${targetPhone}?text=${msg}`;
  window.open(waUrl, '_blank');
  showToast(`Opening WhatsApp with login credentials for ${user.name}...`, 'success');
}

/**
 * Modal to edit or reset User ID and Password
 */
export function openEditUserCredentialsModal(user, showToast, onSuccess) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 540px; background: #ffffff; border: 1px solid #1e3a8a; border-radius: 12px; box-shadow: 0 25px 70px rgba(15, 32, 66, 0.25); overflow: hidden; padding: 0;">
      
      <!-- Modal Header -->
      <div style="background: linear-gradient(135deg, #0f2042, #1e3a8a); color: #ffffff; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(207,168,78,0.25); border: 1px solid #cfa84e; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
            🔑
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.15rem; font-weight: 800; color: #ffffff;">Reset User ID & Password</h3>
            <div style="font-size: 0.78rem; color: #e2e8f0;">Authority: Director Ishwari Deshmukh</div>
          </div>
        </div>
        <button id="close-cred-modal-btn" style="background: none; border: none; color: #cbd5e1; font-size: 1.4rem; cursor: pointer; padding: 0.2rem 0.5rem; line-height: 1;">✕</button>
      </div>

      <!-- Target User Badge -->
      <div style="padding: 1rem 1.5rem; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-weight: 800; font-size: 0.95rem; color: #0f172a;">${user.name}</div>
          <div style="font-size: 0.78rem; color: #64748b;">
            ${user.category || user.role} • 📞 +91 ${user.phone || '9850311082'} • ✉️ ${user.email || 'N/A'}
          </div>
        </div>
        <span style="background: #eff6ff; color: #1e3a8a; border: 1px solid #bfdbfe; padding: 0.2rem 0.5rem; border-radius: 12px; font-size: 0.72rem; font-weight: 700;">
          ${user.branch || 'Nashik'}
        </span>
      </div>

      <!-- Form Body -->
      <form id="edit-credentials-form" style="padding: 1.5rem;">
        
        <!-- User ID Input -->
        <div style="margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <label style="font-size: 0.85rem; font-weight: 700; color: #0f172a;">
              Assigned User ID / Login Handle <span style="color: #b91c1c;">*</span>
            </label>
            <span style="font-size: 0.72rem; color: #64748b;">Unique identifier</span>
          </div>
          <div style="position: relative;">
            <input 
              type="text" 
              id="cred-user-id-input" 
              class="form-control" 
              value="${user.userId}" 
              required 
              style="width: 100%; padding: 0.65rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.92rem; font-family: monospace; font-weight: 700; color: #0f172a; background: #ffffff;"
            />
          </div>
          <div style="font-size: 0.72rem; color: #64748b; margin-top: 0.25rem;">
            Recommended format: <code>firstname.lastname</code> or official roll handle (e.g. <code>arush.thorat</code>, <code>ca.ravindra</code>)
          </div>
        </div>

        <!-- Password Input -->
        <div style="margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <label style="font-size: 0.85rem; font-weight: 700; color: #0f172a;">
              New Password <span style="color: #b91c1c;">*</span>
            </label>
            <div style="display: flex; gap: 0.35rem;">
              <button 
                type="button" 
                id="btn-gen-strong-pwd" 
                style="padding: 0.15rem 0.45rem; font-size: 0.7rem; background: #eff6ff; border: 1px solid #bfdbfe; color: #1e3a8a; border-radius: 4px; font-weight: 700; cursor: pointer;"
              >
                🎲 Auto-Generate
              </button>
              <button 
                type="button" 
                id="btn-set-default-pwd" 
                style="padding: 0.15rem 0.45rem; font-size: 0.7rem; background: #fef3c7; border: 1px solid #fcd34d; color: #92400e; border-radius: 4px; font-weight: 700; cursor: pointer;"
              >
                🔄 Default (Password@123)
              </button>
            </div>
          </div>
          <div style="position: relative;">
            <input 
              type="text" 
              id="cred-password-input" 
              class="form-control" 
              value="${user.password || UNIVERSAL_PASSWORD}" 
              required 
              style="width: 100%; padding: 0.65rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem; font-family: monospace; font-weight: 700; color: #0f172a; background: #ffffff;"
            />
          </div>
        </div>

        <!-- Contact Phone (for WhatsApp dispatch) -->
        <div style="margin-bottom: 1.25rem;">
          <label style="font-size: 0.85rem; font-weight: 700; color: #0f172a; display: block; margin-bottom: 0.35rem;">
            Mobile Phone Number (WhatsApp Enabled)
          </label>
          <div style="display: flex; align-items: center;">
            <span style="padding: 0.65rem 0.75rem; background: #f1f5f9; border: 1px solid #cbd5e1; border-right: none; border-radius: 6px 0 0 6px; font-size: 0.85rem; color: #475569; font-weight: 700;">
              +91
            </span>
            <input 
              type="tel" 
              id="cred-phone-input" 
              class="form-control" 
              value="${user.phone || '9850311082'}" 
              required 
              style="flex: 1; padding: 0.65rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 0 6px 6px 0; font-size: 0.92rem; font-family: monospace; color: #0f172a; background: #ffffff;"
            />
          </div>
        </div>

        <!-- Official Signoff Notice -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.75rem; font-size: 0.75rem; color: #475569; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 1.1rem;">✍️</span>
          <div>
            <strong>Authorized by:</strong> Director Ishwari Deshmukh • Changes take immediate effect for web, mobile & portal logins.
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 1rem;">
          <button 
            type="button" 
            id="cancel-cred-modal-btn" 
            style="padding: 0.65rem 1.25rem; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; color: #475569; font-weight: 700; cursor: pointer;"
          >
            Cancel
          </button>

          <div style="display: flex; gap: 0.5rem;">
            <button 
              type="button" 
              id="btn-save-and-wa" 
              style="padding: 0.65rem 1.2rem; background: #059669; color: #ffffff; border: none; border-radius: 6px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.35rem;"
            >
              <span>📲</span> Save & Send WhatsApp
            </button>
            <button 
              type="submit" 
              style="padding: 0.65rem 1.5rem; background: #1e3a8a; color: #ffffff; border: none; border-radius: 6px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 0.35rem;"
            >
              <span>💾</span> Save Credentials
            </button>
          </div>
        </div>

      </form>
    </div>
  `;

  modalContainer.classList.remove('hidden');

  const userIdInput = modalContainer.querySelector('#cred-user-id-input');
  const pwdInput = modalContainer.querySelector('#cred-password-input');
  const phoneInput = modalContainer.querySelector('#cred-phone-input');

  // Auto-generate strong password
  modalContainer.querySelector('#btn-gen-strong-pwd').addEventListener('click', () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const firstName = user.name.split(' ')[0].replace(/[^a-zA-Z]/g, '');
    pwdInput.value = `${firstName}@${randomSuffix}`;
    showToast(`Generated secure password: ${pwdInput.value}`, 'info');
  });

  // Reset to default universal password
  modalContainer.querySelector('#btn-set-default-pwd').addEventListener('click', () => {
    pwdInput.value = UNIVERSAL_PASSWORD;
    showToast(`Password reset to standard: ${UNIVERSAL_PASSWORD}`, 'info');
  });

  const closeModal = () => {
    modalContainer.classList.add('hidden');
    modalContainer.innerHTML = '';
  };

  modalContainer.querySelector('#close-cred-modal-btn').addEventListener('click', closeModal);
  modalContainer.querySelector('#cancel-cred-modal-btn').addEventListener('click', closeModal);

  // Submit Handler
  const handleSave = (andWhatsApp = false) => {
    const newUserId = userIdInput.value.trim();
    const newPassword = pwdInput.value.trim();
    const newPhone = phoneInput.value.trim();

    const res = state.updateUserAccount(user.id, {
      userId: newUserId,
      password: newPassword,
      phone: newPhone
    });

    if (!res.success) {
      alert(res.message);
      return;
    }

    showToast(`User ID & Password updated for ${user.name}!`, 'success');
    closeModal();

    if (andWhatsApp) {
      sendCredentialsViaWhatsApp(res.account, showToast);
    }

    if (onSuccess) onSuccess(res.account);
  };

  modalContainer.querySelector('#edit-credentials-form').addEventListener('submit', (e) => {
    e.preventDefault();
    handleSave(false);
  });

  modalContainer.querySelector('#btn-save-and-wa').addEventListener('click', () => {
    handleSave(true);
  });
}

/**
 * Modal to create a brand new user account with credentials
 */
export function openCreateUserAccountModal(showToast, onSuccess) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 560px; background: #ffffff; border: 1px solid #1e3a8a; border-radius: 12px; box-shadow: 0 25px 70px rgba(15, 32, 66, 0.25); overflow: hidden; padding: 0;">
      
      <!-- Modal Header -->
      <div style="background: linear-gradient(135deg, #0f2042, #1e3a8a); color: #ffffff; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(207,168,78,0.25); border: 1px solid #cfa84e; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
            ➕
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.15rem; font-weight: 800; color: #ffffff;">Create New User Account</h3>
            <div style="font-size: 0.78rem; color: #e2e8f0;">Authority: Director Ishwari Deshmukh</div>
          </div>
        </div>
        <button id="close-create-modal-btn" style="background: none; border: none; color: #cbd5e1; font-size: 1.4rem; cursor: pointer; padding: 0.2rem 0.5rem; line-height: 1;">✕</button>
      </div>

      <!-- Form Body -->
      <form id="create-user-form" style="padding: 1.5rem;">
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="font-size: 0.82rem; font-weight: 700; color: #0f172a; display: block; margin-bottom: 0.35rem;">
              Account Role <span style="color: #b91c1c;">*</span>
            </label>
            <select id="new-user-role" class="form-control" style="width: 100%; padding: 0.6rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.88rem; background: #f8fafc; color: #0f172a;">
              <option value="student">Student</option>
              <option value="parent">Parent</option>
              <option value="teacher">Faculty / Teacher</option>
              <option value="admin">Admin Staff</option>
            </select>
          </div>

          <div>
            <label style="font-size: 0.82rem; font-weight: 700; color: #0f172a; display: block; margin-bottom: 0.35rem;">
              Campus Center
            </label>
            <select id="new-user-branch" class="form-control" style="width: 100%; padding: 0.6rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.88rem; background: #f8fafc; color: #0f172a;">
              <option value="Gangapur Road Center">Gangapur Road Center</option>
              <option value="Satpur Colony Center">Satpur Colony Center</option>
              <option value="Both Centers">Both Centers</option>
            </select>
          </div>
        </div>

        <div style="margin-bottom: 1rem;">
          <label style="font-size: 0.82rem; font-weight: 700; color: #0f172a; display: block; margin-bottom: 0.35rem;">
            Full Real Name <span style="color: #b91c1c;">*</span>
          </label>
          <input 
            type="text" 
            id="new-user-name" 
            class="form-control" 
            placeholder="e.g. Ramesh Kulkarni" 
            required 
            style="width: 100%; padding: 0.6rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.9rem; color: #0f172a; background: #ffffff;"
          />
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="font-size: 0.82rem; font-weight: 700; color: #0f172a; display: block; margin-bottom: 0.35rem;">
              Mobile Phone (WhatsApp) <span style="color: #b91c1c;">*</span>
            </label>
            <input 
              type="tel" 
              id="new-user-phone" 
              class="form-control" 
              placeholder="9850311082" 
              required 
              style="width: 100%; padding: 0.6rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.9rem; font-family: monospace; color: #0f172a; background: #ffffff;"
            />
          </div>

          <div>
            <label style="font-size: 0.82rem; font-weight: 700; color: #0f172a; display: block; margin-bottom: 0.35rem;">
              Email Address
            </label>
            <input 
              type="email" 
              id="new-user-email" 
              class="form-control" 
              placeholder="user@example.com" 
              style="width: 100%; padding: 0.6rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.9rem; color: #0f172a; background: #ffffff;"
            />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
          <div>
            <label style="font-size: 0.82rem; font-weight: 700; color: #0f172a; display: block; margin-bottom: 0.35rem;">
              Assigned User ID <span style="color: #b91c1c;">*</span>
            </label>
            <input 
              type="text" 
              id="new-user-userid" 
              class="form-control" 
              placeholder="e.g. ramesh.k" 
              required 
              style="width: 100%; padding: 0.6rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.9rem; font-family: monospace; font-weight: 700; color: #1e3a8a; background: #ffffff;"
            />
          </div>

          <div>
            <label style="font-size: 0.82rem; font-weight: 700; color: #0f172a; display: block; margin-bottom: 0.35rem;">
              Initial Password <span style="color: #b91c1c;">*</span>
            </label>
            <input 
              type="text" 
              id="new-user-password" 
              class="form-control" 
              value="${UNIVERSAL_PASSWORD}" 
              required 
              style="width: 100%; padding: 0.6rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.9rem; font-family: monospace; font-weight: 700; color: #0f172a; background: #ffffff;"
            />
          </div>
        </div>

        <!-- Buttons -->
        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid #e2e8f0; padding-top: 1rem;">
          <button 
            type="button" 
            id="cancel-create-modal-btn" 
            style="padding: 0.65rem 1.25rem; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; color: #475569; font-weight: 700; cursor: pointer;"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            style="padding: 0.65rem 1.5rem; background: #1e3a8a; color: #ffffff; border: none; border-radius: 6px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 0.35rem;"
          >
            <span>✨</span> Create User Account
          </button>
        </div>

      </form>
    </div>
  `;

  modalContainer.classList.remove('hidden');

  const closeModal = () => {
    modalContainer.classList.add('hidden');
    modalContainer.innerHTML = '';
  };

  modalContainer.querySelector('#close-create-modal-btn').addEventListener('click', closeModal);
  modalContainer.querySelector('#cancel-create-modal-btn').addEventListener('click', closeModal);

  // Auto-generate suggested User ID from name
  const nameInput = modalContainer.querySelector('#new-user-name');
  const userIdInput = modalContainer.querySelector('#new-user-userid');
  nameInput.addEventListener('input', () => {
    if (!userIdInput.dataset.manual) {
      const clean = nameInput.value.toLowerCase().trim().replace(/[^a-z0-9]/g, '.');
      userIdInput.value = clean;
    }
  });
  userIdInput.addEventListener('input', () => {
    userIdInput.dataset.manual = 'true';
  });

  modalContainer.querySelector('#create-user-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const role = modalContainer.querySelector('#new-user-role').value;
    const branch = modalContainer.querySelector('#new-user-branch').value;
    const name = nameInput.value.trim();
    const phone = modalContainer.querySelector('#new-user-phone').value.trim();
    const email = modalContainer.querySelector('#new-user-email').value.trim();
    const userId = userIdInput.value.trim();
    const password = modalContainer.querySelector('#new-user-password').value.trim();

    const res = state.createUserAccount({
      role,
      name,
      phone,
      email,
      userId,
      password,
      branch
    });

    if (!res.success) {
      alert(res.message);
      return;
    }

    showToast(`Created official login account for ${name}!`, 'success');
    closeModal();
    if (onSuccess) onSuccess(res.account);
  });
}
