export interface ProcessedImage {
  id: string;
  originalFile: File;
  optimizedBlob?: Blob;
  originalSize: number;
  optimizedSize?: number;
  compressionRatio?: number;
  processingTime?: number;
  quality: number;
  width?: number;
  height?: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
  downloadName?: string;
}

export interface CompressionOptions {
  quality: number;
  maxWidth?: number;
  maxHeight?: number;
  preserveAspectRatio: boolean;
  useCase?: string;
  targetFileSize?: number;
  minQuality?: number;
  smartOptimization?: boolean;
}

export interface CompressionPreset {
  name: string;
  label: string;
  description: string;
  quality: number;
  estimatedReduction: number;
}

export interface UseCasePreset {
  name: string;
  label: string;
  description: string;
  targetFileSize: number; // in bytes
  maxWidth: number;
  maxHeight: number;
  recommendedQuality: number;
  priority: 'size' | 'quality' | 'balanced';
}

export interface UploadStats {
  totalFiles: number;
  totalOriginalSize: number;
  totalOptimizedSize: number;
  totalSavings: number;
  averageCompressionRatio: number;
  processingTime: number;
}

export interface MonsterState {
  isEating: boolean;
  isHappy: boolean;
  isIdle: boolean;
  mood: 'hungry' | 'eating' | 'satisfied' | 'sleepy';
}