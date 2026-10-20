/* Top Role Dock & Brand Navigation Header for Imperial Commerce Tutorials */

import { state } from '../state.js';
import { openLoginModal } from './loginModal.js';

export function renderNavbar(container) {
  const currentRole = state.currentRole;
  const user = state.currentUser;

  const roles = [
    { id: 'public', authUserId: null, label: 'Public Website', icon: '🌐' },
    { id: 'recruitment', authUserId: null, label: 'Join our Team', icon: '💼' },
    { id: 'director', authUserId: 'Director', label: 'Director', icon: '👑' },
    { id: 'admin', authUserId: 'Admin Staff', label: 'Admin Staff', icon: '🛡️' },
    { id: 'teacher', authUserId: 'Teacher', label: 'Teacher', icon: '👨‍🏫' },
    { id: 'student', authUserId: 'Student', label: 'Student', icon: '🎓' },
    { id: 'parent', authUserId: 'Parents', label: 'Parents', icon: '👨‍👩‍👧' }
  ];

  const isRecruitmentActive = currentRole === 'public' && state.currentPublicTab === 'recruitment';
  const isPublicActive = currentRole === 'public' && state.currentPublicTab !== 'recruitment';

  container.innerHTML = `
    <div class="role-dock-wrap">
      <div class="role-dock-inner">
        <!-- Brand Crest -->
        <div class="brand-emblem" id="brand-home-btn" title="Return to Public Website" style="cursor: pointer;">
          <div class="brand-crest">I</div>
          <div class="brand-title-group">
            <h1>IMPERIAL COMMERCE TUTORIALS</h1>
            <div class="brand-subtitle">Nashik • Satpur & Gangapur Road Centers</div>
          </div>
        </div>

        <!-- Role Switcher Dock -->
        <nav class="role-switcher-container" aria-label="Portal Role Selector">
          ${roles.map(r => {
            const isActive = r.id === 'recruitment' 
              ? isRecruitmentActive 
              : r.id === 'public' 
              ? isPublicActive 
              : currentRole === r.id;
            return `
              <button 
                class="role-pill ${isActive ? 'active' : ''}" 
                data-role="${r.id}"
                data-auth-id="${r.authUserId || ''}"
                id="role-btn-${r.id}"
                ${r.id === 'recruitment' ? 'style="border: 1px solid rgba(207,168,78,0.3);"' : ''}
              >
                <span>${r.icon}</span>
                <span>${r.label}</span>
                ${r.id === 'recruitment' ? '<span style="font-size: 0.65rem; background: rgba(207,168,78,0.25); color: var(--accent-gold); padding: 0.1rem 0.35rem; border-radius: 10px; font-weight: 700;">Hiring</span>' : ''}
              </button>
            `;
          }).join('')}
        </nav>

        <!-- Right Action: Formal Theme Mode Switcher & User Profile / Sign In -->
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          <!-- Supabase Cloud DB Status & Hub Pill -->
          <button 
            id="cloud-db-btn" 
            class="btn btn-sm"
            type="button"
            style="padding: 0.38rem 0.8rem; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 20px; color: #34d399; font-size: 0.78rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; transition: all 0.2s ease;"
            title="Supabase Cloud Database (Click to inspect, preserve & retrieve records)"
          >
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #34d399; box-shadow: 0 0 8px #34d399; display: inline-block;"></span>
            <span>Cloud DB</span>
          </button>

          <!-- Formal Light / Dark Mode Toggle Button -->
          <button 
            id="theme-toggle-btn" 
            class="theme-toggle-pill" 
            type="button"
            title="Switch Theme (Current: ${state.theme === 'light' ? 'Formal Light Mode' : 'Executive Dark Mode'})"
            aria-label="Toggle Dark and Light Mode"
          >
            <span class="theme-pill-track">
              <span class="theme-icon ${state.theme === 'light' ? 'active-icon' : ''}">☀️</span>
              <span class="theme-icon ${state.theme === 'dark' ? 'active-icon' : ''}">🌙</span>
            </span>
            <span class="theme-label">${state.theme === 'light' ? 'Light' : 'Dark'}</span>
          </button>

          ${user ? `
            <div class="user-profile-badge" style="display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.05); padding: 0.3rem 0.65rem; border-radius: 20px; border: 1px solid var(--border-gold);">
              <div style="width: 26px; height: 26px; border-radius: 50%; background: linear-gradient(135deg, var(--accent-gold), #856116); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; color: #070b14;">
                ${user.avatar || 'U'}
              </div>
              <div class="user-id-text" style="font-size: 0.8rem; font-weight: 700; color: var(--accent-gold-light);">
                ${user.userId}
              </div>
            </div>
            <button 
              id="dock-logout-btn" 
              style="padding: 0.4rem 0.75rem; background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.4); border-radius: 6px; color: #fca5a5; font-size: 0.78rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease;"
              title="Sign Out of Portal"
            >
              Log Out
            </button>
          ` : `
            <button 
              id="dock-signin-btn" 
              style="padding: 0.45rem 0.9rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); border: none; border-radius: 6px; color: #070b14; font-size: 0.82rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 0.35rem; box-shadow: 0 2px 10px rgba(207,168,78,0.25);"
            >
              <span>🔐</span> Sign In
            </button>
          `}
        </div>
      </div>
    </div>
  `;

  // Attach Cloud DB button listener
  const cloudDbBtn = container.querySelector('#cloud-db-btn');
  if (cloudDbBtn) {
    cloudDbBtn.addEventListener('click', () => {
      const modalContainer = document.getElementById('modal-container');
      if (modalContainer) {
        import('./cloudDataModal.js').then(({ openCloudDataModal }) => {
          import('../main.js').then(({ showToast }) => {
            openCloudDataModal(modalContainer, showToast);
          });
        });
      }
    });
  }

  // Attach theme toggle button listener
  const themeToggleBtn = container.querySelector('#theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      state.toggleTheme();
    });
  }

  // Attach home button listener
  container.querySelector('#brand-home-btn').addEventListener('click', () => {
    state.setRole('public');
  });

  // Attach login button if present
  const signinBtn = container.querySelector('#dock-signin-btn');
  if (signinBtn) {
    signinBtn.addEventListener('click', () => {
      openLoginModal('Director', () => {
        // Logged in
      });
    });
  }

  // Attach logout button if present
  const logoutBtn = container.querySelector('#dock-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      state.logout();
    });
  }

  // Attach role pill click events
  roles.forEach(r => {
    const btn = container.querySelector(`#role-btn-${r.id}`);
    if (btn) {
      btn.addEventListener('click', () => {
        if (r.id === 'recruitment') {
          state.setRole('public');
          state.setPublicTab('recruitment');
          return;
        }

        if (r.id === 'public') {
          state.setRole('public');
          state.setPublicTab('overview');
          return;
        }

        // Check if currently authenticated with this role
        if (state.currentUser && state.currentUser.role === r.id) {
          state.setRole(r.id);
        } else {
          // Open login modal with this specific role pre-selected
          openLoginModal(r.authUserId, () => {
            state.setRole(r.id);
          });
        }
      });
    }
  });
}
