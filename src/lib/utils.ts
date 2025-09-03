import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '10485760');
  
  if (!file.type.match(/^image\/jpe?g$/i)) {
    const fileExtension = file.name.split('.').pop()?.toUpperCase() || 'unknown file';
    return { valid: false, error: `The monster only chomps on JPGs! This ${fileExtension} won't satisfy its appetite.` };
  }

  if (file.size > maxSize) {
    return { valid: false, error: `Whoa! This JPG is too chunky even for the monster! Please keep it under ${formatFileSize(maxSize)}.` };
  }

  return { valid: true };
}

export function validateBatch(files: File[]): { valid: boolean; error?: string } {
  const maxBatchSize = parseInt(process.env.NEXT_PUBLIC_MAX_BATCH_SIZE || '10');
  const maxBatchSizeBytes = parseInt(process.env.NEXT_PUBLIC_MAX_BATCH_SIZE_BYTES || '104857600');
  
  if (files.length > maxBatchSize) {
    return { valid: false, error: `Slow down there! The monster can only handle ${maxBatchSize} JPGs at a time. That's a lot of crunching!` };
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > maxBatchSizeBytes) {
    return { valid: false, error: `Even the monster has limits! Your batch is too big. Keep the total under ${formatFileSize(maxBatchSizeBytes)}.` };
  }

  return { valid: true };
}
