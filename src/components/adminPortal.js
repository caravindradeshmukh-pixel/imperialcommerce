/* Imperial Commerce Tutorials - Admin Staff Portal
   Dedicated 4-Tab Operations Desk for Administrator */

import { state } from '../state.js';
import { openReceiptModal } from './receiptModal.js';
import { openVoucherModal } from './voucherModal.js';

import { openLoginModal } from './loginModal.js';

export function renderAdminPortal(container, showToast) {
  // Strict Session Guard
  if (!state.currentUser || (!['admin', 'director'].includes(state.currentUser.role))) {
    container.innerHTML = `
      <div style="max-width: 600px; margin: 4rem auto; padding: 2.5rem; background: #ffffff; border: 1px solid #cbd5e1; border-top: 5px solid #0f2042; border-radius: 14px; text-align: center; box-shadow: 0 15px 40px rgba(15,32,66,0.12);">
        <div style="font-size: 2.8rem; margin-bottom: 1rem;">🛡️</div>
        <h2 style="color: #0f2042; font-size: 1.45rem; font-weight: 800; margin-bottom: 0.5rem;">Admin Staff Authentication Required</h2>
        <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
          This operations desk is restricted to verified Imperial administrative personnel. Please sign in to proceed.
        </p>
        <button id="gate-admin-login-btn" style="background: linear-gradient(135deg, #0f2042, #1e3a8a); color: #fff; border: none; padding: 0.8rem 1.85rem; border-radius: 8px; font-weight: 800; font-size: 0.95rem; cursor: pointer; box-shadow: 0 4px 15px rgba(15,32,66,0.25);">
          🔐 Sign In as Admin Staff
        </button>
      </div>
    `;
    const btn = container.querySelector('#gate-admin-login-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        openLoginModal('admin');
      });
    }
    return;
  }

  const activeTab = state.currentAdminTab || 'receipts';

  const tabs = [
    { id: 'receipts', label: '1. Fee Receipt Generation', icon: '💳' },
    { id: 'vouchers', label: '2. Expenditure Voucher Generation', icon: '🧾' },
    { id: 'attendance', label: '3. Students Attendance & WhatsApp', icon: '📅' },
    { id: 'homework', label: '4. Student Homework Completion & WhatsApp', icon: '📝' }
  ];

  const currentTabObj = tabs.find(t => t.id === activeTab) || tabs[0];

  container.innerHTML = `
    <div class="portal-container" style="max-width: 1560px; margin: 0 auto; padding: 1.5rem 1.5rem 5rem; display: grid; grid-template-columns: 280px 1fr; gap: 1.75rem; align-items: start;">
      <!-- Admin Staff Header Banner (Full width across top) -->
      <div class="card" style="grid-column: 1 / -1; margin-bottom: 0; background: linear-gradient(135deg, rgba(19, 29, 49, 0.95), rgba(13, 21, 39, 0.95)); border: 1px solid var(--border-accent); padding: 1.15rem 1.75rem; border-radius: var(--radius-lg); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; box-shadow: var(--shadow-md);">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, #2563eb, #1d4ed8); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: #fff; font-weight: 800; box-shadow: 0 4px 20px var(--accent-primary-glow);">
            🛡️
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <h2 style="font-size: 1.35rem; color: #fff; margin: 0;">ADMIN STAFF OPERATIONS DESK</h2>
              <span class="status-badge" style="background: rgba(37,99,235,0.2); color: #60a5fa; border: 1px solid var(--border-accent); font-size: 0.75rem; padding: 0.2rem 0.65rem; border-radius: 20px; font-weight: 700;">
                Admin Officer Nilesh Patil
              </span>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">
              Imperial Commerce Tutorials • Fee Receipts, Expense Vouchers & Parent WhatsApp Automation
            </div>
          </div>
        </div>

        <div style="font-size: 0.82rem; color: var(--text-dim); text-align: right;">
          Satpur & Gangapur Road Centers Active
        </div>
      </div>

      <!-- Left Column: Admin Navigation Sidebar -->
      <aside class="portal-sidebar" style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.25rem; height: fit-content; position: sticky; top: 5.5rem;">
        <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); font-weight: 800; margin-bottom: 0.85rem; padding-left: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
          <span>ADMIN WORKFLOWS</span>
          <span style="font-size: 0.7rem; background: rgba(37,99,235,0.2); color: #93c5fd; padding: 0.1rem 0.45rem; border-radius: 4px; font-weight: 700;">4 Desks</span>
        </div>
        <nav class="portal-nav-list" style="display: flex; flex-direction: column; gap: 0.4rem;">
          ${tabs.map(t => {
            const isActive = activeTab === t.id;
            return `
              <button 
                class="admin-tab-btn ${isActive ? 'active-admin-tab' : ''}" 
                data-tab="${t.id}"
                style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 0.95rem; border-radius: 8px; font-size: 0.88rem; font-weight: ${isActive ? '700' : '600'}; cursor: pointer; text-align: left; width: 100%; border: 1px solid ${isActive ? 'var(--accent-primary)' : 'transparent'}; background: ${isActive ? 'rgba(37, 99, 235, 0.2)' : 'rgba(255,255,255,0.02)'}; color: ${isActive ? '#93c5fd' : 'var(--text-muted)'}; transition: all 0.2s ease;"
              >
                <span style="font-size: 1.15rem; width: 22px; text-align: center;">${t.icon}</span>
                <span style="flex: 1;">${t.label}</span>
                ${isActive ? '<span style="font-size: 0.75rem; color: #60a5fa;">●</span>' : ''}
              </button>
            `;
          }).join('')}
        </nav>
      </aside>

      <!-- Right Column: Tab Content Canvas -->
      <section class="portal-content" style="min-width: 0; display: flex; flex-direction: column; gap: 1.25rem;">
        <div id="admin-tab-content" style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%;">
          <!-- Rendered dynamically -->
        </div>
      </section>
    </div>
  `;

  // Attach tab switching events
  const tabBtns = container.querySelectorAll('.admin-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      state.currentAdminTab = tabId;
      renderAdminPortal(container, showToast);
    });
  });

  const tabContent = container.querySelector('#admin-tab-content');

  // Render the requested 4 tabs
  switch (activeTab) {
    case 'receipts':
      renderAdminReceiptTab(tabContent, showToast);
      break;
    case 'vouchers':
      renderAdminVoucherTab(tabContent, showToast);
      break;
    case 'attendance':
      renderAdminAttendanceTab(tabContent, showToast);
      break;
    case 'homework':
      renderAdminHomeworkTab(tabContent, showToast);
      break;
    default:
      renderAdminReceiptTab(tabContent, showToast);
      break;
  }
}

// =============================================================================
// TAB 1: FEE RECEIPT GENERATION TAB
// =============================================================================
function renderAdminReceiptTab(container, showToast) {
  const students = state.students;
  const receipts = state.receipts;

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 1.5rem; align-items: start;">
      <!-- Receipt Generation Form Card -->
      <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-gold); background: var(--bg-surface); border-radius: var(--radius-md);">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
          <span style="font-size: 1.3rem;">💳</span>
          <div>
            <h3 style="font-size: 1.15rem; color: #fff; margin: 0;">Generate New Fee Receipt</h3>
            <div style="font-size: 0.78rem; color: var(--accent-gold);">Auto-calculates 60% teacher honorarium share</div>
          </div>
        </div>

        <form id="admin-receipt-form">
          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Select Enrolled Student <span style="color: var(--accent-gold);">*</span>
            </label>
            <select id="adm-student-select" style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.88rem;">
              ${students.map(s => `
                <option value="${s.id}">
                  ${s.name} (${s.courseName}) — Due: ₹${(s.dueFees || 0).toLocaleString()}
                </option>
              `).join('')}
            </select>
          </div>

          <!-- Dynamic Student Info Pill -->
          <div id="adm-student-info-pill" style="padding: 0.75rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 6px; margin-bottom: 1rem; font-size: 0.82rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
              <span style="color: var(--text-muted);">Total Course Fee:</span>
              <strong id="adm-info-total" style="color: #fff;">₹48,000</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
              <span style="color: var(--text-muted);">Already Paid:</span>
              <strong id="adm-info-paid" style="color: #34d399;">₹48,000</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-muted);">Current Due Balance:</span>
              <strong id="adm-info-due" style="color: #f87171;">₹0</strong>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
                Amount Received (₹) <span style="color: var(--accent-gold);">*</span>
              </label>
              <input 
                type="number" 
                id="adm-amount-input" 
                value="20000" 
                style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.95rem; font-weight: 700;"
                required 
              />
            </div>
            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
                Payment Mode
              </label>
              <select id="adm-mode-select" style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.88rem;">
                <option value="Online (Bank UPI QR)">Online (Bank UPI QR)</option>
                <option value="Cash">Cash (Counter)</option>
                <option value="Cheque / DD">Cheque / Demand Draft</option>
                <option value="Online NEFT / IMPS">Online NEFT / IMPS</option>
              </select>
            </div>
          </div>

          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Transaction / Bank Reference
            </label>
            <input 
              type="text" 
              id="adm-txn-input" 
              value="UPI-${Date.now().toString().slice(-8)}" 
              style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem; font-family: monospace;"
            />
          </div>

          <div style="margin-bottom: 1.25rem;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Installment / Fee Notes
            </label>
            <input 
              type="text" 
              id="adm-notes-input" 
              value="Tuition Term Fee Payment" 
              style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;"
            />
          </div>

          <button 
            type="submit" 
            style="width: 100%; padding: 0.75rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; font-size: 0.95rem; border: none; border-radius: 6px; cursor: pointer; box-shadow: 0 4px 15px rgba(207,168,78,0.3);"
          >
            Print & Issue Official Receipt →
          </button>
        </form>
      </div>

      <!-- Generated Receipts List Card -->
      <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="font-size: 1.15rem; color: #fff; margin: 0;">Issued Fee Receipts Archive</h3>
          <span style="font-size: 0.78rem; color: var(--text-muted);">${receipts.length} Total Receipts</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.75rem; max-height: 520px; overflow-y: auto;">
          ${receipts.map(r => {
            const student = students.find(s => s.id === r.studentId);
            const cleanPhone = (student && student.parentPhone ? student.parentPhone : '9370728283').replace(/\D/g, '');
            const waReceiptMsg = `Dear Parent, fee receipt ${r.receiptNo} of ₹${r.amount.toLocaleString()} for ${r.studentName} (${r.courseName}) has been generated successfully at Imperial Commerce Tutorials. Txn Ref: ${r.txnId}. Thank you!`;
            const waUrl = `https://api.whatsapp.com/send?phone=91${cleanPhone}&text=${encodeURIComponent(waReceiptMsg)}`;

            return `
              <div style="padding: 0.85rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-family: monospace; font-weight: 700; color: var(--accent-gold); font-size: 0.9rem;">${r.receiptNo}</span>
                    <span style="font-size: 0.75rem; color: var(--text-dim);">${r.date}</span>
                  </div>
                  <div style="font-weight: 600; color: #fff; margin-top: 0.2rem;">${r.studentName}</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">${r.courseName} • ${r.mode}</div>
                </div>

                <div style="display: flex; align-items: center; gap: 0.6rem;">
                  <div style="text-align: right; margin-right: 0.25rem;">
                    <div style="font-weight: 700; color: #34d399; font-size: 1.05rem;">₹${r.amount.toLocaleString()}</div>
                    <div style="font-size: 0.7rem; color: var(--text-gold);">60% Share: ₹${(r.teacherShare60 || Math.round(r.amount * 0.6)).toLocaleString()}</div>
                  </div>
                  <button class="view-admin-receipt-btn" data-receipt-no="${r.receiptNo}" style="padding: 0.35rem 0.65rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 5px; color: #fff; font-size: 0.75rem; cursor: pointer;">
                    📄 Print
                  </button>
                  <a href="${waUrl}" target="_blank" style="padding: 0.35rem 0.65rem; background: #25D366; color: #070b14; font-weight: 700; border-radius: 5px; font-size: 0.75rem; text-decoration: none;">
                    📲 WA
                  </a>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  // Dynamic student info updater
  const select = container.querySelector('#adm-student-select');
  const infoTotal = container.querySelector('#adm-info-total');
  const infoPaid = container.querySelector('#adm-info-paid');
  const infoDue = container.querySelector('#adm-info-due');
  const amountInput = container.querySelector('#adm-amount-input');

  const updateStudentInfo = (sId) => {
    const s = students.find(item => item.id === sId);
    if (s) {
      infoTotal.textContent = `₹${(s.totalFees || 0).toLocaleString()}`;
      infoPaid.textContent = `₹${(s.paidFees || 0).toLocaleString()}`;
      infoDue.textContent = `₹${(s.dueFees || 0).toLocaleString()}`;
      if (s.dueFees > 0) amountInput.value = s.dueFees;
    }
  };

  select.addEventListener('change', () => updateStudentInfo(select.value));
  updateStudentInfo(select.value);

  // Form submit
  container.querySelector('#admin-receipt-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const studentId = select.value;
    const amount = amountInput.value;
    const mode = container.querySelector('#adm-mode-select').value;
    const txnId = container.querySelector('#adm-txn-input').value;
    const notes = container.querySelector('#adm-notes-input').value;

    const receipt = state.collectFee({ studentId, amount, mode, txnId, notes });
    showToast(`Receipt ${receipt.receiptNo} generated! 60% credited to Teacher Remuneration.`, 'success');
    renderAdminReceiptTab(container, showToast);

    const modalContainer = document.getElementById('modal-container');
    openReceiptModal(receipt, modalContainer);
  });

  // Attach print button click
  container.querySelectorAll('.view-admin-receipt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const recNo = btn.getAttribute('data-receipt-no');
      const rec = state.receipts.find(r => r.receiptNo === recNo);
      if (rec) {
        const modalContainer = document.getElementById('modal-container');
        openReceiptModal(rec, modalContainer);
      }
    });
  });
}

// =============================================================================
// =============================================================================
// TAB 2: EXPENDITURE VOUCHER GENERATION TAB
// =============================================================================
function renderAdminVoucherTab(container, showToast) {
  const expenses = state.expenses;
  const courses = state.courses;

  // Branch statistics
  const b1Count = expenses.filter(e => e.branchId === 'b1').length;
  const b2Count = expenses.filter(e => e.branchId === 'b2').length;
  const sharedCount = expenses.filter(e => e.branchId === 'all' || (!e.branchId && e.isCommon)).length;

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1.15fr 1.35fr; gap: 1.5rem; align-items: start;">
      <!-- Voucher Generation Form -->
      <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-accent); background: var(--bg-surface); border-radius: var(--radius-md);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.3rem;">🧾</span>
            <div>
              <h3 style="font-size: 1.15rem; color: #fff; margin: 0;">Generate Expenditure Voucher</h3>
              <div style="font-size: 0.78rem; color: #93c5fd;">Admin desk authorized payment vouchers with branch tagging</div>
            </div>
          </div>
          <span style="font-size: 0.72rem; background: rgba(59,130,246,0.15); color: #60a5fa; border: 1px solid rgba(59,130,246,0.3); padding: 0.15rem 0.5rem; border-radius: 12px; font-weight: 700;">
            2 Active Branches
          </span>
        </div>

        <form id="admin-voucher-form">
          <!-- BRANCH SELECTION: OPTIONS TO TICK OR DROPDOWN LIST -->
          <div style="margin-bottom: 1.15rem; background: rgba(15,23,42,0.7); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-accent); box-shadow: 0 4px 15px rgba(0,0,0,0.25);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem; flex-wrap: wrap; gap: 0.35rem;">
              <label style="display: block; font-size: 0.88rem; font-weight: 700; color: #fff;">
                🏢 Branch Where Actual Expenditure Incurred <span style="color: var(--accent-gold);">*</span>
              </label>
              <span style="font-size: 0.7rem; color: #93c5fd; background: rgba(59,130,246,0.18); padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: 600; border: 1px solid rgba(59,130,246,0.35);">
                Tick Option or Select from Dropdown
              </span>
            </div>

            <!-- Option A: Clickable Segmented Tick Cards (Radio Buttons) -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.55rem; margin-bottom: 0.75rem;">
              
              <!-- Branch 1 Tick Option -->
              <label class="adm-branch-card" id="card-branch-b1" style="display: flex; flex-direction: column; padding: 0.65rem 0.6rem; background: rgba(59,130,246,0.18); border: 2px solid #3b82f6; border-radius: 8px; cursor: pointer; transition: all 0.2s ease;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div style="display: flex; align-items: center; gap: 0.35rem;">
                    <input type="radio" name="adm-branch-tick" value="b1" checked style="accent-color: #3b82f6; cursor: pointer;" />
                    <span style="font-weight: 800; font-size: 0.82rem; color: #60a5fa;">Branch 1</span>
                  </div>
                  <span class="tick-indicator" style="font-size: 0.74rem; color: #3b82f6; font-weight: 800;">✔</span>
                </div>
                <div style="font-size: 0.78rem; font-weight: 700; color: #fff; margin-top: 0.25rem;">Satpur Colony</div>
                <div style="font-size: 0.68rem; color: var(--text-dim); margin-top: 0.1rem; line-height: 1.2;">Near Saptashrungi Mandir</div>
              </label>

              <!-- Branch 2 Tick Option -->
              <label class="adm-branch-card" id="card-branch-b2" style="display: flex; flex-direction: column; padding: 0.65rem 0.6rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); border-radius: 8px; cursor: pointer; transition: all 0.2s ease;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div style="display: flex; align-items: center; gap: 0.35rem;">
                    <input type="radio" name="adm-branch-tick" value="b2" style="accent-color: #10b981; cursor: pointer;" />
                    <span style="font-weight: 800; font-size: 0.82rem; color: #34d399;">Branch 2</span>
                  </div>
                  <span class="tick-indicator" style="font-size: 0.74rem; color: #10b981; font-weight: 800; display: none;">✔</span>
                </div>
                <div style="font-size: 0.78rem; font-weight: 700; color: #fff; margin-top: 0.25rem;">Gangapur Road</div>
                <div style="font-size: 0.68rem; color: var(--text-dim); margin-top: 0.1rem; line-height: 1.2;">Jehan Circle, Bramhecha</div>
              </label>

              <!-- Shared / Both Branches Tick Option -->
              <label class="adm-branch-card" id="card-branch-all" style="display: flex; flex-direction: column; padding: 0.65rem 0.6rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); border-radius: 8px; cursor: pointer; transition: all 0.2s ease;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div style="display: flex; align-items: center; gap: 0.35rem;">
                    <input type="radio" name="adm-branch-tick" value="all" style="accent-color: #f59e0b; cursor: pointer;" />
                    <span style="font-weight: 800; font-size: 0.82rem; color: #fbbf24;">Shared</span>
                  </div>
                  <span class="tick-indicator" style="font-size: 0.74rem; color: #f59e0b; font-weight: 800; display: none;">✔</span>
                </div>
                <div style="font-size: 0.78rem; font-weight: 700; color: #fff; margin-top: 0.25rem;">Both Campuses</div>
                <div style="font-size: 0.68rem; color: var(--text-dim); margin-top: 0.1rem; line-height: 1.2;">Allocated % (Satpur / Gangapur)</div>
              </label>

            </div>

            <!-- Option B: Synchronized Dropdown List Selector -->
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
                <span style="font-size: 0.74rem; color: var(--text-muted);">Dropdown List Selection (Two-Way Synced):</span>
                <span id="adm-selected-branch-badge" style="font-size: 0.72rem; color: #60a5fa; font-weight: 700;">Active: Branch 1 (Satpur Colony Center)</span>
              </div>
              <select id="adm-vouch-branch" style="width: 100%; padding: 0.6rem 0.75rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem; font-weight: 600; cursor: pointer;">
                <option value="b1">Branch 1: Satpur Colony Center (Near Saptashrungi Mandir)</option>
                <option value="b2">Branch 2: Gangapur Road Center (Jehan Circle, Bramhecha Estate)</option>
                <option value="all">Shared / Both Branches (Common Overhead - Student Proportion Allocation Scheme)</option>
              </select>
            </div>
          </div>

          <!-- Vendor / Payee -->
          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Payee Name / Vendor <span style="color: var(--accent-gold);">*</span>
            </label>
            <input 
              type="text" 
              id="adm-vouch-payee" 
              placeholder="e.g. Nashik Commercial Printers / Center Power & Utilities" 
              required 
              style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem;"
            />
          </div>

          <!-- Category & Amount -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
                Expense Category <span style="color: var(--accent-gold);">*</span>
              </label>
              <select id="adm-vouch-category" style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
                <option value="Printing & Study Modules">Printing & Study Modules</option>
                <option value="Facility Rent">Facility Rent</option>
                <option value="Utilities & Broadband">Utilities & Broadband</option>
                <option value="Faculty Honorarium Paid">Faculty Honorarium Paid</option>
                <option value="Curriculum License">Curriculum License</option>
                <option value="General Administration">General Administration</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
                Amount (₹) <span style="color: var(--accent-gold);">*</span>
              </label>
              <input 
                type="number" 
                id="adm-vouch-amount" 
                placeholder="e.g. 8500" 
                required 
                style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.95rem; font-weight: 700;"
              />
            </div>
          </div>

          <!-- Allocation & Payment Mode -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
                Course Allocation
              </label>
              <select id="adm-vouch-course" style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
                <option value="common">Common Institute Overhead (Allocated %)</option>
                ${courses.map(c => `<option value="${c.id}">Direct: ${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
                Payment Mode
              </label>
              <select id="adm-vouch-mode" style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
                <option value="Cash">Cash</option>
                <option value="Online NEFT / Bank Transfer">Online NEFT / Bank Transfer</option>
                <option value="Cheque">Cheque</option>
                <option value="Online UPI">Online UPI</option>
              </select>
            </div>
          </div>

          <!-- Description -->
          <div style="margin-bottom: 1.25rem;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Purpose / Description <span style="color: var(--accent-gold);">*</span>
            </label>
            <input 
              type="text" 
              id="adm-vouch-desc" 
              placeholder="e.g. Printing of 12th Accounts revision booklets for Satpur branch students" 
              required 
              style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;"
            />
          </div>

          <button 
            type="submit" 
            style="width: 100%; padding: 0.75rem; background: linear-gradient(135deg, var(--accent-primary), var(--accent-primary-hover)); color: #fff; font-weight: 700; font-size: 0.95rem; border: none; border-radius: 6px; cursor: pointer; box-shadow: 0 4px 15px var(--accent-primary-glow); display: flex; align-items: center; justify-content: center; gap: 0.4rem;"
          >
            <span>🧾</span> Authorise & Issue Voucher →
          </button>
        </form>
      </div>

      <!-- Issued Vouchers List & Branch Filter -->
      <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <h3 style="font-size: 1.15rem; color: #fff; margin: 0;">Issued Expenditure Vouchers</h3>
            <div style="font-size: 0.78rem; color: var(--text-muted);">Tagged with branch where actual expense incurred</div>
          </div>
          <span style="font-size: 0.78rem; color: var(--accent-gold); font-weight: 700;">${expenses.length} Total Records</span>
        </div>

        <!-- Branch Quick Filter Bar -->
        <div style="display: flex; gap: 0.4rem; margin-bottom: 1rem; flex-wrap: wrap;" id="admin-vouch-filter-bar">
          <button class="vouch-filter-btn active-vouch-filter" data-branch="all-filter" style="padding: 0.35rem 0.7rem; font-size: 0.74rem; font-weight: 700; border-radius: 20px; cursor: pointer; border: 1px solid var(--border-accent); background: rgba(37,99,235,0.25); color: #93c5fd;">
            All Branches (${expenses.length})
          </button>
          <button class="vouch-filter-btn" data-branch="b1" style="padding: 0.35rem 0.7rem; font-size: 0.74rem; font-weight: 700; border-radius: 20px; cursor: pointer; border: 1px solid rgba(59,130,246,0.3); background: rgba(59,130,246,0.1); color: #60a5fa;">
            📍 Satpur (${b1Count})
          </button>
          <button class="vouch-filter-btn" data-branch="b2" style="padding: 0.35rem 0.7rem; font-size: 0.74rem; font-weight: 700; border-radius: 20px; cursor: pointer; border: 1px solid rgba(16,185,129,0.3); background: rgba(16,185,129,0.1); color: #34d399;">
            📍 Gangapur (${b2Count})
          </button>
          <button class="vouch-filter-btn" data-branch="all" style="padding: 0.35rem 0.7rem; font-size: 0.74rem; font-weight: 700; border-radius: 20px; cursor: pointer; border: 1px solid rgba(245,158,11,0.3); background: rgba(245,158,11,0.1); color: #fbbf24;">
            📍 Shared (${sharedCount})
          </button>
        </div>

        <div id="admin-vouchers-container" style="display: flex; flex-direction: column; gap: 0.75rem; max-height: 540px; overflow-y: auto;">
          <!-- Dynamically populated vouchers list -->
        </div>
      </div>
    </div>
  `;

  // Branch Selection Synchronization Logic
  const branchDropdown = container.querySelector('#adm-vouch-branch');
  const branchRadios = container.querySelectorAll('input[name="adm-branch-tick"]');
  const branchBadge = container.querySelector('#adm-selected-branch-badge');

  const updateBranchSelectionUI = (val) => {
    branchDropdown.value = val;
    branchRadios.forEach(r => {
      r.checked = (r.value === val);
      const card = container.querySelector(`#card-branch-${r.value}`);
      if (!card) return;
      const tick = card.querySelector('.tick-indicator');
      if (r.value === val) {
        if (val === 'b1') {
          card.style.background = 'rgba(59,130,246,0.18)';
          card.style.border = '2px solid #3b82f6';
          branchBadge.style.color = '#60a5fa';
          branchBadge.textContent = 'Active: Branch 1 (Satpur Colony Center)';
        } else if (val === 'b2') {
          card.style.background = 'rgba(16,185,129,0.18)';
          card.style.border = '2px solid #10b981';
          branchBadge.style.color = '#34d399';
          branchBadge.textContent = 'Active: Branch 2 (Gangapur Road Center)';
        } else {
          card.style.background = 'rgba(245,158,11,0.18)';
          card.style.border = '2px solid #f59e0b';
          branchBadge.style.color = '#fbbf24';
          branchBadge.textContent = 'Active: Shared / Both Branches (Proportionate)';
        }
        if (tick) tick.style.display = 'inline';
      } else {
        card.style.background = 'rgba(255,255,255,0.03)';
        card.style.border = '1px solid var(--border-light)';
        if (tick) tick.style.display = 'none';
      }
    });
  };

  branchRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      updateBranchSelectionUI(radio.value);
    });
  });

  branchDropdown.addEventListener('change', () => {
    updateBranchSelectionUI(branchDropdown.value);
  });

  // Render Vouchers List with Filter
  const vouchersContainer = container.querySelector('#admin-vouchers-container');
  let currentFilter = 'all-filter';

  const renderVouchersList = () => {
    const filteredExpenses = expenses.filter(v => {
      if (currentFilter === 'all-filter') return true;
      if (currentFilter === 'b1') return v.branchId === 'b1';
      if (currentFilter === 'b2') return v.branchId === 'b2';
      if (currentFilter === 'all') return v.branchId === 'all' || (!v.branchId && v.isCommon);
      return true;
    });

    if (filteredExpenses.length === 0) {
      vouchersContainer.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
          No vouchers found for this branch selection.
        </div>
      `;
      return;
    }

    vouchersContainer.innerHTML = filteredExpenses.map(v => {
      const bId = v.branchId || (v.payee && v.payee.includes('Satpur') ? 'b1' : v.payee && v.payee.includes('Gangapur') ? 'b2' : 'all');
      const bBadge = bId === 'b1'
        ? `<span style="font-size: 0.68rem; background: rgba(59,130,246,0.18); color: #60a5fa; border: 1px solid rgba(59,130,246,0.35); padding: 0.12rem 0.45rem; border-radius: 4px; font-weight: 700;">📍 Satpur Colony</span>`
        : bId === 'b2'
        ? `<span style="font-size: 0.68rem; background: rgba(16,185,129,0.18); color: #34d399; border: 1px solid rgba(16,185,129,0.35); padding: 0.12rem 0.45rem; border-radius: 4px; font-weight: 700;">📍 Gangapur Road</span>`
        : `<span style="font-size: 0.68rem; background: rgba(245,158,11,0.18); color: #fbbf24; border: 1px solid rgba(245,158,11,0.35); padding: 0.12rem 0.45rem; border-radius: 4px; font-weight: 700;">📍 Shared Overhead</span>`;

      return `
        <div style="padding: 0.85rem 1rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.6rem; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='rgba(255,255,255,0.03)'">
          <div style="flex: 1; min-width: 200px;">
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span style="font-family: monospace; font-weight: 800; color: var(--accent-gold); font-size: 0.88rem;">${v.voucherNo}</span>
              <span style="font-size: 0.72rem; color: var(--text-dim);">${v.date}</span>
              ${bBadge}
            </div>
            <div style="font-weight: 600; color: #fff; margin-top: 0.25rem; font-size: 0.88rem;">${v.payee}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.15rem;">${v.description}</div>
            <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.2rem;">
              Category: <strong style="color: #cbd5e1;">${v.category}</strong> • Mode: <span style="font-family: monospace;">${v.mode}</span>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="text-align: right;">
              <div style="font-weight: 800; color: #f87171; font-size: 1.1rem;">₹${v.amount.toLocaleString()}</div>
              <div style="font-size: 0.7rem; color: var(--text-dim);">Debited</div>
            </div>
            <button class="view-admin-vouch-btn" data-voucher-no="${v.voucherNo}" style="padding: 0.4rem 0.75rem; background: rgba(207,168,78,0.15); border: 1px solid rgba(207,168,78,0.35); border-radius: 6px; color: var(--accent-gold); font-size: 0.78rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 0.3rem;">
              <span>🧾</span> View
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach view voucher modal
    vouchersContainer.querySelectorAll('.view-admin-vouch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const vNo = btn.getAttribute('data-voucher-no');
        const v = state.expenses.find(e => e.voucherNo === vNo);
        if (v) {
          const modalContainer = document.getElementById('modal-container');
          openVoucherModal(v, modalContainer);
        }
      });
    });
  };

  renderVouchersList();

  // Attach filter buttons
  container.querySelectorAll('.vouch-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.vouch-filter-btn').forEach(b => {
        b.style.background = 'rgba(255,255,255,0.04)';
        b.style.borderColor = 'var(--border-light)';
        b.style.color = 'var(--text-muted)';
      });
      btn.style.background = 'rgba(37,99,235,0.25)';
      btn.style.borderColor = 'var(--border-accent)';
      btn.style.color = '#93c5fd';
      currentFilter = btn.getAttribute('data-branch');
      renderVouchersList();
    });
  });

  // Submit voucher
  container.querySelector('#admin-voucher-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const branchId = container.querySelector('#adm-vouch-branch').value;
    const branchName = branchId === 'b1' ? 'Branch 1: Satpur Colony Center' :
                       branchId === 'b2' ? 'Branch 2: Gangapur Road Center' :
                       'All Branches (Shared Overheads)';
    const payee = container.querySelector('#adm-vouch-payee').value;
    const category = container.querySelector('#adm-vouch-category').value;
    const amount = container.querySelector('#adm-vouch-amount').value;
    const courseId = container.querySelector('#adm-vouch-course').value;
    const mode = container.querySelector('#adm-vouch-mode').value;
    const description = container.querySelector('#adm-vouch-desc').value;

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

    showToast(`Expenditure Voucher ${voucher.voucherNo} issued for ${branchName}!`, 'success');
    renderAdminVoucherTab(container, showToast);

    const modalContainer = document.getElementById('modal-container');
    openVoucherModal(voucher, modalContainer);
  });
}

// =============================================================================
// TAB 3: STUDENTS ATTENDANCE TAB (with WhatsApp Message facility to convey unattendance)
// =============================================================================
function renderAdminAttendanceTab(container, showToast) {
  const students = state.students;
  const courses = state.courses;

  container.innerHTML = `
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <h3 style="font-size: 1.2rem; color: #fff; margin: 0;">Students Attendance & WhatsApp Absence Alert Desk</h3>
          <div style="font-size: 0.82rem; color: var(--text-muted);">
            Mark student presence and immediately trigger pre-filled WhatsApp alert to absentee's parents
          </div>
        </div>
        <div>
          <select id="adm-att-filter" style="padding: 0.5rem 0.75rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
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
              <th style="padding: 0.75rem;">Parent Contact</th>
              <th style="padding: 0.75rem;">Today's Attendance</th>
              <th style="padding: 0.75rem; text-align: right;">Convey Unattendance to Parents</th>
            </tr>
          </thead>
          <tbody id="adm-att-tbody">
            ${renderAdminAttendanceRows(students)}
          </tbody>
        </table>
      </div>
    </div>
  `;

  const filter = container.querySelector('#adm-att-filter');
  const tbody = container.querySelector('#adm-att-tbody');

  filter.addEventListener('change', () => {
    const val = filter.value;
    const filtered = val === 'all' ? students : students.filter(s => s.courseId === val);
    tbody.innerHTML = renderAdminAttendanceRows(filtered);
    attachAdminAttendanceEvents(container, showToast);
  });

  attachAdminAttendanceEvents(container, showToast);
}

function renderAdminAttendanceRows(students) {
  return students.map(s => {
    const waUrl = state.getWhatsAppAttendanceUrl(s.id);
    const isAbsent = s.todayAttendance === 'Absent';

    return `
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
        <td style="padding: 0.75rem;">
          <div style="font-weight: 700; color: #fff;">${s.name}</div>
          <div style="font-size: 0.75rem; color: var(--text-dim); font-family: monospace;">${s.rollNo}</div>
        </td>
        <td style="padding: 0.75rem; font-weight: 600;">${s.courseName}</td>
        <td style="padding: 0.75rem;">
          <div style="color: #cbd5e1;">${s.parentName || 'Parent'}</div>
          <div style="font-family: monospace; font-size: 0.78rem; color: var(--text-dim);">+91 ${s.parentPhone || s.phone}</div>
        </td>
        <td style="padding: 0.75rem;">
          <button 
            class="toggle-adm-att-btn" 
            data-student-id="${s.id}" 
            data-status="${s.todayAttendance}"
            style="padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.78rem; font-weight: 700; border: 1px solid ${!isAbsent ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}; background: ${!isAbsent ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}; color: ${!isAbsent ? '#34d399' : '#f87171'}; cursor: pointer;"
          >
            ${!isAbsent ? '✓ Present' : '✕ Absent'}
          </button>
        </td>
        <td style="padding: 0.75rem; text-align: right;">
          ${isAbsent ? `
            <a 
              href="${waUrl}" 
              target="_blank" 
              style="padding: 0.4rem 0.85rem; background: #25D366; color: #070b14; font-weight: 700; font-size: 0.78rem; border-radius: 6px; display: inline-flex; align-items: center; gap: 0.35rem; text-decoration: none; box-shadow: 0 2px 10px rgba(37,211,102,0.3);"
            >
              <span>📲</span> Send WhatsApp Absence Notice
            </a>
          ` : `
            <span style="font-size: 0.75rem; color: var(--text-dim);">Attending Class</span>
          `}
        </td>
      </tr>
    `;
  }).join('');
}

function attachAdminAttendanceEvents(container, showToast) {
  container.querySelectorAll('.toggle-adm-att-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sId = btn.getAttribute('data-student-id');
      const current = btn.getAttribute('data-status');
      const newStatus = current === 'Present' ? 'Absent' : 'Present';
      state.markAttendance(sId, newStatus);
      showToast(`Student marked: ${newStatus}`, newStatus === 'Present' ? 'success' : 'warning');
      renderAdminAttendanceTab(container, showToast);
    });
  });
}

// =============================================================================
// TAB 4: STUDENT HOMEWORK COMPLETION TAB (with WhatsApp Message facility)
// =============================================================================
function renderAdminHomeworkTab(container, showToast) {
  const students = state.students;
  const homeworks = state.homeworks;

  container.innerHTML = `
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="margin-bottom: 1.25rem;">
        <h3 style="font-size: 1.2rem; color: #fff; margin: 0;">Student Homework Completion & Parent Alert Desk</h3>
        <div style="font-size: 0.82rem; color: var(--text-muted);">
          Track daily problem set submissions and instantly notify parents of non-completion via WhatsApp
        </div>
      </div>

      <div style="overflow-x: auto;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.78rem; text-transform: uppercase;">
              <th style="padding: 0.75rem;">Student & Roll No</th>
              <th style="padding: 0.75rem;">Course Enrolled</th>
              <th style="padding: 0.75rem;">Active Homework Assignment</th>
              <th style="padding: 0.75rem;">Submission Status</th>
              <th style="padding: 0.75rem; text-align: right;">Convey Non-Completion to Parents</th>
            </tr>
          </thead>
          <tbody>
            ${students.map(s => {
              const waHwUrl = state.getWhatsAppHomeworkUrl(s.id);
              const isDone = s.homeworkCompleted !== false;
              const hw = homeworks[0];

              return `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 0.75rem;">
                    <div style="font-weight: 700; color: #fff;">${s.name}</div>
                    <div style="font-size: 0.75rem; color: var(--text-dim); font-family: monospace;">${s.rollNo}</div>
                  </td>
                  <td style="padding: 0.75rem; font-weight: 600;">${s.courseName}</td>
                  <td style="padding: 0.75rem; font-size: 0.82rem;">
                    <div style="color: #cbd5e1; font-weight: 600;">${hw ? hw.title : 'Partnership Accounts Problem Set'}</div>
                    <div style="font-size: 0.72rem; color: var(--text-dim);">Due: Tomorrow 8:00 AM</div>
                  </td>
                  <td style="padding: 0.75rem;">
                    <button 
                      class="toggle-adm-hw-btn" 
                      data-student-id="${s.id}" 
                      data-done="${isDone}"
                      style="padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.78rem; font-weight: 700; border: 1px solid ${isDone ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}; background: ${isDone ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}; color: ${isDone ? '#34d399' : '#f87171'}; cursor: pointer;"
                    >
                      ${isDone ? '✓ Completed' : '✕ Incomplete'}
                    </button>
                  </td>
                  <td style="padding: 0.75rem; text-align: right;">
                    ${!isDone ? `
                      <a 
                        href="${waHwUrl}" 
                        target="_blank" 
                        style="padding: 0.4rem 0.85rem; background: #25D366; color: #070b14; font-weight: 700; font-size: 0.78rem; border-radius: 6px; display: inline-flex; align-items: center; gap: 0.35rem; text-decoration: none; box-shadow: 0 2px 10px rgba(37,211,102,0.3);"
                      >
                        <span>📲</span> Send Non-Completion WhatsApp
                      </a>
                    ` : `
                      <span style="font-size: 0.75rem; color: #34d399; font-weight: 600;">✓ Homework Checked</span>
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

  // Attach toggle homework
  container.querySelectorAll('.toggle-adm-hw-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sId = btn.getAttribute('data-student-id');
      const isDone = btn.getAttribute('data-done') === 'true';
      state.markHomeworkCompletion(sId, !isDone);
      showToast(`Homework status updated for student!`, !isDone ? 'success' : 'warning');
      renderAdminHomeworkTab(container, showToast);
    });
  });
}
