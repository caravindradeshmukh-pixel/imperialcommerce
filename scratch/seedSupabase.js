import { seedSupabaseIfEmpty, exportAllCloudData, supabase } from '../src/supabase.js';
import * as mockData from '../src/mockData.js';

async function seed() {
  // First clear the dummy test record from scratch/testSupabase.js
  await supabase.from('enquiries').delete().like('id', 'test-enq%');

  console.log('Starting seed process to Supabase...');
  const res = await seedSupabaseIfEmpty(mockData);
  console.log('Seed result:', res);

  const snapshot = await exportAllCloudData();
  console.log('Final Cloud Database Counts:');
  console.table(snapshot.counts);
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
