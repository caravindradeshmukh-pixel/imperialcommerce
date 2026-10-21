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
    authorizedBy: 'Director Ishwari Deshmukh',
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
    authorizedBy: 'Director Ishwari Deshmukh',
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
    authorizedBy: 'Director Ishwari Deshmukh',
    description: 'Printing of Accountancy Workbooks and Saturday Test Papers for Gangapur Road & Satpur batches',
    isCommon: false,
    courseId: 'c1',
    branchId: 'b2',
    branchName: 'Branch 2: Gangapur Road Center'
  },
  {
    voucherNo: 'VOUCH-2026-043',
    date: '2026-10-11',
    payee: 'CA Ravindra Deshmukh (Faculty Honorarium Paid)',
    category: 'Faculty Honorarium Paid',
    amount: 45000,
    mode: 'Online NEFT',
    reference: 'NEFT-AXIS-99120',
    authorizedBy: 'Director Ishwari Deshmukh',
    description: 'Honorarium disbursement against 60% fee collection share for Accounts & Economics batches',
    isCommon: false,
    courseId: 'c7',
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
    authorizedBy: 'Admin Staff Pranav Toradmal',
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
    authorizedBy: 'Director Ishwari Deshmukh',
    description: 'Official Cambridge Enterprise and Accounting past workbooks for Gangapur Road',
    isCommon: false,
    courseId: 'c7',
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
    authorizedBy: 'Admin Staff Pranav Toradmal',
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
    authorizedBy: 'Director Ishwari Deshmukh',
    description: 'Tuition management cloud hosting & WhatsApp gateway subscription (Shared across both branches)',
    isCommon: true,
    courseId: 'common',
    branchId: 'all',
    branchName: 'All Branches (Shared Overheads)'
  }
];

export const INITIAL_ENQUIRIES = [];

export const INITIAL_PORTIONS = [
  {
    id: 'p1',
    date: '2026-10-18',
    courseId: 'c7',
    courseName: '12th ICGSE',
    subject: 'Account',
    teacher: 'CA Ravindra Deshmukh',
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
    courseId: 'c1',
    courseName: '11th Commerce',
    subject: 'Account',
    teacher: 'CA Ravindra Deshmukh',
    topicCovered: 'Double Entry Book-keeping - Journal entries, Cash Book with discount & bank columns.',
    completionPercent: 80,
    nextLectureTopic: 'Bank Reconciliation Statement (BRS) practical problems.',
    mediaType: 'pdf',
    mediaUrl: 'https://imperialcommerce.edu.in/docs/brs_master_handout.pdf',
    mediaName: 'BRS_Classroom_Handout.pdf',
    mediaSize: '2.5 MB',
    status: 'Completed'
  },
  {
    id: 'p3',
    date: '2026-10-18',
    courseId: 'c6',
    courseName: '10th ICGSE',
    subject: 'Economics',
    teacher: 'CA Ravindra Deshmukh',
    topicCovered: 'Price Elasticity of Demand (PED) - Determinants, calculation and graphical analysis.',
    completionPercent: 78,
    nextLectureTopic: 'Price Elasticity of Supply (PES) and market equilibrium shifts.',
    mediaType: 'video',
    mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    mediaName: 'PED_Concept_Lecture_Clip.mp4',
    mediaSize: '12.5 MB',
    status: 'Completed'
  }
];

export const INITIAL_TEACHING_PLANS = [
  {
    id: 'plan-1',
    day: 'Day 42 (Today)',
    date: '2026-10-18',
    courseId: 'c7',
    courseName: '12th ICGSE',
    subject: 'Account',
    teacher: 'CA Ravindra Deshmukh',
    stipulatedByDirector: 'Partnership Final Accounts - Hidden Goodwill & Capital Adjustments',
    actualTaughtByTeacher: 'Completed Hidden Goodwill derivations, working notes & 4 comprehensive ledger problems',
    variance: '100% On Track',
    status: 'Verified by Director Ishwari Deshmukh'
  },
  {
    id: 'plan-2',
    day: 'Day 43 (Tomorrow)',
    date: '2026-10-19',
    courseId: 'c1',
    courseName: '11th Commerce',
    subject: 'Account',
    teacher: 'CA Ravindra Deshmukh',
    stipulatedByDirector: 'Bank Reconciliation Statement - Overdraft as per Cash Book',
    actualTaughtByTeacher: 'Scheduled for tomorrow morning 8:00 AM session',
    variance: 'Pending Lecture Delivery',
    status: 'Planned'
  }
];

export const INITIAL_HOMEWORKS = [
  {
    id: 'hw1',
    courseId: 'c7',
    subject: 'Account',
    title: 'Cambridge 12th ICGSE Accounting: Partnership & Goodwill Adjustment',
    assignedDate: '2026-10-18',
    dueDate: '2026-10-22',
    assignedBy: 'CA Ravindra Deshmukh',
    description: 'Solve Practical Questions 1 to 6 on Partnership Admission and Revaluation working notes.',
    submissions: [
      {
        studentId: 's1',
        studentName: 'Arush Thorat',
        submittedAt: '2026-10-19 19:30',
        photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        status: 'Checked',
        marksGiven: '10/10',
        remarks: 'Clean ledger presentation and accurate goodwill adjustments.'
      }
    ]
  }
];

export const INITIAL_EXAMS = [
  {
    id: 'exam-1',
    title: '12th ICGSE Weekly Accounts Assessment #1',
    courseId: 'c7',
    courseName: '12th ICGSE',
    subject: 'Account',
    examType: 'Weekly Test',
    date: '2026-10-17',
    maxMarks: 50,
    durationMinutes: 60,
    questionPaperPdf: 'https://imperialcommerce.edu.in/docs/12th_accounts_weekly_test1.pdf',
    googleFormLink: 'https://forms.gle/imperial12thAccountsSample',
    publishedBy: 'CA Ravindra Deshmukh',
    submissions: [
      {
        studentId: 's1',
        studentName: 'Arush Thorat',
        marksAssessed: 48,
        answerSheetPdf: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        answerSheetName: '12th_accounts_unit1_arush.pdf',
        answerSheetSize: '1.9 MB',
        submissionType: 'pdf',
        timeTakenSeconds: 3120,
        timeTakenFormatted: '52 mins 00 secs',
        submittedAt: '2026-10-17 11:52 AM',
        remarks: 'Excellent ledger balancing and narration.',
        status: 'Graded'
      }
    ]
  }
];

export const INITIAL_LEAVES = [];

export const INITIAL_QUERIES = [
  {
    id: 'qry-1',
    studentId: 's1',
    studentName: 'Arush Thorat',
    courseId: 'c7',
    courseName: '12th ICGSE',
    recipient: 'Teacher',
    teacherName: 'CA Ravindra Deshmukh',
    subject: 'Account',
    queryText: 'Respected Sir, in Question 4 of Partnership Accounts (Admission), should goodwill written off be debited to all partners in old ratio or new profit sharing ratio?',
    attachmentType: 'pdf',
    attachment: 'partnership_q4_working.pdf',
    attachmentUrl: 'https://imperialcommerce.edu.in/docs/partnership_q4_working.pdf',
    replyText: 'Goodwill written off after admission is ALWAYS debited to all partners in the NEW profit sharing ratio. Refer to attached summary note.',
    replyAttachmentType: 'pdf',
    replyAttachment: 'goodwill_treatment_summary.pdf',
    replyAttachmentUrl: 'https://imperialcommerce.edu.in/docs/goodwill_treatment_summary.pdf',
    status: 'Answered',
    date: '2026-10-18',
    studentResponse: 'Satisfactory',
    studentFeedbackNote: 'Concept is 100% clear now, thank you sir!',
    respondedAt: '2026-10-18'
  }
];

export const INITIAL_RECRUITMENT = [];

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

/* Official Master User Accounts Directory
   Authority Granted to Director Ishwari Deshmukh to reset/create user IDs and passwords for all users */
export const INITIAL_USER_ACCOUNTS = [
  // Directors
  {
    id: 'usr_dir_ishwari',
    name: 'Ishwari Deshmukh',
    role: 'director',
    directorId: 'dir1',
    category: 'Director',
    email: 'ishwari1.deshmukh@gmail.com',
    altEmail: 'ishwari.deshmukh@gmail.com',
    phone: '9850311082',
    userId: 'ishwari.deshmukh',
    password: 'Password@123',
    title: 'Managing Director & Academic Patron',
    badge: 'Managing Director',
    branch: 'Both Centers (Gangapur & Satpur)',
    status: 'Active',
    authorizedBy: 'Director Ishwari Deshmukh',
    updatedAt: '2026-10-21T18:10:00'
  },
  {
    id: 'usr_dir_shrikrishna',
    name: 'Shrikrishna Deshmukh',
    role: 'director',
    directorId: 'dir2',
    category: 'Director',
    email: 'k.deshmukh78@gmail.com',
    phone: '9823979878',
    userId: 'shrikrishna.deshmukh',
    password: 'Password@123',
    title: 'Managing Director & Operations Head',
    badge: 'Managing Director',
    branch: 'Both Centers (Gangapur & Satpur)',
    status: 'Active',
    authorizedBy: 'Director Ishwari Deshmukh',
    updatedAt: '2026-10-21T18:10:00'
  },
  // Administration
  {
    id: 'usr_admin_pranav',
    name: 'Pranav Toradmal',
    role: 'admin',
    category: 'Admin Staff',
    email: 'toradmalpranav33@gmail.com',
    phone: '9850311082',
    userId: 'admin.pranav',
    password: 'Password@123',
    title: 'Administrator & Operations Desk',
    badge: 'Operations Desk',
    branch: 'Satpur Colony Center',
    status: 'Active',
    authorizedBy: 'Director Ishwari Deshmukh',
    updatedAt: '2026-10-21T18:10:00'
  },
  // Faculty
  {
    id: 'usr_faculty_ravindra',
    name: 'CA Ravindra Deshmukh',
    role: 'teacher',
    teacherId: 't1',
    category: 'Teacher',
    email: 'caravindradeshmukh@gmail.com',
    phone: '9823283377',
    userId: 'ca.ravindra',
    password: 'Password@123',
    title: 'Senior Faculty Lead - Accounts, Economics & Enterprise',
    badge: 'Lead Faculty',
    branch: 'Gangapur Road Center',
    status: 'Active',
    authorizedBy: 'Director Ishwari Deshmukh',
    updatedAt: '2026-10-21T18:10:00'
  },
  {
    id: 'usr_faculty_pranav',
    name: 'Pranav Toradmal',
    role: 'teacher',
    teacherId: 't2',
    category: 'Teacher',
    email: 'toradmalpranav33@gmail.com',
    phone: '9370728283',
    userId: 'faculty.pranav',
    password: 'Password@123',
    title: 'Senior Faculty - Accountancy & Corporate Law',
    badge: 'Law & Accounts',
    branch: 'Satpur Colony Center',
    status: 'Active',
    authorizedBy: 'Director Ishwari Deshmukh',
    updatedAt: '2026-10-21T18:10:00'
  },
  {
    id: 'usr_faculty_kavita',
    name: 'Mrs Kavita Oak',
    role: 'teacher',
    teacherId: 't3',
    category: 'Teacher',
    email: 'kavitaoak@gmail.com',
    phone: '9359988246',
    userId: 'kavita.oak',
    password: 'Password@123',
    title: 'Senior Quantitative Aptitude & Mathematics Faculty',
    badge: 'Maths Faculty',
    branch: 'Satpur & Gangapur Batches',
    status: 'Active',
    authorizedBy: 'Director Ishwari Deshmukh',
    updatedAt: '2026-10-21T18:10:00'
  },
  {
    id: 'usr_faculty_digvijay',
    name: 'Mr Digvijay Pawar',
    role: 'teacher',
    teacherId: 't4',
    category: 'Teacher',
    email: 'digvijaypawar410@gmail.com',
    phone: '8275586504',
    userId: 'digvijay.pawar',
    password: 'Password@123',
    title: 'Economics Specialist Faculty',
    badge: 'Economics Faculty',
    branch: 'Satpur Colony Center',
    status: 'Active',
    authorizedBy: 'Director Ishwari Deshmukh',
    updatedAt: '2026-10-21T18:10:00'
  },
  // Real Students & Parents (Exact 5 from Users.xlsx)
  {
    id: 'usr_student_s1',
    name: 'Arush Thorat',
    role: 'student',
    studentId: 's1',
    category: 'Student',
    courseName: '12th ICGSE',
    email: 'arushthorat@gmail.com',
    phone: '9850311082',
    userId: 'arush.thorat',
    password: 'Password@123',
    title: '12th ICGSE Student (Roll #IMP-2026-01)',
    badge: 'Gangapur Rd',
    branch: 'Gangapur Road Center',
    status: 'Active',
    authorizedBy: 'Director Ishwari Deshmukh',
    updatedAt: '2026-10-21T18:10:00'
  },
  {
    id: 'usr_parent_s1',
    name: 'Mr Thorat',
    role: 'parent',
    wardId: 's1',
    wardName: 'Arush Thorat (12th ICGSE)',
    category: 'Parents',
    email: 'mrthorat@gmail.com',
    phone: '9850311082',
    userId: 'parent.thorat',
    password: 'Password@123',
    title: 'Parent of Arush Thorat (12th ICGSE)',
    badge: 'Verified Guardian',
    branch: 'Gangapur Road Center',
    status: 'Active',
    authorizedBy: 'Director Ishwari Deshmukh',
    updatedAt: '2026-10-21T18:10:00'
  },
  {
    id: 'usr_student_s2',
    name: 'Jatin Avhad',
    role: 'student',
    studentId: 's2',
    category: 'Student',
    courseName: '10th ICGSE',
    email: 'jatinavhad@gmail.com',
    phone: '9850311082',
    userId: 'jatin.avhad',
    password: 'Password@123',
    title: '10th ICGSE Student (Roll #IMP-2026-02)',
    badge: 'Gangapur Rd',
    branch: 'Gangapur Road Center',
    status: 'Active',
    authorizedBy: 'Director Ishwari Deshmukh',
    updatedAt: '2026-10-21T18:10:00'
  },
  {
    id: 'usr_parent_s2',
    name: 'Mr Avhad',
    role: 'parent',
    wardId: 's2',
    wardName: 'Jatin Avhad (10th ICGSE)',
    category: 'Parents',
    email: 'mravhad@gmail.com',
    phone: '9850311082',
    userId: 'parent.avhad',
    password: 'Password@123',
    title: 'Parent of Jatin Avhad (10th ICGSE)',
    badge: 'Verified Guardian',
    branch: 'Gangapur Road Center',
    status: 'Active',
    authorizedBy: 'Director Ishwari Deshmukh',
    updatedAt: '2026-10-21T18:10:00'
  },
  {
    id: 'usr_student_s3',
    name: 'Rutuja Shekokar',
    role: 'student',
    studentId: 's3',
    category: 'Student',
    courseName: '11th Commerce & CA Foundation',
    email: 'rutujashekokar@gmail.com',
    phone: '9850311082',
    userId: 'rutuja.shekokar',
    password: 'Password@123',
    title: '11th Commerce & CA Foundation (Roll #IMP-2026-03)',
    badge: 'Gangapur Rd',
    branch: 'Gangapur Road Center',
    status: 'Active',
    authorizedBy: 'Director Ishwari Deshmukh',
    updatedAt: '2026-10-21T18:10:00'
  },
  {
    id: 'usr_parent_s3',
    name: 'Mr Shekokar',
    role: 'parent',
    wardId: 's3',
    wardName: 'Rutuja Shekokar (11th & CA)',
    category: 'Parents',
    email: 'mrshekokar@gmail.com',
    phone: '9850311082',
    userId: 'parent.shekokar',
    password: 'Password@123',
    title: 'Parent of Rutuja Shekokar',
    badge: 'Verified Guardian',
    branch: 'Gangapur Road Center',
    status: 'Active',
    authorizedBy: 'Director Ishwari Deshmukh',
    updatedAt: '2026-10-21T18:10:00'
  },
  {
    id: 'usr_student_s4',
    name: 'Om Nimse',
    role: 'student',
    studentId: 's4',
    category: 'Student',
    courseName: '11th Commerce',
    email: 'omnimse@gmail.com',
    phone: '9850311082',
    userId: 'om.nimse',
    password: 'Password@123',
    title: '11th Commerce Student (Roll #IMP-2026-04)',
    badge: 'Gangapur Rd',
    branch: 'Gangapur Road Center',
    status: 'Active',
    authorizedBy: 'Director Ishwari Deshmukh',
    updatedAt: '2026-10-21T18:10:00'
  },
  {
    id: 'usr_parent_s4',
    name: 'Mr Nimse',
    role: 'parent',
    wardId: 's4',
    wardName: 'Om Nimse (11th Commerce)',
    category: 'Parents',
    email: 'mrnimse@gmail.com',
    phone: '9850311082',
    userId: 'parent.nimse',
    password: 'Password@123',
    title: 'Parent of Om Nimse (11th Commerce)',
    badge: 'Verified Guardian',
    branch: 'Gangapur Road Center',
    status: 'Active',
    authorizedBy: 'Director Ishwari Deshmukh',
    updatedAt: '2026-10-21T18:10:00'
  },
  {
    id: 'usr_student_s5',
    name: 'Swaraj Kakade',
    role: 'student',
    studentId: 's5',
    category: 'Student',
    courseName: 'FY Bcom',
    email: 'swarajkakade@gmail.com',
    phone: '9850311082',
    userId: 'swaraj.kakade',
    password: 'Password@123',
    title: 'FY Bcom Student (Roll #IMP-2026-05)',
    badge: 'Gangapur Rd',
    branch: 'Gangapur Road Center',
    status: 'Active',
    authorizedBy: 'Director Ishwari Deshmukh',
    updatedAt: '2026-10-21T18:10:00'
  },
  {
    id: 'usr_parent_s5',
    name: 'Mr Kakade',
    role: 'parent',
    wardId: 's5',
    wardName: 'Swaraj Kakade (FY Bcom)',
    category: 'Parents',
    email: 'mrkakade@gmail.com',
    phone: '9850311082',
    userId: 'parent.kakade',
    password: 'Password@123',
    title: 'Parent of Swaraj Kakade (FY Bcom)',
    badge: 'Verified Guardian',
    branch: 'Gangapur Road Center',
    status: 'Active',
    authorizedBy: 'Director Ishwari Deshmukh',
    updatedAt: '2026-10-21T18:10:00'
  }
];
