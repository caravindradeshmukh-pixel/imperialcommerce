/* Imperial Commerce Tutorials - Teacher Portal
   Comprehensive 7-Tab Faculty Workstation */

import { state } from '../state.js';

import { openLoginModal } from './loginModal.js';

export function renderTeacherPortal(container, showToast) {
  // Strict Session Guard
  if (!state.currentUser || (!['teacher', 'director'].includes(state.currentUser.role))) {
    container.innerHTML = `
      <div style="max-width: 600px; margin: 4rem auto; padding: 2.5rem; background: #ffffff; border: 1px solid #cbd5e1; border-top: 5px solid #0f2042; border-radius: 14px; text-align: center; box-shadow: 0 15px 40px rgba(15,32,66,0.12);">
        <div style="font-size: 2.8rem; margin-bottom: 1rem;">👨‍🏫</div>
        <h2 style="color: #0f2042; font-size: 1.45rem; font-weight: 800; margin-bottom: 0.5rem;">Faculty Authentication Required</h2>
        <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
          Please sign in with your verified faculty credentials to access lesson notes, syllabus coverage, marks assessment, and 60% remuneration records.
        </p>
        <button id="gate-teacher-login-btn" style="background: linear-gradient(135deg, #0f2042, #1e3a8a); color: #fff; border: none; padding: 0.8rem 1.85rem; border-radius: 8px; font-weight: 800; font-size: 0.95rem; cursor: pointer; box-shadow: 0 4px 15px rgba(15,32,66,0.25);">
          🔐 Sign In as Faculty
        </button>
      </div>
    `;
    const btn = container.querySelector('#gate-teacher-login-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        openLoginModal('teacher');
      });
    }
    return;
  }

  const activeTab = state.currentTeacherTab || 'notes';

  const tabs = [
    { id: 'notes', label: '1. Daily Lesson Notes', icon: '📖' },
    { id: 'homework', label: '2. Daily Homework', icon: '📝' },
    { id: 'attendance', label: '3. Daily Attendance', icon: '📅' },
    { id: 'plan', label: '4. Daily Teaching Plan', icon: '📋' },
    { id: 'exam', label: '5. Exam & Marks Assessment', icon: '🎯' },
    { id: 'remuneration', label: '6. 60% Remuneration Ledger', icon: '💰' },
    { id: 'queries', label: '7. Student Queries & Replies', icon: '💬' }
  ];

  const currentTabObj = tabs.find(t => t.id === activeTab) || tabs[0];

  const currentTeacher = state.getCurrentTeacher();
  const assignedSubjects = state.getTeacherAssignedSubjects();

  container.innerHTML = `
    <div class="portal-container" style="max-width: 1560px; margin: 0 auto; padding: 1.5rem 1.5rem 5rem; display: grid; grid-template-columns: 280px 1fr; gap: 1.75rem; align-items: start;">
      <!-- Faculty Header Banner (Full width across top) -->
      <div class="card" style="grid-column: 1 / -1; margin-bottom: 0; background: linear-gradient(135deg, rgba(19, 29, 49, 0.95), rgba(13, 21, 39, 0.95)); border: 1px solid rgba(16, 185, 129, 0.35); padding: 1.15rem 1.75rem; border-radius: var(--radius-lg); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; box-shadow: var(--shadow-md);">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, #10b981, #059669); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: #fff; font-weight: 800; box-shadow: 0 4px 20px rgba(16,185,129,0.3);">
            👨‍🏫
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
              <h2 style="font-size: 1.35rem; color: #fff; margin: 0;">FACULTY WORKSTATION</h2>
              <span class="status-badge" style="background: rgba(16,185,129,0.2); color: #34d399; border: 1px solid rgba(16,185,129,0.4); font-size: 0.8rem; padding: 0.2rem 0.65rem; border-radius: 20px; font-weight: 700;">
                ${currentTeacher.name}
              </span>
              <span style="font-size: 0.72rem; color: var(--accent-gold); background: rgba(207,168,78,0.12); padding: 0.15rem 0.5rem; border-radius: 4px; border: 1px solid rgba(207,168,78,0.3);">
                ${currentTeacher.qualification || 'Senior Faculty'}
              </span>
            </div>
            <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.35rem; display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
              <span style="color: var(--accent-gold-light); font-weight: 600;">Director-Assigned Subjects:</span>
              ${assignedSubjects.map(sub => `
                <span style="background: rgba(16,185,129,0.15); color: #6ee7b7; border: 1px solid rgba(16,185,129,0.35); padding: 0.1rem 0.45rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">
                  ${sub}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.4rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; background: rgba(0,0,0,0.35); padding: 0.4rem 0.75rem; border-radius: 8px; border: 1px solid var(--border-light);">
            <label for="teacher-profile-select" style="font-size: 0.75rem; color: var(--accent-gold); font-weight: 700; white-space: nowrap;">
              Switch Faculty Profile:
            </label>
            <select id="teacher-profile-select" style="background: #0c1424; color: #fff; border: 1px solid var(--border-light); border-radius: 4px; font-size: 0.82rem; padding: 0.25rem 0.55rem; font-weight: 600; cursor: pointer;">
              ${state.teachers.map(t => `
                <option value="${t.id}" ${t.id === currentTeacher.id ? 'selected' : ''}>
                  ${t.name} (${(t.assignedSubjects || []).length} assigned subjects)
                </option>
              `).join('')}
            </select>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-dim); text-align: right;">
            Imperial Commerce Tutorials • Nashik
          </div>
        </div>
      </div>

      <!-- Left Column: Faculty Navigation Sidebar -->
      <aside class="portal-sidebar" style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.25rem; height: fit-content; position: sticky; top: 5.5rem;">
        <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); font-weight: 800; margin-bottom: 0.85rem; padding-left: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
          <span>FACULTY DESKS</span>
          <span style="font-size: 0.7rem; background: rgba(16,185,129,0.2); color: #6ee7b7; padding: 0.1rem 0.45rem; border-radius: 4px; font-weight: 700;">7 Modules</span>
        </div>
        <nav class="portal-nav-list" style="display: flex; flex-direction: column; gap: 0.4rem;">
          ${tabs.map(t => {
            const isActive = activeTab === t.id;
            return `
              <button 
                class="teacher-tab-btn ${isActive ? 'active-teacher-tab' : ''}" 
                data-tab="${t.id}"
                style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 0.95rem; border-radius: 8px; font-size: 0.88rem; font-weight: ${isActive ? '700' : '600'}; cursor: pointer; text-align: left; width: 100%; border: 1px solid ${isActive ? '#10b981' : 'transparent'}; background: ${isActive ? 'rgba(16, 185, 129, 0.18)' : 'rgba(255,255,255,0.02)'}; color: ${isActive ? '#6ee7b7' : 'var(--text-muted)'}; transition: all 0.2s ease;"
              >
                <span style="font-size: 1.15rem; width: 22px; text-align: center;">${t.icon}</span>
                <span style="flex: 1;">${t.label}</span>
                ${isActive ? '<span style="font-size: 0.75rem; color: #34d399;">●</span>' : ''}
              </button>
            `;
          }).join('')}
        </nav>
      </aside>

      <!-- Right Column: Tab Content Canvas -->
      <section class="portal-content" style="min-width: 0; display: flex; flex-direction: column; gap: 1.25rem;">
        <div id="teacher-tab-content" style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%;">
          <!-- Rendered dynamically -->
        </div>
      </section>
    </div>
  `;

  // Attach tab events
  const tabBtns = container.querySelectorAll('.teacher-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      state.currentTeacherTab = tabId;
      renderTeacherPortal(container, showToast);
    });
  });

  // Attach faculty profile switcher event
  const profSelect = container.querySelector('#teacher-profile-select');
  if (profSelect) {
    profSelect.addEventListener('change', (e) => {
      state.setCurrentTeacher(e.target.value);
      renderTeacherPortal(container, showToast);
      showToast(`Switched faculty profile to ${state.getCurrentTeacher().name}. Dropdown subjects updated!`, 'info');
    });
  }

  const tabContent = container.querySelector('#teacher-tab-content');

  switch (activeTab) {
    case 'notes':
      renderDailyLessonNotesTab(tabContent, showToast);
      break;
    case 'homework':
      renderDailyHomeworkTab(tabContent, showToast);
      break;
    case 'attendance':
      renderTeacherAttendanceTab(tabContent, showToast);
      break;
    case 'plan':
      renderDailyTeachingPlanTab(tabContent, showToast);
      break;
    case 'exam':
      renderTeacherExamTab(tabContent, showToast);
      break;
    case 'remuneration':
      renderTeacherRemunerationTab(tabContent);
      break;
    case 'queries':
      renderTeacherQueriesTab(tabContent, showToast);
      break;
    default:
      renderDailyLessonNotesTab(tabContent, showToast);
      break;
  }
}

// =============================================================================
// TAB 1: COURSE WISE DAILY LESSON NOTES (Report presented to Director in his login)
// =============================================================================
function renderDailyLessonNotesTab(container, showToast) {
  const portions = state.portions;
  const courses = state.courses;
  const currentTeacher = state.getCurrentTeacher();
  const assignedSubjects = state.getTeacherAssignedSubjects();

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 1.5rem; align-items: start;">
      <!-- Log Lesson Note Form -->
      <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-gold); background: var(--bg-surface); border-radius: var(--radius-md);">
        <div style="margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
          <h3 style="font-size: 1.15rem; color: #fff; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
            <span>📝</span> Log Daily Lesson Notes & Media
          </h3>
          <div style="font-size: 0.78rem; color: var(--accent-gold); margin-top: 0.25rem;">
            *Daily inputs with uploaded Video, Image (Board photo) or PDF notes are automatically audited by Director and accessible to students
          </div>
        </div>

        <form id="teacher-lesson-form">
          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Select Course <span style="color: var(--accent-gold);">*</span>
            </label>
            <select id="lesson-course-select" style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.88rem;">
              ${courses.map(c => `<option value="${c.id}" data-name="${c.name}">${c.name}</option>`).join('')}
            </select>
          </div>

          <div style="margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <label for="lesson-subject-select" style="font-size: 0.85rem; font-weight: 600; color: #fff; margin: 0;">
                Subject Assigned by Director <span style="color: var(--accent-gold);">*</span>
              </label>
              <span style="font-size: 0.72rem; color: #34d399; font-weight: 600; background: rgba(16,185,129,0.15); padding: 0.1rem 0.45rem; border-radius: 4px; border: 1px solid rgba(16,185,129,0.3);">
                ✓ ${assignedSubjects.length} Assigned to Profile
              </span>
            </div>
            <select 
              id="lesson-subject-select" 
              style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.88rem; font-weight: 600;"
              required 
            >
              ${assignedSubjects.map(sub => `<option value="${sub}">${sub}</option>`).join('')}
            </select>
            <div style="font-size: 0.72rem; color: var(--text-dim); margin-top: 0.3rem;">
              *Subject list is determined by Director in Faculty Profile assignments.
            </div>
          </div>

          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Topic / Chapter Covered Today <span style="color: var(--accent-gold);">*</span>
            </label>
            <textarea 
              id="lesson-topic-input" 
              rows="3" 
              placeholder="e.g. Partnership Final Accounts - Treatment of Hidden Goodwill and Revaluation Account rulings" 
              style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;"
              required
            ></textarea>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
                Syllabus Completion %
              </label>
              <input 
                type="number" 
                id="lesson-pct-input" 
                value="85" 
                min="1" 
                max="100" 
                style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.95rem; font-weight: 700;"
              />
            </div>
            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
                Next Lecture Topic
              </label>
              <input 
                type="text" 
                id="lesson-next-input" 
                placeholder="e.g. Section 16 ITC supply conditions" 
                style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;"
              />
            </div>
          </div>

          <!-- Media Attachment Provision (Video, Image, PDF) -->
          <div style="margin-bottom: 1.25rem; padding: 1rem; background: rgba(0,0,0,0.25); border: 1px solid var(--border-gold); border-radius: 8px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 700; color: var(--accent-gold-light); margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
              <span>📁 Upload Topic Media / Covered Portion Notes</span>
              <span style="font-size: 0.72rem; color: var(--text-dim); font-weight: 400;">Video, Image or PDF</span>
            </label>

            <!-- Media Type Selector -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.4rem; margin-bottom: 0.75rem;">
              <button type="button" class="media-type-btn active" data-type="image" style="padding: 0.45rem 0.2rem; border-radius: 6px; font-size: 0.75rem; font-weight: 700; border: 1px solid #10b981; background: rgba(16,185,129,0.2); color: #34d399; cursor: pointer; text-align: center;">
                📷 Image
              </button>
              <button type="button" class="media-type-btn" data-type="video" style="padding: 0.45rem 0.2rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; border: 1px solid var(--border-light); background: rgba(255,255,255,0.02); color: var(--text-muted); cursor: pointer; text-align: center;">
                🎥 Video
              </button>
              <button type="button" class="media-type-btn" data-type="pdf" style="padding: 0.45rem 0.2rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; border: 1px solid var(--border-light); background: rgba(255,255,255,0.02); color: var(--text-muted); cursor: pointer; text-align: center;">
                📄 PDF
              </button>
              <button type="button" class="media-type-btn" data-type="none" style="padding: 0.45rem 0.2rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; border: 1px solid var(--border-light); background: rgba(255,255,255,0.02); color: var(--text-muted); cursor: pointer; text-align: center;">
                🚫 None
              </button>
            </div>

            <!-- Dynamic Media Inputs Container -->
            <div id="media-input-box">
              <div style="margin-bottom: 0.5rem;">
                <label style="display: block; font-size: 0.78rem; color: #cbd5e1; margin-bottom: 0.25rem;">
                  Choose Local File (Board Photo / Whiteboard Snapshot):
                </label>
                <input 
                  type="file" 
                  id="lesson-file-input" 
                  accept="image/*"
                  style="width: 100%; font-size: 0.8rem; color: #cbd5e1; padding: 0.4rem; background: #0c1424; border: 1px dashed var(--border-gold); border-radius: 6px;"
                />
              </div>

              <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.4rem;">
                <span style="font-size: 0.72rem; color: var(--text-dim);">OR Quick Select Sample:</span>
                <select id="lesson-sample-media" style="flex: 1; padding: 0.35rem 0.5rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 5px; color: #cbd5e1; font-size: 0.75rem;">
                  <option value="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80" data-name="Classroom_Board_Revaluation_Ledger.jpg" data-size="2.4 MB">
                    Sample: Blackboard Ledger Notes Photo (2.4 MB)
                  </option>
                  <option value="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80" data-name="Accounts_Concept_Mindmap.png" data-size="1.8 MB">
                    Sample: Accounts Mindmap Diagram (1.8 MB)
                  </option>
                </select>
              </div>

              <!-- Media Preview Box -->
              <div id="lesson-media-preview" style="margin-top: 0.75rem; padding: 0.5rem; background: rgba(0,0,0,0.4); border-radius: 6px; border: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 0.75rem;">
                <div id="preview-thumb" style="width: 50px; height: 50px; border-radius: 4px; overflow: hidden; background: #1e293b; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                  📷
                </div>
                <div style="flex: 1; min-width: 0;">
                  <div id="preview-filename" style="font-size: 0.8rem; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    Classroom_Board_Revaluation_Ledger.jpg
                  </div>
                  <div id="preview-meta" style="font-size: 0.72rem; color: #34d399;">
                    Image Ready • 2.4 MB
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            style="width: 100%; padding: 0.75rem; background: linear-gradient(135deg, #10b981, #059669); color: #fff; font-weight: 700; font-size: 0.95rem; border: none; border-radius: 6px; cursor: pointer; box-shadow: 0 4px 15px rgba(16,185,129,0.3);"
          >
            Submit Daily Lesson Notes & Media →
          </button>
        </form>
      </div>

      <!-- History of Logged Daily Lesson Notes -->
      <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <div>
            <h3 style="font-size: 1.15rem; color: #fff; margin: 0;">Logged Daily Lesson Reports</h3>
            <span style="font-size: 0.78rem; color: #34d399;">Audited live by Director • Shared with Enrolled Students</span>
          </div>
          <span style="font-size: 0.75rem; background: rgba(207,168,78,0.15); color: var(--accent-gold); padding: 0.2rem 0.6rem; border-radius: 20px; font-weight: 700;">
            ${portions.length} Entries
          </span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.85rem; max-height: 560px; overflow-y: auto; padding-right: 0.25rem;">
          ${portions.map(p => `
            <div style="padding: 1rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 8px; transition: border 0.2s;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span style="font-weight: 700; color: #fff; font-size: 0.95rem;">${p.courseName || 'Commerce Batch'}</span>
                <span style="font-size: 0.75rem; color: var(--accent-gold); font-weight: 600;">${p.subject} • ${p.date}</span>
              </div>
              <div style="font-size: 0.84rem; color: #cbd5e1; margin-bottom: 0.5rem; line-height: 1.4;">
                <strong style="color: #fff;">Topic Covered:</strong> ${p.topicCovered}
              </div>

              <!-- Attached Media Card (Video / Image / PDF) -->
              ${p.mediaType && p.mediaType !== 'none' ? `
                <div style="margin: 0.6rem 0; padding: 0.65rem; background: rgba(0,0,0,0.3); border: 1px solid ${p.mediaType === 'video' ? 'rgba(99,102,241,0.35)' : p.mediaType === 'pdf' ? 'rgba(239,68,68,0.35)' : 'rgba(16,185,129,0.35)'}; border-radius: 6px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                    <span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: ${p.mediaType === 'video' ? '#a5b4fc' : p.mediaType === 'pdf' ? '#fca5a5' : '#6ee7b7'};">
                      ${p.mediaType === 'video' ? '🎥 Lecture Video Clip' : p.mediaType === 'pdf' ? '📄 Topic Handout PDF' : '📷 Blackboard Diagram Photo'}
                    </span>
                    <span style="font-size: 0.7rem; color: var(--text-dim);">${p.mediaSize || 'Verified Resource'}</span>
                  </div>

                  ${p.mediaType === 'image' ? `
                    <div style="position: relative; border-radius: 4px; overflow: hidden; max-height: 140px; background: #0c1424;">
                      <img src="${p.mediaUrl}" alt="${p.mediaName}" style="width: 100%; height: 140px; object-fit: cover; cursor: pointer;" onclick="window.open('${p.mediaUrl}', '_blank')" />
                      <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.85)); padding: 0.3rem 0.5rem; font-size: 0.72rem; color: #fff; display: flex; justify-content: space-between;">
                        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.mediaName || 'Board_Notes.jpg'}</span>
                        <span style="color: var(--accent-gold);">🔍 Click to Expand</span>
                      </div>
                    </div>
                  ` : p.mediaType === 'video' ? `
                    <div>
                      <video controls src="${p.mediaUrl}" style="width: 100%; max-height: 150px; background: #000; border-radius: 4px; display: block;"></video>
                      <div style="font-size: 0.72rem; color: #a5b4fc; margin-top: 0.25rem;">
                        ▶ ${p.mediaName || 'Topic_Lecture_Snippet.mp4'}
                      </div>
                    </div>
                  ` : `
                    <a href="${p.mediaUrl || '#'}" target="_blank" style="display: flex; align-items: center; gap: 0.6rem; padding: 0.5rem 0.75rem; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25); border-radius: 6px; color: #fca5a5; text-decoration: none; font-size: 0.8rem;">
                      <span style="font-size: 1.2rem;">📕</span>
                      <div style="flex: 1; min-width: 0;">
                        <div style="font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.mediaName || 'Topic_Handout_Notes.pdf'}</div>
                        <div style="font-size: 0.7rem; color: var(--text-dim);">Click to Download / View PDF Handout</div>
                      </div>
                      <span style="font-size: 0.75rem; color: var(--accent-gold);">↗</span>
                    </a>
                  `}
                </div>
              ` : ''}

              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.76rem; color: var(--text-dim); border-top: 1px solid var(--border-subtle); padding-top: 0.4rem; margin-top: 0.4rem;">
                <span><strong>Next Lecture:</strong> ${p.nextLectureTopic}</span>
                <span style="font-weight: 700; color: #34d399;">${p.completionPercent}% Complete</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Media Type Switching Logic
  let selectedMediaType = 'image';
  let activeMediaUrl = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80';
  let activeMediaName = 'Classroom_Board_Revaluation_Ledger.jpg';
  let activeMediaSize = '2.4 MB';

  const typeBtns = container.querySelectorAll('.media-type-btn');
  const mediaInputBox = container.querySelector('#media-input-box');

  const updateMediaUI = (type) => {
    selectedMediaType = type;
    typeBtns.forEach(b => {
      const isMatch = b.getAttribute('data-type') === type;
      b.style.border = isMatch ? '1px solid #10b981' : '1px solid var(--border-light)';
      b.style.background = isMatch ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.02)';
      b.style.color = isMatch ? '#34d399' : 'var(--text-muted)';
      b.style.fontWeight = isMatch ? '700' : '600';
    });

    if (type === 'none') {
      mediaInputBox.innerHTML = `
        <div style="font-size: 0.78rem; color: var(--text-dim); padding: 0.5rem; text-align: center;">
          No digital media will be attached to this day's lesson note.
        </div>
      `;
      activeMediaUrl = '';
      activeMediaName = '';
      activeMediaSize = '';
      return;
    }

    if (type === 'image') {
      activeMediaUrl = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80';
      activeMediaName = 'Classroom_Board_Revaluation_Ledger.jpg';
      activeMediaSize = '2.4 MB';

      mediaInputBox.innerHTML = `
        <div style="margin-bottom: 0.5rem;">
          <label style="display: block; font-size: 0.78rem; color: #cbd5e1; margin-bottom: 0.25rem;">
            Choose Local Board Photo / Diagram (JPG / PNG):
          </label>
          <input 
            type="file" 
            id="lesson-file-input" 
            accept="image/*"
            style="width: 100%; font-size: 0.8rem; color: #cbd5e1; padding: 0.4rem; background: #0c1424; border: 1px dashed #10b981; border-radius: 6px;"
          />
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.4rem;">
          <span style="font-size: 0.72rem; color: var(--text-dim);">Preset Samples:</span>
          <select id="lesson-sample-media" style="flex: 1; padding: 0.35rem 0.5rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 5px; color: #cbd5e1; font-size: 0.75rem;">
            <option value="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80" data-name="Classroom_Board_Revaluation_Ledger.jpg" data-size="2.4 MB">
              Blackboard Revaluation Ledger Photo (2.4 MB)
            </option>
            <option value="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80" data-name="Accounts_Working_Chart.png" data-size="1.8 MB">
              Accounts Mindmap & Rulings Chart (1.8 MB)
            </option>
          </select>
        </div>
        <div id="lesson-media-preview" style="margin-top: 0.75rem; padding: 0.5rem; background: rgba(0,0,0,0.4); border-radius: 6px; border: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 0.75rem;">
          <div id="preview-thumb" style="width: 50px; height: 50px; border-radius: 4px; overflow: hidden; background: #1e293b; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
            📷
          </div>
          <div style="flex: 1; min-width: 0;">
            <div id="preview-filename" style="font-size: 0.8rem; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${activeMediaName}</div>
            <div id="preview-meta" style="font-size: 0.72rem; color: #34d399;">Image Ready • ${activeMediaSize}</div>
          </div>
        </div>
      `;
    } else if (type === 'video') {
      activeMediaUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';
      activeMediaName = 'Topic_Core_Lecture_Video_Clip.mp4';
      activeMediaSize = '14.5 MB';

      mediaInputBox.innerHTML = `
        <div style="margin-bottom: 0.5rem;">
          <label style="display: block; font-size: 0.78rem; color: #cbd5e1; margin-bottom: 0.25rem;">
            Upload Lecture Snippet / Recording (MP4 / WebM):
          </label>
          <input 
            type="file" 
            id="lesson-file-input" 
            accept="video/*"
            style="width: 100%; font-size: 0.8rem; color: #cbd5e1; padding: 0.4rem; background: #0c1424; border: 1px dashed #6366f1; border-radius: 6px;"
          />
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.4rem;">
          <span style="font-size: 0.72rem; color: var(--text-dim);">Preset Samples:</span>
          <select id="lesson-sample-media" style="flex: 1; padding: 0.35rem 0.5rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 5px; color: #cbd5e1; font-size: 0.75rem;">
            <option value="https://www.w3schools.com/html/mov_bbb.mp4" data-name="Topic_Core_Lecture_Video_Clip.mp4" data-size="14.5 MB">
              Topic Core Lecture Clip (MP4 • 14.5 MB)
            </option>
            <option value="https://www.w3schools.com/html/mov_bbb.mp4" data-name="Numerical_Problem_Solving_Walkthrough.mp4" data-size="22 MB">
              Numerical Problem Solving Walkthrough (MP4 • 22 MB)
            </option>
          </select>
        </div>
        <div id="lesson-media-preview" style="margin-top: 0.75rem; padding: 0.5rem; background: rgba(0,0,0,0.4); border-radius: 6px; border: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 0.75rem;">
          <div id="preview-thumb" style="width: 50px; height: 50px; border-radius: 4px; overflow: hidden; background: #1e293b; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
            🎥
          </div>
          <div style="flex: 1; min-width: 0;">
            <div id="preview-filename" style="font-size: 0.8rem; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${activeMediaName}</div>
            <div id="preview-meta" style="font-size: 0.72rem; color: #818cf8;">Video Ready • ${activeMediaSize}</div>
          </div>
        </div>
      `;
    } else if (type === 'pdf') {
      activeMediaUrl = 'https://imperialcommerce.edu.in/docs/pgbp_sec30_43d_comprehensive_handout.pdf';
      activeMediaName = 'Topic_Handout_Formula_Summary.pdf';
      activeMediaSize = '3.8 MB';

      mediaInputBox.innerHTML = `
        <div style="margin-bottom: 0.5rem;">
          <label style="display: block; font-size: 0.78rem; color: #cbd5e1; margin-bottom: 0.25rem;">
            Upload Topic Handout / PDF Summary Document:
          </label>
          <input 
            type="file" 
            id="lesson-file-input" 
            accept=".pdf"
            style="width: 100%; font-size: 0.8rem; color: #cbd5e1; padding: 0.4rem; background: #0c1424; border: 1px dashed #ef4444; border-radius: 6px;"
          />
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.4rem;">
          <span style="font-size: 0.72rem; color: var(--text-dim);">Preset Samples:</span>
          <select id="lesson-sample-media" style="flex: 1; padding: 0.35rem 0.5rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 5px; color: #cbd5e1; font-size: 0.75rem;">
            <option value="https://imperialcommerce.edu.in/docs/pgbp_sec30_43d_comprehensive_handout.pdf" data-name="Topic_Handout_Formula_Summary.pdf" data-size="3.8 MB">
              PGBP & Accounts Revision Handout (PDF • 3.8 MB)
            </option>
            <option value="https://imperialcommerce.edu.in/docs/partnership_q9_working.pdf" data-name="Question_Bank_Solved_Examples.pdf" data-size="2.1 MB">
              Solved Question Bank & Exemplar (PDF • 2.1 MB)
            </option>
          </select>
        </div>
        <div id="lesson-media-preview" style="margin-top: 0.75rem; padding: 0.5rem; background: rgba(0,0,0,0.4); border-radius: 6px; border: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 0.75rem;">
          <div id="preview-thumb" style="width: 50px; height: 50px; border-radius: 4px; overflow: hidden; background: #1e293b; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
            📄
          </div>
          <div style="flex: 1; min-width: 0;">
            <div id="preview-filename" style="font-size: 0.8rem; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${activeMediaName}</div>
            <div id="preview-meta" style="font-size: 0.72rem; color: #f87171;">PDF Document Ready • ${activeMediaSize}</div>
          </div>
        </div>
      `;
    }

    // Attach local file reader & sample select
    attachFileInputEvents();
  };

  const attachFileInputEvents = () => {
    const fileInput = mediaInputBox.querySelector('#lesson-file-input');
    const sampleSelect = mediaInputBox.querySelector('#lesson-sample-media');

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          activeMediaName = file.name;
          activeMediaSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
          
          if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
              activeMediaUrl = event.target.result;
              const pThumb = mediaInputBox.querySelector('#preview-thumb');
              if (pThumb) pThumb.innerHTML = `<img src="${activeMediaUrl}" style="width: 100%; height: 100%; object-fit: cover;" />`;
            };
            reader.readAsDataURL(file);
          } else if (file.type.startsWith('video/')) {
            activeMediaUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';
          } else {
            activeMediaUrl = 'https://imperialcommerce.edu.in/docs/sample_handout.pdf';
          }

          const fn = mediaInputBox.querySelector('#preview-filename');
          const meta = mediaInputBox.querySelector('#preview-meta');
          if (fn) fn.textContent = activeMediaName;
          if (meta) meta.textContent = `Uploaded File • ${activeMediaSize}`;
        }
      });
    }

    if (sampleSelect) {
      sampleSelect.addEventListener('change', () => {
        const opt = sampleSelect.options[sampleSelect.selectedIndex];
        activeMediaUrl = sampleSelect.value;
        activeMediaName = opt.getAttribute('data-name');
        activeMediaSize = opt.getAttribute('data-size');
        const fn = mediaInputBox.querySelector('#preview-filename');
        const meta = mediaInputBox.querySelector('#preview-meta');
        if (fn) fn.textContent = activeMediaName;
        if (meta) meta.textContent = `Preset Sample • ${activeMediaSize}`;
      });
    }
  };

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      updateMediaUI(btn.getAttribute('data-type'));
    });
  });

  attachFileInputEvents();

  // Submit form handler
  container.querySelector('#teacher-lesson-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const sel = container.querySelector('#lesson-course-select');
    const courseId = sel.value;
    const courseName = sel.options[sel.selectedIndex].getAttribute('data-name');
    const subSel = container.querySelector('#lesson-subject-select') || container.querySelector('#lesson-subject-input');
    const subject = subSel ? subSel.value : (assignedSubjects[0] || 'Accounts');
    const topicCovered = container.querySelector('#lesson-topic-input').value;
    const completionPercent = container.querySelector('#lesson-pct-input').value;
    const nextLectureTopic = container.querySelector('#lesson-next-input').value;

    state.logPortion({
      courseId,
      courseName,
      subject,
      topicCovered,
      completionPercent,
      nextLectureTopic,
      mediaType: selectedMediaType,
      mediaUrl: activeMediaUrl,
      mediaName: activeMediaName,
      mediaSize: activeMediaSize,
      teacher: currentTeacher.name
    });

    showToast(`Daily lesson note for "${subject}" logged by ${currentTeacher.name} with ${selectedMediaType !== 'none' ? selectedMediaType.toUpperCase() : 'standard'} material! Synced to Director.`, 'success');
    renderDailyLessonNotesTab(container, showToast);
  });
}

// =============================================================================
// TAB 2: DAILY HOMEWORK TAB (Given & Checked + WhatsApp Message for Incomplete)
// =============================================================================
function renderDailyHomeworkTab(container, showToast) {
  const homeworks = state.homeworks;
  const students = state.students;

  container.innerHTML = `
    <!-- Top Action: Assign Homework -->
    <div class="card" style="padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <h3 style="font-size: 1.15rem; color: #fff; margin: 0;">Daily Homework Assignments & Submissions</h3>
          <div style="font-size: 0.8rem; color: var(--text-muted);">
            Assign problem sets, verify student copies, and send 1-click WhatsApp alerts for non-completion
          </div>
        </div>
        <button id="teacher-assign-hw-btn" class="btn btn-primary" style="padding: 0.55rem 1.1rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 6px; cursor: pointer;">
          + Assign New Homework
        </button>
      </div>

      <!-- Student Homework Checking Roster -->
      <div style="overflow-x: auto;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
              <th style="padding: 0.75rem;">Student & Roll No</th>
              <th style="padding: 0.75rem;">Course Enrolled</th>
              <th style="padding: 0.75rem;">Current Assigned Assignment</th>
              <th style="padding: 0.75rem;">Submission Verification</th>
              <th style="padding: 0.75rem; text-align: right;">Action / WhatsApp If Incomplete</th>
            </tr>
          </thead>
          <tbody>
            ${students.map(s => {
              const isChecked = s.homeworkCompleted !== false;
              const waUrl = state.getWhatsAppHomeworkUrl(s.id);
              const activeHw = homeworks[0];

              return `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 0.75rem;">
                    <div style="font-weight: 700; color: #fff;">${s.name}</div>
                    <div style="font-size: 0.72rem; color: var(--text-dim);">${s.rollNo}</div>
                  </td>
                  <td style="padding: 0.75rem; font-weight: 600;">${s.courseName}</td>
                  <td style="padding: 0.75rem; font-size: 0.82rem;">
                    <div style="color: #cbd5e1; font-weight: 600;">${activeHw ? activeHw.title : 'Partnership Accounts Problem Set 4'}</div>
                    <div style="font-size: 0.72rem; color: var(--text-dim);">Due: Tomorrow 8:00 AM</div>
                  </td>
                  <td style="padding: 0.75rem;">
                    <button 
                      class="toggle-teacher-hw-btn" 
                      data-student-id="${s.id}" 
                      data-done="${isChecked}"
                      style="padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.78rem; font-weight: 700; border: 1px solid ${isChecked ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}; background: ${isChecked ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}; color: ${isChecked ? '#34d399' : '#f87171'}; cursor: pointer;"
                    >
                      ${isChecked ? '✓ Checked & Verified' : '✕ Incomplete'}
                    </button>
                  </td>
                  <td style="padding: 0.75rem; text-align: right;">
                    ${!isChecked ? `
                      <a 
                        href="${waUrl}" 
                        target="_blank" 
                        style="padding: 0.35rem 0.75rem; background: #25D366; color: #070b14; font-weight: 700; font-size: 0.75rem; border-radius: 5px; display: inline-flex; align-items: center; gap: 0.3rem; text-decoration: none;"
                      >
                        <span>📲</span> WhatsApp Incomplete Alert
                      </a>
                    ` : `
                      <span style="font-size: 0.75rem; color: #34d399; font-weight: 600;">✓ Checked (10/10)</span>
                    `}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Attach toggle homework
  container.querySelectorAll('.toggle-teacher-hw-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sId = btn.getAttribute('data-student-id');
      const isDone = btn.getAttribute('data-done') === 'true';
      state.markHomeworkCompletion(sId, !isDone);
      showToast(`Homework marked: ${!isDone ? 'Checked & Verified' : 'Incomplete'}`, !isDone ? 'success' : 'warning');
      renderDailyHomeworkTab(container, showToast);
    });
  });

  // Attach assign new homework dialog
  container.querySelector('#teacher-assign-hw-btn').addEventListener('click', () => {
    openAssignHomeworkDialog(showToast);
  });
}

function openAssignHomeworkDialog(showToast) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const courses = state.courses;
  const currentTeacher = state.getCurrentTeacher();
  const assignedSubjects = state.getTeacherAssignedSubjects();

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 520px; background: #0c1424; border: 1px solid var(--border-gold); box-shadow: 0 20px 60px rgba(0,0,0,0.85);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
        <div>
          <h3 style="color: var(--accent-gold-light); margin: 0; font-size: 1.2rem;">
            📝 Assign New Homework
          </h3>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">
            Faculty: ${currentTeacher.name}
          </div>
        </div>
        <button id="close-hw-modal-btn" style="background: none; border: none; color: var(--text-muted); font-size: 1.3rem; cursor: pointer;">✕</button>
      </div>

      <form id="assign-hw-form">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
            Course <span style="color: var(--accent-gold);">*</span>
          </label>
          <select id="hw-course-select" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.88rem;">
            ${courses.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
          </select>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Subject (Assigned by Director) <span style="color: var(--accent-gold);">*</span>
            </label>
            <select id="hw-sub-select" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.88rem; font-weight: 600;">
              ${assignedSubjects.map(sub => `<option value="${sub}">${sub}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Due Date <span style="color: var(--accent-gold);">*</span>
            </label>
            <input type="date" id="hw-due-input" value="2026-10-19" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.88rem;" />
          </div>
        </div>

        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
            Assignment Title <span style="color: var(--accent-gold);">*</span>
          </label>
          <input type="text" id="hw-title-input" placeholder="e.g. Practical Set 4: Revaluation A/c Drills" required style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.88rem;" />
        </div>

        <div style="margin-bottom: 1.25rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
            Instructions / Questions
          </label>
          <textarea id="hw-desc-input" rows="3" placeholder="Solve Questions 1 to 5 from chapter 4 workbook..." style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;"></textarea>
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          <button type="button" id="cancel-hw-modal-btn" style="padding: 0.65rem 1.25rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 6px; color: #cbd5e1; cursor: pointer;">
            Cancel
          </button>
          <button type="submit" style="padding: 0.65rem 1.75rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 6px; cursor: pointer;">
            Publish Assignment →
          </button>
        </div>
      </form>
    </div>
  `;

  modalContainer.classList.remove('hidden');

  const closeModal = () => {
    modalContainer.classList.add('hidden');
    modalContainer.innerHTML = '';
  };

  modalContainer.querySelector('#close-hw-modal-btn').addEventListener('click', closeModal);
  modalContainer.querySelector('#cancel-hw-modal-btn').addEventListener('click', closeModal);

  modalContainer.querySelector('#assign-hw-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const courseId = modalContainer.querySelector('#hw-course-select').value;
    const subSel = modalContainer.querySelector('#hw-sub-select') || modalContainer.querySelector('#hw-sub-input');
    const subject = subSel ? subSel.value : (assignedSubjects[0] || 'Accounts');
    const dueDate = modalContainer.querySelector('#hw-due-input').value;
    const title = modalContainer.querySelector('#hw-title-input').value;
    const description = modalContainer.querySelector('#hw-desc-input').value;

    state.assignHomework({ courseId, subject, title, dueDate, description, assignedBy: currentTeacher.name });
    closeModal();
    showToast(`New homework for "${subject}" assigned by ${currentTeacher.name} and published to students!`, 'success');
  });
}

// =============================================================================
// TAB 3: DAILY ATTENDANCE TAB (Non-attendant parents informed via WhatsApp)
// =============================================================================
function renderTeacherAttendanceTab(container, showToast) {
  const students = state.students;

  container.innerHTML = `
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="margin-bottom: 1.25rem;">
        <h3 style="font-size: 1.2rem; color: #fff; margin: 0;">Faculty Daily Attendance Roster</h3>
        <div style="font-size: 0.82rem; color: var(--text-muted);">
          Non-attendant students' parents immediately informed with fact via WhatsApp message
        </div>
      </div>

      <div style="overflow-x: auto;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.78rem; text-transform: uppercase;">
              <th style="padding: 0.75rem;">Student & Roll No</th>
              <th style="padding: 0.75rem;">Course Enrolled</th>
              <th style="padding: 0.75rem;">Overall %</th>
              <th style="padding: 0.75rem;">Today's Attendance</th>
              <th style="padding: 0.75rem; text-align: right;">Inform Parents via WhatsApp</th>
            </tr>
          </thead>
          <tbody>
            ${students.map(s => {
              const waUrl = state.getWhatsAppAttendanceUrl(s.id);
              const isAbsent = s.todayAttendance === 'Absent';

              return `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 0.75rem;">
                    <div style="font-weight: 700; color: #fff;">${s.name}</div>
                    <div style="font-size: 0.72rem; color: var(--text-dim);">${s.rollNo}</div>
                  </td>
                  <td style="padding: 0.75rem; font-weight: 600;">${s.courseName}</td>
                  <td style="padding: 0.75rem; font-weight: 700; color: #34d399;">${s.attendancePercent}%</td>
                  <td style="padding: 0.75rem;">
                    <button 
                      class="toggle-teach-att-btn" 
                      data-student-id="${s.id}" 
                      data-status="${s.todayAttendance}"
                      style="padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.78rem; font-weight: 700; border: 1px solid ${!isAbsent ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}; background: ${!isAbsent ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}; color: ${!isAbsent ? '#34d399' : '#f87171'}; cursor: pointer;"
                    >
                      ${!isAbsent ? '✓ Present' : '✕ Absent'}
                    </button>
                  </td>
                  <td style="padding: 0.75rem; text-align: right;">
                    ${isAbsent ? `
                      <a 
                        href="${waUrl}" 
                        target="_blank" 
                        style="padding: 0.35rem 0.75rem; background: #25D366; color: #070b14; font-weight: 700; font-size: 0.75rem; border-radius: 5px; display: inline-flex; align-items: center; gap: 0.3rem; text-decoration: none;"
                      >
                        <span>📲</span> Inform Parent (WhatsApp)
                      </a>
                    ` : `
                      <span style="font-size: 0.75rem; color: var(--text-dim);">Present in Classroom</span>
                    `}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Attach toggle attendance
  container.querySelectorAll('.toggle-teach-att-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sId = btn.getAttribute('data-student-id');
      const current = btn.getAttribute('data-status');
      const newStatus = current === 'Present' ? 'Absent' : 'Present';
      state.markAttendance(sId, newStatus);
      showToast(`Student attendance marked: ${newStatus}`, newStatus === 'Present' ? 'success' : 'warning');
      renderTeacherAttendanceTab(container, showToast);
    });
  });
}

// =============================================================================
// TAB 4: DAILY TEACHING PLAN TAB (Updation against Director's stipulated plan)
// =============================================================================
function renderDailyTeachingPlanTab(container, showToast) {
  const plans = state.teachingPlans;

  container.innerHTML = `
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="margin-bottom: 1.25rem;">
        <h3 style="font-size: 1.2rem; color: #fff; margin: 0;">Daily Teaching Plan Delivery vs Director's Stipulation</h3>
        <div style="font-size: 0.82rem; color: var(--text-muted);">
          Update daily teaching milestone progress against the stipulated schedule set by the Director
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${plans.map(p => `
          <div style="padding: 1.25rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
              <div>
                <span style="font-weight: 700; color: #fff; font-size: 1rem;">${p.day} • ${p.date}</span>
                <span style="margin-left: 0.5rem; font-size: 0.8rem; color: var(--accent-gold);">${p.courseName} (${p.subject})</span>
              </div>
              <span style="padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700; background: rgba(16,185,129,0.2); color: #34d399;">
                ${p.status}
              </span>
            </div>

            <!-- Director Stipulation Box -->
            <div style="padding: 0.75rem; background: rgba(207,168,78,0.08); border: 1px solid var(--border-gold); border-radius: 6px; margin-bottom: 0.75rem; font-size: 0.85rem;">
              <strong style="color: var(--accent-gold);">Director's Stipulated Milestone:</strong>
              <div style="color: #cbd5e1; margin-top: 0.2rem;">${p.stipulatedByDirector}</div>
            </div>

            <!-- Actual Taught Input -->
            <div style="display: flex; gap: 0.75rem; align-items: center;">
              <input 
                type="text" 
                class="plan-actual-input" 
                data-plan-id="${p.id}" 
                value="${p.actualTaughtByTeacher}" 
                style="flex: 1; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;"
              />
              <button 
                class="update-plan-btn" 
                data-plan-id="${p.id}"
                style="padding: 0.65rem 1.1rem; background: linear-gradient(135deg, #10b981, #059669); color: #fff; font-weight: 700; font-size: 0.8rem; border: none; border-radius: 6px; cursor: pointer;"
              >
                Update Progress
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Attach plan update
  container.querySelectorAll('.update-plan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-plan-id');
      const input = container.querySelector(`.plan-actual-input[data-plan-id="${pId}"]`);
      if (input) {
        state.updateTeachingPlan(pId, input.value);
        showToast('Teaching plan updated and verified to Director!', 'success');
      }
    });
  });
}

// =============================================================================
// TAB 5: EXAM TAB (Question Paper PDF Upload / Google Form Link & Marks Assessed)
// =============================================================================
function renderTeacherExamTab(container, showToast) {
  const exams = state.exams;
  const students = state.students;

  container.innerHTML = `
    <!-- Top Action -->
    <div class="card" style="padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <h3 style="font-size: 1.2rem; color: #fff; margin: 0;">Faculty Exam Publishing & Marks Assessment Desk</h3>
          <div style="font-size: 0.82rem; color: var(--text-muted);">
            Upload Question Paper PDF or link Google Form; marks assessed are directly visible to Director, Student & Parents
          </div>
        </div>
        <button id="publish-new-exam-btn" class="btn btn-primary" style="padding: 0.6rem 1.2rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 6px; cursor: pointer;">
          + Publish Question Paper / Form
        </button>
      </div>

      <!-- Published Exams Roster -->
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${exams.map(exam => `
          <div style="padding: 1.25rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
              <div>
                <h4 style="font-size: 1.1rem; color: #fff; margin: 0;">${exam.title}</h4>
                <div style="font-size: 0.78rem; color: var(--accent-gold); margin-top: 0.2rem;">
                  ${exam.courseName} • ${exam.subject} • Max Marks: ${exam.maxMarks} • Date: ${exam.date}
                </div>
              </div>

              <!-- Question Paper Links -->
              <div style="display: flex; gap: 0.5rem;">
                ${exam.questionPaperPdf ? `
                  <a href="${exam.questionPaperPdf}" target="_blank" style="padding: 0.35rem 0.65rem; background: rgba(37,99,235,0.2); border: 1px solid var(--border-accent); border-radius: 5px; color: #93c5fd; font-size: 0.75rem; text-decoration: none;">
                    📄 Paper PDF
                  </a>
                ` : ''}
                ${exam.googleFormLink ? `
                  <a href="${exam.googleFormLink}" target="_blank" style="padding: 0.35rem 0.65rem; background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); border-radius: 5px; color: #6ee7b7; font-size: 0.75rem; text-decoration: none;">
                    🔗 Google Form
                  </a>
                ` : ''}
              </div>
            </div>

            <!-- Student Marks Entry Table with Uploaded Answer Sheet & Time Taken Log -->
            <div style="overflow-x: auto; margin-top: 0.75rem;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
                <thead>
                  <tr style="border-bottom: 1px solid var(--border-subtle); color: var(--text-muted); font-size: 0.75rem;">
                    <th style="padding: 0.6rem 0.5rem;">Student Name</th>
                    <th style="padding: 0.6rem 0.5rem;">Answer Sheet / Mode</th>
                    <th style="padding: 0.6rem 0.5rem;">⏱️ Time Taken</th>
                    <th style="padding: 0.6rem 0.5rem;">Marks Assessed (/ ${exam.maxMarks})</th>
                    <th style="padding: 0.6rem 0.5rem;">Examiner Remarks</th>
                    <th style="padding: 0.6rem 0.5rem; text-align: right;">Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${students.filter(s => !exam.courseId || s.courseId === exam.courseId).map(s => {
                    const sub = exam.submissions ? exam.submissions.find(item => item.studentId === s.id) : null;
                    const timer = state.getExamTimer(exam.id, s.id);
                    const marks = sub && sub.marksAssessed !== undefined ? sub.marksAssessed : (exam.id === 'exam-1' || exam.id === 'exam-2' ? 48 : '');
                    const remarks = sub && sub.remarks ? sub.remarks : (exam.id === 'exam-1' || exam.id === 'exam-2' ? 'Flawless working notes and presentation' : '');
                    const isSubmitted = sub && (sub.status === 'Submitted for Evaluation' || sub.status === 'Graded');
                    const isRunning = !isSubmitted && !!timer;

                    return `
                      <tr style="border-bottom: 1px solid rgba(255,255,255,0.04); background: ${isSubmitted ? 'rgba(16,185,129,0.02)' : 'transparent'};">
                        <td style="padding: 0.65rem 0.5rem;">
                          <div style="font-weight: 700; color: #fff;">${s.name}</div>
                          <div style="font-size: 0.72rem; color: var(--text-dim);">${s.rollNo} • ${s.courseName}</div>
                        </td>

                        <!-- Uploaded Answer Sheet / Mode -->
                        <td style="padding: 0.65rem 0.5rem;">
                          ${sub && sub.answerSheetPdf ? `
                            <div>
                              <a href="${sub.answerSheetPdf}" target="_blank" style="color: #93c5fd; font-weight: 700; font-size: 0.8rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.3rem;">
                                <span>📄</span> ${sub.answerSheetName || 'View Answer Sheet'} ↗
                              </a>
                              <div style="font-size: 0.7rem; color: var(--text-dim); margin-top: 0.15rem;">
                                ${sub.answerSheetSize ? `${sub.answerSheetSize} • ` : ''}Submitted: ${sub.submittedAt || exam.date}
                              </div>
                            </div>
                          ` : sub && sub.submissionType === 'google_form' ? `
                            <div>
                              <span style="color: #6ee7b7; font-weight: 700; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 0.3rem;">
                                <span>🔗</span> Google Form Responses
                              </span>
                              <div style="font-size: 0.7rem; color: var(--text-dim); margin-top: 0.15rem;">
                                Submitted: ${sub.submittedAt || exam.date}
                              </div>
                            </div>
                          ` : isRunning ? `
                            <span style="font-size: 0.74rem; background: rgba(239,68,68,0.18); color: #f87171; border: 1px solid rgba(239,68,68,0.35); padding: 0.2rem 0.55rem; border-radius: 4px; font-weight: 700; display: inline-flex; align-items: center; gap: 0.3rem;">
                              <span style="animation: pulse 1s infinite;">●</span> Solving in Progress
                            </span>
                          ` : `
                            <span style="font-size: 0.74rem; color: var(--text-dim); font-style: italic;">
                              Not Started Yet
                            </span>
                          `}
                        </td>

                        <!-- Time Taken Log -->
                        <td style="padding: 0.65rem 0.5rem;">
                          ${sub && sub.timeTakenFormatted ? `
                            <span style="display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.82rem; font-weight: 800; color: #fff; background: rgba(207,168,78,0.15); border: 1px solid rgba(207,168,78,0.35); padding: 0.25rem 0.55rem; border-radius: 4px;">
                              <span>⏱️</span> <span style="color: var(--accent-gold-light);">${sub.timeTakenFormatted}</span>
                            </span>
                          ` : isRunning ? `
                            <span style="font-size: 0.75rem; color: #fbbf24; font-weight: 700; display: inline-flex; align-items: center; gap: 0.25rem;">
                              <span>⏱️</span> Active Timer
                            </span>
                          ` : `
                            <span style="color: var(--text-dim); font-size: 0.75rem;">--</span>
                          `}
                        </td>

                        <!-- Marks Assessed Input -->
                        <td style="padding: 0.65rem 0.5rem;">
                          <div style="display: flex; align-items: center; gap: 0.35rem;">
                            <input 
                              type="number" 
                              class="exam-marks-input" 
                              data-exam-id="${exam.id}" 
                              data-student-id="${s.id}" 
                              value="${marks}" 
                              placeholder="0"
                              max="${exam.maxMarks}" 
                              style="width: 70px; padding: 0.4rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 4px; color: #34d399; font-weight: 800; font-size: 0.9rem; text-align: center;"
                            />
                            <span style="color: var(--text-dim); font-size: 0.75rem;">/ ${exam.maxMarks}</span>
                          </div>
                        </td>

                        <!-- Examiner Remarks Input -->
                        <td style="padding: 0.65rem 0.5rem;">
                          <input 
                            type="text" 
                            class="exam-remarks-input" 
                            data-exam-id="${exam.id}" 
                            data-student-id="${s.id}" 
                            value="${remarks}" 
                            placeholder="Add evaluation feedback..."
                            style="width: 100%; min-width: 180px; padding: 0.4rem 0.6rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 4px; color: #cbd5e1; font-size: 0.8rem;"
                          />
                        </td>

                        <!-- Save Action -->
                        <td style="padding: 0.65rem 0.5rem; text-align: right;">
                          <button 
                            class="save-marks-btn" 
                            data-exam-id="${exam.id}" 
                            data-student-id="${s.id}" 
                            style="padding: 0.4rem 0.85rem; background: linear-gradient(135deg, #10b981, #059669); color: #fff; font-weight: 700; font-size: 0.75rem; border: none; border-radius: 4px; cursor: pointer; white-space: nowrap; display: inline-flex; align-items: center; gap: 0.3rem;"
                          >
                            <span>✓</span> Save Mark
                          </button>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Attach publish exam modal
  container.querySelector('#publish-new-exam-btn').addEventListener('click', () => {
    openPublishExamDialog(showToast);
  });

  // Attach save marks
  container.querySelectorAll('.save-marks-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const examId = btn.getAttribute('data-exam-id');
      const studentId = btn.getAttribute('data-student-id');
      const marksInput = container.querySelector(`.exam-marks-input[data-exam-id="${examId}"][data-student-id="${studentId}"]`);
      const remarksInput = container.querySelector(`.exam-remarks-input[data-exam-id="${examId}"][data-student-id="${studentId}"]`);

      if (marksInput && remarksInput) {
        state.recordExamMarks(examId, studentId, {
          marksAssessed: marksInput.value,
          remarks: remarksInput.value
        });
        showToast('Marks assessed and saved! Visible to Director, Student & Parents.', 'success');
      }
    });
  });
}

function openPublishExamDialog(showToast) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const courses = state.courses;
  const currentTeacher = state.getCurrentTeacher();
  const assignedSubjects = state.getTeacherAssignedSubjects();

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 540px; background: #0c1424; border: 1px solid var(--border-gold); box-shadow: 0 20px 60px rgba(0,0,0,0.85);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
        <div>
          <h3 style="color: var(--accent-gold-light); margin: 0; font-size: 1.2rem;">
            🎯 Publish Exam Paper / Google Form
          </h3>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">
            Faculty: ${currentTeacher.name}
          </div>
        </div>
        <button id="close-pub-exam-btn" style="background: none; border: none; color: var(--text-muted); font-size: 1.3rem; cursor: pointer;">✕</button>
      </div>

      <form id="publish-exam-form">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
            Exam Title <span style="color: var(--accent-gold);">*</span>
          </label>
          <input type="text" id="exam-title-input" placeholder="e.g. 12th Commerce Weekly Accounts Mock #6" required style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem;" />
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Course <span style="color: var(--accent-gold);">*</span>
            </label>
            <select id="exam-course-select" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
              ${courses.map(c => `<option value="${c.id}" data-name="${c.name}">${c.name}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Subject (Assigned by Director) <span style="color: var(--accent-gold);">*</span>
            </label>
            <select id="exam-subject-select" required style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem; font-weight: 600;">
              ${assignedSubjects.map(sub => `<option value="${sub}">${sub}</option>`).join('')}
            </select>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Maximum Marks
            </label>
            <input type="number" id="exam-maxmarks-input" value="50" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem; font-weight: 700;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Exam Date
            </label>
            <input type="date" id="exam-date-input" value="2026-10-24" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;" />
          </div>
        </div>

        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
            Question Paper PDF Document URL
          </label>
          <input type="url" id="exam-pdf-input" value="https://imperialcommerce.edu.in/papers/12th_accounts_mock.pdf" placeholder="https://..." style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;" />
        </div>

        <div style="margin-bottom: 1.25rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
            Or Google Form Link (Online Quiz / Test)
          </label>
          <input type="url" id="exam-gform-input" placeholder="https://forms.gle/..." style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;" />
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          <button type="button" id="cancel-pub-exam-btn" style="padding: 0.65rem 1.25rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 6px; color: #cbd5e1; cursor: pointer;">
            Cancel
          </button>
          <button type="submit" style="padding: 0.65rem 1.75rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 6px; cursor: pointer;">
            Publish Paper →
          </button>
        </div>
      </form>
    </div>
  `;

  modalContainer.classList.remove('hidden');

  const closeModal = () => {
    modalContainer.classList.add('hidden');
    modalContainer.innerHTML = '';
  };

  modalContainer.querySelector('#close-pub-exam-btn').addEventListener('click', closeModal);
  modalContainer.querySelector('#cancel-pub-exam-btn').addEventListener('click', closeModal);

  modalContainer.querySelector('#publish-exam-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = modalContainer.querySelector('#exam-title-input').value;
    const sel = modalContainer.querySelector('#exam-course-select');
    const courseId = sel.value;
    const courseName = sel.options[sel.selectedIndex].getAttribute('data-name');
    const subSel = modalContainer.querySelector('#exam-subject-select') || modalContainer.querySelector('#exam-subject-input');
    const subject = subSel ? subSel.value : (assignedSubjects[0] || 'Accounts');
    const maxMarks = modalContainer.querySelector('#exam-maxmarks-input').value;
    const date = modalContainer.querySelector('#exam-date-input').value;
    const questionPaperPdf = modalContainer.querySelector('#exam-pdf-input').value;
    const googleFormLink = modalContainer.querySelector('#exam-gform-input').value;

    state.publishExam({
      title,
      courseId,
      courseName,
      subject,
      maxMarks,
      date,
      questionPaperPdf,
      googleFormLink,
      teacher: currentTeacher.name
    });

    closeModal();
    showToast(`Exam paper for "${subject}" published by ${currentTeacher.name} to students, parents & Director!`, 'success');
  });
}

// =============================================================================
// TAB 6: REMUNERATION DETAILS (Total Due 60%, Received Installment details & Pending)
// =============================================================================
function renderTeacherRemunerationTab(container) {
  const ledger = state.getTeacherRemunerationLedger();
  const currentTeacher = state.getCurrentTeacher();
  const myLedger = ledger.find(l => l.id === currentTeacher.id) || ledger[0];

  container.innerHTML = `
    <!-- Top Summary Cards -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
      <div class="card" style="padding: 1.25rem; border: 1px solid var(--border-gold); background: rgba(207,168,78,0.08); border-radius: 8px;">
        <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent-gold); font-weight: 700;">60% Total Due (Earned)</div>
        <div style="font-size: 1.8rem; font-weight: 800; color: #fff; margin-top: 0.35rem;">₹${myLedger.totalDue60.toLocaleString()}</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">
          60% of ₹${myLedger.totalCollections.toLocaleString()} collected from students
        </div>
      </div>

      <div class="card" style="padding: 1.25rem; border: 1px solid rgba(16,185,129,0.3); background: rgba(16,185,129,0.08); border-radius: 8px;">
        <div style="font-size: 0.8rem; text-transform: uppercase; color: #34d399; font-weight: 700;">Received Installment-Wise</div>
        <div style="font-size: 1.8rem; font-weight: 800; color: #34d399; margin-top: 0.35rem;">₹${myLedger.totalPaid.toLocaleString()}</div>
        <div style="font-size: 0.75rem; color: #6ee7b7; margin-top: 0.25rem;">Disbursed via official payment vouchers</div>
      </div>

      <div class="card" style="padding: 1.25rem; border: 1px solid rgba(239,68,68,0.3); background: rgba(239,68,68,0.08); border-radius: 8px;">
        <div style="font-size: 0.8rem; text-transform: uppercase; color: #f87171; font-weight: 700;">Pending Balance Payable</div>
        <div style="font-size: 1.8rem; font-weight: 800; color: #f87171; margin-top: 0.35rem;">₹${myLedger.balancePayable.toLocaleString()}</div>
        <div style="font-size: 0.75rem; color: #fca5a5; margin-top: 0.25rem;">Scheduled for next Director honorarium release</div>
      </div>
    </div>

    <!-- Student Collection Breakdown that Created this 60% Due -->
    <div class="card" style="padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <h3 style="font-size: 1.15rem; color: #fff; margin-bottom: 0.4rem;">Student Fee Collection Ledgers (60% Entitlement Source)</h3>
      <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">
        Rule: Per student fee 60% becomes due to teacher immediately on receipt generation daily
      </div>

      <div style="overflow-x: auto;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
              <th style="padding: 0.65rem;">Receipt No & Date</th>
              <th style="padding: 0.65rem;">Student Name</th>
              <th style="padding: 0.65rem;">Course & Subject</th>
              <th style="padding: 0.65rem;">Fee Collected (100%)</th>
              <th style="padding: 0.65rem; color: var(--accent-gold-light);">Teacher Share Due (60%)</th>
              <th style="padding: 0.65rem;">Payment Mode</th>
            </tr>
          </thead>
          <tbody>
            ${myLedger.receipts.map(r => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 0.65rem;">
                  <div style="font-family: monospace; font-weight: 700; color: var(--accent-gold);">${r.receiptNo}</div>
                  <div style="font-size: 0.72rem; color: var(--text-dim);">${r.date}</div>
                </td>
                <td style="padding: 0.65rem; font-weight: 600; color: #fff;">${r.studentName}</td>
                <td style="padding: 0.65rem;">${r.courseName}</td>
                <td style="padding: 0.65rem; font-weight: 700; color: #34d399;">₹${r.amount.toLocaleString()}</td>
                <td style="padding: 0.65rem; font-weight: 800; color: var(--accent-gold-light);">
                  ₹${(r.teacherShare60 || Math.round(r.amount * 0.6)).toLocaleString()}
                </td>
                <td style="padding: 0.65rem; font-size: 0.8rem; color: var(--text-muted);">${r.mode}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Received Installment-Wise Details (Vouchers Paid) -->
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <h3 style="font-size: 1.15rem; color: #fff; margin-bottom: 1rem;">Received Installments (Honorarium Vouchers)</h3>
      <div style="overflow-x: auto;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
              <th style="padding: 0.65rem;">Voucher No</th>
              <th style="padding: 0.65rem;">Disbursement Date</th>
              <th style="padding: 0.65rem;">Description</th>
              <th style="padding: 0.65rem;">Payment Reference</th>
              <th style="padding: 0.65rem;">Amount Received</th>
              <th style="padding: 0.65rem;">Authorized By</th>
            </tr>
          </thead>
          <tbody>
            ${myLedger.vouchers.map(v => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 0.65rem; font-family: monospace; font-weight: 700; color: var(--accent-gold);">${v.voucherNo}</td>
                <td style="padding: 0.65rem; color: var(--text-muted);">${v.date}</td>
                <td style="padding: 0.65rem; color: #fff;">${v.description}</td>
                <td style="padding: 0.65rem; font-size: 0.78rem; color: var(--text-dim);">${v.mode} (${v.reference})</td>
                <td style="padding: 0.65rem; font-weight: 700; color: #34d399;">₹${v.amount.toLocaleString()}</td>
                <td style="padding: 0.65rem; color: var(--accent-gold);">${v.authorizedBy}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// =============================================================================
// TAB 7: QUERIES RAISED BY STUDENTS (Course & Name wise, reply with PDF / Video & view student response)
// =============================================================================
function renderTeacherQueriesTab(container, showToast) {
  const queries = state.queries;

  container.innerHTML = `
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <h3 style="font-size: 1.2rem; color: #fff; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
            <span>💬</span> Student Doubts & Academic Queries Desk
          </h3>
          <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.2rem;">
            Course & Student-wise doubts; reply with written explanation plus PDF note or Video clip, and monitor student comprehension responses
          </div>
        </div>

        <!-- Quick Satisfaction Counter Badges -->
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 0.75rem; padding: 0.25rem 0.65rem; border-radius: 20px; font-weight: 700; background: rgba(16,185,129,0.18); color: #34d399; border: 1px solid rgba(16,185,129,0.35);">
            👍 ${queries.filter(q => q.studentResponse === 'Satisfactory').length} Satisfied
          </span>
          <span style="font-size: 0.75rem; padding: 0.25rem 0.65rem; border-radius: 20px; font-weight: 700; background: rgba(239,68,68,0.18); color: #f87171; border: 1px solid rgba(239,68,68,0.35);">
            ❓ ${queries.filter(q => q.studentResponse === 'Not Understood Yet').length} Needs Clarification
          </span>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        ${queries.map(q => `
          <div style="padding: 1.25rem; background: rgba(255,255,255,0.02); border: 1px solid ${q.studentResponse === 'Not Understood Yet' ? 'rgba(239,68,68,0.4)' : 'var(--border-light)'}; border-radius: 8px;">
            <!-- Query Header -->
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
              <div>
                <div style="display: flex; align-items: center; gap: 0.6rem;">
                  <span style="font-weight: 700; color: #fff; font-size: 1.05rem;">${q.studentName}</span>
                  <span style="font-size: 0.76rem; background: rgba(99,102,241,0.2); color: #a5b4fc; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700;">
                    ${q.courseName}
                  </span>
                </div>
                <div style="font-size: 0.78rem; color: var(--accent-gold); margin-top: 0.2rem;">
                  Subject: ${q.subject} • Submitted: ${q.date}
                </div>
              </div>

              <!-- Badges Group: Status & Student Satisfaction Response -->
              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <span style="padding: 0.2rem 0.55rem; border-radius: 4px; font-size: 0.72rem; font-weight: 700; ${q.status === 'Answered' ? 'background: rgba(16,185,129,0.2); color: #34d399;' : 'background: rgba(245,158,11,0.2); color: #fbbf24;'}">
                  ${q.status}
                </span>

                ${q.studentResponse === 'Satisfactory' ? `
                  <span style="padding: 0.2rem 0.65rem; border-radius: 20px; font-size: 0.72rem; font-weight: 700; background: rgba(16,185,129,0.2); color: #34d399; border: 1px solid rgba(16,185,129,0.4); display: inline-flex; align-items: center; gap: 0.3rem;">
                    <span>✔</span> Student Feedback: Satisfactory / Understood 👍
                  </span>
                ` : q.studentResponse === 'Not Understood Yet' ? `
                  <span style="padding: 0.2rem 0.65rem; border-radius: 20px; font-size: 0.72rem; font-weight: 700; background: rgba(239,68,68,0.2); color: #f87171; border: 1px solid rgba(239,68,68,0.4); display: inline-flex; align-items: center; gap: 0.3rem;">
                    <span>⚠️</span> Student Feedback: Not Understood Yet ❓
                  </span>
                ` : q.status === 'Answered' ? `
                  <span style="padding: 0.2rem 0.55rem; border-radius: 20px; font-size: 0.72rem; font-weight: 600; background: rgba(255,255,255,0.06); color: var(--text-dim); border: 1px solid var(--border-subtle);">
                    ⏳ Awaiting Student Review
                  </span>
                ` : ''}
              </div>
            </div>

            <!-- Student Doubt & Attachment Details -->
            <div style="padding: 0.85rem; background: rgba(0,0,0,0.25); border-radius: 6px; border: 1px solid var(--border-subtle); margin-bottom: 0.85rem; font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
              <strong style="color: #fff;">Student's Doubt:</strong> "${q.queryText}"
              
              <!-- Student's Attached File (PDF / Video / Image) -->
              ${q.attachment ? `
                <div style="margin-top: 0.5rem; padding: 0.5rem 0.75rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); border-radius: 5px;">
                  <div style="font-size: 0.72rem; color: var(--accent-gold-light); font-weight: 700; margin-bottom: 0.25rem;">
                    📎 Student's Supporting Evidence (${q.attachmentType ? q.attachmentType.toUpperCase() : 'DOCUMENT'}):
                  </div>
                  
                  ${q.attachmentType === 'video' || (q.attachment && q.attachment.endsWith('.mp4')) ? `
                    <video controls src="${q.attachmentUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'}" style="width: 100%; max-width: 360px; max-height: 160px; border-radius: 4px; display: block; background: #000;"></video>
                    <div style="font-size: 0.72rem; color: #a5b4fc; margin-top: 0.25rem;">${q.attachment}</div>
                  ` : q.attachmentType === 'image' || (q.attachment && (q.attachment.endsWith('.jpg') || q.attachment.endsWith('.png'))) ? `
                    <div>
                      <img src="${q.attachmentUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80'}" alt="${q.attachment}" style="max-height: 120px; border-radius: 4px; border: 1px solid var(--border-subtle); cursor: pointer;" onclick="window.open('${q.attachmentUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80'}', '_blank')" />
                      <div style="font-size: 0.72rem; color: var(--text-dim); margin-top: 0.2rem;">${q.attachment} (Click to zoom)</div>
                    </div>
                  ` : `
                    <a href="${q.attachmentUrl || '#'}" target="_blank" style="display: inline-flex; align-items: center; gap: 0.4rem; color: var(--accent-gold); font-size: 0.8rem; text-decoration: none;">
                      <span>📄</span> <u>${q.attachment}</u> <span style="font-size: 0.7rem;">(Open Student Working PDF) ↗</span>
                    </a>
                  `}
                </div>
              ` : ''}
            </div>

            <!-- Faculty Reply Area -->
            ${q.status === 'Answered' ? `
              <div style="padding: 1rem; background: rgba(16,185,129,0.06); border: 1px solid rgba(16,185,129,0.25); border-radius: 6px; font-size: 0.86rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                  <strong style="color: #34d399; font-size: 0.9rem;">Faculty Explanation:</strong>
                  <button class="btn-toggle-re-reply" data-query-id="${q.id}" style="padding: 0.2rem 0.6rem; font-size: 0.72rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); color: #cbd5e1; border-radius: 4px; cursor: pointer;">
                    ✏️ Update / Re-explain
                  </button>
                </div>
                <div style="color: #e2e8f0; line-height: 1.45;">${q.replyText}</div>

                <!-- Attached Guidance Material (PDF or Video) -->
                ${q.replyAttachment ? `
                  <div style="margin-top: 0.6rem; padding: 0.5rem 0.75rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(16,185,129,0.3); border-radius: 6px;">
                    <div style="font-size: 0.72rem; font-weight: 700; color: #6ee7b7; margin-bottom: 0.25rem;">
                      ${q.replyAttachmentType === 'video' ? '🎥 Attached Faculty Video Explanation:' : '📄 Attached Faculty Guidance Note (PDF):'}
                    </div>

                    ${q.replyAttachmentType === 'video' ? `
                      <video controls src="${q.replyAttachmentUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'}" style="width: 100%; max-width: 440px; max-height: 160px; background: #000; border-radius: 4px; display: block;"></video>
                      <div style="font-size: 0.72rem; color: #a5b4fc; margin-top: 0.25rem;">▶ ${q.replyAttachment}</div>
                    ` : `
                      <a href="${q.replyAttachmentUrl || '#'}" target="_blank" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #34d399; text-decoration: none; font-size: 0.82rem; font-weight: 600;">
                        <span>📕</span> <u>${q.replyAttachment}</u> <span style="font-size: 0.72rem; color: var(--text-dim);">(Click to Download / View Note) ↗</span>
                      </a>
                    `}
                  </div>
                ` : ''}

                <!-- Student's Feedback Remark Quote (Visible to Teacher & Director) -->
                ${q.studentFeedbackNote || q.studentResponse ? `
                  <div style="margin-top: 0.75rem; padding: 0.65rem 0.85rem; background: ${q.studentResponse === 'Satisfactory' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)'}; border-left: 3px solid ${q.studentResponse === 'Satisfactory' ? '#10b981' : '#ef4444'}; border-radius: 4px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.74rem; font-weight: 700; color: ${q.studentResponse === 'Satisfactory' ? '#34d399' : '#f87171'}; margin-bottom: 0.2rem;">
                      <span>${q.studentResponse === 'Satisfactory' ? '✔ STUDENT ACKNOWLEDGEMENT' : '⚠️ STUDENT NOT SATISFIED / STILL IN DOUBT'}</span>
                      <span style="color: var(--text-dim); font-weight: 400;">Responded: ${q.respondedAt || 'Today'}</span>
                    </div>
                    <div style="font-size: 0.82rem; color: #f1f5f9; font-style: italic;">
                      "${q.studentFeedbackNote || (q.studentResponse === 'Satisfactory' ? 'Explanation was satisfactory.' : 'Student indicated doubt is not understood yet.')}"
                    </div>
                    ${q.studentResponse === 'Not Understood Yet' ? `
                      <div style="margin-top: 0.4rem; font-size: 0.74rem; color: #fca5a5;">
                        ⚡ Notice: Student requires follow-up clarification or 1-on-1 clinic before exam.
                      </div>
                    ` : ''}
                  </div>
                ` : ''}
              </div>

              <!-- Hidden Re-Explanation Form (toggled via button) -->
              <div id="re-reply-box-${q.id}" style="display: none; margin-top: 0.75rem; padding: 1rem; background: rgba(0,0,0,0.35); border: 1px dashed var(--border-gold); border-radius: 8px;">
                <h4 style="font-size: 0.88rem; color: var(--accent-gold); margin: 0 0 0.5rem 0;">Update Explanation / Upload Additional Video or PDF:</h4>
                <textarea 
                  class="reply-text-input" 
                  data-query-id="${q.id}" 
                  rows="2" 
                  style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem; margin-bottom: 0.5rem;"
                >${q.replyText}</textarea>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem;">
                  <div>
                    <label style="display: block; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.25rem;">Explanation Media Type:</label>
                    <select class="reply-type-select" data-query-id="${q.id}" style="width: 100%; padding: 0.45rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 5px; color: #fff; font-size: 0.8rem;">
                      <option value="video" ${q.replyAttachmentType === 'video' ? 'selected' : ''}>🎥 Video Solution Clip (MP4)</option>
                      <option value="pdf" ${q.replyAttachmentType === 'pdf' || !q.replyAttachmentType ? 'selected' : ''}>📄 Guidance Note (PDF)</option>
                    </select>
                  </div>
                  <div>
                    <label style="display: block; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.25rem;">Attached File / Preset:</label>
                    <input 
                      type="text" 
                      class="reply-file-name" 
                      data-query-id="${q.id}" 
                      value="${q.replyAttachment || 'additional_concept_breakdown.pdf'}"
                      style="width: 100%; padding: 0.45rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 5px; color: #fff; font-size: 0.8rem;"
                    />
                  </div>
                </div>

                <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
                  <button type="button" class="btn-cancel-re-reply" data-query-id="${q.id}" style="padding: 0.45rem 1rem; background: rgba(255,255,255,0.05); border: 1px solid var(--border-light); color: var(--text-muted); border-radius: 5px; cursor: pointer; font-size: 0.8rem;">Cancel</button>
                  <button type="button" class="send-reply-btn" data-query-id="${q.id}" style="padding: 0.45rem 1.25rem; background: linear-gradient(135deg, #10b981, #059669); color: #fff; font-weight: 700; font-size: 0.8rem; border: none; border-radius: 5px; cursor: pointer;">Save & Resend Explanation</button>
                </div>
              </div>
            ` : `
              <!-- First-Time Reply Box -->
              <div style="padding: 1rem; background: rgba(0,0,0,0.3); border: 1px dashed var(--border-light); border-radius: 6px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #fff; margin-bottom: 0.35rem;">
                  Faculty Explanation & Doubt Resolution:
                </label>
                <textarea 
                  class="reply-text-input" 
                  data-query-id="${q.id}" 
                  rows="2" 
                  placeholder="Type clear conceptual breakdown, accounting section, or step-by-step guidance here..." 
                  style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem; margin-bottom: 0.6rem;"
                ></textarea>

                <div style="display: grid; grid-template-columns: 180px 1fr auto; gap: 0.75rem; align-items: end;">
                  <div>
                    <label style="display: block; font-size: 0.74rem; color: var(--text-muted); margin-bottom: 0.25rem;">
                      Attach Media Support:
                    </label>
                    <select class="reply-type-select" data-query-id="${q.id}" style="width: 100%; padding: 0.5rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.8rem;">
                      <option value="pdf">📄 PDF Solution Handout</option>
                      <option value="video">🎥 Video Explanation Clip</option>
                    </select>
                  </div>

                  <div>
                    <label style="display: block; font-size: 0.74rem; color: var(--text-muted); margin-bottom: 0.25rem;">
                      File Name / Reference:
                    </label>
                    <input 
                      type="text" 
                      class="reply-file-name" 
                      data-query-id="${q.id}" 
                      placeholder="e.g. sec17_5_amendment_notes.pdf or video_clip.mp4" 
                      value="${q.subject.toLowerCase().includes('tax') ? 'gst_sec17_5_amendment_video_explanation.mp4' : 'goodwill_treatment_summary.pdf'}"
                      style="width: 100%; padding: 0.5rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.8rem;"
                    />
                  </div>

                  <button 
                    class="send-reply-btn" 
                    data-query-id="${q.id}" 
                    style="padding: 0.55rem 1.4rem; background: linear-gradient(135deg, #10b981, #059669); color: #fff; font-weight: 700; font-size: 0.85rem; border: none; border-radius: 6px; cursor: pointer; white-space: nowrap; height: 36px;"
                  >
                    Send Reply →
                  </button>
                </div>
              </div>
            `}
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Toggle re-reply form
  container.querySelectorAll('.btn-toggle-re-reply').forEach(btn => {
    btn.addEventListener('click', () => {
      const qId = btn.getAttribute('data-query-id');
      const box = container.querySelector(`#re-reply-box-${qId}`);
      if (box) {
        box.style.display = box.style.display === 'none' ? 'block' : 'none';
      }
    });
  });

  container.querySelectorAll('.btn-cancel-re-reply').forEach(btn => {
    btn.addEventListener('click', () => {
      const qId = btn.getAttribute('data-query-id');
      const box = container.querySelector(`#re-reply-box-${qId}`);
      if (box) box.style.display = 'none';
    });
  });

  // Attach reply handler
  container.querySelectorAll('.send-reply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const qId = btn.getAttribute('data-query-id');
      const textInput = container.querySelector(`.reply-text-input[data-query-id="${qId}"]`);
      const typeSelect = container.querySelector(`.reply-type-select[data-query-id="${qId}"]`);
      const fileInput = container.querySelector(`.reply-file-name[data-query-id="${qId}"]`);

      if (textInput && textInput.value.trim()) {
        const attType = typeSelect ? typeSelect.value : 'pdf';
        const attName = fileInput ? fileInput.value.trim() : (attType === 'video' ? 'video_explanation.mp4' : 'solution_handout.pdf');
        const attUrl = attType === 'video' ? 'https://www.w3schools.com/html/mov_bbb.mp4' : 'https://imperialcommerce.edu.in/docs/sample_handout.pdf';

        state.replyQuery(qId, {
          replyText: textInput.value,
          replyAttachment: attName,
          replyAttachmentType: attType,
          replyAttachmentUrl: attUrl
        });

        showToast(`Comprehensive reply with ${attType.toUpperCase()} sent to student!`, 'success');
        renderTeacherQueriesTab(container, showToast);
      } else {
        showToast('Please type your explanation text before sending.', 'warning');
      }
    });
  });
}
