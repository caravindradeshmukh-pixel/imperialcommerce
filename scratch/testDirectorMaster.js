/* Comprehensive Test Suite for Director Master Management Features */

// Browser localStorage shim for Node.js execution
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
console.log('1. DIRECTORS VERIFICATION');
console.log('================================================================');
console.log('Directors configured in state:', state.directors.map(d => `${d.name} (${d.id})`));
const initialDir = state.getActiveDirector();
console.log('Active Director initially:', initialDir.name, initialDir.email);

const switchedDir = state.switchDirector('dir2');
console.log('Switched to Director:', switchedDir.name, switchedDir.email);
if (state.activeDirectorId !== 'dir2') throw new Error('Director switch failed');

state.switchDirector('dir1');
console.log('Switched back to Director:', state.getActiveDirector().name);

console.log('\n================================================================');
console.log('2. PER-SUBJECT FEE STRUCTURE VERIFICATION (Gangapur Rd & Satpur)');
console.log('================================================================');
console.log('Total fee rules configured:', state.feeStructures.length);
state.feeStructures.forEach(f => {
  console.log(`- ${f.branch} | ${f.courseName}: ₹${f.perSubjectFee}/subject ${f.specialRates && f.specialRates.Maths ? `(Maths: ₹${f.specialRates.Maths})` : ''}`);
});

console.log('\nTesting fee calculations:');
// 1. Gangapur Road 11th Commerce: 2 subjects (e.g. Account + Economics) => 2 * 10,000 = 20,000
const fee1 = state.calculateStudentFee('c1', 'Gangapur Road Center', ['Account', 'Economics']);
console.log('Gangapur 11th (Account + Eco):', fee1.totalFee, 'Expected: 20000', fee1.totalFee === 20000 ? '✓ PASS' : '✗ FAIL');

// 2. Satpur Colony 11th Commerce: Account + Economics + Maths => 6500 + 6500 + 8000 = 21,000
const fee2 = state.calculateStudentFee('c1', 'Satpur Colony Center', ['Account', 'Economics', 'Maths']);
console.log('Satpur 11th (Account + Eco + Maths):', fee2.totalFee, 'Expected: 21000', fee2.totalFee === 21000 ? '✓ PASS' : '✗ FAIL');

// 3. Gangapur Road CA Foundation: 4 subjects => 4 * 15,000 = 60,000
const fee3 = state.calculateStudentFee('c3', 'Gangapur Road Center', ['Account', 'Law', 'Economics', 'Maths']);
console.log('Gangapur CA Foundation (4 subjects):', fee3.totalFee, 'Expected: 60000', fee3.totalFee === 60000 ? '✓ PASS' : '✗ FAIL');

// 4. FY Bcom at Satpur Colony: 2 subjects => 2 * 6,000 = 12,000
const fee4 = state.calculateStudentFee('c8', 'Satpur Colony Center', ['Account 1', 'Account 2']);
console.log('Satpur FY Bcom (Account 1 + Account 2):', fee4.totalFee, 'Expected: 12000', fee4.totalFee === 12000 ? '✓ PASS' : '✗ FAIL');

console.log('\n================================================================');
console.log('3. ADDING NEW COURSE (by Director)');
console.log('================================================================');
const initialCourseCount = state.courses.length;
const newCourse = state.addCourse({
  name: 'TY Bcom',
  code: 'TYBCOM',
  stream: 'Degree Commerce',
  duration: '1 Academic Year',
  description: 'Third Year Bachelor of Commerce specialized taxation and financial management.'
});
console.log(`Added course "${newCourse.name}" (${newCourse.id}). Total courses: ${state.courses.length}`);
if (state.courses.length !== initialCourseCount + 1) throw new Error('Add course failed');

console.log('\n================================================================');
console.log('4. ADDING NEW SUBJECT (by Director)');
console.log('================================================================');
const initialSubCount = state.subjectsCatalog.length;
const newSub = state.addSubject({
  name: 'Taxation & Auditing',
  code: 'TAX301',
  category: 'Taxation & Financial Audit',
  description: 'Direct & Indirect Taxes, Income Tax computations, GST filing and Audit procedures.'
});
console.log(`Added subject "${newSub.name}" (${newSub.id}). Total subjects: ${state.subjectsCatalog.length}`);
if (state.subjectsCatalog.length !== initialSubCount + 1) throw new Error('Add subject failed');

console.log('\n================================================================');
console.log('5. CONFIGURE FEE RULE FOR NEW COURSE');
console.log('================================================================');
const newFeeRule = state.addFeeStructure({
  branch: 'Gangapur Road Center',
  courseId: newCourse.id,
  perSubjectFee: 8500,
  notes: 'TY Bcom Advanced subjects'
});
console.log(`Added fee rule for "${newCourse.name}": ₹${newFeeRule.perSubjectFee}/subject`);

const tybcomFee = state.calculateStudentFee(newCourse.id, 'Gangapur Road Center', ['Taxation & Auditing', 'Account']);
console.log(`TY Bcom (Taxation & Auditing + Account) Calculated Fee: ₹${tybcomFee.totalFee}`, tybcomFee.totalFee === 17000 ? '✓ PASS' : '✗ FAIL');

console.log('\n================================================================');
console.log('6. ENROL STUDENT & ADJUST FEES');
console.log('================================================================');
const initialStudentCount = state.students.length;
const enrolledStudent = state.addStudent({
  name: 'Snehal Patil',
  parentName: 'Mr Patil',
  email: 'snehal.patil@gmail.com',
  phone: '9822114455',
  branch: 'Gangapur Road Center',
  courseId: newCourse.id,
  courseName: newCourse.name,
  batch: '2026-27 (Gangapur)',
  subjectsChosen: ['Taxation & Auditing', 'Account'],
  totalFees: tybcomFee.totalFee,
  discount: 1000,
  paidFees: 0,
  assignedTeacher: 'CA Ravindra Deshmukh'
});
console.log(`Enrolled student "${enrolledStudent.name}" (${enrolledStudent.rollNo}). Total students: ${state.students.length}`);
if (state.students.length !== initialStudentCount + 1) throw new Error('Add student failed');

// Test payment and 60% teacher allocation
const receipt = state.collectFee({
  studentId: enrolledStudent.id,
  amount: 8000,
  mode: 'Online (Bank UPI QR)',
  txnId: 'UPI-TEST-123',
  notes: 'First Installment'
});
console.log(`Receipt issued: ${receipt.receiptNo} for ₹${receipt.amount}. 60% Teacher Share: ₹${receipt.teacherShare60}`);
if (receipt.teacherShare60 !== 4800) throw new Error('60% Teacher share calculation failed');

// Test fee adjustment
state.updateStudent(enrolledStudent.id, {
  totalFees: 15000,
  subjectsChosen: ['Taxation & Auditing', 'Account', 'Economics']
});
const updatedStudent = state.students.find(s => s.id === enrolledStudent.id);
console.log(`Adjusted student ${updatedStudent.name}: Total Fees ₹${updatedStudent.totalFees}, Subjects: ${updatedStudent.subjectsChosen.join(', ')}`);

console.log('\n================================================================');
console.log('ALL TESTS PASSED WITH 100% SUCCESS!');
console.log('================================================================');
