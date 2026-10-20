/* Imperial Commerce Tutorials - Student Portal
   Dedicated 6-Tab Scholar Dashboard */

import { state } from '../state.js';

export function renderStudentPortal(container, showToast) {
  const currentStudentId = state.currentStudentId || 's1';
  const student = state.students.find(s => s.id === currentStudentId) || state.students[0];
  const activeTab = state.currentStudentTab || 'notes';

  const tabs = [
    { id: 'notes', label: '1. Daily Teaching Notes', icon: '📖' },
    { id: 'homework', label: '2. Assigned Homework', icon: '📝' },
    { id: 'leave', label: '3. Leave Application (2-Day Rule)', icon: '🗓️' },
    { id: 'queries', label: '4. Raise Doubts to Teacher/Director', icon: '💬' },
    { id: 'exams', label: '5. Exams & PDF Submission', icon: '🎯' },
    { id: 'performance', label: '6. Attendance & Test Marks', icon: '🏆' }
  ];

  const currentTabObj = tabs.find(t => t.id === activeTab) || tabs[0];

  container.innerHTML = `
    <div class="portal-container" style="max-width: 1560px; margin: 0 auto; padding: 1.5rem 1.5rem 5rem; display: grid; grid-template-columns: 280px 1fr; gap: 1.75rem; align-items: start;">
      <!-- Scholar Banner (Full width across top) -->
      <div class="card" style="grid-column: 1 / -1; margin-bottom: 0; background: linear-gradient(135deg, rgba(19, 29, 49, 0.95), rgba(13, 21, 39, 0.95)); border: 1px solid var(--border-gold); padding: 1.15rem 1.75rem; border-radius: var(--radius-lg); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; box-shadow: var(--shadow-md);">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, #6366f1, #4338ca); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: #fff; font-weight: 800; box-shadow: 0 4px 20px rgba(99,102,241,0.3);">
            🎓
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <h2 style="font-size: 1.35rem; color: #fff; margin: 0;">${student.name}</h2>
              <span class="status-badge" style="background: rgba(99,102,241,0.2); color: #a5b4fc; border: 1px solid rgba(99,102,241,0.4); font-size: 0.75rem; padding: 0.2rem 0.65rem; border-radius: 20px; font-weight: 700;">
                ${student.rollNo}
              </span>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">
              ${student.courseName} • ${student.batch} • Mentor: ${student.assignedTeacher || 'Prof. Arvind Deshpande (CA)'}
            </div>
          </div>
        </div>

        <!-- Student Switcher for Demonstration -->
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="font-size: 0.8rem; color: var(--text-dim);">Switch Student:</span>
          <select id="student-switcher-select" style="padding: 0.45rem 0.75rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.82rem;">
            ${state.students.map(s => `
              <option value="${s.id}" ${s.id === student.id ? 'selected' : ''}>
                ${s.name} (${s.courseName})
              </option>
            `).join('')}
          </select>
        </div>
      </div>

      <!-- Left Column: Student Navigation Sidebar -->
      <aside class="portal-sidebar" style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.25rem; height: fit-content; position: sticky; top: 5.5rem;">
        <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); font-weight: 800; margin-bottom: 0.85rem; padding-left: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
          <span>STUDENT DESK</span>
          <span style="font-size: 0.7rem; background: rgba(99,102,241,0.2); color: #c7d2fe; padding: 0.1rem 0.45rem; border-radius: 4px; font-weight: 700;">6 Desks</span>
        </div>
        <nav class="portal-nav-list" style="display: flex; flex-direction: column; gap: 0.4rem;">
          ${tabs.map(t => {
            const isActive = activeTab === t.id;
            return `
              <button 
                class="student-tab-btn ${isActive ? 'active-student-tab' : ''}" 
                data-tab="${t.id}"
                style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 0.95rem; border-radius: 8px; font-size: 0.88rem; font-weight: ${isActive ? '700' : '600'}; cursor: pointer; text-align: left; width: 100%; border: 1px solid ${isActive ? '#6366f1' : 'transparent'}; background: ${isActive ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.02)'}; color: ${isActive ? '#c7d2fe' : 'var(--text-muted)'}; transition: all 0.2s ease;"
              >
                <span style="font-size: 1.15rem; width: 22px; text-align: center;">${t.icon}</span>
                <span style="flex: 1;">${t.label}</span>
                ${isActive ? '<span style="font-size: 0.75rem; color: #a5b4fc;">●</span>' : ''}
              </button>
            `;
          }).join('')}
        </nav>
      </aside>

      <!-- Right Column: Tab Content Canvas -->
      <section class="portal-content" style="min-width: 0; display: flex; flex-direction: column; gap: 1.25rem;">
        <div id="student-tab-content" style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%;">
          <!-- Rendered dynamically -->
        </div>
      </section>
    </div>
  `;

  // Profile switcher
  const switcher = container.querySelector('#student-switcher-select');
  switcher.addEventListener('change', () => {
    state.currentStudentId = switcher.value;
    localStorage.setItem('imp_student_id_v5', switcher.value);
    renderStudentPortal(container, showToast);
  });

  // Tab switching
  const tabBtns = container.querySelectorAll('.student-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      state.currentStudentTab = tabId;
      renderStudentPortal(container, showToast);
    });
  });

  const tabContent = container.querySelector('#student-tab-content');

  switch (activeTab) {
    case 'notes':
      renderStudentNotesTab(tabContent, student);
      break;
    case 'homework':
      renderStudentHomeworkTab(tabContent, student, showToast);
      break;
    case 'leave':
      renderStudentLeaveTab(tabContent, student, showToast);
      break;
    case 'queries':
      renderStudentQueriesTab(tabContent, student, showToast);
      break;
    case 'exams':
      renderStudentExamsTab(tabContent, student, showToast);
      break;
    case 'performance':
      renderStudentPerformanceTab(tabContent, student);
      break;
    default:
      renderStudentNotesTab(tabContent, student);
      break;
  }
}

// =============================================================================
// =============================================================================
// TAB 1: DAILY TEACHING NOTES & DETAILS
// =============================================================================
function renderStudentNotesTab(container, student) {
  const portions = state.portions.filter(p => !p.courseId || p.courseId === student.courseId);

  container.innerHTML = `
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <h3 style="font-size: 1.2rem; color: #fff; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
            <span>📖</span> Daily Teaching Notes & Syllabus Coverage
          </h3>
          <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.2rem;">
            Detailed classroom logs with uploaded lecture video clips, board photo diagrams & PDF study handouts
          </div>
        </div>
        <span style="font-size: 0.75rem; background: rgba(99,102,241,0.2); color: #c7d2fe; padding: 0.2rem 0.65rem; border-radius: 20px; font-weight: 700;">
          ${portions.length} Lessons Recorded
        </span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        ${portions.map(p => `
          <div style="padding: 1.25rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
              <div>
                <span style="font-weight: 700; color: #fff; font-size: 1rem;">${p.subject}</span>
                <span style="font-size: 0.8rem; color: var(--accent-gold); margin-left: 0.5rem;">Lecture by ${p.teacher}</span>
              </div>
              <span style="font-size: 0.75rem; color: var(--text-dim);">${p.date}</span>
            </div>

            <div style="padding: 0.75rem; background: rgba(0,0,0,0.25); border-radius: 6px; border: 1px solid var(--border-subtle); margin-bottom: 0.75rem; font-size: 0.88rem; color: #e2e8f0; line-height: 1.5;">
              <strong style="color: var(--accent-gold-light);">Portion Covered:</strong> ${p.topicCovered}
            </div>

            <!-- Attached Media Card (Video / Image / PDF) -->
            ${p.mediaType && p.mediaType !== 'none' ? `
              <div style="margin: 0.75rem 0; padding: 0.75rem; background: rgba(0,0,0,0.3); border: 1px solid ${p.mediaType === 'video' ? 'rgba(99,102,241,0.35)' : p.mediaType === 'pdf' ? 'rgba(239,68,68,0.35)' : 'rgba(16,185,129,0.35)'}; border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                  <span style="font-size: 0.74rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: ${p.mediaType === 'video' ? '#a5b4fc' : p.mediaType === 'pdf' ? '#fca5a5' : '#6ee7b7'};">
                    ${p.mediaType === 'video' ? '🎥 Lecture Video Snippet' : p.mediaType === 'pdf' ? '📄 Topic Summary Handout (PDF)' : '📷 Classroom Blackboard Diagram Photo'}
                  </span>
                  <span style="font-size: 0.7rem; color: var(--text-dim);">${p.mediaSize || 'Verified Resource'}</span>
                </div>

                ${p.mediaType === 'image' ? `
                  <div style="position: relative; border-radius: 6px; overflow: hidden; max-height: 200px; background: #0c1424;">
                    <img src="${p.mediaUrl}" alt="${p.mediaName}" style="width: 100%; height: 200px; object-fit: cover; cursor: pointer;" onclick="window.open('${p.mediaUrl}', '_blank')" />
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.85)); padding: 0.4rem 0.6rem; font-size: 0.74rem; color: #fff; display: flex; justify-content: space-between;">
                      <span>${p.mediaName || 'Classroom_Board_Photo.jpg'}</span>
                      <span style="color: var(--accent-gold);">🔍 Click to Open High-Res Image</span>
                    </div>
                  </div>
                ` : p.mediaType === 'video' ? `
                  <div>
                    <video controls src="${p.mediaUrl}" style="width: 100%; max-height: 200px; background: #000; border-radius: 6px; display: block;"></video>
                    <div style="font-size: 0.74rem; color: #a5b4fc; margin-top: 0.3rem;">
                      ▶ Video Topic: ${p.mediaName || 'Lecture_Recording.mp4'}
                    </div>
                  </div>
                ` : `
                  <a href="${p.mediaUrl || '#'}" target="_blank" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.65rem 0.85rem; background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.3); border-radius: 6px; color: #fca5a5; text-decoration: none; font-size: 0.85rem;">
                    <span style="font-size: 1.4rem;">📕</span>
                    <div style="flex: 1; min-width: 0;">
                      <div style="font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.mediaName || 'Topic_Handout_Notes.pdf'}</div>
                      <div style="font-size: 0.72rem; color: var(--text-dim);">Click to Download / View Reference Handout</div>
                    </div>
                    <span style="font-size: 0.85rem; color: var(--accent-gold); font-weight: 700;">View PDF ↗</span>
                  </a>
                `}
              </div>
            ` : ''}

            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--text-muted); border-top: 1px solid var(--border-subtle); padding-top: 0.5rem; margin-top: 0.5rem;">
              <span><strong>Next Lecture Topic:</strong> ${p.nextLectureTopic}</span>
              <span style="font-weight: 700; color: #34d399;">Syllabus ${p.completionPercent}% Completed</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// =============================================================================
// TAB 2: HOMEWORK (Assigned by Subject Teacher + Photo Upload)
// =============================================================================
function renderStudentHomeworkTab(container, student, showToast) {
  const homeworks = state.homeworks.filter(h => !h.courseId || h.courseId === student.courseId);

  container.innerHTML = `
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="margin-bottom: 1.25rem;">
        <h3 style="font-size: 1.2rem; color: #fff; margin: 0;">Assigned Homework & Solution Upload</h3>
        <div style="font-size: 0.82rem; color: var(--text-muted);">
          Complete the problems assigned by your subject teacher and submit photo / PDF for faculty verification
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        ${homeworks.map(hw => {
          const mySub = hw.submissions ? hw.submissions.find(s => s.studentId === student.id) : null;

          return `
            <div style="padding: 1.25rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                  <h4 style="font-size: 1.1rem; color: #fff; margin: 0;">${hw.title}</h4>
                  <div style="font-size: 0.78rem; color: var(--accent-gold); margin-top: 0.2rem;">
                    Subject: ${hw.subject} • Assigned By: ${hw.assignedBy || 'Faculty'} • Due: ${hw.dueDate}
                  </div>
                </div>

                <span style="padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700; ${mySub ? 'background: rgba(16,185,129,0.2); color: #34d399;' : 'background: rgba(245,158,11,0.2); color: #fbbf24;'}">
                  ${mySub ? `Status: ${mySub.status}` : 'Pending Submission'}
                </span>
              </div>

              <div style="padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px; margin-bottom: 0.75rem; font-size: 0.85rem; color: #cbd5e1;">
                ${hw.description}
              </div>

              ${mySub ? `
                <div style="padding: 0.75rem; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.3); border-radius: 6px; font-size: 0.85rem;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
                    <span style="color: #6ee7b7; font-weight: 700;">✓ Submitted Solution:</span>
                    <span style="font-weight: 800; color: #34d399;">Marks: ${mySub.marksGiven}</span>
                  </div>
                  <div style="font-size: 0.8rem; color: #cbd5e1; font-style: italic;">
                    Faculty Remark: "${mySub.remarks}"
                  </div>
                </div>
              ` : `
                <div style="display: flex; gap: 0.75rem; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
                  <input 
                    type="text" 
                    class="hw-photo-input" 
                    data-hw-id="${hw.id}" 
                    placeholder="Paste Photo URL / Image Drive Link of your solved notebook" 
                    value="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80" 
                    style="flex: 1; padding: 0.6rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.82rem;"
                  />
                  <button 
                    class="submit-hw-btn" 
                    data-hw-id="${hw.id}" 
                    style="padding: 0.6rem 1.25rem; background: linear-gradient(135deg, #6366f1, #4f46e5); color: #fff; font-weight: 700; font-size: 0.85rem; border: none; border-radius: 6px; cursor: pointer;"
                  >
                    Upload Solution →
                  </button>
                </div>
              `}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Attach submit homework
  container.querySelectorAll('.submit-hw-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const hwId = btn.getAttribute('data-hw-id');
      const input = container.querySelector(`.hw-photo-input[data-hw-id="${hwId}"]`);
      state.submitHomework(hwId, student.id, input ? input.value : null);
      showToast('Homework photo submitted for teacher check!', 'success');
      renderStudentHomeworkTab(container, student, showToast);
    });
  });
}

// =============================================================================
// TAB 3: LEAVE APPLICATION (At Least 2 Days Before Rule)
// =============================================================================
function renderStudentLeaveTab(container, student, showToast) {
  const leaves = state.leaves.filter(l => l.studentId === student.id);

  // Default date = 3 days ahead
  const d = new Date();
  d.setDate(d.getDate() + 3);
  const minDateStr = d.toISOString().split('T')[0];

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 1.5rem; align-items: start;">
      <!-- Apply Form -->
      <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-gold); background: var(--bg-surface); border-radius: var(--radius-md);">
        <div style="margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
          <h3 style="font-size: 1.15rem; color: #fff; margin: 0;">Submit Leave Application</h3>
          <div style="font-size: 0.78rem; color: var(--accent-gold); margin-top: 0.2rem;">
            ⚠️ Mandatory Institute Rule: Applications must be submitted at least 2 days before the leave date.
          </div>
        </div>

        <form id="student-leave-form">
          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Requested Leave Date <span style="color: var(--accent-gold);">*</span>
            </label>
            <input 
              type="date" 
              id="leave-date-input" 
              value="${minDateStr}" 
              required 
              style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem;"
            />
          </div>

          <div style="margin-bottom: 1.25rem;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Reason for Absence <span style="color: var(--accent-gold);">*</span>
            </label>
            <textarea 
              id="leave-reason-input" 
              rows="3" 
              placeholder="e.g. Family wedding ceremony / Medical checkup (Advance notice required)" 
              required 
              style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;"
            ></textarea>
          </div>

          <button 
            type="submit" 
            style="width: 100%; padding: 0.75rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; font-size: 0.95rem; border: none; border-radius: 6px; cursor: pointer; box-shadow: 0 4px 15px rgba(207,168,78,0.3);"
          >
            Apply for Advance Leave →
          </button>
        </form>
      </div>

      <!-- Past Leave History & Director Approvals -->
      <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
        <h3 style="font-size: 1.15rem; color: #fff; margin-bottom: 1rem;">Leave History & Director Approvals</h3>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${leaves.map(l => `
            <div style="padding: 0.85rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                <span style="font-weight: 700; color: #fff; font-size: 0.95rem;">Leave Date: ${l.leaveDate}</span>
                <span style="padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.72rem; font-weight: 700; ${l.status.includes('Approved') ? 'background: rgba(16,185,129,0.2); color: #34d399;' : 'background: rgba(245,158,11,0.2); color: #fbbf24;'}">
                  ${l.status}
                </span>
              </div>
              <div style="font-size: 0.82rem; color: #cbd5e1; margin-bottom: 0.4rem;">
                <strong>Reason:</strong> ${l.reason}
              </div>
              <div style="font-size: 0.75rem; color: var(--text-dim); border-top: 1px solid var(--border-subtle); padding-top: 0.35rem;">
                Applied on: ${l.appliedDate} • Note: ${l.directorNotes}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Submit leave form
  container.querySelector('#student-leave-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const leaveDate = container.querySelector('#leave-date-input').value;
    const reason = container.querySelector('#leave-reason-input').value;

    const res = state.applyLeave({ studentId: student.id, leaveDate, reason });
    if (!res.success) {
      alert(res.message);
      showToast(res.message, 'warning');
      return;
    }

    showToast('Advance leave application submitted for Director review!', 'success');
    renderStudentLeaveTab(container, student, showToast);
  });
}

// =============================================================================
// TAB 4: QUERIES TO BE RAISED TO TEACHER OR DIRECTOR
// =============================================================================
function renderStudentQueriesTab(container, student, showToast) {
  const queries = state.queries.filter(q => q.studentId === student.id);

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 1.5rem; align-items: start;">
      <!-- Query Raise Form -->
      <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-accent); background: var(--bg-surface); border-radius: var(--radius-md);">
        <div style="margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
          <h3 style="font-size: 1.15rem; color: #fff; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
            <span>💬</span> Raise Academic Doubt / Query
          </h3>
          <div style="font-size: 0.78rem; color: #93c5fd; margin-top: 0.25rem;">
            Ask doubts directly to Subject Faculty or Director with problem snapshot, rough working PDF, or video
          </div>
        </div>

        <form id="raise-query-form">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
                Recipient <span style="color: var(--accent-gold);">*</span>
              </label>
              <select id="query-recipient-select" style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
                <option value="Teacher">Subject Teacher (Prof. Deshpande)</option>
                <option value="Director">Managing Director (Dr. S. K. Joshi)</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
                Subject <span style="color: var(--accent-gold);">*</span>
              </label>
              <input type="text" id="query-subject-input" value="Accounts" required style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;" />
            </div>
          </div>

          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Your Question / Doubt Details <span style="color: var(--accent-gold);">*</span>
            </label>
            <textarea 
              id="query-text-input" 
              rows="3" 
              placeholder="State your question clearly with question number, page reference, or adjustment..." 
              required 
              style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;"
            ></textarea>
          </div>

          <!-- Attachment Selection (PDF, Video, Image) -->
          <div style="margin-bottom: 1.25rem; padding: 0.85rem; background: rgba(0,0,0,0.25); border: 1px solid var(--border-light); border-radius: 6px;">
            <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.4rem;">
              Attach Doubt Working / Evidence (Optional):
            </label>

            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.35rem; margin-bottom: 0.5rem;">
              <button type="button" class="sq-type-btn active" data-type="pdf" style="padding: 0.35rem; border-radius: 5px; font-size: 0.72rem; font-weight: 700; border: 1px solid #6366f1; background: rgba(99,102,241,0.2); color: #c7d2fe; cursor: pointer;">
                📄 PDF
              </button>
              <button type="button" class="sq-type-btn" data-type="video" style="padding: 0.35rem; border-radius: 5px; font-size: 0.72rem; font-weight: 600; border: 1px solid var(--border-light); background: rgba(255,255,255,0.02); color: var(--text-muted); cursor: pointer;">
                🎥 Video
              </button>
              <button type="button" class="sq-type-btn" data-type="image" style="padding: 0.35rem; border-radius: 5px; font-size: 0.72rem; font-weight: 600; border: 1px solid var(--border-light); background: rgba(255,255,255,0.02); color: var(--text-muted); cursor: pointer;">
                📷 Photo
              </button>
              <button type="button" class="sq-type-btn" data-type="none" style="padding: 0.35rem; border-radius: 5px; font-size: 0.72rem; font-weight: 600; border: 1px solid var(--border-light); background: rgba(255,255,255,0.02); color: var(--text-muted); cursor: pointer;">
                🚫 None
              </button>
            </div>

            <div id="sq-input-wrapper">
              <input 
                type="text" 
                id="query-attachment-input" 
                placeholder="e.g. partnership_question9_step3.pdf" 
                value="partnership_question9_step3.pdf"
                style="width: 100%; padding: 0.5rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.8rem;"
              />
            </div>
          </div>

          <button 
            type="submit" 
            style="width: 100%; padding: 0.75rem; background: linear-gradient(135deg, var(--accent-primary), var(--accent-primary-hover)); color: #fff; font-weight: 700; font-size: 0.95rem; border: none; border-radius: 6px; cursor: pointer; box-shadow: 0 4px 15px rgba(99,102,241,0.3);"
          >
            Send Doubt to Faculty →
          </button>
        </form>
      </div>

      <!-- Doubts History & Answers -->
      <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="font-size: 1.15rem; color: #fff; margin: 0;">My Doubts & Faculty Responses</h3>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${queries.length} Queries</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem; max-height: 600px; overflow-y: auto;">
          ${queries.length === 0 ? `
            <div style="text-align: center; padding: 2rem; color: var(--text-muted); font-size: 0.85rem;">
              You have not raised any doubts yet. Use the form on the left to ask questions to your teacher.
            </div>
          ` : queries.map(q => `
            <div style="padding: 1.15rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; flex-wrap: wrap; gap: 0.4rem;">
                <span style="font-weight: 700; color: #fff; font-size: 0.95rem;">${q.subject}</span>
                <span style="padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.72rem; font-weight: 700; ${q.status === 'Answered' ? 'background: rgba(16,185,129,0.2); color: #34d399;' : 'background: rgba(245,158,11,0.2); color: #fbbf24;'}">
                  ${q.status}
                </span>
              </div>

              <div style="font-size: 0.84rem; color: #cbd5e1; margin-bottom: 0.6rem; line-height: 1.4;">
                <strong>My Question:</strong> "${q.queryText}"
                ${q.attachment ? `
                  <div style="margin-top: 0.35rem; font-size: 0.75rem; color: var(--accent-gold-light);">
                    📎 My Attached File: <u>${q.attachment}</u>
                  </div>
                ` : ''}
              </div>

              <!-- Answered by Teacher / Director -->
              ${q.status === 'Answered' ? `
                <div style="padding: 0.85rem; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.3); border-radius: 6px; font-size: 0.85rem; color: #e2e8f0;">
                  <strong style="color: #34d399;">${q.teacherName} Reply:</strong>
                  <div style="margin-top: 0.25rem; line-height: 1.45;">${q.replyText}</div>

                  <!-- Teacher Attached PDF or Video Explanation -->
                  ${q.replyAttachment ? `
                    <div style="margin-top: 0.6rem; padding: 0.5rem 0.75rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(16,185,129,0.3); border-radius: 6px;">
                      <div style="font-size: 0.72rem; font-weight: 700; color: #6ee7b7; margin-bottom: 0.25rem;">
                        ${q.replyAttachmentType === 'video' ? '🎥 Faculty Video Explanation Clip:' : '📄 Faculty Guidance Note (PDF):'}
                      </div>

                      ${q.replyAttachmentType === 'video' ? `
                        <video controls src="${q.replyAttachmentUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'}" style="width: 100%; max-height: 160px; background: #000; border-radius: 4px; display: block;"></video>
                        <div style="font-size: 0.72rem; color: #a5b4fc; margin-top: 0.25rem;">▶ ${q.replyAttachment}</div>
                      ` : `
                        <a href="${q.replyAttachmentUrl || '#'}" target="_blank" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #34d399; text-decoration: none; font-size: 0.82rem; font-weight: 600;">
                          <span>📕</span> <u>${q.replyAttachment}</u> <span style="font-size: 0.72rem; color: var(--text-dim);">(Download / View PDF) ↗</span>
                        </a>
                      `}
                    </div>
                  ` : ''}

                  <!-- STUDENT RESPONSE / FEEDBACK SECTION -->
                  <div style="margin-top: 0.85rem; padding-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.1);">
                    ${q.studentResponse ? `
                      <!-- Display Submitted Feedback -->
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
                        <div>
                          <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="font-size: 0.76rem; font-weight: 700; text-transform: uppercase; color: ${q.studentResponse === 'Satisfactory' ? '#34d399' : '#f87171'};">
                              ${q.studentResponse === 'Satisfactory' ? '✔ You Marked: Satisfactory / Concept Understood 👍' : '❓ You Marked: Not Understood Yet / Still in Doubt'}
                            </span>
                            <span style="font-size: 0.7rem; color: var(--text-dim);">${q.respondedAt || 'Recent'}</span>
                          </div>
                          ${q.studentFeedbackNote ? `
                            <div style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.25rem; font-style: italic;">
                              "${q.studentFeedbackNote}"
                            </div>
                          ` : ''}
                        </div>
                        <button class="btn-edit-feedback" data-query-id="${q.id}" style="padding: 0.2rem 0.6rem; font-size: 0.72rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); color: #cbd5e1; border-radius: 4px; cursor: pointer;">
                          ✏️ Change Rating
                        </button>
                      </div>
                    ` : ''}

                    <!-- Interactive Rating Prompt (If not submitted or editing) -->
                    <div id="feedback-form-${q.id}" style="${q.studentResponse ? 'display: none;' : 'display: block;'} margin-top: ${q.studentResponse ? '0.75rem' : '0'}; padding: 0.75rem; background: rgba(0,0,0,0.3); border: 1px solid var(--border-gold); border-radius: 6px;">
                      <div style="font-size: 0.82rem; font-weight: 700; color: var(--accent-gold-light); margin-bottom: 0.4rem;">
                        💬 Was the teacher's explanation satisfactory?
                      </div>

                      <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <button 
                          type="button" 
                          class="feedback-choice-btn" 
                          data-query-id="${q.id}" 
                          data-choice="Satisfactory"
                          style="flex: 1; padding: 0.45rem; border-radius: 6px; font-size: 0.78rem; font-weight: 700; border: 1px solid #10b981; background: ${q.studentResponse === 'Satisfactory' ? 'rgba(16,185,129,0.3)' : 'rgba(16,185,129,0.1)'}; color: #34d399; cursor: pointer; text-align: center;"
                        >
                          👍 Satisfactory / Concept Understood
                        </button>
                        <button 
                          type="button" 
                          class="feedback-choice-btn" 
                          data-query-id="${q.id}" 
                          data-choice="Not Understood Yet"
                          style="flex: 1; padding: 0.45rem; border-radius: 6px; font-size: 0.78rem; font-weight: 700; border: 1px solid #ef4444; background: ${q.studentResponse === 'Not Understood Yet' ? 'rgba(239,68,68,0.3)' : 'rgba(239,68,68,0.1)'}; color: #f87171; cursor: pointer; text-align: center;"
                        >
                          ❓ Not Understood Yet
                        </button>
                      </div>

                      <input 
                        type="text" 
                        class="feedback-note-input" 
                        data-query-id="${q.id}" 
                        value="${q.studentFeedbackNote || ''}" 
                        placeholder="Optional comment (e.g. Understood goodwill, but need help on cash ledger)..."
                        style="width: 100%; padding: 0.45rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 5px; color: #fff; font-size: 0.78rem; margin-bottom: 0.5rem;"
                      />

                      <button 
                        type="button" 
                        class="btn-submit-feedback" 
                        data-query-id="${q.id}" 
                        style="width: 100%; padding: 0.45rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; font-size: 0.8rem; border: none; border-radius: 5px; cursor: pointer;"
                      >
                        Submit Response (Visible to Teacher & Director) →
                      </button>
                    </div>
                  </div>
                </div>
              ` : `
                <div style="font-size: 0.76rem; color: var(--text-dim); padding: 0.4rem 0.5rem; background: rgba(255,255,255,0.02); border-radius: 4px;">
                  ⏳ Awaiting review & explanation by ${q.teacherName}
                </div>
              `}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Student attachment type selector in raise form
  let sqType = 'pdf';
  const sqButtons = container.querySelectorAll('.sq-type-btn');
  const sqInputWrapper = container.querySelector('#sq-input-wrapper');

  sqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sqType = btn.getAttribute('data-type');
      sqButtons.forEach(b => {
        const match = b.getAttribute('data-type') === sqType;
        b.style.border = match ? '1px solid #6366f1' : '1px solid var(--border-light)';
        b.style.background = match ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.02)';
        b.style.color = match ? '#c7d2fe' : 'var(--text-muted)';
        b.style.fontWeight = match ? '700' : '600';
      });

      if (sqType === 'none') {
        sqInputWrapper.innerHTML = `
          <div style="font-size: 0.75rem; color: var(--text-dim); text-align: center; padding: 0.35rem;">
            No media will be attached with this doubt.
          </div>
        `;
      } else if (sqType === 'video') {
        sqInputWrapper.innerHTML = `
          <input 
            type="text" 
            id="query-attachment-input" 
            placeholder="e.g. doubt_screen_recording.mp4" 
            value="doubt_screen_recording.mp4"
            style="width: 100%; padding: 0.5rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.8rem;"
          />
        `;
      } else if (sqType === 'image') {
        sqInputWrapper.innerHTML = `
          <input 
            type="text" 
            id="query-attachment-input" 
            placeholder="e.g. textbook_page84_photo.jpg" 
            value="textbook_page84_photo.jpg"
            style="width: 100%; padding: 0.5rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.8rem;"
          />
        `;
      } else {
        sqInputWrapper.innerHTML = `
          <input 
            type="text" 
            id="query-attachment-input" 
            placeholder="e.g. partnership_question9_step3.pdf" 
            value="partnership_question9_step3.pdf"
            style="width: 100%; padding: 0.5rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.8rem;"
          />
        `;
      }
    });
  });

  // Edit feedback toggle
  container.querySelectorAll('.btn-edit-feedback').forEach(btn => {
    btn.addEventListener('click', () => {
      const qId = btn.getAttribute('data-query-id');
      const form = container.querySelector(`#feedback-form-${qId}`);
      if (form) {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
      }
    });
  });

  // Selection states for feedback choice buttons
  const selectedChoices = {};
  queries.forEach(q => {
    if (q.studentResponse) selectedChoices[q.id] = q.studentResponse;
  });

  container.querySelectorAll('.feedback-choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const qId = btn.getAttribute('data-query-id');
      const choice = btn.getAttribute('data-choice');
      selectedChoices[qId] = choice;

      container.querySelectorAll(`.feedback-choice-btn[data-query-id="${qId}"]`).forEach(b => {
        const isSelected = b.getAttribute('data-choice') === choice;
        if (b.getAttribute('data-choice') === 'Satisfactory') {
          b.style.background = isSelected ? 'rgba(16,185,129,0.35)' : 'rgba(16,185,129,0.08)';
          b.style.border = isSelected ? '2px solid #10b981' : '1px solid #10b981';
        } else {
          b.style.background = isSelected ? 'rgba(239,68,68,0.35)' : 'rgba(239,68,68,0.08)';
          b.style.border = isSelected ? '2px solid #ef4444' : '1px solid #ef4444';
        }
      });
    });
  });

  // Submit feedback response handler
  container.querySelectorAll('.btn-submit-feedback').forEach(btn => {
    btn.addEventListener('click', () => {
      const qId = btn.getAttribute('data-query-id');
      const choice = selectedChoices[qId] || 'Satisfactory';
      const noteInput = container.querySelector(`.feedback-note-input[data-query-id="${qId}"]`);
      const feedbackNote = noteInput ? noteInput.value.trim() : '';

      state.submitQueryFeedback(qId, {
        responseStatus: choice,
        feedbackNote: feedbackNote || (choice === 'Satisfactory' ? 'Satisfied with explanation.' : 'Need further clarification.')
      });

      showToast(`Your response marked as "${choice}"! Notified to Teacher and Director.`, 'success');
      renderStudentQueriesTab(container, student, showToast);
    });
  });

  // Submit new query
  container.querySelector('#raise-query-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const recipient = container.querySelector('#query-recipient-select').value;
    const subject = container.querySelector('#query-subject-input').value;
    const queryText = container.querySelector('#query-text-input').value;
    const attInput = container.querySelector('#query-attachment-input');
    const attachment = attInput ? attInput.value.trim() : null;

    let attachmentUrl = null;
    if (sqType === 'video') attachmentUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';
    else if (sqType === 'image') attachmentUrl = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80';
    else if (sqType === 'pdf') attachmentUrl = 'https://imperialcommerce.edu.in/docs/sample_working.pdf';

    state.raiseQuery({
      studentId: student.id,
      recipient,
      subject,
      queryText,
      attachment: sqType !== 'none' ? attachment : null,
      attachmentType: sqType !== 'none' ? sqType : null,
      attachmentUrl: sqType !== 'none' ? attachmentUrl : null
    });

    showToast('Academic query submitted to faculty with attached evidence!', 'success');
    renderStudentQueriesTab(container, student, showToast);
  });
}

// =============================================================================
// TAB 5: EXAMS & PDF SUBMISSION / GOOGLE FORM (Timed Assessment Desk)
// =============================================================================
function renderStudentExamsTab(container, student, showToast) {
  // Clear any existing timer interval from previous render
  if (container._examTimerInterval) {
    clearInterval(container._examTimerInterval);
    container._examTimerInterval = null;
  }

  const exams = state.exams.filter(e => !e.courseId || e.courseId === student.courseId);

  container.innerHTML = `
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-gold); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.85rem;">
        <div>
          <h3 style="font-size: 1.25rem; color: #fff; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
            <span>🎯</span> Weekly & Terminal Exam Assessment Desk
          </h3>
          <div style="font-size: 0.82rem; color: var(--accent-gold); margin-top: 0.25rem;">
            *Live exam timer activates upon opening question papers or Google Forms, and automatically stops upon submission. Time taken is recorded with your evaluated marks report.
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 0.75rem; background: rgba(207,168,78,0.15); color: var(--accent-gold-light); border: 1px solid rgba(207,168,78,0.3); padding: 0.2rem 0.6rem; border-radius: 20px; font-weight: 700;">
            ${exams.length} Tests in Syllabus
          </span>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        ${exams.map(exam => {
          const sub = exam.submissions ? exam.submissions.find(s => s.studentId === student.id) : null;
          const timer = state.getExamTimer(exam.id, student.id);
          const isGraded = sub && sub.status === 'Graded';
          const isSubmitted = sub && (sub.status === 'Submitted for Evaluation' || sub.status === 'Graded');
          const isRunning = !isSubmitted && !!timer;

          return `
            <div style="padding: 1.25rem; background: rgba(255,255,255,0.02); border: 1px solid ${isRunning ? 'rgba(245,158,11,0.5)' : isGraded ? 'rgba(16,185,129,0.35)' : 'var(--border-light)'}; border-radius: 8px; transition: all 0.2s ease;">
              <!-- Exam Header -->
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                    <h4 style="font-size: 1.1rem; color: #fff; margin: 0; font-weight: 700;">${exam.title}</h4>
                    ${isRunning ? `
                      <span style="font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 12px; font-weight: 800; background: rgba(239,68,68,0.2); color: #f87171; border: 1px solid rgba(239,68,68,0.4); display: inline-flex; align-items: center; gap: 0.25rem;">
                        <span style="animation: pulse 1s infinite;">●</span> In Progress
                      </span>
                    ` : isGraded ? `
                      <span style="font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 12px; font-weight: 800; background: rgba(16,185,129,0.2); color: #34d399; border: 1px solid rgba(16,185,129,0.4);">
                        ✓ Graded
                      </span>
                    ` : isSubmitted ? `
                      <span style="font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 12px; font-weight: 800; background: rgba(245,158,11,0.2); color: #fbbf24; border: 1px solid rgba(245,158,11,0.4);">
                        ⏳ Submitted (Evaluation Pending)
                      </span>
                    ` : `
                      <span style="font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 12px; font-weight: 700; background: rgba(255,255,255,0.06); color: var(--text-dim);">
                        Pending Attempt
                      </span>
                    `}
                  </div>

                  <div style="font-size: 0.8rem; color: var(--accent-gold); margin-top: 0.25rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                    <span><strong>Subject:</strong> ${exam.subject}</span>
                    <span>•</span>
                    <span><strong>Max Marks:</strong> ${exam.maxMarks}</span>
                    <span>•</span>
                    <span><strong>Duration:</strong> ${exam.durationMinutes || 60} mins</span>
                    <span>•</span>
                    <span style="color: var(--text-dim);">Date: ${exam.date}</span>
                    ${exam.publishedBy ? `<span style="color: var(--text-dim);">• By ${exam.publishedBy}</span>` : ''}
                  </div>
                </div>

                <!-- Format Badges -->
                <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                  ${exam.questionPaperPdf ? `
                    <span style="padding: 0.25rem 0.55rem; background: rgba(37,99,235,0.15); border: 1px solid rgba(37,99,235,0.3); border-radius: 4px; color: #93c5fd; font-size: 0.72rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.25rem;">
                      📄 PDF Question Paper
                    </span>
                  ` : ''}
                  ${exam.googleFormLink ? `
                    <span style="padding: 0.25rem 0.55rem; background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); border-radius: 4px; color: #6ee7b7; font-size: 0.72rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.25rem;">
                      🔗 Google Form Quiz
                    </span>
                  ` : ''}
                </div>
              </div>

              <!-- ========================================== -->
              <!-- STATE 1: GRADED (REVEALING MARKS & TIME)   -->
              <!-- ========================================== -->
              ${isGraded ? `
                <div style="padding: 1rem 1.25rem; background: rgba(16,185,129,0.06); border: 1px solid rgba(16,185,129,0.3); border-radius: 8px; margin-top: 0.75rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.75rem; border-bottom: 1px solid rgba(16,185,129,0.2); padding-bottom: 0.65rem;">
                    <div>
                      <div style="font-size: 0.75rem; text-transform: uppercase; color: #6ee7b7; font-weight: 700; letter-spacing: 0.05em;">Assessed Score:</div>
                      <div style="font-size: 1.8rem; font-weight: 800; color: #34d399; margin-top: 0.1rem;">
                        ${sub.marksAssessed} <span style="font-size: 1.05rem; color: var(--text-muted); font-weight: 600;">/ ${exam.maxMarks}</span>
                        <span style="font-size: 0.85rem; padding: 0.15rem 0.55rem; border-radius: 12px; background: rgba(16,185,129,0.2); color: #34d399; margin-left: 0.5rem; font-weight: 700;">
                          ${Math.round((sub.marksAssessed / exam.maxMarks) * 100)}% Merit
                        </span>
                      </div>
                    </div>

                    <!-- Time Taken Revealed Badge -->
                    <div style="text-align: right;">
                      <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--accent-gold-light); font-weight: 700;">Official Timer Log:</div>
                      <div style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 1.05rem; font-weight: 800; color: #fff; background: rgba(207,168,78,0.18); border: 1px solid rgba(207,168,78,0.4); padding: 0.3rem 0.75rem; border-radius: 6px; margin-top: 0.2rem;">
                        <span>⏱️ Time Taken:</span>
                        <span style="color: var(--accent-gold-light);">${sub.timeTakenFormatted || '58 mins 40 secs'}</span>
                      </div>
                    </div>
                  </div>

                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.82rem; margin-bottom: 0.65rem;">
                    <div>
                      <strong style="color: #fff;">Submission Mode:</strong> 
                      <span style="color: #cbd5e1;">${sub.submissionType === 'google_form' ? '🔗 Google Form Online Test' : '📄 Answer Sheet Upload'}</span>
                    </div>
                    <div>
                      <strong style="color: #fff;">Submitted On:</strong> 
                      <span style="color: #cbd5e1;">${sub.submittedAt || exam.date}</span>
                    </div>
                  </div>

                  ${sub.answerSheetPdf ? `
                    <div style="margin-bottom: 0.65rem; padding: 0.5rem 0.75rem; background: rgba(0,0,0,0.3); border-radius: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem;">
                      <span style="color: #cbd5e1;">
                        📄 Uploaded Answer Sheet: <strong style="color: #fff;">${sub.answerSheetName || 'ananya_tax_mock_paper_solved.pdf'}</strong>
                        ${sub.answerSheetSize ? `<span style="color: var(--text-dim); margin-left: 0.3rem;">(${sub.answerSheetSize})</span>` : ''}
                      </span>
                      <a href="${sub.answerSheetPdf}" target="_blank" style="color: var(--accent-gold); text-decoration: none; font-weight: 700;">View Sheet ↗</a>
                    </div>
                  ` : ''}

                  <div style="font-size: 0.82rem; color: #cbd5e1; background: rgba(0,0,0,0.25); padding: 0.65rem 0.85rem; border-radius: 6px; border-left: 3px solid #10b981;">
                    <strong style="color: #34d399;">Examiner Feedback:</strong> "${sub.remarks || 'Flawless presentation and working notes.'}"
                  </div>
                </div>
              ` : isSubmitted ? `
                <!-- ========================================== -->
                <!-- STATE 2: SUBMITTED (AWAITING GRADING)      -->
                <!-- ========================================== -->
                <div style="padding: 1rem 1.25rem; background: rgba(245,158,11,0.06); border: 1px solid rgba(245,158,11,0.3); border-radius: 8px; margin-top: 0.75rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
                    <span style="font-weight: 700; color: #fbbf24; font-size: 0.95rem;">
                      ⏳ Answer Sheet Submitted — Awaiting Faculty Evaluation
                    </span>
                    <span style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.85rem; font-weight: 800; color: #fff; background: rgba(207,168,78,0.18); border: 1px solid rgba(207,168,78,0.35); padding: 0.25rem 0.65rem; border-radius: 6px;">
                      <span>⏱️ Recorded Time:</span>
                      <span style="color: var(--accent-gold-light);">${sub.timeTakenFormatted || '45 mins 12 secs'}</span>
                    </span>
                  </div>

                  <div style="font-size: 0.8rem; color: #cbd5e1; margin-bottom: 0.5rem;">
                    ${sub.answerSheetName ? `Uploaded File: <strong style="color: #fff;">${sub.answerSheetName}</strong> (${sub.answerSheetSize || '2.4 MB'})` : 'Online Google Form responses logged.'}
                    • Submitted: ${sub.submittedAt || 'Today'}
                  </div>

                  <div style="font-size: 0.78rem; color: var(--text-dim); font-style: italic;">
                    *Timer has been officially stopped. Examiner (Prof. Arvind Deshpande) has received your solution. Assessed marks and examiner notes will appear here automatically upon grading.
                  </div>
                </div>
              ` : isRunning ? `
                <!-- ========================================== -->
                <!-- STATE 3: IN PROGRESS (LIVE TIMER ACTIVE)   -->
                <!-- ========================================== -->
                <div style="margin-top: 0.75rem;">
                  <!-- Live Stopwatch Banner -->
                  <div style="background: linear-gradient(135deg, rgba(239,68,68,0.15), rgba(13,21,39,0.9)); border: 1px solid rgba(239,68,68,0.4); border-radius: 8px; padding: 0.85rem 1.15rem; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
                    <div style="display: flex; align-items: center; gap: 0.65rem;">
                      <span style="font-size: 1.4rem;">🔴</span>
                      <div>
                        <div style="font-weight: 800; color: #f87171; font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.05em;">
                          OFFICIAL EXAM IN PROGRESS
                        </div>
                        <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.15rem;">
                          Timer running live. When finished, submit your answers below to stop the timer.
                        </div>
                      </div>
                    </div>

                    <div style="text-align: right;">
                      <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 0.15rem;">Elapsed Time:</div>
                      <div class="live-exam-timer" data-start="${timer.startedAt}" style="font-size: 1.85rem; font-family: 'JetBrains Mono', Consolas, monospace; font-weight: 800; color: #fbbf24; background: rgba(0,0,0,0.5); padding: 0.25rem 0.85rem; border-radius: 6px; border: 1px solid rgba(245,158,11,0.5); letter-spacing: 0.05em;">
                        ⏱️ 00:00:00
                      </div>
                    </div>
                  </div>

                  <!-- Quick Links to Question Paper -->
                  <div style="display: flex; gap: 0.6rem; margin-bottom: 1rem; flex-wrap: wrap;">
                    ${exam.questionPaperPdf ? `
                      <a href="${exam.questionPaperPdf}" target="_blank" style="padding: 0.45rem 0.85rem; background: rgba(37,99,235,0.25); border: 1px solid var(--border-accent); border-radius: 6px; color: #93c5fd; font-size: 0.8rem; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;">
                        <span>📄</span> View / Re-open Question Paper PDF ↗
                      </a>
                    ` : ''}
                    ${exam.googleFormLink ? `
                      <a href="${exam.googleFormLink}" target="_blank" style="padding: 0.45rem 0.85rem; background: rgba(79,70,229,0.25); border: 1px solid rgba(99,102,241,0.4); border-radius: 6px; color: #c7d2fe; font-size: 0.8rem; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;">
                        <span>🔗</span> Re-open Google Form Link for Test ↗
                      </a>
                    ` : ''}
                  </div>

                  <!-- Submission Desks -->
                  <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 1.15rem;">
                    <!-- DESK A: PDF Answer Sheet Upload -->
                    ${exam.questionPaperPdf ? `
                      <div style="margin-bottom: ${exam.googleFormLink ? '1.25rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1.25rem;' : '0;'}">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                          <label style="font-size: 0.9rem; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 0.4rem;">
                            <span>📤</span> Upload Answer Sheet (PDF / Photo):
                          </label>
                          <span style="font-size: 0.72rem; color: #34d399; font-weight: 600;">Submitting stops the timer</span>
                        </div>

                        <!-- Upload / Preset Selector Control -->
                        <div style="display: grid; grid-template-columns: 1fr auto; gap: 0.75rem; align-items: center; margin-bottom: 0.65rem;">
                          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                            <label class="btn" style="padding: 0.45rem 0.85rem; background: rgba(37,99,235,0.2); border: 1px solid var(--border-accent); border-radius: 6px; color: #93c5fd; font-size: 0.8rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 0.35rem;">
                              <span>📁</span> Browse Local PDF / Photo
                              <input type="file" class="answer-file-input" data-exam-id="${exam.id}" accept=".pdf,image/*" style="display: none;" />
                            </label>
                            <span style="font-size: 0.75rem; color: var(--text-muted);">or select simulated answer sheet:</span>
                          </div>

                          <select class="preset-answer-select" data-exam-id="${exam.id}" style="padding: 0.5rem 0.75rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.8rem; cursor: pointer;">
                            <option value="https://imperialcommerce.edu.in/answers/${student.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${exam.subject.toLowerCase().replace(/[^a-z0-9]/g, '_')}_mock_solved.pdf" data-name="${student.name.replace(/[^a-zA-Z0-9]/g, '_')}_${exam.subject.replace(/[^a-zA-Z0-9]/g, '_')}_mock_solved.pdf" data-size="2.6 MB">
                              Preset: ${student.name.replace(/[^a-zA-Z0-9]/g, '_')}_${exam.subject.replace(/[^a-zA-Z0-9]/g, '_')}_mock_solved.pdf (2.6 MB)
                            </option>
                            <option value="https://imperialcommerce.edu.in/answers/comprehensive_handwritten_working_notes.pdf" data-name="comprehensive_handwritten_working_notes.pdf" data-size="3.8 MB">
                              Preset: comprehensive_handwritten_working_notes.pdf (3.8 MB)
                            </option>
                          </select>
                        </div>

                        <!-- Selected File Preview Badge -->
                        <div id="file-preview-box-${exam.id}" style="padding: 0.55rem 0.85rem; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.3); border-radius: 6px; font-size: 0.82rem; color: #6ee7b7; display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.85rem;">
                          <span>📄 Selected Answer Sheet: <strong id="file-name-${exam.id}">${student.name.replace(/[^a-zA-Z0-9]/g, '_')}_${exam.subject.replace(/[^a-zA-Z0-9]/g, '_')}_mock_solved.pdf</strong> <span id="file-size-${exam.id}" style="color: var(--text-dim);">(2.6 MB)</span></span>
                          <span style="font-size: 0.75rem; color: #34d399; font-weight: 700;">✓ Attached</span>
                        </div>

                        <button 
                          type="button" 
                          class="btn-submit-exam-paper" 
                          data-exam-id="${exam.id}" 
                          data-type="pdf" 
                          style="width: 100%; padding: 0.75rem; background: linear-gradient(135deg, #10b981, #059669); color: #fff; font-weight: 800; font-size: 0.9rem; border: none; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: 0 4px 15px rgba(16,185,129,0.3);"
                        >
                          <span>⏹️</span> Stop Timer & Submit Answer Sheet PDF →
                        </button>
                      </div>
                    ` : ''}

                    <!-- DESK B: Google Form Online Test Submission -->
                    ${exam.googleFormLink ? `
                      <div>
                        <div style="font-size: 0.9rem; font-weight: 700; color: #a5b4fc; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
                          <span>🔗</span> Google Form Online Quiz Submission
                        </div>
                        <div style="font-size: 0.78rem; color: var(--text-dim); margin-bottom: 0.75rem;">
                          Complete your answers on the official Google Form, then click below to record completion and stop your test timer.
                        </div>

                        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                          <a 
                            href="${exam.googleFormLink}" 
                            target="_blank" 
                            style="padding: 0.65rem 1.25rem; background: linear-gradient(135deg, #4f46e5, #4338ca); color: #fff; font-weight: 700; font-size: 0.82rem; border-radius: 6px; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;"
                          >
                            <span>↗</span> Open Google Form Link for Test
                          </a>
                          <button 
                            type="button" 
                            class="btn-submit-exam-paper" 
                            data-exam-id="${exam.id}" 
                            data-type="google_form" 
                            style="padding: 0.65rem 1.35rem; background: linear-gradient(135deg, #10b981, #059669); color: #fff; font-weight: 800; font-size: 0.82rem; border: none; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem;"
                          >
                            <span>⏹️</span> Stop Timer & Submit Answers →
                          </button>
                        </div>
                      </div>
                    ` : ''}
                  </div>
                </div>
              ` : `
                <!-- ========================================== -->
                <!-- STATE 4: NOT STARTED YET (CALL TO START)  -->
                <!-- ========================================== -->
                <div style="margin-top: 0.75rem; padding: 1rem; background: rgba(0,0,0,0.25); border-radius: 6px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
                  <div>
                    <div style="font-size: 0.85rem; font-weight: 700; color: #fff;">
                      Ready to start your exam?
                    </div>
                    <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.15rem;">
                      Clicking below will start your official timer and open the question paper.
                    </div>
                  </div>

                  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    ${exam.questionPaperPdf ? `
                      <button 
                        type="button" 
                        class="btn-start-exam" 
                        data-exam-id="${exam.id}" 
                        data-url="${exam.questionPaperPdf}"
                        style="padding: 0.65rem 1.25rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 800; font-size: 0.85rem; border: none; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem; box-shadow: 0 4px 15px rgba(207,168,78,0.25);"
                      >
                        <span>▶</span> Open Paper PDF & Start Timer
                      </button>
                    ` : ''}

                    ${exam.googleFormLink ? `
                      <button 
                        type="button" 
                        class="btn-start-exam" 
                        data-exam-id="${exam.id}" 
                        data-url="${exam.googleFormLink}"
                        style="padding: 0.65rem 1.25rem; background: linear-gradient(135deg, #10b981, #059669); color: #fff; font-weight: 800; font-size: 0.85rem; border: none; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem; box-shadow: 0 4px 15px rgba(16,185,129,0.25);"
                      >
                        <span>▶</span> Open Google Form & Start Timer
                      </button>
                    ` : ''}
                  </div>
                </div>
              `}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Start Live Timer updates for any running exams
  const timerElements = container.querySelectorAll('.live-exam-timer');
  if (timerElements.length > 0) {
    const updateTimers = () => {
      timerElements.forEach(el => {
        const startMs = parseInt(el.getAttribute('data-start'), 10);
        if (!startMs) return;
        const elapsed = Math.max(0, Math.floor((Date.now() - startMs) / 1000));
        const hrs = Math.floor(elapsed / 3600);
        const mins = Math.floor((elapsed % 3600) / 60);
        const secs = elapsed % 60;
        const pad = n => String(n).padStart(2, '0');
        el.textContent = `⏱️ ${hrs > 0 ? pad(hrs) + ':' : ''}${pad(mins)}:${pad(secs)}`;
      });
    };
    updateTimers();
    container._examTimerInterval = setInterval(updateTimers, 1000);
  }

  // Attach: Start Exam & Timer
  container.querySelectorAll('.btn-start-exam').forEach(btn => {
    btn.addEventListener('click', () => {
      const examId = btn.getAttribute('data-exam-id');
      const openUrl = btn.getAttribute('data-url');
      state.startExamTimer(examId, student.id);
      if (openUrl) window.open(openUrl, '_blank');
      showToast('⏱️ Exam timer started! Question paper opened in a new tab. Good luck!', 'info');
      renderStudentExamsTab(container, student, showToast);
    });
  });

  // Attach: Preset Answer Select Change
  container.querySelectorAll('.preset-answer-select').forEach(sel => {
    sel.addEventListener('change', () => {
      const examId = sel.getAttribute('data-exam-id');
      const opt = sel.options[sel.selectedIndex];
      const name = opt.getAttribute('data-name');
      const size = opt.getAttribute('data-size');
      const fnEl = container.querySelector(`#file-name-${examId}`);
      const szEl = container.querySelector(`#file-size-${examId}`);
      if (fnEl) fnEl.textContent = name;
      if (szEl) szEl.textContent = `(${size})`;
    });
  });

  // Attach: Local File Input Change
  container.querySelectorAll('.answer-file-input').forEach(input => {
    input.addEventListener('change', () => {
      const examId = input.getAttribute('data-exam-id');
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const sizeMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
        const fnEl = container.querySelector(`#file-name-${examId}`);
        const szEl = container.querySelector(`#file-size-${examId}`);
        if (fnEl) fnEl.textContent = file.name;
        if (szEl) szEl.textContent = `(${sizeMb})`;
        showToast(`Attached answer sheet: ${file.name}`, 'info');
      }
    });
  });

  // Attach: Stop Timer & Submit Exam
  container.querySelectorAll('.btn-submit-exam-paper').forEach(btn => {
    btn.addEventListener('click', () => {
      const examId = btn.getAttribute('data-exam-id');
      const subType = btn.getAttribute('data-type');
      const timerRes = state.stopExamTimer(examId, student.id);

      let answerSheetName = 'student_exam_solution.pdf';
      let answerSheetSize = '2.4 MB';
      let answerSheetPdf = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80';

      if (subType === 'pdf') {
        const fnEl = container.querySelector(`#file-name-${examId}`);
        const szEl = container.querySelector(`#file-size-${examId}`);
        const presetSel = container.querySelector(`.preset-answer-select[data-exam-id="${examId}"]`);
        if (fnEl && fnEl.textContent) answerSheetName = fnEl.textContent.trim();
        if (szEl && szEl.textContent) answerSheetSize = szEl.textContent.replace(/[()]/g, '').trim();
        if (presetSel && presetSel.value) answerSheetPdf = presetSel.value;
      } else {
        answerSheetName = 'Google_Form_Online_Quiz_Response';
        answerSheetSize = 'Cloud Form';
      }

      state.submitStudentExam(examId, student.id, {
        answerSheetPdf,
        answerSheetName,
        answerSheetSize,
        submissionType: subType,
        timeTakenSeconds: timerRes.seconds,
        timeTakenFormatted: timerRes.formatted,
        remarks: subType === 'google_form' 
          ? 'Completed and submitted via official Google Form online quiz.' 
          : 'Answer sheet uploaded by student. Timer verified & paper queued for faculty grading.'
      });

      showToast(`🎉 Exam submitted! Recorded time taken: ${timerRes.formatted}. Sent to examiner.`, 'success');
      renderStudentExamsTab(container, student, showToast);
    });
  });
}

// =============================================================================
// TAB 6: PERFORMANCE: ATTENDANCE & MARKS (Showing each test assessment separately)
// =============================================================================
function renderStudentPerformanceTab(container, student) {
  const marks = student.performanceMarks || { weekly: [], quarterly: [], sixMonthly: [] };

  container.innerHTML = `
    <!-- Top Summary Banner -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
      <div class="card" style="padding: 1.25rem; border: 1px solid rgba(16,185,129,0.3); background: rgba(16,185,129,0.08); border-radius: 8px;">
        <div style="font-size: 0.8rem; text-transform: uppercase; color: #34d399; font-weight: 700;">Overall Attendance</div>
        <div style="font-size: 2rem; font-weight: 800; color: #34d399; margin: 0.25rem 0;">${student.attendancePercent}%</div>
        <div style="font-size: 0.75rem; color: #6ee7b7;">Class Attendance Requirement: Met (Above 75%)</div>
      </div>

      <div class="card" style="padding: 1.25rem; border: 1px solid var(--border-gold); background: rgba(207,168,78,0.08); border-radius: 8px;">
        <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent-gold); font-weight: 700;">Weekly Test Average</div>
        <div style="font-size: 2rem; font-weight: 800; color: #fff; margin: 0.25rem 0;">96.5%</div>
        <div style="font-size: 0.75rem; color: var(--text-muted);">Calculated over all weekly assessments</div>
      </div>

      <div class="card" style="padding: 1.25rem; border: 1px solid rgba(99,102,241,0.3); background: rgba(99,102,241,0.08); border-radius: 8px;">
        <div style="font-size: 0.8rem; text-transform: uppercase; color: #a5b4fc; font-weight: 700;">Terminal & Pre-Board Merit</div>
        <div style="font-size: 2rem; font-weight: 800; color: #a5b4fc; margin: 0.25rem 0;">Distinction</div>
        <div style="font-size: 0.75rem; color: #c7d2fe;">Quarterly: 95/100 • Six-Monthly: 96/100</div>
      </div>
    </div>

    <!-- Showing Each Test Assessment Separately -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem;">
      <!-- Weekly Tests -->
      <div class="card" style="padding: 1.25rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
        <h4 style="font-size: 1.05rem; color: #34d399; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
          <span>📅</span> Weekly Tests Assessment
        </h4>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${(marks.weekly && marks.weekly.length ? marks.weekly : [
            { testName: 'Weekly Unit Test #1', subject: 'Accounts', maxMarks: 50, marks: 49, date: '2026-10-10', timeTaken: '48 mins 15 secs' },
            { testName: 'Weekly Unit Test #2', subject: 'Economics', maxMarks: 50, marks: 47, date: '2026-10-14', timeTaken: '52 mins 00 secs' }
          ]).map(t => `
            <div style="padding: 0.65rem; background: rgba(255,255,255,0.02); border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-weight: 600; color: #fff; font-size: 0.85rem;">${t.testName}</div>
                <div style="font-size: 0.72rem; color: var(--text-dim); margin-top: 0.15rem;">
                  ${t.subject} • ${t.date} ${t.timeTaken ? `• <span style="color: var(--accent-gold-light); font-weight: 600;">⏱️ ${t.timeTaken}</span>` : ''}
                </div>
              </div>
              <div style="font-weight: 800; color: #34d399; font-size: 1rem;">
                ${t.marks} / ${t.maxMarks}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Quarterly Tests -->
      <div class="card" style="padding: 1.25rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
        <h4 style="font-size: 1.05rem; color: var(--accent-gold-light); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
          <span>📊</span> Quarterly Terminal Exams
        </h4>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${(marks.quarterly && marks.quarterly.length ? marks.quarterly : [
            { testName: 'Quarterly Terminal Exam', subject: 'Accounts & Economics', maxMarks: 100, marks: 95, date: '2026-08-28', timeTaken: '1 hr 45 mins' }
          ]).map(t => `
            <div style="padding: 0.65rem; background: rgba(255,255,255,0.02); border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-weight: 600; color: #fff; font-size: 0.85rem;">${t.testName}</div>
                <div style="font-size: 0.72rem; color: var(--text-dim); margin-top: 0.15rem;">
                  ${t.subject} • ${t.date} ${t.timeTaken ? `• <span style="color: var(--accent-gold-light); font-weight: 600;">⏱️ ${t.timeTaken}</span>` : ''}
                </div>
              </div>
              <div style="font-weight: 800; color: var(--accent-gold-light); font-size: 1rem;">
                ${t.marks} / ${t.maxMarks}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Six Monthly Tests -->
      <div class="card" style="padding: 1.25rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
        <h4 style="font-size: 1.05rem; color: #60a5fa; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
          <span>🏆</span> Six-Monthly Pre-Board Benchmark
        </h4>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${(marks.sixMonthly && marks.sixMonthly.length ? marks.sixMonthly : [
            { testName: 'Six-Monthly Pre-Board Simulation', subject: 'Full Commerce Syllabus', maxMarks: 100, marks: 96, date: '2026-09-30', timeTaken: '2 hrs 40 mins' }
          ]).map(t => `
            <div style="padding: 0.65rem; background: rgba(255,255,255,0.02); border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-weight: 600; color: #fff; font-size: 0.85rem;">${t.testName}</div>
                <div style="font-size: 0.72rem; color: var(--text-dim); margin-top: 0.15rem;">
                  ${t.subject} • ${t.date} ${t.timeTaken ? `• <span style="color: var(--accent-gold-light); font-weight: 600;">⏱️ ${t.timeTaken}</span>` : ''}
                </div>
              </div>
              <div style="font-weight: 800; color: #60a5fa; font-size: 1rem;">
                ${t.marks} / ${t.maxMarks}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
