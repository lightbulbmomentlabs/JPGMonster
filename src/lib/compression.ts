// Dynamic import for browser-image-compression to reduce initial bundle size
import { CompressionOptions, ProcessedImage, UseCasePreset } from '@/types';

export const USE_CASE_PRESETS: Record<string, UseCasePreset> = {
  'website-hero': {
    name: 'website-hero',
    label: 'Website Hero',
    description: 'Large header images, high quality',
    targetFileSize: 500 * 1024, // 500KB
    maxWidth: 1920,
    maxHeight: 1080,
    recommendedQuality: 0.85,
    priority: 'quality',
  },
  'blog-image': {
    name: 'blog-image',
    label: 'Blog Image',
    description: 'Article images, balanced optimization',
    targetFileSize: 200 * 1024, // 200KB
    maxWidth: 1200,
    maxHeight: 800,
    recommendedQuality: 0.8,
    priority: 'balanced',
  },
  'social-media': {
    name: 'social-media',
    label: 'Social Media',
    description: 'Social platform optimized',
    targetFileSize: 150 * 1024, // 150KB
    maxWidth: 1080,
    maxHeight: 1080,
    recommendedQuality: 0.75,
    priority: 'size',
  },
  'thumbnail': {
    name: 'thumbnail',
    label: 'Thumbnail',
    description: 'Small preview images',
    targetFileSize: 50 * 1024, // 50KB
    maxWidth: 400,
    maxHeight: 400,
    recommendedQuality: 0.7,
    priority: 'size',
  },
} as const;

export const COMPRESSION_PRESETS = {
  light: {
    name: 'light',
    label: 'Light',
    description: 'High quality, moderate compression',
    quality: 0.85,
    estimatedReduction: 30,
  },
  medium: {
    name: 'medium',
    label: 'Medium',
    description: 'Balanced quality and size',
    quality: 0.65,
    estimatedReduction: 55,
  },
  heavy: {
    name: 'heavy',
    label: 'Heavy',
    description: 'Aggressive compression for smaller files',
    quality: 0.45,
    estimatedReduction: 80,
  },
} as const;

// Analyze image content to determine if it's a photo or graphic
async function analyzeImageContent(file: File): Promise<'photo' | 'graphic'> {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const url = URL.createObjectURL(file);

    img.onload = () => {
      // Sample a small portion of the image for analysis
      const sampleSize = 100;
      canvas.width = sampleSize;
      canvas.height = sampleSize;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
        const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
        const data = imageData.data;
        
        // Calculate color variation - photos have more variation
        let colorVariation = 0;
        for (let i = 0; i < data.length; i += 16) { // Sample every 4th pixel
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const nextR = data[i + 4] || r;
          const nextG = data[i + 5] || g;
          const nextB = data[i + 6] || b;
          
          colorVariation += Math.abs(r - nextR) + Math.abs(g - nextG) + Math.abs(b - nextB);
        }
        
        // If high color variation, likely a photo; if low, likely a graphic
        const avgVariation = colorVariation / (sampleSize * sampleSize / 4);
        resolve(avgVariation > 30 ? 'photo' : 'graphic');
      } else {
        resolve('photo'); // Default fallback
      }
      
      URL.revokeObjectURL(url);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve('photo'); // Default fallback
    };

    img.src = url;
  });
}

// Smart iterative compression that targets file size
export async function smartCompressImage(
  file: File,
  options: CompressionOptions,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  const dimensions = await getImageDimensions(file);
  const contentType = await analyzeImageContent(file);
  const useCase = options.useCase ? USE_CASE_PRESETS[options.useCase] : null;
  
  // Determine target settings
  const targetFileSize = options.targetFileSize || useCase?.targetFileSize || (file.size * 0.7);
  const maxWidth = useCase?.maxWidth || options.maxWidth || 1920;
  const maxHeight = useCase?.maxHeight || options.maxHeight || 1080;
  const minQuality = options.minQuality || 0.5;
  const startQuality = useCase?.recommendedQuality || options.quality || 0.85;

  // Adjust quality based on content type
  const qualityMultiplier = contentType === 'photo' ? 1.0 : 1.1; // Graphics can handle slightly lower quality
  
  // Determine if we need to resize based on original dimensions
  const needsResize = dimensions.width > 2000 || dimensions.height > 2000;
  let currentWidth = needsResize ? Math.min(dimensions.width, maxWidth) : dimensions.width;
  let currentHeight = needsResize ? Math.min(dimensions.height, maxHeight) : dimensions.height;
  
  // Maintain aspect ratio
  if (needsResize) {
    const aspectRatio = dimensions.width / dimensions.height;
    if (currentWidth / aspectRatio > currentHeight) {
      currentWidth = currentHeight * aspectRatio;
    } else {
      currentHeight = currentWidth / aspectRatio;
    }
  }

  let currentQuality = Math.min(startQuality * qualityMultiplier, 0.95);
  let attempt = 0;
  const maxAttempts = 8;
  let bestResult: Blob = file;
  
  onProgress?.(10);

  // Iterative optimization
  while (attempt < maxAttempts) {
    try {
      const compressionOptions = {
        maxSizeMB: Infinity,
        maxWidthOrHeight: Math.max(currentWidth, currentHeight),
        useWebWorker: true,
        quality: currentQuality,
        preserveExif: false,
        onProgress: (progress: number) => {
          const overallProgress = 10 + ((attempt / maxAttempts) * 80) + ((progress / maxAttempts) * 8);
          onProgress?.(Math.min(overallProgress, 90));
        },
      };

      const imageCompression = (await import('browser-image-compression')).default;
      const compressed = await imageCompression(file, compressionOptions);
      
      // Check if we've reached our target
      if (compressed.size <= targetFileSize) {
        onProgress?.(100);
        return compressed;
      }
      
      // If this is better than our current best, keep it
      if (compressed.size < bestResult.size || bestResult === file) {
        bestResult = compressed;
      }
      
      // Adjust strategy for next iteration
      if (compressed.size > targetFileSize * 1.5) {
        // Still way too big, reduce dimensions more aggressively
        currentWidth *= 0.85;
        currentHeight *= 0.85;
        currentQuality = Math.max(currentQuality * 0.9, minQuality);
      } else if (compressed.size > targetFileSize) {
        // Close but still too big, reduce quality more conservatively
        currentQuality = Math.max(currentQuality * 0.92, minQuality);
      }
      
      // Stop if we've hit minimum quality and can't resize further
      if (currentQuality <= minQuality && (currentWidth < 400 || currentHeight < 400)) {
        break;
      }
      
      attempt++;
    } catch (error) {
      console.error(`Compression attempt ${attempt} failed:`, error);
      break;
    }
  }
  
  onProgress?.(100);
  return bestResult;
}

// Legacy simple compression (for custom slider mode)
export async function compressImage(
  file: File,
  options: CompressionOptions,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  // Use smart compression if enabled, otherwise use simple compression
  if (options.smartOptimization) {
    return smartCompressImage(file, options, onProgress);
  }

  const compressionOptions = {
    maxSizeMB: Infinity,
    maxWidthOrHeight: options.maxWidth || options.maxHeight || undefined,
    useWebWorker: true,
    quality: options.quality,
    preserveExif: false,
    onProgress: onProgress ? (progress: number) => onProgress(progress) : undefined,
  };

  try {
    const imageCompression = (await import('browser-image-compression')).default;
    const compressedFile = await imageCompression(file, compressionOptions);
    return compressedFile;
  } catch (error) {
    console.error('Compression failed:', error);
    throw new Error(`Failed to compress image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function estimateCompressionSize(originalSize: number, quality: number): number {
  // Rough estimation based on quality level
  const baseReduction = 1 - quality;
  const estimatedSize = originalSize * (1 - baseReduction * 0.8); // Conservative estimate
  return Math.max(estimatedSize, originalSize * 0.1); // Minimum 10% of original
}

export async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image dimensions'));
    };
    
    img.src = url;
  });
}

export function calculateCompressionRatio(originalSize: number, compressedSize: number): number {
  return ((originalSize - compressedSize) / originalSize) * 100;
}

export async function generateThumbnail(file: File, maxWidth: number = 64): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const url = URL.createObjectURL(file);

    img.onload = () => {
      try {
        // Calculate dimensions maintaining aspect ratio
        const { width: originalWidth, height: originalHeight } = img;
        const aspectRatio = originalWidth / originalHeight;
        
        const thumbnailWidth = Math.min(originalWidth, maxWidth);
        const thumbnailHeight = thumbnailWidth / aspectRatio;
        
        // Set canvas dimensions
        canvas.width = thumbnailWidth;
        canvas.height = thumbnailHeight;
        
        if (ctx) {
          // Enable image smoothing for better quality
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          
          // Draw the resized image
          ctx.drawImage(img, 0, 0, thumbnailWidth, thumbnailHeight);
          
          // Convert to data URL
          const thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          resolve(thumbnailDataUrl);
        } else {
          reject(new Error('Canvas context not available'));
        }
      } catch (error) {
        reject(error);
      } finally {
        URL.revokeObjectURL(url);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image for thumbnail'));
    };

    img.src = url;
  });
}

export async function processImageFile(
  file: File,
  options: CompressionOptions,
  onProgress?: (progress: number) => void
): Promise<ProcessedImage> {
  const startTime = Date.now();
  const id = `${file.name}-${Date.now()}`;

  try {
    // Get original dimensions
    const dimensions = await getImageDimensions(file);
    
    // Compress the image
    const compressedBlob = await compressImage(file, options, onProgress);
    
    const processingTime = Date.now() - startTime;
    const compressionRatio = calculateCompressionRatio(file.size, compressedBlob.size);

    const processedImage: ProcessedImage = {
      id,
      originalFile: file,
      optimizedBlob: compressedBlob,
      originalSize: file.size,
      optimizedSize: compressedBlob.size,
      compressionRatio,
      processingTime,
      quality: options.quality,
      width: dimensions.width,
      height: dimensions.height,
      status: 'completed',
      downloadName: `optimized-${file.name}`,
    };

    return processedImage;
  } catch (error) {
    return {
      id,
      originalFile: file,
      originalSize: file.size,
      quality: options.quality,
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}