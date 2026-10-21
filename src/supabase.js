/* Supabase Backend Integration Client & Data Services
   Imperial Commerce Tutorials, Nashik
   Project: https://olkfyupywipvxlwsfmzc.supabase.co
*/

import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://olkfyupywipvxlwsfmzc.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sa2Z5dXB5d2lwdnhsd3NmbXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0MDc2MTQsImV4cCI6MjEwNzk4MzYxNH0.vVG5nNN0qjucJ-a08_WQLGSWw3ZI1R_-Qdwha7Zd8KU';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_bPYJ_X7ffAcgckLyMOdg8Q_ermkOnGo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Helper: Check connection and measure ping latency
export async function testConnection() {
  const start = Date.now();
  try {
    const { count, error } = await supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true });
    
    if (error) throw error;
    const latency = Date.now() - start;
    return { ok: true, latency, message: `Connected (${latency}ms)` };
  } catch (err) {
    console.error('Supabase connection check failed:', err);
    return { ok: false, error: err.message, latency: -1 };
  }
}

// -------------------------------------------------------------
// 1. ENQUIRIES SERVICE
// -------------------------------------------------------------
export async function dbSaveEnquiry(enq) {
  try {
    const row = {
      id: enq.id || `enq-${Date.now()}`,
      date: enq.date || new Date().toISOString().split('T')[0],
      student_name: enq.studentName || enq.student_name,
      parent_name: enq.parentName || enq.parent_name || '',
      phone: enq.phone,
      school: enq.school || '',
      course_interested: enq.courseInterested || enq.course_interested || '',
      course_id: enq.courseId || enq.course_id || 'c2',
      branch: enq.branch || 'Satpur Colony Center',
      subjects: enq.subjects || '',
      status: enq.status || 'persuaded',
      reason: enq.reason || null,
      counselor_notes: enq.counselorNotes || enq.counselor_notes || '',
      follow_up_date: enq.followUpDate || enq.follow_up_date || '',
      source: enq.source || 'website'
    };

    const { data, error } = await supabase
      .from('enquiries')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save enquiry in Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function dbFetchEnquiries() {
  try {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(r => ({
      id: r.id,
      date: r.date,
      studentName: r.student_name,
      parentName: r.parent_name,
      phone: r.phone,
      school: r.school,
      courseInterested: r.course_interested,
      courseId: r.course_id,
      branch: r.branch,
      subjects: r.subjects,
      status: r.status,
      reason: r.reason,
      counselorNotes: r.counselor_notes,
      followUpDate: r.follow_up_date,
      source: r.source
    }));
  } catch (err) {
    console.error('Failed to fetch enquiries from Supabase:', err);
    return null;
  }
}

export async function dbUpdateEnquiryStatus(id, newStatus, reason = null) {
  try {
    const updates = { status: newStatus };
    if (reason !== undefined) updates.reason = reason;

    const { data, error } = await supabase
      .from('enquiries')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to update enquiry in Supabase:', err);
    return { success: false, error: err.message };
  }
}

// -------------------------------------------------------------
// 2. RECRUITMENT CANDIDATES SERVICE
// -------------------------------------------------------------
export async function dbSaveRecruitmentCandidate(cand) {
  try {
    const row = {
      id: cand.id,
      applied_date: cand.appliedDate || cand.applied_date || new Date().toISOString().split('T')[0],
      name: cand.name,
      role_type: cand.roleType || cand.role_type,
      post: cand.post,
      qualification: cand.qualification,
      experience: cand.experience,
      phone: cand.phone,
      whatsapp: cand.whatsapp || cand.phone,
      email: cand.email,
      address: cand.address,
      expected_pay: cand.expectedPay || cand.expected_pay,
      demo_lecture_date: cand.demoLectureDate || cand.demo_lecture_date,
      branch_preference: cand.branchPreference || cand.branch_preference,
      resume_name: cand.resumeName || cand.resume_name,
      resume_size: cand.resumeSize || cand.resume_size,
      academic_certs_list: cand.academicCertsList || cand.academic_certs_list || [],
      non_academic_certs_list: cand.nonAcademicCertsList || cand.non_academic_certs_list || [],
      photo_url: cand.photoUrl || cand.photo_url || null,
      photo_name: cand.photoName || cand.photo_name || null,
      cover_letter: cand.coverLetter || cand.cover_letter || '',
      status: cand.status || 'Applied',
      notes: cand.notes || ''
    };

    const { data, error } = await supabase
      .from('recruitment_candidates')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save candidate in Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function dbFetchRecruitmentCandidates() {
  try {
    const { data, error } = await supabase
      .from('recruitment_candidates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(r => ({
      id: r.id,
      name: r.name,
      roleType: r.role_type,
      post: r.post,
      qualification: r.qualification,
      experience: r.experience,
      phone: r.phone,
      whatsapp: r.whatsapp,
      email: r.email,
      address: r.address,
      expectedPay: r.expected_pay,
      demoLectureDate: r.demo_lecture_date,
      branchPreference: r.branch_preference,
      resumeName: r.resume_name,
      resumeSize: r.resume_size,
      academicCertsList: r.academic_certs_list || [],
      nonAcademicCertsList: r.non_academic_certs_list || [],
      photoUrl: r.photo_url,
      photoName: r.photo_name,
      coverLetter: r.cover_letter,
      appliedDate: r.applied_date,
      status: r.status,
      notes: r.notes
    }));
  } catch (err) {
    console.error('Failed to fetch recruitment candidates from Supabase:', err);
    return null;
  }
}

export async function dbUpdateCandidateStatus(id, newStatus, notes = null) {
  try {
    const updates = { status: newStatus };
    if (notes) updates.notes = notes;

    const { data, error } = await supabase
      .from('recruitment_candidates')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to update candidate status in Supabase:', err);
    return { success: false, error: err.message };
  }
}

// -------------------------------------------------------------
// 3. RECEIPTS (FEES) SERVICE
// -------------------------------------------------------------
export async function dbSaveReceipt(r) {
  try {
    const row = {
      receipt_no: r.receiptNo || r.receipt_no,
      date: r.date || new Date().toISOString().split('T')[0],
      student_id: r.studentId || r.student_id,
      student_name: r.studentName || r.student_name,
      roll_no: r.rollNo || r.roll_no,
      course_id: r.courseId || r.course_id,
      course_name: r.courseName || r.course_name,
      branch_id: r.branchId || r.branch_id || 'b1',
      branch_name: r.branchName || r.branch_name || 'Branch 1: Satpur Colony Center',
      subject: r.subject || 'Commerce Subjects',
      teacher_name: r.teacherName || r.teacher_name,
      amount: Number(r.amount) || 0,
      teacher_share_60: Number(r.teacherShare60 || r.teacher_share_60) || Math.round((Number(r.amount) || 0) * 0.6),
      mode: r.mode || 'Online (Bank UPI QR)',
      txn_id: r.txnId || r.txn_id,
      received_by: r.receivedBy || r.received_by,
      notes: r.notes || 'Tuition Fee Payment'
    };

    const { data, error } = await supabase
      .from('receipts')
      .upsert(row, { onConflict: 'receipt_no' })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save receipt in Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function dbFetchReceipts() {
  try {
    const { data, error } = await supabase
      .from('receipts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(r => ({
      receiptNo: r.receipt_no,
      date: r.date,
      studentId: r.student_id,
      studentName: r.student_name,
      rollNo: r.roll_no,
      courseId: r.course_id,
      courseName: r.course_name,
      branchId: r.branch_id,
      branchName: r.branch_name,
      subject: r.subject,
      teacherName: r.teacher_name,
      amount: Number(r.amount),
      teacherShare60: Number(r.teacher_share_60),
      mode: r.mode,
      txnId: r.txn_id,
      receivedBy: r.received_by,
      notes: r.notes
    }));
  } catch (err) {
    console.error('Failed to fetch receipts from Supabase:', err);
    return null;
  }
}

// -------------------------------------------------------------
// 4. EXPENSES (VOUCHERS) SERVICE
// -------------------------------------------------------------
export async function dbSaveExpense(e) {
  try {
    const row = {
      voucher_no: e.voucherNo || e.voucher_no,
      date: e.date || new Date().toISOString().split('T')[0],
      payee: e.payee,
      category: e.category,
      amount: Number(e.amount) || 0,
      mode: e.mode || 'Cheque / Bank Transfer',
      reference: e.reference,
      authorized_by: e.authorizedBy || e.authorized_by,
      description: e.description,
      course_id: e.courseId || e.course_id || 'common',
      is_common: e.isCommon !== undefined ? e.isCommon : (e.courseId === 'common'),
      branch_id: e.branchId || e.branch_id || 'b1',
      branch_name: e.branchName || e.branch_name || 'Branch 1: Satpur Colony Center',
      allocations: e.allocations || null
    };

    const { data, error } = await supabase
      .from('expenses')
      .upsert(row, { onConflict: 'voucher_no' })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save expense in Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function dbFetchExpenses() {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(e => ({
      voucherNo: e.voucher_no,
      date: e.date,
      payee: e.payee,
      category: e.category,
      amount: Number(e.amount),
      mode: e.mode,
      reference: e.reference,
      authorizedBy: e.authorized_by,
      description: e.description,
      courseId: e.course_id,
      isCommon: e.is_common,
      branchId: e.branch_id,
      branchName: e.branch_name,
      allocations: e.allocations
    }));
  } catch (err) {
    console.error('Failed to fetch expenses from Supabase:', err);
    return null;
  }
}

// -------------------------------------------------------------
// 5. LEAVES SERVICE
// -------------------------------------------------------------
export async function dbSaveLeave(l) {
  try {
    const row = {
      id: l.id,
      student_id: l.studentId || l.student_id,
      student_name: l.studentName || l.student_name,
      course_name: l.courseName || l.course_name,
      applied_date: l.appliedDate || l.applied_date || new Date().toISOString().split('T')[0],
      leave_date: l.leaveDate || l.leave_date,
      reason: l.reason,
      status: l.status || 'Pending Review',
      director_notes: l.directorNotes || l.director_notes || ''
    };

    const { data, error } = await supabase
      .from('leaves')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save leave in Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function dbFetchLeaves() {
  try {
    const { data, error } = await supabase
      .from('leaves')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(l => ({
      id: l.id,
      studentId: l.student_id,
      studentName: l.student_name,
      courseName: l.course_name,
      appliedDate: l.applied_date,
      leaveDate: l.leave_date,
      reason: l.reason,
      status: l.status,
      directorNotes: l.director_notes
    }));
  } catch (err) {
    console.error('Failed to fetch leaves from Supabase:', err);
    return null;
  }
}

export async function dbUpdateLeaveStatus(id, status, notes = '') {
  try {
    const updates = { status };
    if (notes) updates.director_notes = notes;

    const { data, error } = await supabase
      .from('leaves')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to update leave in Supabase:', err);
    return { success: false, error: err.message };
  }
}

// -------------------------------------------------------------
// 6. QUERIES (ACADEMIC DOUBTS) SERVICE
// -------------------------------------------------------------
export async function dbSaveQuery(q) {
  try {
    const row = {
      id: q.id,
      date: q.date || new Date().toISOString().split('T')[0],
      student_id: q.studentId || q.student_id,
      student_name: q.studentName || q.student_name,
      course_id: q.courseId || q.course_id,
      course_name: q.courseName || q.course_name,
      recipient: q.recipient || 'Teacher',
      teacher_name: q.teacherName || q.teacher_name,
      subject: q.subject,
      query_text: q.queryText || q.query_text,
      attachment: q.attachment || null,
      attachment_type: q.attachmentType || q.attachment_type || null,
      attachment_url: q.attachmentUrl || q.attachment_url || null,
      reply_text: q.replyText || q.reply_text || null,
      reply_attachment: q.replyAttachment || q.reply_attachment || null,
      reply_attachment_type: q.replyAttachmentType || q.reply_attachment_type || null,
      reply_attachment_url: q.replyAttachmentUrl || q.reply_attachment_url || null,
      student_response: q.studentResponse || q.student_response || null,
      student_feedback_note: q.studentFeedbackNote || q.student_feedback_note || '',
      responded_at: q.respondedAt || q.responded_at || null,
      status: q.status || 'Pending'
    };

    const { data, error } = await supabase
      .from('queries')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save query in Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function dbFetchQueries() {
  try {
    const { data, error } = await supabase
      .from('queries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(q => ({
      id: q.id,
      date: q.date,
      studentId: q.student_id,
      studentName: q.student_name,
      courseId: q.course_id,
      courseName: q.course_name,
      recipient: q.recipient,
      teacherName: q.teacher_name,
      subject: q.subject,
      queryText: q.query_text,
      attachment: q.attachment,
      attachmentType: q.attachment_type,
      attachmentUrl: q.attachment_url,
      replyText: q.reply_text,
      replyAttachment: q.reply_attachment,
      replyAttachmentType: q.reply_attachment_type,
      replyAttachmentUrl: q.reply_attachment_url,
      studentResponse: q.student_response,
      studentFeedbackNote: q.student_feedback_note,
      respondedAt: q.responded_at,
      status: q.status
    }));
  } catch (err) {
    console.error('Failed to fetch queries from Supabase:', err);
    return null;
  }
}

// -------------------------------------------------------------
// 7. HOMEWORKS SERVICE
// -------------------------------------------------------------
export async function dbSaveHomework(hw) {
  try {
    const row = {
      id: hw.id,
      course_id: hw.courseId || hw.course_id,
      subject: hw.subject,
      title: hw.title,
      assigned_date: hw.assignedDate || hw.assigned_date || new Date().toISOString().split('T')[0],
      due_date: hw.dueDate || hw.due_date,
      assigned_by: hw.assignedBy || hw.assigned_by,
      description: hw.description,
      submissions: hw.submissions || []
    };

    const { data, error } = await supabase
      .from('homeworks')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save homework in Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function dbFetchHomeworks() {
  try {
    const { data, error } = await supabase
      .from('homeworks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(h => ({
      id: h.id,
      courseId: h.course_id,
      subject: h.subject,
      title: h.title,
      assignedDate: h.assigned_date,
      dueDate: h.due_date,
      assignedBy: h.assigned_by,
      description: h.description,
      submissions: h.submissions || []
    }));
  } catch (err) {
    console.error('Failed to fetch homeworks from Supabase:', err);
    return null;
  }
}

// -------------------------------------------------------------
// 8. EXAMS SERVICE
// -------------------------------------------------------------
export async function dbSaveExam(exam) {
  try {
    const row = {
      id: exam.id,
      title: exam.title,
      course_id: exam.courseId || exam.course_id,
      course_name: exam.courseName || exam.course_name,
      subject: exam.subject,
      exam_type: exam.examType || exam.exam_type,
      date: exam.date || new Date().toISOString().split('T')[0],
      max_marks: Number(exam.maxMarks || exam.max_marks) || 50,
      question_paper_pdf: exam.questionPaperPdf || exam.question_paper_pdf || '',
      google_form_link: exam.googleFormLink || exam.google_form_link || '',
      published_by: exam.publishedBy || exam.published_by || '',
      submissions: exam.submissions || []
    };

    const { data, error } = await supabase
      .from('exams')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save exam in Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function dbFetchExams() {
  try {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(e => ({
      id: e.id,
      title: e.title,
      courseId: e.course_id,
      courseName: e.course_name,
      subject: e.subject,
      examType: e.exam_type,
      date: e.date,
      maxMarks: Number(e.max_marks),
      questionPaperPdf: e.question_paper_pdf,
      googleFormLink: e.google_form_link,
      publishedBy: e.published_by,
      submissions: e.submissions || []
    }));
  } catch (err) {
    console.error('Failed to fetch exams from Supabase:', err);
    return null;
  }
}

// -------------------------------------------------------------
// 9. PORTIONS & LESSON NOTES SERVICE
// -------------------------------------------------------------
export async function dbSavePortion(p) {
  try {
    const row = {
      id: p.id,
      date: p.date || new Date().toISOString().split('T')[0],
      course_id: p.courseId || p.course_id,
      course_name: p.courseName || p.course_name,
      subject: p.subject,
      teacher: p.teacher,
      topic_covered: p.topicCovered || p.topic_covered,
      completion_percent: Number(p.completionPercent || p.completion_percent) || 0,
      next_lecture_topic: p.nextLectureTopic || p.next_lecture_topic || '',
      media_type: p.mediaType || p.media_type || 'none',
      media_url: p.mediaUrl || p.media_url || '',
      media_name: p.mediaName || p.media_name || '',
      media_size: p.mediaSize || p.media_size || '',
      status: p.status || 'Completed'
    };

    const { data, error } = await supabase
      .from('portions')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save portion in Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function dbFetchPortions() {
  try {
    const { data, error } = await supabase
      .from('portions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(p => ({
      id: p.id,
      date: p.date,
      courseId: p.course_id,
      courseName: p.course_name,
      subject: p.subject,
      teacher: p.teacher,
      topicCovered: p.topic_covered,
      completionPercent: Number(p.completion_percent),
      nextLectureTopic: p.next_lecture_topic,
      mediaType: p.media_type,
      mediaUrl: p.media_url,
      mediaName: p.media_name,
      mediaSize: p.media_size,
      status: p.status
    }));
  } catch (err) {
    console.error('Failed to fetch portions from Supabase:', err);
    return null;
  }
}

// -------------------------------------------------------------
// 10. STUDENTS SERVICE
// -------------------------------------------------------------
export async function dbSaveStudent(s) {
  try {
    const row = {
      id: s.id,
      name: s.name,
      roll_no: s.rollNo || s.roll_no,
      course_id: s.courseId || s.course_id,
      course_name: s.courseName || s.course_name,
      branch_id: s.branchId || s.branch_id || 'b1',
      branch_name: s.branchName || s.branch_name || 'Branch 1: Satpur Colony Center',
      phone: s.phone,
      parent_name: s.parentName || s.parent_name,
      parent_phone: s.parentPhone || s.parent_phone,
      assigned_teacher: s.assignedTeacher || s.assigned_teacher,
      subjects_chosen: s.subjectsChosen || s.subjects_chosen || [],
      total_fees: Number(s.totalFees || s.total_fees) || 0,
      paid_fees: Number(s.paidFees || s.paid_fees) || 0,
      due_fees: Number(s.dueFees || s.due_fees) || 0,
      status: s.status || 'Partial',
      today_attendance: s.todayAttendance || s.today_attendance || 'Present',
      homework_completed: Boolean(s.homeworkCompleted),
      performance_marks: s.performanceMarks || s.performance_marks || {},
      batch: s.batch || ''
    };

    const { data, error } = await supabase
      .from('students')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save student in Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function dbFetchStudents() {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    return (data || []).map(s => ({
      id: s.id,
      name: s.name,
      rollNo: s.roll_no,
      courseId: s.course_id,
      courseName: s.course_name,
      branchId: s.branch_id,
      branchName: s.branch_name,
      phone: s.phone,
      parentName: s.parent_name,
      parentPhone: s.parent_phone,
      assignedTeacher: s.assigned_teacher,
      subjectsChosen: s.subjects_chosen || [],
      totalFees: Number(s.total_fees),
      paidFees: Number(s.paid_fees),
      dueFees: Number(s.due_fees),
      status: s.status,
      todayAttendance: s.today_attendance,
      homeworkCompleted: Boolean(s.homework_completed),
      performanceMarks: s.performance_marks || {},
      batch: s.batch
    }));
  } catch (err) {
    console.error('Failed to fetch students from Supabase:', err);
    return null;
  }
}

// -------------------------------------------------------------
// 11. TEACHERS SERVICE
// -------------------------------------------------------------
export async function dbSaveTeacher(t) {
  try {
    const row = {
      id: t.id,
      name: t.name,
      qualification: t.qualification,
      role: t.role,
      assigned_courses: t.assignedCourses || t.assigned_courses || [],
      assigned_subjects: t.assignedSubjects || t.assigned_subjects || [],
      honorarium_share_percent: Number(t.honorariumSharePercent || t.honorarium_share_percent) || 60,
      phone: t.phone || '',
      email: t.email || ''
    };

    const { data, error } = await supabase
      .from('teachers')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save teacher in Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function dbFetchTeachers() {
  try {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    return (data || []).map(t => ({
      id: t.id,
      name: t.name,
      qualification: t.qualification,
      role: t.role,
      assignedCourses: t.assigned_courses || [],
      assignedSubjects: t.assigned_subjects || [],
      honorariumSharePercent: Number(t.honorarium_share_percent),
      phone: t.phone,
      email: t.email
    }));
  } catch (err) {
    console.error('Failed to fetch teachers from Supabase:', err);
    return null;
  }
}

// -------------------------------------------------------------
// 12. COURSES SERVICE
// -------------------------------------------------------------
export async function dbSaveCourse(c) {
  try {
    const row = {
      id: c.id,
      code: c.code || '',
      name: c.name,
      level: c.level || '',
      board: c.board || '',
      branches: c.branches || '',
      fee_per_subject: Number(c.perSubjectFee || c.fee_per_subject) || 0,
      full_fee: Number(c.fullFee || c.full_fee) || 0,
      subjects_list: c.subjectsList || [],
      services_offered: c.servicesOffered || [],
      description: c.description || '',
      batch_info: c.batchInfo || '',
      created_by: c.createdBy || 'Director'
    };

    const { data, error } = await supabase
      .from('courses')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save course in Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function dbFetchCourses() {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    return (data || []).map(c => ({
      id: c.id,
      code: c.code,
      name: c.name,
      level: c.level,
      board: c.board,
      branches: c.branches,
      perSubjectFee: Number(c.fee_per_subject),
      fullFee: Number(c.full_fee),
      subjectsList: c.subjects_list || [],
      servicesOffered: c.services_offered || [],
      description: c.description,
      batchInfo: c.batch_info,
      createdBy: c.created_by
    }));
  } catch (err) {
    console.error('Failed to fetch courses from Supabase:', err);
    return null;
  }
}

export async function dbDeleteCourse(courseId) {
  try {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', courseId);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Failed to delete course from Supabase:', err);
    return { success: false, error: err.message };
  }
}

// -------------------------------------------------------------
// 13. SUBJECTS SERVICE
// -------------------------------------------------------------
export async function dbSaveSubject(s) {
  try {
    const row = {
      name: s.name,
      coverage: s.coverage || '',
      tag: s.tag || s.category || '',
      description: s.desc || s.description || '',
      fee_per_subject: Number(s.defaultFee || s.fee_per_subject) || 0,
      special_fee_rule: s.specialFeeRule || s.special_fee_rule || '',
      created_by: s.createdBy || 'Director'
    };

    const { data, error } = await supabase
      .from('subjects')
      .upsert(row, { onConflict: 'name' })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save subject in Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function dbFetchSubjects() {
  try {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return (data || []).map(s => ({
      name: s.name,
      category: s.tag || '',
      tag: s.tag || '',
      coverage: s.coverage || '',
      desc: s.description || '',
      defaultFee: Number(s.fee_per_subject),
      specialFeeRule: s.special_fee_rule || '',
      createdBy: s.created_by
    }));
  } catch (err) {
    console.error('Failed to fetch subjects from Supabase:', err);
    return null;
  }
}

export async function dbDeleteSubject(subjectName) {
  try {
    const { error } = await supabase
      .from('subjects')
      .delete()
      .eq('name', subjectName);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Failed to delete subject from Supabase:', err);
    return { success: false, error: err.message };
  }
}

// -------------------------------------------------------------
// 14. FEE STRUCTURES SERVICE
// -------------------------------------------------------------
export async function dbSaveFeeStructure(f) {
  try {
    const row = {
      id: f.id,
      branch_name: f.branchName || '',
      course_name: f.courseName || '',
      fee_text: f.feeText || '',
      per_subject_fee: Number(f.perSubjectFee) || 0,
      special_notes: f.specialNotes || '',
      updated_by: f.updatedBy || 'Director'
    };

    const { data, error } = await supabase
      .from('fee_structures')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save fee structure in Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function dbFetchFeeStructures() {
  try {
    const { data, error } = await supabase
      .from('fee_structures')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    return (data || []).map(f => ({
      id: f.id,
      branchName: f.branch_name,
      branchId: (f.branch_name && f.branch_name.includes('Satpur')) ? 'b1' : 'b2',
      courseName: f.course_name,
      feeText: f.fee_text,
      perSubjectFee: Number(f.per_subject_fee),
      specialNotes: f.special_notes,
      updatedBy: f.updated_by
    }));
  } catch (err) {
    console.error('Failed to fetch fee structures from Supabase:', err);
    return null;
  }
}

export async function dbDeleteFeeStructure(feeId) {
  try {
    const { error } = await supabase
      .from('fee_structures')
      .delete()
      .eq('id', feeId);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Failed to delete fee structure from Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function dbDeleteStudent(studentId) {
  try {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', studentId);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Failed to delete student from Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function dbDeleteReceipt(receiptNo) {
  try {
    const { error } = await supabase
      .from('receipts')
      .delete()
      .eq('receipt_no', receiptNo);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Failed to delete receipt from Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function dbDeleteExpense(voucherNo) {
  try {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('voucher_no', voucherNo);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Failed to delete expense from Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function dbDeleteEnquiry(enquiryId) {
  try {
    const { error } = await supabase
      .from('enquiries')
      .delete()
      .eq('id', enquiryId);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Failed to delete enquiry from Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function dbDeleteRecruitmentCandidate(candidateId) {
  try {
    const { error } = await supabase
      .from('recruitment_candidates')
      .delete()
      .eq('id', candidateId);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Failed to delete recruitment candidate from Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function dbDeleteTeacher(teacherId) {
  try {
    const { error } = await supabase
      .from('teachers')
      .delete()
      .eq('id', teacherId);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Failed to delete teacher from Supabase:', err);
    return { success: false, error: err.message };
  }
}

// -------------------------------------------------------------
// BULK SEEDING & BACKUP EXPORT SERVICES
// -------------------------------------------------------------
export async function seedSupabaseIfEmpty(initialMockData) {
  try {
    const { count, error } = await supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true });

    if (!error && count === 0) {
      console.log('⚡ Supabase is empty. Seeding initial records to cloud...');

      // Seed enquiries
      if (initialMockData.INITIAL_ENQUIRIES) {
        for (const enq of initialMockData.INITIAL_ENQUIRIES) {
          await dbSaveEnquiry(enq);
        }
      }

      // Seed recruitment
      if (initialMockData.INITIAL_RECRUITMENT) {
        for (const cand of initialMockData.INITIAL_RECRUITMENT) {
          await dbSaveRecruitmentCandidate(cand);
        }
      }

      // Seed receipts
      if (initialMockData.INITIAL_RECEIPTS) {
        for (const r of initialMockData.INITIAL_RECEIPTS) {
          await dbSaveReceipt(r);
        }
      }

      // Seed expenses
      if (initialMockData.INITIAL_EXPENSES) {
        for (const exp of initialMockData.INITIAL_EXPENSES) {
          await dbSaveExpense(exp);
        }
      }

      // Seed portions
      if (initialMockData.INITIAL_PORTIONS) {
        for (const p of initialMockData.INITIAL_PORTIONS) {
          await dbSavePortion(p);
        }
      }

      // Seed homeworks
      if (initialMockData.INITIAL_HOMEWORKS) {
        for (const hw of initialMockData.INITIAL_HOMEWORKS) {
          await dbSaveHomework(hw);
        }
      }

      // Seed exams
      if (initialMockData.INITIAL_EXAMS) {
        for (const ex of initialMockData.INITIAL_EXAMS) {
          await dbSaveExam(ex);
        }
      }

      // Seed leaves
      if (initialMockData.INITIAL_LEAVES) {
        for (const lv of initialMockData.INITIAL_LEAVES) {
          await dbSaveLeave(lv);
        }
      }

      // Seed queries
      if (initialMockData.INITIAL_QUERIES) {
        for (const q of initialMockData.INITIAL_QUERIES) {
          await dbSaveQuery(q);
        }
      }

      // Seed students
      if (initialMockData.INITIAL_STUDENTS) {
        for (const s of initialMockData.INITIAL_STUDENTS) {
          await dbSaveStudent(s);
        }
      }

      // Seed teachers
      if (initialMockData.INITIAL_TEACHERS) {
        for (const t of initialMockData.INITIAL_TEACHERS) {
          await dbSaveTeacher(t);
        }
      }

      // Seed courses
      if (initialMockData.INITIAL_COURSES) {
        for (const c of initialMockData.INITIAL_COURSES) {
          await dbSaveCourse(c);
        }
      }

      // Seed subjects
      if (initialMockData.SUBJECTS_CATALOG) {
        for (const sub of initialMockData.SUBJECTS_CATALOG) {
          await dbSaveSubject(sub);
        }
      }

      // Seed fee structures
      if (initialMockData.INITIAL_FEE_STRUCTURES) {
        for (const f of initialMockData.INITIAL_FEE_STRUCTURES) {
          await dbSaveFeeStructure(f);
        }
      }

      console.log('✓ Supabase database seeded successfully with initial data!');
      return { seeded: true };
    }
    return { seeded: false, count };
  } catch (err) {
    console.error('Error in seedSupabaseIfEmpty:', err);
    return { seeded: false, error: err.message };
  }
}

// Full Cloud Retrieval / Export function
export async function exportAllCloudData() {
  try {
    const [
      enquiriesRes,
      recruitmentRes,
      receiptsRes,
      expensesRes,
      leavesRes,
      queriesRes,
      homeworksRes,
      examsRes,
      portionsRes,
      studentsRes,
      teachersRes
    ] = await Promise.all([
      supabase.from('enquiries').select('*'),
      supabase.from('recruitment_candidates').select('*'),
      supabase.from('receipts').select('*'),
      supabase.from('expenses').select('*'),
      supabase.from('leaves').select('*'),
      supabase.from('queries').select('*'),
      supabase.from('homeworks').select('*'),
      supabase.from('exams').select('*'),
      supabase.from('portions').select('*'),
      supabase.from('students').select('*'),
      supabase.from('teachers').select('*')
    ]);

    const cloudSnapshot = {
      exportedAt: new Date().toISOString(),
      institution: 'Imperial Commerce Tutorials, Nashik',
      supabaseProjectId: 'olkfyupywipvxlwsfmzc',
      counts: {
        enquiries: enquiriesRes.data?.length || 0,
        recruitmentCandidates: recruitmentRes.data?.length || 0,
        receipts: receiptsRes.data?.length || 0,
        expenses: expensesRes.data?.length || 0,
        leaves: leavesRes.data?.length || 0,
        queries: queriesRes.data?.length || 0,
        homeworks: homeworksRes.data?.length || 0,
        exams: examsRes.data?.length || 0,
        portions: portionsRes.data?.length || 0,
        students: studentsRes.data?.length || 0,
        teachers: teachersRes.data?.length || 0
      },
      data: {
        enquiries: enquiriesRes.data || [],
        recruitmentCandidates: recruitmentRes.data || [],
        receipts: receiptsRes.data || [],
        expenses: expensesRes.data || [],
        leaves: leavesRes.data || [],
        queries: queriesRes.data || [],
        homeworks: homeworksRes.data || [],
        exams: examsRes.data || [],
        portions: portionsRes.data || [],
        students: studentsRes.data || [],
        teachers: teachersRes.data || []
      }
    };

    return cloudSnapshot;
  } catch (err) {
    console.error('Failed to export cloud data:', err);
    throw err;
  }
}
