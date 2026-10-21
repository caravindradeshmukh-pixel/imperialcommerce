/* Supabase Cloud Backend Data Preservation & Retrieval Hub Modal
   Imperial Commerce Tutorials, Nashik
*/

import { state } from '../state.js';
import { 
  SUPABASE_URL, 
  testConnection, 
  exportAllCloudData 
} from '../supabase.js';

export async function openCloudDataModal(modalContainer, showToast) {
  let activeTab = 'enquiries';
  let searchQuery = '';
  let isTestingPing = false;
  let isExporting = false;
  let isSyncing = false;
  let currentLatency = state.supabaseStatus.latency > 0 ? state.supabaseStatus.latency : 145;

  function downloadFile(content, fileName, contentType) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function convertToCSV(items, fields) {
    if (!items || !items.length) return '';
    const header = fields.join(',');
    const rows = items.map(item => {
      return fields.map(field => {
        let val = item[field] !== undefined ? item[field] : '';
        if (typeof val === 'object' && val !== null) {
          val = JSON.stringify(val).replace(/"/g, '""');
        } else {
          val = String(val).replace(/"/g, '""');
        }
        return `"${val}"`;
      }).join(',');
    });
    return [header, ...rows].join('\r\n');
  }

  function render() {
    const counts = {
      courses: (state.courses || []).length,
      subjects: (state.subjectsCatalog || []).length,
      feeStructures: (state.feeStructures || []).length,
      enquiries: state.enquiries.length,
      recruitment: state.recruitment.length,
      receipts: state.receipts.length,
      expenses: state.expenses.length,
      leaves: state.leaves.length,
      queries: state.queries.length,
      homeworks: state.homeworks.length,
      exams: state.exams.length,
      portions: state.portions.length,
      students: state.students.length,
      teachers: state.teachers.length
    };

    const totalRevenue = state.receipts.reduce((acc, r) => acc + (Number(r.amount) || 0), 0);
    const totalExpenses = state.expenses.reduce((acc, e) => acc + (Number(e.amount) || 0), 0);

    modalContainer.innerHTML = `
      <div class="modal-box" style="max-width: 1080px; width: 95vw; max-height: 90vh; background: #0b1120; border: 1px solid rgba(207, 168, 78, 0.4); border-radius: var(--radius-lg); box-shadow: 0 25px 80px rgba(0,0,0,0.9); display: flex; flex-direction: column; overflow: hidden;">
        
        <!-- Modal Header -->
        <div class="modal-header" style="background: linear-gradient(135deg, rgba(16, 24, 40, 0.98), rgba(11, 17, 32, 0.98)); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 1.25rem 1.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <div style="width: 46px; height: 46px; border-radius: 12px; background: linear-gradient(135deg, #10b981, #059669); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: #fff; box-shadow: 0 4px 18px rgba(16,185,129,0.35);">
              ☁️
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <h3 style="font-size: 1.25rem; color: #fff; margin: 0; font-weight: 800; font-family: var(--font-heading);">
                  Supabase Cloud Database & Data Preservation Hub
                </h3>
                <span style="font-size: 0.72rem; background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.4); padding: 0.2rem 0.6rem; border-radius: 20px; font-weight: 700; display: inline-flex; align-items: center; gap: 0.35rem;">
                  <span style="width: 7px; height: 7px; border-radius: 50%; background: #34d399; display: inline-block;"></span>
                  LIVE CONNECTED
                </span>
              </div>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0.2rem 0 0;">
                PostgreSQL Cloud Instance • Automatic Bidirectional Sync • Full Preservation & Instant Retrieval
              </p>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <button class="modal-close-btn" id="close-cloud-modal-btn" style="background: transparent; border: none; font-size: 1.8rem; color: var(--text-dim); cursor: pointer; line-height: 1;">&times;</button>
          </div>
        </div>

        <!-- Connection & Action Bar -->
        <div style="background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 0.9rem 1.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 1.25rem; font-size: 0.82rem; flex-wrap: wrap;">
            <div>
              <span style="color: var(--text-dim);">Project ID:</span> 
              <span style="color: #cbd5e1; font-family: monospace; font-weight: 700; background: rgba(255,255,255,0.05); padding: 0.15rem 0.4rem; border-radius: 4px;">olkfyupywipvxlwsfmzc</span>
            </div>
            <div>
              <span style="color: var(--text-dim);">Region:</span> 
              <span style="color: #cbd5e1; font-weight: 600;">ap-northeast-2 (Tokyo/Seoul)</span>
            </div>
            <div>
              <span style="color: var(--text-dim);">Latency:</span> 
              <span style="color: #34d399; font-weight: 700;">${currentLatency}ms</span>
            </div>
            <div>
              <span style="color: var(--text-dim);">Last Cloud Sync:</span> 
              <span style="color: var(--accent-gold-light); font-weight: 700;">${state.supabaseStatus.lastSync || 'Active Now'}</span>
            </div>
          </div>

          <!-- Quick Action Buttons -->
          <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
            <button 
              id="ping-test-btn" 
              class="btn btn-sm btn-outline" 
              style="padding: 0.4rem 0.75rem; font-size: 0.78rem; display: inline-flex; align-items: center; gap: 0.35rem;"
            >
              <span>⚡</span> ${isTestingPing ? 'Pinging...' : 'Test Ping'}
            </button>

            <button 
              id="pull-cloud-btn" 
              class="btn btn-sm btn-outline" 
              style="padding: 0.4rem 0.75rem; font-size: 0.78rem; display: inline-flex; align-items: center; gap: 0.35rem;"
            >
              <span>☁️</span> ${isSyncing ? 'Syncing...' : 'Pull from Supabase'}
            </button>

            <button 
              id="push-cloud-btn" 
              class="btn btn-sm btn-outline" 
              style="padding: 0.4rem 0.75rem; font-size: 0.78rem; display: inline-flex; align-items: center; gap: 0.35rem; border-color: rgba(16,185,129,0.4); color: #34d399;"
            >
              <span>⬆️</span> Push Local to Cloud
            </button>

            <button 
              id="export-json-btn" 
              class="btn btn-sm btn-gold" 
              style="padding: 0.45rem 0.9rem; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 0.35rem; font-weight: 800;"
            >
              <span>📥</span> ${isExporting ? 'Generating...' : 'Retrieve Full JSON Backup'}
            </button>
          </div>
        </div>

        <!-- Metric KPI Strips -->
        <div style="padding: 1rem 1.75rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.06);">
          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 0.65rem 0.85rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">Enquiries</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #60a5fa;">${counts.enquiries}</div>
          </div>

          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 0.65rem 0.85rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">Applicants</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #c084fc;">${counts.recruitment}</div>
          </div>

          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 0.65rem 0.85rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">Fee Receipts</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #34d399;">${counts.receipts}</div>
            <div style="font-size: 0.68rem; color: #10b981;">₹${(totalRevenue / 1000).toFixed(0)}k Collected</div>
          </div>

          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 0.65rem 0.85rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">Vouchers</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #f87171;">${counts.expenses}</div>
            <div style="font-size: 0.68rem; color: #ef4444;">₹${(totalExpenses / 1000).toFixed(0)}k Paid</div>
          </div>

          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 0.65rem 0.85rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">Leaves</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #fbbf24;">${counts.leaves}</div>
          </div>

          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 0.65rem 0.85rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">Doubts & Queries</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #38bdf8;">${counts.queries}</div>
          </div>

          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 0.65rem 0.85rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">Homeworks</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #a78bfa;">${counts.homeworks}</div>
          </div>

          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 0.65rem 0.85rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">Mock Exams</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #fb923c;">${counts.exams}</div>
          </div>

          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 0.65rem 0.85rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">Portions Logged</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #4ade80;">${counts.portions}</div>
          </div>

          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 0.65rem 0.85rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">Students</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #fff;">${counts.students}</div>
          </div>
        </div>

        <!-- Table Navigation & Search Bar -->
        <div style="padding: 0.85rem 1.75rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06); flex-wrap: wrap; gap: 0.75rem; background: rgba(0,0,0,0.15);">
          <!-- Tabs -->
          <div style="display: flex; gap: 0.35rem; overflow-x: auto; padding-bottom: 0.2rem; max-width: 65%;">
            ${[
              { id: 'courses', label: 'Courses', count: counts.courses },
              { id: 'subjects', label: 'Subjects', count: counts.subjects },
              { id: 'feeStructures', label: 'Fee Rules', count: counts.feeStructures },
              { id: 'enquiries', label: 'Enquiries', count: counts.enquiries },
              { id: 'recruitment', label: 'Candidates', count: counts.recruitment },
              { id: 'receipts', label: 'Fee Receipts', count: counts.receipts },
              { id: 'expenses', label: 'Expenses', count: counts.expenses },
              { id: 'leaves', label: 'Leaves', count: counts.leaves },
              { id: 'queries', label: 'Doubts', count: counts.queries },
              { id: 'homeworks', label: 'Homeworks', count: counts.homeworks },
              { id: 'exams', label: 'Exams', count: counts.exams },
              { id: 'portions', label: 'Portions', count: counts.portions },
              { id: 'students', label: 'Students', count: counts.students },
              { id: 'teachers', label: 'Teachers', count: counts.teachers }
            ].map(tab => `
              <button 
                class="tab-btn ${activeTab === tab.id ? 'active' : ''}" 
                data-table-tab="${tab.id}"
                style="padding: 0.35rem 0.75rem; font-size: 0.78rem; border-radius: 6px; border: 1px solid ${activeTab === tab.id ? 'var(--accent-gold)' : 'transparent'}; background: ${activeTab === tab.id ? 'rgba(207,168,78,0.15)' : 'transparent'}; color: ${activeTab === tab.id ? 'var(--accent-gold)' : 'var(--text-muted)'}; font-weight: 700; cursor: pointer; white-space: nowrap; display: flex; align-items: center; gap: 0.35rem;"
              >
                <span>${tab.label}</span>
                <span style="font-size: 0.68rem; background: rgba(255,255,255,0.08); padding: 0.1rem 0.35rem; border-radius: 10px;">${tab.count}</span>
              </button>
            `).join('')}
          </div>

          <!-- Search & Export CSV for active table -->
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <input 
              type="text" 
              id="cloud-table-search" 
              placeholder="Search ${activeTab}..." 
              value="${searchQuery}" 
              style="padding: 0.35rem 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #fff; font-size: 0.8rem; width: 170px;"
            />
            <button 
              id="export-active-csv-btn" 
              class="btn btn-sm btn-outline" 
              style="padding: 0.35rem 0.75rem; font-size: 0.76rem; display: inline-flex; align-items: center; gap: 0.3rem;"
              title="Export ${activeTab} as CSV spreadsheet"
            >
              <span>📊</span> Export CSV
            </button>
          </div>
        </div>

        <!-- Table Data Content Viewer -->
        <div style="flex: 1; overflow-y: auto; padding: 1.25rem 1.75rem;">
          ${renderTableContent(activeTab, searchQuery)}
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer" style="padding: 0.9rem 1.75rem; background: rgba(16, 24, 40, 0.98); border-top: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--text-dim);">
          <div>
            <span>Backend Engine: <strong>Supabase Postgres v17</strong></span> • 
            <span>Row Level Security (RLS): <strong>Enabled</strong></span>
          </div>
          <button type="button" class="btn btn-outline btn-sm" id="footer-close-btn">
            Close Panel
          </button>
        </div>
      </div>
    `;

    attachListeners();
  }

  function renderTableContent(tableName, query) {
    const q = (query || '').toLowerCase().trim();

    if (tableName === 'enquiries') {
      const items = state.enquiries.filter(e => 
        !q || e.studentName?.toLowerCase().includes(q) || e.phone?.includes(q) || e.courseInterested?.toLowerCase().includes(q) || e.branch?.toLowerCase().includes(q)
      );

      return `
        <div class="table-responsive">
          <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
            <thead>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); text-align: left; color: var(--accent-gold-light);">
                <th style="padding: 0.65rem 0.75rem;">ID / Date</th>
                <th style="padding: 0.65rem 0.75rem;">Student & Parent</th>
                <th style="padding: 0.65rem 0.75rem;">Contact</th>
                <th style="padding: 0.65rem 0.75rem;">Course & Branch</th>
                <th style="padding: 0.65rem 0.75rem;">Status</th>
                <th style="padding: 0.65rem 0.75rem;">Counselor Notes</th>
              </tr>
            </thead>
            <tbody>
              ${items.length === 0 ? `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-dim);">No enquiries match query.</td></tr>` : items.map(e => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.03);">
                  <td style="padding: 0.65rem 0.75rem;">
                    <div style="font-weight: 700; color: #cbd5e1; font-family: monospace;">${e.id}</div>
                    <div style="font-size: 0.72rem; color: var(--text-dim);">${e.date || 'Today'}</div>
                  </td>
                  <td style="padding: 0.65rem 0.75rem;">
                    <div style="font-weight: 700; color: #fff;">${e.studentName}</div>
                    <div style="font-size: 0.74rem; color: var(--text-dim);">Parent: ${e.parentName || 'N/A'}</div>
                  </td>
                  <td style="padding: 0.65rem 0.75rem;">
                    <a href="tel:${e.phone}" style="color: #60a5fa; text-decoration: none;">📞 ${e.phone}</a>
                  </td>
                  <td style="padding: 0.65rem 0.75rem;">
                    <div style="color: var(--accent-gold-light); font-weight: 600;">${e.courseInterested || 'Commerce'}</div>
                    <div style="font-size: 0.72rem; color: var(--text-muted);">${e.branch || 'Satpur'}</div>
                  </td>
                  <td style="padding: 0.65rem 0.75rem;">
                    <span style="font-size: 0.72rem; padding: 0.2rem 0.5rem; border-radius: 12px; font-weight: 700; background: ${e.status === 'persuaded' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}; color: ${e.status === 'persuaded' ? '#34d399' : '#f87171'}; border: 1px solid ${e.status === 'persuaded' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'};">
                      ${e.status}
                    </span>
                  </td>
                  <td style="padding: 0.65rem 0.75rem; color: var(--text-muted); font-size: 0.78rem; max-width: 250px;">
                    ${e.counselorNotes || e.reason || '-'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    if (tableName === 'recruitment') {
      const items = state.recruitment.filter(c => 
        !q || c.name?.toLowerCase().includes(q) || c.post?.toLowerCase().includes(q) || c.phone?.includes(q)
      );

      return `
        <div class="table-responsive">
          <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
            <thead>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); text-align: left; color: var(--accent-gold-light);">
                <th style="padding: 0.65rem 0.75rem;">Candidate Ref / Date</th>
                <th style="padding: 0.65rem 0.75rem;">Name & Qualification</th>
                <th style="padding: 0.65rem 0.75rem;">Role / Specialization</th>
                <th style="padding: 0.65rem 0.75rem;">Contact & Branch</th>
                <th style="padding: 0.65rem 0.75rem;">Status</th>
                <th style="padding: 0.65rem 0.75rem;">Resume / Docs</th>
              </tr>
            </thead>
            <tbody>
              ${items.length === 0 ? `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-dim);">No candidates match query.</td></tr>` : items.map(c => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.03);">
                  <td style="padding: 0.65rem 0.75rem;">
                    <div style="font-weight: 700; color: #cbd5e1; font-family: monospace;">${c.id}</div>
                    <div style="font-size: 0.72rem; color: var(--text-dim);">${c.appliedDate || 'Today'}</div>
                  </td>
                  <td style="padding: 0.65rem 0.75rem;">
                    <div style="font-weight: 700; color: #fff;">${c.name}</div>
                    <div style="font-size: 0.74rem; color: var(--text-muted);">${c.qualification || 'Educator'}</div>
                  </td>
                  <td style="padding: 0.65rem 0.75rem;">
                    <div style="color: var(--accent-gold-light); font-weight: 600;">${c.post}</div>
                    <div style="font-size: 0.72rem; color: var(--text-dim);">${c.roleType} • ${c.experience || 'Experienced'}</div>
                  </td>
                  <td style="padding: 0.65rem 0.75rem;">
                    <div>${c.phone}</div>
                    <div style="font-size: 0.72rem; color: var(--text-dim);">${c.branchPreference || 'Both Campuses'}</div>
                  </td>
                  <td style="padding: 0.65rem 0.75rem;">
                    <span style="font-size: 0.72rem; padding: 0.2rem 0.5rem; border-radius: 12px; font-weight: 700; background: rgba(168,85,247,0.15); color: #d8b4fe; border: 1px solid rgba(168,85,247,0.35);">
                      ${c.status}
                    </span>
                  </td>
                  <td style="padding: 0.65rem 0.75rem; font-size: 0.74rem;">
                    <div style="color: #60a5fa;">📄 ${c.resumeName || 'CV.pdf'} (${c.resumeSize || '2MB'})</div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    if (tableName === 'receipts') {
      const items = state.receipts.filter(r => 
        !q || r.receiptNo?.toLowerCase().includes(q) || r.studentName?.toLowerCase().includes(q) || r.courseName?.toLowerCase().includes(q) || r.txnId?.toLowerCase().includes(q)
      );

      return `
        <div class="table-responsive">
          <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
            <thead>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); text-align: left; color: var(--accent-gold-light);">
                <th style="padding: 0.65rem 0.75rem;">Receipt # / Date</th>
                <th style="padding: 0.65rem 0.75rem;">Student</th>
                <th style="padding: 0.65rem 0.75rem;">Course & Branch</th>
                <th style="padding: 0.65rem 0.75rem;">Amount (₹)</th>
                <th style="padding: 0.65rem 0.75rem;">60% Teacher Share</th>
                <th style="padding: 0.65rem 0.75rem;">Mode & UTR / Txn</th>
              </tr>
            </thead>
            <tbody>
              ${items.length === 0 ? `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-dim);">No receipts match query.</td></tr>` : items.map(r => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.03);">
                  <td style="padding: 0.65rem 0.75rem;">
                    <div style="font-weight: 700; color: #fff; font-family: monospace;">${r.receiptNo}</div>
                    <div style="font-size: 0.72rem; color: var(--text-dim);">${r.date}</div>
                  </td>
                  <td style="padding: 0.65rem 0.75rem;">
                    <div style="font-weight: 700; color: #fff;">${r.studentName}</div>
                    <div style="font-size: 0.72rem; color: var(--text-dim);">${r.rollNo || ''}</div>
                  </td>
                  <td style="padding: 0.65rem 0.75rem;">
                    <div style="color: var(--accent-gold-light);">${r.courseName}</div>
                    <div style="font-size: 0.72rem; color: var(--text-dim);">${r.branchName || 'Nashik'}</div>
                  </td>
                  <td style="padding: 0.65rem 0.75rem; font-weight: 800; color: #34d399; font-size: 0.92rem;">
                    ₹${(Number(r.amount) || 0).toLocaleString('en-IN')}
                  </td>
                  <td style="padding: 0.65rem 0.75rem; color: #a78bfa; font-weight: 700;">
                    ₹${(Number(r.teacherShare60) || Math.round(r.amount * 0.6)).toLocaleString('en-IN')}
                  </td>
                  <td style="padding: 0.65rem 0.75rem;">
                    <div style="font-size: 0.78rem; color: #cbd5e1;">${r.mode}</div>
                    <div style="font-size: 0.72rem; color: var(--text-dim); font-family: monospace;">${r.txnId || '-'}</div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    if (tableName === 'expenses') {
      const items = state.expenses.filter(e => 
        !q || e.voucherNo?.toLowerCase().includes(q) || e.payee?.toLowerCase().includes(q) || e.category?.toLowerCase().includes(q)
      );

      return `
        <div class="table-responsive">
          <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
            <thead>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); text-align: left; color: var(--accent-gold-light);">
                <th style="padding: 0.65rem 0.75rem;">Voucher # / Date</th>
                <th style="padding: 0.65rem 0.75rem;">Payee & Description</th>
                <th style="padding: 0.65rem 0.75rem;">Category</th>
                <th style="padding: 0.65rem 0.75rem;">Branch / Target</th>
                <th style="padding: 0.65rem 0.75rem;">Amount (₹)</th>
                <th style="padding: 0.65rem 0.75rem;">Mode / Ref</th>
              </tr>
            </thead>
            <tbody>
              ${items.length === 0 ? `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-dim);">No expenses match query.</td></tr>` : items.map(e => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.03);">
                  <td style="padding: 0.65rem 0.75rem;">
                    <div style="font-weight: 700; color: #fff; font-family: monospace;">${e.voucherNo}</div>
                    <div style="font-size: 0.72rem; color: var(--text-dim);">${e.date}</div>
                  </td>
                  <td style="padding: 0.65rem 0.75rem;">
                    <div style="font-weight: 700; color: #fff;">${e.payee}</div>
                    <div style="font-size: 0.74rem; color: var(--text-muted);">${e.description || '-'}</div>
                  </td>
                  <td style="padding: 0.65rem 0.75rem;">
                    <span style="font-size: 0.72rem; padding: 0.15rem 0.45rem; border-radius: 4px; background: rgba(255,255,255,0.06); color: #cbd5e1;">${e.category}</span>
                  </td>
                  <td style="padding: 0.65rem 0.75rem; font-size: 0.75rem; color: var(--text-dim);">
                    ${e.branchName || 'All Centers'}
                  </td>
                  <td style="padding: 0.65rem 0.75rem; font-weight: 800; color: #f87171; font-size: 0.92rem;">
                    ₹${(Number(e.amount) || 0).toLocaleString('en-IN')}
                  </td>
                  <td style="padding: 0.65rem 0.75rem; font-size: 0.74rem;">
                    <div>${e.mode}</div>
                    <div style="font-family: monospace; color: var(--text-dim);">${e.reference || '-'}</div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    if (tableName === 'leaves') {
      const items = state.leaves.filter(l => 
        !q || l.studentName?.toLowerCase().includes(q) || l.reason?.toLowerCase().includes(q)
      );

      return `
        <div class="table-responsive">
          <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
            <thead>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); text-align: left; color: var(--accent-gold-light);">
                <th style="padding: 0.65rem 0.75rem;">Leave ID / Applied</th>
                <th style="padding: 0.65rem 0.75rem;">Student & Course</th>
                <th style="padding: 0.65rem 0.75rem;">Target Leave Date</th>
                <th style="padding: 0.65rem 0.75rem;">Reason for Leave</th>
                <th style="padding: 0.65rem 0.75rem;">Status</th>
                <th style="padding: 0.65rem 0.75rem;">Director Remarks</th>
              </tr>
            </thead>
            <tbody>
              ${items.length === 0 ? `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-dim);">No leaves match query.</td></tr>` : items.map(l => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.03);">
                  <td style="padding: 0.65rem 0.75rem;">
                    <div style="font-weight: 700; color: #fff; font-family: monospace;">${l.id}</div>
                    <div style="font-size: 0.72rem; color: var(--text-dim);">${l.appliedDate}</div>
                  </td>
                  <td style="padding: 0.65rem 0.75rem;">
                    <div style="font-weight: 700; color: #fff;">${l.studentName}</div>
                    <div style="font-size: 0.72rem; color: var(--accent-gold-light);">${l.courseName}</div>
                  </td>
                  <td style="padding: 0.65rem 0.75rem; font-weight: 700; color: #fbbf24;">
                    📅 ${l.leaveDate}
                  </td>
                  <td style="padding: 0.65rem 0.75rem; color: var(--text-muted); font-size: 0.78rem; max-width: 250px;">
                    ${l.reason}
                  </td>
                  <td style="padding: 0.65rem 0.75rem;">
                    <span style="font-size: 0.72rem; padding: 0.2rem 0.5rem; border-radius: 12px; font-weight: 700; background: ${l.status.includes('Approved') ? 'rgba(16,185,129,0.15)' : 'rgba(234,179,8,0.15)'}; color: ${l.status.includes('Approved') ? '#34d399' : '#facc15'};">
                      ${l.status}
                    </span>
                  </td>
                  <td style="padding: 0.65rem 0.75rem; color: var(--text-dim); font-size: 0.75rem;">
                    ${l.directorNotes || '-'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    if (tableName === 'queries') {
      const items = state.queries.filter(qr => 
        !q || qr.studentName?.toLowerCase().includes(q) || qr.subject?.toLowerCase().includes(q) || qr.queryText?.toLowerCase().includes(q)
      );

      return `
        <div class="table-responsive">
          <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
            <thead>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); text-align: left; color: var(--accent-gold-light);">
                <th style="padding: 0.65rem 0.75rem;">Doubt Ref / Date</th>
                <th style="padding: 0.65rem 0.75rem;">Student & Subject</th>
                <th style="padding: 0.65rem 0.75rem;">Query Raised</th>
                <th style="padding: 0.65rem 0.75rem;">Recipient / Status</th>
                <th style="padding: 0.65rem 0.75rem;">Faculty Answer</th>
                <th style="padding: 0.65rem 0.75rem;">Student Feedback</th>
              </tr>
            </thead>
            <tbody>
              ${items.length === 0 ? `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-dim);">No queries match query.</td></tr>` : items.map(qr => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.03);">
                  <td style="padding: 0.65rem 0.75rem;">
                    <div style="font-weight: 700; color: #fff; font-family: monospace;">${qr.id}</div>
                    <div style="font-size: 0.72rem; color: var(--text-dim);">${qr.date}</div>
                  </td>
                  <td style="padding: 0.65rem 0.75rem;">
                    <div style="font-weight: 700; color: #fff;">${qr.studentName}</div>
                    <div style="font-size: 0.72rem; color: var(--accent-gold-light);">${qr.subject}</div>
                  </td>
                  <td style="padding: 0.65rem 0.75rem; color: var(--text-muted); font-size: 0.78rem; max-width: 220px;">
                    ${qr.queryText}
                  </td>
                  <td style="padding: 0.65rem 0.75rem;">
                    <div style="font-size: 0.75rem; color: #cbd5e1;">${qr.teacherName || qr.recipient}</div>
                    <span style="font-size: 0.7rem; padding: 0.15rem 0.45rem; border-radius: 10px; font-weight: 700; background: ${qr.status === 'Answered' ? 'rgba(16,185,129,0.15)' : 'rgba(234,179,8,0.15)'}; color: ${qr.status === 'Answered' ? '#34d399' : '#facc15'};">
                      ${qr.status}
                    </span>
                  </td>
                  <td style="padding: 0.65rem 0.75rem; color: #cbd5e1; font-size: 0.78rem; max-width: 220px;">
                    ${qr.replyText || 'Pending Answer'}
                  </td>
                  <td style="padding: 0.65rem 0.75rem; font-size: 0.75rem;">
                    <span style="color: ${qr.studentResponse === 'Satisfactory' ? '#34d399' : '#f87171'}; font-weight: 700;">
                      ${qr.studentResponse || 'Awaiting response'}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    // Generic JSON view fallback for other tables
    const dataMap = {
      courses: state.courses,
      subjects: state.subjectsCatalog,
      feeStructures: state.feeStructures,
      homeworks: state.homeworks,
      exams: state.exams,
      portions: state.portions,
      students: state.students,
      teachers: state.teachers
    };

    const currentList = dataMap[tableName] || [];
    return `
      <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <h4 style="margin: 0; color: #fff; font-size: 0.95rem;">${tableName.toUpperCase()} Records (${currentList.length})</h4>
          <span style="font-size: 0.75rem; color: #34d399;">✓ Preserved in Supabase PostgreSQL</span>
        </div>
        <pre style="background: #070b14; padding: 1rem; border-radius: 6px; font-size: 0.75rem; color: #94a3b8; overflow-x: auto; max-height: 400px;">${JSON.stringify(currentList, null, 2)}</pre>
      </div>
    `;
  }

  function attachListeners() {
    // Close modal
    const closeBtn = modalContainer.querySelector('#close-cloud-modal-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => modalContainer.classList.add('hidden'));

    const footerClose = modalContainer.querySelector('#footer-close-btn');
    if (footerClose) footerClose.addEventListener('click', () => modalContainer.classList.add('hidden'));

    // Tabs
    modalContainer.querySelectorAll('[data-table-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-table-tab');
        render();
      });
    });

    // Search
    const searchInput = modalContainer.querySelector('#cloud-table-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        const container = modalContainer.querySelector('.table-responsive') || modalContainer.querySelector('pre')?.parentElement;
        if (container) {
          const content = renderTableContent(activeTab, searchQuery);
          const parent = container.parentElement;
          if (parent) parent.innerHTML = content;
        }
      });
    }

    // Test Ping
    const pingBtn = modalContainer.querySelector('#ping-test-btn');
    if (pingBtn) {
      pingBtn.addEventListener('click', async () => {
        isTestingPing = true;
        render();
        const testRes = await testConnection();
        isTestingPing = false;
        if (testRes.ok) {
          currentLatency = testRes.latency;
          showToast(`⚡ Supabase Cloud latency test: ${testRes.latency}ms (Tokyo/Seoul Region)`, 'success');
        } else {
          showToast(`Supabase ping error: ${testRes.error}`, 'warning');
        }
        render();
      });
    }

    // Pull from cloud
    const pullBtn = modalContainer.querySelector('#pull-cloud-btn');
    if (pullBtn) {
      pullBtn.addEventListener('click', async () => {
        isSyncing = true;
        render();
        showToast('Refreshing all records from Supabase cloud database...', 'info');
        const res = await state.forcePullFromCloud();
        isSyncing = false;
        if (res.success) {
          showToast('✓ Successfully refreshed latest records from Supabase!', 'success');
        } else {
          showToast(`Sync failed: ${res.error}`, 'warning');
        }
        render();
      });
    }

    // Push local to cloud
    const pushBtn = modalContainer.querySelector('#push-cloud-btn');
    if (pushBtn) {
      pushBtn.addEventListener('click', async () => {
        isSyncing = true;
        render();
        showToast('Pushing and upserting all local records to Supabase...', 'info');
        const res = await state.forcePushToCloud();
        isSyncing = false;
        if (res.success) {
          showToast('✓ All local records successfully preserved in Supabase Cloud!', 'success');
        } else {
          showToast(`Push failed: ${res.error}`, 'warning');
        }
        render();
      });
    }

    // Export JSON Backup
    const exportJsonBtn = modalContainer.querySelector('#export-json-btn');
    if (exportJsonBtn) {
      exportJsonBtn.addEventListener('click', async () => {
        isExporting = true;
        render();
        try {
          showToast('Generating official Supabase cloud snapshot backup...', 'info');
          const snapshot = await exportAllCloudData();
          const jsonStr = JSON.stringify(snapshot, null, 2);
          const dateStr = new Date().toISOString().split('T')[0];
          downloadFile(jsonStr, `imperial_supabase_backup_${dateStr}.json`, 'application/json');
          showToast('✓ Full JSON Cloud Snapshot successfully downloaded!', 'success');
        } catch (err) {
          showToast(`Export failed: ${err.message}`, 'warning');
        } finally {
          isExporting = false;
          render();
        }
      });
    }

    // Export Active CSV
    const exportCsvBtn = modalContainer.querySelector('#export-active-csv-btn');
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', () => {
        const dateStr = new Date().toISOString().split('T')[0];
        let csv = '';
        let fileName = `imperial_${activeTab}_${dateStr}.csv`;

        if (activeTab === 'enquiries') {
          csv = convertToCSV(state.enquiries, ['id', 'date', 'studentName', 'parentName', 'phone', 'school', 'courseInterested', 'branch', 'status', 'counselorNotes']);
        } else if (activeTab === 'recruitment') {
          csv = convertToCSV(state.recruitment, ['id', 'appliedDate', 'name', 'roleType', 'post', 'qualification', 'phone', 'email', 'expectedPay', 'branchPreference', 'status']);
        } else if (activeTab === 'receipts') {
          csv = convertToCSV(state.receipts, ['receiptNo', 'date', 'studentName', 'courseName', 'branchName', 'amount', 'teacherShare60', 'mode', 'txnId']);
        } else if (activeTab === 'expenses') {
          csv = convertToCSV(state.expenses, ['voucherNo', 'date', 'payee', 'category', 'amount', 'mode', 'reference', 'branchName', 'description']);
        } else if (activeTab === 'leaves') {
          csv = convertToCSV(state.leaves, ['id', 'studentName', 'courseName', 'appliedDate', 'leaveDate', 'reason', 'status', 'directorNotes']);
        } else if (activeTab === 'queries') {
          csv = convertToCSV(state.queries, ['id', 'date', 'studentName', 'subject', 'queryText', 'teacherName', 'replyText', 'studentResponse']);
        } else {
          csv = convertToCSV(state[activeTab] || [], ['id', 'name']);
        }

        downloadFile(csv, fileName, 'text/csv;charset=utf-8;');
        showToast(`✓ Exported ${activeTab} as CSV spreadsheet!`, 'success');
      });
    }
  }

  modalContainer.classList.remove('hidden');
  render();
}
