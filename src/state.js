/* Reactive LocalStorage-backed State Management for Imperial Commerce Tutorials, Nashik */

import {
  UNIVERSAL_PASSWORD,
  USER_CREDENTIALS,
  INITIAL_COURSES,
  INITIAL_STUDENTS,
  INITIAL_RECEIPTS,
  INITIAL_EXPENSES,
  INITIAL_ENQUIRIES,
  INITIAL_PORTIONS,
  INITIAL_TEACHING_PLANS,
  INITIAL_HOMEWORKS,
  INITIAL_EXAMS,
  INITIAL_LEAVES,
  INITIAL_QUERIES,
  INITIAL_RECRUITMENT,
  INITIAL_TEACHERS
} from './mockData.js';

import {
  dbSaveEnquiry,
  dbFetchEnquiries,
  dbUpdateEnquiryStatus,
  dbSaveRecruitmentCandidate,
  dbFetchRecruitmentCandidates,
  dbUpdateCandidateStatus,
  dbSaveReceipt,
  dbFetchReceipts,
  dbSaveExpense,
  dbFetchExpenses,
  dbSaveLeave,
  dbFetchLeaves,
  dbUpdateLeaveStatus,
  dbSaveQuery,
  dbFetchQueries,
  dbSaveHomework,
  dbFetchHomeworks,
  dbSaveExam,
  dbFetchExams,
  dbSavePortion,
  dbFetchPortions,
  dbSaveStudent,
  dbFetchStudents,
  dbSaveTeacher,
  dbFetchTeachers,
  seedSupabaseIfEmpty,
  testConnection
} from './supabase.js';

class AppState {
  constructor() {
    this.subscribers = [];
    
    // Supabase Cloud Connection & Sync State
    this.supabaseStatus = {
      connected: false,
      latency: -1,
      lastSync: null,
      isSyncing: false
    };

    // Theme State (Dark / Highly Formal Light)
    this.theme = localStorage.getItem('imp_theme_v5') || 'dark';
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.setAttribute('data-theme', this.theme);
    }

    // Auth & Navigation State
    this.currentUser = this._load('imp_current_user_v5', null);
    this.currentRole = localStorage.getItem('imp_role_v5') || 'public';
    this.currentStudentId = localStorage.getItem('imp_student_id_v5') || 's1';
    this.currentParentStudentId = localStorage.getItem('imp_parent_ward_v5') || 's1';
    this.currentTeacherId = localStorage.getItem('imp_teacher_id_v5') || 't1';
    
    // Active tabs within portals
    this.currentPublicTab = localStorage.getItem('imp_public_tab_v5') || 'overview';
    this.currentDirectorTab = 'fees';
    this.currentAdminTab = 'receipts';
    this.currentTeacherTab = 'notes';
    this.currentStudentTab = 'notes';
    this.currentParentTab = 'overview';

    // Business Data Stores (v5 with Branch P&L and Student Proportionate Allocation)
    this.courses = this._load('imp_courses_v5', INITIAL_COURSES);
    this.students = this._sanitizeStudents(this._load('imp_students_v5', INITIAL_STUDENTS));
    this.receipts = this._sanitizeReceipts(this._load('imp_receipts_v5', INITIAL_RECEIPTS));
    this.expenses = this._sanitizeExpenses(this._load('imp_expenses_v5', INITIAL_EXPENSES));
    this.enquiries = this._load('imp_enquiries_v5', INITIAL_ENQUIRIES);
    this.portions = this._sanitizePortions(this._load('imp_portions_v5', INITIAL_PORTIONS));
    this.teachingPlans = this._load('imp_teaching_plans_v5', INITIAL_TEACHING_PLANS);
    this.homeworks = this._load('imp_homeworks_v5', INITIAL_HOMEWORKS);
    this.exams = this._sanitizeExams(this._load('imp_exams_v5', INITIAL_EXAMS));
    this.leaves = this._load('imp_leaves_v5', INITIAL_LEAVES);
    this.queries = this._sanitizeQueries(this._load('imp_queries_v5', INITIAL_QUERIES));
    this.recruitment = this._load('imp_recruitment_v5', INITIAL_RECRUITMENT);
    this.teachers = this._sanitizeTeachers(this._load('imp_teachers_v5', INITIAL_TEACHERS));

    // Initialize Supabase Cloud Background Sync
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.initSupabaseSync();
      }, 150);
    }
  }

  _sanitizeStudents(students) {
    return (students || []).map(s => {
      if (!s.branchId) {
        const isSatpur = s.batch && s.batch.includes('Satpur');
        s.branchId = isSatpur ? 'b1' : 'b2';
        s.branchName = isSatpur ? 'Branch 1: Satpur Colony Center' : 'Branch 2: Gangapur Road Center';
      }
      return s;
    });
  }

  _sanitizeReceipts(receipts) {
    return (receipts || []).map(r => {
      if (!r.branchId) {
        const isSatpur = (r.receivedBy && r.receivedBy.includes('Satpur')) || (r.notes && r.notes.includes('Satpur'));
        r.branchId = isSatpur ? 'b1' : 'b2';
        r.branchName = isSatpur ? 'Branch 1: Satpur Colony Center' : 'Branch 2: Gangapur Road Center';
      }
      return r;
    });
  }

  _sanitizeExpenses(expenses) {
    return (expenses || []).map(e => {
      if (!e.branchId) {
        if (e.payee && e.payee.includes('Satpur')) {
          e.branchId = 'b1';
          e.branchName = 'Branch 1: Satpur Colony Center';
        } else if (e.payee && e.payee.includes('Gangapur')) {
          e.branchId = 'b2';
          e.branchName = 'Branch 2: Gangapur Road Center';
        } else {
          e.branchId = 'all';
          e.branchName = 'All Branches (Shared Overheads)';
        }
      }
      return e;
    });
  }

  _sanitizePortions(portions) {
    return (portions || []).map(p => {
      const initMatch = INITIAL_PORTIONS.find(ip => ip.id === p.id);
      if (!p.mediaType || p.mediaType === 'none') {
        if (initMatch && initMatch.mediaType) {
          p.mediaType = initMatch.mediaType;
          p.mediaUrl = initMatch.mediaUrl;
          p.mediaName = initMatch.mediaName;
          p.mediaSize = initMatch.mediaSize;
        } else {
          p.mediaType = p.mediaUrl ? (p.mediaUrl.endsWith('.pdf') ? 'pdf' : (p.mediaUrl.endsWith('.mp4') ? 'video' : 'image')) : 'none';
        }
      }
      return p;
    });
  }

  _sanitizeQueries(queries) {
    return (queries || []).map(q => {
      const initMatch = INITIAL_QUERIES.find(iq => iq.id === q.id);
      if (initMatch) {
        if (!q.attachmentType && initMatch.attachmentType) q.attachmentType = initMatch.attachmentType;
        if (!q.attachmentUrl && initMatch.attachmentUrl) q.attachmentUrl = initMatch.attachmentUrl;
        if (!q.replyAttachmentType && initMatch.replyAttachmentType) q.replyAttachmentType = initMatch.replyAttachmentType;
        if (!q.replyAttachmentUrl && initMatch.replyAttachmentUrl) q.replyAttachmentUrl = initMatch.replyAttachmentUrl;
        if (q.studentResponse === undefined && initMatch.studentResponse !== undefined) {
          q.studentResponse = initMatch.studentResponse;
          q.studentFeedbackNote = initMatch.studentFeedbackNote;
          q.respondedAt = initMatch.respondedAt;
        }
      }
      if (q.studentResponse === undefined) {
        q.studentResponse = null;
        q.studentFeedbackNote = '';
        q.respondedAt = null;
      }
      return q;
    });
  }

  _sanitizeTeachers(teachers) {
    return (teachers || []).map(t => {
      const initMatch = INITIAL_TEACHERS.find(it => it.id === t.id);
      if (!t.assignedSubjects || t.assignedSubjects.length === 0) {
        t.assignedSubjects = initMatch ? initMatch.assignedSubjects : ['Accounts', 'Income Tax', 'GST'];
      }
      if (!t.qualification && initMatch) t.qualification = initMatch.qualification;
      if (!t.role && initMatch) t.role = initMatch.role;
      if (!t.assignedCourses && initMatch) t.assignedCourses = initMatch.assignedCourses;
      if (!t.honorariumSharePercent && initMatch) t.honorariumSharePercent = initMatch.honorariumSharePercent;
      return t;
    });
  }

  _sanitizeExams(exams) {
    const list = Array.isArray(exams) ? [...exams] : [];
    INITIAL_EXAMS.forEach(initExam => {
      const existing = list.find(e => e.id === initExam.id);
      if (!existing) {
        list.push(JSON.parse(JSON.stringify(initExam)));
      } else {
        if (!existing.googleFormLink && initExam.googleFormLink) existing.googleFormLink = initExam.googleFormLink;
        if (!existing.questionPaperPdf && initExam.questionPaperPdf) existing.questionPaperPdf = initExam.questionPaperPdf;
        if (!existing.durationMinutes && initExam.durationMinutes) existing.durationMinutes = initExam.durationMinutes;
        if (!existing.submissions) existing.submissions = [];

        initExam.submissions?.forEach(initSub => {
          const subMatch = existing.submissions.find(s => s.studentId === initSub.studentId);
          if (subMatch) {
            if (!subMatch.timeTakenFormatted && initSub.timeTakenFormatted) {
              subMatch.timeTakenFormatted = initSub.timeTakenFormatted;
              subMatch.timeTakenSeconds = initSub.timeTakenSeconds;
            }
            if (!subMatch.answerSheetName && initSub.answerSheetName) {
              subMatch.answerSheetName = initSub.answerSheetName;
            }
            if (!subMatch.submittedAt && initSub.submittedAt) {
              subMatch.submittedAt = initSub.submittedAt;
            }
            if (!subMatch.submissionType && initSub.submissionType) {
              subMatch.submissionType = initSub.submissionType;
            }
          } else {
            existing.submissions.push({ ...initSub });
          }
        });
      }
    });
    return list;
  }

  getCurrentTeacher() {
    const t = this.teachers.find(tch => tch.id === this.currentTeacherId);
    return t || this.teachers[0] || INITIAL_TEACHERS[0];
  }

  setCurrentTeacher(teacherId) {
    this.currentTeacherId = teacherId;
    localStorage.setItem('imp_teacher_id_v5', teacherId);
    this.notify();
  }

  getTeacherAssignedSubjects(teacherId = null) {
    const targetId = teacherId || this.currentTeacherId;
    const teacher = this.teachers.find(t => t.id === targetId);
    if (teacher && Array.isArray(teacher.assignedSubjects) && teacher.assignedSubjects.length > 0) {
      return teacher.assignedSubjects;
    }
    return ['Accounts', 'Income Tax', 'GST'];
  }

  assignSubjectsToTeacher(teacherId, subjectsList) {
    const teacher = this.teachers.find(t => t.id === teacherId);
    if (teacher) {
      teacher.assignedSubjects = [...new Set(subjectsList.filter(s => s && s.trim()))];
      this._save('imp_teachers_v5', this.teachers);
      dbSaveTeacher(teacher);
      this.notify();
      return teacher;
    }
    return null;
  }

  updateTeacherProfile(teacherId, updates) {
    const teacher = this.teachers.find(t => t.id === teacherId);
    if (teacher) {
      Object.assign(teacher, updates);
      this._save('imp_teachers_v5', this.teachers);
      dbSaveTeacher(teacher);
      this.notify();
      return teacher;
    }
    return null;
  }

  _load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn(`Failed to parse ${key} from storage, resetting to default`, e);
      return fallback;
    }
  }

  _save(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  // --- SUPABASE CLOUD BACKEND SYNCHRONIZATION ---

  async initSupabaseSync() {
    if (this.supabaseStatus.isSyncing) return;
    this.supabaseStatus.isSyncing = true;

    try {
      const conn = await testConnection();
      if (!conn.ok) {
        this.supabaseStatus = { connected: false, latency: -1, lastSync: this.supabaseStatus.lastSync, isSyncing: false };
        this.notify();
        return;
      }

      this.supabaseStatus.connected = true;
      this.supabaseStatus.latency = conn.latency;

      // Seed if Supabase tables are empty
      await seedSupabaseIfEmpty({
        INITIAL_ENQUIRIES,
        INITIAL_RECRUITMENT,
        INITIAL_RECEIPTS,
        INITIAL_EXPENSES,
        INITIAL_PORTIONS,
        INITIAL_HOMEWORKS,
        INITIAL_EXAMS,
        INITIAL_LEAVES,
        INITIAL_QUERIES,
        INITIAL_STUDENTS,
        INITIAL_TEACHERS
      });

      // Fetch cloud records and merge into state
      const [
        cloudEnquiries,
        cloudRecruitment,
        cloudReceipts,
        cloudExpenses,
        cloudLeaves,
        cloudQueries,
        cloudHomeworks,
        cloudExams,
        cloudPortions,
        cloudStudents,
        cloudTeachers
      ] = await Promise.all([
        dbFetchEnquiries(),
        dbFetchRecruitmentCandidates(),
        dbFetchReceipts(),
        dbFetchExpenses(),
        dbFetchLeaves(),
        dbFetchQueries(),
        dbFetchHomeworks(),
        dbFetchExams(),
        dbFetchPortions(),
        dbFetchStudents(),
        dbFetchTeachers()
      ]);

      if (cloudEnquiries && cloudEnquiries.length > 0) {
        this.enquiries = this._mergeById(this.enquiries, cloudEnquiries);
        this._save('imp_enquiries_v5', this.enquiries);
      }
      if (cloudRecruitment && cloudRecruitment.length > 0) {
        this.recruitment = this._mergeById(this.recruitment, cloudRecruitment);
        this._save('imp_recruitment_v5', this.recruitment);
      }
      if (cloudReceipts && cloudReceipts.length > 0) {
        this.receipts = this._sanitizeReceipts(this._mergeByField(this.receipts, cloudReceipts, 'receiptNo'));
        this._save('imp_receipts_v5', this.receipts);
      }
      if (cloudExpenses && cloudExpenses.length > 0) {
        this.expenses = this._sanitizeExpenses(this._mergeByField(this.expenses, cloudExpenses, 'voucherNo'));
        this._save('imp_expenses_v5', this.expenses);
      }
      if (cloudLeaves && cloudLeaves.length > 0) {
        this.leaves = this._mergeById(this.leaves, cloudLeaves);
        this._save('imp_leaves_v5', this.leaves);
      }
      if (cloudQueries && cloudQueries.length > 0) {
        this.queries = this._sanitizeQueries(this._mergeById(this.queries, cloudQueries));
        this._save('imp_queries_v5', this.queries);
      }
      if (cloudHomeworks && cloudHomeworks.length > 0) {
        this.homeworks = this._mergeById(this.homeworks, cloudHomeworks);
        this._save('imp_homeworks_v5', this.homeworks);
      }
      if (cloudExams && cloudExams.length > 0) {
        this.exams = this._sanitizeExams(this._mergeById(this.exams, cloudExams));
        this._save('imp_exams_v5', this.exams);
      }
      if (cloudPortions && cloudPortions.length > 0) {
        this.portions = this._sanitizePortions(this._mergeById(this.portions, cloudPortions));
        this._save('imp_portions_v5', this.portions);
      }
      if (cloudStudents && cloudStudents.length > 0) {
        this.students = this._sanitizeStudents(this._mergeById(this.students, cloudStudents));
        this._save('imp_students_v5', this.students);
      }
      if (cloudTeachers && cloudTeachers.length > 0) {
        this.teachers = this._sanitizeTeachers(this._mergeById(this.teachers, cloudTeachers));
        this._save('imp_teachers_v5', this.teachers);
      }

      this.supabaseStatus.lastSync = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch (err) {
      console.warn('Supabase sync warning:', err);
    } finally {
      this.supabaseStatus.isSyncing = false;
      this.notify();
    }
  }

  _mergeById(localArr, cloudArr) {
    return this._mergeByField(localArr, cloudArr, 'id');
  }

  _mergeByField(localArr, cloudArr, key = 'id') {
    const map = new Map();
    (cloudArr || []).forEach(item => {
      if (item && item[key]) map.set(item[key], item);
    });
    (localArr || []).forEach(item => {
      if (item && item[key]) {
        const existing = map.get(item[key]);
        map.set(item[key], existing ? { ...existing, ...item } : item);
      }
    });
    return Array.from(map.values());
  }

  async forcePushToCloud() {
    this.supabaseStatus.isSyncing = true;
    this.notify();
    try {
      await Promise.all([
        ...this.enquiries.map(e => dbSaveEnquiry(e)),
        ...this.recruitment.map(c => dbSaveRecruitmentCandidate(c)),
        ...this.receipts.map(r => dbSaveReceipt(r)),
        ...this.expenses.map(e => dbSaveExpense(e)),
        ...this.leaves.map(l => dbSaveLeave(l)),
        ...this.queries.map(q => dbSaveQuery(q)),
        ...this.homeworks.map(h => dbSaveHomework(h)),
        ...this.exams.map(ex => dbSaveExam(ex)),
        ...this.portions.map(p => dbSavePortion(p)),
        ...this.students.map(s => dbSaveStudent(s)),
        ...this.teachers.map(t => dbSaveTeacher(t))
      ]);
      this.supabaseStatus.lastSync = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      return { success: true };
    } catch (err) {
      console.error('Failed to force push to Supabase:', err);
      return { success: false, error: err.message };
    } finally {
      this.supabaseStatus.isSyncing = false;
      this.notify();
    }
  }

  async forcePullFromCloud() {
    this.supabaseStatus.isSyncing = true;
    this.notify();
    try {
      const [
        cloudEnquiries,
        cloudRecruitment,
        cloudReceipts,
        cloudExpenses,
        cloudLeaves,
        cloudQueries,
        cloudHomeworks,
        cloudExams,
        cloudPortions,
        cloudStudents,
        cloudTeachers
      ] = await Promise.all([
        dbFetchEnquiries(),
        dbFetchRecruitmentCandidates(),
        dbFetchReceipts(),
        dbFetchExpenses(),
        dbFetchLeaves(),
        dbFetchQueries(),
        dbFetchHomeworks(),
        dbFetchExams(),
        dbFetchPortions(),
        dbFetchStudents(),
        dbFetchTeachers()
      ]);

      if (cloudEnquiries) { this.enquiries = cloudEnquiries; this._save('imp_enquiries_v5', this.enquiries); }
      if (cloudRecruitment) { this.recruitment = cloudRecruitment; this._save('imp_recruitment_v5', this.recruitment); }
      if (cloudReceipts) { this.receipts = this._sanitizeReceipts(cloudReceipts); this._save('imp_receipts_v5', this.receipts); }
      if (cloudExpenses) { this.expenses = this._sanitizeExpenses(cloudExpenses); this._save('imp_expenses_v5', this.expenses); }
      if (cloudLeaves) { this.leaves = cloudLeaves; this._save('imp_leaves_v5', this.leaves); }
      if (cloudQueries) { this.queries = this._sanitizeQueries(cloudQueries); this._save('imp_queries_v5', this.queries); }
      if (cloudHomeworks) { this.homeworks = cloudHomeworks; this._save('imp_homeworks_v5', this.homeworks); }
      if (cloudExams) { this.exams = this._sanitizeExams(cloudExams); this._save('imp_exams_v5', this.exams); }
      if (cloudPortions) { this.portions = this._sanitizePortions(cloudPortions); this._save('imp_portions_v5', this.portions); }
      if (cloudStudents) { this.students = this._sanitizeStudents(cloudStudents); this._save('imp_students_v5', this.students); }
      if (cloudTeachers) { this.teachers = this._sanitizeTeachers(cloudTeachers); this._save('imp_teachers_v5', this.teachers); }

      this.supabaseStatus.lastSync = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      return { success: true };
    } catch (err) {
      console.error('Failed to force pull from Supabase:', err);
      return { success: false, error: err.message };
    } finally {
      this.supabaseStatus.isSyncing = false;
      this.notify();
    }
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.subscribers.forEach(cb => cb(this));
  }

  // --- THEME SWITCHING (DARK & HIGHLY FORMAL LIGHT) ---

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('imp_theme_v5', this.theme);
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.setAttribute('data-theme', this.theme);
    }
    this.notify();
    return this.theme;
  }

  setTheme(theme) {
    if (theme !== 'dark' && theme !== 'light') return;
    this.theme = theme;
    localStorage.setItem('imp_theme_v5', this.theme);
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.setAttribute('data-theme', this.theme);
    }
    this.notify();
    return this.theme;
  }

  // --- AUTHENTICATION ---

  login(userId, password) {
    if (password !== UNIVERSAL_PASSWORD) {
      return { success: false, message: 'Invalid Password. Please use default credentials: Password@123' };
    }

    const cred = USER_CREDENTIALS[userId];
    if (!cred) {
      return { success: false, message: `Unknown User ID "${userId}". Allowed IDs: Director, Admin Staff, Teacher, Student, Parents` };
    }

    this.currentUser = {
      userId,
      ...cred
    };
    this.currentRole = cred.role;

    if (cred.studentId) this.currentStudentId = cred.studentId;
    if (cred.wardId) this.currentParentStudentId = cred.wardId;

    this._save('imp_current_user_v5', this.currentUser);
    localStorage.setItem('imp_role_v5', this.currentRole);
    this.notify();

    return { success: true, user: this.currentUser };
  }

  logout() {
    this.currentUser = null;
    this.currentRole = 'public';
    localStorage.removeItem('imp_current_user_v5');
    localStorage.setItem('imp_role_v5', 'public');
    this.notify();
  }

  setRole(role) {
    this.currentRole = role;
    localStorage.setItem('imp_role_v5', role);
    this.notify();
  }

  setPublicTab(tab) {
    this.currentPublicTab = tab;
    localStorage.setItem('imp_public_tab_v5', tab);
    this.notify();
  }

  setStudentWard(studentId) {
    this.currentParentStudentId = studentId;
    localStorage.setItem('imp_parent_ward_v5', studentId);
    this.notify();
  }

  // --- ACTIONS: FEES & RECEIPTS (WITH 60% TEACHER SHARE ALLOCATION) ---

  collectFee({ studentId, amount, mode, txnId, notes }) {
    amount = Number(amount);
    const student = this.students.find(s => s.id === studentId);
    if (!student) return null;

    student.paidFees += amount;
    student.dueFees = Math.max(0, student.totalFees - student.paidFees);
    student.status = student.dueFees === 0 ? 'Paid' : 'Partial';

    // 60% of collection immediately allocated to teacher share
    const teacherShare60 = Math.round(amount * 0.60);
    const receiptNo = `REC-2026-${String(this.receipts.length + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];

    const receipt = {
      receiptNo,
      date: today,
      studentId: student.id,
      studentName: student.name,
      rollNo: student.rollNo,
      courseId: student.courseId,
      courseName: student.courseName,
      branchId: student.branchId || 'b1',
      branchName: student.branchName || 'Branch 1: Satpur Colony Center',
      subject: student.subjectsChosen ? student.subjectsChosen.join(', ') : 'Commerce Subjects',
      teacherName: student.assignedTeacher || 'Prof. Arvind Deshpande (CA)',
      amount,
      teacherShare60,
      mode: mode || 'Online (Bank UPI QR)',
      txnId: txnId || `UPI-TXN-${Date.now().toString().slice(-8)}`,
      receivedBy: this.currentUser ? this.currentUser.name : 'Accounts Desk (Imperial Commerce Tutorials)',
      notes: notes || 'Tuition Fee Payment'
    };

    this.receipts.unshift(receipt);
    this._save('imp_students_v5', this.students);
    this._save('imp_receipts_v5', this.receipts);
    dbSaveReceipt(receipt);
    dbSaveStudent(student);
    this.notify();
    return receipt;
  }

  // --- ACTIONS: EXPENSES & VOUCHERS (WITH COURSE & COMMON ALLOCATION) ---

  addExpense({ payee, category, amount, mode, reference, description, courseId, isCommon, branchId, branchName, allocations }) {
    amount = Number(amount);
    const voucherNo = `VOUCH-2026-${String(this.expenses.length + 41).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];

    const determinedBranchId = branchId || (
      payee && payee.toLowerCase().includes('satpur') ? 'b1' :
      payee && payee.toLowerCase().includes('gangapur') ? 'b2' :
      (courseId === 'c1' || courseId === 'c3') ? 'b1' :
      (courseId === 'c2' || courseId === 'c4' || courseId === 'c5' || courseId === 'c6') ? 'b2' : 'all'
    );

    const determinedBranchName = branchName || (
      determinedBranchId === 'b1' ? 'Branch 1: Satpur Colony Center' :
      determinedBranchId === 'b2' ? 'Branch 2: Gangapur Road Center' :
      'All Branches (Shared Overheads)'
    );

    const expense = {
      voucherNo,
      date: today,
      payee,
      category,
      amount,
      mode: mode || 'Cheque / Bank Transfer',
      reference: reference || `REF-${Date.now().toString().slice(-6)}`,
      authorizedBy: this.currentUser ? this.currentUser.name : 'Director Desk',
      description,
      courseId: courseId || 'common',
      isCommon: isCommon !== undefined ? isCommon : (courseId === 'common'),
      branchId: determinedBranchId,
      branchName: determinedBranchName,
      allocations: allocations || null
    };

    this.expenses.unshift(expense);
    this._save('imp_expenses_v5', this.expenses);
    dbSaveExpense(expense);
    this.notify();
    return expense;
  }

  // --- ACTIONS: ATTENDANCE & WHATSAPP ALERTS ---

  markAttendance(studentId, status) {
    const student = this.students.find(s => s.id === studentId);
    if (student) {
      student.todayAttendance = status;
      this._save('imp_students_v5', this.students);
      dbSaveStudent(student);
      this.notify();
    }
  }

  getWhatsAppAttendanceUrl(studentId) {
    const student = this.students.find(s => s.id === studentId);
    if (!student) return '#';
    const cleanPhone = (student.parentPhone || student.phone || '9370728283').replace(/\D/g, '');
    const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const msg = `Dear ${student.parentName || 'Parent'}, this is to inform you from Imperial Commerce Tutorials (Nashik) that your ward ${student.name} (${student.courseName}) was marked ABSENT today (${dateStr}). Please ensure regular attendance for syllabus continuity. For queries contact: +91 93707 28283.`;
    return `https://api.whatsapp.com/send?phone=91${cleanPhone}&text=${encodeURIComponent(msg)}`;
  }

  // --- ACTIONS: HOMEWORK COMPLETION & WHATSAPP ALERTS ---

  markHomeworkCompletion(studentId, isCompleted) {
    const student = this.students.find(s => s.id === studentId);
    if (student) {
      student.homeworkCompleted = isCompleted;
      this._save('imp_students_v5', this.students);
      dbSaveStudent(student);
      this.notify();
    }
  }

  getWhatsAppHomeworkUrl(studentId) {
    const student = this.students.find(s => s.id === studentId);
    if (!student) return '#';
    const cleanPhone = (student.parentPhone || student.phone || '9370728283').replace(/\D/g, '');
    const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const msg = `Dear ${student.parentName || 'Parent'}, your ward ${student.name} (${student.courseName}) has NOT completed today's assigned homework (${dateStr}) at Imperial Commerce Tutorials. Kindly ensure the problem set is submitted by tomorrow morning. Contact Faculty: +91 93707 28283.`;
    return `https://api.whatsapp.com/send?phone=91${cleanPhone}&text=${encodeURIComponent(msg)}`;
  }

  assignHomework({ courseId, subject, title, dueDate, description }) {
    const id = 'hw_' + Date.now();
    const today = new Date().toISOString().split('T')[0];

    const hw = {
      id,
      courseId,
      subject,
      title,
      assignedDate: today,
      dueDate,
      assignedBy: this.currentUser ? this.currentUser.name : 'Faculty Lead',
      description,
      submissions: []
    };

    this.homeworks.unshift(hw);
    this._save('imp_homeworks_v5', this.homeworks);
    dbSaveHomework(hw);
    this.notify();
    return hw;
  }

  submitHomework(hwId, studentId, photoUrl) {
    const hw = this.homeworks.find(h => h.id === hwId);
    const student = this.students.find(s => s.id === studentId);
    if (!hw || !student) return;

    let sub = hw.submissions.find(s => s.studentId === studentId);
    if (sub) {
      sub.photoUrl = photoUrl;
      sub.submittedAt = new Date().toLocaleString();
      sub.status = 'Under Review';
    } else {
      hw.submissions.push({
        studentId,
        studentName: student.name,
        submittedAt: new Date().toLocaleString(),
        photoUrl: photoUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        status: 'Under Review',
        marksGiven: 'Pending',
        remarks: 'Submitted for faculty check.'
      });
    }

    student.homeworkCompleted = true;
    this._save('imp_students_v5', this.students);
    this._save('imp_homeworks_v5', this.homeworks);
    dbSaveHomework(hw);
    dbSaveStudent(student);
    this.notify();
  }

  gradeHomework(hwId, studentId, { marksGiven, remarks, status }) {
    const hw = this.homeworks.find(h => h.id === hwId);
    if (!hw) return;
    const sub = hw.submissions.find(s => s.studentId === studentId);
    if (sub) {
      sub.marksGiven = marksGiven;
      sub.remarks = remarks;
      sub.status = status || 'Checked';
      this._save('imp_homeworks_v5', this.homeworks);
      dbSaveHomework(hw);
      this.notify();
    }
  }

  // --- ACTIONS: ENQUIRIES ---

  addEnquiry({ studentName, parentName, phone, courseInterested, courseId, branch, status, reason, counselorNotes, followUpDate }) {
    const id = 'enq-' + Date.now();
    const today = new Date().toISOString().split('T')[0];
    const newEnq = {
      id,
      date: today,
      studentName,
      parentName,
      phone,
      courseInterested,
      courseId: courseId || 'c2',
      branch: branch || 'Satpur Colony Center',
      status: status || 'persuaded',
      reason: status === 'discontinued' ? reason : null,
      counselorNotes: counselorNotes || 'New inquiry recorded at reception.',
      followUpDate: followUpDate || '2026-10-25'
    };

    this.enquiries.unshift(newEnq);
    this._save('imp_enquiries_v5', this.enquiries);
    dbSaveEnquiry(newEnq);
    this.notify();
    return newEnq;
  }

  updateEnquiryStatus(id, newStatus, reason = null) {
    const enq = this.enquiries.find(e => e.id === id);
    if (enq) {
      enq.status = newStatus;
      if (reason) enq.reason = reason;
      this._save('imp_enquiries_v5', this.enquiries);
      dbUpdateEnquiryStatus(id, newStatus, reason);
      this.notify();
    }
  }

  // --- ACTIONS: TEACHING PLANS & LESSON NOTES ---

  logPortion({ courseId, courseName, subject, teacher, topicCovered, completionPercent, nextLectureTopic, mediaType, mediaUrl, mediaName, mediaSize }) {
    const id = 'p_' + Date.now();
    const today = new Date().toISOString().split('T')[0];

    const portion = {
      id,
      date: today,
      courseId,
      courseName: courseName || '12th Commerce',
      subject,
      teacher: teacher || (this.currentUser ? this.currentUser.name : 'Prof. Arvind Deshpande (CA)'),
      topicCovered,
      completionPercent: Number(completionPercent) || 75,
      nextLectureTopic,
      mediaType: mediaType || 'none', // 'video' | 'image' | 'pdf' | 'none'
      mediaUrl: mediaUrl || '',
      mediaName: mediaName || '',
      mediaSize: mediaSize || '',
      status: 'Completed'
    };

    this.portions.unshift(portion);
    this._save('imp_portions_v5', this.portions);
    dbSavePortion(portion);
    this.notify();
    return portion;
  }

  updateTeachingPlan(planId, actualTaught) {
    const plan = this.teachingPlans.find(p => p.id === planId);
    if (plan) {
      plan.actualTaughtByTeacher = actualTaught;
      plan.status = 'Verified by Director';
      this._save('imp_teaching_plans_v5', this.teachingPlans);
      this.notify();
    }
  }

  // --- ACTIONS: EXAMS & MARKS ---

  publishExam({ title, courseId, courseName, subject, examType, date, maxMarks, questionPaperPdf, googleFormLink }) {
    const id = 'exam-' + Date.now();
    const exam = {
      id,
      title,
      courseId,
      courseName: courseName || '12th Commerce',
      subject,
      examType: examType || 'Weekly Test',
      date: date || new Date().toISOString().split('T')[0],
      maxMarks: Number(maxMarks) || 50,
      questionPaperPdf: questionPaperPdf || 'https://imperialcommerce.edu.in/papers/sample_paper.pdf',
      googleFormLink: googleFormLink || '',
      publishedBy: this.currentUser ? this.currentUser.name : 'Prof. Arvind Deshpande (CA)',
      submissions: []
    };

    this.exams.unshift(exam);
    this._save('imp_exams_v5', this.exams);
    dbSaveExam(exam);
    this.notify();
    return exam;
  }

  startExamTimer(examId, studentId) {
    const key = `imp_timer_${examId}_${studentId}`;
    const existing = localStorage.getItem(key);
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        if (parsed.startedAt) return parsed.startedAt;
      } catch (e) {}
    }
    const startedAt = Date.now();
    localStorage.setItem(key, JSON.stringify({ startedAt }));
    return startedAt;
  }

  getExamTimer(examId, studentId) {
    const key = `imp_timer_${examId}_${studentId}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      if (parsed.startedAt) {
        const elapsedSeconds = Math.max(0, Math.floor((Date.now() - parsed.startedAt) / 1000));
        return { startedAt: parsed.startedAt, elapsedSeconds };
      }
    } catch (e) {}
    return null;
  }

  stopExamTimer(examId, studentId) {
    const key = `imp_timer_${examId}_${studentId}`;
    let elapsedSeconds = 1800;
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.startedAt) {
          elapsedSeconds = Math.max(1, Math.floor((Date.now() - parsed.startedAt) / 1000));
        }
      } catch (e) {}
      localStorage.removeItem(key);
    }

    const hrs = Math.floor(elapsedSeconds / 3600);
    const mins = Math.floor((elapsedSeconds % 3600) / 60);
    const secs = elapsedSeconds % 60;

    let formatted = '';
    if (hrs > 0) {
      formatted = `${hrs} hr ${mins} mins ${secs} secs`;
    } else if (mins > 0) {
      formatted = `${mins} mins ${secs} secs`;
    } else {
      formatted = `${secs} secs`;
    }

    return { seconds: elapsedSeconds, formatted };
  }

  submitStudentExam(examId, studentId, { answerSheetPdf, answerSheetName, answerSheetSize, submissionType, timeTakenSeconds, timeTakenFormatted, remarks }) {
    const exam = this.exams.find(e => e.id === examId);
    const student = this.students.find(s => s.id === studentId);
    if (!exam || !student) return null;

    if (!timeTakenFormatted) {
      const timerRes = this.stopExamTimer(examId, studentId);
      timeTakenSeconds = timerRes.seconds;
      timeTakenFormatted = timerRes.formatted;
    } else {
      localStorage.removeItem(`imp_timer_${examId}_${studentId}`);
    }

    let sub = exam.submissions.find(s => s.studentId === studentId);
    const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

    if (sub) {
      sub.answerSheetPdf = answerSheetPdf || sub.answerSheetPdf || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80';
      sub.answerSheetName = answerSheetName || sub.answerSheetName || 'student_exam_solution.pdf';
      sub.answerSheetSize = answerSheetSize || sub.answerSheetSize || '2.4 MB';
      sub.submissionType = submissionType || sub.submissionType || 'pdf';
      sub.timeTakenSeconds = timeTakenSeconds;
      sub.timeTakenFormatted = timeTakenFormatted;
      sub.submittedAt = nowStr;
      if (sub.status !== 'Graded') {
        sub.status = 'Submitted for Evaluation';
        sub.remarks = remarks || 'Answer sheet uploaded by student. Timer verified & paper queued for faculty grading.';
      }
    } else {
      sub = {
        studentId,
        studentName: student.name,
        marksAssessed: null,
        answerSheetPdf: answerSheetPdf || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        answerSheetName: answerSheetName || 'student_exam_solution.pdf',
        answerSheetSize: answerSheetSize || '2.4 MB',
        submissionType: submissionType || 'pdf',
        timeTakenSeconds,
        timeTakenFormatted,
        submittedAt: nowStr,
        remarks: remarks || 'Answer sheet uploaded by student. Timer verified & paper queued for faculty grading.',
        status: 'Submitted for Evaluation'
      };
      exam.submissions.push(sub);
    }

    this._save('imp_exams_v5', this.exams);
    dbSaveExam(exam);
    this.notify();
    return sub;
  }

  recordExamMarks(examId, studentId, { marksAssessed, remarks, answerSheetPdf }) {
    const exam = this.exams.find(e => e.id === examId);
    const student = this.students.find(s => s.id === studentId);
    if (!exam || !student) return;

    marksAssessed = Number(marksAssessed);
    let sub = exam.submissions.find(s => s.studentId === studentId);
    if (sub) {
      sub.marksAssessed = marksAssessed;
      sub.remarks = remarks || sub.remarks;
      if (answerSheetPdf) sub.answerSheetPdf = answerSheetPdf;
      sub.status = 'Graded';
    } else {
      sub = {
        studentId,
        studentName: student.name,
        marksAssessed,
        answerSheetPdf: answerSheetPdf || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        answerSheetName: 'student_evaluated_paper.pdf',
        answerSheetSize: '2.1 MB',
        submissionType: 'pdf',
        timeTakenSeconds: 3000,
        timeTakenFormatted: '50 mins 00 secs',
        submittedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
        remarks: remarks || 'Evaluated per board marking scheme.',
        status: 'Graded'
      };
      exam.submissions.push(sub);
    }

    // Also update student's local marks cache
    if (!student.performanceMarks) student.performanceMarks = { weekly: [], quarterly: [], sixMonthly: [] };
    const typeKey = exam.examType.toLowerCase().includes('weekly') ? 'weekly' : exam.examType.toLowerCase().includes('quarterly') ? 'quarterly' : 'sixMonthly';
    if (!student.performanceMarks[typeKey]) student.performanceMarks[typeKey] = [];
    student.performanceMarks[typeKey].unshift({
      testName: exam.title,
      subject: exam.subject,
      maxMarks: exam.maxMarks,
      marks: marksAssessed,
      timeTaken: sub.timeTakenFormatted,
      date: exam.date
    });

    this._save('imp_exams_v5', this.exams);
    this._save('imp_students_v5', this.students);
    dbSaveExam(exam);
    dbSaveStudent(student);
    this.notify();
  }

  // --- ACTIONS: LEAVE APPLICATIONS (RULE: >= 2 DAYS IN ADVANCE) ---

  applyLeave({ studentId, leaveDate, reason }) {
    const student = this.students.find(s => s.id === studentId);
    if (!student) return { success: false, message: 'Student record not found.' };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(leaveDate);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 2) {
      return {
        success: false,
        message: `Institute Rule Violation: Leave application must be submitted at least 2 days in advance (Selected date is in ${diffDays} day(s)). Please apply for a date at least 2 days ahead.`
      };
    }

    const newLeave = {
      id: 'leave-' + Date.now(),
      studentId: student.id,
      studentName: student.name,
      courseName: student.courseName,
      appliedDate: new Date().toISOString().split('T')[0],
      leaveDate,
      reason,
      status: 'Pending Review',
      directorNotes: 'Under Director evaluation for syllabus compensatory schedule.'
    };

    this.leaves.unshift(newLeave);
    this._save('imp_leaves_v5', this.leaves);
    dbSaveLeave(newLeave);
    this.notify();
    return { success: true, leave: newLeave };
  }

  updateLeaveStatus(leaveId, status, notes = '') {
    const leave = this.leaves.find(l => l.id === leaveId);
    if (leave) {
      leave.status = status;
      if (notes) leave.directorNotes = notes;
      this._save('imp_leaves_v5', this.leaves);
      dbUpdateLeaveStatus(leaveId, status, notes);
      this.notify();
    }
  }

  // --- ACTIONS: QUERIES (STUDENT -> TEACHER/DIRECTOR & REPLIES & STUDENT FEEDBACK) ---

  raiseQuery({ studentId, recipient, subject, queryText, attachment, attachmentType, attachmentUrl }) {
    const student = this.students.find(s => s.id === studentId);
    if (!student) return null;

    const newQuery = {
      id: 'qry-' + Date.now(),
      studentId: student.id,
      studentName: student.name,
      courseId: student.courseId,
      courseName: student.courseName,
      recipient: recipient || 'Teacher',
      teacherName: recipient === 'Director' ? 'Director Dr. S. K. Joshi' : (student.assignedTeacher || 'Prof. Arvind Deshpande (CA)'),
      subject: subject || 'Academic Doubt',
      queryText,
      attachment: attachment || null,
      attachmentType: attachmentType || (attachment ? (attachment.endsWith('.mp4') ? 'video' : (attachment.endsWith('.pdf') ? 'pdf' : 'image')) : null),
      attachmentUrl: attachmentUrl || null,
      replyText: null,
      replyAttachment: null,
      replyAttachmentType: null,
      replyAttachmentUrl: null,
      studentResponse: null, // null | 'Satisfactory' | 'Not Understood Yet'
      studentFeedbackNote: '',
      respondedAt: null,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };

    this.queries.unshift(newQuery);
    this._save('imp_queries_v5', this.queries);
    dbSaveQuery(newQuery);
    this.notify();
    return newQuery;
  }

  replyQuery(queryId, { replyText, replyAttachment, replyAttachmentType, replyAttachmentUrl }) {
    const query = this.queries.find(q => q.id === queryId);
    if (query) {
      query.replyText = replyText;
      if (replyAttachment) query.replyAttachment = replyAttachment;
      query.replyAttachmentType = replyAttachmentType || (replyAttachment ? (replyAttachment.endsWith('.mp4') ? 'video' : 'pdf') : null);
      if (replyAttachmentUrl) query.replyAttachmentUrl = replyAttachmentUrl;
      query.status = 'Answered';
      this._save('imp_queries_v5', this.queries);
      dbSaveQuery(query);
      this.notify();
    }
  }

  submitQueryFeedback(queryId, { responseStatus, feedbackNote }) {
    const query = this.queries.find(q => q.id === queryId);
    if (query) {
      query.studentResponse = responseStatus; // 'Satisfactory' | 'Not Understood Yet'
      query.studentFeedbackNote = feedbackNote || '';
      query.respondedAt = new Date().toISOString().split('T')[0];
      this._save('imp_queries_v5', this.queries);
      dbSaveQuery(query);
      this.notify();
      return query;
    }
    return null;
  }

  // --- ACTIONS: RECRUITMENT ---

  addRecruitmentCandidate({ 
    name, 
    roleType, 
    post, 
    qualification, 
    experience, 
    phone, 
    email, 
    expectedPay, 
    demoLectureDate, 
    notes,
    branchPreference,
    whatsapp,
    address,
    resumeName,
    resumeSize,
    academicCertsList,
    nonAcademicCertsList,
    photoUrl,
    photoName,
    coverLetter
  }) {
    const candidateId = `IMP-REC-2026-${String(this.recruitment.length + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];

    const candidate = {
      id: candidateId,
      name,
      roleType: roleType || 'Teaching Faculty',
      post: post || 'Commerce Faculty',
      qualification: qualification || 'Qualified Professional',
      experience: experience || 'Experienced',
      phone: phone || '',
      whatsapp: whatsapp || phone || '',
      email: email || '',
      address: address || 'Nashik',
      expectedPay: expectedPay || '60% Sharing / Negotiable',
      demoLectureDate: demoLectureDate || 'To be scheduled',
      branchPreference: branchPreference || 'Both Centers (Satpur & Gangapur Road)',
      resumeName: resumeName || 'Resume_Attached.pdf',
      resumeSize: resumeSize || '2.4 MB',
      academicCertsList: academicCertsList || [],
      nonAcademicCertsList: nonAcademicCertsList || [],
      photoUrl: photoUrl || null,
      photoName: photoName || 'Passport_Photo.jpg',
      coverLetter: coverLetter || '',
      appliedDate: today,
      status: 'Applied',
      notes: notes || 'Online application received via "Join our Team" public recruitment portal.'
    };

    this.recruitment.unshift(candidate);
    this._save('imp_recruitment_v5', this.recruitment);
    dbSaveRecruitmentCandidate(candidate);
    this.notify();
    return candidate;
  }

  updateCandidateStatus(id, newStatus, notes = null) {
    const cand = this.recruitment.find(c => c.id === id);
    if (cand) {
      cand.status = newStatus;
      if (notes) cand.notes = notes;
      this._save('imp_recruitment_v5', this.recruitment);
      dbUpdateCandidateStatus(id, newStatus, notes);
      this.notify();
    }
  }

  // --- FINANCIAL & REMUNERATION LEDGER CALCULATIONS ---

  /**
   * 60% Teacher Remuneration Calculation:
   * Rule: "Fees share (60% of collection immediately shown as payable to particular subject teacher
   * as and when fee collection receipt is made daily basis), Total Due, Paid and Balance payable to teachers"
   */
  getTeacherRemunerationLedger() {
    const teachers = this.teachers;

    return teachers.map(t => {
      // Find all receipts where teacher is assigned or course matches
      const relevantReceipts = this.receipts.filter(r => 
        (r.teacherName && r.teacherName.includes(t.name.split(' ')[1])) ||
        (t.name.includes('Deshpande') && (r.courseId === 'c1' || r.courseId === 'c2' || r.courseId === 'c3' || r.courseId === 'c5')) ||
        (t.name.includes('Kulkarni') && r.courseId === 'c4') ||
        (t.name.includes('Sunita') && r.courseId === 'c6')
      );

      const totalCollections = relevantReceipts.reduce((acc, r) => acc + (r.amount || 0), 0);
      const totalDue60 = Math.round(totalCollections * ((t.honorariumSharePercent || 60) / 100));

      // Paid honorarium vouchers to this teacher
      const paidVouchers = this.expenses.filter(e => 
        e.category.includes('Honorarium') && (e.payee.includes(t.name.split(' ')[1]) || e.description.includes(t.name.split(' ')[1]))
      );
      const totalPaid = paidVouchers.reduce((acc, e) => acc + (e.amount || 0), 0);
      const balancePayable = Math.max(0, totalDue60 - totalPaid);

      return {
        ...t,
        subject: t.assignedSubjects ? t.assignedSubjects.join(', ') : (t.subject || 'Commerce Subjects'),
        collectionsCount: relevantReceipts.length,
        totalCollections,
        totalDue60,
        totalPaid,
        balancePayable,
        receipts: relevantReceipts,
        vouchers: paidVouchers
      };
    });
  }

  /**
   * Common Expenditure Allocation Scheme:
   * Rule: Shared Overheads (% of Common Expenditure) must be calculated strictly in the
   * proportion of number of students enrolled in that unit (branch / course) relative to
   * total institute students.
   * Formula: Allocation % = (Student Count / Total Students) * 100
   */
  getCommonExpenseAllocationScheme() {
    const totalStudents = this.students.length || 1;

    // 1. All Common / Shared Expenses (Rent, Utilities, Shared ERP & Admin)
    const commonExpenses = this.expenses.filter(e => e.isCommon || e.courseId === 'common');
    const totalCommonExp = commonExpenses.reduce((acc, e) => acc + (e.amount || 0), 0);

    // 2. Central Shared Overheads (Cloud ERP, WhatsApp Gateway, Statutory Compliance where branchId === 'all')
    const centralSharedExpenses = this.expenses.filter(e => e.branchId === 'all' || (!e.branchId && (e.isCommon || e.courseId === 'common')));
    const totalCentralShared = centralSharedExpenses.reduce((acc, e) => acc + (e.amount || 0), 0);

    // 3. Course-wise allocation strictly based on enrolled student proportion
    let remainingCourseAlloc = totalCommonExp;
    const coursesAllocation = this.courses.map((course, idx) => {
      const courseStudents = this.students.filter(s => s.courseId === course.id);
      const studentCount = courseStudents.length;
      const ratio = studentCount / totalStudents;
      const pct = Number(((studentCount / totalStudents) * 100).toFixed(1));
      // For last course, allocate remaining to avoid rounding discrepancy
      const allocatedAmount = (idx === this.courses.length - 1)
        ? remainingCourseAlloc
        : Math.round(totalCommonExp * ratio);
      remainingCourseAlloc -= allocatedAmount;

      return {
        courseId: course.id,
        courseName: course.name,
        code: course.code,
        studentCount,
        students: courseStudents,
        ratio,
        pct,
        allocatedAmount,
        formulaStr: `${studentCount} / ${totalStudents} (${pct}%)`
      };
    });

    // 4. Branch-wise allocation strictly based on enrolled student proportion
    const branchMeta = [
      { id: 'b1', name: 'Branch 1: Satpur Colony Center', landmark: 'Near Saptashrungi Mandir', phone: '+91 93707 28283' },
      { id: 'b2', name: 'Branch 2: Gangapur Road Center', landmark: 'Jehan Circle, Bramhecha Estate', phone: '+91 96996 57599' }
    ];

    let remainingCentralAlloc = totalCentralShared;
    const branchesAllocation = branchMeta.map((b, idx) => {
      const branchStudents = this.students.filter(s => s.branchId === b.id);
      const studentCount = branchStudents.length;
      const ratio = studentCount / totalStudents;
      const pct = Number(((studentCount / totalStudents) * 100).toFixed(1));
      
      const allocatedCentral = (idx === branchMeta.length - 1)
        ? remainingCentralAlloc
        : Math.round(totalCentralShared * ratio);
      remainingCentralAlloc -= allocatedCentral;

      // Facility-specific common expenses (Rent & Utilities)
      const facilityExpenses = this.expenses.filter(e => e.branchId === b.id && (e.isCommon || e.category.includes('Rent') || e.category.includes('Utilities')));
      const totalFacility = facilityExpenses.reduce((acc, e) => acc + (e.amount || 0), 0);

      return {
        ...b,
        studentCount,
        students: branchStudents,
        ratio,
        pct,
        allocatedCentral,
        facilityExpenses,
        totalFacility,
        totalAllocatedOverheads: totalFacility + allocatedCentral,
        formulaStr: `${studentCount} / ${totalStudents} students (${pct}%)`
      };
    });

    return {
      totalStudents,
      totalCommonExp,
      totalCentralShared,
      coursesAllocation,
      branchesAllocation,
      commonExpenses,
      centralSharedExpenses
    };
  }

  /**
   * Separate Profit & Loss Accounts for Two Branches:
   * Branch 1: Satpur Colony Center
   * Branch 2: Gangapur Road Center
   * 
   * Includes side-by-side comparison & individual center P&L accounts with:
   * - Revenue (Fee Collections)
   * - 60% Teacher Honorarium Share
   * - Direct Course Expenses (Materials, Printing)
   * - Branch Facility Overheads (Rent & Utilities)
   * - Allocated Shared Head-Office Overheads (in student proportion)
   * - Net Center Surplus (EBITDA) & Margin %
   */
  getBranchProfitAndLossReport() {
    const allocationScheme = this.getCommonExpenseAllocationScheme();
    const totalStudents = allocationScheme.totalStudents;
    const totalCentralShared = allocationScheme.totalCentralShared;

    const branchesMeta = [
      {
        id: 'b1',
        name: 'Branch 1: Satpur Colony Center',
        shortName: 'Satpur Colony',
        landmark: 'Near Saptashrungi Mandir',
        address: '310, MHB Colony, Near Saptashrungi Mandir, Satpur, Nashik 422007',
        phone: '+91 93707 28283',
        timing: 'Morning 7:00 AM - 1:00 PM | Evening 4:00 PM - 8:30 PM',
        color: '#60a5fa',
        badgeBg: 'rgba(59, 130, 246, 0.15)',
        badgeBorder: 'rgba(59, 130, 246, 0.35)'
      },
      {
        id: 'b2',
        name: 'Branch 2: Gangapur Road Center',
        shortName: 'Gangapur Road',
        landmark: 'Jehan Circle, Bramhecha Estate',
        address: '6, Laxmi Park B, Bramhecha Estate, Jehan Circle, Gangapur Road, Nashik-422013',
        phone: '+91 96996 57599',
        timing: 'Morning 7:30 AM - 1:30 PM | Evening 4:30 PM - 9:00 PM',
        color: '#34d399',
        badgeBg: 'rgba(16, 185, 129, 0.15)',
        badgeBorder: 'rgba(16, 185, 129, 0.35)'
      }
    ];

    let remainingSharedOverhead = totalCentralShared;

    const branchReports = branchesMeta.map((branch, idx) => {
      // 1. Students in this branch
      const branchStudents = this.students.filter(s => s.branchId === branch.id);
      const studentCount = branchStudents.length;
      const studentSharePct = totalStudents > 0 ? Number(((studentCount / totalStudents) * 100).toFixed(1)) : 0;

      // 2. Fees & Receipts for this branch
      const branchReceipts = this.receipts.filter(r => 
        r.branchId === branch.id || branchStudents.some(s => s.id === r.studentId)
      );
      const totalFeesAssessed = branchStudents.reduce((acc, s) => acc + (s.totalFees || 0), 0);
      const feeCollections = branchReceipts.reduce((acc, r) => acc + (r.amount || 0), 0);
      const dueFees = branchStudents.reduce((acc, s) => acc + (s.dueFees || 0), 0);
      const teacherFeeShare60 = Math.round(feeCollections * 0.60);

      // 3. Direct Course Expenses tagged to this branch
      const directExpensesList = this.expenses.filter(e => 
        !e.isCommon && e.courseId !== 'common' && e.branchId === branch.id && !e.category.includes('Honorarium')
      );
      const directExpenses = directExpensesList.reduce((acc, e) => acc + (e.amount || 0), 0);

      // 4. Branch Facility Overheads (Rent & Utilities)
      const facilityRentList = this.expenses.filter(e => 
        e.branchId === branch.id && e.category.includes('Rent')
      );
      const facilityRent = facilityRentList.reduce((acc, e) => acc + (e.amount || 0), 0);

      const facilityUtilitiesList = this.expenses.filter(e => 
        e.branchId === branch.id && (e.category.includes('Utilities') || e.category.includes('Broadband'))
      );
      const facilityUtilities = facilityUtilitiesList.reduce((acc, e) => acc + (e.amount || 0), 0);
      const totalFacilityOverheads = facilityRent + facilityUtilities;

      // 5. Allocated Shared Head-Office Overheads (Proportionate to number of students)
      const allocatedSharedOverheads = (idx === branchesMeta.length - 1)
        ? remainingSharedOverhead
        : Math.round(totalCentralShared * (studentCount / totalStudents));
      remainingSharedOverhead -= allocatedSharedOverheads;

      // 6. Total Branch Costs & Net Surplus
      const totalBranchOverheads = totalFacilityOverheads + allocatedSharedOverheads;
      const totalOperatingCost = teacherFeeShare60 + directExpenses + totalBranchOverheads;
      const netSurplus = feeCollections - totalOperatingCost;
      const profitMargin = feeCollections > 0 ? Math.round((netSurplus / feeCollections) * 100) : 0;
      const recoveryRate = totalFeesAssessed > 0 ? Math.round((feeCollections / totalFeesAssessed) * 100) : 0;

      // 7. Course-level breakdown inside this branch
      const branchCourses = this.courses.filter(c => 
        branchStudents.some(s => s.courseId === c.id)
      ).map(c => {
        const cStudents = branchStudents.filter(s => s.courseId === c.id);
        const cReceipts = branchReceipts.filter(r => r.courseId === c.id);
        const cAssessed = cStudents.reduce((acc, s) => acc + (s.totalFees || 0), 0);
        const cRevenue = cReceipts.reduce((acc, r) => acc + (r.amount || 0), 0);
        const cTeacherShare = Math.round(cRevenue * 0.60);
        const cDirect = this.expenses
          .filter(e => !e.isCommon && e.courseId === c.id && e.branchId === branch.id && !e.category.includes('Honorarium'))
          .reduce((acc, e) => acc + (e.amount || 0), 0);
        // Student proportion within branch
        const cAllocOverhead = Math.round(totalBranchOverheads * (cStudents.length / (studentCount || 1)));
        const cCost = cTeacherShare + cDirect + cAllocOverhead;
        const cNet = cRevenue - cCost;
        const cMargin = cRevenue > 0 ? Math.round((cNet / cRevenue) * 100) : 0;

        return {
          course: c,
          studentCount: cStudents.length,
          students: cStudents,
          assessed: cAssessed,
          revenue: cRevenue,
          teacherShare: cTeacherShare,
          directExpenses: cDirect,
          allocatedOverheads: cAllocOverhead,
          totalCost: cCost,
          netSurplus: cNet,
          profitMargin: cMargin
        };
      });

      return {
        ...branch,
        studentCount,
        studentSharePct,
        students: branchStudents,
        totalFeesAssessed,
        feeCollections,
        dueFees,
        recoveryRate,
        teacherFeeShare60,
        directExpenses,
        directExpensesList,
        facilityRent,
        facilityRentList,
        facilityUtilities,
        facilityUtilitiesList,
        totalFacilityOverheads,
        allocatedSharedOverheads,
        totalBranchOverheads,
        totalOperatingCost,
        netSurplus,
        profitMargin,
        courses: branchCourses,
        receipts: branchReceipts
      };
    });

    // 8. Consolidated Comparison
    const consolidated = {
      name: 'Consolidated Institute Total',
      studentCount: branchReports.reduce((acc, b) => acc + b.studentCount, 0),
      studentSharePct: 100,
      totalFeesAssessed: branchReports.reduce((acc, b) => acc + b.totalFeesAssessed, 0),
      feeCollections: branchReports.reduce((acc, b) => acc + b.feeCollections, 0),
      dueFees: branchReports.reduce((acc, b) => acc + b.dueFees, 0),
      teacherFeeShare60: branchReports.reduce((acc, b) => acc + b.teacherFeeShare60, 0),
      directExpenses: branchReports.reduce((acc, b) => acc + b.directExpenses, 0),
      facilityRent: branchReports.reduce((acc, b) => acc + b.facilityRent, 0),
      facilityUtilities: branchReports.reduce((acc, b) => acc + b.facilityUtilities, 0),
      totalFacilityOverheads: branchReports.reduce((acc, b) => acc + b.totalFacilityOverheads, 0),
      allocatedSharedOverheads: totalCentralShared,
      totalBranchOverheads: branchReports.reduce((acc, b) => acc + b.totalBranchOverheads, 0),
      totalOperatingCost: branchReports.reduce((acc, b) => acc + b.totalOperatingCost, 0),
      netSurplus: branchReports.reduce((acc, b) => acc + b.netSurplus, 0)
    };
    consolidated.profitMargin = consolidated.feeCollections > 0
      ? Math.round((consolidated.netSurplus / consolidated.feeCollections) * 100)
      : 0;
    consolidated.recoveryRate = consolidated.totalFeesAssessed > 0
      ? Math.round((consolidated.feeCollections / consolidated.totalFeesAssessed) * 100)
      : 0;

    return {
      branches: branchReports,
      consolidated,
      allocationScheme
    };
  }

  /**
   * Course-wise and Integrated P&L Accounting:
   * Common overheads are allocated strictly in proportion to enrolled student counts:
   * Allocated Common = Total Common Expenses * (Course Student Count / Total Students)
   */
  getProfitAndLossReport(branchFilter = 'all') {
    const totalStudents = this.students.length || 1;

    // 1. Total Common Expenses to be allocated
    const commonExpenses = this.expenses.filter(e => e.isCommon || e.courseId === 'common');
    const totalCommonExp = commonExpenses.reduce((acc, e) => acc + e.amount, 0);

    // 2. Course-wise breakdown (Student-Proportionate Allocation)
    let remainingCommon = totalCommonExp;
    const courseWise = this.courses.map((course, idx) => {
      const allCourseStudents = this.students.filter(s => s.courseId === course.id);
      const courseStudents = branchFilter === 'all' 
        ? allCourseStudents 
        : allCourseStudents.filter(s => s.branchId === branchFilter);

      const allCourseReceipts = this.receipts.filter(r => r.courseId === course.id);
      const courseReceipts = branchFilter === 'all'
        ? allCourseReceipts
        : allCourseReceipts.filter(r => r.branchId === branchFilter);
      
      const totalFeesAssessed = courseStudents.reduce((acc, s) => acc + (s.totalFees || 0), 0);
      const feeCollections = courseReceipts.reduce((acc, r) => acc + (r.amount || 0), 0);
      const teacherFeeShare60 = Math.round(feeCollections * 0.60);

      // Direct expenses strictly tagged to this course
      const directExpenses = this.expenses
        .filter(e => !e.isCommon && e.courseId === course.id && !e.category.includes('Honorarium') && (branchFilter === 'all' || e.branchId === branchFilter))
        .reduce((acc, e) => acc + e.amount, 0);

      // Allocated common expenses strictly based on number of students proportion
      const studentRatio = courseStudents.length / totalStudents;
      const allocatedCommon = (idx === this.courses.length - 1 && branchFilter === 'all')
        ? remainingCommon
        : Math.round(totalCommonExp * studentRatio);
      remainingCommon -= allocatedCommon;

      const totalCourseCost = teacherFeeShare60 + directExpenses + allocatedCommon;
      const netProfit = feeCollections - totalCourseCost;
      const profitMargin = feeCollections > 0 ? Math.round((netProfit / feeCollections) * 100) : 0;

      return {
        course,
        studentCount: courseStudents.length,
        studentRatio,
        studentPct: Number(((courseStudents.length / totalStudents) * 100).toFixed(1)),
        totalFeesAssessed,
        feeCollections,
        teacherFeeShare60,
        directExpenses,
        allocatedCommon,
        totalCourseCost,
        netProfit,
        profitMargin
      };
    });

    // 3. Integrated Total
    const integrated = {
      totalAssessed: courseWise.reduce((acc, c) => acc + c.totalFeesAssessed, 0),
      totalRevenue: courseWise.reduce((acc, c) => acc + c.feeCollections, 0),
      totalTeacherShare: courseWise.reduce((acc, c) => acc + c.teacherFeeShare60, 0),
      totalDirectExpenses: courseWise.reduce((acc, c) => acc + c.directExpenses, 0),
      totalCommonExpenses: totalCommonExp,
      totalExpensesOverall: courseWise.reduce((acc, c) => acc + c.totalCourseCost, 0),
      netInstituteSurplus: courseWise.reduce((acc, c) => acc + c.netProfit, 0)
    };
    integrated.overallMargin = integrated.totalRevenue > 0 ? Math.round((integrated.netInstituteSurplus / integrated.totalRevenue) * 100) : 0;

    return { courseWise, integrated };
  }
}

export const state = new AppState();
