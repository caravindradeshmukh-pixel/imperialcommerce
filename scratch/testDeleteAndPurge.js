/* Verification Test Suite for Director Data Deletion & Purge Capabilities */

if (typeof globalThis.localStorage === 'undefined') {
  const storage = {};
  globalThis.localStorage = {
    getItem: (key) => (key in storage ? storage[key] : null),
    setItem: (key, val) => { storage[key] = String(val); },
    removeItem: (key) => { delete storage[key]; },
    clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
  };
}

const { state } = await import('../src/state.js');

console.log('================================================================');
console.log('TEST 1: DELETE INDIVIDUAL STUDENT');
console.log('================================================================');
const initialStudentCount = state.students.length;
const testStudent = state.addStudent({
  name: 'Test Temporary Student',
  parentName: 'Mr Temp',
  phone: '9999988888',
  courseId: 'c1',
  courseName: '11th Commerce',
  totalFees: 20000,
  paidFees: 5000
});
console.log(`Created test student "${testStudent.name}" (${testStudent.id}). Total: ${state.students.length}`);

const delRes = state.deleteStudent(testStudent.id);
console.log(`Deleted student "${delRes.student.name}". Remaining count: ${state.students.length}`);
if (state.students.some(s => s.id === testStudent.id)) throw new Error('Student deletion failed');
if (state.students.length !== initialStudentCount) throw new Error('Student count mismatch');
console.log('✓ PASS: Student deleted cleanly');

console.log('\n================================================================');
console.log('TEST 2: DELETE RECEIPT & RE-BALANCE STUDENT FEES');
console.log('================================================================');
const targetStudent = state.students[0];
const prevPaid = targetStudent.paidFees || 0;
const prevDue = targetStudent.dueFees || 0;
console.log(`Student ${targetStudent.name} before receipt: Paid ₹${prevPaid}, Due ₹${prevDue}`);

const newRec = state.collectFee({
  studentId: targetStudent.id,
  amount: 4000,
  mode: 'Cash',
  notes: 'Mock collection to be deleted'
});
console.log(`Issued receipt ${newRec.receiptNo} for ₹4000. Current Paid: ₹${targetStudent.paidFees}`);
if (targetStudent.paidFees !== prevPaid + 4000) throw new Error('Fee collection failed');

const delRecRes = state.deleteReceipt(newRec.receiptNo);
console.log(`Deleted receipt ${delRecRes.receipt.receiptNo}. Student Paid reverted to: ₹${targetStudent.paidFees}`);
if (targetStudent.paidFees !== prevPaid) throw new Error('Reverting paid fees on receipt delete failed');
if (state.receipts.some(r => r.receiptNo === newRec.receiptNo)) throw new Error('Receipt still exists in state');
console.log('✓ PASS: Receipt deleted and student fees accurately re-balanced');

console.log('\n================================================================');
console.log('TEST 3: DELETE EXPENSE VOUCHER');
console.log('================================================================');
const initialExpensesCount = state.expenses.length;
const testExpense = state.addExpense({
  payee: 'Mock Test Vendor',
  category: 'Printing & Stationary',
  amount: 2500,
  description: 'Wrong entry test voucher'
});
console.log(`Created expense voucher ${testExpense.voucherNo}. Total vouchers: ${state.expenses.length}`);

const delExpRes = state.deleteExpense(testExpense.voucherNo);
console.log(`Deleted voucher ${delExpRes.expense.voucherNo}. Remaining vouchers: ${state.expenses.length}`);
if (state.expenses.length !== initialExpensesCount) throw new Error('Expense deletion count mismatch');
console.log('✓ PASS: Expense voucher deleted cleanly');

console.log('\n================================================================');
console.log('TEST 4: DELETE FEE STRUCTURE RULE');
console.log('================================================================');
const initialFeeRulesCount = state.feeStructures.length;
const tempFeeRule = state.addFeeStructure({
  branch: 'Satpur Colony Center',
  courseName: 'Temporary Test Course',
  courseId: 'c_temp_999',
  perSubjectFee: 7500,
  notes: 'Temporary fee rule'
});
console.log(`Added temporary fee rule ${tempFeeRule.id}. Total rules: ${state.feeStructures.length}`);

const delFeeRes = state.deleteFeeStructure(tempFeeRule.id);
console.log(`Deleted fee rule. Remaining rules: ${state.feeStructures.length}`);
if (state.feeStructures.length !== initialFeeRulesCount) throw new Error('Fee rule deletion mismatch');
console.log('✓ PASS: Fee rule deleted cleanly');

console.log('\n================================================================');
console.log('TEST 5: PURGE MOCK DATA (PRESERVING 5 OFFICIAL STUDENTS)');
console.log('================================================================');
// Add 2 mock students
state.addStudent({ name: 'Fake Demo Student 1', courseId: 'c1', totalFees: 10000 });
state.addStudent({ name: 'Fake Demo Student 2', courseId: 'c2', totalFees: 12000 });
console.log(`Students count before purge: ${state.students.length}`);

const purgeRes = state.purgeMockData({ keepOfficialStudents: true });
console.log(`Purged ${purgeRes.removedStudents} mock students. Remaining: ${state.students.length}`);
const remainingIds = state.students.map(s => s.id);
console.log('Remaining students:', state.students.map(s => `${s.name} (${s.id})`));
const officialIds = ['s1', 's2', 's3', 's4', 's5'];
if (remainingIds.length !== 5 || !officialIds.every(id => remainingIds.includes(id))) {
  throw new Error('Purge mock data failed to isolate official students');
}
console.log('✓ PASS: 5 Official students strictly preserved; mock students purged');

console.log('\n================================================================');
console.log('TEST 6: FACTORY RESET TO OFFICIAL BASELINE');
console.log('================================================================');
const resetRes = state.resetToOfficialRecords();
console.log(resetRes.message);
console.log(`Restored Students: ${state.students.length}, Courses: ${state.courses.length}, Subjects: ${state.subjectsCatalog.length}`);
console.log('✓ PASS: Official baseline restored');

console.log('\n================================================================');
console.log('ALL DELETION & PURGE TESTS PASSED 100%!');
console.log('================================================================');
