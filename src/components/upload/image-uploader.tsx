'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { validateImageFile, validateBatch, formatFileSize } from '@/lib/utils';
import { generateThumbnail } from '@/lib/compression';
import { ProcessedImage } from '@/types';
import { ImageProcessor } from './image-processor';

interface ImageUploaderProps {
  integrated?: boolean;
  onProcessingStart?: () => void;
  onProcessingComplete?: (processed: ProcessedImage[]) => void;
  onReset?: () => void;
}

interface FileThumbnail {
  file: File;
  thumbnailUrl: string | null;
  loading: boolean;
  error: boolean;
}

export function ImageUploader({ 
  integrated = false, 
  onProcessingStart, 
  onProcessingComplete: onProcessingCompleteProp, 
  onReset: onResetProp 
}: ImageUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [thumbnails, setThumbnails] = useState<Map<string, FileThumbnail>>(new Map());

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setErrors([]);
    
    // Validate each file
    const validFiles: File[] = [];
    const newErrors: string[] = [];

    acceptedFiles.forEach((file) => {
      const validation = validateImageFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        newErrors.push(`${file.name}: ${validation.error}`);
      }
    });

    // Validate batch size
    const allFiles = [...files, ...validFiles];
    const batchValidation = validateBatch(allFiles);
    
    if (!batchValidation.valid) {
      newErrors.push(batchValidation.error!);
    } else {
      setFiles(allFiles);
      
      // Generate thumbnails for new files
      validFiles.forEach(async (file) => {
        const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
        
        // Set loading state
        setThumbnails(prev => new Map(prev.set(fileKey, {
          file,
          thumbnailUrl: null,
          loading: true,
          error: false,
        })));
        
        try {
          const thumbnailUrl = await generateThumbnail(file, 64);
          setThumbnails(prev => new Map(prev.set(fileKey, {
            file,
            thumbnailUrl,
            loading: false,
            error: false,
          })));
        } catch (error) {
          console.error('Failed to generate thumbnail for', file.name, error);
          setThumbnails(prev => new Map(prev.set(fileKey, {
            file,
            thumbnailUrl: null,
            loading: false,
            error: true,
          })));
        }
      });
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
    }
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    disabled: isProcessing,
    noClick: false,
  });

  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    if (fileToRemove) {
      const fileKey = `${fileToRemove.name}-${fileToRemove.size}-${fileToRemove.lastModified}`;
      setThumbnails(prev => {
        const newMap = new Map(prev);
        newMap.delete(fileKey);
        return newMap;
      });
    }
    setFiles(prev => prev.filter((_, i) => i !== index));
    setErrors([]);
  };

  const clearAll = () => {
    setFiles([]);
    setProcessedImages([]);
    setErrors([]);
    setThumbnails(new Map());
    onResetProp?.();
  };

  const handleProcessingComplete = (processed: ProcessedImage[]) => {
    setProcessedImages(processed);
    setIsProcessing(false);
    onProcessingCompleteProp?.(processed);
  };

  const handleReprocess = (file: File) => {
    // Reset processed images and set files to just this one file
    setProcessedImages([]);
    setFiles([file]);
    setIsProcessing(false);
    setErrors([]);
    
    // Keep the existing thumbnail for this file if it exists
    const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
    const existingThumbnail = thumbnails.get(fileKey);
    if (!existingThumbnail) {
      // Generate thumbnail if it doesn't exist
      setThumbnails(prev => new Map(prev.set(fileKey, {
        file,
        thumbnailUrl: null,
        loading: true,
        error: false,
      })));
      
      generateThumbnail(file, 64).then(thumbnailUrl => {
        setThumbnails(prev => new Map(prev.set(fileKey, {
          file,
          thumbnailUrl,
          loading: false,
          error: false,
        })));
      }).catch(error => {
        console.error('Failed to generate thumbnail for', file.name, error);
        setThumbnails(prev => new Map(prev.set(fileKey, {
          file,
          thumbnailUrl: null,
          loading: false,
          error: true,
        })));
      });
    }
  };

  // Thumbnail component
  const FileThumbnail = ({ file }: { file: File }) => {
    const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
    const thumbnail = thumbnails.get(fileKey);

    if (!thumbnail || thumbnail.loading) {
      return (
        <div className="w-16 h-12 bg-gray-100 rounded-md flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-monster-primary border-t-transparent"></div>
        </div>
      );
    }

    if (thumbnail.error || !thumbnail.thumbnailUrl) {
      return (
        <div className="w-16 h-12 bg-gray-100 rounded-md flex items-center justify-center">
          <FileImage className="h-5 w-5 text-gray-500" />
        </div>
      );
    }

    return (
      <div className="max-w-16 rounded-md overflow-hidden bg-gray-100">
        <img 
          src={thumbnail.thumbnailUrl} 
          alt={`Thumbnail of ${file.name}`}
          className="w-full h-full object-cover"
        />
      </div>
    );
  };

  if (processedImages.length > 0) {
    return (
      <ImageProcessor 
        processedImages={processedImages}
        onReset={clearAll}
        onReprocess={handleReprocess}
      />
    );
  }

  const uploadZoneStyle = integrated 
    ? `
      relative border-3 border-dotted rounded-xl p-4 sm:p-6 md:p-8 text-center cursor-pointer 
      transition-all duration-300 ease-out
      bg-gradient-to-br from-blue-50/60 to-purple-50/60 backdrop-blur-sm border-purple-500
      hover:border-purple-600 hover:bg-gradient-to-br hover:from-blue-50/80 hover:to-purple-50/80 hover:shadow-xl hover:scale-[1.02]
      hover:-translate-y-1 hover:shadow-purple-500/20
      ${isDragActive 
        ? 'border-purple-600 bg-gradient-to-br from-blue-100/70 to-purple-100/70 scale-105 shadow-2xl shadow-purple-500/30 -translate-y-2' 
        : ''
      }
      ${isProcessing ? 'pointer-events-none opacity-50' : ''}
    `
    : `
      relative border-3 border-dotted rounded-lg p-6 sm:p-8 md:p-12 text-center cursor-pointer 
      transition-all duration-300 ease-out
      bg-gradient-to-br from-blue-50/40 to-purple-50/40 border-purple-500
      hover:border-purple-600 hover:bg-gradient-to-br hover:from-blue-50/60 hover:to-purple-50/60 hover:scale-[1.01] hover:shadow-lg
      ${isDragActive 
        ? 'border-purple-600 bg-gradient-to-br from-blue-100/60 to-purple-100/60 scale-105 shadow-xl' 
        : ''
      }
      ${isProcessing ? 'pointer-events-none opacity-50' : ''}
    `;

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      {integrated ? (
        <div
          {...getRootProps()}
          className={uploadZoneStyle}
        >
          <input {...getInputProps()} />
          
          <div className="space-y-4">
            <div className="flex justify-center">
              {isDragActive ? (
                <div className="animate-in zoom-in duration-300">
                  <img 
                    src="https://yxmgdkcvglytfkklfutp.supabase.co/storage/v1/object/public/website-assets/optimized/JPG-Monster-mascot.jpg"
                    alt="JPG Monster Mascot"
                    className="h-40 w-40 animate-pulse object-contain"
                  />
                </div>
              ) : (
                <div className="relative group">
                  <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2">
                    <img 
                      src="https://yxmgdkcvglytfkklfutp.supabase.co/storage/v1/object/public/website-assets/optimized/JPG-Monster-mascot.jpg"
                      alt="JPG Monster Mascot"
                      className="h-32 w-32 object-contain"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 animate-bounce group-hover:animate-pulse">
                    <Upload className="h-8 w-8 text-monster-primary transition-colors duration-300 group-hover:text-monster-secondary" />
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <p className="text-xl font-semibold text-gray-900">
                {isDragActive 
                  ? 'Release to feed the monster!' 
                  : 'Feed the Monster by Drag-n-Dropping your JPGs Here'
                }
              </p>
              <p className="text-gray-700 mt-2">
                or click to browse your files
              </p>
            </div>
            
            <div className="text-sm text-gray-600 space-y-1 bg-white/40 rounded-lg p-3 backdrop-blur-sm">
              <p>• Maximum {process.env.NEXT_PUBLIC_MAX_BATCH_SIZE || 10} files per batch</p>
              <p>• Maximum {formatFileSize(parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '10485760'))} per file</p>
              <p>• JPG/JPEG files only</p>
            </div>
          </div>
        </div>
      ) : (
        <Card className="p-8">
          <div
            {...getRootProps()}
            className={uploadZoneStyle}
          >
            <input {...getInputProps()} />
            
            <div className="space-y-4">
              <div className="flex justify-center">
                {isDragActive ? (
                  <img 
                    src="https://yxmgdkcvglytfkklfutp.supabase.co/storage/v1/object/public/website-assets/optimized/JPG-Monster-mascot.jpg"
                    alt="JPG Monster Mascot"
                    className="h-32 w-32 object-contain animate-pulse"
                  />
                ) : (
                  <div className="relative">
                    <Upload className="h-16 w-16 text-gray-400" />
                    <div className="absolute -top-2 -right-2">
                      <img 
                        src="https://yxmgdkcvglytfkklfutp.supabase.co/storage/v1/object/public/website-assets/optimized/JPG-Monster-mascot.jpg"
                        alt="JPG Monster Mascot"
                        className="h-16 w-16 object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {isDragActive 
                    ? 'Release to feed the monster!' 
                    : 'Drag and drop JPG files here'
                  }
                </p>
                <p className="text-gray-600 mt-1">
                  or click to browse your files
                </p>
              </div>
              
              <div className="text-sm text-gray-500 space-y-1">
                <p>• Maximum {process.env.NEXT_PUBLIC_MAX_BATCH_SIZE || 10} files per batch</p>
                <p>• Maximum {formatFileSize(parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '10485760'))} per file</p>
                <p>• JPG/JPEG files only</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* File List */}
      {files.length > 0 && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3 text-lg font-medium">
              <img 
                src="https://yxmgdkcvglytfkklfutp.supabase.co/storage/v1/object/public/website-assets/optimized/JPGMonster-Ready-to-Eat.jpg"
                alt="JPG Monster"
                className="h-25 w-25 object-contain"
              />
              Ready to Eat ({files.length})
            </div>
            <Button variant="outline" size="sm" onClick={clearAll}>
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
          
          <div className="space-y-2 mb-6">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileThumbnail file={file} />
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <ImageProcessor 
            files={files}
            onProcessingStart={() => {
              setIsProcessing(true);
              onProcessingStart?.();
            }}
            onProcessingComplete={handleProcessingComplete}
            onReprocess={handleReprocess}
          />
        </Card>
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <Card className="p-4 border-red-200 bg-red-50">
          <div className="flex items-start space-x-4">
            {/* Sad Monster Image */}
            <div className="flex-shrink-0">
              <img 
                src="https://yxmgdkcvglytfkklfutp.supabase.co/storage/v1/object/public/website-assets/jpgmonster-sad-v1.png"
                alt="Sad JPG Monster"
                className="h-20 w-20 object-contain"
              />
            </div>
            
            {/* Error Messages */}
            <div className="flex-grow">
              <h4 className="text-red-800 font-medium mb-2">Oops! The monster is not happy:</h4>
              <ul className="text-red-700 text-sm space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}