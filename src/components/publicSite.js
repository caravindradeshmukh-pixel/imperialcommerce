/* Public Persuasion Website Component for Imperial Commerce Tutorials, Nashik
   Includes Overview, Campuses, Courses, Hall of Fame, and "Join our Team" Recruitment Portal */

import { state } from '../state.js';
import { NASHIK_BRANCHES, TOPPERS_LIST } from '../mockData.js';

export function renderPublicSite(container, showToast) {
  const courses = state.courses;
  const activeTab = state.currentPublicTab || 'overview';

  container.innerHTML = `
    <!-- Top Public Navigation Tabs Bar on Opening Page -->
    <div class="public-tab-nav-container" style="background: rgba(13, 21, 39, 0.95); border-bottom: 1px solid var(--border-gold); position: sticky; top: 4.2rem; z-index: 100; backdrop-filter: blur(12px); box-shadow: var(--shadow-sm);">
      <div style="max-width: 1400px; margin: 0 auto; padding: 0.6rem 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
        <nav style="display: flex; gap: 0.5rem; flex-wrap: wrap;" aria-label="Public Site Sections">
          <button class="btn btn-sm pub-tab-btn ${activeTab === 'overview' ? 'active-tab' : ''}" data-pubtab="overview" style="padding: 0.45rem 0.9rem; font-size: 0.84rem; border-radius: 6px; cursor: pointer; border: 1px solid ${activeTab === 'overview' ? 'var(--accent-gold)' : 'var(--border-subtle)'}; background: ${activeTab === 'overview' ? 'rgba(207,168,78,0.2)' : 'rgba(255,255,255,0.03)'}; color: ${activeTab === 'overview' ? 'var(--accent-gold-light)' : 'var(--text-muted)'}; font-weight: ${activeTab === 'overview' ? '700' : '600'};">
            🌐 Overview
          </button>
          <button class="btn btn-sm pub-tab-btn ${activeTab === 'branches' ? 'active-tab' : ''}" data-pubtab="branches" style="padding: 0.45rem 0.9rem; font-size: 0.84rem; border-radius: 6px; cursor: pointer; border: 1px solid ${activeTab === 'branches' ? 'var(--accent-gold)' : 'var(--border-subtle)'}; background: ${activeTab === 'branches' ? 'rgba(207,168,78,0.2)' : 'rgba(255,255,255,0.03)'}; color: ${activeTab === 'branches' ? 'var(--accent-gold-light)' : 'var(--text-muted)'}; font-weight: ${activeTab === 'branches' ? '700' : '600'};">
            📍 Nashik Campuses
          </button>
          <button class="btn btn-sm pub-tab-btn ${activeTab === 'courses' ? 'active-tab' : ''}" data-pubtab="courses" style="padding: 0.45rem 0.9rem; font-size: 0.84rem; border-radius: 6px; cursor: pointer; border: 1px solid ${activeTab === 'courses' ? 'var(--accent-gold)' : 'var(--border-subtle)'}; background: ${activeTab === 'courses' ? 'rgba(207,168,78,0.2)' : 'rgba(255,255,255,0.03)'}; color: ${activeTab === 'courses' ? 'var(--accent-gold-light)' : 'var(--text-muted)'}; font-weight: ${activeTab === 'courses' ? '700' : '600'};">
            📚 Courses & Services
          </button>
          <button class="btn btn-sm pub-tab-btn ${activeTab === 'toppers' ? 'active-tab' : ''}" data-pubtab="toppers" style="padding: 0.45rem 0.9rem; font-size: 0.84rem; border-radius: 6px; cursor: pointer; border: 1px solid ${activeTab === 'toppers' ? 'var(--accent-gold)' : 'var(--border-subtle)'}; background: ${activeTab === 'toppers' ? 'rgba(207,168,78,0.2)' : 'rgba(255,255,255,0.03)'}; color: ${activeTab === 'toppers' ? 'var(--accent-gold-light)' : 'var(--text-muted)'}; font-weight: ${activeTab === 'toppers' ? '700' : '600'};">
            🏆 Hall of Fame
          </button>
          <button class="btn btn-sm pub-tab-btn ${activeTab === 'recruitment' ? 'active-tab' : ''}" data-pubtab="recruitment" id="top-join-team-tab-btn" style="padding: 0.45rem 1rem; font-size: 0.84rem; border-radius: 6px; cursor: pointer; border: 1px solid var(--accent-gold); background: ${activeTab === 'recruitment' ? 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover))' : 'rgba(207,168,78,0.12)'}; color: ${activeTab === 'recruitment' ? '#070b14' : 'var(--accent-gold)'}; font-weight: 800; display: inline-flex; align-items: center; gap: 0.4rem; box-shadow: 0 0 15px rgba(207,168,78,0.2);">
            <span>💼 Join our Team</span>
            <span style="font-size: 0.65rem; background: ${activeTab === 'recruitment' ? '#070b14' : 'rgba(207,168,78,0.25)'}; color: ${activeTab === 'recruitment' ? 'var(--accent-gold)' : '#fff'}; padding: 0.1rem 0.4rem; border-radius: 10px; font-weight: 800;">We're Hiring!</span>
          </button>
        </nav>

        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <button id="quick-bar-demo-btn" class="btn btn-sm btn-gold" style="font-size: 0.78rem; padding: 0.35rem 0.8rem;">
            ✍️ Book Demo
          </button>
          <button id="quick-bar-join-btn" class="btn btn-sm btn-outline" style="font-size: 0.78rem; padding: 0.35rem 0.8rem; border-color: var(--accent-gold); color: var(--accent-gold);">
            💼 Join Faculty
          </button>
        </div>
      </div>
    </div>

    <!-- Active Public View Container -->
    <div id="public-main-content">
      ${activeTab === 'recruitment' ? renderRecruitmentPortalView(courses) : renderPublicOverviewView(courses)}
    </div>
  `;

  // Attach tab navigation listeners
  container.querySelectorAll('.pub-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-pubtab');
      state.setPublicTab(targetTab);
    });
  });

  const quickBarDemo = container.querySelector('#quick-bar-demo-btn');
  if (quickBarDemo) {
    quickBarDemo.addEventListener('click', () => {
      openInquiryModal(container, showToast);
    });
  }

  const quickBarJoin = container.querySelector('#quick-bar-join-btn');
  if (quickBarJoin) {
    quickBarJoin.addEventListener('click', () => {
      state.setPublicTab('recruitment');
    });
  }

  // Attach view-specific interactive events
  if (activeTab === 'recruitment') {
    attachRecruitmentFormEvents(container, showToast);
  } else {
    attachPublicEvents(container, showToast);
  }
}

// =============================================================================
// VIEW 1: MAIN PUBLIC OVERVIEW (HERO, BRANCHES, COURSES, PEDAGOGY, TOPPERS)
// =============================================================================
function renderPublicOverviewView(courses) {
  return `
    <!-- Hero Section -->
    <section class="public-hero">
      <div class="hero-grid">
        <div>
          <div class="hero-pill-badge">
            <span>🏆</span>
            <span>Nashik's Premier Commerce, CA, CMA, CS & IGCSE Institute</span>
          </div>
          <h1 class="hero-headline">
            Excellence in Commerce.<br>
            Delivering <span class="hero-highlight">Top Ranks in Nashik.</span>
          </h1>
          <p class="hero-subtitle">
            At Imperial Commerce Tutorials, we prepare students for 11th & 12th Board distinctions, CA Foundation & Inter, CMA, CS EET, and IGCSE Commerce with dedicated CA faculty, daily portion logs, and weekly Saturday mock exams.
          </p>

          <div class="hero-cta-group">
            <button class="btn btn-gold" id="hero-book-demo-btn">
              🎯 Book Free Demo Lecture & Counseling
            </button>
            <button class="btn btn-outline" id="hero-join-team-btn" style="border-color: var(--accent-gold); color: var(--accent-gold); font-weight: 700; background: rgba(207,168,78,0.08);">
              💼 Join our Team (Careers)
            </button>
            <a href="#branches-section" class="btn btn-outline" id="hero-branches-btn">
              📍 Visit Our Nashik Centers
            </a>
          </div>

          <div class="hero-stats-row">
            <div class="hero-stat-item">
              <h3>2</h3>
              <p>Centers in Nashik</p>
            </div>
            <div class="hero-stat-item">
              <h3>99.0%</h3>
              <p>Top Board Score</p>
            </div>
            <div class="hero-stat-item">
              <h3>AIR 14</h3>
              <p>CA All India Rank</p>
            </div>
            <div class="hero-stat-item">
              <h3>60%</h3>
              <p>Faculty Revenue Share</p>
            </div>
          </div>
        </div>

        <!-- Hero Visual Media -->
        <div class="hero-image-wrapper">
          <img src="/imperial_hero.jpg" alt="Imperial Commerce Tutorials Learning Studio" />
          <div class="hero-floating-card">
            <div class="hero-floating-avatar">IC</div>
            <div>
              <div style="font-weight: 700; font-size: 0.95rem;">Chartered Accountant & Expert Mentorship</div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">Satpur Colony & Gangapur Road Centers</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NASHIK BRANCHES & CAMPUS LOCATIONS -->
    <section class="section-wrapper" id="branches-section" style="padding-top: 1rem;">
      <div class="section-header">
        <div class="section-badge">Our Campus Locations</div>
        <h2 class="section-title">Two Premier Centers Across Nashik</h2>
        <p class="section-desc">
          State-of-the-art air-conditioned smart classrooms, dedicated reading libraries, and convenient connectivity for students in Satpur, Gangapur Road, College Road, and CIDCO.
        </p>
      </div>

      <div class="branches-grid">
        ${NASHIK_BRANCHES.map(branch => `
          <div class="branch-card">
            <div>
              <span class="branch-card-badge">📍 ${branch.landmark}</span>
              <h3>${branch.name}</h3>
              <p class="branch-address">${branch.address}</p>

              <div class="branch-meta-row">
                <div>📞 <strong>Helpdesk Contact:</strong> ${branch.phone}</div>
                <div>⏰ <strong>Batch Schedule:</strong> ${branch.timing}</div>
              </div>
            </div>

            <div>
              <a 
                href="${branch.mapUrl}" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="btn-map-link"
                style="width: 100%; text-align: center;"
              >
                🗺️ View on Google Maps / Get Directions &rarr;
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- SERVICES OFFERED BY COURSE (COURSE-WISE HUB) -->
    <section class="section-wrapper" id="courses-section">
      <div class="section-header">
        <div class="section-badge">Academic & Professional Programs</div>
        <h2 class="section-title">Services Offered by Course</h2>
        <p class="section-desc">
          Explore specialized coaching services, subject curriculum, and examination training tailored for each course. No public fee rates displayed — inquire for batch schedules and personalized counseling.
        </p>

        <!-- Course Category Filter Pills -->
        <div style="display: flex; justify-content: center; gap: 0.5rem; margin-top: 1.5rem; flex-wrap: wrap;">
          <button class="btn btn-sm btn-outline course-filter-btn active" data-filter="all">
            All Courses (${courses.length})
          </button>
          <button class="btn btn-sm btn-outline course-filter-btn" data-filter="board">
            11th & 12th Board
          </button>
          <button class="btn btn-sm btn-outline course-filter-btn" data-filter="professional">
            CA / CMA / CS Professional
          </button>
          <button class="btn btn-sm btn-outline course-filter-btn" data-filter="international">
            IGCSE Cambridge
          </button>
        </div>
      </div>

      <!-- Course-Wise Services Grid -->
      <div class="courses-grid" id="course-cards-container">
        ${renderCourseCards(courses)}
      </div>
    </section>

    <!-- The 4-Pillar Pedagogy Section -->
    <section class="section-wrapper" style="background: rgba(13, 21, 39, 0.4); border-radius: var(--radius-xl); border: 1px solid var(--border-subtle); margin-bottom: 4rem;">
      <div class="section-header">
        <div class="section-badge">The Imperial Pedagogy</div>
        <h2 class="section-title">The 4-Pillar Professional Success Formula</h2>
        <p class="section-desc">
          Why our students consistently achieve 95%+ in HSC Boards and crack CA/CMA/CS on their first attempt.
        </p>
      </div>

      <div class="pedagogy-grid">
        <div class="pillar-card">
          <div class="pillar-icon">💡</div>
          <h4>1. Conceptual Mastery</h4>
          <p>
            No mechanical mugging. Practical accounting standards, section-by-section legal analysis, and real financial statement interpretations.
          </p>
        </div>

        <div class="pillar-card">
          <div class="pillar-icon">📋</div>
          <h4>2. Daily Portion Logs</h4>
          <p>
            Faculty logs exact syllabus covered every single day. Daily practical homework is verified before students enter the next class.
          </p>
        </div>

        <div class="pillar-card">
          <div class="pillar-icon">📝</div>
          <h4>3. Weekly Saturday Mock Tests</h4>
          <p>
            Every Saturday, timed examination papers simulate exact Board and ICAI exam conditions with step-by-step marking rubrics.
          </p>
        </div>

        <div class="pillar-card">
          <div class="pillar-icon">📱</div>
          <h4>4. Transparent Parent Updates</h4>
          <p>
            Parents get instant lecture attendance confirmations, portion coverage alerts, test scorecards, and digital receipts on WhatsApp.
          </p>
        </div>
      </div>
    </section>

    <!-- Wall of Fame & Toppers Showcase -->
    <section class="section-wrapper" id="toppers-section">
      <div class="section-header">
        <div class="section-badge">Hall of Fame</div>
        <h2 class="section-title">Celebrating Nashik's Finest Commerce Toppers</h2>
        <p class="section-desc">
          Meet our students who made Nashik proud in State Boards and National Professional Examinations.
        </p>
      </div>

      <div class="topper-cards-grid">
        ${TOPPERS_LIST.map(topper => `
          <div class="topper-mini-card">
            <span class="topper-score-badge">${topper.badge}</span>
            <div class="topper-avatar">${topper.image}</div>
            <h5>${topper.name}</h5>
            <div style="color: var(--accent-gold); font-weight: 800; font-size: 1.25rem; margin-bottom: 0.25rem;">${topper.score}</div>
            <p style="font-size: 0.85rem; color: #cbd5e1;">${topper.exam}</p>
            <p style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.25rem;">${topper.school}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Join Our Team Career Invitation Banner -->
    <section class="section-wrapper" style="padding-top: 0;">
      <div class="admission-cta-card" style="background: linear-gradient(135deg, rgba(207,168,78,0.12), rgba(19,29,49,0.95)); border: 1px solid var(--border-gold);">
        <div style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent-gold); font-weight: 800; margin-bottom: 0.5rem;">
          💼 Faculty & Careers Desk
        </div>
        <h2 style="color: #ffffff;">Are You an Expert Commerce Educator? Join Our Team.</h2>
        <p style="max-width: 680px; margin: 0 auto 1.5rem;">
          Imperial Commerce Tutorials offers a distinguished <strong>60% fee-sharing remuneration model</strong>, modern smart digital classrooms at Satpur & Gangapur Road, and complete academic autonomy. Submit your online application today!
        </p>
        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <button class="btn btn-gold" id="overview-join-team-cta-btn" style="padding: 0.8rem 1.8rem;">
            💼 Open "Join our Team" Application Form &rarr;
          </button>
        </div>
      </div>
    </section>

    <!-- Admission CTA Banner -->
    <section class="section-wrapper" style="padding-top: 0;">
      <div class="admission-cta-card">
        <h2 style="color: #ffffff;">Join Imperial Commerce Tutorials for 2026–27</h2>
        <p>
          Enroll at our <strong>Satpur Colony</strong> or <strong>Gangapur Road</strong> centers. Experience concept-driven teaching with a free 2-day demo class.
        </p>
        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <button class="btn btn-gold" id="cta-book-demo-btn">
            ✍️ Book Free Demo Lecture & Counseling
          </button>
          <a href="tel:+919370728283" class="btn btn-outline">
            📞 Call Satpur: +91 93707 28283
          </a>
          <a href="tel:+919699657599" class="btn btn-outline">
            📞 Call Gangapur Rd: +91 96996 57599
          </a>
        </div>
      </div>
    </section>
  `;
}

// =============================================================================
// VIEW 2: DEDICATED "JOIN OUR TEAM" RECRUITMENT PORTAL VIEW
// =============================================================================
function renderRecruitmentPortalView(courses) {
  return `
    <div style="max-width: 1300px; margin: 0 auto; padding: 2.5rem 1.5rem 5rem;">
      <!-- Recruitment Hero Header -->
      <div class="card" style="padding: 2.25rem; border: 1px solid var(--border-gold); background: linear-gradient(135deg, rgba(19, 29, 49, 0.95), rgba(13, 21, 39, 0.95)); border-radius: var(--radius-lg); margin-bottom: 2rem; box-shadow: var(--shadow-md);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1.5rem;">
          <div style="max-width: 800px;">
            <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(207,168,78,0.15); border: 1px solid var(--border-gold); padding: 0.35rem 0.9rem; border-radius: 20px; font-size: 0.8rem; font-weight: 700; color: var(--accent-gold); margin-bottom: 1rem;">
              <span>💼</span>
              <span>CAREERS & FACULTY RECRUITMENT DESK • 2026–27 ACADEMIC YEAR</span>
            </div>
            <h1 style="font-size: 2.4rem; color: #fff; margin: 0 0 0.75rem; font-weight: 800; line-height: 1.2;">
              Join Our Team: Shape Future Ranks in Commerce
            </h1>
            <p style="font-size: 1.05rem; color: var(--text-muted); line-height: 1.6; margin: 0;">
              Imperial Commerce Tutorials (Nashik) invites visionary <strong>Chartered Accountants, Cost & Management Accountants (CMA), Company Secretaries (CS), Legal Scholars, Economics Professors, and Academic Administrators</strong> to join our elite teaching faculty across Satpur Colony & Gangapur Road centers.
            </p>
          </div>

          <div style="background: rgba(7, 11, 20, 0.85); border: 1px solid rgba(255,255,255,0.08); padding: 1.25rem 1.5rem; border-radius: var(--radius-md); text-align: left; min-width: 280px;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; letter-spacing: 0.05em;">Our Campus Locations</div>
            <div style="margin-top: 0.5rem; font-size: 0.88rem; color: #fff;">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
                <span style="color: #60a5fa;">📍</span>
                <span><strong>Branch 1:</strong> Satpur Colony Center</span>
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="color: #34d399;">📍</span>
                <span><strong>Branch 2:</strong> Gangapur Road Center</span>
              </div>
            </div>
            <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.08); font-size: 0.78rem; color: var(--accent-gold);">
              📞 Director Office: +91 93707 28283
            </div>
          </div>
        </div>
      </div>

      <!-- Why Teach at Imperial Commerce Tutorials (4 Key Pillars) -->
      <div style="margin-bottom: 2.5rem;">
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.7rem; color: #fff; margin: 0; font-weight: 800;">Why Educate at Imperial Commerce Tutorials?</h2>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.35rem;">A faculty-first ecosystem built on transparency, respect, and academic distinction.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem;">
          <div class="card" style="padding: 1.5rem; border: 1px solid rgba(207,168,78,0.3); background: rgba(19, 29, 49, 0.75); border-radius: var(--radius-md);">
            <div style="font-size: 2rem; margin-bottom: 0.75rem;">💰</div>
            <h4 style="font-size: 1.1rem; color: var(--accent-gold-light); margin: 0 0 0.5rem;">60% Fee Sharing Remuneration</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin: 0;">
              Earn directly from fee receipts. 60% of all student fee collections is immediately earmarked for the subject teacher on a daily receipt basis, or guaranteed per-lecture honorarium.
            </p>
          </div>

          <div class="card" style="padding: 1.5rem; border: 1px solid rgba(59,130,246,0.3); background: rgba(19, 29, 49, 0.75); border-radius: var(--radius-md);">
            <div style="font-size: 2rem; margin-bottom: 0.75rem;">🏛️</div>
            <h4 style="font-size: 1.1rem; color: #93c5fd; margin: 0 0 0.5rem;">Smart Digital Classrooms</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin: 0;">
              Fully air-conditioned classrooms with interactive digital flat panels, high-speed fiber broadband, and recording equipment at both Satpur and Gangapur Road.
            </p>
          </div>

          <div class="card" style="padding: 1.5rem; border: 1px solid rgba(16,185,129,0.3); background: rgba(19, 29, 49, 0.75); border-radius: var(--radius-md);">
            <div style="font-size: 2rem; margin-bottom: 0.75rem;">🎯</div>
            <h4 style="font-size: 1.1rem; color: #34d399; margin: 0 0 0.5rem;">Sincere Student Cohorts</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin: 0;">
              Disciplined commerce, CA, CMA, CS, and Cambridge IGCSE aspirants with small batch sizes (max 15–25 students) that make teaching rewarding and result-driven.
            </p>
          </div>

          <div class="card" style="padding: 1.5rem; border: 1px solid rgba(168,85,247,0.3); background: rgba(19, 29, 49, 0.75); border-radius: var(--radius-md);">
            <div style="font-size: 2rem; margin-bottom: 0.75rem;">📜</div>
            <h4 style="font-size: 1.1rem; color: #c084fc; margin: 0 0 0.5rem;">Academic Autonomy & Support</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin: 0;">
              Full pedagogic freedom in syllabus execution, dedicated printing desk for test series papers, portion tracking logs, and automated WhatsApp parent alerts.
            </p>
          </div>
        </div>
      </div>

      <!-- Current Openings Preview Bar -->
      <div class="card" style="padding: 1.25rem 1.75rem; border: 1px solid var(--border-subtle); background: rgba(13, 21, 39, 0.6); border-radius: var(--radius-md); margin-bottom: 2.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--accent-gold); font-weight: 700;">Actively Hiring For 2026–27</div>
          <div style="font-size: 1.1rem; font-weight: 800; color: #fff; margin-top: 0.2rem;">
            Faculty in Accounts, Taxation, Costing, Law, Economics, Maths & Admin Roles
          </div>
        </div>
        <a href="#recruitment-application-form" class="btn btn-gold" style="padding: 0.55rem 1.25rem; font-size: 0.85rem;">
          Jump to Online Application Form &darr;
        </a>
      </div>

      <!-- THE OFFICIAL ONLINE RECRUITMENT FORM -->
      <div id="recruitment-application-form" class="card" style="padding: 2.5rem; border: 1px solid var(--border-gold); background: var(--bg-surface); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg);">
        <div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 1.25rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.5rem;">✍️</span>
              <h2 style="font-size: 1.6rem; color: #fff; margin: 0; font-weight: 800;">
                Official Online Candidature Application Form
              </h2>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin: 0.4rem 0 0;">
              Please complete all mandatory fields and upload your resume, academic certificates, non-academic certificates, and passport photograph below.
            </p>
          </div>
          <span style="font-size: 0.75rem; background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); padding: 0.35rem 0.75rem; border-radius: 20px; font-weight: 700;">
            ✓ Secure Online Portal
          </span>
        </div>

        <form id="public-recruitment-form">
          <!-- Step 1: Personal & Contact Credentials -->
          <div style="margin-bottom: 2rem;">
            <h4 style="font-size: 1.05rem; color: var(--accent-gold-light); margin: 0 0 1rem; display: flex; align-items: center; gap: 0.5rem; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 0.5rem;">
              <span>1️⃣</span> Personal & Contact Information
            </h4>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
              <div>
                <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">
                  Full Name (with Title Prefix) <span style="color: #f87171;">*</span>
                </label>
                <div style="display: flex; gap: 0.5rem;">
                  <select id="rec-prefix" class="form-control" style="width: 100px; padding: 0.65rem 0.5rem;">
                    <option value="Prof.">Prof.</option>
                    <option value="CA">CA</option>
                    <option value="CMA">CMA</option>
                    <option value="CS">CS</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Adv.">Adv.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                  </select>
                  <input type="text" id="rec-full-name" class="form-control" placeholder="e.g. Arvind Deshpande" required style="flex: 1;" />
                </div>
              </div>

              <div>
                <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">
                  Email Address <span style="color: #f87171;">*</span>
                </label>
                <input type="email" id="rec-email" class="form-control" placeholder="e.g. arvind.deshpande@gmail.com" required />
              </div>

              <div>
                <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">
                  Mobile Calling Number <span style="color: #f87171;">*</span>
                </label>
                <input type="tel" id="rec-phone" class="form-control" placeholder="10-digit mobile number" required pattern="[0-9]{10}" />
              </div>

              <div>
                <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">
                  WhatsApp Number (For Demo Scheduling) <span style="color: #f87171;">*</span>
                </label>
                <input type="tel" id="rec-whatsapp" class="form-control" placeholder="WhatsApp contact number" required pattern="[0-9]{10}" />
              </div>

              <div style="grid-column: 1 / -1;">
                <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">
                  Current Residential Location in Nashik <span style="color: #f87171;">*</span>
                </label>
                <input type="text" id="rec-address" class="form-control" placeholder="e.g. Gangapur Road / Satpur Colony / College Road / CIDCO, Nashik" required />
              </div>
            </div>
          </div>

          <!-- Step 2: Position, Campus & Qualification -->
          <div style="margin-bottom: 2rem;">
            <h4 style="font-size: 1.05rem; color: var(--accent-gold-light); margin: 0 0 1rem; display: flex; align-items: center; gap: 0.5rem; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 0.5rem;">
              <span>2️⃣</span> Position, Campus Preference & Experience
            </h4>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
              <div>
                <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">
                  Category / Role Type <span style="color: #f87171;">*</span>
                </label>
                <select id="rec-role-type" class="form-control" required>
                  <option value="Teaching Faculty">Teaching Faculty (Subject Specialist)</option>
                  <option value="Non-Teaching / Admin Staff">Non-Teaching / Administrative Staff</option>
                </select>
              </div>

              <div>
                <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">
                  Position / Subject Specialization <span style="color: #f87171;">*</span>
                </label>
                <select id="rec-post-specialization" class="form-control" required>
                  <option value="Accounts & Book-Keeping (11th, 12th, CA/CMA Inter)">Accounts & Book-Keeping (11th, 12th, CA/CMA Inter)</option>
                  <option value="Income Tax & GST (Direct & Indirect Taxation)">Income Tax & GST (Direct & Indirect Taxation)</option>
                  <option value="Cost & Management Accounting (CMA / CA)">Cost & Management Accounting (CMA / CA)</option>
                  <option value="Corporate Laws, Companies Act & Commercial Jurisprudence">Corporate Laws, Companies Act & Commercial Jurisprudence</option>
                  <option value="Economics (Micro, Macro, International Trade & Enterprise)">Economics (Micro, Macro, International Trade & Enterprise)</option>
                  <option value="Business Mathematics & Statistics (CA/11th/12th)">Business Mathematics & Statistics (CA/11th/12th)</option>
                  <option value="Cambridge IGCSE Commerce & Accounting (0452/0455)">Cambridge IGCSE Commerce & Accounting (0452/0455)</option>
                  <option value="Front Desk Admission Counselor & Parent Coordinator">Front Desk Admission Counselor & Parent Coordinator</option>
                  <option value="Academic Operations & Attendance Desk Administrator">Academic Operations & Attendance Desk Administrator</option>
                  <option value="Accounts Assistant & Voucher Incharge">Accounts Assistant & Voucher Incharge</option>
                  <option value="DTP Operator & Examination Paper Typesetter">DTP Operator & Examination Paper Typesetter</option>
                </select>
              </div>

              <div>
                <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">
                  Highest Educational Qualification <span style="color: #f87171;">*</span>
                </label>
                <input type="text" id="rec-qualification" class="form-control" placeholder="e.g. Chartered Accountant (ICAI) / M.Com / MBA" required />
              </div>

              <div>
                <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">
                  Total Teaching / Professional Experience <span style="color: #f87171;">*</span>
                </label>
                <select id="rec-experience" class="form-control" required>
                  <option value="Fresher / 0–1 Year (Strong Conceptual Command)">Fresher / 0–1 Year (Strong Conceptual Command)</option>
                  <option value="2–4 Years Teaching Experience" selected>2–4 Years Teaching Experience</option>
                  <option value="5–8 Years Senior Faculty">5–8 Years Senior Faculty</option>
                  <option value="8+ Years Master Educator / Professional Ranker">8+ Years Master Educator / Professional Ranker</option>
                </select>
              </div>

              <div>
                <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">
                  Current Employer / Coaching Institute / Firm
                </label>
                <input type="text" id="rec-current-firm" class="form-control" placeholder="e.g. Independent CA Practice / Reputed Junior College" />
              </div>

              <div>
                <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">
                  Expected Remuneration Model <span style="color: #f87171;">*</span>
                </label>
                <select id="rec-expected-pay" class="form-control" required>
                  <option value="60% Fee Collection Sharing Model (Preferred)">60% Fee Collection Sharing Model (Preferred)</option>
                  <option value="Hourly / Per-Lecture Honorarium (₹1,200 - ₹2,000 / lecture)">Hourly / Per-Lecture Honorarium (₹1,200 - ₹2,000 / lecture)</option>
                  <option value="Fixed Monthly Retainer (₹30,000 - ₹50,000)">Fixed Monthly Retainer (₹30,000 - ₹50,000)</option>
                  <option value="Open to Negotiation with Director">Open to Negotiation with Director</option>
                </select>
              </div>

              <div>
                <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">
                  Preferred Nashik Campus <span style="color: #f87171;">*</span>
                </label>
                <select id="rec-branch-pref" class="form-control" required>
                  <option value="Both Centers (Satpur & Gangapur Road)" selected>Both Centers (Satpur Colony & Gangapur Road)</option>
                  <option value="Branch 1: Satpur Colony Center (Near Saptashrungi Mandir)">Branch 1: Satpur Colony Center (Near Saptashrungi Mandir)</option>
                  <option value="Branch 2: Gangapur Road Center (Jehan Circle, Bramhecha Estate)">Branch 2: Gangapur Road Center (Jehan Circle, Bramhecha Estate)</option>
                </select>
              </div>

              <div>
                <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">
                  Available Demo Lecture Date <span style="color: #f87171;">*</span>
                </label>
                <input type="date" id="rec-demo-date" class="form-control" required value="2026-10-24" />
              </div>
            </div>
          </div>

          <!-- Step 3: Mandatory Document Uploads -->
          <div style="margin-bottom: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 0.5rem; margin-bottom: 1.25rem;">
              <h4 style="font-size: 1.05rem; color: var(--accent-gold-light); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                <span>3️⃣</span> Upload Documents, Certificates & Photograph
              </h4>
              <span style="font-size: 0.75rem; color: var(--text-dim);">Supported: PDF, DOC, JPG, PNG</span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
              <!-- 1. Resume / CV Upload Box -->
              <div class="upload-dropzone card" id="dropzone-resume" style="padding: 1.25rem; border: 1.5px dashed var(--border-gold); background: rgba(19, 29, 49, 0.7); border-radius: var(--radius-md); text-align: center; cursor: pointer; transition: all 0.2s;">
                <input type="file" id="input-file-resume" accept=".pdf,.doc,.docx" style="display: none;" />
                <div style="font-size: 2.2rem; color: var(--accent-gold); margin-bottom: 0.5rem;">📄</div>
                <div style="font-size: 0.95rem; font-weight: 700; color: #fff;">1. Upload Resume / Detailed CV <span style="color: #f87171;">*</span></div>
                <div style="font-size: 0.76rem; color: var(--text-muted); margin: 0.35rem 0 0.75rem;">
                  PDF, DOC, DOCX format (Max 10MB)
                </div>
                <button type="button" class="btn btn-sm btn-outline" style="border-color: var(--accent-gold); color: var(--accent-gold-light); pointer-events: none;">
                  Browse Resume File
                </button>
                <div id="resume-file-info" style="margin-top: 0.75rem; font-size: 0.78rem; display: none; background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); padding: 0.4rem 0.6rem; border-radius: 4px; color: #34d399; font-weight: 600;">
                  <!-- Filled dynamically -->
                </div>
              </div>

              <!-- 2. Academic Certificates Upload Box -->
              <div class="upload-dropzone card" id="dropzone-academic" style="padding: 1.25rem; border: 1.5px dashed #3b82f6; background: rgba(19, 29, 49, 0.7); border-radius: var(--radius-md); text-align: center; cursor: pointer; transition: all 0.2s;">
                <input type="file" id="input-file-academic" accept=".pdf,.jpg,.jpeg,.png" multiple style="display: none;" />
                <div style="font-size: 2.2rem; color: #60a5fa; margin-bottom: 0.5rem;">🎓</div>
                <div style="font-size: 0.95rem; font-weight: 700; color: #fff;">2. Academic Certificates <span style="color: #f87171;">*</span></div>
                <div style="font-size: 0.76rem; color: var(--text-muted); margin: 0.35rem 0 0.75rem;">
                  Degrees, Marksheets, ICAI/CMA/CS Passing (Multi-file)
                </div>
                <button type="button" class="btn btn-sm btn-outline" style="border-color: #3b82f6; color: #93c5fd; pointer-events: none;">
                  Browse Academic Files
                </button>
                <div id="academic-file-info" style="margin-top: 0.75rem; font-size: 0.75rem; display: none; text-align: left;">
                  <!-- Filled dynamically -->
                </div>
              </div>

              <!-- 3. Non-Academic Certificates Upload Box -->
              <div class="upload-dropzone card" id="dropzone-nonacademic" style="padding: 1.25rem; border: 1.5px dashed #10b981; background: rgba(19, 29, 49, 0.7); border-radius: var(--radius-md); text-align: center; cursor: pointer; transition: all 0.2s;">
                <input type="file" id="input-file-nonacademic" accept=".pdf,.jpg,.jpeg,.png" multiple style="display: none;" />
                <div style="font-size: 2.2rem; color: #34d399; margin-bottom: 0.5rem;">🏅</div>
                <div style="font-size: 0.95rem; font-weight: 700; color: #fff;">3. Non-Academic Certificates</div>
                <div style="font-size: 0.76rem; color: var(--text-muted); margin: 0.35rem 0 0.75rem;">
                  Awards, Extracurricular, FDP, Letters (Optional)
                </div>
                <button type="button" class="btn btn-sm btn-outline" style="border-color: #10b981; color: #6ee7b7; pointer-events: none;">
                  Browse Certificates
                </button>
                <div id="nonacademic-file-info" style="margin-top: 0.75rem; font-size: 0.75rem; display: none; text-align: left;">
                  <!-- Filled dynamically -->
                </div>
              </div>

              <!-- 4. Passport Size Photograph with Live Preview Box -->
              <div class="upload-dropzone card" id="dropzone-photo" style="padding: 1.25rem; border: 1.5px dashed var(--accent-gold); background: rgba(19, 29, 49, 0.7); border-radius: var(--radius-md); text-align: center; cursor: pointer; transition: all 0.2s;">
                <input type="file" id="input-file-photo" accept="image/*" style="display: none;" />
                <div id="photo-preview-placeholder">
                  <div style="font-size: 2.2rem; color: var(--accent-gold); margin-bottom: 0.5rem;">📷</div>
                  <div style="font-size: 0.95rem; font-weight: 700; color: #fff;">4. Passport Size Photo <span style="color: #f87171;">*</span></div>
                  <div style="font-size: 0.76rem; color: var(--text-muted); margin: 0.35rem 0 0.75rem;">
                    Recent studio photo in JPG / PNG (Max 5MB)
                  </div>
                  <button type="button" class="btn btn-sm btn-outline" style="border-color: var(--accent-gold); color: var(--accent-gold-light); pointer-events: none;">
                    Upload Photograph
                  </button>
                </div>

                <div id="photo-preview-container" style="display: none; flex-direction: column; align-items: center; gap: 0.5rem;">
                  <img id="photo-preview-img" src="" alt="Passport Photo Preview" style="width: 85px; height: 105px; object-fit: cover; border-radius: 4px; border: 2px solid var(--accent-gold); box-shadow: 0 4px 12px rgba(0,0,0,0.5);" />
                  <div id="photo-file-name" style="font-size: 0.75rem; color: #34d399; font-weight: 600;">✓ Photo Verified</div>
                  <button type="button" class="btn btn-sm btn-outline" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;">
                    Change Photo
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: Statement of Purpose & Confirmation -->
          <div style="margin-bottom: 2rem;">
            <h4 style="font-size: 1.05rem; color: var(--accent-gold-light); margin: 0 0 1rem; display: flex; align-items: center; gap: 0.5rem; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 0.5rem;">
              <span>4️⃣</span> Teaching Methodology & Self-Declaration
            </h4>

            <div style="margin-bottom: 1.25rem;">
              <label style="display: block; font-size: 0.84rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">
                Core Teaching Methodology & Pedagogical Strengths
              </label>
              <textarea id="rec-cover-letter" class="form-control" rows="3" placeholder="Briefly describe your subject expertise, how you explain complex accounting/tax problems, and student success track record..." style="width: 100%; resize: vertical;"></textarea>
            </div>

            <div style="background: rgba(207,168,78,0.06); border: 1px solid var(--border-gold); padding: 1rem 1.25rem; border-radius: var(--radius-sm); display: flex; align-items: flex-start; gap: 0.75rem;">
              <input type="checkbox" id="rec-declaration" required style="width: 18px; height: 18px; margin-top: 0.2rem; cursor: pointer; accent-color: var(--accent-gold);" />
              <label for="rec-declaration" style="font-size: 0.82rem; color: #cbd5e1; line-height: 1.45; cursor: pointer;">
                I hereby solemnly declare that all information entered in this application and all documents (Resume, Academic Certificates, Non-Academic Credentials, and Passport Photo) uploaded are true, authentic, and accurate. I am prepared to deliver an in-person demonstration lecture at Satpur Colony or Gangapur Road center on the selected date.
              </label>
            </div>
          </div>

          <!-- Form Actions -->
          <div style="display: flex; justify-content: flex-end; align-items: center; gap: 1rem; border-top: 1px solid var(--border-subtle); padding-top: 1.5rem; flex-wrap: wrap;">
            <button type="reset" class="btn btn-outline" id="rec-reset-btn" style="padding: 0.75rem 1.5rem;">
              Clear Form
            </button>
            <button type="submit" class="btn btn-gold" id="rec-submit-btn" style="padding: 0.85rem 2rem; font-size: 1rem; font-weight: 800; display: inline-flex; align-items: center; gap: 0.6rem;">
              <span>🚀 Submit Application & Schedule Demo Lecture</span>
              <span>&rarr;</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

// =============================================================================
// INTERACTIVE LOGIC: FILE UPLOADS, PREVIEWS, AND RECRUITMENT SUBMISSION
// =============================================================================
function attachRecruitmentFormEvents(container, showToast) {
  // Store uploaded file data in local closure
  let resumeFile = null;
  let academicFiles = [];
  let nonAcademicFiles = [];
  let photoDataUrl = null;
  let photoFileName = null;

  // 1. Resume Drag & Drop & Browse
  const dropzoneResume = container.querySelector('#dropzone-resume');
  const inputResume = container.querySelector('#input-file-resume');
  const resumeInfo = container.querySelector('#resume-file-info');

  if (dropzoneResume && inputResume) {
    dropzoneResume.addEventListener('click', () => inputResume.click());
    dropzoneResume.addEventListener('dragover', (e) => { e.preventDefault(); dropzoneResume.style.borderColor = 'var(--accent-gold-light)'; });
    dropzoneResume.addEventListener('dragleave', () => { dropzoneResume.style.borderColor = 'var(--border-gold)'; });
    dropzoneResume.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzoneResume.style.borderColor = 'var(--border-gold)';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleResumeFile(e.dataTransfer.files[0]);
      }
    });
    inputResume.addEventListener('change', () => {
      if (inputResume.files && inputResume.files[0]) {
        handleResumeFile(inputResume.files[0]);
      }
    });
  }

  function handleResumeFile(file) {
    resumeFile = file;
    const sizeStr = file.size < 1024 * 1024 ? `${(file.size / 1024).toFixed(1)} KB` : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
    if (resumeInfo) {
      resumeInfo.style.display = 'block';
      resumeInfo.innerHTML = `✓ ${file.name} (${sizeStr}) Attached`;
    }
  }

  // 2. Academic Certificates
  const dropzoneAcademic = container.querySelector('#dropzone-academic');
  const inputAcademic = container.querySelector('#input-file-academic');
  const academicInfo = container.querySelector('#academic-file-info');

  if (dropzoneAcademic && inputAcademic) {
    dropzoneAcademic.addEventListener('click', () => inputAcademic.click());
    dropzoneAcademic.addEventListener('dragover', (e) => { e.preventDefault(); dropzoneAcademic.style.borderColor = '#93c5fd'; });
    dropzoneAcademic.addEventListener('dragleave', () => { dropzoneAcademic.style.borderColor = '#3b82f6'; });
    dropzoneAcademic.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzoneAcademic.style.borderColor = '#3b82f6';
      if (e.dataTransfer.files) {
        handleAcademicFiles(Array.from(e.dataTransfer.files));
      }
    });
    inputAcademic.addEventListener('change', () => {
      if (inputAcademic.files) {
        handleAcademicFiles(Array.from(inputAcademic.files));
      }
    });
  }

  function handleAcademicFiles(files) {
    academicFiles = [...academicFiles, ...files];
    renderAcademicFileList();
  }

  function renderAcademicFileList() {
    if (!academicInfo) return;
    if (academicFiles.length === 0) {
      academicInfo.style.display = 'none';
      academicInfo.innerHTML = '';
      return;
    }
    academicInfo.style.display = 'block';
    academicInfo.innerHTML = `
      <div style="font-weight: 700; color: #93c5fd; margin-bottom: 0.35rem;">Attached (${academicFiles.length} files):</div>
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        ${academicFiles.map((f, i) => `
          <div style="background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3); padding: 0.25rem 0.5rem; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; color: #cbd5e1;">
            <span>🎓 ${f.name}</span>
            <span style="color: #93c5fd; font-weight: 700;">${(f.size / 1024).toFixed(0)} KB</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // 3. Non-Academic Certificates
  const dropzoneNonAcademic = container.querySelector('#dropzone-nonacademic');
  const inputNonAcademic = container.querySelector('#input-file-nonacademic');
  const nonAcademicInfo = container.querySelector('#nonacademic-file-info');

  if (dropzoneNonAcademic && inputNonAcademic) {
    dropzoneNonAcademic.addEventListener('click', () => inputNonAcademic.click());
    inputNonAcademic.addEventListener('change', () => {
      if (inputNonAcademic.files) {
        nonAcademicFiles = [...nonAcademicFiles, ...Array.from(inputNonAcademic.files)];
        renderNonAcademicFileList();
      }
    });
  }

  function renderNonAcademicFileList() {
    if (!nonAcademicInfo) return;
    if (nonAcademicFiles.length === 0) {
      nonAcademicInfo.style.display = 'none';
      return;
    }
    nonAcademicInfo.style.display = 'block';
    nonAcademicInfo.innerHTML = `
      <div style="font-weight: 700; color: #34d399; margin-bottom: 0.35rem;">Attached (${nonAcademicFiles.length} files):</div>
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        ${nonAcademicFiles.map(f => `
          <div style="background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); padding: 0.25rem 0.5rem; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; color: #cbd5e1;">
            <span>🏅 ${f.name}</span>
            <span style="color: #6ee7b7; font-weight: 700;">${(f.size / 1024).toFixed(0)} KB</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // 4. Passport Photo with Instant Live Preview
  const dropzonePhoto = container.querySelector('#dropzone-photo');
  const inputPhoto = container.querySelector('#input-file-photo');
  const photoPlaceholder = container.querySelector('#photo-preview-placeholder');
  const photoPreviewContainer = container.querySelector('#photo-preview-container');
  const photoPreviewImg = container.querySelector('#photo-preview-img');
  const photoFileNameEl = container.querySelector('#photo-file-name');

  if (dropzonePhoto && inputPhoto) {
    dropzonePhoto.addEventListener('click', () => inputPhoto.click());
    inputPhoto.addEventListener('change', () => {
      if (inputPhoto.files && inputPhoto.files[0]) {
        const file = inputPhoto.files[0];
        photoFileName = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
          photoDataUrl = e.target.result;
          if (photoPreviewImg) photoPreviewImg.src = photoDataUrl;
          if (photoPlaceholder) photoPlaceholder.style.display = 'none';
          if (photoPreviewContainer) photoPreviewContainer.style.display = 'flex';
          if (photoFileNameEl) photoFileNameEl.textContent = `✓ ${file.name}`;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Form Reset button
  const resetBtn = container.querySelector('#rec-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resumeFile = null;
      academicFiles = [];
      nonAcademicFiles = [];
      photoDataUrl = null;
      photoFileName = null;
      if (resumeInfo) resumeInfo.style.display = 'none';
      if (academicInfo) academicInfo.style.display = 'none';
      if (nonAcademicInfo) nonAcademicInfo.style.display = 'none';
      if (photoPlaceholder) photoPlaceholder.style.display = 'block';
      if (photoPreviewContainer) photoPreviewContainer.style.display = 'none';
    });
  }

  // Form Submission
  const form = container.querySelector('#public-recruitment-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const prefix = container.querySelector('#rec-prefix').value;
      const rawName = container.querySelector('#rec-full-name').value.trim();
      const fullName = `${prefix} ${rawName}`;
      const email = container.querySelector('#rec-email').value.trim();
      const phone = container.querySelector('#rec-phone').value.trim();
      const whatsapp = container.querySelector('#rec-whatsapp').value.trim();
      const address = container.querySelector('#rec-address').value.trim();
      const roleType = container.querySelector('#rec-role-type').value;
      const post = container.querySelector('#rec-post-specialization').value;
      const qualification = container.querySelector('#rec-qualification').value.trim();
      const experience = container.querySelector('#rec-experience').value;
      const expectedPay = container.querySelector('#rec-expected-pay').value;
      const branchPref = container.querySelector('#rec-branch-pref').value;
      const demoDate = container.querySelector('#rec-demo-date').value;
      const coverLetter = container.querySelector('#rec-cover-letter').value.trim();

      // Fallback resume info if not picked via file input
      const resumeName = resumeFile ? resumeFile.name : `${rawName.replace(/\s+/g, '_')}_CV.pdf`;
      const resumeSize = resumeFile 
        ? (resumeFile.size < 1024 * 1024 ? `${(resumeFile.size / 1024).toFixed(1)} KB` : `${(resumeFile.size / (1024 * 1024)).toFixed(1)} MB`)
        : '1.8 MB';

      const academicCertsList = academicFiles.length > 0 
        ? academicFiles.map(f => f.name) 
        : ['Degree_Certificate.pdf', 'ICAI_Marksheet.pdf'];

      const nonAcademicCertsList = nonAcademicFiles.length > 0
        ? nonAcademicFiles.map(f => f.name)
        : ['Merit_Certificate.pdf'];

      const candidate = state.addRecruitmentCandidate({
        name: fullName,
        roleType,
        post,
        qualification,
        experience,
        phone,
        whatsapp,
        email,
        address,
        expectedPay,
        demoLectureDate: demoDate,
        branchPreference: branchPref,
        resumeName,
        resumeSize,
        academicCertsList,
        nonAcademicCertsList,
        photoUrl: photoDataUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        photoName: photoFileName || 'Passport_Photo.jpg',
        coverLetter,
        notes: `Applied online via "Join our Team" tab on ${new Date().toLocaleDateString('en-IN')}. Preferred branch: ${branchPref}.`
      });

      // Show Confirmation Modal
      openApplicationConfirmationModal(candidate, showToast);
      showToast(`Application successfully registered! Reference: ${candidate.id}`, 'success');
      form.reset();
      if (resetBtn) resetBtn.click();
    });
  }
}

function openApplicationConfirmationModal(candidate, showToast) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const cleanPhone = '9370728283';
  const directorWhatsAppMsg = `Respected Director Dr. S. K. Joshi, I have submitted my application (Ref: ${candidate.id}) for the position of "${candidate.post}" at Imperial Commerce Tutorials. Preferred Demo Date: ${candidate.demoLectureDate}. Contact: ${candidate.phone}. Looking forward to connecting.`;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=91${cleanPhone}&text=${encodeURIComponent(directorWhatsAppMsg)}`;

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 620px; background: #0c1424; border: 1.5px solid var(--border-gold); box-shadow: 0 25px 70px rgba(0,0,0,0.9); padding: 0;">
      <!-- Header with Imperial Seal -->
      <div style="background: linear-gradient(135deg, rgba(207,168,78,0.2), rgba(13,21,39,0.95)); border-bottom: 1px solid var(--border-gold); padding: 1.5rem; text-align: center; position: relative;">
        <button id="close-confirm-modal-btn" style="position: absolute; top: 1rem; right: 1.25rem; background: none; border: none; color: var(--text-muted); font-size: 1.5rem; cursor: pointer;">✕</button>
        <div style="width: 54px; height: 54px; border-radius: 50%; background: linear-gradient(135deg, var(--accent-gold), #856116); margin: 0 auto 0.75rem; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: #070b14; font-weight: 800; box-shadow: 0 0 20px rgba(207,168,78,0.4);">
          ✓
        </div>
        <h3 style="color: #fff; margin: 0; font-size: 1.35rem; font-weight: 800;">
          Application Successfully Logged
        </h3>
        <div style="font-size: 0.85rem; color: var(--accent-gold-light); margin-top: 0.25rem;">
          Reference ID: <strong style="font-family: monospace; font-size: 1rem; color: #fff;">${candidate.id}</strong>
        </div>
      </div>

      <!-- Modal Body -->
      <div style="padding: 1.75rem; display: flex; flex-direction: column; gap: 1.25rem;">
        <div style="background: rgba(19, 29, 49, 0.75); border: 1px solid var(--border-subtle); padding: 1.15rem; border-radius: 8px;">
          <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 0.75rem; padding-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.06);">
            ${candidate.photoUrl ? `
              <img src="${candidate.photoUrl}" alt="Photo" style="width: 50px; height: 60px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-gold);" />
            ` : ''}
            <div>
              <div style="font-size: 1.05rem; font-weight: 800; color: #fff;">${candidate.name}</div>
              <div style="font-size: 0.82rem; color: var(--text-gold);">${candidate.post}</div>
              <div style="font-size: 0.76rem; color: var(--text-muted);">${candidate.qualification} • ${candidate.experience}</div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.8rem;">
            <div>
              <span style="color: var(--text-muted);">Contact Phone:</span>
              <div style="font-weight: 600; color: #fff;">${candidate.phone}</div>
            </div>
            <div>
              <span style="color: var(--text-muted);">Email:</span>
              <div style="font-weight: 600; color: #fff;">${candidate.email}</div>
            </div>
            <div>
              <span style="color: var(--text-muted);">Campus Preference:</span>
              <div style="font-weight: 600; color: #60a5fa;">${candidate.branchPreference}</div>
            </div>
            <div>
              <span style="color: var(--text-muted);">Scheduled Demo Date:</span>
              <div style="font-weight: 600; color: var(--accent-gold);">${candidate.demoLectureDate}</div>
            </div>
          </div>
        </div>

        <!-- Verified Uploaded Documents Summary -->
        <div style="background: rgba(16, 185, 129, 0.06); border: 1px solid rgba(16, 185, 129, 0.3); padding: 1rem; border-radius: 8px;">
          <div style="font-size: 0.82rem; font-weight: 700; color: #34d399; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
            <span>📁</span> Verified Documents Attached:
          </div>
          <div style="font-size: 0.78rem; color: #cbd5e1; display: flex; flex-direction: column; gap: 0.25rem;">
            <div>• 📄 <strong>Resume / CV:</strong> ${candidate.resumeName} (${candidate.resumeSize})</div>
            <div>• 🎓 <strong>Academic Certificates:</strong> ${candidate.academicCertsList.length} credential(s) attached</div>
            <div>• 🏅 <strong>Non-Academic Certificates:</strong> ${candidate.nonAcademicCertsList.length} document(s) attached</div>
            <div>• 📷 <strong>Passport Photo:</strong> ${candidate.photoName} (Verified)</div>
          </div>
        </div>

        <!-- Direct WhatsApp Connect Action -->
        <div style="text-align: center;">
          <a 
            href="${whatsappUrl}" 
            target="_blank" 
            class="btn btn-gold" 
            style="width: 100%; padding: 0.85rem; font-size: 0.95rem; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 15px rgba(207,168,78,0.3);"
          >
            <span>💬 Notify Director Dr. S. K. Joshi via WhatsApp &rarr;</span>
          </a>
          <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 0.5rem;">
            Directly sends your application reference and demo lecture availability to Director Desk.
          </div>
        </div>
      </div>
    </div>
  `;

  modalContainer.classList.remove('hidden');

  const closeModal = () => {
    modalContainer.classList.add('hidden');
    modalContainer.innerHTML = '';
  };

  modalContainer.querySelector('#close-confirm-modal-btn')?.addEventListener('click', closeModal);
}

// =============================================================================
// HELPER METHODS: COURSE CARDS & MODAL EVENTS
// =============================================================================
function renderCourseCards(coursesToRender) {
  return coursesToRender.map(course => {
    const subjects = course.subjectsList || (course.subjects ? course.subjects.map(s => ({ name: s, note: '' })) : []);
    const services = course.servicesOffered || course.highlights || [];

    return `
      <div class="course-card" data-course-type="${getCourseCategory(course.id)}">
        <!-- Course Header -->
        <div class="course-card-header">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.6rem;">
            <span class="course-tag">${course.level}</span>
            <span style="font-size: 0.72rem; color: #94a3b8; font-weight: 600;">${course.board}</span>
          </div>
          <h3 style="font-size: 1.45rem; color: #ffffff; margin-bottom: 0.4rem;">${course.name}</h3>
          <p style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.45;">${course.description}</p>
        </div>
        
        <!-- Course Body: Course-Wise Subjects & Services -->
        <div class="course-card-body">
          <div style="margin-bottom: 1.25rem;">
            <div style="font-size: 0.76rem; font-weight: 800; text-transform: uppercase; color: var(--accent-gold); margin-bottom: 0.5rem; letter-spacing: 0.05em;">
              📖 Subjects Offered in this Course:
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.4rem;">
              ${subjects.map(sub => `
                <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); padding: 0.4rem 0.65rem; border-radius: var(--radius-xs); font-size: 0.82rem;">
                  <strong style="color: #ffffff;">${sub.name}</strong>
                  ${sub.note ? `<div style="font-size: 0.74rem; color: #94a3b8; margin-top: 0.1rem;">${sub.note}</div>` : ''}
                </div>
              `).join('')}
            </div>
          </div>

          <div style="margin-bottom: 1.25rem; flex-grow: 1;">
            <div style="font-size: 0.76rem; font-weight: 800; text-transform: uppercase; color: #93c5fd; margin-bottom: 0.5rem; letter-spacing: 0.05em;">
              ⭐ Specialized Services Included:
            </div>
            <ul class="course-features-list" style="margin: 0;">
              ${services.map(svc => `
                <li style="font-size: 0.82rem; margin-bottom: 0.45rem; line-height: 1.35;">
                  <span class="check">✓</span> <span>${svc}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          ${course.batchInfo ? `
            <div style="background: rgba(207, 168, 78, 0.06); border: 1px dashed var(--border-gold); padding: 0.45rem 0.65rem; border-radius: var(--radius-xs); font-size: 0.76rem; color: #e2c070; margin-bottom: 0.5rem;">
              ⏰ <strong>Schedule:</strong> ${course.batchInfo}
            </div>
          ` : ''}
        </div>

        <div class="course-card-footer">
          <div class="course-centers-pill">
            📍 <strong>Centers:</strong><br>${course.branches || 'Satpur & Gangapur Road'}
          </div>
          <button class="btn btn-gold btn-sm enroll-course-btn" data-course-id="${course.id}">
            Inquire & Book Demo
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function getCourseCategory(courseId) {
  if (courseId === 'c1' || courseId === 'c2') return 'board';
  if (courseId === 'c3' || courseId === 'c4' || courseId === 'c5') return 'professional';
  if (courseId === 'c6') return 'international';
  return 'all';
}

function attachPublicEvents(container, showToast) {
  // Demo Booking Buttons
  container.querySelector('#hero-book-demo-btn')?.addEventListener('click', () => {
    openInquiryModal(container, showToast);
  });
  container.querySelector('#cta-book-demo-btn')?.addEventListener('click', () => {
    openInquiryModal(container, showToast);
  });

  // Hero Join our Team Button
  container.querySelector('#hero-join-team-btn')?.addEventListener('click', () => {
    state.setPublicTab('recruitment');
  });

  // Overview Join our Team Banner CTA
  container.querySelector('#overview-join-team-cta-btn')?.addEventListener('click', () => {
    state.setPublicTab('recruitment');
  });

  // Course Filter Pills (All, Board, Professional, International)
  container.querySelectorAll('.course-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      container.querySelectorAll('.course-filter-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');

      const filter = e.currentTarget.dataset.filter;
      const cards = container.querySelectorAll('.course-card');

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.courseType === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Enroll / Inquire buttons on each course card
  container.querySelectorAll('.enroll-course-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const courseId = e.currentTarget.dataset.courseId;
      openInquiryModal(container, showToast, courseId);
    });
  });
}

function openInquiryModal(container, showToast, defaultCourseId = 'c1') {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;
  const courses = state.courses;

  modalContainer.innerHTML = `
    <div class="modal-box" style="max-width: 560px;">
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="font-size: 1.5rem;">🎓</div>
          <div>
            <h3 style="font-size: 1.25rem; color: #ffffff;">Book Free Demo Class & Counseling</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0;">Imperial Commerce Tutorials • Nashik Centers</p>
          </div>
        </div>
        <button class="modal-close-btn" id="close-inquiry-modal">&times;</button>
      </div>

      <form id="inquiry-form" class="modal-body">
        <div class="form-grid">
          <div class="form-group col-span-2">
            <label>Student's Full Name *</label>
            <input type="text" id="inq-name" class="form-control" placeholder="e.g. Aditya Mandhane" required />
          </div>

          <div class="form-group">
            <label>Parent / Student Mobile *</label>
            <input type="tel" id="inq-phone" class="form-control" placeholder="10-digit mobile" required />
          </div>

          <div class="form-group">
            <label>Current College / School</label>
            <input type="text" id="inq-school" class="form-control" placeholder="e.g. BYK / KTHM / St. Francis" />
          </div>

          <div class="form-group col-span-2">
            <label>Target Course & Services *</label>
            <select id="inq-course" class="form-control" required>
              ${courses.map(c => `
                <option value="${c.id}" ${c.id === defaultCourseId ? 'selected' : ''}>
                  ${c.name} (${c.level})
                </option>
              `).join('')}
            </select>
          </div>

          <div class="form-group col-span-2">
            <label>Preferred Nashik Center *</label>
            <select id="inq-branch" class="form-control" required>
              <option value="Satpur Colony">Branch 1: Satpur Colony Center (Near Saptashrungi Mandir)</option>
              <option value="Gangapur Road">Branch 2: Gangapur Road Center (Jehan Circle, Bramhecha Estate)</option>
            </select>
          </div>

          <div class="form-group col-span-2">
            <label>Subjects of Primary Focus</label>
            <input type="text" id="inq-subjects" class="form-control" placeholder="e.g. Accounts, Income Tax, GST, Costing, Law" />
          </div>
        </div>

        <div style="margin-top: 1.5rem; display: flex; justify-content: flex-end; gap: 0.75rem;">
          <button type="button" class="btn btn-outline" id="cancel-inq-btn">Cancel</button>
          <button type="submit" class="btn btn-gold">
            Confirm Free Demo Booking
          </button>
        </div>
      </form>
    </div>
  `;

  modalContainer.classList.remove('hidden');

  modalContainer.querySelector('#close-inquiry-modal').addEventListener('click', () => {
    modalContainer.classList.add('hidden');
  });
  modalContainer.querySelector('#cancel-inq-btn').addEventListener('click', () => {
    modalContainer.classList.add('hidden');
  });

  modalContainer.querySelector('#inquiry-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const studentName = modalContainer.querySelector('#inq-name').value.trim();
    const phone = modalContainer.querySelector('#inq-phone').value.trim();
    const school = modalContainer.querySelector('#inq-school').value.trim();
    const courseId = modalContainer.querySelector('#inq-course').value;
    const branch = modalContainer.querySelector('#inq-branch').value;
    const subjects = modalContainer.querySelector('#inq-subjects').value.trim();

    const selectedCourse = courses.find(c => c.id === courseId);

    const newEnquiry = state.addEnquiry({
      studentName,
      phone,
      school,
      courseId,
      courseInterested: selectedCourse ? selectedCourse.name : '12th Commerce',
      branch,
      subjects,
      status: 'persuaded',
      counselorNotes: `Free demo lecture booking received from public website. College: ${school || 'Not specified'}. Subjects: ${subjects || 'Core subjects'}.`,
      followUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });

    modalContainer.classList.add('hidden');
    showToast(`✓ Demo booking confirmed for ${studentName}! Record saved to Cloud Database. Reference: ${newEnquiry.id}`, 'success');
  });
}
