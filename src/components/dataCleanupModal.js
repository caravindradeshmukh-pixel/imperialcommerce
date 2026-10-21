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
      <div class="modal-box" style="max-width: 960px; width: 95%; max-height: 90vh; overflow-y: auto; background: #ffffff; border: 1px solid #cbd5e1; border-top: 5px solid #b91c1c; border-radius: 12px; box-shadow: 0 25px 75px rgba(15, 32, 66, 0.25); padding: 1.75rem; color: #0f172a;">
        
        <!-- Modal Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #e2e8f0; padding-bottom: 1rem; margin-bottom: 1.25rem;">
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <div style="width: 48px; height: 48px; border-radius: 12px; background: #fee2e2; border: 1px solid #fca5a5; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: #b91c1c;">
              🧹
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: #991b1b;">
                  DIRECTOR'S DATA MANAGEMENT & CLEANUP CENTER
                </h3>
                <span class="status-badge" style="background: #eff6ff; color: #1e3a8a; border: 1px solid #bfdbfe; font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700;">
                  Authority: ${activeDirector.name}
                </span>
              </div>
              <div style="font-size: 0.82rem; color: #64748b; margin-top: 0.25rem; font-weight: 500;">
                Permanently purge wrong entries, mock trial records, or restore official baseline for clean accounting.
              </div>
            </div>
          </div>
          <button id="close-cleanup-modal-btn" style="background: none; border: none; color: #64748b; font-size: 1.5rem; cursor: pointer; padding: 0.2rem 0.5rem; line-height: 1;">✕</button>
        </div>

        <!-- Metric Counter Tiles -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.75rem; margin-bottom: 1.25rem;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 0.75rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; text-transform: uppercase; color: #64748b; font-weight: 700;">Students</div>
            <div style="font-size: 1.3rem; font-weight: 800; color: #0f172a; margin-top: 0.2rem;">${students.length}</div>
            <div style="font-size: 0.72rem; font-weight: 600; color: ${mockStudentsCount > 0 ? '#b45309' : '#059669'};">
              ${mockStudentsCount} Mock / ${students.length - mockStudentsCount} Official
            </div>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 0.75rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; text-transform: uppercase; color: #64748b; font-weight: 700;">Receipts</div>
            <div style="font-size: 1.3rem; font-weight: 800; color: #059669; margin-top: 0.2rem;">${receipts.length}</div>
            <div style="font-size: 0.72rem; color: #64748b; font-weight: 600;">₹${receipts.reduce((a, r) => a + (r.amount || 0), 0).toLocaleString()} Collected</div>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 0.75rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; text-transform: uppercase; color: #64748b; font-weight: 700;">Vouchers</div>
            <div style="font-size: 1.3rem; font-weight: 800; color: #b91c1c; margin-top: 0.2rem;">${expenses.length}</div>
            <div style="font-size: 0.72rem; color: #64748b; font-weight: 600;">₹${expenses.reduce((a, e) => a + (e.amount || 0), 0).toLocaleString()} Spent</div>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 0.75rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; text-transform: uppercase; color: #64748b; font-weight: 700;">Enquiries</div>
            <div style="font-size: 1.3rem; font-weight: 800; color: #1e3a8a; margin-top: 0.2rem;">${enquiries.length}</div>
            <div style="font-size: 0.72rem; color: #64748b;">Admission leads</div>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 0.75rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; text-transform: uppercase; color: #64748b; font-weight: 700;">Academic Master</div>
            <div style="font-size: 1.3rem; font-weight: 800; color: #966f1e; margin-top: 0.2rem;">${courses.length} / ${subjects.length}</div>
            <div style="font-size: 0.72rem; color: #64748b;">${feeStructures.length} Fee Rules</div>
          </div>
        </div>

        <!-- Sub Tabs Navigation -->
        <div style="display: flex; gap: 0.5rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
          <button class="cleanup-tab-btn ${currentSubTab === 'purge' ? 'active' : ''}" data-subtab="purge" style="padding: 0.45rem 0.95rem; font-size: 0.82rem; font-weight: 700; border-radius: 6px; border: 1px solid ${currentSubTab === 'purge' ? '#b91c1c' : '#cbd5e1'}; background: ${currentSubTab === 'purge' ? '#fee2e2' : '#ffffff'}; color: ${currentSubTab === 'purge' ? '#991b1b' : '#334155'}; cursor: pointer;">
            ⚡ Quick Purge Actions
          </button>
          <button class="cleanup-tab-btn ${currentSubTab === 'students' ? 'active' : ''}" data-subtab="students" style="padding: 0.45rem 0.95rem; font-size: 0.82rem; font-weight: 700; border-radius: 6px; border: 1px solid ${currentSubTab === 'students' ? '#1e3a8a' : '#cbd5e1'}; background: ${currentSubTab === 'students' ? '#eff6ff' : '#ffffff'}; color: ${currentSubTab === 'students' ? '#1e3a8a' : '#334155'}; cursor: pointer;">
            🎓 Delete Students (${students.length})
          </button>
          <button class="cleanup-tab-btn ${currentSubTab === 'receipts' ? 'active' : ''}" data-subtab="receipts" style="padding: 0.45rem 0.95rem; font-size: 0.82rem; font-weight: 700; border-radius: 6px; border: 1px solid ${currentSubTab === 'receipts' ? '#059669' : '#cbd5e1'}; background: ${currentSubTab === 'receipts' ? '#f0fdf4' : '#ffffff'}; color: ${currentSubTab === 'receipts' ? '#059669' : '#334155'}; cursor: pointer;">
            🧾 Delete Receipts (${receipts.length})
          </button>
          <button class="cleanup-tab-btn ${currentSubTab === 'expenses' ? 'active' : ''}" data-subtab="expenses" style="padding: 0.45rem 0.95rem; font-size: 0.82rem; font-weight: 700; border-radius: 6px; border: 1px solid ${currentSubTab === 'expenses' ? '#b91c1c' : '#cbd5e1'}; background: ${currentSubTab === 'expenses' ? '#fee2e2' : '#ffffff'}; color: ${currentSubTab === 'expenses' ? '#991b1b' : '#334155'}; cursor: pointer;">
            💸 Delete Vouchers (${expenses.length})
          </button>
          <button class="cleanup-tab-btn ${currentSubTab === 'enquiries' ? 'active' : ''}" data-subtab="enquiries" style="padding: 0.45rem 0.95rem; font-size: 0.82rem; font-weight: 700; border-radius: 6px; border: 1px solid ${currentSubTab === 'enquiries' ? '#1e3a8a' : '#cbd5e1'}; background: ${currentSubTab === 'enquiries' ? '#eff6ff' : '#ffffff'}; color: ${currentSubTab === 'enquiries' ? '#1e3a8a' : '#334155'}; cursor: pointer;">
            📋 Delete Enquiries (${enquiries.length})
          </button>
        </div>

        <!-- Tab Body Content -->
        <div id="cleanup-tab-body">
          ${renderTabBody()}
        </div>

        <!-- Modal Footer -->
        <div style="border-top: 1px solid #e2e8f0; padding-top: 1rem; margin-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div style="font-size: 0.78rem; color: #64748b; font-weight: 500;">
            ⚠️ Deletions are instantaneous across local session & Supabase Cloud tables.
          </div>
          <button id="btn-close-cleanup-bottom" style="padding: 0.5rem 1.25rem; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; color: #334155; cursor: pointer; font-size: 0.82rem; font-weight: 600;">
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
          <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <div style="font-weight: 800; font-size: 1rem; color: #991b1b; display: flex; align-items: center; gap: 0.4rem;">
                <span>🗑️</span> Purge Non-Official / Mock Students (${mockStudentsCount} records found)
              </div>
              <div style="font-size: 0.82rem; color: #475569; margin-top: 0.3rem; max-width: 580px;">
                Keeps strictly the 5 official registered students from Users.xlsx (Arush Thorat, Jatin Avhad, Rutuja Shekokar, Om Nimse, Swaraj Kakade) and permanently purges all other test entries.
              </div>
            </div>
            <button 
              id="btn-purge-mock-students" 
              class="btn"
              ${mockStudentsCount === 0 ? 'disabled' : ''}
              style="padding: 0.6rem 1.2rem; background: ${mockStudentsCount === 0 ? '#e2e8f0' : 'linear-gradient(135deg, #dc2626, #b91c1c)'}; color: ${mockStudentsCount === 0 ? '#94a3b8' : '#fff'}; font-weight: 700; border: none; border-radius: 6px; cursor: ${mockStudentsCount === 0 ? 'not-allowed' : 'pointer'}; font-size: 0.82rem;"
            >
              Purge ${mockStudentsCount} Mock Students
            </button>
          </div>

          <!-- Bulk Action 2: Clear All Receipts -->
          <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <div style="font-weight: 800; font-size: 1rem; color: #92400e; display: flex; align-items: center; gap: 0.4rem;">
                <span>🧾</span> Clear All Fee Collection Receipts (${receipts.length} receipts)
              </div>
              <div style="font-size: 0.82rem; color: #475569; margin-top: 0.3rem; max-width: 580px;">
                Clears collection receipts so official accounting can start afresh. Resets students' paid fees to 0 and marks them Pending.
              </div>
            </div>
            <button 
              id="btn-clear-receipts" 
              class="btn"
              ${receipts.length === 0 ? 'disabled' : ''}
              style="padding: 0.6rem 1.2rem; background: ${receipts.length === 0 ? '#e2e8f0' : 'linear-gradient(135deg, #d97706, #b45309)'}; color: ${receipts.length === 0 ? '#94a3b8' : '#fff'}; font-weight: 800; border: none; border-radius: 6px; cursor: ${receipts.length === 0 ? 'not-allowed' : 'pointer'}; font-size: 0.82rem;"
            >
              Clear All Receipts
            </button>
          </div>

          <!-- Bulk Action 3: Clear All Expense Vouchers -->
          <div style="background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 8px; padding: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <div style="font-weight: 800; font-size: 1rem; color: #6b21a8; display: flex; align-items: center; gap: 0.4rem;">
                <span>💸</span> Clear All Expense Vouchers (${expenses.length} vouchers)
              </div>
              <div style="font-size: 0.82rem; color: #475569; margin-top: 0.3rem; max-width: 580px;">
                Removes all authorized expenditure vouchers to start clean operational overhead accounting.
              </div>
            </div>
            <button 
              id="btn-clear-expenses" 
              class="btn"
              ${expenses.length === 0 ? 'disabled' : ''}
              style="padding: 0.6rem 1.2rem; background: ${expenses.length === 0 ? '#e2e8f0' : 'linear-gradient(135deg, #7e22ce, #6b21a8)'}; color: ${expenses.length === 0 ? '#94a3b8' : '#fff'}; font-weight: 700; border: none; border-radius: 6px; cursor: ${expenses.length === 0 ? 'not-allowed' : 'pointer'}; font-size: 0.82rem;"
            >
              Clear All Vouchers
            </button>
          </div>

          <!-- Bulk Action 4: Restore Clean Official Master Baseline -->
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <div style="font-weight: 800; font-size: 1rem; color: #1e3a8a; display: flex; align-items: center; gap: 0.4rem;">
                <span>🔄</span> Reset to Official Master Baseline (Users.xlsx & Fee Schedules)
              </div>
              <div style="font-size: 0.82rem; color: #475569; margin-top: 0.3rem; max-width: 580px;">
                Restores exact state matching the institute documents: Directors Ishwari & Shrikrishna Deshmukh, Admin Pranav, Faculty leads, 5 students, and official Gangapur Rd & Satpur Colony fee schedules.
              </div>
            </div>
            <button 
              id="btn-factory-reset" 
              class="btn"
              style="padding: 0.6rem 1.2rem; background: linear-gradient(135deg, #0f2042, #1e3a8a); color: #ffffff; font-weight: 800; border: none; border-radius: 6px; cursor: pointer; font-size: 0.82rem; box-shadow: 0 4px 12px rgba(15,32,66,0.25);"
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
              <tr style="border-bottom: 2px solid #e2e8f0; color: #475569; font-size: 0.74rem; text-transform: uppercase;">
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
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 0.6rem;">
                      <div style="font-weight: 700; color: #0f172a;">${s.name}</div>
                      <div style="font-size: 0.72rem; color: #64748b; font-family: monospace;">${s.rollNo}</div>
                    </td>
                    <td style="padding: 0.6rem;">
                      <div style="font-weight: 600; color: #0f172a;">${s.courseName}</div>
                      <div style="font-size: 0.72rem; color: #64748b;">${s.branchName || s.batch}</div>
                    </td>
                    <td style="padding: 0.6rem;">
                      <span style="font-size: 0.7rem; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700; ${isOfficial ? 'background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0;' : 'background: #fffbeb; color: #b45309; border: 1px solid #fde68a;'}">
                        ${isOfficial ? 'Official (Users.xlsx)' : 'Mock / Added'}
                      </span>
                    </td>
                    <td style="padding: 0.6rem; font-weight: 600; color: #0f172a;">₹${(s.totalFees || 0).toLocaleString()}</td>
                    <td style="padding: 0.6rem; font-weight: 700; color: #059669;">₹${(s.paidFees || 0).toLocaleString()}</td>
                    <td style="padding: 0.6rem; text-align: right;">
                      <button 
                        class="delete-single-student-btn" 
                        data-student-id="${s.id}" 
                        data-student-name="${s.name}"
                        style="padding: 0.35rem 0.75rem; background: #fee2e2; border: 1px solid #fca5a5; border-radius: 4px; color: #991b1b; cursor: pointer; font-size: 0.75rem; font-weight: 700;"
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
              <tr style="border-bottom: 2px solid #e2e8f0; color: #475569; font-size: 0.74rem; text-transform: uppercase;">
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
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 0.6rem; font-family: monospace; font-weight: 700; color: #0f2042;">${r.receiptNo}</td>
                  <td style="padding: 0.6rem; color: #64748b;">${r.date}</td>
                  <td style="padding: 0.6rem; font-weight: 600; color: #0f172a;">${r.studentName}</td>
                  <td style="padding: 0.6rem; color: #334155;">${r.courseName}</td>
                  <td style="padding: 0.6rem; font-weight: 700; color: #059669;">₹${(r.amount || 0).toLocaleString()}</td>
                  <td style="padding: 0.6rem; font-weight: 600; color: #966f1e;">₹${(r.teacherShare60 || Math.round((r.amount || 0) * 0.6)).toLocaleString()}</td>
                  <td style="padding: 0.6rem; text-align: right;">
                    <button 
                      class="delete-single-receipt-btn" 
                      data-receipt-no="${r.receiptNo}"
                      style="padding: 0.35rem 0.75rem; background: #fee2e2; border: 1px solid #fca5a5; border-radius: 4px; color: #991b1b; cursor: pointer; font-size: 0.75rem; font-weight: 700;"
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
              <tr style="border-bottom: 2px solid #e2e8f0; color: #475569; font-size: 0.74rem; text-transform: uppercase;">
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
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 0.6rem; font-family: monospace; font-weight: 700; color: #0f2042;">${e.voucherNo}</td>
                  <td style="padding: 0.6rem; color: #64748b;">${e.date}</td>
                  <td style="padding: 0.6rem;">
                    <div style="font-weight: 600; color: #0f172a;">${e.payee}</div>
                    <div style="font-size: 0.72rem; color: #64748b;">${e.description || ''}</div>
                  </td>
                  <td style="padding: 0.6rem; color: #475569;">${e.category}</td>
                  <td style="padding: 0.6rem; font-weight: 700; color: #b91c1c;">₹${(e.amount || 0).toLocaleString()}</td>
                  <td style="padding: 0.6rem; text-align: right;">
                    <button 
                      class="delete-single-expense-btn" 
                      data-voucher-no="${e.voucherNo}"
                      style="padding: 0.35rem 0.75rem; background: #fee2e2; border: 1px solid #fca5a5; border-radius: 4px; color: #991b1b; cursor: pointer; font-size: 0.75rem; font-weight: 700;"
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
              <tr style="border-bottom: 2px solid #e2e8f0; color: #475569; font-size: 0.74rem; text-transform: uppercase;">
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
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 0.6rem; color: #64748b;">${enq.date}</td>
                  <td style="padding: 0.6rem;">
                    <div style="font-weight: 700; color: #0f172a;">${enq.studentName}</div>
                    <div style="font-size: 0.72rem; color: #64748b;">${enq.parentName ? `Parent: ${enq.parentName}` : ''}</div>
                  </td>
                  <td style="padding: 0.6rem; font-family: monospace; color: #0f2042;">+91 ${enq.phone}</td>
                  <td style="padding: 0.6rem; color: #334155;">${enq.courseInterested}</td>
                  <td style="padding: 0.6rem;">
                    <span style="font-size: 0.7rem; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700; ${enq.status === 'persuaded' ? 'background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0;' : 'background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca;'}">
                      ${enq.status}
                    </span>
                  </td>
                  <td style="padding: 0.6rem; text-align: right;">
                    <button 
                      class="delete-single-enquiry-btn" 
                      data-enquiry-id="${enq.id}"
                      style="padding: 0.35rem 0.75rem; background: #fee2e2; border: 1px solid #fca5a5; border-radius: 4px; color: #991b1b; cursor: pointer; font-size: 0.75rem; font-weight: 700;"
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
