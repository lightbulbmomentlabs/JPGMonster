import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Database types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  default_quality: number;
  preferred_format: 'jpeg' | 'webp';
  created_at: string;
  updated_at: string;
  last_activity_at: string;
  is_premium: boolean;
  total_files_processed: number;
  total_bytes_saved: number;
}

export interface ProcessingHistory {
  id: string;
  user_id?: string;
  session_id?: string;
  original_filename: string;
  original_size: number;
  optimized_size?: number;
  compression_ratio?: number;
  quality_setting: number;
  original_width?: number;
  original_height?: number;
  processing_method: 'client' | 'server';
  processing_time_ms?: number;
  created_at: string;
  ip_address?: string;
  user_agent?: string;
  error_message?: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

export interface UsageAnalytics {
  id: string;
  date: string;
  total_files_processed: number;
  total_bytes_original: number;
  total_bytes_optimized: number;
  total_bytes_saved: number;
  avg_compression_ratio?: number;
  unique_users: number;
  unique_sessions: number;
  client_side_processing: number;
  server_side_processing: number;
  error_count: number;
  created_at: string;
}

export interface ProcessingJob {
  id: string;
  user_id?: string;
  session_id?: string;
  original_filename: string;
  original_size: number;
  quality_setting: number;
  max_width?: number;
  max_height?: number;
  preserve_aspect_ratio: boolean;
  storage_path?: string;
  result_path?: string;
  status: 'pending' | 'processing' | 'completed' | 'error' | 'cancelled';
  error_message?: string;
  processing_started_at?: string;
  processing_completed_at?: string;
  created_at: string;
  expires_at: string;
}

// Helper functions
export async function recordProcessingActivity(data: {
  user_id?: string;
  session_id?: string;
  original_filename: string;
  original_size: number;
  optimized_size?: number;
  compression_ratio?: number;
  quality_setting: number;
  original_width?: number;
  original_height?: number;
  processing_method?: 'client' | 'server';
  processing_time_ms?: number;
  status?: string;
}) {
  const { data: result, error } = await supabase.rpc('record_processing_activity', {
    p_user_id: data.user_id,
    p_session_id: data.session_id,
    p_original_filename: data.original_filename,
    p_original_size: data.original_size,
    p_optimized_size: data.optimized_size,
    p_compression_ratio: data.compression_ratio,
    p_quality_setting: data.quality_setting,
    p_original_width: data.original_width,
    p_original_height: data.original_height,
    p_processing_method: data.processing_method || 'client',
    p_processing_time_ms: data.processing_time_ms,
    p_status: data.status || 'completed'
  });

  if (error) {
    console.error('Error recording processing activity:', error);
    throw error;
  }

  return result;
}

export async function createAnonymousSession(): Promise<string> {
  const { data, error } = await supabase.rpc('create_anonymous_session');
  
  if (error) {
    console.error('Error creating anonymous session:', error);
    throw error;
  }
  
  return data;
}

export async function getUserStats(userId: string) {
  const { data, error } = await supabase.rpc('get_user_stats', {
    p_user_id: userId
  });

  if (error) {
    console.error('Error getting user stats:', error);
    throw error;
  }

  return data?.[0];
}

// Storage helpers
export function getPublicUrl(bucket: string, path: string) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadToStorage(bucket: string, path: string, file: File) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file);

  if (error) {
    console.error('Error uploading to storage:', error);
    throw error;
  }

  return data;
}

export async function deleteFromStorage(bucket: string, path: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) {
    console.error('Error deleting from storage:', error);
    throw error;
  }

  return data;
}