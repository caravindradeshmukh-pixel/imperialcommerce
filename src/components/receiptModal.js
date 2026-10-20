/* Official Printable Fee Receipt Modal */

function numberToWordsINR(amount) {
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return '';
    let str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str.trim();
  }
  return inWords(Math.floor(amount)) + ' Rupees Only';
}

export function openReceiptModal(receipt, modalContainer) {
  const words = numberToWordsINR(receipt.amount);

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 680px; background: transparent; border: none; box-shadow: none;">
      <div class="receipt-paper">
        <div class="receipt-watermark">IMPERIAL</div>
        
        <!-- Header -->
        <div class="receipt-header">
          <div>
            <div class="receipt-institute-name">IMPERIAL COMMERCE TUTORIALS</div>
            <div class="receipt-institute-sub">Premier Coaching for 11th, 12th Commerce, CA, CMA, CS & IGCSE</div>
            <div class="receipt-institute-sub">Branch 1: Satpur Colony (422007) | Branch 2: Gangapur Road (422013), Nashik</div>
          </div>
          <div class="receipt-badge-title">
            OFFICIAL FEE RECEIPT
          </div>
        </div>

        <!-- Meta Details -->
        <div class="receipt-meta-grid">
          <div class="receipt-meta-item">
            <strong>Receipt No:</strong> <span style="font-family: monospace; font-weight: 700;">${receipt.receiptNo}</span>
          </div>
          <div class="receipt-meta-item" style="text-align: right;">
            <strong>Date:</strong> ${receipt.date}
          </div>
          <div class="receipt-meta-item">
            <strong>Student Name:</strong> <span style="font-weight: 700;">${receipt.studentName}</span>
          </div>
          <div class="receipt-meta-item" style="text-align: right;">
            <strong>Roll No:</strong> <span style="font-weight: 600;">${receipt.rollNo}</span>
          </div>
          <div class="receipt-meta-item" style="grid-column: span 2;">
            <strong>Course Enrolled:</strong> ${receipt.courseName}
          </div>
        </div>

        <!-- Itemized Breakdown Table -->
        <table class="receipt-items-table">
          <thead>
            <tr>
              <th style="width: 10%;">#</th>
              <th>Description / Particulars</th>
              <th style="width: 25%; text-align: right;">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <strong>Academic Tuition & Coaching Fee</strong><br>
                <small style="color: #64748b;">Includes lecture notes, test series, & portal access</small>
              </td>
              <td style="text-align: right; font-weight: 600;">₹${receipt.amount.toLocaleString('en-IN')}</td>
            </tr>
            <tr class="receipt-total-row">
              <td colspan="2" style="text-align: right;">Total Amount Received:</td>
              <td style="text-align: right; color: #1e1b4b; font-size: 1.1rem;">₹${receipt.amount.toLocaleString('en-IN')}</td>
            </tr>
          </tbody>
        </table>

        <!-- Amount In Words -->
        <div style="background: #f8fafc; padding: 0.75rem 1rem; border-radius: 4px; border: 1px dashed #cbd5e1; margin-bottom: 1.5rem; font-size: 0.85rem;">
          <strong>Amount in Words:</strong> ${words}
        </div>

        <!-- Payment Mode & Bank Txn Details -->
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 1rem; margin-bottom: 1.5rem;">
          <div>
            <strong>Payment Mode:</strong> ${receipt.mode}<br>
            <strong>Txn Ref / UTR:</strong> <span style="font-family: monospace;">${receipt.txnId}</span>
          </div>
          <div style="text-align: right;">
            <strong>Received By:</strong> ${receipt.receivedBy}<br>
            <span style="color: #10b981; font-weight: 700;">✓ Payment Verified</span>
          </div>
        </div>

        <!-- Verification QR & Signatures -->
        <div class="receipt-signatures">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 64px; height: 64px; background: #0f172a; padding: 4px; border-radius: 4px;">
              <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; fill: #fff;">
                <rect x="10" y="10" width="30" height="30" fill="#fff"/>
                <rect x="15" y="15" width="20" height="20" fill="#0f172a"/>
                <rect x="20" y="20" width="10" height="10" fill="#fff"/>
                <rect x="60" y="10" width="30" height="30" fill="#fff"/>
                <rect x="65" y="15" width="20" height="20" fill="#0f172a"/>
                <rect x="70" y="20" width="10" height="10" fill="#fff"/>
                <rect x="10" y="60" width="30" height="30" fill="#fff"/>
                <rect x="15" y="65" width="20" height="20" fill="#0f172a"/>
                <rect x="20" y="70" width="10" height="10" fill="#fff"/>
                <rect x="50" y="50" width="15" height="15" fill="#fff"/>
                <rect x="70" y="60" width="20" height="20" fill="#fff"/>
              </svg>
            </div>
            <div style="font-size: 0.72rem; color: #64748b; line-height: 1.3;">
              Scan to verify genuine<br>Imperial digital receipt.<br>Valid without manual sign.
            </div>
          </div>

          <div style="text-align: center;">
            <div class="signature-stamp-box">
              <span style="color: #4338ca; font-weight: 700; transform: rotate(-8deg); display: block;">
                IMPERIAL ACADEMY<br>PAID & VERIFIED
              </span>
            </div>
            <div style="font-size: 0.78rem; font-weight: 600; margin-top: 0.4rem; color: #1e1b4b;">
              Authorized Signatory
            </div>
          </div>
        </div>

        <div style="margin-top: 1.5rem; text-align: center; font-size: 0.72rem; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 0.5rem;">
          Thank you for trusting Imperial Academy with your child’s educational future. Fees once paid are non-refundable.
        </div>
      </div>

      <!-- Action Buttons (Screen Only) -->
      <div style="margin-top: 1rem; display: flex; justify-content: flex-end; gap: 0.75rem;">
        <button class="btn btn-outline" id="close-receipt-modal-btn">Close</button>
        <button class="btn btn-primary" id="print-receipt-btn">
          🖨️ Print / Save PDF
        </button>
      </div>
    </div>
  `;

  modalContainer.classList.remove('hidden');

  modalContainer.querySelector('#close-receipt-modal-btn').addEventListener('click', () => {
    modalContainer.classList.add('hidden');
  });

  modalContainer.querySelector('#print-receipt-btn').addEventListener('click', () => {
    window.print();
  });
}
