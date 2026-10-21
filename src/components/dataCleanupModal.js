/* Imperial Commerce Tutorials - Director Data Management & Cleanup Center
   Allows either Director to delete wrong entries, remove mock/test data, and manage records */

import { state } from '../state.js';

export function openDataCleanupModal(showToast, onSuccess) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const officialStudentIds = ['s1', 's2', 's3', 's4', 's5'];
  let currentSubTab = 'purge';

  function renderModalContent() {
    const activeDirector = state.getActiveDirector();
    const students = state.students || [];
    const receipts = state.receipts || [];
    const expenses = state.expenses || [];
    const enquiries = state.enquiries || [];
    const courses = state.courses || [];
    const subjects = state.subjectsCatalog || [];
    const feeStructures = state.feeStructures || [];

    const mockStudentsCount = students.filter(s => !officialStudentIds.includes(s.id)).length;

    modalContainer.innerHTML = `
      <div class="modal-box" style="max-width: 960px; width: 95%; max-height: 90vh; overflow-y: auto; background: #0b1120; border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 12px; box-shadow: 0 25px 75px rgba(0,0,0,0.95); padding: 1.75rem; color: #fff;">
        
        <!-- Modal Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1.25rem;">
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(185, 28, 28, 0.4)); border: 1px solid rgba(239, 68, 68, 0.5); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
              🧹
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: #fca5a5;">
                  DIRECTOR'S DATA MANAGEMENT & CLEANUP CENTER
                </h3>
                <span class="status-badge" style="background: rgba(207,168,78,0.2); color: var(--accent-gold); border: 1px solid var(--border-gold); font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700;">
                  Authority: ${activeDirector.name}
                </span>
              </div>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">
                Permanently purge wrong entries, mock trial records, or restore official baseline for clean accounting.
              </div>
            </div>
          </div>
          <button id="close-cleanup-modal-btn" style="background: none; border: none; color: #94a3b8; font-size: 1.5rem; cursor: pointer; padding: 0.2rem 0.5rem; line-height: 1;">✕</button>
        </div>

        <!-- Metric Counter Tiles -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.75rem; margin-bottom: 1.25rem;">
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.75rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Students</div>
            <div style="font-size: 1.3rem; font-weight: 800; color: #fff; margin-top: 0.2rem;">${students.length}</div>
            <div style="font-size: 0.7rem; color: ${mockStudentsCount > 0 ? '#fbbf24' : '#34d399'};">
              ${mockStudentsCount} Mock / ${students.length - mockStudentsCount} Official
            </div>
          </div>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.75rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Receipts</div>
            <div style="font-size: 1.3rem; font-weight: 800; color: #34d399; margin-top: 0.2rem;">${receipts.length}</div>
            <div style="font-size: 0.7rem; color: var(--text-dim);">₹${receipts.reduce((a, r) => a + (r.amount || 0), 0).toLocaleString()} Collected</div>
          </div>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.75rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Vouchers</div>
            <div style="font-size: 1.3rem; font-weight: 800; color: #f87171; margin-top: 0.2rem;">${expenses.length}</div>
            <div style="font-size: 0.7rem; color: var(--text-dim);">₹${expenses.reduce((a, e) => a + (e.amount || 0), 0).toLocaleString()} Spent</div>
          </div>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.75rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Enquiries</div>
            <div style="font-size: 1.3rem; font-weight: 800; color: #60a5fa; margin-top: 0.2rem;">${enquiries.length}</div>
            <div style="font-size: 0.7rem; color: var(--text-dim);">Admission leads</div>
          </div>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.75rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Academic Master</div>
            <div style="font-size: 1.3rem; font-weight: 800; color: var(--accent-gold); margin-top: 0.2rem;">${courses.length} / ${subjects.length}</div>
            <div style="font-size: 0.7rem; color: var(--text-dim);">${feeStructures.length} Fee Rules</div>
          </div>
        </div>

        <!-- Sub Tabs Navigation -->
        <div style="display: flex; gap: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
          <button class="cleanup-tab-btn ${currentSubTab === 'purge' ? 'active' : ''}" data-subtab="purge" style="padding: 0.45rem 0.95rem; font-size: 0.82rem; font-weight: 700; border-radius: 6px; border: 1px solid ${currentSubTab === 'purge' ? 'rgba(239, 68, 68, 0.5)' : 'transparent'}; background: ${currentSubTab === 'purge' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.03)'}; color: ${currentSubTab === 'purge' ? '#fca5a5' : '#cbd5e1'}; cursor: pointer;">
            ⚡ Quick Purge Actions
          </button>
          <button class="cleanup-tab-btn ${currentSubTab === 'students' ? 'active' : ''}" data-subtab="students" style="padding: 0.45rem 0.95rem; font-size: 0.82rem; font-weight: 700; border-radius: 6px; border: 1px solid ${currentSubTab === 'students' ? 'var(--accent-gold)' : 'transparent'}; background: ${currentSubTab === 'students' ? 'rgba(207, 168, 78, 0.15)' : 'rgba(255,255,255,0.03)'}; color: ${currentSubTab === 'students' ? 'var(--accent-gold-light)' : '#cbd5e1'}; cursor: pointer;">
            🎓 Delete Students (${students.length})
          </button>
          <button class="cleanup-tab-btn ${currentSubTab === 'receipts' ? 'active' : ''}" data-subtab="receipts" style="padding: 0.45rem 0.95rem; font-size: 0.82rem; font-weight: 700; border-radius: 6px; border: 1px solid ${currentSubTab === 'receipts' ? '#34d399' : 'transparent'}; background: ${currentSubTab === 'receipts' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.03)'}; color: ${currentSubTab === 'receipts' ? '#6ee7b7' : '#cbd5e1'}; cursor: pointer;">
            🧾 Delete Receipts (${receipts.length})
          </button>
          <button class="cleanup-tab-btn ${currentSubTab === 'expenses' ? 'active' : ''}" data-subtab="expenses" style="padding: 0.45rem 0.95rem; font-size: 0.82rem; font-weight: 700; border-radius: 6px; border: 1px solid ${currentSubTab === 'expenses' ? '#f87171' : 'transparent'}; background: ${currentSubTab === 'expenses' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255,255,255,0.03)'}; color: ${currentSubTab === 'expenses' ? '#fca5a5' : '#cbd5e1'}; cursor: pointer;">
            💸 Delete Vouchers (${expenses.length})
          </button>
          <button class="cleanup-tab-btn ${currentSubTab === 'enquiries' ? 'active' : ''}" data-subtab="enquiries" style="padding: 0.45rem 0.95rem; font-size: 0.82rem; font-weight: 700; border-radius: 6px; border: 1px solid ${currentSubTab === 'enquiries' ? '#60a5fa' : 'transparent'}; background: ${currentSubTab === 'enquiries' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.03)'}; color: ${currentSubTab === 'enquiries' ? '#93c5fd' : '#cbd5e1'}; cursor: pointer;">
            📋 Delete Enquiries (${enquiries.length})
          </button>
        </div>

        <!-- Tab Body Content -->
        <div id="cleanup-tab-body">
          ${renderTabBody()}
        </div>

        <!-- Modal Footer -->
        <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1rem; margin-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div style="font-size: 0.75rem; color: var(--text-dim);">
            ⚠️ Deletions are instantaneous across local session & Supabase Cloud tables.
          </div>
          <button id="btn-close-cleanup-bottom" style="padding: 0.5rem 1.25rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 6px; color: #cbd5e1; cursor: pointer; font-size: 0.82rem;">
            Close Cleanup Desk
          </button>
        </div>

      </div>
    `;

    attachEvents();
  }

  function renderTabBody() {
    const students = state.students || [];
    const receipts = state.receipts || [];
    const expenses = state.expenses || [];
    const enquiries = state.enquiries || [];

    if (currentSubTab === 'purge') {
      const mockStudentsCount = students.filter(s => !officialStudentIds.includes(s.id)).length;

      return `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          
          <!-- Bulk Action 1: Purge Mock Students -->
          <div style="background: rgba(239, 68, 68, 0.06); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <div style="font-weight: 800; font-size: 1rem; color: #fca5a5; display: flex; align-items: center; gap: 0.4rem;">
                <span>🗑️</span> Purge Non-Official / Mock Students (${mockStudentsCount} records found)
              </div>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem; max-width: 580px;">
                Keeps the 5 official registered students from Users.xlsx (Arush Thorat, Jatin Avhad, Rutuja Shekokar, Om Nimse, Swaraj Kakade) and permanently purges all other test entries.
              </div>
            </div>
            <button 
              id="btn-purge-mock-students" 
              class="btn"
              ${mockStudentsCount === 0 ? 'disabled' : ''}
              style="padding: 0.6rem 1.2rem; background: ${mockStudentsCount === 0 ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #ef4444, #b91c1c)'}; color: ${mockStudentsCount === 0 ? '#64748b' : '#fff'}; font-weight: 700; border: none; border-radius: 6px; cursor: ${mockStudentsCount === 0 ? 'not-allowed' : 'pointer'}; font-size: 0.82rem;"
            >
              Purge ${mockStudentsCount} Mock Students
            </button>
          </div>

          <!-- Bulk Action 2: Clear All Receipts -->
          <div style="background: rgba(245, 158, 11, 0.06); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 8px; padding: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <div style="font-weight: 800; font-size: 1rem; color: #fcd34d; display: flex; align-items: center; gap: 0.4rem;">
                <span>🧾</span> Clear All Fee Collection Receipts (${receipts.length} receipts)
              </div>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem; max-width: 580px;">
                Clears all collection receipts so official accounting can start afresh. Resets students' paid fees to 0 and marks them Pending.
              </div>
            </div>
            <button 
              id="btn-clear-receipts" 
              class="btn"
              ${receipts.length === 0 ? 'disabled' : ''}
              style="padding: 0.6rem 1.2rem; background: ${receipts.length === 0 ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #f59e0b, #d97706)'}; color: ${receipts.length === 0 ? '#64748b' : '#070b14'}; font-weight: 800; border: none; border-radius: 6px; cursor: ${receipts.length === 0 ? 'not-allowed' : 'pointer'}; font-size: 0.82rem;"
            >
              Clear All Receipts
            </button>
          </div>

          <!-- Bulk Action 3: Clear All Expense Vouchers -->
          <div style="background: rgba(168, 85, 247, 0.06); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 8px; padding: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <div style="font-weight: 800; font-size: 1rem; color: #d8b4fe; display: flex; align-items: center; gap: 0.4rem;">
                <span>💸</span> Clear All Expense Vouchers (${expenses.length} vouchers)
              </div>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem; max-width: 580px;">
                Removes all authorized expenditure vouchers to start clean operational overhead accounting.
              </div>
            </div>
            <button 
              id="btn-clear-expenses" 
              class="btn"
              ${expenses.length === 0 ? 'disabled' : ''}
              style="padding: 0.6rem 1.2rem; background: ${expenses.length === 0 ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #a855f7, #7e22ce)'}; color: ${expenses.length === 0 ? '#64748b' : '#fff'}; font-weight: 700; border: none; border-radius: 6px; cursor: ${expenses.length === 0 ? 'not-allowed' : 'pointer'}; font-size: 0.82rem;"
            >
              Clear All Vouchers
            </button>
          </div>

          <!-- Bulk Action 4: Restore Clean Official Master Baseline -->
          <div style="background: rgba(207, 168, 78, 0.08); border: 1px solid var(--border-gold); border-radius: 8px; padding: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <div style="font-weight: 800; font-size: 1rem; color: var(--accent-gold-light); display: flex; align-items: center; gap: 0.4rem;">
                <span>🔄</span> Reset to Official Master Baseline (Users.xlsx & Fee Schedules)
              </div>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem; max-width: 580px;">
                Restores exact state matching the institute documents: Directors Ishwari & Shrikrishna Deshmukh, Admin Pranav, Faculty leads, 5 students, and official Gangapur Rd & Satpur Colony fee schedules.
              </div>
            </div>
            <button 
              id="btn-factory-reset" 
              class="btn"
              style="padding: 0.6rem 1.2rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 800; border: none; border-radius: 6px; cursor: pointer; font-size: 0.82rem;"
            >
              Reset to Official Baseline
            </button>
          </div>

        </div>
      `;
    }

    if (currentSubTab === 'students') {
      return `
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.74rem; text-transform: uppercase;">
                <th style="padding: 0.6rem;">Roll / Student</th>
                <th style="padding: 0.6rem;">Course & Branch</th>
                <th style="padding: 0.6rem;">Type</th>
                <th style="padding: 0.6rem;">Fees Assessed</th>
                <th style="padding: 0.6rem;">Paid</th>
                <th style="padding: 0.6rem; text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${students.map(s => {
                const isOfficial = officialStudentIds.includes(s.id);
                return `
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 0.6rem;">
                      <div style="font-weight: 700; color: #fff;">${s.name}</div>
                      <div style="font-size: 0.72rem; color: var(--text-dim); font-family: monospace;">${s.rollNo}</div>
                    </td>
                    <td style="padding: 0.6rem;">
                      <div style="font-weight: 600;">${s.courseName}</div>
                      <div style="font-size: 0.72rem; color: var(--text-muted);">${s.branchName || s.batch}</div>
                    </td>
                    <td style="padding: 0.6rem;">
                      <span style="font-size: 0.7rem; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700; ${isOfficial ? 'background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3);' : 'background: rgba(245,158,11,0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.3);'}">
                        ${isOfficial ? 'Official (Users.xlsx)' : 'Mock / Added'}
                      </span>
                    </td>
                    <td style="padding: 0.6rem; font-weight: 600;">₹${(s.totalFees || 0).toLocaleString()}</td>
                    <td style="padding: 0.6rem; font-weight: 700; color: #34d399;">₹${(s.paidFees || 0).toLocaleString()}</td>
                    <td style="padding: 0.6rem; text-align: right;">
                      <button 
                        class="delete-single-student-btn" 
                        data-student-id="${s.id}" 
                        data-student-name="${s.name}"
                        style="padding: 0.35rem 0.75rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 4px; color: #f87171; cursor: pointer; font-size: 0.75rem; font-weight: 700;"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    if (currentSubTab === 'receipts') {
      return `
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.74rem; text-transform: uppercase;">
                <th style="padding: 0.6rem;">Receipt No</th>
                <th style="padding: 0.6rem;">Date</th>
                <th style="padding: 0.6rem;">Student</th>
                <th style="padding: 0.6rem;">Course</th>
                <th style="padding: 0.6rem;">Amount</th>
                <th style="padding: 0.6rem;">60% Faculty</th>
                <th style="padding: 0.6rem; text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${receipts.map(r => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 0.6rem; font-family: monospace; font-weight: 700; color: var(--accent-gold);">${r.receiptNo}</td>
                  <td style="padding: 0.6rem; color: var(--text-muted);">${r.date}</td>
                  <td style="padding: 0.6rem; font-weight: 600;">${r.studentName}</td>
                  <td style="padding: 0.6rem;">${r.courseName}</td>
                  <td style="padding: 0.6rem; font-weight: 700; color: #34d399;">₹${(r.amount || 0).toLocaleString()}</td>
                  <td style="padding: 0.6rem; font-weight: 600; color: var(--accent-gold-light);">₹${(r.teacherShare60 || Math.round((r.amount || 0) * 0.6)).toLocaleString()}</td>
                  <td style="padding: 0.6rem; text-align: right;">
                    <button 
                      class="delete-single-receipt-btn" 
                      data-receipt-no="${r.receiptNo}"
                      style="padding: 0.35rem 0.75rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 4px; color: #f87171; cursor: pointer; font-size: 0.75rem; font-weight: 700;"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    if (currentSubTab === 'expenses') {
      return `
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.74rem; text-transform: uppercase;">
                <th style="padding: 0.6rem;">Voucher No</th>
                <th style="padding: 0.6rem;">Date</th>
                <th style="padding: 0.6rem;">Payee & Purpose</th>
                <th style="padding: 0.6rem;">Category</th>
                <th style="padding: 0.6rem;">Amount</th>
                <th style="padding: 0.6rem; text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${expenses.map(e => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 0.6rem; font-family: monospace; font-weight: 700; color: var(--accent-gold);">${e.voucherNo}</td>
                  <td style="padding: 0.6rem; color: var(--text-muted);">${e.date}</td>
                  <td style="padding: 0.6rem;">
                    <div style="font-weight: 600; color: #fff;">${e.payee}</div>
                    <div style="font-size: 0.72rem; color: var(--text-dim);">${e.description || ''}</div>
                  </td>
                  <td style="padding: 0.6rem; color: var(--text-muted);">${e.category}</td>
                  <td style="padding: 0.6rem; font-weight: 700; color: #f87171;">₹${(e.amount || 0).toLocaleString()}</td>
                  <td style="padding: 0.6rem; text-align: right;">
                    <button 
                      class="delete-single-expense-btn" 
                      data-voucher-no="${e.voucherNo}"
                      style="padding: 0.35rem 0.75rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 4px; color: #f87171; cursor: pointer; font-size: 0.75rem; font-weight: 700;"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    if (currentSubTab === 'enquiries') {
      return `
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.74rem; text-transform: uppercase;">
                <th style="padding: 0.6rem;">Date</th>
                <th style="padding: 0.6rem;">Student & Parent</th>
                <th style="padding: 0.6rem;">Contact</th>
                <th style="padding: 0.6rem;">Course</th>
                <th style="padding: 0.6rem;">Status</th>
                <th style="padding: 0.6rem; text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${enquiries.map(enq => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 0.6rem; color: var(--text-muted);">${enq.date}</td>
                  <td style="padding: 0.6rem;">
                    <div style="font-weight: 700; color: #fff;">${enq.studentName}</div>
                    <div style="font-size: 0.72rem; color: var(--text-dim);">${enq.parentName ? `Parent: ${enq.parentName}` : ''}</div>
                  </td>
                  <td style="padding: 0.6rem; font-family: monospace;">+91 ${enq.phone}</td>
                  <td style="padding: 0.6rem;">${enq.courseInterested}</td>
                  <td style="padding: 0.6rem;">
                    <span style="font-size: 0.7rem; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700; ${enq.status === 'persuaded' ? 'background: rgba(16,185,129,0.15); color: #34d399;' : 'background: rgba(239,68,68,0.15); color: #f87171;'}">
                      ${enq.status}
                    </span>
                  </td>
                  <td style="padding: 0.6rem; text-align: right;">
                    <button 
                      class="delete-single-enquiry-btn" 
                      data-enquiry-id="${enq.id}"
                      style="padding: 0.35rem 0.75rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 4px; color: #f87171; cursor: pointer; font-size: 0.75rem; font-weight: 700;"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    return '';
  }

  function attachEvents() {
    const closeModal = () => {
      modalContainer.classList.add('hidden');
      modalContainer.innerHTML = '';
      if (onSuccess) onSuccess();
    };

    modalContainer.querySelector('#close-cleanup-modal-btn').addEventListener('click', closeModal);
    modalContainer.querySelector('#btn-close-cleanup-bottom').addEventListener('click', closeModal);

    // Subtab switching
    modalContainer.querySelectorAll('.cleanup-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentSubTab = btn.getAttribute('data-subtab');
        renderModalContent();
      });
    });

    // Bulk action: Purge Mock Students
    const purgeMockBtn = modalContainer.querySelector('#btn-purge-mock-students');
    if (purgeMockBtn) {
      purgeMockBtn.addEventListener('click', () => {
        if (confirm('Director Authorization: Are you sure you want to purge all non-official mock students? This will keep strictly the 5 registered students from Users.xlsx.')) {
          const res = state.purgeMockData({ keepOfficialStudents: true });
          showToast(`Purged ${res.removedStudents} mock students. 5 official students preserved.`, 'success');
          renderModalContent();
        }
      });
    }

    // Bulk action: Clear Receipts
    const clearReceiptsBtn = modalContainer.querySelector('#btn-clear-receipts');
    if (clearReceiptsBtn) {
      clearReceiptsBtn.addEventListener('click', () => {
        if (confirm('Director Authorization: Are you sure you want to clear all test fee receipts? Students will be reset to Pending dues.')) {
          const res = state.purgeMockData({ keepOfficialStudents: false, clearReceipts: true });
          showToast(`Cleared ${res.removedReceipts} receipts. Accounting ledger reset.`, 'success');
          renderModalContent();
        }
      });
    }

    // Bulk action: Clear Expenses
    const clearExpensesBtn = modalContainer.querySelector('#btn-clear-expenses');
    if (clearExpensesBtn) {
      clearExpensesBtn.addEventListener('click', () => {
        if (confirm('Director Authorization: Are you sure you want to clear all expenditure vouchers?')) {
          const res = state.purgeMockData({ keepOfficialStudents: false, clearExpenses: true });
          showToast(`Cleared ${res.removedExpenses} expense vouchers.`, 'success');
          renderModalContent();
        }
      });
    }

    // Bulk action: Factory Reset to Official Baseline
    const factoryResetBtn = modalContainer.querySelector('#btn-factory-reset');
    if (factoryResetBtn) {
      factoryResetBtn.addEventListener('click', () => {
        if (confirm('CRITICAL ACTION: Reset entire platform to official baseline records from Users.xlsx? (Ishwari & Shrikrishna Deshmukh, Pranav Toradmal, Faculty, 5 Students, and Standard Fee Structures)')) {
          state.resetToOfficialRecords();
          showToast('Platform successfully restored to official master baseline!', 'success');
          renderModalContent();
        }
      });
    }

    // Individual Delete: Student
    modalContainer.querySelectorAll('.delete-single-student-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sId = btn.getAttribute('data-student-id');
        const sName = btn.getAttribute('data-student-name');
        if (confirm(`Are you sure you want to delete student "${sName}"? This record will be permanently deleted.`)) {
          state.deleteStudent(sId);
          showToast(`Student "${sName}" deleted.`, 'info');
          renderModalContent();
        }
      });
    });

    // Individual Delete: Receipt
    modalContainer.querySelectorAll('.delete-single-receipt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const rNo = btn.getAttribute('data-receipt-no');
        if (confirm(`Are you sure you want to delete receipt ${rNo}? Corresponding student balance will be adjusted.`)) {
          state.deleteReceipt(rNo);
          showToast(`Receipt ${rNo} deleted.`, 'info');
          renderModalContent();
        }
      });
    });

    // Individual Delete: Expense
    modalContainer.querySelectorAll('.delete-single-expense-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const vNo = btn.getAttribute('data-voucher-no');
        if (confirm(`Are you sure you want to delete expense voucher ${vNo}?`)) {
          state.deleteExpense(vNo);
          showToast(`Voucher ${vNo} deleted.`, 'info');
          renderModalContent();
        }
      });
    });

    // Individual Delete: Enquiry
    modalContainer.querySelectorAll('.delete-single-enquiry-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const eId = btn.getAttribute('data-enquiry-id');
        if (confirm(`Are you sure you want to delete enquiry ${eId}?`)) {
          state.deleteEnquiry(eId);
          showToast('Enquiry deleted.', 'info');
          renderModalContent();
        }
      });
    });
  }

  modalContainer.classList.remove('hidden');
  renderModalContent();
}
