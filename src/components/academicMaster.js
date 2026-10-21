/* Imperial Commerce Tutorials - Academic Master & Per-Subject Fee Management
   Allows either Director (Ishwari Deshmukh or Shrikrishna Deshmukh) to:
   - Add, Edit, Delete Academic Courses
   - Add, Edit, Delete Subjects in Catalog
   - Configure Per-Subject Fee Structures for Gangapur Road & Satpur Colony
   - Enrol New Students with dynamic per-subject fee computation
   - Adjust Student Fees, Discounts & Subject Choices
*/

import { state } from '../state.js';
import { openReceiptModal } from './receiptModal.js';

export function renderAcademicAndFeeMasterTab(container, showToast) {
  const activeDirector = state.getActiveDirector();
  const allDirectors = state.directors || [];
  const courses = state.courses || [];
  const subjects = state.subjectsCatalog || [];
  const feeStructures = state.feeStructures || [];
  const students = state.students || [];

  // Split fee structures by campus for crystal-clear side-by-side view (Image 1 / Users.xlsx)
  const gangapurFees = feeStructures.filter(f => f.branch.toLowerCase().includes('gangapur'));
  const satpurFees = feeStructures.filter(f => f.branch.toLowerCase().includes('satpur'));

  container.innerHTML = `
    <!-- Director Executive Authority & Audit Banner -->
    <div class="card" style="padding: 1.25rem 1.5rem; background: linear-gradient(135deg, rgba(207,168,78,0.12), rgba(19,29,49,0.9)); border: 1px solid var(--border-gold); border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, var(--accent-gold), #856116); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: #070b14; font-weight: 800;">
            🏛️
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
              <h3 style="margin: 0; color: #fff; font-size: 1.2rem; font-weight: 800;">
                Academic Curriculum & Fee Master Console
              </h3>
              <span class="status-badge" style="background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); font-size: 0.72rem; padding: 0.2rem 0.55rem; border-radius: 4px; font-weight: 700;">
                ✓ Director Authority Active
              </span>
            </div>
            <div style="font-size: 0.82rem; color: #cbd5e1; margin-top: 0.25rem;">
              Logged-in Director: <strong style="color: var(--accent-gold-light);">${activeDirector.name}</strong> • ${activeDirector.email} • 📞 ${activeDirector.phone}
            </div>
          </div>
        </div>

        <!-- Director Persona Switcher -->
        <div style="display: flex; align-items: center; gap: 0.5rem; background: rgba(0,0,0,0.3); padding: 0.35rem 0.6rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
          <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Switch Director:</span>
          ${allDirectors.map(dir => {
            const isCur = dir.id === activeDirector.id;
            return `
              <button 
                class="master-director-switch-btn" 
                data-director-id="${dir.id}"
                style="padding: 0.35rem 0.75rem; font-size: 0.78rem; border-radius: 6px; border: 1px solid ${isCur ? 'var(--accent-gold)' : 'transparent'}; background: ${isCur ? 'linear-gradient(135deg, var(--accent-gold), #b38938)' : 'rgba(255,255,255,0.06)'}; color: ${isCur ? '#070b14' : '#cbd5e1'}; font-weight: ${isCur ? '800' : '600'}; cursor: pointer; transition: all 0.2s;"
                title="Switch acting director to ${dir.name}"
              >
                ${dir.id === 'dir_ishwari' ? '👩‍💼' : '👨‍💼'} ${dir.name}
              </button>
            `;
          }).join('')}
        </div>
      </div>
      <div style="font-size: 0.78rem; color: var(--text-dim); margin-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.5rem;">
        ℹ️ Either Director (Ishwari Deshmukh or Shrikrishna Deshmukh) has complete authority to add new courses, add subjects, update per-subject fee structures for Gangapur Road & Satpur Colony, and adjust individual student fees. All updates synchronize live to the Supabase Cloud.
      </div>
    </div>

    <!-- 4 High-Level Master Metric Cards -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
      <div class="card" style="padding: 1.25rem; border: 1px solid var(--border-light); background: rgba(19, 29, 49, 0.7); display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Academic Courses</div>
            <span style="font-size: 1.3rem;">📚</span>
          </div>
          <div style="font-size: 1.8rem; font-weight: 800; color: #fff; margin-top: 0.3rem;">${courses.length}</div>
          <div style="font-size: 0.78rem; color: var(--text-dim); margin-top: 0.2rem;">HSC, CA/CS Foundations & Degree</div>
        </div>
        <button id="master-add-course-btn" class="btn" style="margin-top: 1rem; width: 100%; padding: 0.5rem; background: rgba(207,168,78,0.15); border: 1px solid var(--border-gold); color: var(--accent-gold-light); font-weight: 700; border-radius: 6px; font-size: 0.8rem; cursor: pointer;">
          + Add New Course
        </button>
      </div>

      <div class="card" style="padding: 1.25rem; border: 1px solid rgba(56, 189, 248, 0.3); background: rgba(56, 189, 248, 0.06); display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div style="font-size: 0.78rem; text-transform: uppercase; color: #7dd3fc; font-weight: 700;">Subject Catalog</div>
            <span style="font-size: 1.3rem;">📖</span>
          </div>
          <div style="font-size: 1.8rem; font-weight: 800; color: #7dd3fc; margin-top: 0.3rem;">${subjects.length}</div>
          <div style="font-size: 0.78rem; color: #bae6fd; margin-top: 0.2rem;">Account, Economics, Maths, Law, etc.</div>
        </div>
        <button id="master-add-subject-btn" class="btn" style="margin-top: 1rem; width: 100%; padding: 0.5rem; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.4); color: #7dd3fc; font-weight: 700; border-radius: 6px; font-size: 0.8rem; cursor: pointer;">
          + Add New Subject
        </button>
      </div>

      <div class="card" style="padding: 1.25rem; border: 1px solid rgba(16, 185, 129, 0.3); background: rgba(16, 185, 129, 0.06); display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div style="font-size: 0.78rem; text-transform: uppercase; color: #34d399; font-weight: 700;">Fee Structure Rules</div>
            <span style="font-size: 1.3rem;">💳</span>
          </div>
          <div style="font-size: 1.8rem; font-weight: 800; color: #34d399; margin-top: 0.3rem;">${feeStructures.length}</div>
          <div style="font-size: 0.78rem; color: #a7f3d0; margin-top: 0.2rem;">Gangapur Rd & Satpur Colony Rates</div>
        </div>
        <button id="master-configure-fee-btn" class="btn" style="margin-top: 1rem; width: 100%; padding: 0.5rem; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #6ee7b7; font-weight: 700; border-radius: 6px; font-size: 0.8rem; cursor: pointer;">
          + Configure Fee Rule
        </button>
      </div>

      <div class="card" style="padding: 1.25rem; border: 1px solid var(--border-gold); background: rgba(207, 168, 78, 0.08); display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div style="font-size: 0.78rem; text-transform: uppercase; color: var(--accent-gold); font-weight: 700;">Enrolled Students</div>
            <span style="font-size: 1.3rem;">🎓</span>
          </div>
          <div style="font-size: 1.8rem; font-weight: 800; color: var(--accent-gold-light); margin-top: 0.3rem;">${students.length}</div>
          <div style="font-size: 0.78rem; color: var(--text-dim); margin-top: 0.2rem;">With Subject Choices & 60% Ledger</div>
        </div>
        <button id="master-enrol-student-btn" class="btn btn-primary" style="margin-top: 1rem; width: 100%; padding: 0.5rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 6px; font-size: 0.8rem; cursor: pointer;">
          + Enrol New Student
        </button>
      </div>
    </div>

    <!-- SECTION 1: PER-SUBJECT FEE STRUCTURE (Exact match of Image 1 / Users.xlsx) -->
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-gold); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <h3 style="font-size: 1.2rem; color: #fff; margin: 0; font-weight: 800;">
              💰 Fee Details Per Subject (Both Campuses)
            </h3>
            <span class="status-badge" style="background: rgba(207,168,78,0.18); color: var(--accent-gold); border: 1px solid var(--border-gold); font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700;">
              Official Institute Schedule
            </span>
          </div>
          <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.35rem;">
            Per-subject billing rate charged to students. 60% of fees collected are automatically credited to subject faculty remuneration.
          </div>
        </div>
        <button id="btn-add-fee-rule" style="padding: 0.45rem 0.95rem; background: rgba(207,168,78,0.18); border: 1px solid var(--border-gold); color: var(--accent-gold-light); font-weight: 700; font-size: 0.8rem; border-radius: 6px; cursor: pointer;">
          + Add Fee Rule
        </button>
      </div>

      <!-- Campus Side-by-Side Comparison Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)); gap: 1.5rem;">
        
        <!-- Gangapur Road Center -->
        <div style="background: rgba(19, 29, 49, 0.85); border: 1px solid rgba(56, 189, 248, 0.4); border-radius: 8px; padding: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(56, 189, 248, 0.2); padding-bottom: 0.65rem; margin-bottom: 0.75rem;">
            <div>
              <div style="font-weight: 800; font-size: 1.05rem; color: #7dd3fc; display: flex; align-items: center; gap: 0.4rem;">
                <span>📍</span> Gangapur Road Center
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">HSC: ₹10,000/sub • Professional & ICGSE: ₹15,000/sub</div>
            </div>
            <span style="font-size: 0.72rem; background: rgba(56, 189, 248, 0.15); color: #7dd3fc; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 700;">
              ${gangapurFees.length} Courses Listed
            </span>
          </div>

          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
              <thead>
                <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.74rem; text-transform: uppercase;">
                  <th style="padding: 0.5rem;">Course</th>
                  <th style="padding: 0.5rem;">Rate Per Subject</th>
                  <th style="padding: 0.5rem;">Notes</th>
                  <th style="padding: 0.5rem; text-align: right;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${gangapurFees.map(f => `
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 0.55rem; font-weight: 700; color: #fff;">${f.courseName}</td>
                    <td style="padding: 0.55rem; font-weight: 800; color: #34d399; font-size: 0.92rem;">
                      ₹${(f.perSubjectFee || 0).toLocaleString()}/-
                    </td>
                    <td style="padding: 0.55rem; font-size: 0.75rem; color: var(--text-dim); max-width: 140px;">
                      ${f.notes || 'Standard Per Subject Fee'}
                    </td>
                    <td style="padding: 0.55rem; text-align: right; white-space: nowrap;">
                      <button class="edit-fee-btn" data-fee-id="${f.id}" style="padding: 0.25rem 0.55rem; font-size: 0.75rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 4px; color: #fff; cursor: pointer;">
                        ✏️ Edit
                      </button>
                      <button class="delete-fee-btn" data-fee-id="${f.id}" style="padding: 0.25rem 0.55rem; font-size: 0.75rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 4px; color: #f87171; cursor: pointer; margin-left: 0.3rem;" title="Delete Fee Rule">
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Satpur Colony Center -->
        <div style="background: rgba(19, 29, 49, 0.85); border: 1px solid rgba(207, 168, 78, 0.4); border-radius: 8px; padding: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(207, 168, 78, 0.2); padding-bottom: 0.65rem; margin-bottom: 0.75rem;">
            <div>
              <div style="font-weight: 800; font-size: 1.05rem; color: var(--accent-gold-light); display: flex; align-items: center; gap: 0.4rem;">
                <span>📍</span> Satpur Colony Center
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Specialized HSC rates (Maths ₹8k/₹9k) & Foundations ₹10,000</div>
            </div>
            <span style="font-size: 0.72rem; background: rgba(207, 168, 78, 0.15); color: var(--accent-gold); padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 700;">
              ${satpurFees.length} Courses Listed
            </span>
          </div>

          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
              <thead>
                <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.74rem; text-transform: uppercase;">
                  <th style="padding: 0.5rem;">Course</th>
                  <th style="padding: 0.5rem;">Per Subject Regular</th>
                  <th style="padding: 0.5rem;">Maths Special</th>
                  <th style="padding: 0.5rem; text-align: right;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${satpurFees.map(f => `
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 0.55rem; font-weight: 700; color: #fff;">${f.courseName}</td>
                    <td style="padding: 0.55rem; font-weight: 800; color: #34d399; font-size: 0.92rem;">
                      ₹${(f.perSubjectFee || 0).toLocaleString()}/-
                    </td>
                    <td style="padding: 0.55rem; font-size: 0.85rem;">
                      ${f.specialRates && f.specialRates.Maths 
                        ? `<span style="font-weight: 800; color: #fbbf24;">₹${f.specialRates.Maths.toLocaleString()}/-</span>`
                        : `<span style="color: var(--text-dim);">-</span>`
                      }
                    </td>
                    <td style="padding: 0.55rem; text-align: right; white-space: nowrap;">
                      <button class="edit-fee-btn" data-fee-id="${f.id}" style="padding: 0.25rem 0.55rem; font-size: 0.75rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 4px; color: #fff; cursor: pointer;">
                        ✏️ Edit
                      </button>
                      <button class="delete-fee-btn" data-fee-id="${f.id}" style="padding: 0.25rem 0.55rem; font-size: 0.75rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 4px; color: #f87171; cursor: pointer; margin-left: 0.3rem;" title="Delete Fee Rule">
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>

    <!-- SECTION 2: COURSES MASTER DIRECTORY -->
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <h3 style="font-size: 1.2rem; color: #fff; margin: 0; font-weight: 800;">
              📚 Course Master Directory
            </h3>
            <span class="status-badge" style="background: rgba(56, 189, 248, 0.15); color: #7dd3fc; border: 1px solid rgba(56, 189, 248, 0.3); font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700;">
              ${courses.length} Programs
            </span>
          </div>
          <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.35rem;">
            Academic curriculum programs offered at Imperial Commerce Tutorials. Add, rename or edit program parameters.
          </div>
        </div>
        <button id="btn-add-new-course" class="btn btn-primary" style="padding: 0.5rem 1rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 6px; font-size: 0.82rem; cursor: pointer;">
          + Add New Course
        </button>
      </div>

      <div style="overflow-x: auto;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.86rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 0.74rem; text-transform: uppercase;">
              <th style="padding: 0.65rem;">Code</th>
              <th style="padding: 0.65rem;">Course Name</th>
              <th style="padding: 0.65rem;">Stream / Board</th>
              <th style="padding: 0.65rem;">Duration</th>
              <th style="padding: 0.65rem;">Enrolled Students</th>
              <th style="padding: 0.65rem;">Status</th>
              <th style="padding: 0.65rem; text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${courses.map(c => {
              const enrolledCount = students.filter(s => s.courseId === c.id || (s.courseName && s.courseName.toLowerCase() === c.name.toLowerCase())).length;
              return `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 0.65rem; font-family: monospace; font-weight: 700; color: var(--accent-gold);">${c.code || c.id}</td>
                  <td style="padding: 0.65rem; font-weight: 700; color: #fff;">
                    <div>${c.name}</div>
                    <div style="font-size: 0.72rem; color: var(--text-dim);">${c.description || ''}</div>
                  </td>
                  <td style="padding: 0.65rem; color: #cbd5e1;">${c.stream || 'Commerce'}</td>
                  <td style="padding: 0.65rem; color: var(--text-muted);">${c.duration || '1 Year'}</td>
                  <td style="padding: 0.65rem;">
                    <span style="display: inline-block; padding: 0.2rem 0.55rem; background: rgba(56, 189, 248, 0.12); color: #7dd3fc; border-radius: 4px; font-weight: 700; font-size: 0.78rem;">
                      ${enrolledCount} Students
                    </span>
                  </td>
                  <td style="padding: 0.65rem;">
                    <span class="status-badge" style="padding: 0.15rem 0.45rem; font-size: 0.72rem; border-radius: 4px; background: rgba(16, 185, 129, 0.2); color: #34d399; font-weight: 700;">
                      ${c.status || 'Active'}
                    </span>
                  </td>
                  <td style="padding: 0.65rem; text-align: right; white-space: nowrap;">
                    <div style="display: flex; gap: 0.35rem; justify-content: flex-end;">
                      <button class="edit-course-btn" data-course-id="${c.id}" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 4px; color: #fff; cursor: pointer;">
                        ✏️ Edit
                      </button>
                      <button class="delete-course-btn" data-course-id="${c.id}" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 4px; color: #f87171; cursor: pointer;">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 3: SUBJECTS CATALOG MASTER -->
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-surface); border-radius: var(--radius-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <h3 style="font-size: 1.2rem; color: #fff; margin: 0; font-weight: 800;">
              📖 Subjects Catalog Master
            </h3>
            <span class="status-badge" style="background: rgba(207,168,78,0.15); color: var(--accent-gold); border: 1px solid var(--border-gold); font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700;">
              ${subjects.length} Subjects Active
            </span>
          </div>
          <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.35rem;">
            All subjects taught across courses. Any new subject added immediately becomes selectable for faculty assignment, student enrolments and tests.
          </div>
        </div>
        <button id="btn-add-new-subject" class="btn" style="padding: 0.5rem 1rem; background: rgba(56, 189, 248, 0.18); border: 1px solid rgba(56, 189, 248, 0.4); color: #7dd3fc; font-weight: 700; border-radius: 6px; font-size: 0.82rem; cursor: pointer;">
          + Add New Subject
        </button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 1rem;">
        ${subjects.map(sub => `
          <div style="background: rgba(19, 29, 49, 0.7); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 1rem; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.2s ease;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem;">
                <div style="font-weight: 800; font-size: 1rem; color: #fff;">${sub.name}</div>
                <span style="font-family: monospace; font-size: 0.72rem; color: var(--accent-gold); background: rgba(207,168,78,0.12); padding: 0.15rem 0.45rem; border-radius: 4px;">
                  ${sub.code || sub.id}
                </span>
              </div>
              <div style="font-size: 0.75rem; color: #7dd3fc; margin-bottom: 0.35rem; font-weight: 600;">
                ${sub.category || 'Commerce Discipline'}
              </div>
              <div style="font-size: 0.75rem; color: var(--text-dim); line-height: 1.4;">
                ${sub.description || 'Core curriculum syllabus module with periodic exams & homework.'}
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.65rem;">
              <span style="font-size: 0.72rem; color: #34d399; font-weight: 700;">● Active in Catalog</span>
              <div style="display: flex; gap: 0.35rem;">
                <button class="edit-subject-btn" data-subject-id="${sub.id}" style="padding: 0.25rem 0.55rem; font-size: 0.75rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 4px; color: #fff; cursor: pointer;">
                  ✏️
                </button>
                <button class="delete-subject-btn" data-subject-id="${sub.id}" style="padding: 0.25rem 0.55rem; font-size: 0.75rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 4px; color: #f87171; cursor: pointer;">
                  🗑️
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- SECTION 4: LIVE PER-SUBJECT FEE ESTIMATOR & INSTANT ENROLMENT DESK -->
    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-accent); background: rgba(37, 99, 235, 0.04); border-radius: var(--radius-md);">
      <div style="margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <h3 style="font-size: 1.2rem; color: #93c5fd; margin: 0; font-weight: 800;">
            ⚡ Live Per-Subject Fee Estimator & Instant Enrolment Desk
          </h3>
          <span class="status-badge" style="background: rgba(37, 99, 235, 0.2); color: #93c5fd; border: 1px solid rgba(37, 99, 235, 0.4); font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700;">
            Interactive Simulator
          </span>
        </div>
        <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.35rem;">
          Select branch, course and pick any combination of subjects. See exact calculated fee, 60% faculty remuneration pool, and 40% institute margin!
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: start;">
        <!-- Left Selection Controls -->
        <div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">
                1. Select Campus Branch
              </label>
              <select id="sim-branch-select" style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
                <option value="Gangapur Road Center">Gangapur Road Center</option>
                <option value="Satpur Colony Center">Satpur Colony Center</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">
                2. Select Course
              </label>
              <select id="sim-course-select" style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
                ${courses.map(c => `
                  <option value="${c.id}">${c.name}</option>
                `).join('')}
              </select>
            </div>
          </div>

          <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.45rem;">
            3. Select Subjects Opted by Student:
          </label>
          <div id="sim-subjects-container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; max-height: 220px; overflow-y: auto; padding: 0.5rem; background: #0c1424; border: 1px solid var(--border-subtle); border-radius: 6px;">
            ${subjects.map((s, idx) => `
              <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; color: #fff; padding: 0.3rem 0.45rem; border-radius: 4px; background: rgba(255,255,255,0.03); cursor: pointer;">
                <input type="checkbox" class="sim-subject-checkbox" value="${s.name}" ${idx < 2 ? 'checked' : ''} style="accent-color: var(--accent-gold);" />
                <span>${s.name}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <!-- Right Calculation Summary Box -->
        <div id="sim-result-box" style="background: rgba(12, 20, 36, 0.95); border: 1px solid var(--border-gold); border-radius: 8px; padding: 1.25rem;">
          <!-- Dynamically populated by updateSimulation() -->
        </div>
      </div>
    </div>
  `;

  // Attach director switch listener
  container.querySelectorAll('.master-director-switch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const dirId = btn.getAttribute('data-director-id');
      const dir = state.switchDirector(dirId);
      renderAcademicAndFeeMasterTab(container, showToast);
      showToast(`Switched active Director to ${dir.name}.`, 'info');
    });
  });

  // Attach metric card buttons
  const addCourseBtn = container.querySelector('#master-add-course-btn');
  if (addCourseBtn) {
    addCourseBtn.addEventListener('click', () => openAddCourseModal(showToast, null, () => renderAcademicAndFeeMasterTab(container, showToast)));
  }

  const addSubjectBtn = container.querySelector('#master-add-subject-btn');
  if (addSubjectBtn) {
    addSubjectBtn.addEventListener('click', () => openAddSubjectModal(showToast, null, () => renderAcademicAndFeeMasterTab(container, showToast)));
  }

  const configureFeeBtn = container.querySelector('#master-configure-fee-btn');
  if (configureFeeBtn) {
    configureFeeBtn.addEventListener('click', () => openFeeStructureModal(showToast, null, () => renderAcademicAndFeeMasterTab(container, showToast)));
  }

  const enrolStudentBtn = container.querySelector('#master-enrol-student-btn');
  if (enrolStudentBtn) {
    enrolStudentBtn.addEventListener('click', () => openEnrolStudentModal(showToast, null, () => renderAcademicAndFeeMasterTab(container, showToast)));
  }

  const btnAddFeeRule = container.querySelector('#btn-add-fee-rule');
  if (btnAddFeeRule) {
    btnAddFeeRule.addEventListener('click', () => openFeeStructureModal(showToast, null, () => renderAcademicAndFeeMasterTab(container, showToast)));
  }

  const btnAddNewCourse = container.querySelector('#btn-add-new-course');
  if (btnAddNewCourse) {
    btnAddNewCourse.addEventListener('click', () => openAddCourseModal(showToast, null, () => renderAcademicAndFeeMasterTab(container, showToast)));
  }

  const btnAddNewSubject = container.querySelector('#btn-add-new-subject');
  if (btnAddNewSubject) {
    btnAddNewSubject.addEventListener('click', () => openAddSubjectModal(showToast, null, () => renderAcademicAndFeeMasterTab(container, showToast)));
  }

  // Edit fee structure buttons
  container.querySelectorAll('.edit-fee-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const feeId = btn.getAttribute('data-fee-id');
      const feeObj = state.feeStructures.find(f => f.id === feeId);
      openFeeStructureModal(showToast, feeObj, () => renderAcademicAndFeeMasterTab(container, showToast));
    });
  });

  // Delete fee structure buttons (Director Privilege)
  container.querySelectorAll('.delete-fee-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const feeId = btn.getAttribute('data-fee-id');
      const feeObj = state.feeStructures.find(f => f.id === feeId);
      if (!feeObj) return;
      if (confirm(`Director Authorization: Are you sure you want to delete fee rule for "${feeObj.courseName}" at ${feeObj.branchName || feeObj.branch}?`)) {
        state.deleteFeeStructure(feeId);
        showToast(`Fee rule for "${feeObj.courseName}" deleted.`, 'info');
        renderAcademicAndFeeMasterTab(container, showToast);
      }
    });
  });

  // Edit/Delete course buttons
  container.querySelectorAll('.edit-course-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cid = btn.getAttribute('data-course-id');
      const cObj = state.courses.find(c => c.id === cid);
      openAddCourseModal(showToast, cObj, () => renderAcademicAndFeeMasterTab(container, showToast));
    });
  });

  container.querySelectorAll('.delete-course-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cid = btn.getAttribute('data-course-id');
      const cObj = state.courses.find(c => c.id === cid);
      if (!cObj) return;
      if (confirm(`Are you sure you want to delete course "${cObj.name}"?`)) {
        state.deleteCourse(cid);
        showToast(`Course "${cObj.name}" removed from curriculum.`, 'info');
        renderAcademicAndFeeMasterTab(container, showToast);
      }
    });
  });

  // Edit/Delete subject buttons
  container.querySelectorAll('.edit-subject-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sid = btn.getAttribute('data-subject-id');
      const sObj = state.subjectsCatalog.find(s => s.id === sid);
      openAddSubjectModal(showToast, sObj, () => renderAcademicAndFeeMasterTab(container, showToast));
    });
  });

  container.querySelectorAll('.delete-subject-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sid = btn.getAttribute('data-subject-id');
      const sObj = state.subjectsCatalog.find(s => s.id === sid);
      if (!sObj) return;
      if (confirm(`Are you sure you want to delete subject "${sObj.name}"?`)) {
        state.deleteSubject(sid);
        showToast(`Subject "${sObj.name}" removed from catalog.`, 'info');
        renderAcademicAndFeeMasterTab(container, showToast);
      }
    });
  });

  // Interactive Live Simulator Logic
  const branchSelect = container.querySelector('#sim-branch-select');
  const courseSelect = container.querySelector('#sim-course-select');
  const subjectCheckboxes = container.querySelectorAll('.sim-subject-checkbox');
  const resultBox = container.querySelector('#sim-result-box');

  const updateSimulation = () => {
    const branch = branchSelect.value;
    const courseId = courseSelect.value;
    const selectedSubs = Array.from(subjectCheckboxes).filter(cb => cb.checked).map(cb => cb.value);

    const feeBreakdown = state.calculateStudentFee(courseId, branch, selectedSubs);
    const teacherShare60 = Math.round(feeBreakdown.totalFee * 0.6);
    const imperialSurplus40 = feeBreakdown.totalFee - teacherShare60;

    resultBox.innerHTML = `
      <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent-gold); font-weight: 700; margin-bottom: 0.5rem; letter-spacing: 0.05em;">
        Live Breakdown: ${feeBreakdown.courseName} (${branch.includes('Gangapur') ? 'Gangapur Rd' : 'Satpur'})
      </div>
      <div style="display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.75rem;">
        <span style="font-size: 2rem; font-weight: 800; color: #34d399;">₹${feeBreakdown.totalFee.toLocaleString()}</span>
        <span style="font-size: 0.85rem; color: var(--text-muted);">Total Assessed Fees</span>
      </div>

      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 0.65rem; margin-bottom: 0.85rem;">
        <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700; margin-bottom: 0.35rem;">
          Subject Line-Item Charges:
        </div>
        ${feeBreakdown.breakdown.length === 0 ? `<div style="font-size: 0.78rem; color: #f87171;">No subjects selected. Select at least 1 subject.</div>` : ''}
        ${feeBreakdown.breakdown.map(b => `
          <div style="display: flex; justify-content: space-between; font-size: 0.82rem; padding: 0.2rem 0; color: #cbd5e1;">
            <span>${b.subject} ${b.isSpecial ? '<span style="color: #fbbf24; font-size: 0.72rem;">(Maths Rule)</span>' : ''}</span>
            <span style="font-weight: 700; color: #fff;">₹${b.fee.toLocaleString()}</span>
          </div>
        `).join('')}
      </div>

      <!-- 60/40 Split -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem;">
        <div style="background: rgba(207,168,78,0.1); border: 1px solid var(--border-gold); border-radius: 6px; padding: 0.6rem;">
          <div style="font-size: 0.72rem; color: var(--accent-gold); font-weight: 700;">60% Faculty Pool</div>
          <div style="font-size: 1.15rem; font-weight: 800; color: var(--accent-gold-light); margin-top: 0.2rem;">₹${teacherShare60.toLocaleString()}</div>
        </div>
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 6px; padding: 0.6rem;">
          <div style="font-size: 0.72rem; color: #34d399; font-weight: 700;">40% Institute Margin</div>
          <div style="font-size: 1.15rem; font-weight: 800; color: #34d399; margin-top: 0.2rem;">₹${imperialSurplus40.toLocaleString()}</div>
        </div>
      </div>

      <button id="sim-proceed-enrol-btn" style="width: 100%; padding: 0.65rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 800; border: none; border-radius: 6px; font-size: 0.88rem; cursor: pointer; box-shadow: 0 4px 15px rgba(207,168,78,0.25);">
        ⚡ Enrol Student with This Configuration →
      </button>
    `;

    const proceedBtn = resultBox.querySelector('#sim-proceed-enrol-btn');
    if (proceedBtn) {
      proceedBtn.addEventListener('click', () => {
        openEnrolStudentModal(showToast, {
          branch,
          courseId,
          subjectsChosen: selectedSubs,
          totalFees: feeBreakdown.totalFee
        }, () => renderAcademicAndFeeMasterTab(container, showToast));
      });
    }
  };

  branchSelect.addEventListener('change', updateSimulation);
  courseSelect.addEventListener('change', updateSimulation);
  subjectCheckboxes.forEach(cb => cb.addEventListener('change', updateSimulation));

  // Initial trigger
  updateSimulation();
}

// =============================================================================
// MODAL 1: ADD / EDIT COURSE
// =============================================================================
export function openAddCourseModal(showToast, courseToEdit = null, onSuccess = null) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const isEdit = !!courseToEdit;
  const activeDir = state.getActiveDirector();

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 560px; background: #0c1424; border: 1px solid var(--border-gold); box-shadow: 0 20px 60px rgba(0,0,0,0.85);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="font-size: 1.3rem;">📚</span>
          <h3 style="color: var(--accent-gold-light); margin: 0; font-size: 1.2rem;">
            ${isEdit ? `Edit Course: ${courseToEdit.name}` : 'Add New Academic Course'}
          </h3>
        </div>
        <button id="close-course-modal-btn" style="background: none; border: none; color: var(--text-muted); font-size: 1.3rem; cursor: pointer;">✕</button>
      </div>

      <div style="font-size: 0.78rem; color: var(--accent-gold); background: rgba(207,168,78,0.1); padding: 0.4rem 0.65rem; border-radius: 4px; margin-bottom: 1rem;">
        Authorizing Director: <strong>${activeDir.name}</strong> • Live synchronization to Supabase Cloud
      </div>

      <form id="course-master-form">
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Course Name <span style="color: var(--accent-gold);">*</span>
            </label>
            <input 
              type="text" 
              id="cm-name-input" 
              required 
              value="${isEdit ? courseToEdit.name : ''}"
              placeholder="e.g. TY Bcom / CS Executive / 9th ICSE" 
              style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem;" 
            />
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Course Code <span style="color: var(--accent-gold);">*</span>
            </label>
            <input 
              type="text" 
              id="cm-code-input" 
              required 
              value="${isEdit ? (courseToEdit.code || courseToEdit.id) : ''}"
              placeholder="e.g. TYBCOM" 
              style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem; font-family: monospace; text-transform: uppercase;" 
            />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Stream / Level
            </label>
            <input 
              type="text" 
              id="cm-stream-input" 
              value="${isEdit ? (courseToEdit.stream || 'Commerce') : 'Commerce'}"
              placeholder="e.g. Higher Secondary / Professional" 
              style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;" 
            />
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Duration / Academic Cycle
            </label>
            <input 
              type="text" 
              id="cm-duration-input" 
              value="${isEdit ? (courseToEdit.duration || '1 Academic Year') : '1 Academic Year'}"
              placeholder="e.g. 1 Year / 6 Months" 
              style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;" 
            />
          </div>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
            Course Syllabus & Academic Overview
          </label>
          <textarea 
            id="cm-desc-input" 
            rows="2" 
            placeholder="Key focus areas, exam patterns, and study module specifications..." 
            style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;"
          >${isEdit ? (courseToEdit.description || '') : ''}</textarea>
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          <button type="button" id="cancel-course-modal-btn" style="padding: 0.65rem 1.25rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 6px; color: #cbd5e1; cursor: pointer;">
            Cancel
          </button>
          <button type="submit" style="padding: 0.65rem 1.75rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 6px; cursor: pointer;">
            ${isEdit ? 'Save Changes →' : 'Create Course →'}
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

  modalContainer.querySelector('#close-course-modal-btn').addEventListener('click', closeModal);
  modalContainer.querySelector('#cancel-course-modal-btn').addEventListener('click', closeModal);

  modalContainer.querySelector('#course-master-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = modalContainer.querySelector('#cm-name-input').value.trim();
    const code = modalContainer.querySelector('#cm-code-input').value.trim().toUpperCase();
    const stream = modalContainer.querySelector('#cm-stream-input').value.trim();
    const duration = modalContainer.querySelector('#cm-duration-input').value.trim();
    const description = modalContainer.querySelector('#cm-desc-input').value.trim();

    if (isEdit) {
      state.updateCourse(courseToEdit.id, { name, code, stream, duration, description });
      showToast(`Course "${name}" updated successfully!`, 'success');
    } else {
      state.addCourse({ name, code, stream, duration, description });
      showToast(`New Course "${name}" created by Director ${activeDir.name}!`, 'success');
    }

    closeModal();
    if (onSuccess) onSuccess();
  });
}

// =============================================================================
// MODAL 2: ADD / EDIT SUBJECT
// =============================================================================
export function openAddSubjectModal(showToast, subjectToEdit = null, onSuccess = null) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const isEdit = !!subjectToEdit;
  const activeDir = state.getActiveDirector();

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 560px; background: #0c1424; border: 1px solid var(--border-gold); box-shadow: 0 20px 60px rgba(0,0,0,0.85);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="font-size: 1.3rem;">📖</span>
          <h3 style="color: var(--accent-gold-light); margin: 0; font-size: 1.2rem;">
            ${isEdit ? `Edit Subject: ${subjectToEdit.name}` : 'Add New Academic Subject'}
          </h3>
        </div>
        <button id="close-subj-modal-btn" style="background: none; border: none; color: var(--text-muted); font-size: 1.3rem; cursor: pointer;">✕</button>
      </div>

      <div style="font-size: 0.78rem; color: var(--accent-gold); background: rgba(207,168,78,0.1); padding: 0.4rem 0.65rem; border-radius: 4px; margin-bottom: 1rem;">
        Authorizing Director: <strong>${activeDir.name}</strong> • Synchronized to Faculty Assignment & Portals
      </div>

      <form id="subject-master-form">
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Subject Name <span style="color: var(--accent-gold);">*</span>
            </label>
            <input 
              type="text" 
              id="sm-name-input" 
              required 
              value="${isEdit ? subjectToEdit.name : ''}"
              placeholder="e.g. Account 1 / Taxation / Costing" 
              style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem;" 
            />
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Subject Code
            </label>
            <input 
              type="text" 
              id="sm-code-input" 
              value="${isEdit ? (subjectToEdit.code || subjectToEdit.id) : ''}"
              placeholder="e.g. ACC101" 
              style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem; font-family: monospace; text-transform: uppercase;" 
            />
          </div>
        </div>

        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
            Subject Category / Stream
          </label>
          <select id="sm-cat-select" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
            <option value="Core Accounting & Book-Keeping" ${isEdit && subjectToEdit.category && subjectToEdit.category.includes('Account') ? 'selected' : ''}>Core Accounting & Book-Keeping</option>
            <option value="Economics & Commercial Policy" ${isEdit && subjectToEdit.category && subjectToEdit.category.includes('Economics') ? 'selected' : ''}>Economics & Commercial Policy</option>
            <option value="Quantitative Maths & Statistics" ${isEdit && subjectToEdit.category && subjectToEdit.category.includes('Maths') ? 'selected' : ''}>Quantitative Maths & Statistics</option>
            <option value="Commercial Law & Jurisprudence" ${isEdit && subjectToEdit.category && subjectToEdit.category.includes('Law') ? 'selected' : ''}>Commercial Law & Jurisprudence</option>
            <option value="Business Enterprise & Organization" ${isEdit && subjectToEdit.category && subjectToEdit.category.includes('Enterprise') ? 'selected' : ''}>Business Enterprise & Organization</option>
            <option value="Taxation & Financial Audit" ${isEdit && subjectToEdit.category && subjectToEdit.category.includes('Tax') ? 'selected' : ''}>Taxation & Financial Audit</option>
            <option value="Applied Information Technology" ${isEdit && subjectToEdit.category && subjectToEdit.category.includes('Information') ? 'selected' : ''}>Applied Information Technology</option>
          </select>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
            Subject Scope & Description
          </label>
          <textarea 
            id="sm-desc-input" 
            rows="2" 
            placeholder="e.g. Fundamental double-entry accounting, final accounts preparation and balance sheet analysis..." 
            style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;"
          >${isEdit ? (subjectToEdit.description || '') : ''}</textarea>
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          <button type="button" id="cancel-subj-modal-btn" style="padding: 0.65rem 1.25rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 6px; color: #cbd5e1; cursor: pointer;">
            Cancel
          </button>
          <button type="submit" style="padding: 0.65rem 1.75rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 6px; cursor: pointer;">
            ${isEdit ? 'Save Changes →' : 'Add Subject to Catalog →'}
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

  modalContainer.querySelector('#close-subj-modal-btn').addEventListener('click', closeModal);
  modalContainer.querySelector('#cancel-subj-modal-btn').addEventListener('click', closeModal);

  modalContainer.querySelector('#subject-master-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = modalContainer.querySelector('#sm-name-input').value.trim();
    const code = modalContainer.querySelector('#sm-code-input').value.trim().toUpperCase() || `SUB_${Date.now().toString().slice(-4)}`;
    const category = modalContainer.querySelector('#sm-cat-select').value;
    const description = modalContainer.querySelector('#sm-desc-input').value.trim();

    if (isEdit) {
      state.updateSubject(subjectToEdit.id, { name, code, category, description });
      showToast(`Subject "${name}" updated successfully!`, 'success');
    } else {
      state.addSubject({ name, code, category, description });
      showToast(`New Subject "${name}" added to catalog by Director ${activeDir.name}!`, 'success');
    }

    closeModal();
    if (onSuccess) onSuccess();
  });
}

// =============================================================================
// MODAL 3: CONFIGURE FEE STRUCTURE (Gangapur Road & Satpur Colony)
// =============================================================================
export function openFeeStructureModal(showToast, feeToEdit = null, onSuccess = null) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const isEdit = !!feeToEdit;
  const courses = state.courses || [];
  const activeDir = state.getActiveDirector();

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 580px; background: #0c1424; border: 1px solid var(--border-gold); box-shadow: 0 20px 60px rgba(0,0,0,0.85);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="font-size: 1.3rem;">💳</span>
          <h3 style="color: var(--accent-gold-light); margin: 0; font-size: 1.2rem;">
            ${isEdit ? `Configure Fee: ${feeToEdit.courseName} (${feeToEdit.branch.includes('Gangapur') ? 'Gangapur' : 'Satpur'})` : 'Add Per-Subject Fee Structure Rule'}
          </h3>
        </div>
        <button id="close-fee-cfg-btn" style="background: none; border: none; color: var(--text-muted); font-size: 1.3rem; cursor: pointer;">✕</button>
      </div>

      <div style="font-size: 0.78rem; color: var(--accent-gold); background: rgba(207,168,78,0.1); padding: 0.4rem 0.65rem; border-radius: 4px; margin-bottom: 1rem;">
        Director Authorization: <strong>${activeDir.name}</strong> • Modifies per-subject rate & 60% faculty pool
      </div>

      <form id="fee-config-form">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Campus Center <span style="color: var(--accent-gold);">*</span>
            </label>
            <select id="cfg-branch-select" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
              <option value="Gangapur Road Center" ${isEdit && feeToEdit.branch.includes('Gangapur') ? 'selected' : ''}>Gangapur Road Center</option>
              <option value="Satpur Colony Center" ${isEdit && feeToEdit.branch.includes('Satpur') ? 'selected' : ''}>Satpur Colony Center</option>
            </select>
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Course <span style="color: var(--accent-gold);">*</span>
            </label>
            <select id="cfg-course-select" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
              ${courses.map(c => `
                <option value="${c.id}" ${isEdit && (feeToEdit.courseId === c.id || feeToEdit.courseName === c.name) ? 'selected' : ''}>${c.name}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #34d399; margin-bottom: 0.35rem;">
              Per Subject Fee (₹) <span style="color: var(--accent-gold);">*</span>
            </label>
            <input 
              type="number" 
              id="cfg-fee-input" 
              required 
              value="${isEdit ? feeToEdit.perSubjectFee : 10000}" 
              style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.95rem; font-weight: 700;" 
            />
            <div style="font-size: 0.72rem; color: var(--text-dim); margin-top: 0.2rem;">Standard rate charged for subjects</div>
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fbbf24; margin-bottom: 0.35rem;">
              Maths Special Fee (₹) [Optional]
            </label>
            <input 
              type="number" 
              id="cfg-maths-fee-input" 
              value="${isEdit && feeToEdit.specialRates && feeToEdit.specialRates.Maths ? feeToEdit.specialRates.Maths : ''}" 
              placeholder="e.g. 8000 or 9000" 
              style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.95rem; font-weight: 700;" 
            />
            <div style="font-size: 0.72rem; color: var(--text-dim); margin-top: 0.2rem;">Leave blank if same as regular fee</div>
          </div>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
            Fee Policy Notes & Remarks
          </label>
          <input 
            type="text" 
            id="cfg-notes-input" 
            value="${isEdit ? (feeToEdit.notes || '') : 'Official schedule per subject fee'}" 
            placeholder="e.g. Per subject Rs 10,000/- or Per subject 6500 (Maths Rs 8000)" 
            style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;" 
          />
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          <button type="button" id="cancel-fee-cfg-btn" style="padding: 0.65rem 1.25rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 6px; color: #cbd5e1; cursor: pointer;">
            Cancel
          </button>
          <button type="submit" style="padding: 0.65rem 1.75rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 6px; cursor: pointer;">
            Save Fee Rule →
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

  modalContainer.querySelector('#close-fee-cfg-btn').addEventListener('click', closeModal);
  modalContainer.querySelector('#cancel-fee-cfg-btn').addEventListener('click', closeModal);

  modalContainer.querySelector('#fee-config-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const branch = modalContainer.querySelector('#cfg-branch-select').value;
    const courseId = modalContainer.querySelector('#cfg-course-select').value;
    const perSubjectFee = Number(modalContainer.querySelector('#cfg-fee-input').value) || 0;
    const mathsVal = modalContainer.querySelector('#cfg-maths-fee-input').value;
    const notes = modalContainer.querySelector('#cfg-notes-input').value;

    const specialRates = {};
    if (mathsVal && Number(mathsVal) > 0) {
      specialRates['Maths'] = Number(mathsVal);
      specialRates['Maths & Statistics'] = Number(mathsVal);
    }

    if (isEdit) {
      state.updateFeeStructure(feeToEdit.id, {
        branch,
        courseId,
        perSubjectFee,
        specialRates,
        notes
      });
      showToast(`Fee structure updated for ${feeToEdit.courseName}!`, 'success');
    } else {
      state.addFeeStructure({
        branch,
        courseId,
        perSubjectFee,
        specialRates,
        notes
      });
      showToast(`New fee rule added for ${branch}!`, 'success');
    }

    closeModal();
    if (onSuccess) onSuccess();
  });
}

// =============================================================================
// MODAL 4: ENROL NEW STUDENT (With dynamic multi-subject fee computation)
// =============================================================================
export function openEnrolStudentModal(showToast, prefillData = null, onSuccess = null) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const courses = state.courses || [];
  const subjects = state.subjectsCatalog || [];
  const teachers = state.teachers || [];
  const activeDir = state.getActiveDirector();

  const defaultCourse = prefillData && prefillData.courseId ? prefillData.courseId : (courses[0] ? courses[0].id : '');
  const defaultBranch = prefillData && prefillData.branch ? prefillData.branch : 'Gangapur Road Center';
  const defaultSubs = prefillData && prefillData.subjectsChosen ? new Set(prefillData.subjectsChosen) : new Set(['Account', 'Economics']);

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 680px; background: #0c1424; border: 1px solid var(--border-gold); box-shadow: 0 24px 70px rgba(0,0,0,0.9);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="font-size: 1.3rem;">🎓</span>
          <h3 style="color: var(--accent-gold-light); margin: 0; font-size: 1.2rem;">
            Enrol New Commerce Student
          </h3>
        </div>
        <button id="close-enrol-btn" style="background: none; border: none; color: var(--text-muted); font-size: 1.3rem; cursor: pointer;">✕</button>
      </div>

      <div style="font-size: 0.78rem; color: var(--accent-gold); background: rgba(207,168,78,0.1); padding: 0.4rem 0.65rem; border-radius: 4px; margin-bottom: 1rem;">
        Enrolling Director: <strong>${activeDir.name}</strong> • Automatically calculates fees per subject & 60% teacher allocation
      </div>

      <form id="enrol-student-form">
        <!-- Student & Parent Names -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 0.85rem;">
          <div>
            <label style="display: block; font-size: 0.82rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Student Full Name <span style="color: var(--accent-gold);">*</span>
            </label>
            <input type="text" id="enr-name-input" required placeholder="e.g. Arush Thorat" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.82rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Parent / Guardian Name <span style="color: var(--accent-gold);">*</span>
            </label>
            <input type="text" id="enr-parent-input" required placeholder="e.g. Mr Thorat" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.9rem;" />
          </div>
        </div>

        <!-- Contact & Branch -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 0.85rem;">
          <div>
            <label style="display: block; font-size: 0.82rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Parent Email / Student Email
            </label>
            <input type="email" id="enr-email-input" placeholder="e.g. mrthorat@gmail.com" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.82rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Mobile Number (WhatsApp) <span style="color: var(--accent-gold);">*</span>
            </label>
            <input type="tel" id="enr-phone-input" required placeholder="e.g. 9850311082" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 0.85rem;">
          <div>
            <label style="display: block; font-size: 0.82rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Campus Center <span style="color: var(--accent-gold);">*</span>
            </label>
            <select id="enr-branch-select" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
              <option value="Gangapur Road Center" ${defaultBranch.includes('Gangapur') ? 'selected' : ''}>Gangapur Road Center</option>
              <option value="Satpur Colony Center" ${defaultBranch.includes('Satpur') ? 'selected' : ''}>Satpur Colony Center</option>
            </select>
          </div>
          <div>
            <label style="display: block; font-size: 0.82rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Course Enrolling For <span style="color: var(--accent-gold);">*</span>
            </label>
            <select id="enr-course-select" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
              ${courses.map(c => `
                <option value="${c.id}" ${c.id === defaultCourse ? 'selected' : ''}>${c.name}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- Subjects Chosen Checkboxes -->
        <div style="margin-bottom: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <label style="font-size: 0.82rem; font-weight: 700; color: #fff;">
              Subjects Chosen by Student <span style="color: var(--accent-gold);">*</span>
            </label>
            <span style="font-size: 0.72rem; color: var(--accent-gold);">*Rate calculated dynamically per subject</span>
          </div>
          <div id="enr-subjects-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; max-height: 160px; overflow-y: auto; padding: 0.5rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px;">
            ${subjects.map(s => `
              <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; color: #fff; cursor: pointer;">
                <input type="checkbox" class="enr-subj-cb" value="${s.name}" ${defaultSubs.has(s.name) ? 'checked' : ''} style="accent-color: #10b981;" />
                <span>${s.name}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <!-- Fee Calculation & Adjustment Box -->
        <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 6px; padding: 0.85rem; margin-bottom: 1rem;">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; align-items: center;">
            <div>
              <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Base Computed Fee</div>
              <div id="enr-base-fee-val" style="font-size: 1.25rem; font-weight: 800; color: #fff;">₹0</div>
            </div>
            <div>
              <label style="font-size: 0.72rem; color: #fbbf24; text-transform: uppercase; font-weight: 700;">Director Concession (₹)</label>
              <input type="number" id="enr-discount-input" value="0" min="0" style="width: 100%; padding: 0.35rem 0.5rem; background: #0c1424; border: 1px solid var(--border-light); border-radius: 4px; color: #fff; font-size: 0.85rem;" />
            </div>
            <div>
              <div style="font-size: 0.72rem; color: #34d399; text-transform: uppercase; font-weight: 700;">Final Assessed Fee</div>
              <div id="enr-final-fee-val" style="font-size: 1.35rem; font-weight: 800; color: #34d399;">₹0</div>
            </div>
          </div>
        </div>

        <!-- Initial Fee Payment / Receipt Generation (Optional on Admission) -->
        <div style="background: rgba(207, 168, 78, 0.08); border: 1px solid var(--border-gold); border-radius: 6px; padding: 0.85rem; margin-bottom: 1.25rem;">
          <div style="font-size: 0.82rem; font-weight: 700; color: var(--accent-gold-light); margin-bottom: 0.5rem;">
            Initial Fee Collection on Admission (Optional):
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem;">
            <div>
              <label style="font-size: 0.72rem; color: #cbd5e1;">Amount Received Now (₹)</label>
              <input type="number" id="enr-initial-paid-input" value="0" min="0" style="width: 100%; padding: 0.45rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 4px; color: #fff; font-size: 0.9rem; font-weight: 700;" />
            </div>
            <div>
              <label style="font-size: 0.72rem; color: #cbd5e1;">Payment Mode</label>
              <select id="enr-pay-mode-select" style="width: 100%; padding: 0.45rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 4px; color: #fff; font-size: 0.85rem;">
                <option value="Online (Bank UPI QR)">Online (Bank UPI QR)</option>
                <option value="Cash">Cash Counter</option>
                <option value="Cheque / DD">Cheque / Demand Draft</option>
                <option value="Bank NEFT / IMPS">Bank NEFT / IMPS</option>
              </select>
            </div>
            <div>
              <label style="font-size: 0.72rem; color: #cbd5e1;">Assigned Faculty Mentor</label>
              <select id="enr-teacher-select" style="width: 100%; padding: 0.45rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 4px; color: #fff; font-size: 0.85rem;">
                ${teachers.map(t => `<option value="${t.name}">${t.name}</option>`).join('')}
              </select>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          <button type="button" id="cancel-enrol-btn" style="padding: 0.65rem 1.25rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 6px; color: #cbd5e1; cursor: pointer;">
            Cancel
          </button>
          <button type="submit" style="padding: 0.65rem 1.75rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 6px; cursor: pointer;">
            Complete Student Enrolment →
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

  modalContainer.querySelector('#close-enrol-btn').addEventListener('click', closeModal);
  modalContainer.querySelector('#cancel-enrol-btn').addEventListener('click', closeModal);

  // Dynamic fee recalculation
  const branchSel = modalContainer.querySelector('#enr-branch-select');
  const courseSel = modalContainer.querySelector('#enr-course-select');
  const subjCheckboxes = modalContainer.querySelectorAll('.enr-subj-cb');
  const discountInput = modalContainer.querySelector('#enr-discount-input');
  const baseFeeDisplay = modalContainer.querySelector('#enr-base-fee-val');
  const finalFeeDisplay = modalContainer.querySelector('#enr-final-fee-val');

  let currentCalculatedBase = 0;
  let currentFinalFee = 0;

  const recompute = () => {
    const branch = branchSel.value;
    const courseId = courseSel.value;
    const chosen = Array.from(subjCheckboxes).filter(cb => cb.checked).map(cb => cb.value);

    const feeRes = state.calculateStudentFee(courseId, branch, chosen);
    currentCalculatedBase = feeRes.totalFee;

    const discount = Number(discountInput.value) || 0;
    currentFinalFee = Math.max(0, currentCalculatedBase - discount);

    baseFeeDisplay.textContent = `₹${currentCalculatedBase.toLocaleString()}`;
    finalFeeDisplay.textContent = `₹${currentFinalFee.toLocaleString()}`;
  };

  branchSel.addEventListener('change', recompute);
  courseSel.addEventListener('change', recompute);
  subjCheckboxes.forEach(cb => cb.addEventListener('change', recompute));
  discountInput.addEventListener('input', recompute);

  recompute();

  // Form submission
  modalContainer.querySelector('#enrol-student-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = modalContainer.querySelector('#enr-name-input').value.trim();
    const parentName = modalContainer.querySelector('#enr-parent-input').value.trim();
    const email = modalContainer.querySelector('#enr-email-input').value.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`;
    const phone = modalContainer.querySelector('#enr-phone-input').value.trim();
    const branch = branchSel.value;
    const courseId = courseSel.value;
    const chosenSubs = Array.from(subjCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
    const discount = Number(discountInput.value) || 0;
    const initialPaid = Number(modalContainer.querySelector('#enr-initial-paid-input').value) || 0;
    const payMode = modalContainer.querySelector('#enr-pay-mode-select').value;
    const assignedTeacher = modalContainer.querySelector('#enr-teacher-select').value;

    const courseObj = courses.find(c => c.id === courseId) || { name: 'Commerce Program', code: 'COMM' };

    const newStudent = state.addStudent({
      name,
      parentName,
      email,
      phone,
      branch,
      courseId,
      courseName: courseObj.name,
      batch: `2026-27 (${branch.includes('Gangapur') ? 'Gangapur' : 'Satpur'})`,
      subjectsChosen: chosenSubs,
      totalFees: currentFinalFee,
      discount,
      paidFees: 0,
      assignedTeacher
    });

    // If initial payment is made, issue receipt immediately
    if (initialPaid > 0) {
      state.collectFee({
        studentId: newStudent.id,
        amount: initialPaid,
        mode: payMode,
        txnId: `ADM-${Date.now().toString().slice(-6)}`,
        notes: `Admission Token Fee (${courseObj.name})`
      });
    }

    closeModal();
    showToast(`Student ${name} successfully enrolled in ${courseObj.name} with ${chosenSubs.length} subjects!`, 'success');

    if (onSuccess) onSuccess();
  });
}

// =============================================================================
// MODAL 5: ADJUST STUDENT FEES & SUBJECTS (Director Privilege)
// =============================================================================
export function openEditStudentModal(showToast, studentId, onSuccess = null) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const student = state.students.find(s => s.id === studentId);
  if (!student) return;

  const courses = state.courses || [];
  const subjects = state.subjectsCatalog || [];
  const activeDir = state.getActiveDirector();
  const currentSubs = new Set(student.subjectsChosen || []);

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 620px; background: #0c1424; border: 1px solid var(--border-gold); box-shadow: 0 24px 70px rgba(0,0,0,0.9);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="font-size: 1.3rem;">✏️</span>
          <h3 style="color: var(--accent-gold-light); margin: 0; font-size: 1.2rem;">
            Adjust Fees & Subjects: ${student.name}
          </h3>
        </div>
        <button id="close-adj-btn" style="background: none; border: none; color: var(--text-muted); font-size: 1.3rem; cursor: pointer;">✕</button>
      </div>

      <div style="font-size: 0.78rem; color: var(--accent-gold); background: rgba(207,168,78,0.1); padding: 0.4rem 0.65rem; border-radius: 4px; margin-bottom: 1rem;">
        Authorizing Director: <strong>${activeDir.name}</strong> • Roll No: ${student.rollNo || student.id}
      </div>

      <form id="edit-student-form">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.82rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Campus Center
            </label>
            <select id="adj-branch-select" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
              <option value="Gangapur Road Center" ${student.branch && student.branch.includes('Gangapur') ? 'selected' : ''}>Gangapur Road Center</option>
              <option value="Satpur Colony Center" ${student.branch && student.branch.includes('Satpur') ? 'selected' : ''}>Satpur Colony Center</option>
            </select>
          </div>
          <div>
            <label style="display: block; font-size: 0.82rem; font-weight: 600; color: #fff; margin-bottom: 0.35rem;">
              Course
            </label>
            <select id="adj-course-select" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.85rem;">
              ${courses.map(c => `
                <option value="${c.id}" ${c.id === student.courseId || c.name === student.courseName ? 'selected' : ''}>${c.name}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #fff; margin-bottom: 0.35rem;">
            Subjects Opted by Student:
          </label>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; max-height: 160px; overflow-y: auto; padding: 0.5rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px;">
            ${subjects.map(s => `
              <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; color: #fff; cursor: pointer;">
                <input type="checkbox" class="adj-subj-cb" value="${s.name}" ${currentSubs.has(s.name) ? 'checked' : ''} style="accent-color: #10b981;" />
                <span>${s.name}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
          <div>
            <label style="display: block; font-size: 0.82rem; font-weight: 600; color: #34d399; margin-bottom: 0.35rem;">
              Assessed Total Fees (₹)
            </label>
            <input type="number" id="adj-total-input" value="${student.totalFees || 0}" style="width: 100%; padding: 0.65rem; background: #131d31; border: 1px solid var(--border-light); border-radius: 6px; color: #fff; font-size: 0.95rem; font-weight: 700;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.82rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.35rem;">
              Already Paid (₹)
            </label>
            <input type="number" id="adj-paid-display" value="${student.paidFees || 0}" readonly style="width: 100%; padding: 0.65rem; background: #0c1424; border: 1px solid var(--border-subtle); border-radius: 6px; color: #34d399; font-size: 0.95rem; font-weight: 700;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.82rem; font-weight: 600; color: #f87171; margin-bottom: 0.35rem;">
              Remaining Due (₹)
            </label>
            <div id="adj-due-display" style="padding: 0.65rem; font-size: 1.1rem; font-weight: 800; color: #f87171;">
              ₹${((student.totalFees || 0) - (student.paidFees || 0)).toLocaleString()}
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          <button type="button" id="cancel-adj-btn" style="padding: 0.65rem 1.25rem; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); border-radius: 6px; color: #cbd5e1; cursor: pointer;">
            Cancel
          </button>
          <button type="submit" style="padding: 0.65rem 1.75rem; background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover)); color: #070b14; font-weight: 700; border: none; border-radius: 6px; cursor: pointer;">
            Update Student Profile →
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

  modalContainer.querySelector('#close-adj-btn').addEventListener('click', closeModal);
  modalContainer.querySelector('#cancel-adj-btn').addEventListener('click', closeModal);

  const totalInput = modalContainer.querySelector('#adj-total-input');
  const dueDisplay = modalContainer.querySelector('#adj-due-display');
  totalInput.addEventListener('input', () => {
    const tot = Number(totalInput.value) || 0;
    const paid = student.paidFees || 0;
    dueDisplay.textContent = `₹${Math.max(0, tot - paid).toLocaleString()}`;
  });

  modalContainer.querySelector('#edit-student-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const branch = modalContainer.querySelector('#adj-branch-select').value;
    const courseId = modalContainer.querySelector('#adj-course-select').value;
    const courseObj = courses.find(c => c.id === courseId) || { name: student.courseName };
    const chosenSubs = Array.from(modalContainer.querySelectorAll('.adj-subj-cb')).filter(cb => cb.checked).map(cb => cb.value);
    const totalFees = Number(totalInput.value) || 0;

    state.updateStudent(student.id, {
      branch,
      courseId,
      courseName: courseObj.name,
      subjectsChosen: chosenSubs,
      totalFees
    });

    closeModal();
    showToast(`Updated student profile and fees for ${student.name}!`, 'success');
    if (onSuccess) onSuccess();
  });
}
