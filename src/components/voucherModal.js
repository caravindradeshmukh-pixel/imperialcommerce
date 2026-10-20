/* Official Printable Payment Voucher Modal for Expenditures */

export function openVoucherModal(expense, modalContainer) {
  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 650px; background: transparent; border: none; box-shadow: none;">
      <div class="receipt-paper" style="border-left: 6px solid #4f46e5;">
        <div class="receipt-watermark" style="color: rgba(79, 70, 229, 0.04);">VOUCHER</div>

        <div class="receipt-header">
          <div>
            <div class="receipt-institute-name">IMPERIAL COMMERCE TUTORIALS</div>
            <div class="receipt-institute-sub">FINANCE & ACCOUNTS DEPARTMENT • NASHIK</div>
          </div>
          <div class="receipt-badge-title" style="background: #0f172a;">
            PAYMENT VOUCHER
          </div>
        </div>

        <div class="receipt-meta-grid">
          <div class="receipt-meta-item">
            <strong>Voucher No:</strong> <span style="font-family: monospace; font-weight: 700;">${expense.voucherNo}</span>
          </div>
          <div class="receipt-meta-item" style="text-align: right;">
            <strong>Date:</strong> ${expense.date}
          </div>
          <div class="receipt-meta-item">
            <strong>Paid To:</strong> <span style="font-weight: 700;">${expense.payee}</span>
          </div>
          <div class="receipt-meta-item" style="text-align: right;">
            <strong>Category:</strong> <span class="badge badge-primary">${expense.category}</span>
          </div>
          <div class="receipt-meta-item" style="grid-column: span 2; background: rgba(79, 70, 229, 0.05); border: 1px solid rgba(79, 70, 229, 0.2); padding: 0.55rem 0.85rem; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.35rem;">
            <div>
              <strong style="color: #4338ca;">Incurred Branch / Center:</strong>
              <span style="font-weight: 800; color: ${expense.branchId === 'b1' ? '#2563eb' : expense.branchId === 'b2' ? '#059669' : '#d97706'}; margin-left: 0.35rem;">
                ${expense.branchName || (expense.branchId === 'b1' ? 'Branch 1: Satpur Colony Center' : expense.branchId === 'b2' ? 'Branch 2: Gangapur Road Center' : 'All Branches (Shared Overheads)')}
              </span>
            </div>
            <div style="font-size: 0.74rem; color: #64748b; font-weight: 600;">
              ${expense.branchId === 'b1' ? '📍 Near Saptashrungi Mandir, Satpur' : expense.branchId === 'b2' ? '📍 Jehan Circle, Bramhecha Estate, Gangapur Rd' : '📍 Allocated in Proportion to Students (Satpur 41.2% / Gangapur 58.8%)'}
            </div>
          </div>
          <div class="receipt-meta-item" style="grid-column: span 2;">
            <strong>Payment Mode:</strong> ${expense.mode} | <strong>Ref/Txn:</strong> ${expense.reference}
          </div>
        </div>

        <table class="receipt-items-table">
          <thead>
            <tr>
              <th style="width: 70%;">Particulars / Expenditure Description</th>
              <th style="text-align: right;">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>${expense.description}</strong><br>
                <small style="color: #64748b;">Cost Center: <strong>${expense.branchName || 'Imperial Commerce Tutorials'}</strong> • Debited to Imperial Academy Institutional Account (${expense.isCommon ? 'Common Overhead Scheme' : 'Direct Center Expense'})</small>
              </td>
              <td style="text-align: right; font-weight: 700; font-size: 1.1rem; color: #4338ca;">
                ₹${expense.amount.toLocaleString('en-IN')}
              </td>
            </tr>
            <tr class="receipt-total-row">
              <td style="text-align: right;">Total Disbursed:</td>
              <td style="text-align: right; color: #1e1b4b; font-size: 1.15rem;">₹${expense.amount.toLocaleString('en-IN')}</td>
            </tr>
          </tbody>
        </table>

        <div class="receipt-signatures" style="margin-top: 3rem;">
          <div style="text-align: center;">
            <div style="border-top: 1px dashed #64748b; width: 140px; padding-top: 0.35rem; font-size: 0.8rem; font-weight: 600;">
              Prepared By (Accounts)
            </div>
          </div>
          <div style="text-align: center;">
            <div style="border-top: 1px dashed #64748b; width: 140px; padding-top: 0.35rem; font-size: 0.8rem; font-weight: 600;">
              Receiver’s Signature
            </div>
          </div>
          <div style="text-align: center;">
            <div style="border-top: 1px solid #1e1b4b; width: 150px; padding-top: 0.35rem; font-size: 0.8rem; font-weight: 700; color: #1e1b4b;">
              Director Approval Stamp
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 1rem; display: flex; justify-content: flex-end; gap: 0.75rem;">
        <button class="btn btn-outline" id="close-voucher-modal-btn">Close</button>
        <button class="btn btn-primary" id="print-voucher-btn">
          🖨️ Print Voucher
        </button>
      </div>
    </div>
  `;

  modalContainer.classList.remove('hidden');

  modalContainer.querySelector('#close-voucher-modal-btn').addEventListener('click', () => {
    modalContainer.classList.add('hidden');
  });

  modalContainer.querySelector('#print-voucher-btn').addEventListener('click', () => {
    window.print();
  });
}
