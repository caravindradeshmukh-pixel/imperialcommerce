/* Imperial Commerce Tutorials - Parent Portal
   Comprehensive Academic & Guardian Dashboard with Official Bank UPI QR Code & Multi-Gateway Fee Payment Desk */

import { state } from '../state.js';
import { openQRPayModal } from './qrPayModal.js';
import { openReceiptModal } from './receiptModal.js';

export function renderParentPortal(container, showToast) {
  const modalContainer = document.getElementById('modal-container');

  function render() {
    const currentWardId = state.currentParentStudentId || 's1';
    const ward = state.students.find(s => s.id === currentWardId) || state.students[0];
    const portions = state.portions.filter(p => !p.courseId || p.courseId === ward.courseId);
    const homeworks = state.homeworks.filter(h => !h.courseId || h.courseId === ward.courseId);

    container.innerHTML = `
      <div class="parent-portal-wrapper" style="max-width: 1440px; margin: 0 auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- Top Parent Banner -->
        <div class="card" style="margin-bottom: 0; background: linear-gradient(135deg, rgba(19, 29, 49, 0.95), rgba(13, 21, 39, 0.95)); border: 1px solid var(--border-gold); padding: 1.25rem 1.75rem; border-radius: var(--radius-lg); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 56px; height: 56px; border-radius: 14px; background: linear-gradient(135deg, #f59e0b, #d97706); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: #070b14; font-weight: 800; box-shadow: 0 4px 20px rgba(245,158,11,0.3);">
              👨‍👩‍👧
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <h2 style="font-size: 1.4rem; color: #fff; margin: 0;">${ward.parentName || 'Rajesh Sharma'}</h2>
                <span class="status-badge" style="background: rgba(245,158,11,0.2); color: #fbbf24; border: 1px solid rgba(245,158,11,0.4); font-size: 0.75rem; padding: 0.2rem 0.6rem;">
                  Verified Parent / Guardian
                </span>
              </div>
              <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">
                Monitoring Ward: <strong style="color: #fff;">${ward.name}</strong> (${ward.courseName}) • Roll #${ward.rollNo}
              </div>
            </div>
          </div>

          <!-- Ward Selector Dropdown -->
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span style="font-size: 0.8rem; color: var(--text-dim);">Switch Ward:</span>
            <select id="parent-ward-select" style="padding: 0.45rem 0.75rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.82rem; cursor: pointer;">
              ${state.students.map(s => `
                <option value="${s.id}" ${s.id === ward.id ? 'selected' : ''}>
                  ${s.name} (${s.courseName}) - Dues: ₹${s.dueFees.toLocaleString()}
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- KPI Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
          <!-- Attendance Badge -->
          <div class="card" style="padding: 1.25rem; border: 1px solid rgba(16,185,129,0.3); background: rgba(16,185,129,0.06); border-radius: 8px;">
            <div style="font-size: 0.8rem; text-transform: uppercase; color: #34d399; font-weight: 700;">Today's Classroom Attendance</div>
            <div style="font-size: 1.8rem; font-weight: 800; color: ${ward.todayAttendance === 'Present' ? '#34d399' : '#f87171'}; margin: 0.35rem 0;">
              ${ward.todayAttendance === 'Present' ? '✓ PRESENT' : '✕ ABSENT'}
            </div>
            <div style="font-size: 0.75rem; color: #6ee7b7;">Overall Term Attendance: ${ward.attendancePercent}%</div>
          </div>

          <!-- Homework Status -->
          <div class="card" style="padding: 1.25rem; border: 1px solid rgba(37,99,235,0.3); background: rgba(37,99,235,0.06); border-radius: 8px;">
            <div style="font-size: 0.8rem; text-transform: uppercase; color: #60a5fa; font-weight: 700;">Homework Verification</div>
            <div style="font-size: 1.8rem; font-weight: 800; color: #60a5fa; margin: 0.35rem 0;">
              ${ward.homeworkCompleted ? '✓ CHECKED' : '⚠️ PENDING'}
            </div>
            <div style="font-size: 0.75rem; color: #93c5fd;">Daily notebook verification by faculty</div>
          </div>

          <!-- Fee Status & Direct Pay Button -->
          <div class="card" style="padding: 1.25rem; border: 1px solid var(--border-gold); background: rgba(207,168,78,0.08); border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent-gold); font-weight: 700;">Tuition Fee Balance</div>
              <span style="font-size: 0.72rem; color: var(--text-dim);">Total: ₹${ward.totalFees.toLocaleString()}</span>
            </div>
            <div style="font-size: 1.8rem; font-weight: 800; color: ${ward.dueFees > 0 ? '#f87171' : '#34d399'}; margin: 0.35rem 0;">
              ₹${ward.dueFees.toLocaleString()}
            </div>
            <button id="parent-pay-top-btn" class="btn btn-primary" style="padding: 0.45rem 0.85rem; font-size: 0.82rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 800; border: none; border-radius: 5px; cursor: pointer; width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.4rem; box-shadow: 0 2px 10px rgba(207,168,78,0.25);">
              <span>💳</span> Pay Fees
            </button>
          </div>

          <!-- Direct Helpdesk WhatsApp -->
          <div class="card" style="padding: 1.25rem; border: 1px solid rgba(37,211,102,0.3); background: rgba(37,211,102,0.06); border-radius: 8px;">
            <div style="font-size: 0.8rem; text-transform: uppercase; color: #25D366; font-weight: 700;">Imperial Helpdesk</div>
            <div style="font-size: 0.82rem; color: #cbd5e1; margin: 0.4rem 0;">
              Satpur: +91 93707 28283<br>
              Gangapur Rd: +91 96996 57599
            </div>
            <a 
              href="https://api.whatsapp.com/send?phone=919370728283&text=${encodeURIComponent(`Hello Director Sir, this is ${ward.parentName}, parent of ${ward.name} (${ward.courseName}). I would like to schedule an academic counseling discussion.`)}" 
              target="_blank" 
              style="display: block; text-align: center; padding: 0.4rem; background: #25D366; color: #070b14; font-weight: 700; border-radius: 4px; font-size: 0.75rem; text-decoration: none;"
            >
              📲 Connect with Director
            </a>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- PROMINENT DESK: OFFICIAL FEE PAYMENT DESK & BANK UPI QR CODE             -->
        <!-- ========================================================================= -->
        <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-gold); background: linear-gradient(135deg, rgba(207, 168, 78, 0.09), rgba(13, 21, 39, 0.98)); border-radius: var(--radius-md); box-shadow: var(--shadow-md);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.85rem;">
            <div>
              <h3 style="font-size: 1.25rem; color: #fff; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                <span>💳</span> Official Fee Payment Desk & Bank UPI QR Code
              </h3>
              <div style="font-size: 0.82rem; color: var(--accent-gold-light); margin-top: 0.25rem;">
                Scan the institute QR code directly or click "Pay Fees" to checkout via PhonePe, Google Pay, Netbanking or Cards. Instant computerized receipt generated upon payment.
              </div>
            </div>
            <div style="display: flex; gap: 0.4rem; align-items: center;">
              <span style="font-size: 0.75rem; background: rgba(16,185,129,0.2); color: #34d399; border: 1px solid rgba(16,185,129,0.4); padding: 0.2rem 0.65rem; border-radius: 20px; font-weight: 700;">
                ✓ ICICI Bank Merchant Verified
              </span>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 240px 1fr; gap: 1.5rem; align-items: center;">
            <!-- Left: User-Provided PhonePe QR Code Card -->
            <div style="background: #ffffff; padding: 1rem; border-radius: 12px; text-align: center; box-shadow: 0 4px 25px rgba(0,0,0,0.6); max-width: 240px;">
              <img 
                src="/phonepe_qr.png" 
                alt="PhonePe Accepted Here QR Code" 
                style="width: 100%; height: auto; display: block; border-radius: 6px;"
              />
              <div style="color: #0f172a; margin-top: 0.5rem; font-size: 0.8rem; font-weight: 800;">
                IMPERIAL COMMERCE TUTORIALS
              </div>
              <div style="color: #475569; font-size: 0.72rem; font-family: monospace; font-weight: 700;">
                UPI ID: imperialcommerce@icici
              </div>
              <div style="font-size: 0.7rem; color: #5f259f; font-weight: 800; margin-top: 0.2rem;">
                पे PhonePe Accepted Here • Scan or Click Pay
              </div>
            </div>

            <!-- Right: Fee Status Ledger & Main "Pay Fees" Button -->
            <div>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin-bottom: 1.15rem;">
                <div style="padding: 0.75rem 1rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); border-radius: 8px;">
                  <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Total Course Fee:</div>
                  <div style="font-size: 1.35rem; font-weight: 800; color: #fff; margin-top: 0.15rem;">₹${(ward.totalFees || 35000).toLocaleString('en-IN')}</div>
                </div>

                <div style="padding: 0.75rem 1rem; background: rgba(16,185,129,0.06); border: 1px solid rgba(16,185,129,0.3); border-radius: 8px;">
                  <div style="font-size: 0.72rem; color: #34d399; text-transform: uppercase; font-weight: 700;">Total Fees Paid:</div>
                  <div style="font-size: 1.35rem; font-weight: 800; color: #34d399; margin-top: 0.15rem;">₹${(ward.paidFees || 0).toLocaleString('en-IN')}</div>
                </div>

                <div style="padding: 0.75rem 1rem; background: ${ward.dueFees > 0 ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)'}; border: 1px solid ${ward.dueFees > 0 ? 'rgba(239,68,68,0.35)' : 'rgba(16,185,129,0.35)'}; border-radius: 8px;">
                  <div style="font-size: 0.72rem; color: ${ward.dueFees > 0 ? '#f87171' : '#34d399'}; text-transform: uppercase; font-weight: 700;">Current Due Status:</div>
                  <div style="font-size: 1.35rem; font-weight: 800; color: ${ward.dueFees > 0 ? '#f87171' : '#34d399'}; margin-top: 0.15rem;">
                    ${ward.dueFees > 0 ? `₹${ward.dueFees.toLocaleString('en-IN')}` : '✓ Fully Cleared'}
                  </div>
                </div>
              </div>

              <!-- Integrated Payment Portals Supported -->
              <div style="margin-bottom: 1.15rem;">
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.4rem; font-weight: 600;">
                  Supported Payment Portals:
                </div>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                  <span style="font-size: 0.75rem; background: rgba(168,85,247,0.18); color: #d8b4fe; border: 1px solid rgba(168,85,247,0.35); padding: 0.25rem 0.65rem; border-radius: 6px; font-weight: 700; display: inline-flex; align-items: center; gap: 0.3rem;">
                    🟣 PhonePe
                  </span>
                  <span style="font-size: 0.75rem; background: rgba(59,130,246,0.18); color: #93c5fd; border: 1px solid rgba(59,130,246,0.35); padding: 0.25rem 0.65rem; border-radius: 6px; font-weight: 700; display: inline-flex; align-items: center; gap: 0.3rem;">
                    🔵 Google Pay
                  </span>
                  <span style="font-size: 0.75rem; background: rgba(16,185,129,0.18); color: #6ee7b7; border: 1px solid rgba(16,185,129,0.35); padding: 0.25rem 0.65rem; border-radius: 6px; font-weight: 700; display: inline-flex; align-items: center; gap: 0.3rem;">
                    🏛️ Netbanking (HDFC, SBI, ICICI & 50+ Banks)
                  </span>
                  <span style="font-size: 0.75rem; background: rgba(207,168,78,0.18); color: var(--accent-gold-light); border: 1px solid rgba(207,168,78,0.35); padding: 0.25rem 0.65rem; border-radius: 6px; font-weight: 700; display: inline-flex; align-items: center; gap: 0.3rem;">
                    📱 Bank UPI QR
                  </span>
                </div>
              </div>

              <!-- Main "Pay Fees" Button -->
              <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
                <button 
                  id="parent-main-pay-btn" 
                  class="btn btn-gold" 
                  style="padding: 0.8rem 1.85rem; font-size: 0.95rem; font-weight: 800; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; border: none; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 4px 18px rgba(207,168,78,0.3);"
                >
                  <span>💳</span> Pay Fees (PhonePe / GPay / Netbanking / QR) →
                </button>

                <span style="font-size: 0.75rem; color: var(--text-dim);">
                  *Auto-generates official receipt & updates teacher's 60% fee share ledger in real-time
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Section: Behavioral Remarks by Parents and Teacher -->
        <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
          <h3 style="font-size: 1.15rem; color: #fff; margin-bottom: 1rem;">Behavioral Remarks & Holistic Development</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div style="padding: 1rem; background: rgba(207,168,78,0.06); border: 1px solid var(--border-gold); border-radius: 8px;">
              <div style="font-size: 0.85rem; font-weight: 700; color: var(--accent-gold); margin-bottom: 0.4rem;">
                👨‍🏫 Faculty Feedback (${ward.assignedTeacher || 'Prof. Arvind Deshpande (CA)'})
              </div>
              <div style="font-size: 0.85rem; color: #e2e8f0; font-style: italic; line-height: 1.5;">
                "${ward.behaviourRemarks ? ward.behaviourRemarks.teacher : 'Attentive during lecture drills and solves questions with precision.'}"
              </div>
            </div>
            <div style="padding: 1rem; background: rgba(37,99,235,0.06); border: 1px solid var(--border-accent); border-radius: 8px;">
              <div style="font-size: 0.85rem; font-weight: 700; color: #93c5fd; margin-bottom: 0.4rem;">
                👨‍👩‍👧 Registered Parent Feedback
              </div>
              <div style="font-size: 0.85rem; color: #e2e8f0; font-style: italic; line-height: 1.5;">
                "${ward.behaviourRemarks ? ward.behaviourRemarks.parent : 'Maintains disciplined study routine of 3 hours every day.'}"
              </div>
            </div>
          </div>
        </div>

        <!-- Section: Multi-Term Performance Breakdown (Weekly, Quarterly, Six Monthly) -->
        <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
          <h3 style="font-size: 1.15rem; color: #fff; margin-bottom: 0.4rem;">Multi-Term Assessment Scorecards</h3>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">
            Separate performance evaluation for Weekly tests, Quarterly terminals, and Six-Monthly pre-boards
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
            <div style="padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); border-radius: 8px;">
              <div style="font-weight: 700; color: #34d399; margin-bottom: 0.5rem; font-size: 0.95rem;">📅 Weekly Saturday Tests</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: #fff;">49 / 50</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">Subject: Accounts • Status: Distinction</div>
            </div>

            <div style="padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); border-radius: 8px;">
              <div style="font-weight: 700; color: var(--accent-gold-light); margin-bottom: 0.5rem; font-size: 0.95rem;">📊 Quarterly Terminal Exam</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: #fff;">95 / 100</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">Board Format Simulation • Rank #1</div>
            </div>

            <div style="padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); border-radius: 8px;">
              <div style="font-weight: 700; color: #60a5fa; margin-bottom: 0.5rem; font-size: 0.95rem;">🏆 Six-Monthly Pre-Board Benchmark</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: #fff;">96 / 100</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">Full Course Assessment • Merit Badge</div>
            </div>
          </div>
        </div>

        <!-- Section: Portion Covered in Lectures -->
        <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
          <h3 style="font-size: 1.15rem; color: #fff; margin-bottom: 1rem;">Daily Portion Covered in Today's Lectures</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${portions.map(p => `
              <div style="padding: 0.85rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); border-radius: 6px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                  <span style="font-weight: 700; color: #fff;">${p.subject} (by ${p.teacher})</span>
                  <span style="font-size: 0.75rem; color: var(--text-dim);">${p.date}</span>
                </div>
                <div style="font-size: 0.82rem; color: #cbd5e1; margin-bottom: 0.25rem;">
                  ${p.topicCovered}
                </div>
                <div style="font-size: 0.75rem; color: #34d399;">
                  Next Topic: ${p.nextLectureTopic} • ${p.completionPercent}% Completed
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section: Official Fee Payment Receipts -->
        <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
            <div>
              <h3 style="font-size: 1.15rem; color: #fff; margin: 0;">Official Fee Payment Receipts</h3>
              <div style="font-size: 0.78rem; color: var(--text-muted);">
                Real-time computerized tax invoices & fee collection vouchers
              </div>
            </div>
            <span style="font-size: 0.75rem; background: rgba(207,168,78,0.15); color: var(--accent-gold-light); padding: 0.2rem 0.6rem; border-radius: 20px; font-weight: 700;">
              ${state.receipts.filter(r => r.studentId === ward.id).length} Generated Receipts
            </span>
          </div>

          <div style="overflow-x: auto;">
            <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
              <thead>
                <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
                  <th style="padding: 0.65rem;">Receipt No</th>
                  <th style="padding: 0.65rem;">Date</th>
                  <th style="padding: 0.65rem;">Amount</th>
                  <th style="padding: 0.65rem;">Payment Mode</th>
                  <th style="padding: 0.65rem;">Txn / UTR Reference</th>
                  <th style="padding: 0.65rem; text-align: right;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${state.receipts.filter(r => r.studentId === ward.id).map(r => `
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 0.65rem; font-family: monospace; font-weight: 700; color: var(--accent-gold);">${r.receiptNo}</td>
                    <td style="padding: 0.65rem; color: var(--text-muted);">${r.date}</td>
                    <td style="padding: 0.65rem; font-weight: 800; color: #34d399;">₹${r.amount.toLocaleString('en-IN')}</td>
                    <td style="padding: 0.65rem; font-size: 0.8rem; color: #cbd5e1;">${r.mode}</td>
                    <td style="padding: 0.65rem; font-family: monospace; font-size: 0.75rem; color: var(--text-dim);">${r.txnId || 'UPI-OFFICIAL-TXN'}</td>
                    <td style="padding: 0.65rem; text-align: right;">
                      <button class="parent-view-rec-btn" data-receipt-no="${r.receiptNo}" style="padding: 0.35rem 0.75rem; background: rgba(207,168,78,0.15); border: 1px solid rgba(207,168,78,0.35); border-radius: 5px; color: var(--accent-gold-light); font-size: 0.75rem; font-weight: 700; cursor: pointer;">
                        📄 View & Print
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // Attach event listeners
    const wardSelect = container.querySelector('#parent-ward-select');
    if (wardSelect) {
      wardSelect.addEventListener('change', () => {
        state.setStudentWard(wardSelect.value);
        render();
      });
    }

    const payTopBtn = container.querySelector('#parent-pay-top-btn');
    if (payTopBtn) {
      payTopBtn.addEventListener('click', () => {
        openQRPayModal(ward, modalContainer, showToast, () => render());
      });
    }

    const payMainBtn = container.querySelector('#parent-main-pay-btn');
    if (payMainBtn) {
      payMainBtn.addEventListener('click', () => {
        openQRPayModal(ward, modalContainer, showToast, () => render());
      });
    }

    container.querySelectorAll('.parent-view-rec-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const recNo = btn.getAttribute('data-receipt-no');
        const rec = state.receipts.find(r => r.receiptNo === recNo);
        if (rec) openReceiptModal(rec, modalContainer);
      });
    });
  }

  render();
}
