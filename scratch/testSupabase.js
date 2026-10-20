import { 
  testConnection, 
  dbSaveEnquiry, 
  dbFetchEnquiries, 
  exportAllCloudData 
} from '../src/supabase.js';

async function run() {
  console.log('Testing connection to Supabase...');
  const conn = await testConnection();
  console.log('Connection test result:', conn);

  if (!conn.ok) {
    console.error('Connection failed!');
    process.exit(1);
  }

  console.log('Saving test enquiry to Supabase...');
  const testEnq = {
    id: `test-enq-${Date.now()}`,
    studentName: 'Test Student Ravi',
    parentName: 'Test Parent',
    phone: '9876543210',
    school: 'KTHM College',
    courseInterested: '12th Commerce',
    courseId: 'c2',
    branch: 'Gangapur Road Center',
    subjects: 'Accounts, Economics',
    status: 'persuaded',
    counselorNotes: 'Test record to verify end-to-end Supabase connection',
    followUpDate: '2026-10-25'
  };

  const saveRes = await dbSaveEnquiry(testEnq);
  console.log('dbSaveEnquiry result:', saveRes);

  const list = await dbFetchEnquiries();
  console.log('Fetched enquiries count:', list?.length);
  console.log('First enquiry:', list?.[0]);

  const snapshot = await exportAllCloudData();
  console.log('Cloud snapshot counts:', snapshot.counts);

  console.log('Supabase Test PASSED!');
}

run().catch(err => {
  console.error('Test run failed:', err);
  process.exit(1);
});
