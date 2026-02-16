import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  // This uses the variables from your .env file
  private supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || ''
  );

  // Replace the old functions in guestbook.service.ts
async findAll() {
  const { data, error } = await this.supabase
    .from('guestbook') 
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) return [];
  return data;
}

async create(payload: { name: string; message: string }) {
  const { data, error } = await this.supabase
    .from('guestbook')
    .insert([payload]);
  
  return data;
}
}