/* Initial Mock Data for Imperial Commerce Tutorials, Nashik */

export const UNIVERSAL_PASSWORD = 'Password@123';

export const DIRECTORS_LIST = [
  {
    id: 'dir1',
    name: 'Ishwari Deshmukh',
    email: 'ishwari.deshmukh@gmail.com',
    altEmail: 'ishwari1.deshmukh@gmail.com',
    phone: '9850311082',
    avatar: 'ID',
    title: 'Managing Director & Academic Patron',
    badge: 'Managing Director'
  },
  {
    id: 'dir2',
    name: 'Shrikrishna Deshmukh',
    email: 'k.deshmukh78@gmail.com',
    phone: '9823979878',
    avatar: 'SD',
    title: 'Managing Director & Operations Head',
    badge: 'Managing Director'
  }
];

export const USER_CREDENTIALS = {
  'Director - Ishwari Deshmukh': {
    role: 'director',
    directorId: 'dir1',
    name: 'Ishwari Deshmukh',
    email: 'ishwari.deshmukh@gmail.com',
    phone: '9850311082',
    avatar: 'ID',
    title: 'Managing Director & Academic Patron',
    badge: 'Managing Director'
  },
  'Director - Shrikrishna Deshmukh': {
    role: 'director',
    directorId: 'dir2',
    name: 'Shrikrishna Deshmukh',
    email: 'k.deshmukh78@gmail.com',
    phone: '9823979878',
    avatar: 'SD',
    title: 'Managing Director & Operations Head',
    badge: 'Managing Director'
  },
  'Director': {
    role: 'director',
    directorId: 'dir1',
    name: 'Ishwari Deshmukh',
    email: 'ishwari.deshmukh@gmail.com',
    phone: '9850311082',
    avatar: 'ID',
    title: 'Managing Director & Academic Patron',
    badge: 'Managing Director'
  },
  'Admin Staff': {
    role: 'admin',
    name: 'Pranav Toradmal',
    email: 'toradmalpranav33@gmail.com',
    phone: '9850311082',
    avatar: 'PT',
    title: 'Administrator & Operations Desk',
    badge: 'Operations Desk'
  },
  'Teacher': {
    role: 'teacher',
    teacherId: 't1',
    name: 'CA Ravindra Deshmukh',
    email: 'caravindradeshmukh@gmail.com',
    phone: '9823283377',
    avatar: 'RD',
    title: 'Senior Faculty - Accounts & Economics',
    badge: 'Lead Faculty'
  },
  'Student': {
    role: 'student',
    name: 'Arush Thorat',
    studentId: 's1',
    avatar: 'AT',
    title: '12th ICGSE Student (Roll #IMP-2026-01)',
    badge: 'Gangapur Rd Center'
  },
  'Parents': {
    role: 'parent',
    name: 'Mr Thorat',
    wardId: 's1',
    avatar: 'MT',
    title: 'Parent of Arush Thorat (12th ICGSE)',
    badge: 'Verified Guardian'
  }
};

export const INITIAL_TEACHERS = [
  {
    id: 't1',
    name: 'CA Ravindra Deshmukh',
    avatar: 'RD',
    qualification: 'Chartered Accountant (FCA) & Senior Commerce Faculty',
    role: 'Senior Faculty Lead - Accounts, Economics & Enterprise',
    phone: '9823283377',
    email: 'caravindradeshmukh@gmail.com',
    branch: 'Gangapur Road',
    assignedBranches: ['Gangapur Road'],
    assignedCourses: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'],
    assignedSubjects: ['Account', 'Economics', 'Enterprise', 'Accounts', 'Income Tax', 'GST'],
    status: 'Active',
    honorariumSharePercent: 60,
    directorRemarks: 'Lead faculty for Accountancy, Economics and Cambridge IGCSE pedagogy at Gangapur Road.'
  },
  {
    id: 't2',
    name: 'Pranav Toradmal',
    avatar: 'PT',
    qualification: 'Corporate Law & Commercial Accounts Specialist',
    role: 'Senior Faculty - Accountancy & Corporate Law',
    phone: '9370728283',
    email: 'toradmalpranav33@gmail.com',
    branch: 'Satpur Colony',
    assignedBranches: ['Satpur Colony'],
    assignedCourses: ['c1', 'c2', 'c3', 'c4', 'c5'],
    assignedSubjects: ['Account', 'Law', 'Costing (Cost & Management Accounting)', 'Accounts'],
    status: 'Active',
    honorariumSharePercent: 60,
    directorRemarks: 'Specialist for Corporate & Mercantile Law, CS EET and Foundation Accounts at Satpur Colony.'
  },
  {
    id: 't3',
    name: 'Mrs Kavita Oak',
    avatar: 'KO',
    qualification: 'M.Sc. Mathematics & Quantitative Statistics Faculty',
    role: 'Senior Quantitative Aptitude & Mathematics Faculty',
    phone: '93599 88246',
    email: 'kavitaoak@gmail.com',
    branch: 'Satpur Colony & Gangapur Road',
    assignedBranches: ['Satpur Colony', 'Gangapur Road'],
    assignedCourses: ['c1', 'c2', 'c3'],
    assignedSubjects: ['Maths', 'Maths & Statistics'],
    status: 'Active',
    honorariumSharePercent: 60,
    directorRemarks: 'Head of Mathematics for Junior College & CA Foundation across Satpur and Gangapur Road.'
  },
  {
    id: 't4',
    name: 'Mr Digvijay Pawar',
    avatar: 'DP',
    qualification: 'M.A. Economics & Applied Business Economics Faculty',
    role: 'Economics Specialist Faculty',
    phone: '82755 86504',
    email: 'digvijaypawar410@gmail.com',
    branch: 'Satpur Colony',
    assignedBranches: ['Satpur Colony'],
    assignedCourses: ['c1', 'c2', 'c3'],
    assignedSubjects: ['Eco', 'Economics'],
    status: 'Active',
    honorariumSharePercent: 60,
    directorRemarks: 'Economics faculty specializing in State Board & Professional Foundation economics.'
  }
];

export const NASHIK_BRANCHES = [
  {
    id: 'b1',
    name: 'Branch 1: Satpur Colony Center',
    landmark: 'Near Saptashrungi Mandir',
    address: '310, MHB Colony, Near Saptashrungi Mandir, Satpur, Nashik 422007',
    mapUrl: 'https://www.google.com/maps/place/Imperial+Commerce+Tutorials/@19.989694,73.7206275,16z/data=!4m15!1m8!3m7!1s0x3bddec8b609158e3:0xca077fb4a3bcfcaa!2sMHB+Colony,+Satpur+Colony,+Nashik,+Maharashtra+422007!3b1!8m2!3d19.9902243!4d73.7264553!16s%2Fg%2F1jkx9tvcl!3m5!1s0x3bddec8b6ee989a1:0xe29790cc22155aac!8m2!3d19.9901912!4d73.7272827!16s%2Fg%2F11gg4czzyw?authuser=1&entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D',
    phone: '+91 93707 28283',
    timing: 'Morning 7:00 AM - 1:00 PM | Evening 4:00 PM - 8:30 PM'
  },
  {
    id: 'b2',
    name: 'Branch 2: Gangapur Road Center',
    landmark: 'Jehan Circle, Bramhecha Estate',
    address: '6, Laxmi Park B, Bramhecha Estate, Jehan Circle, Gangapur Road, Nashik-422013',
    mapUrl: 'https://www.google.com/maps/place/Ram+Nagar,+Ashtavinayak+Colony,+Veer+Sawarkar+Nagar,+Nashik,+Maharashtra+422013/@20.0131938,73.7522507,17z/data=!4m15!1m8!3m7!1s0x3bddeb8edcab68d9:0x7aa63958ac4d72ae!2sRam+Nagar,+Ashtavinayak+Colony,+Veer+Sawarkar+Nagar,+Nashik,+Maharashtra+422013!3b1!8m2!3d20.0127431!4d73.7547727!16s%2Fg%2F1ptxwzwm3!3m5!1s0x3bddeb8edcab68d9:0x7aa63958ac4d72ae!8m2!3d20.0127431!4d73.7547727!16s%2Fg%2F1ptxwzwm3?authuser=1&entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D',
    phone: '+91 96996 57599',
    timing: 'Morning 7:30 AM - 1:30 PM | Evening 4:30 PM - 9:00 PM'
  }
];

export const SUBJECTS_CATALOG = [
  {
    name: 'Account',
    category: 'Core Accounting',
    coverage: '11th, 12th, CA Foundation, CMA, CS EET, ICGSE',
    tag: 'Core Foundation',
    desc: 'Ledger perfection, Journal entries, Partnership accounts, Company Balance Sheets, and Advanced Accounting standards.',
    defaultFee: 10000
  },
  {
    name: 'Accounts',
    category: 'Core Accounting',
    coverage: 'All Courses (11th, 12th, CA, CMA, CS, IGCSE)',
    tag: 'Core Foundation',
    desc: 'Ledger balancing, Double entry systems, Final Accounts and Corporate financial statements.',
    defaultFee: 10000
  },
  {
    name: 'Account 1',
    category: 'Degree Accounting',
    coverage: 'FY Bcom (Pune University)',
    tag: 'Degree Accounting',
    desc: 'Financial Accounting Paper 1: Amortization, Consignment, Royalty Accounts & Hire Purchase.',
    defaultFee: 8000
  },
  {
    name: 'Account 2',
    category: 'Degree Accounting',
    coverage: 'FY Bcom (Pune University)',
    tag: 'Degree Accounting',
    desc: 'Financial Accounting Paper 2: Departmental Accounts, Branch Accounts & Final Accounts of Companies.',
    defaultFee: 8000
  },
  {
    name: 'Economics',
    category: 'Economics & Commerce',
    coverage: 'All Courses (11th, 12th, CA, CMA, CS, IGCSE)',
    tag: 'Macro & Micro',
    desc: 'Consumer equilibrium, National Income, Public Finance, Monetary Policy, and International Trade dynamics.',
    defaultFee: 10000
  },
  {
    name: 'Eco',
    category: 'Economics & Commerce',
    coverage: 'Satpur & Gangapur Batches (11th, 12th, CA Foundation)',
    tag: 'Applied Economics',
    desc: 'Micro & Macro economic analysis, demand forecasting and Indian economic environment.',
    defaultFee: 6500
  },
  {
    name: 'Maths & Statistics',
    category: 'Quantitative Aptitude',
    coverage: 'All Courses (11th, 12th, CA, CMA, CS)',
    tag: 'Quantitative Aptitude',
    desc: 'Business Mathematics, Logical Reasoning, Calculus, Financial Mathematics, and Statistical distributions.',
    defaultFee: 10000
  },
  {
    name: 'Maths',
    category: 'Quantitative Aptitude',
    coverage: '11th, 12th, CA Foundation (Satpur & Gangapur)',
    tag: 'Quantitative Aptitude',
    desc: 'Higher commercial mathematics, matrices, differential calculus, probability and quantitative problem-solving.',
    defaultFee: 8000
  },
  {
    name: 'Enterprise',
    category: 'International Curriculum',
    coverage: '10th & 12th ICGSE (Cambridge International)',
    tag: 'International Curriculum',
    desc: 'Business innovation, Entrepreneurial finance, Marketing strategies, and Practical enterprise business plan formulation.',
    defaultFee: 15000
  },
  {
    name: 'Law',
    category: 'Corporate & Mercantile Law',
    coverage: 'CA Foundation, CS EET, CMA Foundation',
    tag: 'Corporate & Mercantile Law',
    desc: 'Indian Contract Act 1872, Sale of Goods Act, Partnership Act & Companies Act essentials.',
    defaultFee: 10000
  },
  {
    name: 'Costing (Cost & Management Accounting)',
    category: 'Professional Intermediate',
    coverage: 'CA Inter, CMA Inter, CS Inter',
    tag: 'Professional Intermediate',
    desc: 'Material, Labor & Overheads, Activity Based Costing, Standard Costing, Marginal Costing, and Budgetary Control.',
    defaultFee: 15000
  },
  {
    name: 'Income Tax (Direct Taxation)',
    category: 'Professional Intermediate',
    coverage: 'CA Inter, CS Inter, CMA Inter',
    tag: 'Professional Intermediate',
    desc: 'Five Heads of Income, Deductions under Chapter VI-A, Clubbing, Set-off & Carry Forward, and Assessment procedures.',
    defaultFee: 15000
  },
  {
    name: 'GST (Goods & Services Tax - Indirect Taxation)',
    category: 'Professional Intermediate',
    coverage: 'CA Inter, CS Inter, CMA Inter',
    tag: 'Professional Intermediate',
    desc: 'CGST/SGST/IGST framework, Levy & Collection, Input Tax Credit (ITC), Valuation rules, and Digital Invoicing.',
    defaultFee: 15000
  }
];

export const INITIAL_FEE_STRUCTURES = [
  // Gangapur Road (Standard Rates per Image 1 & Users.xlsx)
  { id: 'fee_g1', branchId: 'b2', branch: 'Gangapur Road Center', branchName: 'Gangapur Road', courseId: 'c1', courseName: '11th Commerce', perSubjectFee: 10000, feeText: 'per subject Rs 10,000/-', specialRates: {}, notes: 'per subject Rs 10,000/-' },
  { id: 'fee_g2', branchId: 'b2', branch: 'Gangapur Road Center', branchName: 'Gangapur Road', courseId: 'c2', courseName: '12th Commerce', perSubjectFee: 10000, feeText: 'per subject Rs 10,000/-', specialRates: {}, notes: 'per subject Rs 10,000/-' },
  { id: 'fee_g3', branchId: 'b2', branch: 'Gangapur Road Center', branchName: 'Gangapur Road', courseId: 'c3', courseName: 'CA Foundation', perSubjectFee: 15000, feeText: 'per subject Rs 15,000/-', specialRates: {}, notes: 'per subject Rs 15,000/-' },
  { id: 'fee_g4', branchId: 'b2', branch: 'Gangapur Road Center', branchName: 'Gangapur Road', courseId: 'c4', courseName: 'CMA Foundation', perSubjectFee: 15000, feeText: 'per subject Rs 15,000/-', specialRates: {}, notes: 'per subject Rs 15,000/-' },
  { id: 'fee_g5', branchId: 'b2', branch: 'Gangapur Road Center', branchName: 'Gangapur Road', courseId: 'c5', courseName: 'CS EET', perSubjectFee: 15000, feeText: 'per subject Rs 15,000/-', specialRates: {}, notes: 'per subject Rs 15,000/-' },
  { id: 'fee_g6', branchId: 'b2', branch: 'Gangapur Road Center', branchName: 'Gangapur Road', courseId: 'c6', courseName: '10th ICGSE', perSubjectFee: 15000, feeText: 'per subject Rs 15,000/-', specialRates: {}, notes: 'per subject Rs 15,000/-' },
  { id: 'fee_g7', branchId: 'b2', branch: 'Gangapur Road Center', branchName: 'Gangapur Road', courseId: 'c7', courseName: '12th ICGSE', perSubjectFee: 15000, feeText: 'per subject Rs 15,000/-', specialRates: {}, notes: 'per subject Rs 15,000/-' },
  { id: 'fee_g8', branchId: 'b2', branch: 'Gangapur Road Center', branchName: 'Gangapur Road', courseId: 'c8', courseName: 'FY Bcom', perSubjectFee: 8000, feeText: 'per subject Rs 8,000/-', specialRates: {}, notes: 'per subject Rs 8,000/-' },

  // Satpur Colony (Regular Rates & Maths Special per Image 1 & Users.xlsx)
  { id: 'fee_s1', branchId: 'b1', branch: 'Satpur Colony Center', branchName: 'Satpur Colony', courseId: 'c1', courseName: '11th Commerce', perSubjectFee: 6500, feeText: 'Per subject 6500 ( Maths Rs 8000)', specialRates: { Maths: 8000, 'Maths & Statistics': 8000 }, notes: 'Per subject 6500 ( Maths Rs 8000)' },
  { id: 'fee_s2', branchId: 'b1', branch: 'Satpur Colony Center', branchName: 'Satpur Colony', courseId: 'c2', courseName: '12th Commerce', perSubjectFee: 7000, feeText: 'Per subject 7000 ( Maths Rs 9000)', specialRates: { Maths: 9000, 'Maths & Statistics': 9000 }, notes: 'Per subject 7000 ( Maths Rs 9000)' },
  { id: 'fee_s3', branchId: 'b1', branch: 'Satpur Colony Center', branchName: 'Satpur Colony', courseId: 'c3', courseName: 'CA Foundation', perSubjectFee: 10000, feeText: 'Per subject 10,000', specialRates: {}, notes: 'Per subject 10,000' },
  { id: 'fee_s4', branchId: 'b1', branch: 'Satpur Colony Center', branchName: 'Satpur Colony', courseId: 'c4', courseName: 'CMA Foundation', perSubjectFee: 10000, feeText: 'Per subject 10,000', specialRates: {}, notes: 'Per subject 10,000' },
  { id: 'fee_s5', branchId: 'b1', branch: 'Satpur Colony Center', branchName: 'Satpur Colony', courseId: 'c5', courseName: 'CS EET', perSubjectFee: 10000, feeText: 'Per subject 10,000', specialRates: {}, notes: 'Per subject 10,000' },
  { id: 'fee_s6', branchId: 'b1', branch: 'Satpur Colony Center', branchName: 'Satpur Colony', courseId: 'c6', courseName: '10th ICGSE', perSubjectFee: 10000, feeText: 'Per subject 10,000', specialRates: {}, notes: 'Per subject 10,000' },
  { id: 'fee_s7', branchId: 'b1', branch: 'Satpur Colony Center', branchName: 'Satpur Colony', courseId: 'c7', courseName: '12th ICGSE', perSubjectFee: 10000, feeText: 'Per subject 10,000', specialRates: {}, notes: 'Per subject 10,000' },
  { id: 'fee_s8', branchId: 'b1', branch: 'Satpur Colony Center', branchName: 'Satpur Colony', courseId: 'c8', courseName: 'FY Bcom', perSubjectFee: 6000, feeText: 'Per subject 6,000', specialRates: {}, notes: 'Per subject 6,000' }
];

export const INITIAL_COURSES = [
  {
    id: 'c1',
    code: 'FYJC-11',
    name: '11th Commerce',
    level: 'Junior College Foundation',
    board: 'Maharashtra State Board / CBSE',
    branches: 'Satpur Colony & Gangapur Road Centers',
    perSubjectFee: 10000,
    fullFee: 30000,
    subjectsList: [
      { name: 'Account', note: 'Double entry book-keeping, Journal & Ledger foundation' },
      { name: 'Economics', note: 'Basic micro & macro economic principles & graph analysis' },
      { name: 'Maths', note: 'Business maths, commercial arithmetic & statistics' }
    ],
    servicesOffered: [
      'Daily Portion Covered tracking visible to parents & students',
      'Mandatory daily homework checking with faculty remarks',
      'Weekly Saturday Mock Assessments simulating board format',
      'Daily attendance tracking with automated WhatsApp absent alerts',
      'Step-by-step accountancy ledger ruling and balancing drills',
      'Personal 1-on-1 doubt solving clinics with senior faculty'
    ],
    description: 'Build an unbreakable conceptual base in Double Entry Book Keeping, Economics logic, and Business mathematics right from day one.',
    batchInfo: 'Morning & Evening Batches | Small Class Size'
  },
  {
    id: 'c2',
    code: 'SYJC-12',
    name: '12th Commerce',
    level: 'HSC Board Excellence',
    board: 'Maharashtra State Board / CBSE',
    branches: 'Satpur Colony & Gangapur Road Centers',
    perSubjectFee: 10000,
    fullFee: 30000,
    subjectsList: [
      { name: 'Account', note: 'Partnership final accounts, Company shares & debentures' },
      { name: 'Economics', note: 'National Income, Public Finance & Board question answers' },
      { name: 'Maths', note: 'Calculus, Commercial mathematics & Probability' }
    ],
    servicesOffered: [
      'Comprehensive Board Exam Answer Presentation clinics',
      'Last 15 years board exam question papers solved & discussed',
      'Weekly Saturday full-syllabus mock test series with rankings',
      'Daily Portion Tracking and real-time parent progress updates',
      'Special formula booklets and handwritten summary notes',
      'Pre-board preliminary exam simulation with individual corrections'
    ],
    description: 'Comprehensive Board preparation with step-by-step presentation drills, 15-year past question papers, and pre-board simulations.',
    batchInfo: 'Target 95%+ Board Batch | Daily Morning & Evening'
  },
  {
    id: 'c3',
    code: 'CA-FOUND',
    name: 'CA Foundation',
    level: 'ICAI Professional Course',
    board: 'Institute of Chartered Accountants of India',
    branches: 'Satpur Colony & Gangapur Road Centers',
    perSubjectFee: 15000,
    fullFee: 45000,
    subjectsList: [
      { name: 'Account', note: 'Accounting principles & Advanced company accounts' },
      { name: 'Law', note: 'Business laws, Indian Contract Act & Companies Act 2013' },
      { name: 'Economics', note: 'Business economics & commercial knowledge' },
      { name: 'Maths', note: 'Business mathematics, logical reasoning & stats' }
    ],
    servicesOffered: [
      'Lectures delivered by practicing Qualified Chartered Accountants',
      'Line-by-line coverage of official ICAI study modules',
      'Past 10 attempts RTP (Revision Test Papers) & MTP series solved',
      'Weekly Saturday examination papers evaluated as per ICAI marking scheme',
      'Practical GST & Income Tax computation worksheets & case studies',
      'Dedicated mentorship for First Attempt qualification'
    ],
    description: 'Premier CA preparation guided by practicing Chartered Accountants. Rigorous problem-solving, ICAI study material coverage, and mock exam series.',
    batchInfo: 'Full-Day & Weekend Batches | Special CA FastTrack'
  },
  {
    id: 'c4',
    code: 'CMA-FOUND',
    name: 'CMA Foundation',
    level: 'ICMAI Professional Course',
    board: 'Institute of Cost Accountants of India',
    branches: 'Satpur Colony & Gangapur Road Centers',
    perSubjectFee: 15000,
    fullFee: 45000,
    subjectsList: [
      { name: 'Account', note: 'Financial accounting & corporate reporting' },
      { name: 'Law', note: 'Commercial laws, industrial jurisprudence & corporate law' },
      { name: 'Economics', note: 'Business economics & fundamentals of management' },
      { name: 'Maths', note: 'Quantitative aptitude & statistical techniques' }
    ],
    servicesOffered: [
      'Specialized focus on Industrial Costing numericals and variance analysis',
      'Direct and Indirect Tax computation practice sessions',
      'Weekly Saturday mock test papers with detailed examiner feedback',
      'Daily Portion completion logs & syllabus milestone tracking',
      'ICMAI past examination trends and question bank analysis',
      'One-on-one doubt resolution with Cost Accountants & CAs'
    ],
    description: 'Focused training in Cost and Management Accounting, industrial taxation laws, and financial statement analysis for ICMAI credentials.',
    batchInfo: 'Morning & Evening Sessions | Professional Focus'
  },
  {
    id: 'c5',
    code: 'CS-EET',
    name: 'CS EET',
    level: 'ICSI Professional Course',
    board: 'Institute of Company Secretaries of India',
    branches: 'Gangapur Road & Satpur Centers',
    perSubjectFee: 15000,
    fullFee: 40000,
    subjectsList: [
      { name: 'Law', note: 'Company law, jurisprudence, interpretation & general laws' },
      { name: 'Economics', note: 'Economic and business environment & commercial aptitude' },
      { name: 'Account', note: 'Basic accounting & financial analysis' }
    ],
    servicesOffered: [
      'Intensive case law analysis and Section-wise memory techniques',
      'Secretarial legal drafting and resolution writing practice',
      'Weekly Saturday mock assessments based on ICSI pattern',
      'Comprehensive MCQ speed drills for CS EET clearing',
      'Daily portion coverage logs visible to students and parents',
      'Corporate law updates and recent ROC / MCA circular discussions'
    ],
    description: 'In-depth legal drafting, Companies Act interpretations, corporate jurisprudence, and commercial laws preparation for Company Secretary aspirants.',
    batchInfo: 'Specialized Interactive Batches | Executive Guidance'
  },
  {
    id: 'c6',
    code: 'ICGSE-10',
    name: '10th ICGSE',
    level: 'International Curriculum',
    board: 'Cambridge International / IGCSE',
    branches: 'Gangapur Road Center',
    perSubjectFee: 15000,
    fullFee: 45000,
    subjectsList: [
      { name: 'Economics', note: 'Cambridge Economics global resource allocation & market mechanisms' },
      { name: 'Enterprise', note: 'Cambridge Enterprise venture project & business planning' },
      { name: 'Account', note: 'Accounting principles & financial documentation' }
    ],
    servicesOffered: [
      'Cambridge International past paper series (Paper 1 & Paper 2 drills)',
      'Enterprise coursework and project portfolio guidance',
      'Marking scheme alignment and command words answering skills',
      'Daily Portion Covered tracking and interactive concept demonstrations',
      'Small batch size (maximum 12 students) for personalized mentorship',
      'Global economics case study discussions and analytical feedback'
    ],
    description: 'Cambridge-aligned 10th IGCSE commerce curriculum with analytical case studies, global market evaluations, and enterprise business plan coaching.',
    batchInfo: 'Small International Batch (Max 12) | After-School Timings'
  },
  {
    id: 'c7',
    code: 'ICGSE-12',
    name: '12th ICGSE',
    level: 'International Curriculum (A-Levels)',
    board: 'Cambridge International / Edexcel',
    branches: 'Gangapur Road Center',
    perSubjectFee: 15000,
    fullFee: 45000,
    subjectsList: [
      { name: 'Account', note: 'Advanced financial statements, manufacturing & partnership accounts' },
      { name: 'Economics', note: 'International trade, exchange rates & macroeconomic stabilization' },
      { name: 'Enterprise', note: 'Enterprise strategic growth & venture evaluation' }
    ],
    servicesOffered: [
      'Cambridge A-Level Past Paper series & marking schemes',
      'Advanced ledger rulings and financial ratio diagnostics',
      'Weekly mock papers simulating Cambridge board conditions',
      'One-on-one doubt clinics with CA faculty',
      'WhatsApp performance and attendance alerts to parents'
    ],
    description: 'Premier Cambridge International 12th curriculum focused on international accounting, macroeconomics, and enterprise strategies.',
    batchInfo: 'Elite International Batch | Afternoon & Evening'
  },
  {
    id: 'c8',
    code: 'BCOM-FY',
    name: 'FY Bcom',
    level: 'Undergraduate Degree',
    board: 'Savitribai Phule Pune University (SPPU)',
    branches: 'Gangapur Road & Satpur Colony Centers',
    perSubjectFee: 8000,
    fullFee: 24000,
    subjectsList: [
      { name: 'Account 1', note: 'Financial Accounting Paper 1: Amortization, Consignment & Royalty' },
      { name: 'Account 2', note: 'Financial Accounting Paper 2: Departmental & Company Accounts' },
      { name: 'Economics', note: 'Business Economics & National Income analysis' },
      { name: 'Law', note: 'Mercantile Law & Indian Contract Act' }
    ],
    servicesOffered: [
      'Pune University semester syllabus coverage & model answer writing',
      'University question papers of last 10 years solved & practiced',
      'Daily portion updates & attendance logs',
      'Weekly unit tests with individual examiner feedback'
    ],
    description: 'Comprehensive degree preparation for Pune University FY B.Com students covering Financial Accounting Papers 1 & 2 and Business Economics.',
    batchInfo: 'College Shift Friendly Timings | Morning & Evening'
  }
];

export const INITIAL_STUDENTS = [
  {
    id: 's1',
    rollNo: 'IMP-2026-01',
    name: 'Arush Thorat',
    courseId: 'c7',
    courseName: '12th ICGSE',
    batch: 'Gangapur Road (Evening)',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center',
    phone: '9850311082',
    email: 'arushthorat@gmail.com',
    parentName: 'Mr Thorat',
    parentPhone: '9850311082',
    parentEmail: 'mrthorat@gmail.com',
    subjectsChosen: ['Account'],
    assignedTeacher: 'CA Ravindra Deshmukh',
    totalFees: 15000,
    paidFees: 15000,
    dueFees: 0,
    status: 'Paid',
    attendancePercent: 96,
    todayAttendance: 'Present',
    homeworkCompleted: true,
    avatar: 'AT',
    behaviourRemarks: {
      teacher: 'Sharp grasping in Cambridge Accountancy syllabus; consistent with daily homework.',
      parent: 'Very focused on board examination preparations and revision.'
    },
    performanceMarks: {
      weekly: [
        { testName: 'Weekly Unit Test #1', subject: 'Account', maxMarks: 50, marks: 48, date: '2026-10-10' }
      ],
      quarterly: [
        { testName: 'Quarterly Terminal Exam', subject: 'Account', maxMarks: 100, marks: 94, date: '2026-08-28' }
      ],
      sixMonthly: [
        { testName: 'Six-Monthly Pre-Board', subject: '12th ICGSE Full Syllabus', maxMarks: 100, marks: 95, date: '2026-09-30' }
      ]
    }
  },
  {
    id: 's2',
    rollNo: 'IMP-2026-02',
    name: 'Jatin Avhad',
    courseId: 'c6',
    courseName: '10th ICGSE',
    batch: 'Gangapur Road (Morning)',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center',
    phone: '9850311082',
    email: 'jatinavhad@gmail.com',
    parentName: 'Mr Avhad',
    parentPhone: '9850311082',
    parentEmail: 'mravhad@gmail.com',
    subjectsChosen: ['Economics', 'Enterprise'],
    assignedTeacher: 'CA Ravindra Deshmukh',
    totalFees: 30000,
    paidFees: 20000,
    dueFees: 10000,
    status: 'Partial',
    attendancePercent: 92,
    todayAttendance: 'Present',
    homeworkCompleted: true,
    avatar: 'JA',
    behaviourRemarks: {
      teacher: 'Excellent engagement in Enterprise business planning case studies.',
      parent: 'Regular in completing assignments; balance fees being cleared this week.'
    },
    performanceMarks: {
      weekly: [
        { testName: 'Weekly Test #2', subject: 'Economics', maxMarks: 50, marks: 45, date: '2026-10-14' }
      ],
      quarterly: [
        { testName: 'Quarterly Mock', subject: 'Economics & Enterprise', maxMarks: 100, marks: 89, date: '2026-08-25' }
      ],
      sixMonthly: [
        { testName: 'Six-Monthly Benchmark', subject: '10th ICGSE Commerce', maxMarks: 100, marks: 90, date: '2026-09-25' }
      ]
    }
  },
  {
    id: 's3',
    rollNo: 'IMP-2026-03',
    name: 'Rutuja Shekokar',
    courseId: 'c1',
    courseName: '11th Commerce & CA Foundation',
    batch: 'Gangapur Road (Dual Batch)',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center',
    phone: '9850311082',
    email: 'rutujashekokar@gmail.com',
    parentName: 'Mr Shekokar',
    parentPhone: '9850311082',
    parentEmail: 'mrshekokar@gmail.com',
    subjectsChosen: ['Account', 'Economics', 'Law', 'Maths'],
    assignedTeacher: 'CA Ravindra Deshmukh',
    totalFees: 50000,
    paidFees: 50000,
    dueFees: 0,
    status: 'Paid',
    attendancePercent: 98,
    todayAttendance: 'Present',
    homeworkCompleted: true,
    avatar: 'RS',
    behaviourRemarks: {
      teacher: 'Exceptional dedication balancing 11th Commerce along with CA Foundation modules.',
      parent: 'Extremely committed to CA path; studies systematically every day.'
    },
    performanceMarks: {
      weekly: [
        { testName: 'Weekly Test #4', subject: 'Account & Law', maxMarks: 50, marks: 49, date: '2026-10-12' }
      ],
      quarterly: [
        { testName: 'Quarterly Terminal', subject: 'Account, Eco & Law', maxMarks: 100, marks: 96, date: '2026-08-20' }
      ],
      sixMonthly: [
        { testName: 'Six-Monthly Pre-Board', subject: 'Commerce Full Syllabus', maxMarks: 100, marks: 97, date: '2026-09-22' }
      ]
    }
  },
  {
    id: 's4',
    rollNo: 'IMP-2026-04',
    name: 'Om Nimse',
    courseId: 'c1',
    courseName: '11th Commerce',
    batch: 'Gangapur Road (Morning)',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center',
    phone: '9850311082',
    email: 'omnimse@gmail.com',
    parentName: 'Mr Nimse',
    parentPhone: '9850311082',
    parentEmail: 'mrnimse@gmail.com',
    subjectsChosen: ['Account'],
    assignedTeacher: 'CA Ravindra Deshmukh',
    totalFees: 10000,
    paidFees: 10000,
    dueFees: 0,
    status: 'Paid',
    attendancePercent: 94,
    todayAttendance: 'Present',
    homeworkCompleted: true,
    avatar: 'ON',
    behaviourRemarks: {
      teacher: 'Disciplined approach to ledger balancing and trial balance drills.',
      parent: 'Happy with faculty attention and conceptual clarity in Accountancy.'
    },
    performanceMarks: {
      weekly: [
        { testName: 'Weekly Test #1', subject: 'Account', maxMarks: 50, marks: 46, date: '2026-10-09' }
      ],
      quarterly: [
        { testName: 'Quarterly Exam', subject: 'Account', maxMarks: 100, marks: 91, date: '2026-08-22' }
      ],
      sixMonthly: [
        { testName: 'Six-Monthly Test', subject: 'Accountancy 11th', maxMarks: 100, marks: 92, date: '2026-09-20' }
      ]
    }
  },
  {
    id: 's5',
    rollNo: 'IMP-2026-05',
    name: 'Swaraj Kakade',
    courseId: 'c8',
    courseName: 'FY Bcom',
    batch: 'Gangapur Road (Morning B.Com Batch)',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center',
    phone: '9850311082',
    email: 'swarajkakade@gmail.com',
    parentName: 'Mr Kakade',
    parentPhone: '9850311082',
    parentEmail: 'mrkakade@gmail.com',
    subjectsChosen: ['Account 1', 'Account 2'],
    assignedTeacher: 'CA Ravindra Deshmukh',
    totalFees: 16000,
    paidFees: 10000,
    dueFees: 6000,
    status: 'Partial',
    attendancePercent: 90,
    todayAttendance: 'Present',
    homeworkCompleted: true,
    avatar: 'SK',
    behaviourRemarks: {
      teacher: 'Very attentive during Consignment and Company final account problem sets.',
      parent: 'Shows great interest in University level accountancy problems.'
    },
    performanceMarks: {
      weekly: [
        { testName: 'Weekly Unit Test #3', subject: 'Account 1', maxMarks: 50, marks: 44, date: '2026-10-15' }
      ],
      quarterly: [
        { testName: 'Semester Mid-Term', subject: 'Financial Accounting 1 & 2', maxMarks: 100, marks: 87, date: '2026-08-26' }
      ],
      sixMonthly: [
        { testName: 'University Mock Preliminary', subject: 'FY Bcom Accounts', maxMarks: 100, marks: 89, date: '2026-09-28' }
      ]
    }
  },
  {
    id: 's6',
    rollNo: 'IMP-2026-06',
    name: 'Aarav Sharma',
    courseId: 'c2',
    courseName: '12th Commerce',
    batch: 'Gangapur Road (Evening)',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center',
    phone: '9820112233',
    email: 'aarav.sharma@gmail.com',
    parentName: 'Rajesh Sharma',
    parentPhone: '9820112233',
    parentEmail: 'rajesh.sharma@gmail.com',
    subjectsChosen: ['Account', 'Maths', 'Economics'],
    assignedTeacher: 'CA Ravindra Deshmukh',
    totalFees: 30000,
    paidFees: 30000,
    dueFees: 0,
    status: 'Paid',
    attendancePercent: 96,
    todayAttendance: 'Present',
    homeworkCompleted: true,
    avatar: 'AS',
    behaviourRemarks: {
      teacher: 'Exceptionally attentive during ledger balance drills; helpful to batchmates.',
      parent: 'Devotes 3 hours every evening for revision and maintains disciplined routine.'
    },
    performanceMarks: {
      weekly: [
        { testName: 'Weekly Unit Test #1', subject: 'Account', maxMarks: 50, marks: 49, date: '2026-10-10' }
      ],
      quarterly: [
        { testName: 'Quarterly Terminal Exam', subject: 'Account & Economics', maxMarks: 100, marks: 95, date: '2026-08-28' }
      ],
      sixMonthly: [
        { testName: 'Six-Monthly Pre-Board', subject: '12th Commerce Full Syllabus', maxMarks: 100, marks: 96, date: '2026-09-30' }
      ]
    }
  },
  {
    id: 's7',
    rollNo: 'IMP-2026-07',
    name: 'Ananya Deshmukh',
    courseId: 'c3',
    courseName: 'CA Foundation / Inter',
    batch: 'Satpur Colony (Morning CA Elite)',
    branchId: 'b1',
    branchName: 'Branch 1: Satpur Colony Center',
    phone: '9820445566',
    email: 'ananya.d@gmail.com',
    parentName: 'Sunil Deshmukh',
    parentPhone: '9820445566',
    parentEmail: 'sunil.deshmukh@gmail.com',
    subjectsChosen: ['Accounts', 'Income Tax', 'GST', 'Costing', 'Law'],
    assignedTeacher: 'Prof. Arvind Deshpande (CA)',
    totalFees: 65000,
    paidFees: 40000,
    dueFees: 25000,
    status: 'Partial',
    attendancePercent: 94,
    todayAttendance: 'Present',
    homeworkCompleted: true,
    avatar: 'AD',
    behaviourRemarks: {
      teacher: 'Analytical problem solving mindset; handles complex PGBP sections very well.',
      parent: 'Very sincere about CA preparation; self-motivated study pattern.'
    },
    performanceMarks: {
      weekly: [
        { testName: 'Weekly Test #6', subject: 'Taxation (Income Tax & GST)', maxMarks: 50, marks: 46, date: '2026-10-12' }
      ],
      quarterly: [
        { testName: 'Quarterly Mock', subject: 'CA Inter Group 1', maxMarks: 100, marks: 88, date: '2026-08-25' }
      ],
      sixMonthly: [
        { testName: 'Six-Monthly Benchmark', subject: 'Taxation & Costing', maxMarks: 100, marks: 91, date: '2026-09-25' }
      ]
    }
  },
  {
    id: 's8',
    rollNo: 'IMP-2026-08',
    name: 'Rohan Kulkarni',
    courseId: 'c1',
    courseName: '11th Commerce',
    batch: 'Satpur Colony (Evening)',
    branchId: 'b1',
    branchName: 'Branch 1: Satpur Colony Center',
    phone: '9820778899',
    email: 'rohan.k@gmail.com',
    parentName: 'Ramesh Kulkarni',
    parentPhone: '9820778899',
    parentEmail: 'ramesh.kulkarni@gmail.com',
    subjectsChosen: ['Account', 'Maths', 'Economics'],
    assignedTeacher: 'Mrs Kavita Oak',
    totalFees: 42000,
    paidFees: 20000,
    dueFees: 22000,
    status: 'Partial',
    attendancePercent: 88,
    todayAttendance: 'Absent',
    homeworkCompleted: false,
    avatar: 'RK',
    behaviourRemarks: {
      teacher: 'Good potential, but needs to be more consistent with daily homework submission.',
      parent: 'Informed regarding today’s absence due to mild fever; will catch up tomorrow.'
    },
    performanceMarks: {
      weekly: [
        { testName: 'Weekly Test #3', subject: 'Account', maxMarks: 50, marks: 39, date: '2026-10-08' }
      ],
      quarterly: [
        { testName: 'Quarterly Assessment', subject: '11th Core Commerce', maxMarks: 100, marks: 81, date: '2026-08-20' }
      ],
      sixMonthly: [
        { testName: 'Six-Monthly Evaluation', subject: 'Full First Term', maxMarks: 100, marks: 83, date: '2026-09-22' }
      ]
    }
  },
  {
    id: 's9',
    rollNo: 'IMP-2026-09',
    name: 'Priya Iyer',
    courseId: 'c4',
    courseName: 'CMA Foundation',
    batch: 'Gangapur Road (CMA FastTrack)',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center',
    phone: '9820334455',
    email: 'priya.iyer@gmail.com',
    parentName: 'Raman Iyer',
    parentPhone: '9820334455',
    parentEmail: 'raman.iyer@gmail.com',
    subjectsChosen: ['Costing', 'Income Tax', 'GST', 'Law', 'Account'],
    assignedTeacher: 'CA Ravindra Deshmukh',
    totalFees: 60000,
    paidFees: 60000,
    dueFees: 0,
    status: 'Paid',
    attendancePercent: 98,
    todayAttendance: 'Present',
    homeworkCompleted: true,
    avatar: 'PI',
    behaviourRemarks: {
      teacher: 'Exemplary dedication in Costing and Marginal variance calculations.',
      parent: 'Extremely pleased with faculty mentorship and regular feedback.'
    },
    performanceMarks: {
      weekly: [
        { testName: 'Weekly Test #5', subject: 'Costing & Tax', maxMarks: 50, marks: 48, date: '2026-10-15' }
      ],
      quarterly: [
        { testName: 'Quarterly Mock', subject: 'CMA Inter Stage 1', maxMarks: 100, marks: 92, date: '2026-08-30' }
      ],
      sixMonthly: [
        { testName: 'Six-Monthly Simulation', subject: 'Cost & Management Accounting', maxMarks: 100, marks: 94, date: '2026-09-28' }
      ]
    }
  },
  {
    id: 's10',
    rollNo: 'IMP-2026-10',
    name: 'Kabir Mehta',
    courseId: 'c5',
    courseName: 'CS EET',
    batch: 'Gangapur Road (Law & CS)',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center',
    phone: '9820667788',
    email: 'kabir.m@gmail.com',
    parentName: 'Sanjay Mehta',
    parentPhone: '9820667788',
    parentEmail: 'sanjay.mehta@gmail.com',
    subjectsChosen: ['Law', 'Economics', 'Account'],
    assignedTeacher: 'Pranav Toradmal',
    totalFees: 52000,
    paidFees: 30000,
    dueFees: 22000,
    status: 'Partial',
    attendancePercent: 91,
    todayAttendance: 'Present',
    homeworkCompleted: true,
    avatar: 'KM',
    behaviourRemarks: {
      teacher: 'Strong grasp of Companies Act sections and case laws drafting.',
      parent: 'Spends quality time practicing legal resolutions and notes.'
    },
    performanceMarks: {
      weekly: [
        { testName: 'Weekly Test #4', subject: 'Law', maxMarks: 50, marks: 44, date: '2026-10-11' }
      ],
      quarterly: [
        { testName: 'Quarterly Mock', subject: 'Jurisprudence & Law', maxMarks: 100, marks: 87, date: '2026-08-22' }
      ],
      sixMonthly: [
        { testName: 'Six-Monthly Pre-Executive', subject: 'CS Executive Group 1', maxMarks: 100, marks: 89, date: '2026-09-27' }
      ]
    }
  },
  {
    id: 's11',
    rollNo: 'IMP-2026-11',
    name: 'Tanvi Patil',
    courseId: 'c6',
    courseName: 'IGCSE (Commerce)',
    batch: 'Gangapur Road (Cambridge)',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center',
    phone: '9820990011',
    email: 'tanvi.patil@gmail.com',
    parentName: 'Prakash Patil',
    parentPhone: '9820990011',
    parentEmail: 'prakash.patil@gmail.com',
    subjectsChosen: ['Accounts', 'Economics', 'Enterprises'],
    assignedTeacher: 'Prof. Sunita Rao',
    totalFees: 70000,
    paidFees: 45000,
    dueFees: 25000,
    status: 'Partial',
    attendancePercent: 90,
    todayAttendance: 'Present',
    homeworkCompleted: true,
    avatar: 'TP',
    behaviourRemarks: {
      teacher: 'Creative thinker in Enterprise business model simulations.',
      parent: 'Very satisfied with international syllabus coaching standards.'
    },
    performanceMarks: {
      weekly: [
        { testName: 'Weekly Test #5', subject: 'Enterprises & Economics', maxMarks: 50, marks: 45, date: '2026-10-13' }
      ],
      quarterly: [
        { testName: 'Quarterly Cambridge Mock', subject: 'Accounting & Enterprise', maxMarks: 100, marks: 89, date: '2026-08-29' }
      ],
      sixMonthly: [
        { testName: 'Six-Monthly Cambridge Model', subject: 'Cambridge 0452 & 0454', maxMarks: 100, marks: 92, date: '2026-09-29' }
      ]
    }
  }
];

export const INITIAL_RECEIPTS = [
  {
    receiptNo: 'REC-2026-001',
    date: '2026-10-10',
    studentId: 's1',
    studentName: 'Arush Thorat',
    rollNo: 'IMP-2026-01',
    courseId: 'c7',
    courseName: '12th ICGSE',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center',
    subject: 'Account',
    teacherName: 'CA Ravindra Deshmukh',
    amount: 15000,
    teacherShare60: 9000,
    mode: 'Online (Bank UPI QR)',
    txnId: 'UPI-HDFC-9928172940',
    receivedBy: 'Director Ishwari Deshmukh',
    notes: 'Full Tuition Fee for 12th ICGSE Account'
  },
  {
    receiptNo: 'REC-2026-002',
    date: '2026-10-12',
    studentId: 's2',
    studentName: 'Jatin Avhad',
    rollNo: 'IMP-2026-02',
    courseId: 'c6',
    courseName: '10th ICGSE',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center',
    subject: 'Economics & Enterprise',
    teacherName: 'CA Ravindra Deshmukh',
    amount: 20000,
    teacherShare60: 12000,
    mode: 'Online (Bank UPI QR)',
    txnId: 'UPI-ICICI-88491029',
    receivedBy: 'Director Shrikrishna Deshmukh',
    notes: 'Part Fee Payment for 10th ICGSE (Economics & Enterprise)'
  },
  {
    receiptNo: 'REC-2026-003',
    date: '2026-10-14',
    studentId: 's3',
    studentName: 'Rutuja Shekokar',
    rollNo: 'IMP-2026-03',
    courseId: 'c1',
    courseName: '11th Commerce & CA Foundation',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center',
    subject: 'Account, Economics, Law & Maths',
    teacherName: 'CA Ravindra Deshmukh',
    amount: 50000,
    teacherShare60: 30000,
    mode: 'Online (Bank UPI QR)',
    txnId: 'UPI-SBI-77281923',
    receivedBy: 'Director Ishwari Deshmukh',
    notes: 'Full Annual Fee (11th Commerce + CA Foundation)'
  },
  {
    receiptNo: 'REC-2026-004',
    date: '2026-10-15',
    studentId: 's4',
    studentName: 'Om Nimse',
    rollNo: 'IMP-2026-04',
    courseId: 'c1',
    courseName: '11th Commerce',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center',
    subject: 'Account',
    teacherName: 'CA Ravindra Deshmukh',
    amount: 10000,
    teacherShare60: 6000,
    mode: 'Online (Bank UPI QR)',
    txnId: 'UPI-AXIS-771920491',
    receivedBy: 'Admin Staff Pranav Toradmal',
    notes: 'Full Subject Tuition Fee for 11th Account'
  },
  {
    receiptNo: 'REC-2026-005',
    date: '2026-10-16',
    studentId: 's5',
    studentName: 'Swaraj Kakade',
    rollNo: 'IMP-2026-05',
    courseId: 'c8',
    courseName: 'FY Bcom',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center',
    subject: 'Account 1 & Account 2',
    teacherName: 'CA Ravindra Deshmukh',
    amount: 10000,
    teacherShare60: 6000,
    mode: 'Cash',
    txnId: 'CASH-REC-005',
    receivedBy: 'Director Shrikrishna Deshmukh',
    notes: 'Term 1 Installment for FY Bcom Financial Accounting'
  },
  {
    receiptNo: 'REC-2026-006',
    date: '2026-10-17',
    studentId: 's6',
    studentName: 'Aarav Sharma',
    rollNo: 'IMP-2026-06',
    courseId: 'c2',
    courseName: '12th Commerce',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center',
    subject: 'Account, Maths & Economics',
    teacherName: 'CA Ravindra Deshmukh',
    amount: 30000,
    teacherShare60: 18000,
    mode: 'Online (Bank UPI QR)',
    txnId: 'UPI-BOI-4429011',
    receivedBy: 'Director Ishwari Deshmukh',
    notes: 'Full Year Tuition Fee (Gangapur Road Center)'
  }
];

export const INITIAL_EXPENSES = [
  {
    voucherNo: 'VOUCH-2026-040',
    date: '2026-10-04',
    payee: 'Satpur MHB Colony Premises Lease',
    category: 'Facility Rent',
    amount: 26000,
    mode: 'Bank NEFT',
    reference: 'NEFT-MHB-7721',
    authorizedBy: 'Director',
    description: 'Monthly classroom lease for Satpur Colony Center (Near Saptashrungi Mandir)',
    isCommon: true,
    courseId: 'common',
    branchId: 'b1',
    branchName: 'Branch 1: Satpur Colony Center'
  },
  {
    voucherNo: 'VOUCH-2026-041',
    date: '2026-10-05',
    payee: 'Gangapur Road Bramhecha Estate Premises Lease',
    category: 'Facility Rent',
    amount: 38000,
    mode: 'Cheque / Bank Transfer',
    reference: 'CHQ #781920',
    authorizedBy: 'Director',
    description: 'Monthly classroom lease for Jehan Circle Gangapur Road Center',
    isCommon: true,
    courseId: 'common',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center'
  },
  {
    voucherNo: 'VOUCH-2026-042',
    date: '2026-10-09',
    payee: 'Nashik Commercial Printers',
    category: 'Printing & Study Modules',
    amount: 14500,
    mode: 'Cash',
    reference: 'CASH-BILL-8821',
    authorizedBy: 'Director',
    description: 'Printing of Income Tax & GST Practice Modules and Saturday Test Papers for Satpur Batch',
    isCommon: false,
    courseId: 'c3', // Directly for CA Foundation/Inter
    branchId: 'b1',
    branchName: 'Branch 1: Satpur Colony Center'
  },
  {
    voucherNo: 'VOUCH-2026-043',
    date: '2026-10-11',
    payee: 'Prof. Arvind Deshpande (Faculty Honorarium Paid)',
    category: 'Faculty Honorarium Paid',
    amount: 45000,
    mode: 'Online NEFT',
    reference: 'NEFT-AXIS-99120',
    authorizedBy: 'Director',
    description: 'Honorarium disbursement against 60% fee collection share',
    isCommon: false,
    courseId: 'c2',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center'
  },
  {
    voucherNo: 'VOUCH-2026-044',
    date: '2026-10-16',
    payee: 'Satpur Center Utilities & WiFi',
    category: 'Utilities & Broadband',
    amount: 5200,
    mode: 'Online UPI',
    reference: 'UPI-BILL-3391',
    authorizedBy: 'Admin',
    description: 'Smart classroom fiber internet & electricity bill for Satpur Center',
    isCommon: true,
    courseId: 'common',
    branchId: 'b1',
    branchName: 'Branch 1: Satpur Colony Center'
  },
  {
    voucherNo: 'VOUCH-2026-045',
    date: '2026-10-17',
    payee: 'Cambridge Study Material Import',
    category: 'Curriculum License',
    amount: 12000,
    mode: 'Online Card',
    reference: 'INTL-VISA-5510',
    authorizedBy: 'Director',
    description: 'Official Cambridge Enterprise and Accounting past workbooks for Gangapur Road',
    isCommon: false,
    courseId: 'c6',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center'
  },
  {
    voucherNo: 'VOUCH-2026-046',
    date: '2026-10-17',
    payee: 'Gangapur Road Smart Classroom & Utilities',
    category: 'Utilities & Broadband',
    amount: 6800,
    mode: 'Online UPI',
    reference: 'UPI-BILL-4412',
    authorizedBy: 'Admin',
    description: 'Fiber broadband, projector lamp maintenance & power for Gangapur Road Center',
    isCommon: true,
    courseId: 'common',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center'
  },
  {
    voucherNo: 'VOUCH-2026-047',
    date: '2026-10-18',
    payee: 'Shared ERP Cloud & Statutory Compliance',
    category: 'ERP & Administration',
    amount: 7200,
    mode: 'Online Card',
    reference: 'ERP-SUB-9912',
    authorizedBy: 'Director',
    description: 'Head office tuition management cloud hosting & WhatsApp gateway subscription (Shared across both branches in student proportion)',
    isCommon: true,
    courseId: 'common',
    branchId: 'all',
    branchName: 'All Branches (Shared Overheads)'
  }
];

export const INITIAL_ENQUIRIES = [
  {
    id: 'enq-1',
    date: '2026-10-15',
    studentName: 'Snehal More',
    parentName: 'Sunil More',
    phone: '9822114477',
    courseInterested: '11th Commerce',
    courseId: 'c1',
    branch: 'Satpur Colony Center',
    status: 'persuaded',
    reason: null,
    counselorNotes: 'Attended free trial lecture with Prof. Deshpande. Convinced with ledger foundation drills. Enrolment token paid ₹2,000.',
    followUpDate: '2026-10-20'
  },
  {
    id: 'enq-2',
    date: '2026-10-16',
    studentName: 'Pranav Joshi',
    parentName: 'Girish Joshi',
    phone: '9822336699',
    courseInterested: 'CA Foundation / Inter',
    courseId: 'c3',
    branch: 'Gangapur Road Center',
    status: 'persuaded',
    reason: null,
    counselorNotes: 'Impressed by CA faculty mentorship and past AIR 14 track record. Confirmed joining CA FastTrack batch.',
    followUpDate: '2026-10-21'
  },
  {
    id: 'enq-3',
    date: '2026-10-14',
    studentName: 'Vedika Kulkarni',
    parentName: 'Anil Kulkarni',
    phone: '9822558811',
    courseInterested: '12th Commerce',
    courseId: 'c2',
    branch: 'Gangapur Road Center',
    status: 'persuaded',
    reason: null,
    counselorNotes: 'Targeting 95%+ in HSC board. Requested evening timing. Admission confirmed for Batch B.',
    followUpDate: '2026-10-19'
  },
  {
    id: 'enq-4',
    date: '2026-10-11',
    studentName: 'Rohit Deshmukh',
    parentName: 'Deepak Deshmukh',
    phone: '9822770022',
    courseInterested: '11th Commerce',
    courseId: 'c1',
    branch: 'Satpur Colony Center',
    status: 'discontinued',
    reason: 'Family relocated residence to Nashik Road - daily travel distance too far from Satpur branch',
    counselorNotes: 'Student liked demo, but parent unable to arrange daily transit from Nashik Road to Satpur.',
    followUpDate: 'Closed'
  },
  {
    id: 'enq-5',
    date: '2026-10-12',
    studentName: 'Megha Shah',
    parentName: 'Kishore Shah',
    phone: '9822991133',
    courseInterested: 'CA Foundation / Inter',
    courseId: 'c3',
    branch: 'Gangapur Road Center',
    status: 'discontinued',
    reason: 'College morning timing clash (7:30 AM to 11:30 AM) with CA regular morning lecture slots',
    counselorNotes: 'Invited for weekend fast-track, but opted for recorded online video classes.',
    followUpDate: 'Closed'
  },
  {
    id: 'enq-6',
    date: '2026-10-13',
    studentName: 'Tanmay Shinde',
    parentName: 'Santosh Shinde',
    phone: '9822002244',
    courseInterested: '11th Commerce',
    courseId: 'c1',
    branch: 'Satpur Colony Center',
    status: 'discontinued',
    reason: 'Switched stream from Commerce to Science (PCM) upon 10th re-evaluation score',
    counselorNotes: 'Cleared 10th re-evaluation with 92% in Maths and decided to pursue engineering stream.',
    followUpDate: 'Closed'
  },
  {
    id: 'enq-7',
    date: '2026-10-14',
    studentName: 'Arya Verma',
    parentName: 'Rajeev Verma',
    phone: '9822446688',
    courseInterested: 'CMA Foundation / Inter',
    courseId: 'c4',
    branch: 'Gangapur Road Center',
    status: 'discontinued',
    reason: 'Financial budget constraint; seeking government polytechnic subsidized fee structure',
    counselorNotes: 'Counselor offered partial installment flexibility, but family opted for subsidized govt course.',
    followUpDate: 'Closed'
  }
];

export const INITIAL_PORTIONS = [
  {
    id: 'p1',
    date: '2026-10-18',
    courseId: 'c2',
    courseName: '12th Commerce',
    subject: 'Accounts',
    teacher: 'Prof. Arvind Deshpande (CA)',
    topicCovered: 'Partnership Final Accounts - Treatment of Goodwill & Revaluation of Assets under Admission.',
    completionPercent: 84,
    nextLectureTopic: 'Hidden Goodwill calculation and adjustment of Capitals in new profit sharing ratio.',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
    mediaName: 'Blackboard_Goodwill_Revaluation_Working_Notes.jpg',
    mediaSize: '2.1 MB',
    status: 'Completed'
  },
  {
    id: 'p2',
    date: '2026-10-18',
    courseId: 'c3',
    courseName: 'CA Foundation / Inter',
    subject: 'Income Tax',
    teacher: 'Prof. Arvind Deshpande (CA)',
    topicCovered: 'Profits and Gains of Business or Profession (PGBP) - Admissible & Inadmissible deductions under Sec 30 to 43D.',
    completionPercent: 78,
    nextLectureTopic: 'Presumptive Taxation scheme under Section 44AD and 44ADA with numerical case studies.',
    mediaType: 'pdf',
    mediaUrl: 'https://imperialcommerce.edu.in/docs/pgbp_sec30_43d_comprehensive_handout.pdf',
    mediaName: 'PGBP_Sec30_to_43D_Master_Handout.pdf',
    mediaSize: '3.8 MB',
    status: 'Completed'
  },
  {
    id: 'p3',
    date: '2026-10-18',
    courseId: 'c3',
    courseName: 'CA Foundation / Inter',
    subject: 'GST',
    teacher: 'Prof. Arvind Deshpande (CA)',
    topicCovered: 'Input Tax Credit (ITC) - Conditions for claiming ITC under Section 16 & Blocked credits under Section 17(5).',
    completionPercent: 74,
    nextLectureTopic: 'Rule 42 & 43 reversal of common credit for taxable and exempt supplies.',
    mediaType: 'video',
    mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    mediaName: 'ITC_Section16_17_5_Lecture_Recording_Clip.mp4',
    mediaSize: '14.5 MB',
    status: 'Completed'
  },
  {
    id: 'p4',
    date: '2026-10-18',
    courseId: 'c4',
    courseName: 'CMA Foundation / Inter',
    subject: 'Costing',
    teacher: 'Prof. Rajesh Kulkarni (CMA)',
    topicCovered: 'Standard Costing - Material Price Variance (MPV) and Material Usage Variance (MUV) with practical industrial cases.',
    completionPercent: 70,
    nextLectureTopic: 'Labor Variances: Rate Variance and Efficiency Variance computation.',
    mediaType: 'pdf',
    mediaUrl: 'https://imperialcommerce.edu.in/docs/standard_costing_variances_formulas.pdf',
    mediaName: 'Standard_Costing_Variances_Formulas.pdf',
    mediaSize: '1.9 MB',
    status: 'Completed'
  },
  {
    id: 'p5',
    date: '2026-10-18',
    courseId: 'c6',
    courseName: 'IGCSE (Commerce)',
    subject: 'Enterprises (IGCSE)',
    teacher: 'Prof. Sunita Rao',
    topicCovered: 'Enterprise Business Planning - Cash flow forecasting, sources of business start-up finance & Risk mitigation.',
    completionPercent: 76,
    nextLectureTopic: 'Marketing mix (4Ps) tailored for youth enterprise proposals.',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
    mediaName: 'Enterprise_Cashflow_Forecast_Model_Diagram.png',
    mediaSize: '1.2 MB',
    status: 'Completed'
  }
];

export const INITIAL_TEACHING_PLANS = [
  {
    id: 'plan-1',
    day: 'Day 42 (Today)',
    date: '2026-10-18',
    courseId: 'c2',
    courseName: '12th Commerce',
    subject: 'Accounts',
    teacher: 'Prof. Arvind Deshpande (CA)',
    stipulatedByDirector: 'Partnership Final Accounts - Hidden Goodwill & Capital Adjustments (Pages 82-95 of Board Textbook)',
    actualTaughtByTeacher: 'Completed Hidden Goodwill derivations, working notes & 4 comprehensive ledger problems',
    variance: '100% On Track',
    status: 'Verified by Director'
  },
  {
    id: 'plan-2',
    day: 'Day 42 (Today)',
    date: '2026-10-18',
    courseId: 'c3',
    courseName: 'CA Foundation / Inter',
    subject: 'Income Tax',
    teacher: 'Prof. Arvind Deshpande (CA)',
    stipulatedByDirector: 'PGBP Sec 32 Depreciation + Additional Depreciation numericals',
    actualTaughtByTeacher: 'Covered Sec 32, Block of assets and 3 practical ICAI study module illustrations',
    variance: 'Ahead of Schedule (+1 illustration)',
    status: 'Verified by Director'
  },
  {
    id: 'plan-3',
    day: 'Day 43 (Tomorrow)',
    date: '2026-10-19',
    courseId: 'c4',
    courseName: 'CMA Foundation / Inter',
    subject: 'Costing',
    teacher: 'Prof. Rajesh Kulkarni (CMA)',
    stipulatedByDirector: 'Labor Cost Variances: Rate, Efficiency and Idle Time variances',
    actualTaughtByTeacher: 'Scheduled for tomorrow morning 8:00 AM session',
    variance: 'Pending Lecture Delivery',
    status: 'Planned'
  }
];

export const INITIAL_HOMEWORKS = [
  {
    id: 'hw1',
    courseId: 'c2',
    subject: 'Accounts',
    title: 'Partnership Accounts Problem Set 4: Admission of Partner',
    assignedDate: '2026-10-18',
    dueDate: '2026-10-19',
    assignedBy: 'Prof. Arvind Deshpande (CA)',
    description: 'Solve Practical Questions 6 to 12 from Board Question Bank. Prepare Revaluation A/c, Partners Capital A/c and Balance Sheet.',
    submissions: [
      {
        studentId: 's1',
        studentName: 'Aarav Sharma',
        submittedAt: '2026-10-18 19:30',
        photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        status: 'Checked',
        marksGiven: '10/10',
        remarks: 'Excellent ledger presentation! Working notes for goodwill valuation are clean.'
      }
    ]
  },
  {
    id: 'hw2',
    courseId: 'c3',
    subject: 'Income Tax',
    title: 'PGBP Case Studies: Depreciation & Section 32 Numericals',
    assignedDate: '2026-10-17',
    dueDate: '2026-10-19',
    assignedBy: 'Prof. Arvind Deshpande (CA)',
    description: 'Calculate written down value (WDV) and allowable depreciation for manufacturing plant and machinery additions.',
    submissions: [
      {
        studentId: 's2',
        studentName: 'Ananya Deshmukh',
        submittedAt: '2026-10-18 18:00',
        photoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        status: 'Checked',
        marksGiven: '9.5/10',
        remarks: 'Good grasp of additional depreciation under Section 32(1)(iia). Verified.'
      }
    ]
  }
];

export const INITIAL_EXAMS = [
  {
    id: 'exam-1',
    title: '12th Commerce Weekly Accounts Assessment #5',
    courseId: 'c2',
    courseName: '12th Commerce',
    subject: 'Accounts',
    examType: 'Weekly Test',
    date: '2026-10-17',
    maxMarks: 50,
    durationMinutes: 60,
    questionPaperPdf: 'https://imperialcommerce.edu.in/docs/12th_accounts_weekly_test5.pdf',
    googleFormLink: 'https://forms.gle/imperial12thAccountsSample',
    publishedBy: 'Prof. Arvind Deshpande (CA)',
    submissions: [
      {
        studentId: 's1',
        studentName: 'Aarav Sharma',
        marksAssessed: 49,
        answerSheetPdf: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        answerSheetName: '12th_accounts_unit5_aarav.pdf',
        answerSheetSize: '1.9 MB',
        submissionType: 'pdf',
        timeTakenSeconds: 3120,
        timeTakenFormatted: '52 mins 00 secs',
        submittedAt: '2026-10-17 11:52 AM',
        remarks: 'Flawless ledger balancing and journal narration.',
        status: 'Graded'
      }
    ]
  },
  {
    id: 'exam-2',
    title: 'CA Inter Taxation Saturday Comprehensive Mock',
    courseId: 'c3',
    courseName: 'CA Foundation / Inter',
    subject: 'Taxation (Direct & Indirect Tax)',
    examType: 'Quarterly Test',
    date: '2026-10-15',
    maxMarks: 100,
    durationMinutes: 120,
    questionPaperPdf: 'https://imperialcommerce.edu.in/docs/ca_inter_tax_mock6.pdf',
    googleFormLink: '',
    publishedBy: 'Prof. Arvind Deshpande (CA)',
    submissions: [
      {
        studentId: 's2',
        studentName: 'Ananya Deshmukh',
        marksAssessed: 89,
        answerSheetPdf: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        answerSheetName: 'ca_inter_tax_mock6_ananya_solved.pdf',
        answerSheetSize: '2.8 MB',
        submissionType: 'pdf',
        timeTakenSeconds: 5880,
        timeTakenFormatted: '1 hr 38 mins',
        submittedAt: '2026-10-15 04:38 PM',
        remarks: 'Sharp calculation in Section 17(5) blocked credit reversals.',
        status: 'Graded'
      }
    ]
  },
  {
    id: 'exam-3',
    title: 'CA Inter Corporate Tax & GST Simulation Test #4',
    courseId: 'c3',
    courseName: 'CA Foundation / Inter',
    subject: 'GST (Goods & Services Tax - Indirect Taxation)',
    examType: 'Weekly Test',
    date: '2026-10-19',
    maxMarks: 50,
    durationMinutes: 60,
    questionPaperPdf: 'https://imperialcommerce.edu.in/docs/ca_inter_gst_itc_test4.pdf',
    googleFormLink: 'https://forms.gle/imperialCAGSTQuizMock',
    publishedBy: 'Prof. Arvind Deshpande (CA)',
    submissions: []
  },
  {
    id: 'exam-4',
    title: '12th Commerce Economics & National Income Unit Test',
    courseId: 'c2',
    courseName: '12th Commerce',
    subject: 'Economics',
    examType: 'Weekly Test',
    date: '2026-10-19',
    maxMarks: 50,
    durationMinutes: 60,
    questionPaperPdf: 'https://imperialcommerce.edu.in/docs/12th_economics_unit_test.pdf',
    googleFormLink: 'https://forms.gle/imperial12thEcoQuiz',
    publishedBy: 'Prof. Sunita Rao',
    submissions: []
  }
];

export const INITIAL_LEAVES = [
  {
    id: 'leave-1',
    studentId: 's1',
    studentName: 'Aarav Sharma',
    courseName: '12th Commerce',
    appliedDate: '2026-10-18',
    leaveDate: '2026-10-24', // > 2 days advance
    reason: 'Family wedding ceremony in Pune (Cousin wedding). Will complete all homework beforehand.',
    status: 'Approved by Director',
    directorNotes: 'Approved. Collect recorded video notes on return.'
  },
  {
    id: 'leave-2',
    studentId: 's3',
    studentName: 'Rohan Kulkarni',
    courseName: '11th Commerce',
    appliedDate: '2026-10-17',
    leaveDate: '2026-10-23', // > 2 days advance
    reason: 'Annual religious family gathering in Trimbakeshwar.',
    status: 'Pending Review',
    directorNotes: 'Under review by Academic Head.'
  }
];

export const INITIAL_QUERIES = [
  {
    id: 'qry-1',
    studentId: 's1',
    studentName: 'Aarav Sharma',
    courseId: 'c2',
    courseName: '12th Commerce',
    recipient: 'Teacher',
    teacherName: 'Prof. Arvind Deshpande (CA)',
    subject: 'Accounts',
    queryText: 'Respected Sir, in Question 9 of Partnership Accounts (Admission), should goodwill written off be debited to all partners in old ratio or new profit sharing ratio?',
    attachmentType: 'pdf',
    attachment: 'partnership_q9_working.pdf',
    attachmentUrl: 'https://imperialcommerce.edu.in/docs/partnership_q9_working.pdf',
    replyText: 'Goodwill written off after admission is ALWAYS debited to all partners (including incoming partner) in the NEW profit sharing ratio. Refer to attached summary note.',
    replyAttachmentType: 'pdf',
    replyAttachment: 'goodwill_treatment_summary.pdf',
    replyAttachmentUrl: 'https://imperialcommerce.edu.in/docs/goodwill_treatment_summary.pdf',
    status: 'Answered',
    date: '2026-10-18',
    studentResponse: 'Satisfactory',
    studentFeedbackNote: 'Concept is 100% clear now, thank you sir! Practiced Question 9 again successfully with the new profit sharing ratio.',
    respondedAt: '2026-10-18'
  },
  {
    id: 'qry-2',
    studentId: 's2',
    studentName: 'Ananya Deshmukh',
    courseId: 'c3',
    courseName: 'CA Foundation / Inter',
    recipient: 'Teacher',
    teacherName: 'Prof. Arvind Deshpande (CA)',
    subject: 'GST',
    queryText: 'Sir, regarding Section 17(5)(a) blocked credits, if a passenger motor vehicle has seating capacity greater than 13 persons, is input tax credit allowable?',
    attachmentType: 'image',
    attachment: 'bare_act_sec17_5_query.jpg',
    attachmentUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    replyText: 'Yes Ananya! Blocked credit under Sec 17(5)(a) applies only to motor vehicles for transportation of persons having approved seating capacity of NOT more than 13 persons. If seating capacity > 13, ITC is eligible. Please watch this concise 2-minute video explanation on statutory exceptions.',
    replyAttachmentType: 'video',
    replyAttachment: 'gst_sec17_5_amendment_video_explanation.mp4',
    replyAttachmentUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    status: 'Answered',
    date: '2026-10-18',
    studentResponse: 'Satisfactory',
    studentFeedbackNote: 'The 2-min video lecture clip clarified the exact seating capacity condition and staff bus transport rules!',
    respondedAt: '2026-10-18'
  },
  {
    id: 'qry-3',
    studentId: 's3',
    studentName: 'Rohan Kulkarni',
    courseId: 'c1',
    courseName: '11th Commerce',
    recipient: 'Teacher',
    teacherName: 'Prof. Arvind Deshpande (CA)',
    subject: 'Accounts',
    queryText: 'Sir, I am still confused regarding why Outstanding Expenses are shown on the Liabilities side of the Balance sheet when in the Trial Balance they are on the credit side.',
    attachmentType: 'pdf',
    attachment: 'trial_balance_working.pdf',
    attachmentUrl: 'https://imperialcommerce.edu.in/docs/trial_balance_working.pdf',
    replyText: 'Outstanding expense represents an accrued liability that has fallen due for payment during the accounting year but has not been settled in cash. Hence, it is an obligation payable in future.',
    replyAttachmentType: 'pdf',
    replyAttachment: 'accrual_concept_outstanding_expenses.pdf',
    replyAttachmentUrl: 'https://imperialcommerce.edu.in/docs/accrual_concept_outstanding_expenses.pdf',
    status: 'Answered',
    date: '2026-10-18',
    studentResponse: 'Not Understood Yet',
    studentFeedbackNote: 'Still confused about dual adjustment when it appears outside the Trial Balance in adjustments vs single entry when inside trial balance.',
    respondedAt: '2026-10-18'
  },
  {
    id: 'qry-4',
    studentId: 's4',
    studentName: 'Priya Iyer',
    courseId: 'c4',
    courseName: 'CMA Foundation / Inter',
    recipient: 'Director',
    teacherName: 'Director Dr. S. K. Joshi',
    subject: 'Costing & Extra Session',
    queryText: 'Respected Director Sir, could we arrange a special 2-hour Sunday workshop on Machine Hour Rate comprehensive past ICMAI problems at Gangapur Road?',
    attachmentType: 'none',
    attachment: null,
    attachmentUrl: null,
    replyText: 'Approved. Sunday 9:00 AM special 2-hour doubt clinic scheduled at Gangapur Road Center with Prof. Rajesh Kulkarni. Video recording of previous year workshop attached.',
    replyAttachmentType: 'video',
    replyAttachment: 'machine_hour_rate_clinic_part1.mp4',
    replyAttachmentUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    status: 'Answered',
    date: '2026-10-17',
    studentResponse: 'Satisfactory',
    studentFeedbackNote: 'Thank you Director Sir! Watching the preliminary video before the Sunday workshop.',
    respondedAt: '2026-10-17'
  }
];

export const INITIAL_RECRUITMENT = [
  {
    id: 'rec-1',
    name: 'CA Manasi Kulkarni',
    roleType: 'Teaching Faculty',
    post: 'Senior Cost & Management Accounting Faculty',
    qualification: 'Chartered Accountant (ICAI) & B.Com (Gold Medalist)',
    experience: '6 Years in CA & CMA Inter coaching',
    phone: '+91 98221 44556',
    email: 'ca.manasi@gmail.com',
    expectedPay: '₹1,500 / Lecture or 60% Sharing Model',
    demoLectureDate: '2026-10-22',
    status: 'Demo Cleared - Offer Extended',
    branchPreference: 'Both Campuses (Satpur & Gangapur)',
    resumeName: 'CA_Manasi_Kulkarni_CV.pdf',
    resumeSize: '1.4 MB',
    academicCertsList: ['CA Final Passing Certificate (ICAI)', 'B.Com Gold Medal Certificate', 'ICAI Rank Certificate'],
    nonAcademicCertsList: ['National Commerce Faculty Conclave Award', 'Rotary Youth Leadership Award'],
    photoUrl: '',
    coverLetter: 'Dedicated to mentoring CA/CMA Inter students with real-world corporate case studies and rigorous test series.',
    notes: 'Exceptional clarity in Standard Costing; highly recommended by Director.'
  },
  {
    id: 'rec-2',
    name: 'Adv. Sandeep Wagh',
    roleType: 'Teaching Faculty',
    post: 'Corporate & Mercantile Law Specialist',
    qualification: 'LL.M (Corporate Law), CS Executive',
    experience: '8 Years teaching Companies Act & Business Laws',
    phone: '+91 98227 88990',
    email: 'adv.sandeep.w@gmail.com',
    expectedPay: '₹1,200 / Lecture',
    demoLectureDate: '2026-10-25',
    status: 'Interview Scheduled',
    branchPreference: 'Branch 2: Gangapur Road Center',
    resumeName: 'Adv_Sandeep_Wagh_LawFaculty_CV.pdf',
    resumeSize: '950 KB',
    academicCertsList: ['LL.M (Corporate Law) Degree Certificate', 'CS Executive Group Passing Certificate'],
    nonAcademicCertsList: ['Bar Council of Maharashtra & Goa ID', 'State Level Moot Court Judge Citation'],
    photoUrl: '',
    coverLetter: 'Passionate about simplifying legal jargon into memorable mnemonic frameworks for 12th State Board and CA Foundation law.',
    notes: 'Drafting and resolution expertise; scheduled for panel round.'
  },
  {
    id: 'rec-3',
    name: 'Sachin Jadhav',
    roleType: 'Non-Teaching / Admin',
    post: 'Front Desk Admission Counselor & Parent Coordinator',
    qualification: 'MBA (Marketing & HR)',
    experience: '4 Years in coaching institute operations in Nashik',
    phone: '+91 98220 11223',
    email: 'sachin.jadhav@gmail.com',
    expectedPay: '₹28,000 / Month',
    demoLectureDate: '2026-10-21',
    status: 'Interview Scheduled',
    branchPreference: 'Branch 1: Satpur Colony Center',
    resumeName: 'Sachin_Jadhav_Admin_Profile.pdf',
    resumeSize: '680 KB',
    academicCertsList: ['MBA Degree Certificate (Pune University)', 'B.Com Degree'],
    nonAcademicCertsList: ['Nashik Youth Sports Leadership Trophy', 'Customer Relationship Excellence Certificate'],
    photoUrl: '',
    coverLetter: 'Experienced in empathetic parent counseling, course conversions, and daily WhatsApp parent updates.',
    notes: 'Fluent in Marathi, English, Hindi; proficient with WhatsApp CRM and fee receipts.'
  },
  {
    id: 'rec-4',
    name: 'Neha Chaudhari',
    roleType: 'Non-Teaching / Admin',
    post: 'Junior Accounts Assistant & Voucher Incharge',
    qualification: 'M.Com, Tally Prime Certified',
    experience: '3 Years accounting firm experience',
    phone: '+91 98224 55667',
    email: 'neha.chaudhari@gmail.com',
    expectedPay: '₹22,000 / Month',
    demoLectureDate: 'Completed',
    status: 'Hired - Joining Nov 1',
    branchPreference: 'Branch 1: Satpur Colony Center',
    resumeName: 'Neha_Chaudhari_Tally_Accounts.pdf',
    resumeSize: '720 KB',
    academicCertsList: ['M.Com Degree Certificate', 'Tally Prime Professional Certificate'],
    nonAcademicCertsList: ['Inter-Collegiate Accounting Quiz Winner'],
    photoUrl: '',
    coverLetter: 'Expertise in dual-branch expense vouchers, day-book reconciliation, and Tally Prime reporting.',
    notes: 'Background verified; joining Satpur branch accounts desk on Nov 1.'
  }
];

export const TOPPERS_LIST = [
  {
    name: 'Siddhi Bora',
    score: '99.00%',
    exam: '12th Commerce Maharashtra State Board 2024',
    school: 'BYK College of Commerce, Nashik',
    badge: 'Nashik District Topper',
    image: 'SB'
  },
  {
    name: 'Aditya Mandhane',
    score: 'AIR 14 (342/400)',
    exam: 'CA Foundation (ICAI All India Rank)',
    school: 'Imperial CA FastTrack Batch',
    badge: 'All India Rank 14',
    image: 'AM'
  },
  {
    name: 'Tanvi Shinde',
    score: '98.40%',
    exam: '12th Commerce (Accounts 100/100)',
    school: 'KTHM College, Nashik',
    badge: '100/100 in Book-Keeping',
    image: 'TS'
  },
  {
    name: 'Omkar Gangurde',
    score: 'AIR 22',
    exam: 'CMA Inter (Direct & Indirect Tax Merit)',
    school: 'Imperial Professional Wing',
    badge: 'Costing & Tax Distinction',
    image: 'OG'
  }
];
