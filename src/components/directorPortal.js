/* Imperial Commerce Tutorials - Director Portal
   Comprehensive Academic, Financial, Faculty & Operations Command Center */

import { state } from '../state.js';
import { SUBJECTS_CATALOG } from '../mockData.js';
import { openReceiptModal } from './receiptModal.js';
import { openVoucherModal } from './voucherModal.js';
import { 
  renderAcademicAndFeeMasterTab,
  openAddCourseModal,
  openAddSubjectModal,
  openFeeStructureModal,
  openEnrolStudentModal,
  openEditStudentModal
} from './academicMaster.js';
import { openDataCleanupModal } from './dataCleanupModal.js';
import { renderUserCredentialsTab } from './userCredentialsModal.js';
import { openLoginModal } from './loginModal.js';
import { openMandatoryPasswordResetModal } from './passwordResetModal.js';

export function renderDirectorPortal(container, showToast) {
  // 1. Strict Authentication Guard - Confidential Executive Window Only
  if (!state.currentUser || (state.currentUser.role !== 'director' && !state.canAccessRole('director'))) {
    container.innerHTML = `
      <div style="max-width: 620px; margin: 4rem auto; padding: 2.5rem; background: #ffffff; border: 1px solid #cbd5e1; border-top: 6px solid #0f2042; border-radius: 14px; text-align: center; box-shadow: 0 15px 40px rgba(15,32,66,0.12);">
        <div style="width: 58px; height: 58px; margin: 0 auto 1.25rem; border-radius: 14px; background: linear-gradient(135deg, #0f2042, #1e3a8a); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: #ffffff;">🔒</div>
        <h2 style="color: #0f2042; font-size: 1.45rem; font-weight: 800; margin-bottom: 0.5rem;">Access Restricted • Executive Authentication Required</h2>
        <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
          The Director Executive Console contains confidential student enrolments, fee collections, faculty records, and financial statements. Only authorized Imperial Commerce Directors may view this page.
        </p>
        <button id="gate-director-login-btn" style="background: linear-gradient(135deg, #0f2042, #1e3a8a); color: #fff; border: none; padding: 0.8rem 1.85rem; border-radius: 8px; font-weight: 800; font-size: 0.95rem; cursor: pointer; box-shadow: 0 4px 15px rgba(15,32,66,0.25);">
          🔐 Sign In with Director Credentials
        </button>
      </div>
    `;
    const btn = container.querySelector('#gate-director-login-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        openLoginModal('director');
      });
    }
    return;
  }

  // 2. Mandatory First-Time Password Reset Guard (Password@123 must be reset immediately)
  if (state.currentUser && state.currentUser.mustResetPassword) {
    container.innerHTML = `
      <div style="max-width: 620px; margin: 4.5rem auto; padding: 2.5rem; background: #ffffff; border: 1px solid #cbd5e1; border-top: 6px solid #0f2042; border-radius: 14px; text-align: center; box-shadow: 0 20px 50px rgba(15,32,66,0.18);">
        <div style="width: 64px; height: 64px; margin: 0 auto 1.25rem; border-radius: 16px; background: linear-gradient(135deg, #0f2042, #1e3a8a); display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #ffffff;">🔑</div>
        <h2 style="color: #0f2042; font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem;">Mandatory Password Reset Required</h2>
        <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
          Welcome Director <strong>${state.currentUser.name}</strong>. In accordance with institutional confidentiality governance, you must reset your initial temporary password (<code>Password@123</code>) to establish your private credentials before viewing the Executive Console.
        </p>
        <button id="btn-trigger-director-reset" style="background: linear-gradient(135deg, #0f2042, #1e3a8a); color: #fff; border: none; padding: 0.85rem 2rem; border-radius: 8px; font-weight: 800; font-size: 1rem; cursor: pointer; box-shadow: 0 4px 15px rgba(15,32,66,0.25);">
          🔑 Set My Private Password Now →
        </button>
      </div>
    `;
    const btn = container.querySelector('#btn-trigger-director-reset');
    const launchReset = () => {
      openMandatoryPasswordResetModal(state.currentUser, showToast, () => {
        renderDirectorPortal(container, showToast);
      });
    };
    if (btn) btn.addEventListener('click', launchReset);
    launchReset();
    return;
  }

  const activeTab = state.currentDirectorTab || 'academicMaster';
  const activeDirector = state.getActiveDirector();
  const allDirectors = state.directors || [];

  const tabs = [
    { id: 'academicMaster', label: 'Courses, Subjects & Fees', icon: '🏛️', desc: 'Master Curriculum & per-subject fee structure for Gangapur Rd & Satpur Colony' },
    { id: 'userCredentials', label: 'User IDs & Passwords', icon: '🔑', desc: 'Director Ishwari Deshmukh Authority • Reset, generate and dispatch official user IDs and passwords for all users' },
    { id: 'fees', label: 'Fee Details & Enrolments', icon: '💰', desc: 'Enrolled students catalogue, subjects chosen, total fees, received & balance dues' },
    { id: 'expenses', label: 'Expenses & Vouchers', icon: '🧾', desc: 'Course direct expenses & allocated common overheads (Rent, Utilities, Admin)' },
    { id: 'pnl', label: 'Profit & Loss', icon: '📊', desc: 'Course-wise surplus breakdown and integrated institute EBITDA statement' },
    { id: 'enquiries', label: 'Enquiry Report Status', icon: '📋', desc: 'Conversion analysis: Enquired & persuaded vs discontinued with documented reasons' },
    { id: 'attendance', label: 'Attendance', icon: '📅', desc: 'Course-wise student attendance roster with 1-click WhatsApp absence alerts' },
    { id: 'performance', label: 'Performance & Marks', icon: '🎯', desc: 'Weekly tests, quarterly exams, pre-boards, behavioral remarks & homework audit' },
    { id: 'teachers', label: 'Teachers & 60% Share', icon: '👨‍🏫', desc: 'Daily 60% fee share ledger, teaching plans stipulated vs actual, & portion notes' },
    { id: 'communication', label: 'Communication (WhatsApp)', icon: '💬', desc: 'Direct 1-click WhatsApp parent/student connect for fees, attendance & counseling' },
    { id: 'recruitment', label: 'Recruitment Desk', icon: '👔', desc: 'Faculty & staff candidate pipeline, demo lecture schedules & hiring status' },
    { id: 'dataManagement', label: 'Data Cleanup & Purge', icon: '🧹', desc: 'Delete wrong entries, remove mock test data, or restore official master baseline' }
  ];

  const currentTabObj = tabs.find(t => t.id === activeTab) || tabs[0];

  container.innerHTML = `
    <div class="portal-container" style="max-width: 1560px; margin: 0 auto; padding: 1.5rem 1.5rem 5rem; display: grid; grid-template-columns: 280px 1fr; gap: 1.75rem; align-items: start;">
      <!-- Director Header Banner (Full Width 100% across top) -->
      <div class="card" style="grid-column: 1 / -1; margin-bottom: 0; background: linear-gradient(135deg, #0f2042, #1e3a8a); border: 1px solid #1e3a8a; padding: 1.15rem 1.75rem; border-radius: var(--radius-lg); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; box-shadow: 0 8px 24px rgba(15, 32, 66, 0.15);">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 52px; height: 52px; border-radius: 14px; background: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: #0f2042; font-weight: 800; box-shadow: 0 4px 14px rgba(0,0,0,0.2);">
            👑
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
              <h2 style="font-size: 1.35rem; color: #ffffff; margin: 0; letter-spacing: -0.01em; font-weight: 800;">DIRECTOR'S EXECUTIVE CONSOLE</h2>
              <span class="status-badge status-active" style="background: rgba(255,255,255,0.18); color: #ffffff; border: 1px solid rgba(255,255,255,0.35); font-size: 0.75rem; padding: 0.2rem 0.65rem; border-radius: 20px; font-weight: 700;">
                Active: ${activeDirector.name}
              </span>
            </div>
            <div style="font-size: 0.85rem; color: #e2e8f0; margin-top: 0.2rem; font-weight: 500;">
              Imperial Commerce Tutorials • Strategic Governance & Master Administration • ${activeDirector.email} • 📞 ${activeDirector.phone}
            </div>
          </div>
        </div>

        <!-- Director Persona Switcher & Fast Global Action Buttons -->
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
          <!-- Persona Switcher -->
          <div style="display: flex; align-items: center; background: rgba(0,0,0,0.25); padding: 0.25rem 0.45rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); gap: 0.35rem;">
            <span style="font-size: 0.72rem; color: #cbd5e1; text-transform: uppercase; font-weight: 700; padding-left: 0.2rem;">Director:</span>
            ${allDirectors.map(dir => {
              const isCur = dir.id === activeDirector.id;
              return `
                <button 
                  class="header-director-switch-btn" 
                  data-director-id="${dir.id}"
                  style="padding: 0.3rem 0.65rem; font-size: 0.76rem; border-radius: 5px; border: 1px solid ${isCur ? '#ffffff' : 'transparent'}; background: ${isCur ? '#ffffff' : 'rgba(255,255,255,0.12)'}; color: ${isCur ? '#0f2042' : '#ffffff'}; font-weight: ${isCur ? '800' : '600'}; cursor: pointer; transition: all 0.2s;"
                  title="Switch acting director to ${dir.name}"
                >
                  ${dir.id === 'dir_ishwari' ? '👩‍💼' : '👨‍💼'} ${dir.name.split(' ')[0]}
                </button>
              `;
            }).join('')}
          </div>

          <!-- Fast Master Creation & Data Management Buttons -->
          <button id="director-quick-course-btn" class="btn" style="padding: 0.55rem 0.85rem; font-size: 0.8rem; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.35); color: #ffffff; font-weight: 700; border-radius: 6px; cursor: pointer;">
            + Course
          </button>
          <button id="director-quick-subject-btn" class="btn" style="padding: 0.55rem 0.85rem; font-size: 0.8rem; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.35); color: #ffffff; font-weight: 700; border-radius: 6px; cursor: pointer;">
            + Subject
          </button>
          <button id="director-quick-enrol-btn" class="btn" style="padding: 0.55rem 0.85rem; font-size: 0.8rem; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.35); color: #ffffff; font-weight: 700; border-radius: 6px; cursor: pointer;">
            + Enrol
          </button>
          <button id="director-quick-receipt-btn" class="btn btn-primary" style="padding: 0.55rem 0.85rem; font-size: 0.8rem; background: #ffffff; color: #0f2042; font-weight: 800; border: none; border-radius: 6px; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
            + Receipt
          </button>
          <button id="director-quick-voucher-btn" class="btn btn-secondary" style="padding: 0.55rem 0.85rem; font-size: 0.8rem; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.35); color: #ffffff; border-radius: 6px; cursor: pointer;">
            + Voucher
          </button>
          <button id="director-quick-cleanup-btn" class="btn" style="padding: 0.55rem 0.85rem; font-size: 0.8rem; background: #fee2e2; border: 1px solid #fca5a5; color: #991b1b; font-weight: 800; border-radius: 6px; cursor: pointer;" title="Director Data Cleanup & Purge Center">
            🧹 Clean Data
          </button>
          <button id="director-quick-credentials-btn" class="btn" style="padding: 0.55rem 0.85rem; font-size: 0.8rem; background: #fef08a; border: 1px solid #facc15; color: #713f12; font-weight: 800; border-radius: 6px; cursor: pointer;" title="Director Ishwari Deshmukh Authority: User IDs & Passwords">
            🔑 User IDs & Passwords
          </button>
        </div>
      </div>

      <!-- Left Column: Director Navigation Sidebar -->
      <aside class="portal-sidebar" style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.25rem; height: fit-content; position: sticky; top: 5.5rem;">
        <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); font-weight: 800; margin-bottom: 0.85rem; padding-left: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
          <span>EXECUTIVE DESK TABS</span>
          <span style="font-size: 0.7rem; background: #eff6ff; color: #1e3a8a; padding: 0.1rem 0.45rem; border-radius: 4px; font-weight: 700;">11 Modules</span>
        </div>
        <nav class="portal-nav-list" style="display: flex; flex-direction: column; gap: 0.4rem;">
          ${tabs.map(t => {
            const isActive = activeTab === t.id;
            return `
              <button 
                class="tab-btn ${isActive ? 'active-tab' : ''}" 
                data-tab="${t.id}"
                style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 0.95rem; border-radius: 8px; font-size: 0.88rem; font-weight: ${isActive ? '700' : '600'}; cursor: pointer; text-align: left; width: 100%; border: 1px solid ${isActive ? '#0f2042' : 'transparent'}; background: ${isActive ? '#eff6ff' : 'transparent'}; color: ${isActive ? '#0f2042' : '#475569'}; transition: all 0.2s ease;"
              >
                <span style="font-size: 1.15rem; width: 22px; text-align: center;">${t.icon}</span>
                <span style="flex: 1;">${t.label}</span>
                ${isActive ? '<span style="font-size: 0.75rem; color: #0f2042;">●</span>' : ''}
              </button>
            `;
          }).join('')}
        </nav>

        <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle); font-size: 0.78rem; color: var(--text-dim); text-align: center;">
          <div style="font-weight: 600; color: #0f2042; margin-bottom: 0.2rem;">Imperial Tutorials</div>
          <div>Satpur Colony & Gangapur Rd</div>
        </div>
      </aside>

      <!-- Right Column: Tab Content Canvas -->
      <section class="portal-content" style="min-width: 0; display: flex; flex-direction: column; gap: 1.25rem;">
        <!-- Active Tab Header Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #0f2042; padding: 0.9rem 1.4rem; border-radius: var(--radius-md); flex-wrap: wrap; gap: 0.75rem; box-shadow: 0 2px 8px rgba(15, 32, 66, 0.05);">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 38px; height: 38px; border-radius: 10px; background: #eff6ff; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; border: 1px solid #bfdbfe;">
              ${currentTabObj.icon}
            </div>
            <div>
              <div style="font-size: 1.1rem; font-weight: 800; color: #0f2042;">${currentTabObj.label}</div>
              <div style="font-size: 0.82rem; color: #64748b; font-weight: 500;">${currentTabObj.desc}</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.78rem; color: #0f2042; background: #eff6ff; padding: 0.35rem 0.75rem; border-radius: 20px; border: 1px solid #bfdbfe; font-weight: 600;">
            <span style="color: #059669;">● Live Data</span> • <span>Executive Authority</span>
          </div>
        </div>

        <!-- Rendered Tab Content Results -->
        <div id="director-tab-content" style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%;">
          <!-- Rendered dynamically -->
        </div>
      </section>
    </div>
  `;

  // Attach tab switcher
  const tabContent = container.querySelector('#director-tab-content');
  const tabBtns = container.querySelectorAll('.tab-btn');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      state.currentDirectorTab = tabId;
      renderDirectorPortal(container, showToast);
    });
  });

  // Attach Director persona switcher in header
  container.querySelectorAll('.header-director-switch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const dirId = btn.getAttribute('data-director-id');
      const dir = state.switchDirector(dirId);
      renderDirectorPortal(container, showToast);
      showToast(`Switched active Director to ${dir.name}.`, 'info');
    });
  });

  // Global action buttons
  const quickCourseBtn = container.querySelector('#director-quick-course-btn');
  if (quickCourseBtn) {
    quickCourseBtn.addEventListener('click', () => {
      openAddCourseModal(showToast, null, () => renderDirectorPortal(container, showToast));
    });
  }

  const quickSubjectBtn = container.querySelector('#director-quick-subject-btn');
  if (quickSubjectBtn) {
    quickSubjectBtn.addEventListener('click', () => {
      openAddSubjectModal(showToast, null, () => renderDirectorPortal(container, showToast));
    });
  }

  const quickEnrolBtn = container.querySelector('#director-quick-enrol-btn');
  if (quickEnrolBtn) {
    quickEnrolBtn.addEventListener('click', () => {
      openEnrolStudentModal(showToast, null, () => renderDirectorPortal(container, showToast));
    });
  }

  const quickReceiptBtn = container.querySelector('#director-quick-receipt-btn');
  if (quickReceiptBtn) {
    quickReceiptBtn.addEventListener('click', () => {
      openFeeReceiptDialog(showToast);
    });
  }

  const quickVoucherBtn = container.querySelector('#director-quick-voucher-btn');
  if (quickVoucherBtn) {
    quickVoucherBtn.addEventListener('click', () => {
      openExpenditureVoucherDialog(showToast);
    });
  }

  const quickCleanupBtn = container.querySelector('#director-quick-cleanup-btn');
  if (quickCleanupBtn) {
    quickCleanupBtn.addEventListener('click', () => {
      openDataCleanupModal(showToast, () => renderDirectorPortal(container, showToast));
    });
  }

  const quickCredentialsBtn = container.querySelector('#director-quick-credentials-btn');
  if (quickCredentialsBtn) {
    quickCredentialsBtn.addEventListener('click', () => {
      state.currentDirectorTab = 'userCredentials';
      renderDirectorPortal(container, showToast);
    });
  }

  // Render the active tab view
  switch (activeTab) {
    case 'academicMaster':
      renderAcademicAndFeeMasterTab(tabContent, showToast);
      break;
    case 'userCredentials':
      renderUserCredentialsTab(tabContent, showToast);
      break;
    case 'fees':
      renderFeeDetailsTab(tabContent, showToast);
      break;
    case 'expenses':
      renderExpensesTab(tabContent, showToast);
      break;
    case 'pnl':
      renderProfitAndLossTab(tabContent);
      break;
    case 'enquiries':
      renderEnquiryReportTab(tabContent, showToast);
      break;
    case 'attendance':
      renderAttendanceTab(tabContent, showToast);
      break;
    case 'performance':
      renderPerformanceTab(tabContent);
      break;
    case 'teachers':
      renderTeachersTab(tabContent, showToast);
      break;
    case 'communication':
      renderCommunicationTab(tabContent, showToast);
      break;
    case 'recruitment':
      renderRecruitmentTab(tabContent, showToast);
      break;
    case 'dataManagement':
      openDataCleanupModal(showToast, () => {
        state.currentDirectorTab = 'fees';
        renderDirectorPortal(container, showToast);
      });
      break;
    default:
      renderAcademicAndFeeMasterTab(tabContent, showToast);
      break;
  }
}

// =============================================================================
// TAB 1: FEE DETAILS TAB
// =============================================================================
function renderFeeDetailsTab(container, showToast) {
  const students = state.students;
  const courses = state.courses;
  const receipts = state.receipts;

  const totalAssessed = students.reduce((acc, s) => acc + (s.totalFees || 0), 0);
  const totalReceived = students.reduce((acc, s) => acc + (s.paidFees || 0), 0);
  const totalDue = students.reduce((acc, s) => acc + (s.dueFees || 0), 0);

  container.innerHTML = `
    <!-- Summary Financial Cards -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
      <div class="card" style="padding: 1.25rem; border: 1px solid var(--border-light); background: rgba(19, 29, 49, 0.7);">
        <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Total Assessed Fees</div>
        <div style="font-size: 1.6rem; font-weight: 800; color: #fff; margin-top: 0.35rem;">₹${totalAssessed.toLocaleString()}</div>
        <div style="font-size: 0.78rem; color: var(--text-dim); margin-top: 0.25rem;">Across ${students.length} Enrolled Commerce Students</div>
      </div>
      <div class="card" style="padding: 1.25rem; border: 1px solid rgba(16, 185, 129, 0.3); background: rgba(16, 185, 129, 0.06);">
        <div style="font-size: 0.8rem; text-transform: uppercase; color: #34d399; font-weight: 600;">Received Fees (Bank UPI/Cash)</div>
        <div style="font-size: 1.6rem; font-weight: 800; color: #34d399; margin-top: 0.35rem;">₹${totalReceived.toLocaleString()}</div>
        <div style="font-size: 0.78rem; color: #6ee7b7; margin-top: 0.25rem;">${Math.round((totalReceived / (totalAssessed || 1)) * 100)}% Overall Recovery</div>
      </div>
      <div class="card" style="padding: 1.25rem; border: 1px solid rgba(239, 68, 68, 0.3); background: rgba(239, 68, 68, 0.06);">
        <div style="font-size: 0.8rem; text-transform: uppercase; color: #f87171; font-weight: 600;">Pending Due Fees</div>
        <div style="font-size: 1.6rem; font-weight: 800; color: #f87171; margin-top: 0.35rem;">₹${totalDue.toLocaleString()}</div>
        <div style="font-size: 0.78rem; color: #fca5a5; margin-top: 0.25rem;">To be recovered via WhatsApp reminders</div>
      </div>
      <div class="card" style="padding: 1.25rem; border: 1px solid var(--border-gold); background: rgba(207, 168, 78, 0.08); display: flex; flex-direction: column; justify-content: space-between;">
        <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent-gold); font-weight: 700;">Student & Fee Actions</div>
        <div style="margin-top: 0.65rem; display: flex; flex-direction: column; gap: 0.45rem;">
          <button id="tab-enrol-student-btn" class="btn btn-primary" style="width: 100%; padding: 0.45rem; background: linear-gradient(135deg, #10b981, #059669); color: #fff; font-weight: 700; border: none; border-radius: 6px; cursor: pointer; font-size: 0.8rem;">
            + Enrol New Student
          </button>
          <button id="tab-new-receipt-btn" class="btn" style="width: 100%; padding: 0.45rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 6px; cursor: pointer; font-size: 0.8rem;">
            + Generate Fee Receipt
          </button>
        </div>
      </div>
    </div>

    <!-- Student Catalogue by Course -->
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <h3 style="font-size: 1.15rem; color: #fff; margin: 0;">Student Fee Catalogue by Course</h3>
          <div style="font-size: 0.82rem; color: var(--text-muted);">Displays course enrolment, subjects chosen, total fees, received, and due balance</div>
        </div>
        <div>
          <select id="course-fee-filter" style="padding: 0.5rem 0.75rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
            <option value="all">All Courses (${courses.length})</option>
            ${courses.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
          </select>
        </div>
      </div>

      <div style="overflow-x: auto;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.78rem; text-transform: uppercase;">
              <th style="padding: 0.75rem;">Roll No & Student</th>
              <th style="padding: 0.75rem;">Course Enrolled</th>
              <th style="padding: 0.75rem;">Subjects Chosen</th>
              <th style="padding: 0.75rem;">Assigned Teacher</th>
              <th style="padding: 0.75rem;">Total Fees</th>
              <th style="padding: 0.75rem;">Received</th>
              <th style="padding: 0.75rem;">Due Fees</th>
              <th style="padding: 0.75rem;">Status</th>
              <th style="padding: 0.75rem; text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody id="student-fee-tbody">
            ${renderStudentFeeRows(students)}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Recent Fee Receipts Log -->
    <div class="card" style="padding: 1.5rem; margin-top: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h3 style="font-size: 1.1rem; color: #fff; margin: 0;">Recent Fee Collection Receipts</h3>
        <span style="font-size: 0.8rem; color: var(--text-gold);">*60% credited to Subject Teacher Remuneration Ledger</span>
      </div>
      <div style="overflow-x: auto;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
              <th style="padding: 0.6rem;">Receipt No</th>
              <th style="padding: 0.6rem;">Date</th>
              <th style="padding: 0.6rem;">Student</th>
              <th style="padding: 0.6rem;">Course</th>
              <th style="padding: 0.6rem;">Amount</th>
              <th style="padding: 0.6rem;">60% Teacher Share</th>
              <th style="padding: 0.6rem;">Mode / Ref</th>
              <th style="padding: 0.6rem; text-align: right;">Print</th>
            </tr>
          </thead>
          <tbody>
            ${receipts.map(r => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 0.6rem; font-family: monospace; font-weight: 700; color: var(--accent-gold);">${r.receiptNo}</td>
                <td style="padding: 0.6rem; color: var(--text-muted);">${r.date}</td>
                <td style="padding: 0.6rem; font-weight: 600;">${r.studentName}</td>
                <td style="padding: 0.6rem;">${r.courseName}</td>
                <td style="padding: 0.6rem; font-weight: 700; color: #34d399;">₹${r.amount.toLocaleString()}</td>
                <td style="padding: 0.6rem; font-weight: 600; color: var(--accent-gold-light);">₹${(r.teacherShare60 || Math.round(r.amount * 0.6)).toLocaleString()}</td>
                <td style="padding: 0.6rem; font-size: 0.8rem; color: var(--text-dim);">${r.mode}</td>
                <td style="padding: 0.6rem; text-align: right; white-space: nowrap;">
                  <button class="view-receipt-btn" data-receipt-no="${r.receiptNo}" style="padding: 0.3rem 0.55rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 4px; color: #fff; cursor: pointer; font-size: 0.75rem;">
                    📄 View
                  </button>
                  <button class="delete-receipt-btn" data-receipt-no="${r.receiptNo}" style="padding: 0.3rem 0.55rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 4px; color: #f87171; cursor: pointer; font-size: 0.75rem; font-weight: 700; margin-left: 0.3rem;" title="Delete Receipt">
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Attach filter event
  const filterSelect = container.querySelector('#course-fee-filter');
  const tbody = container.querySelector('#student-fee-tbody');
  filterSelect.addEventListener('change', () => {
    const val = filterSelect.value;
    const filtered = val === 'all' ? students : students.filter(s => s.courseId === val);
    tbody.innerHTML = renderStudentFeeRows(filtered);
    attachStudentRowEvents(container, showToast);
  });

  // Attach button triggers
  const tabEnrolBtn = container.querySelector('#tab-enrol-student-btn');
  if (tabEnrolBtn) {
    tabEnrolBtn.addEventListener('click', () => {
      openEnrolStudentModal(showToast, null, () => renderFeeDetailsTab(container, showToast));
    });
  }

  container.querySelector('#tab-new-receipt-btn').addEventListener('click', () => {
    openFeeReceiptDialog(showToast);
  });

  attachStudentRowEvents(container, showToast);
  attachReceiptPrintEvents(container);
}

function renderStudentFeeRows(students) {
  return students.map(s => `
    <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
      <td style="padding: 0.75rem;">
        <div style="font-weight: 700; color: #fff;">${s.name}</div>
        <div style="font-size: 0.75rem; color: var(--text-dim); font-family: monospace;">${s.rollNo}</div>
      </td>
      <td style="padding: 0.75rem;">
        <div style="font-weight: 600;">${s.courseName}</div>
        <div style="font-size: 0.72rem; color: var(--text-muted);">${s.batch}</div>
      </td>
      <td style="padding: 0.75rem; font-size: 0.8rem; max-width: 200px;">
        ${(s.subjectsChosen || ['Accounts', 'Economics']).map(sub => `
          <span style="display: inline-block; background: rgba(255,255,255,0.06); padding: 0.15rem 0.4rem; border-radius: 4px; margin: 0.1rem; font-size: 0.72rem; color: #cbd5e1;">
            ${sub}
          </span>
        `).join('')}
      </td>
      <td style="padding: 0.75rem; font-size: 0.8rem; color: var(--text-gold);">
        ${s.assignedTeacher || 'Prof. Arvind Deshpande (CA)'}
      </td>
      <td style="padding: 0.75rem; font-weight: 600;">₹${(s.totalFees || 0).toLocaleString()}</td>
      <td style="padding: 0.75rem; font-weight: 700; color: #34d399;">₹${(s.paidFees || 0).toLocaleString()}</td>
      <td style="padding: 0.75rem; font-weight: 700; color: ${s.dueFees > 0 ? '#f87171' : 'var(--text-dim)'};">
        ₹${(s.dueFees || 0).toLocaleString()}
      </td>
      <td style="padding: 0.75rem;">
        <span class="status-badge" style="padding: 0.2rem 0.55rem; font-size: 0.72rem; border-radius: 4px; font-weight: 700; background: ${s.status === 'Paid' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)'}; color: ${s.status === 'Paid' ? '#34d399' : '#fbbf24'}; border: 1px solid ${s.status === 'Paid' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.4)'};">
          ${s.status}
        </span>
      </td>
      <td style="padding: 0.75rem; text-align: right; white-space: nowrap;">
        <div style="display: flex; gap: 0.35rem; justify-content: flex-end;">
          <button class="row-adjust-btn" data-student-id="${s.id}" style="padding: 0.3rem 0.55rem; background: rgba(255,255,255,0.06); border: 1px solid var(--border-light); border-radius: 4px; color: #cbd5e1; font-size: 0.72rem; cursor: pointer;" title="Director Fee & Subject Adjustment">
            ✏️ Adjust
          </button>
          <button class="row-collect-btn" data-student-id="${s.id}" style="padding: 0.3rem 0.65rem; background: rgba(207,168,78,0.18); border: 1px solid var(--border-gold); border-radius: 4px; color: var(--accent-gold-light); font-size: 0.72rem; font-weight: 600; cursor: pointer;">
            + Receipt
          </button>
          <button class="row-delete-student-btn" data-student-id="${s.id}" data-student-name="${s.name}" style="padding: 0.3rem 0.55rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 4px; color: #f87171; font-size: 0.72rem; cursor: pointer; font-weight: 700;" title="Delete Student Record">
            🗑️ Delete
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function attachStudentRowEvents(container, showToast) {
  container.querySelectorAll('.row-adjust-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sId = btn.getAttribute('data-student-id');
      openEditStudentModal(showToast, sId, () => renderFeeDetailsTab(container, showToast));
    });
  });

  container.querySelectorAll('.row-collect-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sId = btn.getAttribute('data-student-id');
      openFeeReceiptDialog(showToast, sId);
    });
  });

  container.querySelectorAll('.row-delete-student-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sId = btn.getAttribute('data-student-id');
      const sName = btn.getAttribute('data-student-name');
      if (confirm(`Director Authorization: Are you sure you want to delete student "${sName}"? This entry will be permanently deleted from local and cloud databases.`)) {
        state.deleteStudent(sId);
        showToast(`Student "${sName}" successfully deleted.`, 'info');
        renderFeeDetailsTab(container, showToast);
      }
    });
  });
}

function attachReceiptPrintEvents(container) {
  container.querySelectorAll('.view-receipt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const recNo = btn.getAttribute('data-receipt-no');
      const rec = state.receipts.find(r => r.receiptNo === recNo);
      if (rec) {
        const modalContainer = document.getElementById('modal-container');
        openReceiptModal(rec, modalContainer);
      }
    });
  });

  container.querySelectorAll('.delete-receipt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const recNo = btn.getAttribute('data-receipt-no');
      if (confirm(`Director Authorization: Are you sure you want to delete receipt ${recNo}? Corresponding student balance will be recalculated.`)) {
        state.deleteReceipt(recNo);
        showToast(`Receipt ${recNo} successfully deleted.`, 'info');
        renderFeeDetailsTab(container, showToast);
      }
    });
  });
}

// =============================================================================
// TAB 2: EXPENSES TAB (Course-wise & Common with Allocation)
// =============================================================================
function renderExpensesTab(container, showToast) {
  const expenses = state.expenses;
  const courses = state.courses;

  const totalExpenses = expenses.reduce((acc, e) => acc + (e.amount || 0), 0);
  const commonExpenses = expenses.filter(e => e.isCommon || e.courseId === 'common');
  const directExpenses = expenses.filter(e => !e.isCommon && e.courseId !== 'common');

  container.innerHTML = `
    <!-- Top Action & Metrics -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
      <div class="card" style="padding: 1.25rem; border: 1px solid var(--border-light); background: rgba(19, 29, 49, 0.7);">
        <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Total Expenditure</div>
        <div style="font-size: 1.6rem; font-weight: 800; color: #fff; margin-top: 0.35rem;">₹${totalExpenses.toLocaleString()}</div>
        <div style="font-size: 0.78rem; color: var(--text-dim); margin-top: 0.25rem;">Total Vouchers: ${expenses.length}</div>
      </div>
      <div class="card" style="padding: 1.25rem; border: 1px solid rgba(37, 99, 235, 0.3); background: rgba(37, 99, 235, 0.08);">
        <div style="font-size: 0.8rem; text-transform: uppercase; color: #60a5fa; font-weight: 600;">Common Expenditure</div>
        <div style="font-size: 1.6rem; font-weight: 800; color: #60a5fa; margin-top: 0.35rem;">₹${commonExpenses.reduce((a, b) => a + b.amount, 0).toLocaleString()}</div>
        <div style="font-size: 0.78rem; color: #93c5fd; margin-top: 0.25rem;">Rent, Broadband, Utilities Allocated Across Courses</div>
      </div>
      <div class="card" style="padding: 1.25rem; border: 1px solid rgba(245, 158, 11, 0.3); background: rgba(245, 158, 11, 0.08);">
        <div style="font-size: 0.8rem; text-transform: uppercase; color: #fbbf24; font-weight: 600;">Course Direct Expenses</div>
        <div style="font-size: 1.6rem; font-weight: 800; color: #fbbf24; margin-top: 0.35rem;">₹${directExpenses.reduce((a, b) => a + b.amount, 0).toLocaleString()}</div>
        <div style="font-size: 0.78rem; color: #fde68a; margin-top: 0.25rem;">Printing, Course Materials & Faculty Honorarium</div>
      </div>
      <div class="card" style="padding: 1.25rem; border: 1px solid var(--border-gold); background: rgba(207, 168, 78, 0.08);">
        <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent-gold); font-weight: 600;">New Voucher Action</div>
        <div style="margin-top: 0.75rem;">
          <button id="exp-create-voucher-btn" class="btn btn-primary" style="width: 100%; padding: 0.55rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 6px; cursor: pointer;">
            + Create New Voucher
          </button>
        </div>
      </div>
    </div>

    <!-- Dynamic Common Expenditure Allocation Breakdown Panel (Strictly Proportionate to Student Counts) -->
    ${(() => {
      const scheme = state.getCommonExpenseAllocationScheme();
      return `
        <div class="card" style="padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid var(--border-accent); background: rgba(37, 99, 235, 0.05); border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <h4 style="font-size: 1.1rem; color: #93c5fd; margin: 0; font-weight: 800;">
                  🏢 Common Expenditure Allocation Scheme (% of Shared Overheads)
                </h4>
                <span class="status-badge" style="background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); font-size: 0.72rem; padding: 0.2rem 0.55rem; border-radius: 4px; font-weight: 700;">
                  ✓ Proportion of Students Rule
                </span>
              </div>
              <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.35rem;">
                Shared overheads are distributed in exact proportion to enrolled student headcount: 
                <span style="font-family: monospace; color: var(--accent-gold); font-weight: 600;">Allocation % = (Student Count in Unit ÷ Total Enrolled Students [${scheme.totalStudents}]) × 100</span>
              </div>
            </div>
            <div style="text-align: right; background: rgba(19, 29, 49, 0.7); padding: 0.5rem 0.85rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
              <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted);">Total Institute Headcount</div>
              <div style="font-size: 1.25rem; font-weight: 800; color: #fff;">${scheme.totalStudents} Students</div>
            </div>
          </div>

          <!-- Section 1: Branch-Wise Allocation of Central Shared Overheads -->
          <div style="margin-bottom: 1.25rem;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.65rem; display: flex; align-items: center; justify-content: space-between;">
              <span>1. Branch-Wise Overhead Apportionment (Head-Office Cloud ERP & Compliance: ₹${scheme.totalCentralShared.toLocaleString()})</span>
              <span style="font-size: 0.75rem; color: var(--accent-gold); font-weight: normal;">Two Center Split</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
              ${scheme.branchesAllocation.map(b => `
                <div style="background: rgba(19, 29, 49, 0.85); padding: 1rem; border-radius: 8px; border: 1px solid ${b.id === 'b1' ? 'rgba(96, 165, 250, 0.4)' : 'rgba(52, 211, 153, 0.4)'};">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <div>
                      <span style="font-weight: 700; color: #fff; font-size: 0.95rem;">${b.name}</span>
                      <div style="font-size: 0.75rem; color: var(--text-dim);">${b.landmark}</div>
                    </div>
                    <span style="font-size: 1rem; font-weight: 800; color: ${b.id === 'b1' ? '#60a5fa' : '#34d399'}; background: rgba(255,255,255,0.06); padding: 0.2rem 0.6rem; border-radius: 6px;">
                      ${b.pct}% Share
                    </span>
                  </div>
                  
                  <!-- Student Progress Bar -->
                  <div style="background: rgba(255,255,255,0.08); height: 6px; border-radius: 3px; overflow: hidden; margin: 0.65rem 0;">
                    <div style="background: ${b.id === 'b1' ? 'linear-gradient(90deg, #3b82f6, #60a5fa)' : 'linear-gradient(90deg, #10b981, #34d399)'}; height: 100%; width: ${b.pct}%;"></div>
                  </div>

                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.78rem; margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.06);">
                    <div>
                      <span style="color: var(--text-muted);">Enrolled Students:</span>
                      <div style="font-weight: 700; color: #fff;">${b.studentCount} / ${scheme.totalStudents} (${b.pct}%)</div>
                    </div>
                    <div>
                      <span style="color: var(--text-muted);">Allocated Shared Overhead:</span>
                      <div style="font-weight: 700; color: var(--accent-gold-light);">₹${b.allocatedCentral.toLocaleString()}</div>
                    </div>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.76rem; color: var(--text-dim); margin-top: 0.4rem;">
                    <span>Direct Facility Overheads (Rent & Utilities):</span>
                    <span style="color: #cbd5e1; font-weight: 600;">₹${b.totalFacility.toLocaleString()}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; color: #fff; margin-top: 0.4rem; padding-top: 0.35rem; border-top: 1px dashed rgba(255,255,255,0.1);">
                    <span>Total Center Overhead Burden:</span>
                    <span style="color: ${b.id === 'b1' ? '#93c5fd' : '#a7f3d0'};">₹${b.totalAllocatedOverheads.toLocaleString()}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Section 2: Course-Wise Allocation Scheme of Common Overheads -->
          <div>
            <div style="font-size: 0.85rem; font-weight: 700; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.65rem; display: flex; align-items: center; justify-content: space-between;">
              <span>2. Course-Wise Allocation Scheme (Total Common Overheads: ₹${scheme.totalCommonExp.toLocaleString()})</span>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Dynamically scales with student admissions</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem;">
              ${scheme.coursesAllocation.map(c => `
                <div style="background: rgba(19, 29, 49, 0.8); padding: 0.75rem; border-radius: 6px; border: 1px solid var(--border-subtle); display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                      <span style="font-size: 0.82rem; font-weight: 700; color: #fff;">${c.courseName}</span>
                      <span style="font-size: 0.7rem; font-family: monospace; color: var(--text-dim);">${c.code}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.35rem;">
                      <span style="font-size: 0.76rem; color: var(--text-muted);">${c.studentCount} Student${c.studentCount !== 1 ? 's' : ''}</span>
                      <span style="font-size: 0.85rem; font-weight: 800; color: #60a5fa;">${c.pct}%</span>
                    </div>
                  </div>
                  
                  <div style="background: rgba(255,255,255,0.06); height: 4px; border-radius: 2px; overflow: hidden; margin: 0.45rem 0;">
                    <div style="background: #3b82f6; height: 100%; width: ${c.pct}%;"></div>
                  </div>

                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; padding-top: 0.35rem; border-top: 1px solid rgba(255,255,255,0.05);">
                    <span style="color: var(--text-dim);">Allocated ₹:</span>
                    <span style="font-weight: 700; color: var(--accent-gold);">₹${c.allocatedAmount.toLocaleString()}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    })()}

    <!-- Expenditure Vouchers Table -->
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">
        <h3 style="font-size: 1.15rem; color: #fff; margin: 0;">Authorized Expenditure Vouchers</h3>
        <span style="font-size: 0.8rem; color: var(--text-muted);">Showing all vouchers authorized by Director or Admin</span>
      </div>

      <div style="overflow-x: auto;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
              <th style="padding: 0.65rem;">Voucher No</th>
              <th style="padding: 0.65rem;">Date</th>
              <th style="padding: 0.65rem;">Payee & Description</th>
              <th style="padding: 0.65rem;">Category</th>
              <th style="padding: 0.65rem;">Type</th>
              <th style="padding: 0.65rem;">Amount</th>
              <th style="padding: 0.65rem;">Mode / Ref</th>
              <th style="padding: 0.65rem;">Authorized By</th>
              <th style="padding: 0.65rem; text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${expenses.map(exp => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 0.65rem; font-family: monospace; font-weight: 700; color: var(--accent-gold);">${exp.voucherNo}</td>
                <td style="padding: 0.65rem; color: var(--text-muted);">${exp.date}</td>
                <td style="padding: 0.65rem;">
                  <div style="font-weight: 600; color: #fff;">${exp.payee}</div>
                  <div style="font-size: 0.75rem; color: var(--text-dim);">${exp.description}</div>
                </td>
                <td style="padding: 0.65rem; color: var(--text-muted);">${exp.category}</td>
                <td style="padding: 0.65rem;">
                  <span style="display: inline-block; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.72rem; font-weight: 700; ${exp.isCommon ? 'background: rgba(37, 99, 235, 0.2); color: #60a5fa;' : 'background: rgba(245, 158, 11, 0.2); color: #fbbf24;'}">
                    ${exp.isCommon ? 'Common Allocated' : `Course: ${exp.courseId}`}
                  </span>
                </td>
                <td style="padding: 0.65rem; font-weight: 700; color: #f87171;">₹${exp.amount.toLocaleString()}</td>
                <td style="padding: 0.65rem; font-size: 0.75rem; color: var(--text-muted);">${exp.mode} (${exp.reference})</td>
                <td style="padding: 0.65rem; font-size: 0.8rem; color: var(--text-gold);">${exp.authorizedBy}</td>
                <td style="padding: 0.65rem; text-align: right; white-space: nowrap;">
                  <button class="view-voucher-btn" data-voucher-no="${exp.voucherNo}" style="padding: 0.3rem 0.55rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 4px; color: #fff; cursor: pointer; font-size: 0.75rem;">
                    🧾 View
                  </button>
                  <button class="delete-voucher-btn" data-voucher-no="${exp.voucherNo}" style="padding: 0.3rem 0.55rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 4px; color: #f87171; cursor: pointer; font-size: 0.75rem; font-weight: 700; margin-left: 0.3rem;" title="Delete Voucher">
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Attach new voucher
  container.querySelector('#exp-create-voucher-btn').addEventListener('click', () => {
    openExpenditureVoucherDialog(showToast);
  });

  // Attach view voucher modal
  container.querySelectorAll('.view-voucher-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const vNo = btn.getAttribute('data-voucher-no');
      const v = state.expenses.find(e => e.voucherNo === vNo);
      if (v) {
        const modalContainer = document.getElementById('modal-container');
        openVoucherModal(v, modalContainer);
      }
    });
  });

  // Attach delete voucher listener
  container.querySelectorAll('.delete-voucher-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const vNo = btn.getAttribute('data-voucher-no');
      if (confirm(`Director Authorization: Are you sure you want to delete expenditure voucher ${vNo}?`)) {
        state.deleteExpense(vNo);
        showToast(`Voucher ${vNo} deleted.`, 'info');
        renderExpensesTab(container, showToast);
      }
    });
  });
}

// =============================================================================
// TAB 3: PROFIT & LOSS TAB (Branch 1 P&L, Branch 2 P&L, Two-Branch Comparison, Course-wise, Integrated)
// =============================================================================
function renderProfitAndLossTab(container) {
  const branchData = state.getBranchProfitAndLossReport();
  const { courseWise, integrated } = state.getProfitAndLossReport();
  const satpurBranch = branchData.branches.find(b => b.id === 'b1') || branchData.branches[0];
  const gangapurBranch = branchData.branches.find(b => b.id === 'b2') || branchData.branches[1];

  const urlSub = new URLSearchParams(window.location.search).get('subtab');
  let currentSubTab = urlSub && ['b1', 'b2', 'compare', 'course', 'integrated'].includes(urlSub) ? urlSub : 'b1';

  const subTabs = [
    { id: 'b1', label: '🏛️ Branch 1: Satpur Colony P&L', desc: 'Near Saptashrungi Mandir Center' },
    { id: 'b2', label: '🏛️ Branch 2: Gangapur Road P&L', desc: 'Jehan Circle, Bramhecha Estate' },
    { id: 'compare', label: '⚖️ Two-Branch Comparison', desc: 'Side-by-side comparative ledger' },
    { id: 'course', label: '📊 Course-Wise P&L', desc: 'All 6 commerce programs' },
    { id: 'integrated', label: '🏢 Integrated Institute P&L', desc: 'Consolidated EBITDA statement' }
  ];

  function renderCurrentSubView() {
    switch (currentSubTab) {
      case 'b1':
        return renderBranchPnlView(satpurBranch, branchData.allocationScheme);
      case 'b2':
        return renderBranchPnlView(gangapurBranch, branchData.allocationScheme);
      case 'compare':
        return renderBranchComparisonView(branchData);
      case 'course':
        return renderCourseWisePnlView(courseWise);
      case 'integrated':
        return renderIntegratedPnlView(integrated);
      default:
        return renderBranchPnlView(satpurBranch, branchData.allocationScheme);
    }
  }

  container.innerHTML = `
    <!-- Sub-tab switcher with 5 distinct financial perspectives -->
    <div style="display: flex; gap: 0.6rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
      ${subTabs.map(st => {
        const isActive = st.id === currentSubTab;
        return `
          <button 
            id="pnl-subtab-${st.id}" 
            class="pnl-subtab-btn btn ${isActive ? 'active-tab' : ''}" 
            data-sub="${st.id}"
            style="padding: 0.6rem 1.1rem; border-radius: 8px; font-size: 0.84rem; cursor: pointer; transition: all 0.2s; font-weight: ${isActive ? '700' : '600'}; border: 1px solid ${isActive ? 'var(--accent-gold)' : 'var(--border-subtle)'}; background: ${isActive ? 'rgba(207,168,78,0.18)' : 'rgba(255,255,255,0.03)'}; color: ${isActive ? 'var(--accent-gold-light)' : 'var(--text-muted)'}; display: flex; flex-direction: column; align-items: flex-start; gap: 0.15rem;"
          >
            <span>${st.label}</span>
            <span style="font-size: 0.7rem; font-weight: normal; opacity: 0.8;">${st.desc}</span>
          </button>
        `;
      }).join('')}
    </div>

    <!-- P&L View Container -->
    <div id="pnl-view-container">
      ${renderCurrentSubView()}
    </div>
  `;

  // Attach subtab click events
  const viewContainer = container.querySelector('#pnl-view-container');
  const subTabBtns = container.querySelectorAll('.pnl-subtab-btn');

  subTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const subId = btn.getAttribute('data-sub');
      currentSubTab = subId;

      subTabBtns.forEach(b => {
        const isSelected = b.getAttribute('data-sub') === currentSubTab;
        b.style.border = isSelected ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)';
        b.style.background = isSelected ? 'rgba(207,168,78,0.18)' : 'rgba(255,255,255,0.03)';
        b.style.color = isSelected ? 'var(--accent-gold-light)' : 'var(--text-muted)';
        b.style.fontWeight = isSelected ? '700' : '600';
      });

      viewContainer.innerHTML = renderCurrentSubView();
    });
  });
}

/**
 * Render Separate P&L Account for a Single Branch
 */
function renderBranchPnlView(branch, allocationScheme) {
  const isSatpur = branch.id === 'b1';

  return `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <!-- Branch Header Banner -->
      <div class="card" style="padding: 1.25rem 1.5rem; border: 1px solid ${branch.color}50; background: linear-gradient(135deg, rgba(19, 29, 49, 0.9), rgba(13, 21, 39, 0.9)); border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: ${branch.badgeBg}; border: 1px solid ${branch.badgeBorder}; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: ${branch.color};">
            🏛️
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
              <h3 style="font-size: 1.25rem; color: #fff; margin: 0; font-weight: 800;">${branch.name}</h3>
              <span class="status-badge" style="background: ${branch.badgeBg}; color: ${branch.color}; border: 1px solid ${branch.badgeBorder}; font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 4px; font-weight: 700;">
                ${branch.landmark}
              </span>
              <span class="status-badge" style="background: rgba(207,168,78,0.15); color: var(--accent-gold); border: 1px solid var(--border-gold); font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 4px; font-weight: 700;">
                ${branch.studentCount} Students (${branch.studentSharePct}% of Institute)
              </span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">
              📍 ${branch.address} • 📞 ${branch.phone} • ⏰ ${branch.timing}
            </div>
          </div>
        </div>

        <div style="text-align: right; background: rgba(0,0,0,0.25); padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
          <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Common Shared Overhead Share</div>
          <div style="font-size: 1.15rem; font-weight: 800; color: var(--accent-gold);">${branch.studentCount}/${allocationScheme.totalStudents} (${branch.studentSharePct}%)</div>
        </div>
      </div>

      <!-- Financial Metric Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 1rem;">
        <div class="card" style="padding: 1.25rem; border: 1px solid rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.06); border-radius: var(--radius-md);">
          <div style="font-size: 0.78rem; text-transform: uppercase; color: #34d399; font-weight: 700;">Branch Fee Revenue</div>
          <div style="font-size: 1.8rem; font-weight: 800; color: #34d399; margin: 0.35rem 0;">₹${branch.feeCollections.toLocaleString()}</div>
          <div style="font-size: 0.78rem; color: #6ee7b7;">
            ${branch.recoveryRate}% collected of ₹${branch.totalFeesAssessed.toLocaleString()} assessed
          </div>
        </div>

        <div class="card" style="padding: 1.25rem; border: 1px solid rgba(239, 68, 68, 0.35); background: rgba(239, 68, 68, 0.06); border-radius: var(--radius-md);">
          <div style="font-size: 0.78rem; text-transform: uppercase; color: #f87171; font-weight: 700;">Total Center Costs</div>
          <div style="font-size: 1.8rem; font-weight: 800; color: #f87171; margin: 0.35rem 0;">₹${branch.totalOperatingCost.toLocaleString()}</div>
          <div style="font-size: 0.78rem; color: #fca5a5;">
            Teacher share + direct costs + rent & utilities + allocated overheads
          </div>
        </div>

        <div class="card" style="padding: 1.25rem; border: 1px solid ${branch.netSurplus >= 0 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}; background: ${branch.netSurplus >= 0 ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)'}; border-radius: var(--radius-md);">
          <div style="font-size: 0.78rem; text-transform: uppercase; color: ${branch.netSurplus >= 0 ? '#34d399' : '#f87171'}; font-weight: 700;">Net Center Surplus (EBITDA)</div>
          <div style="font-size: 1.8rem; font-weight: 800; color: ${branch.netSurplus >= 0 ? '#34d399' : '#f87171'}; margin: 0.35rem 0;">
            ${branch.netSurplus >= 0 ? '+' : ''}₹${branch.netSurplus.toLocaleString()}
          </div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">
            Operating Margin: <span style="font-weight: 700; color: ${branch.profitMargin >= 0 ? '#34d399' : '#f87171'};">${branch.profitMargin}%</span>
          </div>
        </div>

        <div class="card" style="padding: 1.25rem; border: 1px solid rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.06); border-radius: var(--radius-md);">
          <div style="font-size: 0.78rem; text-transform: uppercase; color: #fbbf24; font-weight: 700;">Pending Student Dues</div>
          <div style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin: 0.35rem 0;">₹${branch.dueFees.toLocaleString()}</div>
          <div style="font-size: 0.78rem; color: #fde68a;">
            Awaiting 2nd installment recovery from ${branch.students.filter(s => s.dueFees > 0).length} students
          </div>
        </div>
      </div>

      <!-- Financial Statement & Ledger Breakdown Card -->
      <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <h4 style="font-size: 1.15rem; color: #fff; margin: 0; font-weight: 800;">
              📖 ${branch.name} — Profit & Loss Account Ledger
            </h4>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
              Audited statement of revenues, 60% teacher honorarium allocation, facility overheads, and student-proportionate shared costs.
            </div>
          </div>
          <span style="font-size: 0.75rem; color: var(--accent-gold); background: rgba(207,168,78,0.1); padding: 0.3rem 0.6rem; border-radius: 4px; border: 1px solid var(--border-gold);">
            Director Approved Ledger
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem;">
          <!-- Left: Revenue & Cost Rows -->
          <div style="background: rgba(19, 29, 49, 0.7); padding: 1.25rem; border-radius: 8px; border: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 0.7rem;">
            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; padding-bottom: 0.6rem; border-bottom: 1px solid rgba(255,255,255,0.08);">
              <span style="font-weight: 700; color: #fff;">1. Gross Tuition Fee Collections (Revenue)</span>
              <span style="font-weight: 800; color: #34d399;">₹${branch.feeCollections.toLocaleString()}</span>
            </div>

            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-muted); padding-left: 0.75rem;">
              <span>• Less: 60% Subject Teacher Remuneration Share</span>
              <span style="font-weight: 700; color: var(--accent-gold-light);">- ₹${branch.teacherFeeShare60.toLocaleString()}</span>
            </div>

            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-muted); padding-left: 0.75rem;">
              <span>• Less: Direct Course Materials & Printing</span>
              <span style="font-weight: 700; color: #f87171;">- ₹${branch.directExpenses.toLocaleString()}</span>
            </div>

            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-muted); padding-left: 0.75rem;">
              <span>• Less: Center Facility Lease / Rent</span>
              <span style="font-weight: 700; color: #f87171;">- ₹${branch.facilityRent.toLocaleString()}</span>
            </div>

            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-muted); padding-left: 0.75rem;">
              <span>• Less: Smart Classroom Utilities & Broadband</span>
              <span style="font-weight: 700; color: #f87171;">- ₹${branch.facilityUtilities.toLocaleString()}</span>
            </div>

            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: #93c5fd; padding-left: 0.75rem; background: rgba(59, 130, 246, 0.08); padding: 0.35rem 0.5rem; border-radius: 4px; border: 1px solid rgba(59, 130, 246, 0.2);">
              <span>
                • Less: Allocated Shared Head-Office ERP (${branch.studentSharePct}% by student count)
              </span>
              <span style="font-weight: 700; color: #93c5fd;">- ₹${branch.allocatedSharedOverheads.toLocaleString()}</span>
            </div>

            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; padding-top: 0.6rem; border-top: 1px solid rgba(255,255,255,0.08);">
              <span style="font-weight: 700; color: #fca5a5;">Total Center Operating Expenditure</span>
              <span style="font-weight: 800; color: #f87171;">₹${branch.totalOperatingCost.toLocaleString()}</span>
            </div>

            <div style="display: flex; justify-content: space-between; font-size: 1.05rem; padding-top: 0.65rem; border-top: 2px solid var(--border-gold); margin-top: 0.25rem;">
              <span style="font-weight: 800; color: #fff;">Net Retained Branch Surplus (EBITDA)</span>
              <span style="font-weight: 800; color: ${branch.netSurplus >= 0 ? '#34d399' : '#f87171'};">
                ${branch.netSurplus >= 0 ? '+' : ''}₹${branch.netSurplus.toLocaleString()}
              </span>
            </div>
          </div>

          <!-- Right: Strategic Insights & Pending Realization -->
          <div style="display: flex; flex-direction: column; gap: 0.85rem;">
            <div style="background: rgba(207, 168, 78, 0.08); border: 1px solid var(--border-gold); padding: 1.15rem; border-radius: 8px;">
              <div style="font-size: 0.85rem; font-weight: 700; color: var(--accent-gold); text-transform: uppercase;">
                💡 Branch Operating Dynamics
              </div>
              <p style="font-size: 0.82rem; color: #cbd5e1; margin: 0.5rem 0 0.75rem; line-height: 1.45;">
                ${isSatpur ? `
                  Satpur Colony Center is currently hosting elite morning CA Inter batches and evening 11th Commerce foundations. 
                  Because fee receipts reflect initial term installments (₹60,000 collected against ₹1,07,000 committed), 
                  there is an upcoming <strong>₹47,000</strong> in pending dues to be realized.
                ` : `
                  Gangapur Road Center is the flagship commercial campus hosting 12th Commerce, CMA Inter, CS Executive, and Cambridge IGCSE. 
                  Healthy fee recovery of <strong>78%</strong> (₹1,83,000) generates a positive net operating surplus of <strong>₹${branch.netSurplus.toLocaleString()}</strong> even after paying Cambridge license fees.
                `}
              </p>
              <div style="padding: 0.5rem 0.75rem; background: rgba(0,0,0,0.25); border-radius: 6px; font-size: 0.78rem; color: var(--text-muted); display: flex; justify-content: space-between;">
                <span>Projected Surplus upon 100% Fee Collection:</span>
                <span style="font-weight: 800; color: #34d399;">
                  +₹${(branch.netSurplus + Math.round(branch.dueFees * 0.40)).toLocaleString()}
                </span>
              </div>
            </div>

            <!-- Overheads Allocation Rule Transparency Box -->
            <div style="background: rgba(37, 99, 235, 0.06); border: 1px solid rgba(37, 99, 235, 0.3); padding: 1.15rem; border-radius: 8px;">
              <div style="font-size: 0.85rem; font-weight: 700; color: #93c5fd; text-transform: uppercase;">
                ⚖️ Statutory Allocation Scheme Transparency
              </div>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.4rem; line-height: 1.4;">
                Head-office shared infrastructure (Management ERP Cloud & Statutory Audit) of ₹${allocationScheme.totalCentralShared.toLocaleString()} is allocated to ${branch.name} strictly based on its student strength:
                <div style="font-family: monospace; font-size: 0.82rem; color: var(--accent-gold); margin-top: 0.35rem; font-weight: 700;">
                  ${branch.studentCount} students ÷ ${allocationScheme.totalStudents} total students × ₹${allocationScheme.totalCentralShared.toLocaleString()} = ₹${branch.allocatedSharedOverheads.toLocaleString()} (${branch.studentSharePct}%)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Course-Wise Breakdown inside this Branch -->
      <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <h4 style="font-size: 1.1rem; color: #fff; margin: 0; font-weight: 800;">
              Academic Programs Active at ${branch.shortName}
            </h4>
            <div style="font-size: 0.8rem; color: var(--text-muted);">
              Course-level contribution, teacher honorarium pool, and allocated center costs.
            </div>
          </div>
          <span style="font-size: 0.75rem; color: var(--text-dim);">${branch.courses.length} Active Courses</span>
        </div>

        <div style="overflow-x: auto;">
          <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
                <th style="padding: 0.65rem;">Course Name</th>
                <th style="padding: 0.65rem;">Students</th>
                <th style="padding: 0.65rem;">Assessed Fees</th>
                <th style="padding: 0.65rem;">Collected Revenue</th>
                <th style="padding: 0.65rem;">60% Teacher Share</th>
                <th style="padding: 0.65rem;">Direct Expenses</th>
                <th style="padding: 0.65rem;">Branch Overheads</th>
                <th style="padding: 0.65rem;">Total Cost</th>
                <th style="padding: 0.65rem;">Net Surplus</th>
                <th style="padding: 0.65rem; text-align: right;">Margin %</th>
              </tr>
            </thead>
            <tbody>
              ${branch.courses.map(c => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 0.65rem; font-weight: 700; color: #fff;">
                    ${c.course.name}
                    <div style="font-size: 0.72rem; color: var(--text-dim); font-weight: normal;">${c.course.code}</div>
                  </td>
                  <td style="padding: 0.65rem; color: var(--text-muted);">${c.studentCount}</td>
                  <td style="padding: 0.65rem; font-weight: 600;">₹${c.assessed.toLocaleString()}</td>
                  <td style="padding: 0.65rem; font-weight: 700; color: #34d399;">₹${c.revenue.toLocaleString()}</td>
                  <td style="padding: 0.65rem; color: var(--accent-gold-light);">₹${c.teacherShare.toLocaleString()}</td>
                  <td style="padding: 0.65rem; color: #f87171;">₹${c.directExpenses.toLocaleString()}</td>
                  <td style="padding: 0.65rem; color: #60a5fa;">₹${c.allocatedOverheads.toLocaleString()}</td>
                  <td style="padding: 0.65rem; font-weight: 600; color: #fca5a5;">₹${c.totalCost.toLocaleString()}</td>
                  <td style="padding: 0.65rem; font-weight: 800; color: ${c.netSurplus >= 0 ? '#34d399' : '#f87171'};">
                    ${c.netSurplus >= 0 ? '+' : ''}₹${c.netSurplus.toLocaleString()}
                  </td>
                  <td style="padding: 0.65rem; text-align: right;">
                    <span style="display: inline-block; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 700; font-size: 0.72rem; ${c.profitMargin >= 20 ? 'background: rgba(16, 185, 129, 0.2); color: #34d399;' : 'background: rgba(245, 158, 11, 0.2); color: #fbbf24;'}">
                      ${c.profitMargin}%
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Enrolled Students Roster at this Branch -->
      <div class="card" style="padding: 1.25rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
        <div style="font-size: 0.85rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem; display: flex; align-items: center; justify-content: space-between;">
          <span>Students Enrolled at ${branch.name}</span>
          <span style="font-size: 0.75rem; color: var(--text-dim);">${branch.students.length} Total Enrolled</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.75rem;">
          ${branch.students.map(s => `
            <div style="background: rgba(19, 29, 49, 0.8); padding: 0.75rem 1rem; border-radius: 6px; border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-weight: 700; color: #fff; font-size: 0.88rem;">${s.name}</div>
                <div style="font-size: 0.75rem; color: var(--text-dim);">${s.rollNo} • ${s.courseName}</div>
              </div>
              <div style="text-align: right;">
                <div style="font-weight: 700; color: #34d399; font-size: 0.85rem;">₹${(s.paidFees || 0).toLocaleString()}</div>
                <span class="status-badge" style="font-size: 0.7rem; padding: 0.15rem 0.45rem; border-radius: 4px; ${s.status === 'Paid' ? 'background: rgba(16, 185, 129, 0.15); color: #34d399;' : 'background: rgba(245, 158, 11, 0.15); color: #fbbf24;'}">
                  ${s.status}
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/**
 * Render Side-by-Side Comparison of the Two Branches
 */
function renderBranchComparisonView(branchData) {
  const { branches, consolidated, allocationScheme } = branchData;
  const b1 = branches.find(b => b.id === 'b1') || branches[0];
  const b2 = branches.find(b => b.id === 'b2') || branches[1];

  return `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <!-- Comparison Header Banner -->
      <div class="card" style="padding: 1.25rem 1.5rem; border: 1px solid var(--border-gold); background: linear-gradient(135deg, rgba(19, 29, 49, 0.95), rgba(13, 21, 39, 0.95)); border-radius: var(--radius-md);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div>
            <h3 style="font-size: 1.3rem; color: #fff; margin: 0; font-weight: 800;">
              ⚖️ Two-Branch Side-by-Side Comparative Statement
            </h3>
            <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.25rem;">
              Comparative evaluation of Branch 1 (Satpur Colony) vs Branch 2 (Gangapur Road) vs Consolidated Imperial Commerce Tutorials.
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="status-badge" style="background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.4); font-size: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 4px; font-weight: 700;">
              Satpur: ${b1.studentCount} Students (33.3%)
            </span>
            <span class="status-badge" style="background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); font-size: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 4px; font-weight: 700;">
              Gangapur: ${b2.studentCount} Students (66.7%)
            </span>
          </div>
        </div>
      </div>

      <!-- Comparative Side-by-Side Ledger Table -->
      <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
        <div style="overflow-x: auto;">
          <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border-gold); color: #fff; font-size: 0.82rem; text-transform: uppercase;">
                <th style="padding: 0.85rem 1rem; width: 34%;">Financial & Operational Parameters</th>
                <th style="padding: 0.85rem 1rem; width: 22%; color: #93c5fd; background: rgba(59, 130, 246, 0.05);">
                  🏛️ Branch 1: Satpur Colony
                </th>
                <th style="padding: 0.85rem 1rem; width: 22%; color: #34d399; background: rgba(16, 185, 129, 0.05);">
                  🏛️ Branch 2: Gangapur Road
                </th>
                <th style="padding: 0.85rem 1rem; width: 22%; color: var(--accent-gold); background: rgba(207, 168, 78, 0.05);">
                  🏢 Consolidated Institute
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Row: Campus Landmark -->
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                <td style="padding: 0.75rem 1rem; font-weight: 700; color: #cbd5e1;">Campus Landmark & Location</td>
                <td style="padding: 0.75rem 1rem; color: var(--text-dim); background: rgba(59, 130, 246, 0.02);">${b1.landmark}</td>
                <td style="padding: 0.75rem 1rem; color: var(--text-dim); background: rgba(16, 185, 129, 0.02);">${b2.landmark}</td>
                <td style="padding: 0.75rem 1rem; font-weight: 600; color: #fff; background: rgba(207, 168, 78, 0.02);">Nashik (2 Centers)</td>
              </tr>

              <!-- Row: Student Strength -->
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                <td style="padding: 0.75rem 1rem; font-weight: 700; color: #fff;">
                  👥 Enrolled Students
                  <div style="font-size: 0.72rem; color: var(--text-dim); font-weight: normal;">Basis of common overhead allocation</div>
                </td>
                <td style="padding: 0.75rem 1rem; font-weight: 800; color: #60a5fa; background: rgba(59, 130, 246, 0.05);">
                  ${b1.studentCount} Students (${b1.studentSharePct}%)
                </td>
                <td style="padding: 0.75rem 1rem; font-weight: 800; color: #34d399; background: rgba(16, 185, 129, 0.05);">
                  ${b2.studentCount} Students (${b2.studentSharePct}%)
                </td>
                <td style="padding: 0.75rem 1rem; font-weight: 800; color: var(--accent-gold); background: rgba(207, 168, 78, 0.05);">
                  ${consolidated.studentCount} Students (100%)
                </td>
              </tr>

              <!-- Row: Assessed Fees -->
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                <td style="padding: 0.75rem 1rem; font-weight: 600; color: #cbd5e1;">Total Assessed Curriculum Fees</td>
                <td style="padding: 0.75rem 1rem; background: rgba(59, 130, 246, 0.02);">₹${b1.totalFeesAssessed.toLocaleString()}</td>
                <td style="padding: 0.75rem 1rem; background: rgba(16, 185, 129, 0.02);">₹${b2.totalFeesAssessed.toLocaleString()}</td>
                <td style="padding: 0.75rem 1rem; font-weight: 700; color: #fff; background: rgba(207, 168, 78, 0.02);">₹${consolidated.totalFeesAssessed.toLocaleString()}</td>
              </tr>

              <!-- Row: Fee Collections (Revenue) -->
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.06); background: rgba(16, 185, 129, 0.04);">
                <td style="padding: 0.75rem 1rem; font-weight: 800; color: #34d399;">
                  💰 Realized Fee Revenue (Collections)
                </td>
                <td style="padding: 0.75rem 1rem; font-weight: 800; color: #60a5fa; background: rgba(59, 130, 246, 0.06);">
                  ₹${b1.feeCollections.toLocaleString()}
                </td>
                <td style="padding: 0.75rem 1rem; font-weight: 800; color: #34d399; background: rgba(16, 185, 129, 0.06);">
                  ₹${b2.feeCollections.toLocaleString()}
                </td>
                <td style="padding: 0.75rem 1rem; font-weight: 800; color: #34d399; background: rgba(207, 168, 78, 0.06);">
                  ₹${consolidated.feeCollections.toLocaleString()}
                </td>
              </tr>

              <!-- Row: Pending Dues -->
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                <td style="padding: 0.75rem 1rem; font-weight: 600; color: #cbd5e1;">Pending Due Fees (Installments)</td>
                <td style="padding: 0.75rem 1rem; color: #f87171; background: rgba(59, 130, 246, 0.02);">₹${b1.dueFees.toLocaleString()}</td>
                <td style="padding: 0.75rem 1rem; color: #f87171; background: rgba(16, 185, 129, 0.02);">₹${b2.dueFees.toLocaleString()}</td>
                <td style="padding: 0.75rem 1rem; font-weight: 700; color: #f87171; background: rgba(207, 168, 78, 0.02);">₹${consolidated.dueFees.toLocaleString()}</td>
              </tr>

              <!-- Row: Fee Recovery Rate -->
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                <td style="padding: 0.75rem 1rem; font-weight: 600; color: #cbd5e1;">Fee Realization %</td>
                <td style="padding: 0.75rem 1rem; font-weight: 700; color: #60a5fa; background: rgba(59, 130, 246, 0.02);">${b1.recoveryRate}%</td>
                <td style="padding: 0.75rem 1rem; font-weight: 700; color: #34d399; background: rgba(16, 185, 129, 0.02);">${b2.recoveryRate}%</td>
                <td style="padding: 0.75rem 1rem; font-weight: 700; color: var(--accent-gold); background: rgba(207, 168, 78, 0.02);">${consolidated.recoveryRate}%</td>
              </tr>

              <!-- Row: 60% Teacher Honorarium -->
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                <td style="padding: 0.75rem 1rem; font-weight: 700; color: var(--accent-gold-light);">
                  👨‍🏫 60% Faculty Remuneration Share
                </td>
                <td style="padding: 0.75rem 1rem; color: var(--accent-gold-light); background: rgba(59, 130, 246, 0.02);">- ₹${b1.teacherFeeShare60.toLocaleString()}</td>
                <td style="padding: 0.75rem 1rem; color: var(--accent-gold-light); background: rgba(16, 185, 129, 0.02);">- ₹${b2.teacherFeeShare60.toLocaleString()}</td>
                <td style="padding: 0.75rem 1rem; font-weight: 700; color: var(--accent-gold); background: rgba(207, 168, 78, 0.02);">- ₹${consolidated.teacherFeeShare60.toLocaleString()}</td>
              </tr>

              <!-- Row: Direct Expenses -->
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                <td style="padding: 0.75rem 1rem; font-weight: 600; color: #cbd5e1;">Direct Course Printing & Study Modules</td>
                <td style="padding: 0.75rem 1rem; color: #f87171; background: rgba(59, 130, 246, 0.02);">- ₹${b1.directExpenses.toLocaleString()}</td>
                <td style="padding: 0.75rem 1rem; color: #f87171; background: rgba(16, 185, 129, 0.02);">- ₹${b2.directExpenses.toLocaleString()}</td>
                <td style="padding: 0.75rem 1rem; font-weight: 700; color: #f87171; background: rgba(207, 168, 78, 0.02);">- ₹${consolidated.directExpenses.toLocaleString()}</td>
              </tr>

              <!-- Row: Facility Lease (Rent) -->
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                <td style="padding: 0.75rem 1rem; font-weight: 600; color: #cbd5e1;">Center Premises Lease (Rent)</td>
                <td style="padding: 0.75rem 1rem; color: #f87171; background: rgba(59, 130, 246, 0.02);">- ₹${b1.facilityRent.toLocaleString()}</td>
                <td style="padding: 0.75rem 1rem; color: #f87171; background: rgba(16, 185, 129, 0.02);">- ₹${b2.facilityRent.toLocaleString()}</td>
                <td style="padding: 0.75rem 1rem; font-weight: 700; color: #f87171; background: rgba(207, 168, 78, 0.02);">- ₹${consolidated.facilityRent.toLocaleString()}</td>
              </tr>

              <!-- Row: Utilities & WiFi -->
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                <td style="padding: 0.75rem 1rem; font-weight: 600; color: #cbd5e1;">Utilities, Fiber Broadband & Electricity</td>
                <td style="padding: 0.75rem 1rem; color: #f87171; background: rgba(59, 130, 246, 0.02);">- ₹${b1.facilityUtilities.toLocaleString()}</td>
                <td style="padding: 0.75rem 1rem; color: #f87171; background: rgba(16, 185, 129, 0.02);">- ₹${b2.facilityUtilities.toLocaleString()}</td>
                <td style="padding: 0.75rem 1rem; font-weight: 700; color: #f87171; background: rgba(207, 168, 78, 0.02);">- ₹${consolidated.facilityUtilities.toLocaleString()}</td>
              </tr>

              <!-- Row: Allocated Shared Central Overheads -->
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.06); background: rgba(59, 130, 246, 0.04);">
                <td style="padding: 0.75rem 1rem; font-weight: 800; color: #93c5fd;">
                  ⚖️ Allocated Shared Central ERP/Admin Overheads
                  <div style="font-size: 0.72rem; color: var(--accent-gold); font-weight: normal;">
                    Strictly in student count proportion (₹${allocationScheme.totalCentralShared.toLocaleString()} total)
                  </div>
                </td>
                <td style="padding: 0.75rem 1rem; font-weight: 800; color: #93c5fd; background: rgba(59, 130, 246, 0.08);">
                  - ₹${b1.allocatedSharedOverheads.toLocaleString()} (${b1.studentSharePct}%)
                </td>
                <td style="padding: 0.75rem 1rem; font-weight: 800; color: #93c5fd; background: rgba(16, 185, 129, 0.08);">
                  - ₹${b2.allocatedSharedOverheads.toLocaleString()} (${b2.studentSharePct}%)
                </td>
                <td style="padding: 0.75rem 1rem; font-weight: 800; color: #93c5fd; background: rgba(207, 168, 78, 0.08);">
                  - ₹${consolidated.allocatedSharedOverheads.toLocaleString()} (100%)
                </td>
              </tr>

              <!-- Row: Total Costs -->
              <tr style="border-bottom: 2px solid var(--border-gold); background: rgba(239, 68, 68, 0.04);">
                <td style="padding: 0.75rem 1rem; font-weight: 800; color: #fca5a5;">
                  Total Center Operating Expenditure
                </td>
                <td style="padding: 0.75rem 1rem; font-weight: 800; color: #f87171; background: rgba(59, 130, 246, 0.06);">
                  ₹${b1.totalOperatingCost.toLocaleString()}
                </td>
                <td style="padding: 0.75rem 1rem; font-weight: 800; color: #f87171; background: rgba(16, 185, 129, 0.06);">
                  ₹${b2.totalOperatingCost.toLocaleString()}
                </td>
                <td style="padding: 0.75rem 1rem; font-weight: 800; color: #f87171; background: rgba(207, 168, 78, 0.06);">
                  ₹${consolidated.totalOperatingCost.toLocaleString()}
                </td>
              </tr>

              <!-- Row: Net Surplus (EBITDA) -->
              <tr style="border-bottom: 2px solid var(--border-gold); background: rgba(255,255,255,0.03);">
                <td style="padding: 0.95rem 1rem; font-weight: 800; font-size: 1rem; color: #fff;">
                  👑 Net Operating Surplus (EBITDA)
                </td>
                <td style="padding: 0.95rem 1rem; font-weight: 900; font-size: 1.15rem; color: ${b1.netSurplus >= 0 ? '#34d399' : '#f87171'}; background: rgba(59, 130, 246, 0.1);">
                  ${b1.netSurplus >= 0 ? '+' : ''}₹${b1.netSurplus.toLocaleString()}
                </td>
                <td style="padding: 0.95rem 1rem; font-weight: 900; font-size: 1.15rem; color: ${b2.netSurplus >= 0 ? '#34d399' : '#f87171'}; background: rgba(16, 185, 129, 0.1);">
                  ${b2.netSurplus >= 0 ? '+' : ''}₹${b2.netSurplus.toLocaleString()}
                </td>
                <td style="padding: 0.95rem 1rem; font-weight: 900; font-size: 1.15rem; color: ${consolidated.netSurplus >= 0 ? '#34d399' : '#f87171'}; background: rgba(207, 168, 78, 0.1);">
                  ${consolidated.netSurplus >= 0 ? '+' : ''}₹${consolidated.netSurplus.toLocaleString()}
                </td>
              </tr>

              <!-- Row: Operating Margin % -->
              <tr>
                <td style="padding: 0.75rem 1rem; font-weight: 700; color: #cbd5e1;">Operating Margin %</td>
                <td style="padding: 0.75rem 1rem; font-weight: 800; color: ${b1.profitMargin >= 0 ? '#34d399' : '#f87171'}; background: rgba(59, 130, 246, 0.05);">${b1.profitMargin}%</td>
                <td style="padding: 0.75rem 1rem; font-weight: 800; color: ${b2.profitMargin >= 0 ? '#34d399' : '#f87171'}; background: rgba(16, 185, 129, 0.05);">${b2.profitMargin}%</td>
                <td style="padding: 0.75rem 1rem; font-weight: 800; color: ${consolidated.profitMargin >= 0 ? '#34d399' : '#f87171'}; background: rgba(207, 168, 78, 0.05);">${consolidated.profitMargin}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Comparative Executive Analytics Panels -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
        <div class="card" style="padding: 1.25rem; border: 1px solid rgba(59, 130, 246, 0.35); background: rgba(59, 130, 246, 0.05); border-radius: var(--radius-md);">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            <span style="font-size: 1.2rem;">🏛️</span>
            <div style="font-size: 0.95rem; font-weight: 800; color: #93c5fd;">Satpur Colony Center Dynamics</div>
          </div>
          <div style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.45;">
            • Student base: 2 students (33.33% of institute strength).<br>
            • Receives exactly <strong>33.33%</strong> (₹2,400) of head-office cloud ERP and admin costs.<br>
            • Temporary deficit of ₹24,100 will turn into positive surplus once remaining <strong>₹47,000</strong> in scheduled student fee installments is collected.
          </div>
        </div>

        <div class="card" style="padding: 1.25rem; border: 1px solid rgba(16, 185, 129, 0.35); background: rgba(16, 185, 129, 0.05); border-radius: var(--radius-md);">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            <span style="font-size: 1.2rem;">🏛️</span>
            <div style="font-size: 0.95rem; font-weight: 800; color: #34d399;">Gangapur Road Center Dynamics</div>
          </div>
          <div style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.45;">
            • Student base: 4 students (66.67% of institute strength).<br>
            • Receives <strong>66.67%</strong> (₹4,800) of head-office overheads in exact proportion to enrollment.<br>
            • High-performing center with <strong>₹11,600 net surplus</strong> driven by professional CA, CS, CMA and Cambridge tuition enrollments.
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderCourseWisePnlView(courseWise) {
  const scheme = state.getCommonExpenseAllocationScheme();

  return `
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <h3 style="font-size: 1.2rem; color: #fff; margin: 0; font-weight: 800;">Course-Wise Profit & Loss Statement</h3>
          <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.2rem;">
            Accounts for fee revenue, 60% teacher honorarium share, direct course expenses, and common overheads allocated strictly by student headcount proportion.
          </div>
        </div>
        <span style="font-size: 0.75rem; color: var(--accent-gold); background: rgba(207,168,78,0.1); padding: 0.3rem 0.6rem; border-radius: 4px; border: 1px solid var(--border-gold);">
          Allocation: Student Count Proportion Rule
        </span>
      </div>

      <div style="overflow-x: auto;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
              <th style="padding: 0.75rem;">Course Name</th>
              <th style="padding: 0.75rem;">Students</th>
              <th style="padding: 0.75rem;">Fee Collections (Revenue)</th>
              <th style="padding: 0.75rem;">60% Teacher Share</th>
              <th style="padding: 0.75rem;">Direct Expenses</th>
              <th style="padding: 0.75rem;">Allocated Common Overheads</th>
              <th style="padding: 0.75rem;">Total Course Cost</th>
              <th style="padding: 0.75rem;">Net Surplus (Profit)</th>
              <th style="padding: 0.75rem; text-align: right;">Margin %</th>
            </tr>
          </thead>
          <tbody>
            ${courseWise.map(c => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 0.75rem; font-weight: 700; color: #fff;">
                  ${c.course.name}
                  <div style="font-size: 0.72rem; color: var(--text-dim); font-weight: normal;">${c.course.level}</div>
                </td>
                <td style="padding: 0.75rem; color: var(--text-muted);">
                  <span style="font-weight: 700; color: #60a5fa;">${c.studentCount}</span> / ${scheme.totalStudents} (${c.studentPct}%)
                </td>
                <td style="padding: 0.75rem; font-weight: 700; color: #34d399;">₹${c.feeCollections.toLocaleString()}</td>
                <td style="padding: 0.75rem; color: var(--accent-gold-light);">₹${c.teacherFeeShare60.toLocaleString()}</td>
                <td style="padding: 0.75rem; color: #f87171;">₹${c.directExpenses.toLocaleString()}</td>
                <td style="padding: 0.75rem; color: #60a5fa;">
                  ₹${c.allocatedCommon.toLocaleString()}
                  <div style="font-size: 0.7rem; color: var(--text-dim);">${c.studentPct}% of overheads</div>
                </td>
                <td style="padding: 0.75rem; font-weight: 600; color: #fca5a5;">₹${c.totalCourseCost.toLocaleString()}</td>
                <td style="padding: 0.75rem; font-weight: 800; color: ${c.netProfit >= 0 ? '#34d399' : '#f87171'};">
                  ${c.netProfit >= 0 ? '+' : ''}₹${c.netProfit.toLocaleString()}
                </td>
                <td style="padding: 0.75rem; text-align: right;">
                  <span style="display: inline-block; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 700; font-size: 0.75rem; ${c.profitMargin >= 30 ? 'background: rgba(16, 185, 129, 0.2); color: #34d399;' : 'background: rgba(245, 158, 11, 0.2); color: #fbbf24;'}">
                    ${c.profitMargin}%
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderIntegratedPnlView(integrated) {
  const scheme = state.getCommonExpenseAllocationScheme();

  return `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <!-- Integrated Top Metrics -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
        <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-gold); background: rgba(19, 29, 49, 0.85); border-radius: var(--radius-md);">
          <div style="font-size: 0.85rem; text-transform: uppercase; color: var(--accent-gold); font-weight: 700;">Consolidated Fee Revenue</div>
          <div style="font-size: 2.2rem; font-weight: 800; color: #fff; margin: 0.5rem 0;">₹${integrated.totalRevenue.toLocaleString()}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">From total assessed curriculum fees of ₹${integrated.totalAssessed.toLocaleString()} across 2 Centers</div>
        </div>

        <div class="card" style="padding: 1.5rem; border: 1px solid rgba(239, 68, 68, 0.35); background: rgba(239, 68, 68, 0.05); border-radius: var(--radius-md);">
          <div style="font-size: 0.85rem; text-transform: uppercase; color: #f87171; font-weight: 700;">Total Operating Expenditure</div>
          <div style="font-size: 2.2rem; font-weight: 800; color: #f87171; margin: 0.5rem 0;">₹${integrated.totalExpensesOverall.toLocaleString()}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Faculty 60% share + Direct costs + Center leases & shared overheads</div>
        </div>

        <div class="card" style="padding: 1.5rem; border: 1px solid rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.08); border-radius: var(--radius-md);">
          <div style="font-size: 0.85rem; text-transform: uppercase; color: #34d399; font-weight: 700;">Net Institute Surplus (EBITDA)</div>
          <div style="font-size: 2.2rem; font-weight: 800; color: #34d399; margin: 0.5rem 0;">₹${integrated.netInstituteSurplus.toLocaleString()}</div>
          <div style="font-size: 0.8rem; color: #6ee7b7;">Net Margin: ${integrated.overallMargin}% of Gross Collections</div>
        </div>
      </div>

      <!-- Integrated Cost Breakdown Ledger -->
      <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
        <h3 style="font-size: 1.15rem; color: #fff; margin-bottom: 1rem; font-weight: 800;">
          Consolidated Revenue & Cost Distribution Across Both Centers
        </h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div style="padding: 1rem; background: rgba(255,255,255,0.03); border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="color: var(--text-muted);">Gross Fee Collections (Both Branches)</span>
              <span style="font-weight: 700; color: #34d399;">₹${integrated.totalRevenue.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="color: var(--text-muted);">Faculty 60% Fee Remuneration Pool</span>
              <span style="font-weight: 700; color: var(--accent-gold-light);">- ₹${integrated.totalTeacherShare.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="color: var(--text-muted);">Direct Course Materials & Printing</span>
              <span style="font-weight: 700; color: #f87171;">- ₹${integrated.totalDirectExpenses.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding-top: 0.5rem; border-top: 1px solid var(--border-subtle);">
              <span style="color: var(--text-muted);">Combined Facility Leases & Utilities</span>
              <span style="font-weight: 700; color: #60a5fa;">- ₹${(integrated.totalCommonExpenses - scheme.totalCentralShared).toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding-top: 0.5rem; border-top: 1px solid var(--border-subtle);">
              <span style="color: var(--text-muted);">Central Shared ERP & Compliance</span>
              <span style="font-weight: 700; color: #93c5fd;">- ₹${scheme.totalCentralShared.toLocaleString()}</span>
            </div>
          </div>
          <div style="padding: 1rem; background: rgba(207,168,78,0.06); border: 1px solid var(--border-gold); border-radius: 8px; display: flex; flex-direction: column; justify-content: center;">
            <div style="font-size: 0.85rem; color: var(--text-gold); font-weight: 700; text-transform: uppercase;">Retained Institute Surplus</div>
            <div style="font-size: 2rem; font-weight: 800; color: #fff; margin: 0.25rem 0;">₹${integrated.netInstituteSurplus.toLocaleString()}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.45;">
              Pending fee installment balance of ₹99,000 will provide ₹39,600 net cashflow addition upon collection, bringing total operating surplus to +₹27,100.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// =============================================================================
// TAB 4: ENQUIRY REPORT STATUS TAB (Persuaded vs Discontinued with Reasons)
// =============================================================================
function renderEnquiryReportTab(container, showToast) {
  const enquiries = state.enquiries;
  const persuaded = enquiries.filter(e => e.status === 'persuaded');
  const discontinued = enquiries.filter(e => e.status === 'discontinued');

  container.innerHTML = `
    <!-- Top Action & Metrics -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.75rem;">
      <div>
        <h3 style="font-size: 1.2rem; color: #fff; margin: 0;">Admission Enquiries & Conversion Analytics</h3>
        <div style="font-size: 0.82rem; color: var(--text-muted);">
          Tracking "Enquired & Persuaded" conversions vs "Enquired but Discontinued with Reason"
        </div>
      </div>
      <button id="add-enquiry-btn" class="btn btn-primary" style="padding: 0.6rem 1.2rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 8px; cursor: pointer;">
        + Record New Enquiry
      </button>
    </div>

    <!-- Category Counters -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
      <div class="card" style="padding: 1.25rem; border: 1px solid rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.08); border-radius: var(--radius-md);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 0.85rem; text-transform: uppercase; color: #34d399; font-weight: 700;">✓ Enquired & Persuaded</div>
          <span style="font-size: 1.6rem; font-weight: 800; color: #34d399;">${persuaded.length}</span>
        </div>
        <div style="font-size: 0.78rem; color: #6ee7b7; margin-top: 0.35rem;">
          Students who joined or scheduled enrollment token payment
        </div>
      </div>
      <div class="card" style="padding: 1.25rem; border: 1px solid rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.08); border-radius: var(--radius-md);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 0.85rem; text-transform: uppercase; color: #f87171; font-weight: 700;">✕ Enquired but Discontinued</div>
          <span style="font-size: 1.6rem; font-weight: 800; color: #f87171;">${discontinued.length}</span>
        </div>
        <div style="font-size: 0.78rem; color: #fca5a5; margin-top: 0.35rem;">
          Documented with mandatory business drop-off reason
        </div>
      </div>
    </div>

    <!-- Section 1: Enquired & Persuaded -->
    <div class="card" style="padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <h4 style="font-size: 1rem; color: #34d399; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
        <span>🎯</span> Enquired and Persuaded (${persuaded.length})
      </h4>
      <div style="overflow-x: auto;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
              <th style="padding: 0.65rem;">Date</th>
              <th style="padding: 0.65rem;">Student & Parent</th>
              <th style="padding: 0.65rem;">Contact</th>
              <th style="padding: 0.65rem;">Course Interested</th>
              <th style="padding: 0.65rem;">Center</th>
              <th style="padding: 0.65rem;">Counselor Notes</th>
              <th style="padding: 0.65rem;">Follow Up</th>
              <th style="padding: 0.65rem; text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${persuaded.map(e => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 0.65rem; color: var(--text-muted);">${e.date}</td>
                <td style="padding: 0.65rem;">
                  <div style="font-weight: 700; color: #fff;">${e.studentName}</div>
                  <div style="font-size: 0.75rem; color: var(--text-dim);">Parent: ${e.parentName}</div>
                </td>
                <td style="padding: 0.65rem; font-family: monospace;">+91 ${e.phone}</td>
                <td style="padding: 0.65rem; font-weight: 600; color: var(--accent-gold-light);">${e.courseInterested}</td>
                <td style="padding: 0.65rem; font-size: 0.8rem; color: var(--text-muted);">${e.branch}</td>
                <td style="padding: 0.65rem; font-size: 0.8rem; color: #cbd5e1;">${e.counselorNotes}</td>
                <td style="padding: 0.65rem; font-size: 0.8rem; color: #34d399; font-weight: 600;">${e.followUpDate}</td>
                <td style="padding: 0.65rem; text-align: right;">
                  <button class="delete-enquiry-btn" data-enquiry-id="${e.id}" style="padding: 0.25rem 0.55rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 4px; color: #f87171; cursor: pointer; font-size: 0.72rem; font-weight: 700;">
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Section 2: Enquired but Discontinued with Reason -->
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <h4 style="font-size: 1rem; color: #f87171; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
        <span>⚠️</span> Enquired but Discontinued with Specific Reason (${discontinued.length})
      </h4>
      <div style="overflow-x: auto;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
              <th style="padding: 0.65rem;">Date</th>
              <th style="padding: 0.65rem;">Student & Parent</th>
              <th style="padding: 0.65rem;">Course Interested</th>
              <th style="padding: 0.65rem;">Center</th>
              <th style="padding: 0.65rem; color: #fca5a5;">Discontinuation Reason (Documented)</th>
              <th style="padding: 0.65rem;">Status</th>
              <th style="padding: 0.65rem; text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${discontinued.map(e => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 0.65rem; color: var(--text-muted);">${e.date}</td>
                <td style="padding: 0.65rem;">
                  <div style="font-weight: 700; color: #fff;">${e.studentName}</div>
                  <div style="font-size: 0.75rem; color: var(--text-dim);">+91 ${e.phone}</div>
                </td>
                <td style="padding: 0.65rem;">${e.courseInterested}</td>
                <td style="padding: 0.65rem; font-size: 0.8rem; color: var(--text-muted);">${e.branch}</td>
                <td style="padding: 0.65rem; color: #fca5a5; font-size: 0.82rem; font-weight: 600;">
                  ⚠️ ${e.reason}
                  <div style="font-size: 0.75rem; color: var(--text-dim); font-weight: normal; margin-top: 0.15rem;">
                    ${e.counselorNotes}
                  </div>
                </td>
                <td style="padding: 0.65rem;">
                  <span style="display: inline-block; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.72rem; font-weight: 700; background: rgba(239,68,68,0.2); color: #f87171;">
                    Discontinued
                  </span>
                </td>
                <td style="padding: 0.65rem; text-align: right;">
                  <button class="delete-enquiry-btn" data-enquiry-id="${e.id}" style="padding: 0.25rem 0.55rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 4px; color: #f87171; cursor: pointer; font-size: 0.72rem; font-weight: 700;">
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Attach new enquiry modal
  container.querySelector('#add-enquiry-btn').addEventListener('click', () => {
    openNewEnquiryDialog(showToast);
  });

  // Attach delete enquiry listeners
  container.querySelectorAll('.delete-enquiry-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const eId = btn.getAttribute('data-enquiry-id');
      if (confirm('Director Authorization: Are you sure you want to delete this enquiry?')) {
        state.deleteEnquiry(eId);
        showToast('Enquiry deleted.', 'info');
        renderEnquiryReportTab(container, showToast);
      }
    });
  });
}

// =============================================================================
// TAB 5: ATTENDANCE TAB (Course-wise students attendance)
// =============================================================================
function renderAttendanceTab(container, showToast) {
  const students = state.students;
  const courses = state.courses;

  container.innerHTML = `
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <h3 style="font-size: 1.2rem; color: #fff; margin: 0;">Course-Wise Students Attendance Roster</h3>
          <div style="font-size: 0.82rem; color: var(--text-muted);">
            Real-time daily presence with automated WhatsApp parent absence notification
          </div>
        </div>
        <div>
          <select id="attendance-course-filter" style="padding: 0.5rem 0.75rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
            <option value="all">All Courses (${courses.length})</option>
            ${courses.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
          </select>
        </div>
      </div>

      <div style="overflow-x: auto;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.78rem; text-transform: uppercase;">
              <th style="padding: 0.75rem;">Student & Roll No</th>
              <th style="padding: 0.75rem;">Course Enrolled</th>
              <th style="padding: 0.75rem;">Batch & Center</th>
              <th style="padding: 0.75rem;">Overall Attendance</th>
              <th style="padding: 0.75rem;">Today's Status</th>
              <th style="padding: 0.75rem; text-align: right;">Parent Notification</th>
            </tr>
          </thead>
          <tbody id="attendance-tbody">
            ${renderAttendanceRows(students)}
          </tbody>
        </table>
      </div>
    </div>
  `;

  const filter = container.querySelector('#attendance-course-filter');
  const tbody = container.querySelector('#attendance-tbody');
  filter.addEventListener('change', () => {
    const val = filter.value;
    const filtered = val === 'all' ? students : students.filter(s => s.courseId === val);
    tbody.innerHTML = renderAttendanceRows(filtered);
    attachAttendanceEvents(container, showToast);
  });

  attachAttendanceEvents(container, showToast);
}

function renderAttendanceRows(students) {
  return students.map(s => {
    const waUrl = state.getWhatsAppAttendanceUrl(s.id);
    return `
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
        <td style="padding: 0.75rem;">
          <div style="font-weight: 700; color: #fff;">${s.name}</div>
          <div style="font-size: 0.75rem; color: var(--text-dim); font-family: monospace;">${s.rollNo}</div>
        </td>
        <td style="padding: 0.75rem; font-weight: 600;">${s.courseName}</td>
        <td style="padding: 0.75rem; font-size: 0.8rem; color: var(--text-muted);">${s.batch}</td>
        <td style="padding: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 60px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
              <div style="width: ${s.attendancePercent || 92}%; height: 100%; background: #34d399;"></div>
            </div>
            <span style="font-weight: 700; color: #34d399; font-size: 0.8rem;">${s.attendancePercent || 92}%</span>
          </div>
        </td>
        <td style="padding: 0.75rem;">
          <button 
            class="toggle-attendance-btn" 
            data-student-id="${s.id}" 
            data-current-status="${s.todayAttendance}"
            style="padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.78rem; font-weight: 700; border: 1px solid ${s.todayAttendance === 'Present' ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}; background: ${s.todayAttendance === 'Present' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}; color: ${s.todayAttendance === 'Present' ? '#34d399' : '#f87171'}; cursor: pointer;"
          >
            ${s.todayAttendance === 'Present' ? '✓ Present' : '✕ Absent'}
          </button>
        </td>
        <td style="padding: 0.75rem; text-align: right;">
          ${s.todayAttendance === 'Absent' ? `
            <a 
              href="${waUrl}" 
              target="_blank" 
              class="btn" 
              style="padding: 0.35rem 0.75rem; background: #25D366; color: #070b14; font-weight: 700; font-size: 0.75rem; border-radius: 5px; display: inline-flex; align-items: center; gap: 0.3rem;"
            >
              <span>📲</span> Send Absence Alert
            </a>
          ` : `
            <span style="font-size: 0.75rem; color: var(--text-dim);">No Alert Needed</span>
          `}
        </td>
      </tr>
    `;
  }).join('');
}

function attachAttendanceEvents(container, showToast) {
  container.querySelectorAll('.toggle-attendance-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sId = btn.getAttribute('data-student-id');
      const current = btn.getAttribute('data-current-status');
      const newStatus = current === 'Present' ? 'Absent' : 'Present';
      state.markAttendance(sId, newStatus);
      showToast(`Attendance updated for student: ${newStatus}`, newStatus === 'Present' ? 'success' : 'warning');
    });
  });
}

// =============================================================================
// TAB 6: PERFORMANCE TAB (Weekly, Quarterly, Six-Monthly, Remarks, Homework)
// =============================================================================
function renderPerformanceTab(container) {
  const students = state.students;
  const exams = state.exams;

  container.innerHTML = `
    <!-- Top Desk: Official Exam Assessments, Uploaded Answer Sheets & Time-Taken Audit -->
    <div class="card" style="padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid var(--border-gold); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.85rem;">
        <div>
          <h3 style="font-size: 1.25rem; color: #fff; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
            <span>🎯</span> Student Exam Submissions, Uploaded Answer Sheets & Time-Taken Audit Desk
          </h3>
          <div style="font-size: 0.82rem; color: var(--accent-gold-light); margin-top: 0.25rem;">
            Director Audit: Live stopwatches automatically track student duration once question paper/Google Form is opened; verified time taken is locked with assessed marks.
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <span style="font-size: 0.75rem; background: rgba(207,168,78,0.15); color: var(--accent-gold); border: 1px solid rgba(207,168,78,0.3); padding: 0.25rem 0.65rem; border-radius: 20px; font-weight: 700;">
            ${exams.length} Published Exams Audit
          </span>
        </div>
      </div>

      <!-- Published Exams & Student Submissions Audit Table -->
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        ${exams.map(exam => {
          const courseStudents = students.filter(s => !exam.courseId || s.courseId === exam.courseId);

          return `
            <div style="padding: 1.25rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); border-radius: 8px;">
              <!-- Exam Header Row -->
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                  <h4 style="font-size: 1.05rem; color: #fff; margin: 0; font-weight: 700;">${exam.title}</h4>
                  <div style="font-size: 0.8rem; color: var(--accent-gold); margin-top: 0.25rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                    <span><strong>Course:</strong> ${exam.courseName}</span>
                    <span>•</span>
                    <span><strong>Subject:</strong> ${exam.subject}</span>
                    <span>•</span>
                    <span><strong>Max Marks:</strong> ${exam.maxMarks}</span>
                    <span>•</span>
                    <span><strong>Duration:</strong> ${exam.durationMinutes || 60} mins</span>
                    <span>•</span>
                    <span style="color: var(--text-dim);">Date: ${exam.date}</span>
                  </div>
                </div>

                <!-- Paper Badges -->
                <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                  ${exam.questionPaperPdf ? `
                    <a href="${exam.questionPaperPdf}" target="_blank" style="padding: 0.25rem 0.6rem; background: rgba(37,99,235,0.18); border: 1px solid var(--border-accent); border-radius: 4px; color: #93c5fd; font-size: 0.75rem; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem;">
                      📄 Question Paper PDF ↗
                    </a>
                  ` : ''}
                  ${exam.googleFormLink ? `
                    <a href="${exam.googleFormLink}" target="_blank" style="padding: 0.25rem 0.6rem; background: rgba(16,185,129,0.18); border: 1px solid rgba(16,185,129,0.4); border-radius: 4px; color: #6ee7b7; font-size: 0.75rem; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem;">
                      🔗 Google Form Link ↗
                    </a>
                  ` : ''}
                </div>
              </div>

              <!-- Student Submissions Audit Table -->
              <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem; text-align: left;">
                  <thead>
                    <tr style="border-bottom: 1px solid var(--border-subtle); color: var(--text-muted); font-size: 0.72rem; text-transform: uppercase;">
                      <th style="padding: 0.6rem 0.5rem;">Student & Roll</th>
                      <th style="padding: 0.6rem 0.5rem;">Uploaded Answer Sheet / Mode</th>
                      <th style="padding: 0.6rem 0.5rem;">⏱️ Time Taken (Verified)</th>
                      <th style="padding: 0.6rem 0.5rem;">Assessed Score</th>
                      <th style="padding: 0.6rem 0.5rem;">Status</th>
                      <th style="padding: 0.6rem 0.5rem;">Examiner Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${courseStudents.map(s => {
                      const sub = exam.submissions ? exam.submissions.find(item => item.studentId === s.id) : null;
                      const timer = state.getExamTimer(exam.id, s.id);
                      const isGraded = sub && sub.status === 'Graded';
                      const isSubmitted = sub && (sub.status === 'Submitted for Evaluation' || sub.status === 'Graded');
                      const isRunning = !isSubmitted && !!timer;

                      return `
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.04); background: ${isGraded ? 'rgba(16,185,129,0.03)' : isSubmitted ? 'rgba(245,158,11,0.03)' : 'transparent'};">
                          <td style="padding: 0.6rem 0.5rem;">
                            <div style="font-weight: 700; color: #fff;">${s.name}</div>
                            <div style="font-size: 0.7rem; color: var(--text-dim);">${s.rollNo}</div>
                          </td>

                          <!-- Answer Sheet Link -->
                          <td style="padding: 0.6rem 0.5rem;">
                            ${sub && sub.answerSheetPdf ? `
                              <div>
                                <a href="${sub.answerSheetPdf}" target="_blank" style="color: #93c5fd; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 0.25rem;">
                                  <span>📄</span> ${sub.answerSheetName || 'View Answer Sheet'} ↗
                                </a>
                                <div style="font-size: 0.7rem; color: var(--text-dim); margin-top: 0.1rem;">
                                  ${sub.answerSheetSize ? `${sub.answerSheetSize} • ` : ''}${sub.submittedAt || exam.date}
                                </div>
                              </div>
                            ` : sub && sub.submissionType === 'google_form' ? `
                              <div>
                                <span style="color: #6ee7b7; font-weight: 700; display: inline-flex; align-items: center; gap: 0.25rem;">
                                  <span>🔗</span> Google Form Response
                                </span>
                                <div style="font-size: 0.7rem; color: var(--text-dim); margin-top: 0.1rem;">
                                  ${sub.submittedAt || exam.date}
                                </div>
                              </div>
                            ` : isRunning ? `
                              <span style="font-size: 0.72rem; background: rgba(239,68,68,0.18); color: #f87171; border: 1px solid rgba(239,68,68,0.35); padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700; display: inline-flex; align-items: center; gap: 0.25rem;">
                                <span style="animation: pulse 1s infinite;">●</span> Exam in Progress
                              </span>
                            ` : `
                              <span style="font-size: 0.72rem; color: var(--text-dim); font-style: italic;">
                                Not Started Yet
                              </span>
                            `}
                          </td>

                          <!-- Time Taken -->
                          <td style="padding: 0.6rem 0.5rem;">
                            ${sub && sub.timeTakenFormatted ? `
                              <div style="display: inline-flex; align-items: center; gap: 0.25rem; font-size: 0.8rem; font-weight: 800; color: #fff; background: rgba(207,168,78,0.16); border: 1px solid rgba(207,168,78,0.35); padding: 0.2rem 0.55rem; border-radius: 4px;">
                                <span>⏱️</span> <span style="color: var(--accent-gold-light);">${sub.timeTakenFormatted}</span>
                              </div>
                            ` : isRunning ? `
                              <span style="font-size: 0.75rem; color: #fbbf24; font-weight: 700;">
                                ⏱️ Timer Ticking
                              </span>
                            ` : `
                              <span style="color: var(--text-dim); font-size: 0.75rem;">--</span>
                            `}
                          </td>

                          <!-- Assessed Marks -->
                          <td style="padding: 0.6rem 0.5rem;">
                            ${isGraded ? `
                              <div style="font-weight: 800; color: #34d399; font-size: 0.95rem;">
                                ${sub.marksAssessed} <span style="font-size: 0.75rem; color: var(--text-dim); font-weight: 600;">/ ${exam.maxMarks}</span>
                                <span style="font-size: 0.7rem; padding: 0.1rem 0.4rem; border-radius: 10px; background: rgba(16,185,129,0.18); color: #34d399; margin-left: 0.25rem;">
                                  ${Math.round((sub.marksAssessed / exam.maxMarks) * 100)}%
                                </span>
                              </div>
                            ` : isSubmitted ? `
                              <span style="font-size: 0.75rem; color: #fbbf24; font-style: italic;">Pending Grading</span>
                            ` : `
                              <span style="color: var(--text-dim); font-size: 0.75rem;">--</span>
                            `}
                          </td>

                          <!-- Status -->
                          <td style="padding: 0.6rem 0.5rem;">
                            ${isGraded ? `
                              <span style="font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: 700; background: rgba(16,185,129,0.2); color: #34d399; border: 1px solid rgba(16,185,129,0.35);">
                                ✓ Graded
                              </span>
                            ` : isSubmitted ? `
                              <span style="font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: 700; background: rgba(245,158,11,0.2); color: #fbbf24; border: 1px solid rgba(245,158,11,0.35);">
                                ⏳ Evaluator Queue
                              </span>
                            ` : isRunning ? `
                              <span style="font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: 700; background: rgba(239,68,68,0.2); color: #f87171; border: 1px solid rgba(239,68,68,0.35);">
                                Live Solving
                              </span>
                            ` : `
                              <span style="font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: 600; background: rgba(255,255,255,0.05); color: var(--text-dim);">
                                Unattempted
                              </span>
                            `}
                          </td>

                          <!-- Examiner Feedback -->
                          <td style="padding: 0.6rem 0.5rem; color: #cbd5e1; font-size: 0.78rem;">
                            ${sub && sub.remarks ? `
                              <span style="font-style: italic;">"${sub.remarks}"</span>
                            ` : `
                              <span style="color: var(--text-dim); font-style: italic;">No examiner notes yet</span>
                            `}
                          </td>
                        </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Student Cards: Comprehensive Academic & Behavioral Performance -->
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="margin-bottom: 1.25rem;">
        <h3 style="font-size: 1.2rem; color: #fff; margin: 0;">Student Terminal Marks, Attendance & Behavioral Profiles</h3>
        <div style="font-size: 0.82rem; color: var(--text-muted);">
          Weekly Tests, Quarterly Examinations, Six-Monthly Pre-Boards, Behavioral Remarks by Parents & Faculty, and Homework completion stats
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 1.25rem;">
        ${students.map(s => `
          <div class="card" style="padding: 1.25rem; border: 1px solid var(--border-light); background: rgba(13, 21, 39, 0.75); border-radius: 10px;">
            <!-- Student Header -->
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
              <div>
                <h4 style="font-size: 1.05rem; color: #fff; margin: 0;">${s.name}</h4>
                <div style="font-size: 0.75rem; color: var(--accent-gold);">${s.courseName} • Roll #${s.rollNo}</div>
              </div>
              <div style="text-align: right;">
                <span style="font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700; ${s.homeworkCompleted ? 'background: rgba(16,185,129,0.2); color: #34d399;' : 'background: rgba(239,68,68,0.2); color: #f87171;'}">
                  HW: ${s.homeworkCompleted ? 'Completed' : 'Pending Check'}
                </span>
              </div>
            </div>

            <!-- Test Assessments Separately -->
            <div style="margin-bottom: 1rem;">
              <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 0.4rem; font-weight: 700;">
                Assessment Scores & Timer History:
              </div>
              <div style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.82rem;">
                <!-- Weekly -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.35rem 0.5rem; background: rgba(255,255,255,0.03); border-radius: 4px;">
                  <div>
                    <span style="color: #cbd5e1;">📅 Weekly Tests:</span>
                    <span style="font-size: 0.7rem; color: var(--accent-gold-light); margin-left: 0.35rem;">⏱️ ${s.performanceMarks && s.performanceMarks.weekly && s.performanceMarks.weekly[0] && s.performanceMarks.weekly[0].timeTaken ? s.performanceMarks.weekly[0].timeTaken : '48 mins 15 secs'}</span>
                  </div>
                  <span style="font-weight: 700; color: #34d399;">
                    ${s.performanceMarks && s.performanceMarks.weekly && s.performanceMarks.weekly[0] ? `${s.performanceMarks.weekly[0].marks}/${s.performanceMarks.weekly[0].maxMarks} (${s.performanceMarks.weekly[0].subject})` : '48/50 (Avg)'}
                  </span>
                </div>
                <!-- Quarterly -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.35rem 0.5rem; background: rgba(255,255,255,0.03); border-radius: 4px;">
                  <div>
                    <span style="color: #cbd5e1;">📊 Quarterly Exam:</span>
                    <span style="font-size: 0.7rem; color: var(--accent-gold-light); margin-left: 0.35rem;">⏱️ ${s.performanceMarks && s.performanceMarks.quarterly && s.performanceMarks.quarterly[0] && s.performanceMarks.quarterly[0].timeTaken ? s.performanceMarks.quarterly[0].timeTaken : '1 hr 45 mins'}</span>
                  </div>
                  <span style="font-weight: 700; color: var(--accent-gold-light);">
                    ${s.performanceMarks && s.performanceMarks.quarterly && s.performanceMarks.quarterly[0] ? `${s.performanceMarks.quarterly[0].marks}/${s.performanceMarks.quarterly[0].maxMarks}` : '92/100 (Merit)'}
                  </span>
                </div>
                <!-- Six-Monthly -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.35rem 0.5rem; background: rgba(255,255,255,0.03); border-radius: 4px;">
                  <div>
                    <span style="color: #cbd5e1;">🏆 Six-Monthly Pre-Board:</span>
                    <span style="font-size: 0.7rem; color: var(--accent-gold-light); margin-left: 0.35rem;">⏱️ ${s.performanceMarks && s.performanceMarks.sixMonthly && s.performanceMarks.sixMonthly[0] && s.performanceMarks.sixMonthly[0].timeTaken ? s.performanceMarks.sixMonthly[0].timeTaken : '2 hrs 40 mins'}</span>
                  </div>
                  <span style="font-weight: 700; color: #60a5fa;">
                    ${s.performanceMarks && s.performanceMarks.sixMonthly && s.performanceMarks.sixMonthly[0] ? `${s.performanceMarks.sixMonthly[0].marks}/${s.performanceMarks.sixMonthly[0].maxMarks}` : '95/100'}
                  </span>
                </div>
              </div>
            </div>

            <!-- Behavioral Remarks by Parents & Teacher -->
            <div style="font-size: 0.8rem; background: rgba(0,0,0,0.25); padding: 0.75rem; border-radius: 6px; border: 1px solid var(--border-subtle);">
              <div style="margin-bottom: 0.4rem;">
                <strong style="color: var(--accent-gold);">👨‍🏫 Faculty Remark:</strong>
                <span style="color: #cbd5e1; font-style: italic;">"${s.behaviourRemarks ? s.behaviourRemarks.teacher : 'Attentive and punctual with working notes.'}"</span>
              </div>
              <div>
                <strong style="color: #60a5fa;">👨‍👩‍👧 Parent Feedback:</strong>
                <span style="color: #cbd5e1; font-style: italic;">"${s.behaviourRemarks ? s.behaviourRemarks.parent : 'Very sincere with revision at home.'}"</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// =============================================================================
// TAB 7: TEACHERS TAB & 60% FEE SHARE LEDGER
// =============================================================================
function renderTeachersTab(container, showToast) {
  const ledger = state.getTeacherRemunerationLedger();
  const teachingPlans = state.teachingPlans;
  const portions = state.portions;

  container.innerHTML = `
    <!-- Faculty Teaching Profiles & Subject Assignments (Director Authority) -->
    <div class="card" style="padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid var(--border-gold); background: linear-gradient(135deg, rgba(207, 168, 78, 0.12), rgba(13, 21, 39, 0.95)); border-radius: var(--radius-md); box-shadow: var(--shadow-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.85rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <h3 style="font-size: 1.25rem; color: #fff; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
              <span>🎓</span> Faculty Teaching Profiles & Subject Assignments
            </h3>
            <span style="font-size: 0.72rem; background: rgba(16,185,129,0.2); color: #34d399; border: 1px solid rgba(16,185,129,0.4); padding: 0.15rem 0.6rem; border-radius: 20px; font-weight: 700;">
              Director Control Desk
            </span>
          </div>
          <div style="font-size: 0.82rem; color: var(--accent-gold-light); margin-top: 0.25rem;">
            Rule: Only subjects assigned here by the Director will populate the Teacher's dropdown across Daily Lesson Notes, Homework & Exams.
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <button id="add-teacher-btn" class="btn btn-secondary" style="font-size: 0.82rem; padding: 0.5rem 0.95rem; background: rgba(255,255,255,0.06); border: 1px solid var(--border-light); color: #fff; border-radius: 6px; cursor: pointer;">
            + Register New Faculty Profile
          </button>
        </div>
      </div>

      <!-- Faculty Profile Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 1.25rem;">
        ${state.teachers.map(teacher => {
          const assignedList = teacher.assignedSubjects || [];
          return `
            <div class="card" style="padding: 1.25rem; border: 1px solid var(--border-light); background: rgba(19, 29, 49, 0.8); border-radius: 10px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.6rem;">
                  <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="width: 44px; height: 44px; border-radius: 10px; background: linear-gradient(135deg, var(--accent-gold), #b38938); display: flex; align-items: center; justify-content: center; font-weight: 800; color: #070b14; font-size: 1.1rem;">
                      ${teacher.avatar || teacher.name.charAt(0)}
                    </div>
                    <div>
                      <h4 style="font-size: 1.05rem; color: #fff; margin: 0; font-weight: 700;">${teacher.name}</h4>
                      <div style="font-size: 0.75rem; color: var(--text-gold); margin-top: 0.15rem;">${teacher.role || 'Faculty Member'}</div>
                    </div>
                  </div>
                  <span class="status-badge" style="background: rgba(16,185,129,0.15); color: #34d399; font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 12px; font-weight: 700;">
                    ${teacher.status || 'Active'}
                  </span>
                </div>

                <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.85rem; padding: 0.45rem 0.65rem; background: rgba(255,255,255,0.02); border-radius: 6px;">
                  <div><strong>Qualification:</strong> ${teacher.qualification || 'M.Com'}</div>
                  <div style="margin-top: 0.2rem;"><strong>Contact:</strong> ${teacher.phone || '+91 98220 12345'} • ${teacher.email || 'faculty@imperialcommerce.edu.in'}</div>
                  <div style="margin-top: 0.2rem; color: var(--accent-gold-light);"><strong>Director Note:</strong> ${teacher.directorRemarks || 'Core Commerce Faculty'}</div>
                </div>

                <!-- Assigned Subjects Display -->
                <div style="margin-bottom: 0.75rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                    <span style="font-size: 0.78rem; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 0.05em;">
                      Assigned Subjects (${assignedList.length}):
                    </span>
                    <span style="font-size: 0.7rem; color: #34d399; font-weight: 600;">Active in Teacher Dropdown</span>
                  </div>
                  <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                    ${assignedList.length > 0 ? assignedList.map(sub => `
                      <span style="font-size: 0.78rem; background: rgba(16,185,129,0.15); color: #6ee7b7; border: 1px solid rgba(16,185,129,0.3); padding: 0.2rem 0.55rem; border-radius: 5px; font-weight: 600; display: inline-flex; align-items: center; gap: 0.3rem;">
                        <span>✓</span> ${sub}
                      </span>
                    `).join('') : `
                      <span style="font-size: 0.75rem; color: #f87171; font-style: italic;">No subjects assigned yet!</span>
                    `}
                  </div>
                </div>
              </div>

              <!-- Action Bar -->
              <div style="border-top: 1px solid var(--border-subtle); padding-top: 0.75rem; margin-top: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.75rem; color: var(--text-dim);">
                  Honorarium: <strong style="color: var(--accent-gold);">${teacher.honorariumSharePercent || 60}% Share</strong>
                </span>
                <button 
                  class="btn-edit-teacher-subjects" 
                  data-teacher-id="${teacher.id}"
                  style="font-size: 0.8rem; padding: 0.4rem 0.95rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.35rem;"
                >
                  <span>✏️</span> Assign / Edit Subjects
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Top 60% Teacher Remuneration Share Header -->
    <div class="card" style="padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid var(--border-gold); background: linear-gradient(135deg, rgba(207, 168, 78, 0.12), rgba(19, 29, 49, 0.9)); border-radius: var(--radius-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
        <div>
          <h3 style="font-size: 1.25rem; color: var(--accent-gold-light); margin: 0;">
            👨‍🏫 Faculty Remuneration Ledger (60% Rule)
          </h3>
          <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.25rem;">
            Rule: 60% of fee collections are immediately credited as payable to the subject teacher as receipts are generated daily.
          </div>
        </div>
        <button id="disburse-honorarium-btn" class="btn btn-primary" style="padding: 0.6rem 1.2rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 8px; cursor: pointer;">
          + Disburse Honorarium Voucher
        </button>
      </div>

      <!-- 60% Ledger Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
        ${ledger.map(t => `
          <div class="card" style="padding: 1.25rem; border: 1px solid var(--border-light); background: rgba(13, 21, 39, 0.85); border-radius: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
              <div>
                <h4 style="font-size: 1.05rem; color: #fff; margin: 0;">${t.name}</h4>
                <div style="font-size: 0.78rem; color: var(--accent-gold);">${t.subject}</div>
              </div>
              <span class="status-badge status-active" style="font-size: 0.7rem; padding: 0.15rem 0.5rem;">60% Share</span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.82rem; margin-bottom: 0.75rem; padding: 0.6rem; background: rgba(255,255,255,0.03); border-radius: 6px;">
              <div>
                <div style="color: var(--text-muted);">Fee Collections:</div>
                <div style="font-weight: 700; color: #fff;">₹${t.totalCollections.toLocaleString()}</div>
              </div>
              <div>
                <div style="color: var(--text-muted);">60% Total Due:</div>
                <div style="font-weight: 700; color: var(--accent-gold-light);">₹${t.totalDue60.toLocaleString()}</div>
              </div>
              <div>
                <div style="color: var(--text-muted);">Honorarium Paid:</div>
                <div style="font-weight: 700; color: #34d399;">₹${t.totalPaid.toLocaleString()}</div>
              </div>
              <div>
                <div style="color: var(--text-muted);">Balance Payable:</div>
                <div style="font-weight: 800; color: ${t.balancePayable > 0 ? '#f87171' : '#34d399'};">
                  ₹${t.balancePayable.toLocaleString()}
                </div>
              </div>
            </div>

            <div style="font-size: 0.75rem; color: var(--text-dim);">
              Active Receipts Linked: ${t.collectionsCount} collection events
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Day-Wise Teaching Plan (Stipulated vs Conducted) -->
    <div class="card" style="padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="margin-bottom: 1rem;">
        <h3 style="font-size: 1.15rem; color: #fff; margin: 0;">Day-Wise Teaching Plan (Director Stipulation vs Actual)</h3>
        <div style="font-size: 0.8rem; color: var(--text-muted);">
          Auditing daily teaching milestones delivered by faculty against the Director's master academic schedule
        </div>
      </div>

      <div style="overflow-x: auto;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
              <th style="padding: 0.65rem;">Day & Date</th>
              <th style="padding: 0.65rem;">Course & Subject</th>
              <th style="padding: 0.65rem;">Faculty</th>
              <th style="padding: 0.65rem;">Stipulated by Director</th>
              <th style="padding: 0.65rem;">Actual Taught by Teacher</th>
              <th style="padding: 0.65rem;">Variance</th>
              <th style="padding: 0.65rem;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${teachingPlans.map(p => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 0.65rem;">
                  <div style="font-weight: 700; color: #fff;">${p.day}</div>
                  <div style="font-size: 0.72rem; color: var(--text-muted);">${p.date}</div>
                </td>
                <td style="padding: 0.65rem;">
                  <div style="font-weight: 600;">${p.courseName}</div>
                  <div style="font-size: 0.75rem; color: var(--accent-gold);">${p.subject}</div>
                </td>
                <td style="padding: 0.65rem; color: var(--text-muted);">${p.teacher}</td>
                <td style="padding: 0.65rem; font-size: 0.8rem; color: #cbd5e1;">${p.stipulatedByDirector}</td>
                <td style="padding: 0.65rem; font-size: 0.8rem; color: #34d399;">${p.actualTaughtByTeacher}</td>
                <td style="padding: 0.65rem; font-weight: 700; color: var(--accent-gold-light); font-size: 0.78rem;">${p.variance}</td>
                <td style="padding: 0.65rem;">
                  <span style="display: inline-block; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.72rem; font-weight: 700; background: rgba(16,185,129,0.2); color: #34d399;">
                    ${p.status}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Daily Lesson Notes Stream (With Media Auditing: Video, Image, PDF) -->
    <div class="card" style="padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <h3 style="font-size: 1.15rem; color: #fff; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
            <span>📖</span> Daily Lesson Notes & Digital Material Logged by Faculty
          </h3>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
            Audit daily classroom coverage alongside uploaded lecture video clips, board diagrams & PDF handouts
          </div>
        </div>
        <span style="font-size: 0.75rem; background: rgba(207,168,78,0.15); color: var(--accent-gold); padding: 0.2rem 0.6rem; border-radius: 20px; font-weight: 700;">
          ${portions.length} Active Notes
        </span>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1rem;">
        ${portions.map(p => `
          <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); padding: 1.1rem; border-radius: 8px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
                <span style="font-weight: 700; color: #fff; font-size: 0.95rem;">${p.courseName || 'Commerce Batch'}</span>
                <span style="font-size: 0.75rem; color: var(--accent-gold); font-weight: 600;">${p.subject} • ${p.date}</span>
              </div>
              <div style="font-size: 0.84rem; color: #cbd5e1; margin-bottom: 0.5rem; line-height: 1.4;">
                <strong style="color: #fff;">Topic Covered:</strong> ${p.topicCovered}
              </div>

              <!-- Media Attachment Audit Card -->
              ${p.mediaType && p.mediaType !== 'none' ? `
                <div style="margin: 0.6rem 0; padding: 0.6rem; background: rgba(0,0,0,0.3); border: 1px solid ${p.mediaType === 'video' ? 'rgba(99,102,241,0.35)' : p.mediaType === 'pdf' ? 'rgba(239,68,68,0.35)' : 'rgba(16,185,129,0.35)'}; border-radius: 6px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                    <span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: ${p.mediaType === 'video' ? '#a5b4fc' : p.mediaType === 'pdf' ? '#fca5a5' : '#6ee7b7'};">
                      ${p.mediaType === 'video' ? '🎥 Lecture Video Clip' : p.mediaType === 'pdf' ? '📄 Topic Handout PDF' : '📷 Blackboard Diagram'}
                    </span>
                    <span style="font-size: 0.7rem; color: var(--text-dim);">${p.mediaSize || 'Verified'}</span>
                  </div>

                  ${p.mediaType === 'image' ? `
                    <div style="border-radius: 4px; overflow: hidden; max-height: 120px; background: #0c1424;">
                      <img src="${p.mediaUrl}" alt="${p.mediaName}" style="width: 100%; height: 120px; object-fit: cover; cursor: pointer;" onclick="window.open('${p.mediaUrl}', '_blank')" />
                    </div>
                    <div style="font-size: 0.72rem; color: var(--text-dim); margin-top: 0.25rem; display: flex; justify-content: space-between;">
                      <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.mediaName}</span>
                      <span style="color: var(--accent-gold); cursor: pointer;" onclick="window.open('${p.mediaUrl}', '_blank')">🔍 Expand</span>
                    </div>
                  ` : p.mediaType === 'video' ? `
                    <div>
                      <video controls src="${p.mediaUrl}" style="width: 100%; max-height: 140px; background: #000; border-radius: 4px; display: block;"></video>
                      <div style="font-size: 0.72rem; color: #a5b4fc; margin-top: 0.2rem;">▶ ${p.mediaName}</div>
                    </div>
                  ` : `
                    <a href="${p.mediaUrl || '#'}" target="_blank" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.45rem 0.65rem; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25); border-radius: 5px; color: #fca5a5; text-decoration: none; font-size: 0.78rem;">
                      <span>📕</span>
                      <span style="flex: 1; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.mediaName}</span>
                      <span style="color: var(--accent-gold);">View PDF ↗</span>
                    </a>
                  `}
                </div>
              ` : `
                <div style="font-size: 0.75rem; color: var(--text-dim); font-style: italic; margin-bottom: 0.4rem;">
                  No digital media attached for this lecture
                </div>
              `}
            </div>

            <div style="font-size: 0.76rem; color: var(--text-dim); border-top: 1px solid var(--border-subtle); padding-top: 0.4rem; margin-top: 0.4rem; display: flex; justify-content: space-between; align-items: center;">
              <span>Next: ${p.nextLectureTopic} • By ${p.teacher}</span>
              <span style="font-weight: 700; color: #34d399;">${p.completionPercent}% Complete</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Student Doubts Resolution & Satisfaction Quality Audit (DIRECTOR AUDIT) -->
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-gold); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <h3 style="font-size: 1.2rem; color: var(--accent-gold-light); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
            <span>🎓</span> Academic Doubt Clearance & Student Satisfaction Audit
          </h3>
          <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.2rem;">
            Director's supervisory review of faculty doubt explanations, attached video/PDF solutions, and student feedback ("Satisfactory" vs "Not Understood Yet")
          </div>
        </div>

        <!-- Satisfaction Metrics -->
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
          <div style="padding: 0.35rem 0.75rem; background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); border-radius: 6px; font-size: 0.78rem;">
            <span style="color: var(--text-muted);">Satisfactory:</span>
            <strong style="color: #34d399; margin-left: 0.25rem;">
              ${state.queries.filter(q => q.studentResponse === 'Satisfactory').length} Doubts (75%)
            </strong>
          </div>
          <div style="padding: 0.35rem 0.75rem; background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); border-radius: 6px; font-size: 0.78rem;">
            <span style="color: var(--text-muted);">Not Understood:</span>
            <strong style="color: #f87171; margin-left: 0.25rem;">
              ${state.queries.filter(q => q.studentResponse === 'Not Understood Yet').length} Doubts (Action Needed)
            </strong>
          </div>
        </div>
      </div>

      <!-- Doubts Audit Table -->
      <div style="overflow-x: auto;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
              <th style="padding: 0.7rem;">Student & Course</th>
              <th style="padding: 0.7rem;">Subject & Question Raised</th>
              <th style="padding: 0.7rem;">Faculty Explanation & Media</th>
              <th style="padding: 0.7rem;">Student Satisfaction Response</th>
              <th style="padding: 0.7rem; text-align: right;">Director Action</th>
            </tr>
          </thead>
          <tbody>
            ${state.queries.map(q => {
              const studentObj = state.students.find(s => s.id === q.studentId);
              const phone = studentObj ? (studentObj.parentPhone || studentObj.phone || '9370728283').replace(/\D/g, '') : '9370728283';
              const isPending = q.studentResponse === 'Not Understood Yet';
              const waText = encodeURIComponent(`Hello ${q.studentName}, this is Director Dr. S. K. Joshi from Imperial Commerce Tutorials Nashik. Regarding your doubt in ${q.subject} ("${q.queryText.slice(0, 45)}..."), we noticed you need further clarification. We are scheduling a 1-on-1 clinic at our center.`);

              return `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); background: ${isPending ? 'rgba(239,68,68,0.04)' : 'transparent'};">
                  <td style="padding: 0.75rem; vertical-align: top;">
                    <div style="font-weight: 700; color: #fff;">${q.studentName}</div>
                    <div style="font-size: 0.75rem; color: var(--accent-gold);">${q.courseName}</div>
                    <div style="font-size: 0.7rem; color: var(--text-dim); margin-top: 0.2rem;">Date: ${q.date}</div>
                  </td>

                  <td style="padding: 0.75rem; vertical-align: top; max-width: 260px;">
                    <div style="font-weight: 600; color: #e2e8f0; margin-bottom: 0.25rem;">${q.subject}</div>
                    <div style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.4;">
                      "${q.queryText}"
                    </div>
                    ${q.attachment ? `
                      <div style="margin-top: 0.35rem; font-size: 0.72rem; color: var(--accent-gold-light);">
                        📎 Attached: <u>${q.attachment}</u>
                      </div>
                    ` : ''}
                  </td>

                  <td style="padding: 0.75rem; vertical-align: top; max-width: 280px;">
                    <div style="font-size: 0.74rem; font-weight: 700; color: #34d399; margin-bottom: 0.2rem;">
                      By ${q.teacherName}:
                    </div>
                    <div style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.4;">
                      ${q.replyText || '<span style="color: var(--text-dim); font-style: italic;">Awaiting faculty reply</span>'}
                    </div>

                    ${q.replyAttachment ? `
                      <div style="margin-top: 0.35rem;">
                        ${q.replyAttachmentType === 'video' ? `
                          <a href="${q.replyAttachmentUrl || '#'}" target="_blank" style="display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.75rem; color: #a5b4fc; text-decoration: none;">
                            <span>🎥</span> <u>${q.replyAttachment}</u> ↗
                          </a>
                        ` : `
                          <a href="${q.replyAttachmentUrl || '#'}" target="_blank" style="display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.75rem; color: #34d399; text-decoration: none;">
                            <span>📄</span> <u>${q.replyAttachment}</u> ↗
                          </a>
                        `}
                      </div>
                    ` : ''}
                  </td>

                  <td style="padding: 0.75rem; vertical-align: top;">
                    ${q.studentResponse === 'Satisfactory' ? `
                      <span style="display: inline-flex; align-items: center; gap: 0.3rem; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.72rem; font-weight: 700; background: rgba(16,185,129,0.2); color: #34d399; border: 1px solid rgba(16,185,129,0.4);">
                        <span>✔</span> Satisfactory / Understood 👍
                      </span>
                    ` : q.studentResponse === 'Not Understood Yet' ? `
                      <span style="display: inline-flex; align-items: center; gap: 0.3rem; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.72rem; font-weight: 700; background: rgba(239,68,68,0.2); color: #f87171; border: 1px solid rgba(239,68,68,0.4);">
                        <span>⚠️</span> Not Understood Yet ❓
                      </span>
                    ` : `
                      <span style="padding: 0.2rem 0.55rem; border-radius: 20px; font-size: 0.72rem; font-weight: 600; background: rgba(255,255,255,0.06); color: var(--text-dim);">
                        ⏳ Awaiting Student Review
                      </span>
                    `}

                    ${q.studentFeedbackNote ? `
                      <div style="font-size: 0.76rem; color: #e2e8f0; margin-top: 0.35rem; font-style: italic; background: rgba(0,0,0,0.2); padding: 0.3rem 0.45rem; border-radius: 4px;">
                        "${q.studentFeedbackNote}"
                      </div>
                    ` : ''}
                  </td>

                  <td style="padding: 0.75rem; vertical-align: top; text-align: right;">
                    ${isPending ? `
                      <a 
                        href="https://api.whatsapp.com/send?phone=${phone}&text=${waText}" 
                        target="_blank"
                        style="padding: 0.35rem 0.75rem; background: #25D366; color: #070b14; font-weight: 700; font-size: 0.74rem; border-radius: 5px; text-decoration: none; display: inline-flex; align-items: center; gap: 0.3rem;"
                      >
                        <span>💬</span> Schedule Doubt Clinic
                      </a>
                    ` : `
                      <span style="font-size: 0.75rem; color: #34d399; font-weight: 600;">
                        ✔ Resolved Cleanly
                      </span>
                    `}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Attach disburse honorarium
  const disburseBtn = container.querySelector('#disburse-honorarium-btn');
  if (disburseBtn) {
    disburseBtn.addEventListener('click', () => {
      openExpenditureVoucherDialog(showToast, 'Prof. Arvind Deshpande (Faculty Honorarium Paid)', 'Faculty Honorarium Paid');
    });
  }

  // Attach Assign / Edit Subjects for each teacher profile
  container.querySelectorAll('.btn-edit-teacher-subjects').forEach(btn => {
    btn.addEventListener('click', () => {
      const teacherId = btn.getAttribute('data-teacher-id');
      openAssignSubjectsModal(teacherId, showToast, () => {
        renderTeachersTab(container, showToast);
      });
    });
  });

  // Attach Register New Faculty Profile
  const addTeacherBtn = container.querySelector('#add-teacher-btn');
  if (addTeacherBtn) {
    addTeacherBtn.addEventListener('click', () => {
      openAddTeacherModal(showToast, () => {
        renderTeachersTab(container, showToast);
      });
    });
  }
}

// =============================================================================
// MODAL: ASSIGN SUBJECTS TO FACULTY TEACHING PROFILE (Director Desk)
// =============================================================================
export function openAssignSubjectsModal(teacherId, showToast, onSuccess) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const teacher = state.teachers.find(t => t.id === teacherId);
  if (!teacher) return;

  const availableCatalog = (state.subjectsCatalog && state.subjectsCatalog.length > 0)
    ? state.subjectsCatalog
    : SUBJECTS_CATALOG;

  const currentAssigned = new Set(teacher.assignedSubjects || []);
  const catalogNames = availableCatalog.map(s => s.name);
  const customSubjects = (teacher.assignedSubjects || []).filter(s => !catalogNames.includes(s));

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 680px; background: #0c1424; border: 1px solid var(--border-gold); box-shadow: 0 24px 70px rgba(0,0,0,0.9); border-radius: var(--radius-md);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.85rem; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 44px; height: 44px; border-radius: 10px; background: linear-gradient(135deg, var(--accent-gold), #b38938); display: flex; align-items: center; justify-content: center; font-weight: 800; color: #070b14; font-size: 1.1rem;">
            ${teacher.avatar || teacher.name.charAt(0)}
          </div>
          <div>
            <h3 style="color: var(--accent-gold-light); margin: 0; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
              <span>✏️</span> Assign Subjects to Teaching Profile
            </h3>
            <div style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.2rem;">
              Faculty: <strong style="color: #fff;">${teacher.name}</strong> • ${teacher.qualification || 'Senior Faculty'}
            </div>
          </div>
        </div>
        <button id="close-subjects-modal-btn" style="background: none; border: none; color: var(--text-muted); font-size: 1.3rem; cursor: pointer;">✕</button>
      </div>

      <div style="background: rgba(207,168,78,0.08); border: 1px solid rgba(207,168,78,0.25); border-radius: 6px; padding: 0.65rem 0.85rem; margin-bottom: 1.25rem; font-size: 0.8rem; color: var(--accent-gold-light); line-height: 1.4;">
        ℹ️ <strong>Director Authorization Rule:</strong> Check the subjects that this faculty member is qualified & authorized to teach. The Teacher Portal will dynamically populate its Subject dropdowns (Lesson Notes, Homework & Exams) strictly with these assigned subjects.
      </div>

      <form id="assign-subjects-form">
        <!-- Quick Action Buttons -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <div style="font-size: 0.82rem; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 0.05em;">
            Standard Institute Curriculum Subjects:
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button type="button" id="btn-select-all-subs" style="padding: 0.2rem 0.6rem; font-size: 0.75rem; background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3); border-radius: 4px; cursor: pointer;">
              Select All
            </button>
            <button type="button" id="btn-clear-all-subs" style="padding: 0.2rem 0.6rem; font-size: 0.75rem; background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); border-radius: 4px; cursor: pointer;">
              Clear All
            </button>
          </div>
        </div>

        <!-- Subjects Grid -->
        <div id="subjects-checkbox-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; max-height: 280px; overflow-y: auto; padding-right: 0.35rem; margin-bottom: 1.25rem;">
          ${availableCatalog.map(sub => {
            const isChecked = currentAssigned.has(sub.name);
            return `
              <label style="display: flex; align-items: flex-start; gap: 0.6rem; padding: 0.6rem 0.75rem; background: ${isChecked ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.02)'}; border: 1px solid ${isChecked ? 'rgba(16,185,129,0.3)' : 'var(--border-subtle)'}; border-radius: 6px; cursor: pointer; transition: all 0.2s ease;">
                <input 
                  type="checkbox" 
                  name="assignedSubject" 
                  value="${sub.name}" 
                  ${isChecked ? 'checked' : ''} 
                  style="margin-top: 0.2rem; cursor: pointer; accent-color: #10b981;"
                />
                <div style="flex: 1;">
                  <div style="font-size: 0.85rem; font-weight: 700; color: #fff;">${sub.name}</div>
                  <div style="font-size: 0.7rem; color: var(--accent-gold); margin-top: 0.15rem;">${sub.category || sub.tag || 'Subject'} • ${sub.coverage || 'Curriculum Module'}</div>
                </div>
              </label>
            `;
          }).join('')}

          ${customSubjects.map(subName => `
            <label style="display: flex; align-items: flex-start; gap: 0.6rem; padding: 0.6rem 0.75rem; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.3); border-radius: 6px; cursor: pointer;">
              <input 
                type="checkbox" 
                name="assignedSubject" 
                value="${subName}" 
                checked 
                style="margin-top: 0.2rem; cursor: pointer; accent-color: #10b981;"
              />
              <div style="flex: 1;">
                <div style="font-size: 0.85rem; font-weight: 700; color: #fff;">${subName}</div>
                <div style="font-size: 0.7rem; color: var(--accent-gold); margin-top: 0.15rem;">Custom Subject • Specialized</div>
              </div>
            </label>
          `).join('')}
        </div>

        <!-- Add Custom Subject -->
        <div style="padding: 0.75rem; background: rgba(255,255,255,0.03); border: 1px dashed var(--border-light); border-radius: 6px; margin-bottom: 1.25rem;">
          <label style="display: block; font-size: 0.78rem; font-weight: 600; color: #cbd5e1; margin-bottom: 0.35rem;">
            + Assign Additional / Specialized Custom Subject:
          </label>
          <div style="display: flex; gap: 0.5rem;">
            <input 
              type="text" 
              id="custom-subject-input" 
              placeholder="e.g. Auditing & Assurance, Financial Management, etc." 
              style="flex: 1; padding: 0.5rem 0.75rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 5px; color: #fff; font-size: 0.82rem;"
            />
            <button 
              type="button" 
              id="btn-add-custom-sub" 
              style="padding: 0.5rem 0.95rem; background: rgba(207,168,78,0.2); color: var(--accent-gold); border: 1px solid rgba(207,168,78,0.4); border-radius: 5px; font-weight: 700; font-size: 0.8rem; cursor: pointer;"
            >
              + Add
            </button>
          </div>
        </div>

        <!-- Submit and Cancel -->
        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          <button type="button" id="cancel-subjects-modal-btn" style="padding: 0.65rem 1.25rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 6px; color: #cbd5e1; cursor: pointer;">
            Cancel
          </button>
          <button type="submit" style="padding: 0.65rem 1.75rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 6px; cursor: pointer;">
            Save Assigned Subjects →
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

  modalContainer.querySelector('#close-subjects-modal-btn').addEventListener('click', closeModal);
  modalContainer.querySelector('#cancel-subjects-modal-btn').addEventListener('click', closeModal);

  // Select all / clear all
  modalContainer.querySelector('#btn-select-all-subs').addEventListener('click', () => {
    modalContainer.querySelectorAll('input[name="assignedSubject"]').forEach(cb => cb.checked = true);
  });
  modalContainer.querySelector('#btn-clear-all-subs').addEventListener('click', () => {
    modalContainer.querySelectorAll('input[name="assignedSubject"]').forEach(cb => cb.checked = false);
  });

  // Add custom subject button
  const customInput = modalContainer.querySelector('#custom-subject-input');
  const btnAddCustom = modalContainer.querySelector('#btn-add-custom-sub');
  const grid = modalContainer.querySelector('#subjects-checkbox-grid');

  btnAddCustom.addEventListener('click', () => {
    const val = customInput.value.trim();
    if (!val) {
      showToast('Please type a subject name first.', 'warning');
      return;
    }
    const existing = Array.from(modalContainer.querySelectorAll('input[name="assignedSubject"]')).map(cb => cb.value.toLowerCase());
    if (existing.includes(val.toLowerCase())) {
      showToast(`Subject "${val}" is already in the list!`, 'warning');
      return;
    }

    const label = document.createElement('label');
    label.style = "display: flex; align-items: flex-start; gap: 0.6rem; padding: 0.6rem 0.75rem; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.3); border-radius: 6px; cursor: pointer;";
    label.innerHTML = `
      <input 
        type="checkbox" 
        name="assignedSubject" 
        value="${val}" 
        checked 
        style="margin-top: 0.2rem; cursor: pointer; accent-color: #10b981;"
      />
      <div style="flex: 1;">
        <div style="font-size: 0.85rem; font-weight: 700; color: #fff;">${val}</div>
        <div style="font-size: 0.7rem; color: var(--accent-gold); margin-top: 0.15rem;">Custom Subject • Just Added</div>
      </div>
    `;
    grid.appendChild(label);
    customInput.value = '';
    showToast(`Added custom subject "${val}".`, 'info');
  });

  // Submit
  modalContainer.querySelector('#assign-subjects-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const checkedBoxes = Array.from(modalContainer.querySelectorAll('input[name="assignedSubject"]:checked'));
    const selectedSubjects = checkedBoxes.map(cb => cb.value.trim());

    if (selectedSubjects.length === 0) {
      showToast('Please assign at least one subject to this faculty member!', 'warning');
      return;
    }

    state.assignSubjectsToTeacher(teacherId, selectedSubjects);
    closeModal();
    showToast(`Assigned ${selectedSubjects.length} subjects to ${teacher.name}! Teacher portal dropdowns updated.`, 'success');
    if (onSuccess) onSuccess();
  });
}

// =============================================================================
// MODAL: REGISTER NEW TEACHER PROFILE (Director Desk)
// =============================================================================
export function openAddTeacherModal(showToast, onSuccess) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 600px; background: #0c1424; border: 1px solid var(--border-gold); box-shadow: 0 24px 70px rgba(0,0,0,0.9); border-radius: var(--radius-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
        <h3 style="color: var(--accent-gold-light); margin: 0; font-size: 1.2rem;">
          👨‍🏫 Register New Faculty Member & Assign Subjects
        </h3>
        <button id="close-add-teacher-btn" style="background: none; border: none; color: var(--text-muted); font-size: 1.3rem; cursor: pointer;">✕</button>
      </div>

      <form id="add-teacher-form">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Faculty Full Name & Honorific <span style="color: var(--accent-gold);">*</span>
            </label>
            <input type="text" id="new-t-name" placeholder="e.g. Dr. Sneha Patil (CS)" required style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.88rem;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Qualifications <span style="color: var(--accent-gold);">*</span>
            </label>
            <input type="text" id="new-t-qual" placeholder="e.g. ACS, LL.M, Ph.D" required style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.88rem;" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Department / Role Title
            </label>
            <input type="text" id="new-t-role" placeholder="e.g. Corporate Law Lead Faculty" value="Senior Faculty" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.88rem;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Fee Sharing % (Remuneration)
            </label>
            <input type="number" id="new-t-share" value="60" min="1" max="100" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.88rem; font-weight: 700;" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Phone Number
            </label>
            <input type="tel" id="new-t-phone" placeholder="+91 98220..." value="+91 98225 66778" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.88rem;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Email Address
            </label>
            <input type="email" id="new-t-email" placeholder="faculty@imperialcommerce..." value="faculty@imperialcommerce.edu.in" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.88rem;" />
          </div>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.4rem;">
            Assign Initial Subjects <span style="color: var(--accent-gold);">*</span> (Check all that apply)
          </label>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; max-height: 180px; overflow-y: auto;">
            ${SUBJECTS_CATALOG.map(s => `
              <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; color: #cbd5e1; padding: 0.45rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: 5px; cursor: pointer;">
                <input type="checkbox" name="newTeacherSubject" value="${s.name}" style="accent-color: #10b981;" />
                <span>${s.name}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          <button type="button" id="cancel-add-teacher-btn" style="padding: 0.65rem 1.25rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 6px; color: #cbd5e1; cursor: pointer;">
            Cancel
          </button>
          <button type="submit" style="padding: 0.65rem 1.75rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 6px; cursor: pointer;">
            Save & Register Profile →
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

  modalContainer.querySelector('#close-add-teacher-btn').addEventListener('click', closeModal);
  modalContainer.querySelector('#cancel-add-teacher-btn').addEventListener('click', closeModal);

  modalContainer.querySelector('#add-teacher-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = modalContainer.querySelector('#new-t-name').value.trim();
    const qualification = modalContainer.querySelector('#new-t-qual').value.trim();
    const role = modalContainer.querySelector('#new-t-role').value.trim();
    const phone = modalContainer.querySelector('#new-t-phone').value.trim();
    const email = modalContainer.querySelector('#new-t-email').value.trim();
    const honorariumSharePercent = parseInt(modalContainer.querySelector('#new-t-share').value, 10) || 60;
    const checked = Array.from(modalContainer.querySelectorAll('input[name="newTeacherSubject"]:checked')).map(cb => cb.value);

    if (checked.length === 0) {
      showToast('Please check at least one subject to assign to this faculty member!', 'warning');
      return;
    }

    const initials = name.replace(/[^a-zA-Z\s]/g, '').trim().split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || 'FC';
    const newId = `t_${Date.now()}`;

    const newTeacher = {
      id: newId,
      name,
      avatar: initials,
      qualification,
      role,
      phone,
      email,
      assignedCourses: ['c1', 'c2'],
      assignedSubjects: checked,
      status: 'Active',
      honorariumSharePercent,
      directorRemarks: `Registered by Director Dr. S. K. Joshi. Assigned to ${checked.join(', ')}.`
    };

    state.teachers.push(newTeacher);
    state._save('imp_teachers_v5', state.teachers);
    state.notify();

    closeModal();
    showToast(`Faculty member "${name}" registered with ${checked.length} assigned subjects!`, 'success');
    if (onSuccess) onSuccess();
  });
}

// =============================================================================
// TAB 8: COMMUNICATION TAB (Course-wise WhatsApp Connect)
// =============================================================================
function renderCommunicationTab(container, showToast) {
  const students = state.students;
  const courses = state.courses;

  container.innerHTML = `
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="margin-bottom: 1.25rem;">
        <h3 style="font-size: 1.2rem; color: #fff; margin: 0;">Course-Wise Parent & Student WhatsApp Connect Hub</h3>
        <div style="font-size: 0.82rem; color: var(--text-muted);">
          1-Click direct WhatsApp connect for attendance reminders, homework alerts, fee dues & academic counseling
        </div>
      </div>

      <div style="overflow-x: auto;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.78rem; text-transform: uppercase;">
              <th style="padding: 0.75rem;">Student & Roll No</th>
              <th style="padding: 0.75rem;">Course</th>
              <th style="padding: 0.75rem;">Parent Name</th>
              <th style="padding: 0.75rem;">WhatsApp Number</th>
              <th style="padding: 0.75rem;">Fee Due</th>
              <th style="padding: 0.75rem; text-align: right;">1-Click WhatsApp Connect</th>
            </tr>
          </thead>
          <tbody>
            ${students.map(s => {
              const cleanPhone = (s.parentPhone || s.phone || '9370728283').replace(/\D/g, '');
              const generalMsg = `Hello ${s.parentName || 'Parent'}, greetings from Imperial Commerce Tutorials (Nashik). We are providing an update on your ward ${s.name} (${s.courseName}). Current Attendance: ${s.attendancePercent}%. Due Fees: ₹${s.dueFees.toLocaleString()}. For any discussion with Director Dr. S. K. Joshi, please reply here or visit our center.`;
              const feeDueMsg = `Respected ${s.parentName || 'Parent'}, gentle reminder from Accounts Desk at Imperial Commerce Tutorials: Due tuition fee balance for ${s.name} is ₹${s.dueFees.toLocaleString()}. Kindly clear via Bank UPI QR or visit Satpur/Gangapur Rd Center. Thank you!`;

              const generalWa = `https://api.whatsapp.com/send?phone=91${cleanPhone}&text=${encodeURIComponent(generalMsg)}`;
              const feeWa = `https://api.whatsapp.com/send?phone=91${cleanPhone}&text=${encodeURIComponent(feeDueMsg)}`;

              return `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 0.75rem;">
                    <div style="font-weight: 700; color: #fff;">${s.name}</div>
                    <div style="font-size: 0.75rem; color: var(--text-dim);">${s.rollNo}</div>
                  </td>
                  <td style="padding: 0.75rem; font-weight: 600;">${s.courseName}</td>
                  <td style="padding: 0.75rem; color: var(--text-muted);">${s.parentName}</td>
                  <td style="padding: 0.75rem; font-family: monospace;">+91 ${s.parentPhone}</td>
                  <td style="padding: 0.75rem; font-weight: 700; color: ${s.dueFees > 0 ? '#f87171' : '#34d399'};">
                    ₹${s.dueFees.toLocaleString()}
                  </td>
                  <td style="padding: 0.75rem; text-align: right;">
                    <div style="display: inline-flex; gap: 0.4rem;">
                      <a href="${generalWa}" target="_blank" class="btn" style="padding: 0.35rem 0.65rem; background: #25D366; color: #070b14; font-weight: 700; font-size: 0.75rem; border-radius: 5px; text-decoration: none;">
                        💬 Chat
                      </a>
                      ${s.dueFees > 0 ? `
                        <a href="${feeWa}" target="_blank" class="btn" style="padding: 0.35rem 0.65rem; background: rgba(239,68,68,0.2); border: 1px solid rgba(239,68,68,0.5); color: #fca5a5; font-weight: 700; font-size: 0.75rem; border-radius: 5px; text-decoration: none;">
                          💰 Fee Notice
                        </a>
                      ` : ''}
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// =============================================================================
// TAB 9: RECRUITMENT TAB (Teaching and Non-Teaching Staff)
// =============================================================================
function renderRecruitmentTab(container, showToast) {
  const recruitment = state.recruitment;
  const teachingCount = recruitment.filter(c => (c.roleType || '').includes('Teaching')).length;
  const adminCount = recruitment.filter(c => (c.roleType || '').includes('Non-Teaching') || (c.roleType || '').includes('Admin')).length;
  const scheduledCount = recruitment.filter(c => (c.status || '').includes('Scheduled') || (c.status || '').includes('Demo')).length;
  const hiredCount = recruitment.filter(c => (c.status || '').includes('Hired')).length;

  container.innerHTML = `
    <!-- Top Action & Stats Header -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
      <div>
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <h3 style="font-size: 1.25rem; color: #fff; margin: 0;">Faculty & Administrative Staff Recruitment Desk</h3>
          <span style="font-size: 0.72rem; background: rgba(207,168,78,0.2); color: var(--accent-gold); padding: 0.15rem 0.5rem; border-radius: 12px; font-weight: 700; border: 1px solid rgba(207,168,78,0.3);">
            Live Applications: ${recruitment.length}
          </span>
        </div>
        <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.25rem;">
          Receiving online submissions from "Join our Team" public portal, verifying uploaded CVs & certificates, scheduling demo lectures.
        </div>
      </div>
      <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
        <button id="view-public-careers-btn" class="btn" style="padding: 0.55rem 1rem; background: rgba(207,168,78,0.12); color: var(--accent-gold); font-weight: 700; border: 1px solid rgba(207,168,78,0.3); border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.84rem;">
          🌐 View "Join our Team" Page
        </button>
        <button id="add-applicant-btn" class="btn btn-primary" style="padding: 0.55rem 1.2rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.84rem;">
          <span>+</span> Add Offline Candidate
        </button>
      </div>
    </div>

    <!-- KPI Metric Cards -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
      <div class="card" style="padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 8px; border-left: 4px solid var(--accent-gold);">
        <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Total Pipeline</div>
        <div style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-top: 0.25rem;">${recruitment.length} Applicants</div>
        <div style="font-size: 0.75rem; color: var(--accent-gold); margin-top: 0.2rem;">Satpur & Gangapur Hubs</div>
      </div>
      <div class="card" style="padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 8px; border-left: 4px solid #38bdf8;">
        <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Teaching Faculty</div>
        <div style="font-size: 1.5rem; font-weight: 800; color: #38bdf8; margin-top: 0.25rem;">${teachingCount} Candidates</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">60% Sharing / Lecture</div>
      </div>
      <div class="card" style="padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 8px; border-left: 4px solid #a855f7;">
        <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Non-Teaching / Admin</div>
        <div style="font-size: 1.5rem; font-weight: 800; color: #a855f7; margin-top: 0.25rem;">${adminCount} Candidates</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Counselors & Accounts</div>
      </div>
      <div class="card" style="padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 8px; border-left: 4px solid #34d399;">
        <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Demos / Hired</div>
        <div style="font-size: 1.5rem; font-weight: 800; color: #34d399; margin-top: 0.25rem;">${scheduledCount} / ${hiredCount} Hired</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Ready for Next Batch</div>
      </div>
    </div>

    <!-- Applicant Pipeline Table -->
    <div class="card" style="padding: 1.25rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <div style="font-size: 0.95rem; font-weight: 700; color: #fff;">
          📋 Received Applications with Uploaded Resumes & Certificates
        </div>
        <div style="font-size: 0.78rem; color: var(--text-muted);">
          Click <span style="color: var(--accent-gold); font-weight: 700;">"👁️ Dossier"</span> to view attached certificates, photo & full profile
        </div>
      </div>

      <div style="overflow-x: auto;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.74rem; text-transform: uppercase;">
              <th style="padding: 0.75rem;">Photo & Candidate</th>
              <th style="padding: 0.75rem;">Role & Campus</th>
              <th style="padding: 0.75rem;">Specialization & Qualifications</th>
              <th style="padding: 0.75rem;">Uploaded Documents</th>
              <th style="padding: 0.75rem;">Expected Pay</th>
              <th style="padding: 0.75rem;">Demo Schedule</th>
              <th style="padding: 0.75rem;">Status</th>
              <th style="padding: 0.75rem; text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${recruitment.map(cand => {
              const acadCount = Array.isArray(cand.academicCertsList) ? cand.academicCertsList.length : 0;
              const nonAcadCount = Array.isArray(cand.nonAcademicCertsList) ? cand.nonAcademicCertsList.length : 0;
              const hasResume = !!cand.resumeName;
              const initials = cand.name.replace(/^(CA|Adv|Prof|Dr|Mr|Mrs|Ms)\.?\s+/i, '').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'IC';

              return `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'">
                <td style="padding: 0.75rem;">
                  <div style="display: flex; align-items: center; gap: 0.65rem;">
                    ${cand.photoUrl ? `
                      <img src="${cand.photoUrl}" alt="${cand.name}" style="width: 36px; height: 44px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-gold);" />
                    ` : `
                      <div style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, rgba(207,168,78,0.25), rgba(30,58,138,0.4)); color: var(--accent-gold); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem; border: 1px solid rgba(207,168,78,0.3);">
                        ${initials}
                      </div>
                    `}
                    <div>
                      <div style="font-weight: 700; color: #fff; display: flex; align-items: center; gap: 0.4rem;">
                        ${cand.name}
                      </div>
                      <div style="font-size: 0.72rem; color: var(--accent-gold); font-family: monospace;">${cand.id}</div>
                      <div style="font-size: 0.72rem; color: var(--text-dim);">${cand.email}</div>
                    </div>
                  </div>
                </td>
                <td style="padding: 0.75rem;">
                  <div>
                    <span style="display: inline-block; padding: 0.15rem 0.45rem; border-radius: 4px; font-size: 0.7rem; font-weight: 700; ${cand.roleType.includes('Teaching') ? 'background: rgba(207,168,78,0.18); color: var(--accent-gold-light); border: 1px solid rgba(207,168,78,0.3);' : 'background: rgba(37,99,235,0.18); color: #60a5fa; border: 1px solid rgba(37,99,235,0.3);'}">
                      ${cand.roleType}
                    </span>
                  </div>
                  <div style="margin-top: 0.3rem; font-size: 0.72rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.25rem;">
                    <span>📍</span>
                    <span>${cand.branchPreference ? cand.branchPreference.replace('Branch 1: ', '').replace('Branch 2: ', '') : 'Both Centers'}</span>
                  </div>
                </td>
                <td style="padding: 0.75rem;">
                  <div style="font-weight: 600; color: #e2e8f0; font-size: 0.82rem;">${cand.post}</div>
                  <div style="font-size: 0.73rem; color: var(--text-muted);">${cand.qualification}</div>
                  <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.15rem;">Exp: ${cand.experience}</div>
                </td>
                <td style="padding: 0.75rem;">
                  <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                    <div style="display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.73rem; background: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.25); color: #38bdf8; padding: 0.15rem 0.45rem; border-radius: 4px; max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${cand.resumeName || 'Resume.pdf'}">
                      <span>📄</span>
                      <span style="overflow: hidden; text-overflow: ellipsis;">${cand.resumeName || 'Resume Attached'}</span>
                    </div>
                    <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                      <span style="font-size: 0.68rem; background: rgba(168,85,247,0.15); border: 1px solid rgba(168,85,247,0.3); color: #c084fc; padding: 0.1rem 0.35rem; border-radius: 4px;" title="Academic Certificates">
                        🎓 ${acadCount > 0 ? acadCount + ' Academic' : '1 Verified'}
                      </span>
                      <span style="font-size: 0.68rem; background: rgba(245,158,11,0.15); border: 1px solid rgba(245,158,11,0.3); color: #fbbf24; padding: 0.1rem 0.35rem; border-radius: 4px;" title="Non-Academic & Achievements">
                        🏅 ${nonAcadCount > 0 ? nonAcadCount + ' Non-Acad' : '1 Verified'}
                      </span>
                    </div>
                  </div>
                </td>
                <td style="padding: 0.75rem; font-weight: 600; color: #34d399; font-size: 0.8rem;">
                  ${cand.expectedPay || '60% Sharing'}
                </td>
                <td style="padding: 0.75rem; font-size: 0.78rem; color: var(--accent-gold);">
                  <div style="display: flex; align-items: center; gap: 0.3rem;">
                    <span>📅</span>
                    <span>${cand.demoLectureDate || 'To be scheduled'}</span>
                  </div>
                </td>
                <td style="padding: 0.75rem;">
                  <select 
                    class="status-dropdown" 
                    data-candidate-id="${cand.id}"
                    style="padding: 0.25rem 0.45rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 4px; color: #fff; font-size: 0.72rem;"
                  >
                    <option value="Applied" ${cand.status === 'Applied' ? 'selected' : ''}>Applied</option>
                    <option value="Interview Scheduled" ${cand.status === 'Interview Scheduled' ? 'selected' : ''}>Interview Scheduled</option>
                    <option value="Demo Cleared - Offer Extended" ${cand.status.includes('Demo') ? 'selected' : ''}>Demo Cleared</option>
                    <option value="Hired - Joining Nov 1" ${cand.status.includes('Hired') ? 'selected' : ''}>Hired</option>
                    <option value="Archived" ${cand.status === 'Archived' ? 'selected' : ''}>Archived</option>
                  </select>
                </td>
                <td style="padding: 0.75rem; text-align: right;">
                  <div style="display: inline-flex; gap: 0.35rem; justify-content: flex-end;">
                    <button 
                      class="view-dossier-btn" 
                      data-candidate-id="${cand.id}"
                      style="padding: 0.3rem 0.6rem; background: rgba(207,168,78,0.15); border: 1px solid rgba(207,168,78,0.4); color: var(--accent-gold); font-weight: 700; font-size: 0.72rem; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.25rem;"
                      title="View Complete Application Dossier & Certificates"
                    >
                      👁️ Dossier
                    </button>
                    <a 
                      href="https://api.whatsapp.com/send?phone=${cand.phone.replace(/\D/g, '')}&text=${encodeURIComponent(`Hello ${cand.name}, this is Dr. S. K. Joshi from Imperial Commerce Tutorials Nashik. We reviewed your application for ${cand.post} and would like to coordinate your demo lecture / interview schedule.`)}" 
                      target="_blank"
                      style="padding: 0.3rem 0.6rem; background: #25D366; color: #070b14; font-weight: 700; font-size: 0.72rem; border-radius: 4px; text-decoration: none; display: inline-flex; align-items: center; gap: 0.25rem;"
                      title="Direct WhatsApp Chat"
                    >
                      <span>💬</span> WhatsApp
                    </a>
                  </div>
                </td>
              </tr>
            `;}).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Attach status changer
  container.querySelectorAll('.status-dropdown').forEach(sel => {
    sel.addEventListener('change', () => {
      const cId = sel.getAttribute('data-candidate-id');
      state.updateCandidateStatus(cId, sel.value);
      showToast(`Candidate ${cId} status updated to: ${sel.value}`, 'success');
    });
  });

  // Attach Dossier Viewer modal
  container.querySelectorAll('.view-dossier-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cId = btn.getAttribute('data-candidate-id');
      const candidate = recruitment.find(c => c.id === cId);
      if (candidate) {
        openCandidateDossierModal(candidate, showToast);
      }
    });
  });

  // Attach new applicant modal
  container.querySelector('#add-applicant-btn').addEventListener('click', () => {
    openRecruitmentDialog(showToast);
  });

  // Switch to public careers page
  const viewCareersBtn = container.querySelector('#view-public-careers-btn');
  if (viewCareersBtn) {
    viewCareersBtn.addEventListener('click', () => {
      state.setRole('public');
      state.setPublicTab('recruitment');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Candidate Dossier Modal
function openCandidateDossierModal(cand, showToast) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const acadCount = Array.isArray(cand.academicCertsList) ? cand.academicCertsList.length : 0;
  const nonAcadCount = Array.isArray(cand.nonAcademicCertsList) ? cand.nonAcademicCertsList.length : 0;
  const initials = cand.name.replace(/^(CA|Adv|Prof|Dr|Mr|Mrs|Ms)\.?\s+/i, '').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'IC';

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 740px; background: #0c1424; border: 1px solid var(--border-gold); box-shadow: 0 25px 70px rgba(0,0,0,0.9); padding: 1.75rem; border-radius: 12px; color: #fff;">
      
      <!-- Modal Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem; margin-bottom: 1.25rem;">
        <div style="display: flex; gap: 1rem; align-items: center;">
          ${cand.photoUrl ? `
            <img src="${cand.photoUrl}" alt="${cand.name}" style="width: 64px; height: 80px; object-fit: cover; border-radius: 6px; border: 2px solid var(--accent-gold); box-shadow: 0 4px 15px rgba(0,0,0,0.5);" />
          ` : `
            <div style="width: 64px; height: 80px; border-radius: 6px; background: linear-gradient(135deg, rgba(207,168,78,0.25), rgba(30,58,138,0.5)); border: 2px solid var(--border-gold); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.2rem;">
              <span style="font-size: 1.4rem;">📷</span>
              <span style="font-size: 0.8rem; font-weight: 800; color: var(--accent-gold);">${initials}</span>
            </div>
          `}
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <h3 style="color: #fff; margin: 0; font-size: 1.3rem;">${cand.name}</h3>
              <span style="font-size: 0.72rem; background: rgba(207,168,78,0.2); color: var(--accent-gold); padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700;">
                ${cand.id}
              </span>
            </div>
            <div style="color: var(--accent-gold-light); font-size: 0.9rem; font-weight: 600; margin-top: 0.2rem;">
              ${cand.post} • <span style="color: var(--text-muted);">${cand.roleType}</span>
            </div>
            <div style="font-size: 0.78rem; color: var(--text-dim); margin-top: 0.15rem;">
              📍 Preferred Campus: <strong style="color: #e2e8f0;">${cand.branchPreference || 'Both Campuses (Satpur & Gangapur)'}</strong>
            </div>
          </div>
        </div>
        <button id="close-dossier-modal-btn" style="background: none; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer; padding: 0.2rem 0.5rem;">✕</button>
      </div>

      <!-- Content Grid -->
      <div style="max-height: 65vh; overflow-y: auto; padding-right: 0.5rem; display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Key Qualifications & Overview -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; background: rgba(255,255,255,0.02); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-light);">
          <div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Highest Qualification</div>
            <div style="font-size: 0.88rem; font-weight: 700; color: #fff; margin-top: 0.2rem;">${cand.qualification}</div>
          </div>
          <div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Total Experience</div>
            <div style="font-size: 0.88rem; font-weight: 700; color: #38bdf8; margin-top: 0.2rem;">${cand.experience}</div>
          </div>
          <div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Expected Remuneration</div>
            <div style="font-size: 0.88rem; font-weight: 700; color: #34d399; margin-top: 0.2rem;">${cand.expectedPay || '60% Sharing Model'}</div>
          </div>
          <div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Demo Lecture / Slot</div>
            <div style="font-size: 0.88rem; font-weight: 700; color: var(--accent-gold); margin-top: 0.2rem;">${cand.demoLectureDate || 'To be scheduled'}</div>
          </div>
        </div>

        <!-- Contact Information Strip -->
        <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; background: rgba(15,23,42,0.6); padding: 0.85rem 1rem; border-radius: 8px; border: 1px solid var(--border-subtle); font-size: 0.82rem;">
          <div>📞 <strong>Phone:</strong> <span style="font-family: monospace;">${cand.phone}</span></div>
          <div>💬 <strong>WhatsApp:</strong> <span style="font-family: monospace;">${cand.whatsapp || cand.phone}</span></div>
          <div>✉️ <strong>Email:</strong> <span style="color: #38bdf8;">${cand.email}</span></div>
          ${cand.address ? `<div>🏠 <strong>Location:</strong> <span>${cand.address}</span></div>` : ''}
        </div>

        <!-- Attached Documents Section -->
        <div style="background: rgba(12,20,36,0.8); border: 1px solid var(--border-light); border-radius: 8px; padding: 1rem;">
          <h4 style="margin: 0 0 0.85rem 0; font-size: 0.95rem; color: var(--accent-gold-light); display: flex; align-items: center; gap: 0.4rem;">
            <span>📁</span> Verified Uploaded Dossier & Credentials
          </h4>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.85rem;">
            <!-- Resume / CV -->
            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(56,189,248,0.3); border-radius: 6px; padding: 0.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 0.74rem; font-weight: 700; color: #38bdf8; text-transform: uppercase;">📄 Resume / Curriculum Vitae</div>
                <span style="font-size: 0.68rem; background: rgba(56,189,248,0.2); color: #38bdf8; padding: 0.1rem 0.35rem; border-radius: 4px;">PDF/DOC</span>
              </div>
              <div style="margin-top: 0.4rem; font-weight: 600; font-size: 0.84rem; color: #fff;">
                ${cand.resumeName || 'Comprehensive_CV_Imperial.pdf'}
              </div>
              <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.15rem;">
                Size: ${cand.resumeSize || '1.2 MB'} • Status: Upload Verified
              </div>
            </div>

            <!-- Passport Photograph -->
            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(207,168,78,0.3); border-radius: 6px; padding: 0.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 0.74rem; font-weight: 700; color: var(--accent-gold); text-transform: uppercase;">📷 Passport Size Photo</div>
                <span style="font-size: 0.68rem; background: rgba(207,168,78,0.2); color: var(--accent-gold); padding: 0.1rem 0.35rem; border-radius: 4px;">Photo ID</span>
              </div>
              <div style="margin-top: 0.4rem; font-weight: 600; font-size: 0.84rem; color: #fff;">
                ${cand.photoName || `${cand.name.replace(/\s+/g, '_')}_Photo.jpg`}
              </div>
              <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.15rem;">
                Formal portrait for faculty directory & identity card
              </div>
            </div>

            <!-- Academic Certificates -->
            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(168,85,247,0.3); border-radius: 6px; padding: 0.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 0.74rem; font-weight: 700; color: #c084fc; text-transform: uppercase;">🎓 Academic Certificates (${acadCount > 0 ? acadCount : '2'})</div>
                <span style="font-size: 0.68rem; background: rgba(168,85,247,0.2); color: #c084fc; padding: 0.1rem 0.35rem; border-radius: 4px;">Degrees & Marksheets</span>
              </div>
              <div style="margin-top: 0.4rem; display: flex; flex-direction: column; gap: 0.25rem;">
                ${Array.isArray(cand.academicCertsList) && cand.academicCertsList.length > 0 ? cand.academicCertsList.map(cert => `
                  <div style="font-size: 0.76rem; color: #e2e8f0; display: flex; align-items: center; gap: 0.3rem;">
                    <span>✔</span> <span>${cert}</span>
                  </div>
                `).join('') : `
                  <div style="font-size: 0.76rem; color: #e2e8f0;">✔ Master's / CA Final Passing Certificate</div>
                  <div style="font-size: 0.76rem; color: #e2e8f0;">✔ Bachelor's Degree Transcript</div>
                `}
              </div>
            </div>

            <!-- Non-Academic Certificates -->
            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(245,158,11,0.3); border-radius: 6px; padding: 0.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 0.74rem; font-weight: 700; color: #fbbf24; text-transform: uppercase;">🏅 Non-Academic & Honors (${nonAcadCount > 0 ? nonAcadCount : '1'})</div>
                <span style="font-size: 0.68rem; background: rgba(245,158,11,0.2); color: #fbbf24; padding: 0.1rem 0.35rem; border-radius: 4px;">Awards & Letters</span>
              </div>
              <div style="margin-top: 0.4rem; display: flex; flex-direction: column; gap: 0.25rem;">
                ${Array.isArray(cand.nonAcademicCertsList) && cand.nonAcademicCertsList.length > 0 ? cand.nonAcademicCertsList.map(cert => `
                  <div style="font-size: 0.76rem; color: #e2e8f0; display: flex; align-items: center; gap: 0.3rem;">
                    <span>★</span> <span>${cert}</span>
                  </div>
                `).join('') : `
                  <div style="font-size: 0.76rem; color: #e2e8f0;">★ Faculty Development Program / Experience Letter</div>
                `}
              </div>
            </div>
          </div>
        </div>

        <!-- Cover Letter / Statement of Purpose -->
        ${cand.coverLetter ? `
          <div style="background: rgba(207,168,78,0.05); border: 1px solid rgba(207,168,78,0.25); border-radius: 8px; padding: 1rem;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--accent-gold); text-transform: uppercase; margin-bottom: 0.35rem;">
              💬 Statement of Purpose / Teaching Methodology
            </div>
            <div style="font-size: 0.84rem; color: #cbd5e1; line-height: 1.5; font-style: italic;">
              "${cand.coverLetter}"
            </div>
          </div>
        ` : ''}

        <!-- Director's Evaluation Notes -->
        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); border-radius: 8px; padding: 1rem;">
          <div style="font-size: 0.75rem; font-weight: 700; color: #fff; text-transform: uppercase; margin-bottom: 0.35rem;">
            📝 Director's Recruitment Notes & Observations
          </div>
          <div style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.4;">
            ${cand.notes || 'Online application received via public recruitment desk. Ready for demo lecture round.'}
          </div>
        </div>

      </div>

      <!-- Modal Footer Actions -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 1.25rem; margin-top: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">Pipeline Status:</span>
          <select 
            id="modal-status-select" 
            style="padding: 0.4rem 0.75rem; background: #131d31; border: 1px solid var(--border-gold); border-radius: 6px; color: #fff; font-size: 0.82rem;"
          >
            <option value="Applied" ${cand.status === 'Applied' ? 'selected' : ''}>Applied</option>
            <option value="Interview Scheduled" ${cand.status === 'Interview Scheduled' ? 'selected' : ''}>Interview Scheduled</option>
            <option value="Demo Cleared - Offer Extended" ${cand.status.includes('Demo') ? 'selected' : ''}>Demo Cleared</option>
            <option value="Hired - Joining Nov 1" ${cand.status.includes('Hired') ? 'selected' : ''}>Hired</option>
            <option value="Archived" ${cand.status === 'Archived' ? 'selected' : ''}>Archived</option>
          </select>
        </div>

        <div style="display: flex; gap: 0.6rem;">
          <a 
            href="https://api.whatsapp.com/send?phone=${cand.phone.replace(/\D/g, '')}&text=${encodeURIComponent(`Hello ${cand.name}, this is Dr. S. K. Joshi, Director of Imperial Commerce Tutorials Nashik. We are pleased with your application for ${cand.post} and would like to confirm your schedule.`)}" 
            target="_blank"
            style="padding: 0.55rem 1.1rem; background: #25D366; color: #070b14; font-weight: 700; font-size: 0.82rem; border-radius: 6px; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;"
          >
            <span>💬</span> Message on WhatsApp
          </a>
          <button 
            type="button" 
            id="close-dossier-btn" 
            style="padding: 0.55rem 1.25rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 6px; color: #cbd5e1; cursor: pointer; font-size: 0.82rem;"
          >
            Close Dossier
          </button>
        </div>
      </div>

    </div>
  `;

  modalContainer.classList.remove('hidden');

  const closeModal = () => {
    modalContainer.classList.add('hidden');
    modalContainer.innerHTML = '';
  };

  modalContainer.querySelector('#close-dossier-modal-btn').addEventListener('click', closeModal);
  modalContainer.querySelector('#close-dossier-btn').addEventListener('click', closeModal);

  modalContainer.querySelector('#modal-status-select').addEventListener('change', (e) => {
    state.updateCandidateStatus(cand.id, e.target.value);
    showToast(`Candidate status updated: ${e.target.value}`, 'success');
  });
}

// =============================================================================
// MODAL DIALOGS (Fee Receipt, Expenditure Voucher, Enquiry, Recruitment)
// =============================================================================

export function openFeeReceiptDialog(showToast, prefillStudentId = null) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const students = state.students;
  const initialStudent = prefillStudentId ? students.find(s => s.id === prefillStudentId) : students[0];

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 560px; background: #0c1424; border: 1px solid var(--border-gold); box-shadow: 0 20px 60px rgba(0,0,0,0.85);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
        <h3 style="color: var(--accent-gold-light); margin: 0; font-size: 1.2rem;">
          💳 Generate Official Fee Receipt
        </h3>
        <button id="close-fee-modal-btn" style="background: none; border: none; color: var(--text-muted); font-size: 1.3rem; cursor: pointer;">✕</button>
      </div>

      <form id="fee-receipt-form">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
            Select Student <span style="color: var(--accent-gold);">*</span>
          </label>
          <select id="receipt-student-select" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem;">
            ${students.map(s => `
              <option value="${s.id}" ${initialStudent && initialStudent.id === s.id ? 'selected' : ''}>
                ${s.name} - ${s.courseName} (Due: ₹${(s.dueFees || 0).toLocaleString()})
              </option>
            `).join('')}
          </select>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Payment Amount (₹) <span style="color: var(--accent-gold);">*</span>
            </label>
            <input 
              type="number" 
              id="receipt-amount-input" 
              value="${initialStudent && initialStudent.dueFees > 0 ? initialStudent.dueFees : 20000}" 
              style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.95rem; font-weight: 700;"
              required 
            />
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Payment Mode <span style="color: var(--accent-gold);">*</span>
            </label>
            <select id="receipt-mode-select" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem;">
              <option value="Online (Bank UPI QR)">Online (Bank UPI QR)</option>
              <option value="Cash">Cash (Desk Counter)</option>
              <option value="Cheque / DD">Cheque / Demand Draft</option>
              <option value="Bank NEFT / IMPS">Bank NEFT / IMPS</option>
            </select>
          </div>
        </div>

        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
            Bank / UTR Reference No
          </label>
          <input 
            type="text" 
            id="receipt-ref-input" 
            placeholder="e.g. UPI-AXIS-99281928" 
            value="UPI-${Date.now().toString().slice(-8)}"
            style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem; font-family: monospace;"
          />
        </div>

        <div style="margin-bottom: 1.25rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
            Payment Remarks / Installment Notes
          </label>
          <input 
            type="text" 
            id="receipt-notes-input" 
            value="Tuition Term Fee Installment" 
            style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;"
          />
        </div>

        <div style="padding: 0.65rem; background: rgba(207,168,78,0.12); border: 1px solid var(--border-gold); border-radius: 6px; margin-bottom: 1.25rem; font-size: 0.8rem; color: var(--accent-gold-light);">
          ℹ️ 60% of this collected amount will be immediately booked as payable in the subject teacher's remuneration ledger!
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          <button type="button" id="cancel-fee-btn" style="padding: 0.65rem 1.25rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 6px; color: #cbd5e1; cursor: pointer;">
            Cancel
          </button>
          <button type="submit" style="padding: 0.65rem 1.75rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 6px; cursor: pointer;">
            Confirm & Issue Receipt →
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

  modalContainer.querySelector('#close-fee-modal-btn').addEventListener('click', closeModal);
  modalContainer.querySelector('#cancel-fee-btn').addEventListener('click', closeModal);

  modalContainer.querySelector('#fee-receipt-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const studentId = modalContainer.querySelector('#receipt-student-select').value;
    const amount = modalContainer.querySelector('#receipt-amount-input').value;
    const mode = modalContainer.querySelector('#receipt-mode-select').value;
    const txnId = modalContainer.querySelector('#receipt-ref-input').value;
    const notes = modalContainer.querySelector('#receipt-notes-input').value;

    const receipt = state.collectFee({ studentId, amount, mode, txnId, notes });
    closeModal();

    showToast(`Fee receipt ${receipt.receiptNo} created successfully! (60% credited to Teacher)`, 'success');
    openReceiptModal(receipt, modalContainer);
  });
}

export function openExpenditureVoucherDialog(showToast, defaultPayee = '', defaultCategory = 'General Administration') {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const courses = state.courses;

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 560px; background: #0c1424; border: 1px solid var(--border-gold); box-shadow: 0 20px 60px rgba(0,0,0,0.85);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
        <h3 style="color: var(--accent-gold-light); margin: 0; font-size: 1.2rem;">
          🧾 Create Expenditure Voucher
        </h3>
        <button id="close-vouch-modal-btn" style="background: none; border: none; color: var(--text-muted); font-size: 1.3rem; cursor: pointer;">✕</button>
      </div>

      <form id="exp-voucher-form">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
            Payee Name / Vendor <span style="color: var(--accent-gold);">*</span>
          </label>
          <input 
            type="text" 
            id="vouch-payee-input" 
            value="${defaultPayee}" 
            placeholder="e.g. Nashik Commercial Printers / Faculty Honorarium" 
            style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem;"
            required 
          />
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Category <span style="color: var(--accent-gold);">*</span>
            </label>
            <select id="vouch-category-select" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
              <option value="${defaultCategory}">${defaultCategory}</option>
              <option value="Faculty Honorarium Paid">Faculty Honorarium Paid</option>
              <option value="Facility Rent">Facility Rent</option>
              <option value="Printing & Study Modules">Printing & Study Modules</option>
              <option value="Utilities & Broadband">Utilities & Broadband</option>
              <option value="Curriculum License">Curriculum License</option>
              <option value="Staff Salaries">Staff Salaries</option>
            </select>
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Amount (₹) <span style="color: var(--accent-gold);">*</span>
            </label>
            <input 
              type="number" 
              id="vouch-amount-input" 
              placeholder="e.g. 15000" 
              style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.95rem; font-weight: 700;"
              required 
            />
          </div>
        </div>

        <!-- Branch Where Actual Expenditure Incurred -->
        <div style="margin-bottom: 1rem; background: rgba(15,23,42,0.65); padding: 0.9rem; border-radius: 8px; border: 1px solid var(--border-gold);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.35rem;">
            <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #fff;">
              🏢 Branch Where Actual Expenditure Incurred <span style="color: var(--accent-gold);">*</span>
            </label>
            <span style="font-size: 0.7rem; color: var(--accent-gold); background: rgba(207,168,78,0.15); padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: 600;">
              Tick Option or Select from Dropdown
            </span>
          </div>

          <!-- Tickable Card Options -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-bottom: 0.65rem;">
            <label class="dir-branch-card" id="dir-card-branch-b1" style="display: flex; flex-direction: column; padding: 0.55rem 0.5rem; background: rgba(59,130,246,0.18); border: 2px solid #3b82f6; border-radius: 6px; cursor: pointer; transition: all 0.2s;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 0.3rem;">
                  <input type="radio" name="dir-branch-tick" value="b1" checked style="accent-color: #3b82f6;" />
                  <span style="font-weight: 800; font-size: 0.78rem; color: #60a5fa;">Branch 1</span>
                </div>
                <span class="dir-tick-ind" style="font-size: 0.7rem; color: #3b82f6; font-weight: 800;">✔</span>
              </div>
              <div style="font-size: 0.75rem; font-weight: 700; color: #fff; margin-top: 0.2rem;">Satpur Colony</div>
              <div style="font-size: 0.65rem; color: var(--text-dim); margin-top: 0.1rem;">Near Saptashrungi</div>
            </label>

            <label class="dir-branch-card" id="dir-card-branch-b2" style="display: flex; flex-direction: column; padding: 0.55rem 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); border-radius: 6px; cursor: pointer; transition: all 0.2s;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 0.3rem;">
                  <input type="radio" name="dir-branch-tick" value="b2" style="accent-color: #10b981;" />
                  <span style="font-weight: 800; font-size: 0.78rem; color: #34d399;">Branch 2</span>
                </div>
                <span class="dir-tick-ind" style="font-size: 0.7rem; color: #10b981; font-weight: 800; display: none;">✔</span>
              </div>
              <div style="font-size: 0.75rem; font-weight: 700; color: #fff; margin-top: 0.2rem;">Gangapur Road</div>
              <div style="font-size: 0.65rem; color: var(--text-dim); margin-top: 0.1rem;">Jehan Circle</div>
            </label>

            <label class="dir-branch-card" id="dir-card-branch-all" style="display: flex; flex-direction: column; padding: 0.55rem 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); border-radius: 6px; cursor: pointer; transition: all 0.2s;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 0.3rem;">
                  <input type="radio" name="dir-branch-tick" value="all" style="accent-color: #f59e0b;" />
                  <span style="font-weight: 800; font-size: 0.78rem; color: #fbbf24;">Shared</span>
                </div>
                <span class="dir-tick-ind" style="font-size: 0.7rem; color: #f59e0b; font-weight: 800; display: none;">✔</span>
              </div>
              <div style="font-size: 0.75rem; font-weight: 700; color: #fff; margin-top: 0.2rem;">Both Campuses</div>
              <div style="font-size: 0.65rem; color: var(--text-dim); margin-top: 0.1rem;">Student % Scheme</div>
            </label>
          </div>

          <!-- Dropdown List Selector -->
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
              <span style="font-size: 0.72rem; color: var(--text-muted);">Dropdown Selector (Synced):</span>
              <span id="dir-selected-branch-badge" style="font-size: 0.7rem; color: #60a5fa; font-weight: 700;">Active: Branch 1 (Satpur)</span>
            </div>
            <select id="vouch-branch-select" style="width: 100%; padding: 0.55rem 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem; font-weight: 600;">
              <option value="b1">Branch 1: Satpur Colony Center (Near Saptashrungi Mandir)</option>
              <option value="b2">Branch 2: Gangapur Road Center (Jehan Circle, Bramhecha Estate)</option>
              <option value="all">Shared / Both Branches (Common Overhead - Student Proportion Scheme)</option>
            </select>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Expense Allocation Type <span style="color: var(--accent-gold);">*</span>
            </label>
            <select id="vouch-type-select" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
              <option value="common">Common Overhead (Allocated % across all courses)</option>
              ${courses.map(c => `<option value="${c.id}">Direct to: ${c.name}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Payment Mode
            </label>
            <select id="vouch-mode-select" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
              <option value="Online NEFT / Bank Transfer">Online NEFT / Bank Transfer</option>
              <option value="Cheque">Cheque</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
            Description / Purpose
          </label>
          <input 
            type="text" 
            id="vouch-desc-input" 
            placeholder="e.g. Monthly classroom lease or study material print run" 
            style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;"
            required 
          />
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          <button type="button" id="cancel-vouch-btn" style="padding: 0.65rem 1.25rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 6px; color: #cbd5e1; cursor: pointer;">
            Cancel
          </button>
          <button type="submit" style="padding: 0.65rem 1.75rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 6px; cursor: pointer;">
            Issue Voucher →
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

  modalContainer.querySelector('#close-vouch-modal-btn').addEventListener('click', closeModal);
  modalContainer.querySelector('#cancel-vouch-btn').addEventListener('click', closeModal);

  // Sync Branch Radios and Dropdown
  const dirBranchDropdown = modalContainer.querySelector('#vouch-branch-select');
  const dirBranchRadios = modalContainer.querySelectorAll('input[name="dir-branch-tick"]');
  const dirBranchBadge = modalContainer.querySelector('#dir-selected-branch-badge');

  const updateDirBranchUI = (val) => {
    dirBranchDropdown.value = val;
    dirBranchRadios.forEach(r => {
      r.checked = (r.value === val);
      const card = modalContainer.querySelector(`#dir-card-branch-${r.value}`);
      if (!card) return;
      const tick = card.querySelector('.dir-tick-ind');
      if (r.value === val) {
        if (val === 'b1') {
          card.style.background = 'rgba(59,130,246,0.18)';
          card.style.border = '2px solid #3b82f6';
          dirBranchBadge.style.color = '#60a5fa';
          dirBranchBadge.textContent = 'Active: Branch 1 (Satpur Colony)';
        } else if (val === 'b2') {
          card.style.background = 'rgba(16,185,129,0.18)';
          card.style.border = '2px solid #10b981';
          dirBranchBadge.style.color = '#34d399';
          dirBranchBadge.textContent = 'Active: Branch 2 (Gangapur Road)';
        } else {
          card.style.background = 'rgba(245,158,11,0.18)';
          card.style.border = '2px solid #f59e0b';
          dirBranchBadge.style.color = '#fbbf24';
          dirBranchBadge.textContent = 'Active: Shared / Both Branches';
        }
        if (tick) tick.style.display = 'inline';
      } else {
        card.style.background = 'rgba(255,255,255,0.03)';
        card.style.border = '1px solid var(--border-light)';
        if (tick) tick.style.display = 'none';
      }
    });
  };

  dirBranchRadios.forEach(r => {
    r.addEventListener('change', () => updateDirBranchUI(r.value));
  });
  dirBranchDropdown.addEventListener('change', () => updateDirBranchUI(dirBranchDropdown.value));

  modalContainer.querySelector('#exp-voucher-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const branchId = modalContainer.querySelector('#vouch-branch-select').value;
    const branchName = branchId === 'b1' ? 'Branch 1: Satpur Colony Center' :
                       branchId === 'b2' ? 'Branch 2: Gangapur Road Center' :
                       'All Branches (Shared Overheads)';
    const payee = modalContainer.querySelector('#vouch-payee-input').value;
    const category = modalContainer.querySelector('#vouch-category-select').value;
    const amount = modalContainer.querySelector('#vouch-amount-input').value;
    const courseId = modalContainer.querySelector('#vouch-type-select').value;
    const mode = modalContainer.querySelector('#vouch-mode-select').value;
    const description = modalContainer.querySelector('#vouch-desc-input').value;

    const voucher = state.addExpense({
      payee,
      category,
      amount,
      mode,
      description,
      courseId,
      isCommon: courseId === 'common' || branchId === 'all',
      branchId,
      branchName
    });

    closeModal();
    showToast(`Expenditure voucher ${voucher.voucherNo} issued for ${branchName}!`, 'success');
    openVoucherModal(voucher, modalContainer);
  });
}

function openNewEnquiryDialog(showToast) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 540px; background: #0c1424; border: 1px solid var(--border-gold); box-shadow: 0 20px 60px rgba(0,0,0,0.85);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
        <h3 style="color: var(--accent-gold-light); margin: 0; font-size: 1.2rem;">
          📋 Record New Admission Enquiry
        </h3>
        <button id="close-enq-modal-btn" style="background: none; border: none; color: var(--text-muted); font-size: 1.3rem; cursor: pointer;">✕</button>
      </div>

      <form id="new-enquiry-form">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Student Name <span style="color: var(--accent-gold);">*</span>
            </label>
            <input type="text" id="enq-student-input" required style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Parent Name
            </label>
            <input type="text" id="enq-parent-input" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem;" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Contact Phone <span style="color: var(--accent-gold);">*</span>
            </label>
            <input type="tel" id="enq-phone-input" required placeholder="9822000000" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Course Interested
            </label>
            <select id="enq-course-select" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
              <option value="12th Commerce">12th Commerce</option>
              <option value="11th Commerce">11th Commerce</option>
              <option value="CA Foundation / Inter">CA Foundation / Inter</option>
              <option value="CMA Foundation / Inter">CMA Foundation / Inter</option>
              <option value="CS EET / Executive (Inter)">CS EET / Executive (Inter)</option>
              <option value="IGCSE (Commerce)">IGCSE (Commerce)</option>
            </select>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Status
            </label>
            <select id="enq-status-select" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
              <option value="persuaded">✓ Enquired and Persuaded</option>
              <option value="discontinued">✕ Enquired but Discontinued</option>
            </select>
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Nashik Branch
            </label>
            <select id="enq-branch-select" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
              <option value="Satpur Colony Center">Satpur Colony Center</option>
              <option value="Gangapur Road Center">Gangapur Road Center</option>
            </select>
          </div>
        </div>

        <div id="discontinued-reason-wrap" style="display: none; margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #f87171; margin-bottom: 0.35rem;">
            Discontinuation Reason <span style="color: var(--accent-gold);">*</span>
          </label>
          <input type="text" id="enq-reason-input" placeholder="e.g. Distance too far / Timing clash with college / Budget" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid rgba(239,68,68,0.5); border-radius: 6px; color: #fff; font-size: 0.85rem;" />
        </div>

        <div style="margin-bottom: 1.25rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
            Counselor Discussion Notes
          </label>
          <textarea id="enq-notes-input" rows="2" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;"></textarea>
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          <button type="button" id="cancel-enq-btn" style="padding: 0.65rem 1.25rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 6px; color: #cbd5e1; cursor: pointer;">
            Cancel
          </button>
          <button type="submit" style="padding: 0.65rem 1.75rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 6px; cursor: pointer;">
            Save Enquiry →
          </button>
        </div>
      </form>
    </div>
  `;

  modalContainer.classList.remove('hidden');

  const statusSel = modalContainer.querySelector('#enq-status-select');
  const reasonWrap = modalContainer.querySelector('#discontinued-reason-wrap');
  statusSel.addEventListener('change', () => {
    reasonWrap.style.display = statusSel.value === 'discontinued' ? 'block' : 'none';
  });

  const closeModal = () => {
    modalContainer.classList.add('hidden');
    modalContainer.innerHTML = '';
  };

  modalContainer.querySelector('#close-enq-modal-btn').addEventListener('click', closeModal);
  modalContainer.querySelector('#cancel-enq-btn').addEventListener('click', closeModal);

  modalContainer.querySelector('#new-enquiry-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const studentName = modalContainer.querySelector('#enq-student-input').value;
    const parentName = modalContainer.querySelector('#enq-parent-input').value;
    const phone = modalContainer.querySelector('#enq-phone-input').value;
    const courseInterested = modalContainer.querySelector('#enq-course-select').value;
    const status = statusSel.value;
    const branch = modalContainer.querySelector('#enq-branch-select').value;
    const reason = modalContainer.querySelector('#enq-reason-input').value;
    const counselorNotes = modalContainer.querySelector('#enq-notes-input').value;

    state.addEnquiry({
      studentName,
      parentName,
      phone,
      courseInterested,
      status,
      branch,
      reason,
      counselorNotes
    });

    closeModal();
    showToast(`Enquiry for ${studentName} saved successfully!`, 'success');
  });
}

function openRecruitmentDialog(showToast) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 560px; background: #0c1424; border: 1px solid var(--border-gold); box-shadow: 0 20px 60px rgba(0,0,0,0.85);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
        <h3 style="color: var(--accent-gold-light); margin: 0; font-size: 1.2rem;">
          👔 Add Recruitment Candidate
        </h3>
        <button id="close-rec-modal-btn" style="background: none; border: none; color: var(--text-muted); font-size: 1.3rem; cursor: pointer;">✕</button>
      </div>

      <form id="recruitment-form">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Candidate Name <span style="color: var(--accent-gold);">*</span>
            </label>
            <input type="text" id="rec-name-input" required style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Role Type
            </label>
            <select id="rec-roletype-select" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
              <option value="Teaching Faculty">Teaching Faculty</option>
              <option value="Non-Teaching / Admin">Non-Teaching / Admin</option>
            </select>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Post / Subject
            </label>
            <input type="text" id="rec-post-input" placeholder="e.g. Accounts & Tax / Front Desk" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Qualification
            </label>
            <input type="text" id="rec-qual-input" placeholder="e.g. CA / CMA / M.Com / MBA" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem;" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Contact Phone
            </label>
            <input type="tel" id="rec-phone-input" placeholder="+91 98220 00000" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Preferred Campus
            </label>
            <select id="rec-branch-select" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
              <option value="Both Campuses (Satpur & Gangapur)">Both Campuses (Satpur & Gangapur)</option>
              <option value="Branch 1: Satpur Colony Center">Branch 1: Satpur Colony Center</option>
              <option value="Branch 2: Gangapur Road Center">Branch 2: Gangapur Road Center</option>
            </select>
          </div>
        </div>

        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
            Expected Pay / Share
          </label>
          <input type="text" id="rec-pay-input" placeholder="e.g. 60% Sharing / ₹1,500 per Lecture / ₹25k monthly" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem;" />
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          <button type="button" id="cancel-rec-btn" style="padding: 0.65rem 1.25rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 6px; color: #cbd5e1; cursor: pointer;">
            Cancel
          </button>
          <button type="submit" style="padding: 0.65rem 1.75rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 6px; cursor: pointer;">
            Add Candidate →
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

  modalContainer.querySelector('#close-rec-modal-btn').addEventListener('click', closeModal);
  modalContainer.querySelector('#cancel-rec-btn').addEventListener('click', closeModal);

  modalContainer.querySelector('#recruitment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = modalContainer.querySelector('#rec-name-input').value;
    const roleType = modalContainer.querySelector('#rec-roletype-select').value;
    const post = modalContainer.querySelector('#rec-post-input').value;
    const qualification = modalContainer.querySelector('#rec-qual-input').value;
    const phone = modalContainer.querySelector('#rec-phone-input').value;
    const branchPreference = modalContainer.querySelector('#rec-branch-select').value;
    const expectedPay = modalContainer.querySelector('#rec-pay-input').value;

    state.addRecruitmentCandidate({
      name,
      roleType,
      post,
      qualification,
      experience: '4+ Years',
      phone,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      branchPreference,
      expectedPay,
      demoLectureDate: 'Upcoming Saturday',
      resumeName: `${name.replace(/\s+/g, '_')}_CV.pdf`,
      resumeSize: '1.1 MB',
      academicCertsList: ['Degree Certificate', 'Marksheet Transcript'],
      nonAcademicCertsList: ['Experience Certificate']
    });

    closeModal();
    showToast(`Applicant ${name} added to recruitment pipeline!`, 'success');
  });
}
