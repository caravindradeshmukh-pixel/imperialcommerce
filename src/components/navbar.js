/* Imperial Commerce Tutorials, Nashik - Institutional Top Navigation Header
   Strict Confidentiality: Separates Public Institutional View from Private Authenticated Portals */

import { state } from '../state.js';
import { openLoginModal } from './loginModal.js';

export function renderNavbar(container) {
  const currentRole = state.currentRole;
  const user = state.currentUser;
  const publicTab = state.currentPublicTab || 'overview';

  container.innerHTML = `
    <div class="role-dock-wrap" style="background: rgba(255, 255, 255, 0.98); border-bottom: 2px solid #0f2042; box-shadow: 0 2px 14px rgba(15, 32, 66, 0.08); position: sticky; top: 0; z-index: 1000;">
      <div class="role-dock-inner" style="max-width: 1560px; margin: 0 auto; padding: 0.75rem 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
        
        <!-- Brand Emblem & Crest -->
        <div class="brand-emblem" id="brand-home-btn" title="Return to Public Website" style="cursor: pointer; display: flex; align-items: center; gap: 0.75rem;">
          <div class="brand-crest" style="width: 44px; height: 44px; background: linear-gradient(135deg, #0f2042, #1e3a8a); border: 1.5px solid var(--accent-gold); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-size: 1.35rem; font-weight: 800; color: #ffffff; box-shadow: 0 2px 8px rgba(15, 32, 66, 0.25);">
            I
          </div>
          <div class="brand-title-group">
            <h1 style="font-size: 1.15rem; letter-spacing: -0.01em; color: #0f2042; font-weight: 800; margin: 0; line-height: 1.2;">IMPERIAL COMMERCE TUTORIALS</h1>
            <div class="brand-subtitle" style="font-size: 0.72rem; color: #966f1e; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 700;">
              Nashik • Satpur & Gangapur Road Centers
            </div>
          </div>
        </div>

        <!-- Center Navigation -->
        <nav class="role-switcher-container" aria-label="Main Navigation" style="display: flex; align-items: center; background: #f1f5f9; padding: 0.25rem; border-radius: var(--radius-full); border: 1px solid #e2e8f0;">
          ${!user ? `
            <!-- PUBLIC VISITOR INSTITUTIONAL TABS (Confidential Portals Completely Hidden) -->
            <button class="role-pill ${currentRole === 'public' && publicTab === 'overview' ? 'active' : ''}" id="nav-pub-overview">
              <span>🌐</span>
              <span>Overview</span>
            </button>
            <button class="role-pill ${currentRole === 'public' && publicTab === 'courses' ? 'active' : ''}" id="nav-pub-courses">
              <span>📚</span>
              <span>Courses & Fees</span>
            </button>
            <button class="role-pill ${currentRole === 'public' && publicTab === 'branches' ? 'active' : ''}" id="nav-pub-branches">
              <span>📍</span>
              <span>Centers</span>
            </button>
            <button class="role-pill ${currentRole === 'public' && publicTab === 'toppers' ? 'active' : ''}" id="nav-pub-toppers">
              <span>🏆</span>
              <span>Hall of Fame</span>
            </button>
            <button class="role-pill ${currentRole === 'public' && publicTab === 'recruitment' ? 'active' : ''}" id="nav-pub-recruitment" style="border: 1px solid rgba(150, 111, 30, 0.4);">
              <span>💼</span>
              <span>Join our Team</span>
              <span style="font-size: 0.65rem; background: #fef08a; color: #713f12; padding: 0.1rem 0.35rem; border-radius: 10px; font-weight: 800;">Hiring</span>
            </button>
          ` : `
            <!-- AUTHENTICATED USER PORTAL TABS (Strict Role Boundary) -->
            ${user.role === 'director' ? `
              <button class="role-pill ${currentRole === 'director' ? 'active' : ''}" id="nav-auth-portal-btn">
                <span>👑</span>
                <span>Director Executive Console</span>
              </button>
            ` : user.role === 'admin' ? `
              <button class="role-pill ${currentRole === 'admin' ? 'active' : ''}" id="nav-auth-portal-btn">
                <span>🛡️</span>
                <span>Admin Operations Desk</span>
              </button>
            ` : user.role === 'teacher' ? `
              <button class="role-pill ${currentRole === 'teacher' ? 'active' : ''}" id="nav-auth-portal-btn">
                <span>👨‍🏫</span>
                <span>Faculty Portal (${user.name.split(' ')[0]})</span>
              </button>
            ` : user.role === 'student' ? `
              <button class="role-pill ${currentRole === 'student' ? 'active' : ''}" id="nav-auth-portal-btn">
                <span>🎓</span>
                <span>Student Desk (${user.name.split(' ')[0]})</span>
              </button>
            ` : `
              <button class="role-pill ${currentRole === 'parent' ? 'active' : ''}" id="nav-auth-portal-btn">
                <span>👨‍👩‍👧</span>
                <span>Parent Portal (${user.name.split(' ')[0]})</span>
              </button>
            `}

            <!-- Toggle to preview public website while authenticated -->
            <button class="role-pill ${currentRole === 'public' ? 'active' : ''}" id="nav-auth-view-public-btn">
              <span>🌐</span>
              <span>Public Website</span>
            </button>
          `}
        </nav>

        <!-- Right Action: User Profile / Secure Portal Login -->
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          
          ${user ? `
            <!-- Authenticated Profile Badge & Sign Out -->
            <div class="user-profile-badge" style="display: flex; align-items: center; gap: 0.55rem; background: #eff6ff; padding: 0.35rem 0.85rem; border-radius: 20px; border: 1px solid #bfdbfe;">
              <div style="width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #0f2042, #1e3a8a); display: flex; align-items: center; justify-content: center; font-size: 0.82rem; font-weight: 800; color: #ffffff;">
                ${user.role === 'director' ? '👑' : user.role === 'admin' ? '🛡️' : user.role === 'teacher' ? '👨‍🏫' : user.role === 'student' ? '🎓' : '👨‍👩‍👧'}
              </div>
              <div>
                <div style="font-size: 0.82rem; font-weight: 800; color: #0f2042; line-height: 1.1;">
                  ${user.name}
                </div>
                <div style="font-size: 0.7rem; color: #1e3a8a; font-weight: 600;">
                  ${user.badge || (user.role ? user.role.toUpperCase() : 'Authenticated')}
                </div>
              </div>
            </div>

            <button 
              id="dock-logout-btn" 
              class="btn"
              style="padding: 0.45rem 0.95rem; background: #fee2e2; border: 1px solid #fca5a5; border-radius: 8px; color: #991b1b; font-size: 0.8rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 0.35rem;"
              title="Sign Out of Portal"
            >
              <span>🚪</span>
              <span>Sign Out</span>
            </button>
          ` : `
            <!-- Unauthenticated Visitor: Prominent Secure Portal Sign In -->
            <button 
              id="dock-signin-btn" 
              class="btn btn-primary"
              style="padding: 0.55rem 1.15rem; background: linear-gradient(135deg, #0f2042, #1e3a8a); border: none; border-radius: 8px; color: #ffffff; font-size: 0.88rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 0.45rem; box-shadow: 0 4px 15px rgba(15,32,66,0.25);"
            >
              <span>🔐</span>
              <span>Portal Login</span>
            </button>
          `}
        </div>

      </div>
    </div>
  `;

  // Attach Brand Home listener
  container.querySelector('#brand-home-btn').addEventListener('click', () => {
    state.setRole('public');
    state.setPublicTab('overview');
  });

  // Attach Public Navigation listeners if unauthenticated
  if (!user) {
    const pubOverview = container.querySelector('#nav-pub-overview');
    if (pubOverview) {
      pubOverview.addEventListener('click', () => {
        state.setRole('public');
        state.setPublicTab('overview');
      });
    }

    const pubCourses = container.querySelector('#nav-pub-courses');
    if (pubCourses) {
      pubCourses.addEventListener('click', () => {
        state.setRole('public');
        state.setPublicTab('courses');
      });
    }

    const pubBranches = container.querySelector('#nav-pub-branches');
    if (pubBranches) {
      pubBranches.addEventListener('click', () => {
        state.setRole('public');
        state.setPublicTab('branches');
      });
    }

    const pubToppers = container.querySelector('#nav-pub-toppers');
    if (pubToppers) {
      pubToppers.addEventListener('click', () => {
        state.setRole('public');
        state.setPublicTab('toppers');
      });
    }

    const pubRecruitment = container.querySelector('#nav-pub-recruitment');
    if (pubRecruitment) {
      pubRecruitment.addEventListener('click', () => {
        state.setRole('public');
        state.setPublicTab('recruitment');
      });
    }

    const signinBtn = container.querySelector('#dock-signin-btn');
    if (signinBtn) {
      signinBtn.addEventListener('click', () => {
        openLoginModal('director', (authenticatedUser) => {
          // Callback upon login
        });
      });
    }
  } else {
    // Authenticated listeners
    const portalBtn = container.querySelector('#nav-auth-portal-btn');
    if (portalBtn) {
      portalBtn.addEventListener('click', () => {
        state.setRole(user.role);
      });
    }

    const viewPublicBtn = container.querySelector('#nav-auth-view-public-btn');
    if (viewPublicBtn) {
      viewPublicBtn.addEventListener('click', () => {
        state.setRole('public');
      });
    }

    const logoutBtn = container.querySelector('#dock-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        state.logout();
      });
    }
  }
}
