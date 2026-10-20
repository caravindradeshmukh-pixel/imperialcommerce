import { supabase } from '../src/supabase.js';

async function clean() {
  await supabase.from('enquiries').delete().like('id', '%test%');
  await supabase.from('recruitment_candidates').delete().like('id', '%TEST%');
  await supabase.from('receipts').delete().like('receipt_no', '%TEST%');
  await supabase.from('expenses').delete().like('voucher_no', '%TEST%');
  await supabase.from('leaves').delete().like('id', '%test%');
  await supabase.from('queries').delete().like('id', '%test%');
  console.log('Successfully cleaned up temporary test records.');
}

clean().catch(console.error);
