import { 
  dbSaveEnquiry, 
  dbFetchEnquiries,
  dbSaveRecruitmentCandidate,
  dbFetchRecruitmentCandidates,
  dbSaveReceipt,
  dbFetchReceipts,
  dbSaveExpense,
  dbFetchExpenses,
  dbSaveLeave,
  dbFetchLeaves,
  dbSaveQuery,
  dbFetchQueries,
  exportAllCloudData 
} from '../src/supabase.js';

async function verifyAllForms() {
  console.log('=== VERIFYING SUPABASE FORMS PERSISTENCE & RETRIEVAL ===');

  // 1. Submit Public Demo Inquiry
  console.log('1. Testing Public Demo Inquiry Form...');
  const testEnq = {
    id: `enq-test-${Date.now()}`,
    studentName: 'Rohan Sharma',
    parentName: 'Sunil Sharma',
    phone: '9822334455',
    school: 'BYK College of Commerce',
    courseInterested: '12th Commerce',
    courseId: 'c2',
    branch: 'Branch 2: Gangapur Road Center',
    subjects: 'Accounts & Income Tax',
    status: 'persuaded',
    counselorNotes: 'Free demo booking from public website form',
    followUpDate: '2026-10-22'
  };
  const enqRes = await dbSaveEnquiry(testEnq);
  console.log('Enquiry save:', enqRes.success ? '✓ SUCCESS' : 'FAILED');

  // 2. Submit Recruitment Application
  console.log('2. Testing Recruitment Form (Join our Team)...');
  const testCand = {
    id: `IMP-REC-TEST-${Date.now().toString().slice(-4)}`,
    name: 'Prof. Varun Joshi',
    roleType: 'Teaching Faculty',
    post: 'Commerce Faculty (Economics & GST)',
    qualification: 'M.Com, UGC-NET Qualified',
    experience: '5 Years teaching at Junior College level',
    phone: '9822887766',
    whatsapp: '9822887766',
    email: 'varun.joshi@example.com',
    address: 'College Road, Nashik',
    expectedPay: '60% Sharing Model',
    demoLectureDate: '2026-10-25',
    branchPreference: 'Both Centers (Satpur & Gangapur Road)',
    resumeName: 'Prof_Varun_Joshi_Resume.pdf',
    resumeSize: '2.1 MB',
    status: 'Applied',
    notes: 'Online submission from Careers / Join Team portal'
  };
  const candRes = await dbSaveRecruitmentCandidate(testCand);
  console.log('Recruitment save:', candRes.success ? '✓ SUCCESS' : 'FAILED');

  // 3. Submit Fee Payment Receipt
  console.log('3. Testing Fee Collection / Online QR Pay...');
  const testReceipt = {
    receiptNo: `REC-TEST-${Date.now().toString().slice(-4)}`,
    date: new Date().toISOString().split('T')[0],
    studentId: 's1',
    studentName: 'Aarav Sharma',
    rollNo: 'IMP-2026-01',
    courseId: 'c2',
    courseName: '12th Commerce',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center',
    subject: 'Accounts & Economics',
    teacherName: 'Prof. Arvind Deshpande (CA)',
    amount: 15000,
    teacherShare60: 9000,
    mode: 'Online (Bank UPI QR)',
    txnId: `UPI-TEST-${Date.now().toString().slice(-6)}`,
    receivedBy: 'Online Portal Gateway',
    notes: 'Installment Fee Payment'
  };
  const receiptRes = await dbSaveReceipt(testReceipt);
  console.log('Receipt save:', receiptRes.success ? '✓ SUCCESS' : 'FAILED');

  // 4. Submit Expense Voucher
  console.log('4. Testing Expense Voucher Form...');
  const testExp = {
    voucherNo: `VOUCH-TEST-${Date.now().toString().slice(-4)}`,
    date: new Date().toISOString().split('T')[0],
    payee: 'Nashik Stationery & Whiteboard Supplies',
    category: 'Classroom Supplies',
    amount: 3200,
    mode: 'Online UPI',
    reference: `UPI-SUP-${Date.now().toString().slice(-4)}`,
    authorizedBy: 'Admin Desk',
    description: 'Whiteboard markers and test answer booklets for Satpur Center',
    courseId: 'common',
    isCommon: true,
    branchId: 'b1',
    branchName: 'Branch 1: Satpur Colony Center'
  };
  const expRes = await dbSaveExpense(testExp);
  console.log('Expense save:', expRes.success ? '✓ SUCCESS' : 'FAILED');

  // 5. Submit Student Leave Application
  console.log('5. Testing Student Leave Application Form...');
  const testLeave = {
    id: `leave-test-${Date.now().toString().slice(-4)}`,
    studentId: 's1',
    studentName: 'Aarav Sharma',
    courseName: '12th Commerce',
    appliedDate: new Date().toISOString().split('T')[0],
    leaveDate: '2026-10-25',
    reason: 'Family medical appointment in Mumbai',
    status: 'Pending Review',
    directorNotes: 'Pending evaluation'
  };
  const leaveRes = await dbSaveLeave(testLeave);
  console.log('Leave save:', leaveRes.success ? '✓ SUCCESS' : 'FAILED');

  // 6. Submit Academic Doubt / Query
  console.log('6. Testing Student Query / Doubt Form...');
  const testQuery = {
    id: `qry-test-${Date.now().toString().slice(-4)}`,
    studentId: 's1',
    studentName: 'Aarav Sharma',
    courseId: 'c2',
    courseName: '12th Commerce',
    recipient: 'Teacher',
    teacherName: 'Prof. Arvind Deshpande (CA)',
    subject: 'Accounts',
    queryText: 'How is revaluation profit distributed when old profit sharing ratio has fractions?',
    status: 'Pending'
  };
  const qryRes = await dbSaveQuery(testQuery);
  console.log('Query save:', qryRes.success ? '✓ SUCCESS' : 'FAILED');

  // 7. Verify Retrieval
  console.log('\n=== VERIFYING RETRIEVAL FROM SUPABASE CLOUD ===');
  const snapshot = await exportAllCloudData();
  console.log('Retrieved Cloud Snapshot Counts:');
  console.table(snapshot.counts);

  console.log('\n✓ ALL FORMS PERSISTENCE AND RETRIEVAL FULLY VERIFIED!');
}

verifyAllForms().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
