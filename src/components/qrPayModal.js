/* Imperial Commerce Tutorials - Multi-Portal Fee Payment Gateway Modal
   Supports:
   - PhonePe App Push Notification & Verified PhonePe QR Code
   - Google Pay App Push Notification
   - Netbanking Instant Push Notification
   - 2-Step Flow: (Step 1: Select Option & Next -> Step 2: Forward Notification to Mobile -> Tap Notification in App to Pay)
   - Auto-fetching of TRN (Transaction / UTR) Number upon payment
   - Database update & real-time reflection across Parent, Director & Teacher Logins */

import confetti from 'canvas-confetti';
import { state } from '../state.js';
import { openReceiptModal } from './receiptModal.js';

export function openQRPayModal(student, modalContainer, showToast, onPaymentSuccess) {
  let selectedAmount = student.dueFees > 0 ? student.dueFees : 15000;
  let activeMethod = 'phonepe'; // 'phonepe' | 'gpay' | 'netbanking' | 'qr'
  let mobileNumber = student.parentPhone ? student.parentPhone.replace(/[^0-9]/g, '').slice(-10) : '9822012345';
  let selectedBank = 'HDFC Bank';
  let currentStep = window.location.search.includes('step=2') ? 2 : 1; // 1: Option & Amount Selection -> 2: Notification Forwarded & Mobile App Payment
  let isAuthorizing = false;
  let fetchedTrn = '';

  function renderModal() {
    modalContainer.innerHTML = `
      <div class="modal-box" style="max-width: 640px; background: #0c1424; border: 1px solid var(--border-gold); border-radius: var(--radius-lg); box-shadow: 0 20px 60px rgba(0,0,0,0.85); overflow: hidden;">
        <!-- Modal Header -->
        <div class="modal-header" style="background: linear-gradient(135deg, rgba(19, 29, 49, 0.98), rgba(13, 21, 39, 0.98)); border-bottom: 1px solid var(--border-subtle); padding: 1.15rem 1.5rem; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: linear-gradient(135deg, #5f259f, #7c3aed); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; color: #fff; font-weight: 800; box-shadow: 0 4px 15px rgba(124,58,237,0.35);">
              पे
            </div>
            <div>
              <h3 style="font-size: 1.2rem; color: #fff; margin: 0; display: flex; align-items: center; gap: 0.4rem;">
                Imperial Fee Payment Portal
                <span style="font-size: 0.7rem; background: rgba(16,185,129,0.2); color: #34d399; border: 1px solid rgba(16,185,129,0.4); padding: 0.15rem 0.5rem; border-radius: 12px; font-weight: 700;">
                  256-Bit SSL Secured
                </span>
              </h3>
              <p style="font-size: 0.78rem; color: var(--accent-gold-light); margin: 0.15rem 0 0;">
                PhonePe App Notification • Google Pay • Bank QR • Auto TRN Fetching
              </p>
            </div>
          </div>
          <button class="modal-close-btn" id="close-payment-portal-btn" style="background: transparent; border: none; font-size: 1.6rem; color: var(--text-dim); cursor: pointer; line-height: 1;">&times;</button>
        </div>

        <div class="modal-body" style="padding: 1.5rem;">
          <!-- Progress Step Tracker -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; padding: 0.65rem 1rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); border-radius: 8px;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="width: 24px; height: 24px; border-radius: 50%; background: ${currentStep === 1 ? 'var(--accent-gold)' : '#10b981'}; color: #070b14; font-size: 0.75rem; font-weight: 800; display: inline-flex; align-items: center; justify-content: center;">
                ${currentStep > 1 ? '✓' : '1'}
              </span>
              <span style="font-size: 0.82rem; font-weight: 700; color: ${currentStep === 1 ? 'var(--accent-gold)' : '#6ee7b7'};">
                1. Select Option & Amount
              </span>
            </div>

            <span style="color: var(--text-dim); font-size: 0.8rem;">➔</span>

            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="width: 24px; height: 24px; border-radius: 50%; background: ${currentStep === 2 ? '#5f259f' : 'rgba(255,255,255,0.1)'}; color: #fff; font-size: 0.75rem; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; border: 1px solid ${currentStep === 2 ? '#a855f7' : 'transparent'};">
                2
              </span>
              <span style="font-size: 0.82rem; font-weight: 700; color: ${currentStep === 2 ? '#d8b4fe' : 'var(--text-dim)'};">
                2. App Notification & Pay
              </span>
            </div>
          </div>

          <!-- Student & Due Overview Chip -->
          <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); padding: 0.85rem 1.15rem; border-radius: 8px; margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
            <div>
              <div style="font-weight: 700; color: #fff; font-size: 0.95rem;">${student.name} (${student.rollNo})</div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">${student.courseName} • Satpur & Gangapur Centers</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Outstanding Due Balance:</div>
              <div style="color: ${student.dueFees > 0 ? '#f87171' : '#34d399'}; font-weight: 800; font-size: 1.25rem;">
                ₹${student.dueFees.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <!-- ============================================================= -->
          <!-- STEP 1: SELECT PAYMENT OPTION, AMOUNT & CLICK NEXT            -->
          <!-- ============================================================= -->
          ${currentStep === 1 ? `
            <!-- Amount Selection & Presets -->
            <div style="margin-bottom: 1.25rem; text-align: left;">
              <label style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.45rem;">
                Select Fee Payment Amount (₹):
              </label>
              <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.6rem;">
                <span style="font-size: 1.1rem; color: var(--accent-gold); font-weight: 800;">₹</span>
                <input 
                  type="number" 
                  id="pay-amount-input" 
                  value="${selectedAmount}" 
                  min="500" 
                  max="${student.dueFees > 0 ? student.dueFees : 100000}"
                  style="flex: 1; padding: 0.65rem 0.85rem; background: #070b14; border: 1px solid var(--border-gold); border-radius: 6px; color: #34d399; font-size: 1.25rem; font-weight: 800;"
                />
              </div>
              <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                ${student.dueFees > 0 ? `
                  <button type="button" class="preset-amt-btn" data-amt="${student.dueFees}" style="padding: 0.3rem 0.65rem; background: rgba(207,168,78,0.15); border: 1px solid rgba(207,168,78,0.35); border-radius: 4px; color: var(--accent-gold-light); font-size: 0.75rem; font-weight: 700; cursor: pointer;">
                    Full Balance (₹${student.dueFees.toLocaleString()})
                  </button>
                  ${student.dueFees > 10000 ? `
                    <button type="button" class="preset-amt-btn" data-amt="10000" style="padding: 0.3rem 0.65rem; background: rgba(255,255,255,0.05); border: 1px solid var(--border-light); border-radius: 4px; color: #e2e8f0; font-size: 0.75rem; font-weight: 600; cursor: pointer;">
                      Installment: ₹10,000
                    </button>
                  ` : ''}
                  ${student.dueFees > 5000 ? `
                    <button type="button" class="preset-amt-btn" data-amt="5000" style="padding: 0.3rem 0.65rem; background: rgba(255,255,255,0.05); border: 1px solid var(--border-light); border-radius: 4px; color: #e2e8f0; font-size: 0.75rem; font-weight: 600; cursor: pointer;">
                      Quarterly: ₹5,000
                    </button>
                  ` : ''}
                ` : `
                  <button type="button" class="preset-amt-btn" data-amt="15000" style="padding: 0.3rem 0.65rem; background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.35); border-radius: 4px; color: #6ee7b7; font-size: 0.75rem; font-weight: 700; cursor: pointer;">
                    Advance Fee (₹15,000)
                  </button>
                `}
              </div>
            </div>

            <!-- Choose Payment Method Option -->
            <div style="margin-bottom: 1.25rem;">
              <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.5rem;">
                Select Payment Option to Receive App Notification:
              </div>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem;">
                <!-- PhonePe -->
                <div 
                  class="pay-option-card ${activeMethod === 'phonepe' ? 'active-pay-option' : ''}" 
                  data-method="phonepe"
                  style="padding: 0.85rem 1rem; border-radius: 8px; border: 1px solid ${activeMethod === 'phonepe' ? '#a855f7' : 'var(--border-light)'}; background: ${activeMethod === 'phonepe' ? 'rgba(168,85,247,0.15)' : 'rgba(255,255,255,0.02)'}; cursor: pointer; display: flex; align-items: center; gap: 0.75rem; transition: all 0.2s;"
                >
                  <div style="width: 38px; height: 38px; border-radius: 8px; background: #5f259f; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; color: #fff; font-weight: 800;">
                    पे
                  </div>
                  <div>
                    <div style="font-weight: 800; color: #fff; font-size: 0.9rem;">PhonePe App</div>
                    <div style="font-size: 0.72rem; color: #d8b4fe;">Instant Mobile Notification & QR</div>
                  </div>
                </div>

                <!-- Google Pay -->
                <div 
                  class="pay-option-card ${activeMethod === 'gpay' ? 'active-pay-option' : ''}" 
                  data-method="gpay"
                  style="padding: 0.85rem 1rem; border-radius: 8px; border: 1px solid ${activeMethod === 'gpay' ? '#3b82f6' : 'var(--border-light)'}; background: ${activeMethod === 'gpay' ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.02)'}; cursor: pointer; display: flex; align-items: center; gap: 0.75rem; transition: all 0.2s;"
                >
                  <div style="width: 38px; height: 38px; border-radius: 8px; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: #1e293b; font-weight: 800;">
                    G
                  </div>
                  <div>
                    <div style="font-weight: 800; color: #fff; font-size: 0.9rem;">Google Pay (GPay)</div>
                    <div style="font-size: 0.72rem; color: #93c5fd;">Push Notification to Tez App</div>
                  </div>
                </div>

                <!-- Netbanking -->
                <div 
                  class="pay-option-card ${activeMethod === 'netbanking' ? 'active-pay-option' : ''}" 
                  data-method="netbanking"
                  style="padding: 0.85rem 1rem; border-radius: 8px; border: 1px solid ${activeMethod === 'netbanking' ? '#10b981' : 'var(--border-light)'}; background: ${activeMethod === 'netbanking' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.02)'}; cursor: pointer; display: flex; align-items: center; gap: 0.75rem; transition: all 0.2s;"
                >
                  <div style="width: 38px; height: 38px; border-radius: 8px; background: #065f46; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: #fff;">
                    🏛️
                  </div>
                  <div>
                    <div style="font-weight: 800; color: #fff; font-size: 0.9rem;">Netbanking</div>
                    <div style="font-size: 0.72rem; color: #6ee7b7;">HDFC, SBI, ICICI & 50+ Banks</div>
                  </div>
                </div>

                <!-- PhonePe QR Code Standee -->
                <div 
                  class="pay-option-card ${activeMethod === 'qr' ? 'active-pay-option' : ''}" 
                  data-method="qr"
                  style="padding: 0.85rem 1rem; border-radius: 8px; border: 1px solid ${activeMethod === 'qr' ? 'var(--accent-gold)' : 'var(--border-light)'}; background: ${activeMethod === 'qr' ? 'rgba(207,168,78,0.15)' : 'rgba(255,255,255,0.02)'}; cursor: pointer; display: flex; align-items: center; gap: 0.75rem; transition: all 0.2s;"
                >
                  <div style="width: 38px; height: 38px; border-radius: 8px; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                    📱
                  </div>
                  <div>
                    <div style="font-weight: 800; color: #fff; font-size: 0.9rem;">PhonePe QR Standee</div>
                    <div style="font-size: 0.72rem; color: var(--accent-gold-light);">Scan with any mobile app</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mobile Number Confirmation -->
            <div style="margin-bottom: 1.25rem; text-align: left;">
              <label style="font-size: 0.8rem; font-weight: 600; color: #cbd5e1; display: block; margin-bottom: 0.35rem;">
                Parent Mobile Number (To Receive Payment Notification):
              </label>
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <span style="padding: 0.6rem 0.85rem; background: #070b14; border: 1px solid var(--border-light); border-radius: 6px; color: var(--text-muted); font-size: 0.9rem; font-weight: 700;">+91</span>
                <input 
                  type="text" 
                  id="target-mobile-input" 
                  value="${mobileNumber}" 
                  maxlength="10" 
                  style="flex: 1; padding: 0.6rem 0.85rem; background: #070b14; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.95rem; font-weight: 700;"
                />
              </div>
              <div style="font-size: 0.74rem; color: var(--text-dim); margin-top: 0.25rem;">
                *Clicking Next will forward the payment alert directly to this mobile device's payment application.
              </div>
            </div>

            <!-- NEXT BUTTON -->
            <button 
              type="button" 
              id="proceed-to-step-2-btn" 
              style="width: 100%; padding: 0.9rem 1.25rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 800; font-size: 1rem; border: none; border-radius: 6px; cursor: pointer; box-shadow: 0 4px 20px rgba(207,168,78,0.3); display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
            >
              <span>Next: Forward Notification to Payment App</span>
              <span>➔</span>
            </button>
          ` : `
            <!-- ============================================================= -->
            <!-- STEP 2: NOTIFICATION FORWARDED & MOBILE APP PAYMENT          -->
            <!-- ============================================================= -->
            <div>
              <!-- Notification Forwarded Banner -->
              <div style="background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.4); border-radius: 8px; padding: 0.85rem 1rem; margin-bottom: 1.15rem; display: flex; align-items: center; gap: 0.75rem; text-align: left;">
                <span style="font-size: 1.5rem;">🔔</span>
                <div>
                  <div style="font-weight: 800; color: #34d399; font-size: 0.92rem;">
                    Notification Forwarded to Mobile App!
                  </div>
                  <div style="font-size: 0.78rem; color: #cbd5e1; margin-top: 0.15rem;">
                    Payment request of <strong>₹${selectedAmount.toLocaleString('en-IN')}</strong> sent to <strong>+91 ${mobileNumber}</strong> on ${activeMethod === 'phonepe' ? 'PhonePe' : activeMethod === 'gpay' ? 'Google Pay' : activeMethod === 'netbanking' ? selectedBank : 'Bank UPI'}.
                  </div>
                </div>
              </div>

              <!-- Interactive Simulated Mobile Push Notification Card -->
              <div style="background: #1e1b4b; border: 2px solid #a855f7; border-radius: 12px; padding: 1.15rem; margin-bottom: 1.25rem; text-align: left; box-shadow: 0 8px 30px rgba(95,37,159,0.4); position: relative;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem;">
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div style="width: 28px; height: 28px; border-radius: 6px; background: #5f259f; display: flex; align-items: center; justify-content: center; font-size: 1rem; color: #fff; font-weight: 800;">
                      पे
                    </div>
                    <span style="font-weight: 800; color: #fff; font-size: 0.85rem;">PhonePe Payment Request</span>
                  </div>
                  <span style="font-size: 0.72rem; color: #cbd5e1; background: rgba(255,255,255,0.1); padding: 0.15rem 0.5rem; border-radius: 10px;">
                    Just Now
                  </span>
                </div>

                <div style="font-size: 0.88rem; color: #fff; font-weight: 600; margin-bottom: 0.4rem;">
                  Imperial Commerce Tutorials has requested <span style="color: #34d399; font-weight: 800;">₹${selectedAmount.toLocaleString('en-IN')}</span>
                </div>
                <div style="font-size: 0.78rem; color: #cbd5e1; margin-bottom: 0.85rem;">
                  For Ward: <strong>${student.name}</strong> (${student.courseName}) • Tuitions Fee Installment
                </div>

                <!-- Simulated Click on Notification -->
                <button 
                  type="button" 
                  id="simulate-mobile-app-click-btn" 
                  style="width: 100%; padding: 0.85rem; background: linear-gradient(135deg, #10b981, #059669); color: #fff; font-weight: 800; font-size: 0.95rem; border: none; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: 0 4px 15px rgba(16,185,129,0.4);"
                >
                  <span>📲</span> Click Notification to Open App & Make Payment (Enter UPI PIN) →
                </button>
              </div>

              <!-- Official PhonePe QR Code Image Display (User Requested) -->
              <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 1.15rem; margin-bottom: 1rem;">
                <div style="font-size: 0.82rem; font-weight: 700; color: #fff; margin-bottom: 0.25rem;">
                  Or Scan Official PhonePe QR Code Directly:
                </div>
                <div style="font-size: 0.75rem; color: var(--text-dim); margin-bottom: 0.85rem;">
                  Parents can also point their phone camera or PhonePe / Google Pay scanner at this QR code:
                </div>

                <div style="display: flex; justify-content: center;">
                  <div style="background: #ffffff; padding: 0.85rem; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.6); max-width: 240px; text-align: center;">
                    <img 
                      src="/phonepe_qr.png" 
                      alt="PhonePe Accepted Here QR Code" 
                      style="width: 100%; height: auto; display: block; border-radius: 6px;"
                    />
                    <div style="font-size: 0.72rem; color: #475569; font-weight: 700; margin-top: 0.4rem;">
                      UPI ID: imperialcommerce@icici
                    </div>
                  </div>
                </div>
              </div>

              <!-- Listening Status -->
              <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.8rem; color: var(--accent-gold);">
                <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #fbbf24; animation: pulse 1s infinite;"></span>
                <span>Auto-listening for mobile app completion... Webhook will automatically fetch TRN and update ledger.</span>
              </div>

              <div style="margin-top: 0.75rem;">
                <button type="button" id="back-to-step-1-btn" style="background: transparent; border: none; color: var(--text-muted); font-size: 0.8rem; cursor: pointer; text-decoration: underline;">
                  ← Back to change payment option or amount
                </button>
              </div>
            </div>
          `}
        </div>
      </div>
    `;

    modalContainer.classList.remove('hidden');

    // Attach Close Button
    const closeBtn = modalContainer.querySelector('#close-payment-portal-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modalContainer.classList.add('hidden');
      });
    }

    if (currentStep === 1) {
      // Amount input
      const amtInput = modalContainer.querySelector('#pay-amount-input');
      if (amtInput) {
        amtInput.addEventListener('input', (e) => {
          selectedAmount = Math.max(100, Number(e.target.value) || 0);
        });
      }

      // Presets
      modalContainer.querySelectorAll('.preset-amt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const amt = Number(btn.getAttribute('data-amt'));
          selectedAmount = amt;
          if (amtInput) amtInput.value = amt;
        });
      });

      // Method cards
      modalContainer.querySelectorAll('.pay-option-card').forEach(card => {
        card.addEventListener('click', () => {
          activeMethod = card.getAttribute('data-method');
          renderModal();
        });
      });

      // Mobile input
      const mobInput = modalContainer.querySelector('#target-mobile-input');
      if (mobInput) {
        mobInput.addEventListener('input', (e) => {
          mobileNumber = e.target.value.replace(/[^0-9]/g, '');
        });
      }

      // Proceed to Step 2 ("Next" button)
      const nextBtn = modalContainer.querySelector('#proceed-to-step-2-btn');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          if (!selectedAmount || selectedAmount < 100) {
            if (showToast) showToast('Please enter a valid fee amount of at least ₹100.', 'warning');
            return;
          }
          currentStep = 2;
          renderModal();
          if (showToast) {
            showToast(`📲 Payment notification of ₹${selectedAmount.toLocaleString()} forwarded to PhonePe app on +91 ${mobileNumber}!`, 'info');
          }
        });
      }
    } else if (currentStep === 2) {
      // Back button
      const backBtn = modalContainer.querySelector('#back-to-step-1-btn');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          currentStep = 1;
          renderModal();
        });
      }

      // Simulate Click on Notification in Mobile App
      const mobilePayBtn = modalContainer.querySelector('#simulate-mobile-app-click-btn');
      if (mobilePayBtn) {
        mobilePayBtn.addEventListener('click', () => {
          if (isAuthorizing) return;
          isAuthorizing = true;
          mobilePayBtn.disabled = true;
          mobilePayBtn.style.opacity = '0.7';
          mobilePayBtn.innerHTML = `<span>⏳</span> Authorizing UPI PIN in PhonePe App & Fetching TRN Number...`;

          setTimeout(() => {
            // Automatically fetch TRN (Transaction/UTR) Number
            const randomTrnSuffix = Math.floor(100000000000 + Math.random() * 900000000000);
            fetchedTrn = `TRN-PP-${randomTrnSuffix}`;

            let modeTitle = 'Online (PhonePe App)';
            if (activeMethod === 'gpay') modeTitle = 'Online (Google Pay)';
            if (activeMethod === 'netbanking') modeTitle = `Online (${selectedBank} Netbanking)`;
            if (activeMethod === 'qr') modeTitle = 'Online (PhonePe QR Scan)';

            // Update database via state.collectFee
            const receipt = state.collectFee({
              studentId: student.id,
              amount: selectedAmount,
              mode: modeTitle,
              txnId: fetchedTrn,
              notes: `Tuition Fee Payment via ${modeTitle} (UTR: ${fetchedTrn})`
            });

            // Trigger celebration confetti
            try {
              confetti({
                particleCount: 120,
                spread: 90,
                origin: { y: 0.6 }
              });
            } catch (e) {}

            if (showToast) {
              showToast(`🎉 Payment successful! TRN: ${fetchedTrn} automatically fetched. Receipt ${receipt.receiptNo} generated!`, 'success');
            }

            if (onPaymentSuccess) {
              onPaymentSuccess(receipt);
            }

            // Show success transition with fetched TRN number before opening receipt
            modalContainer.innerHTML = `
              <div class="modal-box" style="max-width: 540px; background: #0c1424; border: 2px solid #10b981; border-radius: var(--radius-lg); padding: 2rem; text-align: center; box-shadow: 0 20px 60px rgba(16,185,129,0.3);">
                <div style="width: 68px; height: 68px; border-radius: 50%; background: rgba(16,185,129,0.2); border: 2px solid #10b981; display: inline-flex; align-items: center; justify-content: center; font-size: 2.2rem; margin-bottom: 1rem;">
                  ✓
                </div>
                <h3 style="font-size: 1.4rem; color: #fff; margin-bottom: 0.35rem;">Payment Successfully Received!</h3>
                <div style="font-size: 0.85rem; color: #34d399; font-weight: 700; margin-bottom: 1.25rem;">
                  Website has automatically verified and fetched the official bank transaction details.
                </div>

                <!-- Fetched Transaction Info Box -->
                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); border-radius: 8px; padding: 1rem; text-align: left; margin-bottom: 1.5rem; font-size: 0.85rem;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 0.45rem;">
                    <span style="color: var(--text-muted);">Fetched TRN / UTR Number:</span>
                    <strong style="color: var(--accent-gold); font-family: monospace;">${fetchedTrn}</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 0.45rem;">
                    <span style="color: var(--text-muted);">Amount Paid:</span>
                    <strong style="color: #34d399; font-size: 1.05rem;">₹${selectedAmount.toLocaleString('en-IN')}</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 0.45rem;">
                    <span style="color: var(--text-muted);">Official Receipt Generated:</span>
                    <strong style="color: #fff; font-family: monospace;">${receipt.receiptNo}</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--text-muted);">Database Ledger Status:</span>
                    <strong style="color: #6ee7b7;">✓ Updated (Director, Teacher 60% & Parent)</strong>
                  </div>
                </div>

                <button 
                  type="button" 
                  id="view-final-receipt-btn" 
                  style="width: 100%; padding: 0.85rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 800; font-size: 0.95rem; border: none; border-radius: 6px; cursor: pointer;"
                >
                  📄 View & Print Official Fee Receipt (${receipt.receiptNo}) →
                </button>
              </div>
            `;

            modalContainer.querySelector('#view-final-receipt-btn').addEventListener('click', () => {
              openReceiptModal(receipt, modalContainer);
            });

            // Automatically open receipt modal after 2.5 seconds if not clicked
            setTimeout(() => {
              const activeFinalBtn = modalContainer.querySelector('#view-final-receipt-btn');
              if (activeFinalBtn) {
                openReceiptModal(receipt, modalContainer);
              }
            }, 2500);
          }, 1100);
        });
      }
    }
  }

  renderModal();
}
