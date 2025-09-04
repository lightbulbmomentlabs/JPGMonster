'use client';

import { useState } from 'react';
import { Settings, Download, RotateCcw } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { COMPRESSION_PRESETS, USE_CASE_PRESETS, processImageFile } from '@/lib/compression';
import { ProcessedImage, CompressionOptions } from '@/types';
import { formatFileSize, formatPercentage } from '@/lib/utils';
import { ImageComparison } from './image-comparison';

interface ImageProcessorProps {
  files?: File[];
  processedImages?: ProcessedImage[];
  onProcessingStart?: () => void;
  onProcessingComplete?: (processed: ProcessedImage[]) => void;
  onReset?: () => void;
  onReprocess?: (file: File) => void;
}

export function ImageProcessor({ 
  files, 
  processedImages: initialProcessedImages,
  onProcessingStart,
  onProcessingComplete,
  onReset,
  onReprocess
}: ImageProcessorProps) {
  const [compressionOptions, setCompressionOptions] = useState<CompressionOptions>({
    quality: COMPRESSION_PRESETS.medium.quality,
    preserveAspectRatio: true,
    smartOptimization: true,
    minQuality: 0.5,
  });
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>(initialProcessedImages || []);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('medium');
  const [selectedUseCase, setSelectedUseCase] = useState<string>('');

  const handlePresetChange = (presetName: string) => {
    const preset = COMPRESSION_PRESETS[presetName as keyof typeof COMPRESSION_PRESETS];
    if (preset) {
      setSelectedPreset(presetName);
      
      // Always set to the preset's default quality for clear user feedback
      const newQuality = preset.quality;
      
      setCompressionOptions(prev => ({ 
        ...prev, 
        quality: newQuality,
        smartOptimization: true,
        useCase: selectedUseCase,
      }));
    }
  };

  const handleUseCaseChange = (useCaseName: string) => {
    setSelectedUseCase(useCaseName);
    const useCase = USE_CASE_PRESETS[useCaseName];
    if (useCase) {
      setCompressionOptions(prev => ({ 
        ...prev, 
        useCase: useCaseName,
        targetFileSize: useCase.targetFileSize,
        maxWidth: useCase.maxWidth,
        maxHeight: useCase.maxHeight,
        smartOptimization: true,
      }));
      // Also update quality based on use case and current preset
      const currentPreset = COMPRESSION_PRESETS[selectedPreset as keyof typeof COMPRESSION_PRESETS];
      if (currentPreset) {
        const adjustedQuality = Math.min(
          useCase.recommendedQuality * (currentPreset.quality / 0.75), // Adjust based on preset intensity
          0.95
        );
        setCompressionOptions(prev => ({ ...prev, quality: adjustedQuality }));
      }
    }
  };

  const handleQualityChange = (values: number[]) => {
    setCompressionOptions(prev => ({ 
      ...prev, 
      quality: values[0] / 100,
      smartOptimization: false, // Disable smart optimization for manual control
    }));
    setSelectedPreset('custom');
  };

  const processImages = async () => {
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    onProcessingStart?.();
    setProcessingProgress(0);

    const processed: ProcessedImage[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const result = await processImageFile(file, compressionOptions, (progress) => {
          const totalProgress = ((i + progress / 100) / files.length) * 100;
          setProcessingProgress(totalProgress);
        });
        processed.push(result);
      } catch (error) {
        console.error(`Failed to process ${file.name}:`, error);
        processed.push({
          id: `${file.name}-${Date.now()}`,
          originalFile: file,
          originalSize: file.size,
          quality: compressionOptions.quality,
          status: 'error',
          error: error instanceof Error ? error.message : 'Processing failed',
        });
      }
    }

    setProcessedImages(processed);
    setIsProcessing(false);
    setProcessingProgress(100);
    onProcessingComplete?.(processed);
  };

  const downloadImage = (image: ProcessedImage) => {
    if (!image.optimizedBlob) return;

    const url = URL.createObjectURL(image.optimizedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = image.downloadName || `optimized-${image.originalFile.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();

    processedImages.forEach((image) => {
      if (image.optimizedBlob) {
        zip.file(image.downloadName || `optimized-${image.originalFile.name}`, image.optimizedBlob);
      }
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized-images.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const calculateTotalStats = () => {
    const successfulImages = processedImages.filter(img => img.status === 'completed');
    const totalOriginal = successfulImages.reduce((sum, img) => sum + img.originalSize, 0);
    const totalOptimized = successfulImages.reduce((sum, img) => sum + (img.optimizedSize || 0), 0);
    const totalSavings = totalOriginal - totalOptimized;
    const avgCompression = successfulImages.length > 0 
      ? successfulImages.reduce((sum, img) => sum + (img.compressionRatio || 0), 0) / successfulImages.length
      : 0;

    return {
      totalOriginal,
      totalOptimized,
      totalSavings,
      avgCompression,
      successCount: successfulImages.length,
    };
  };

  const getQualityRange = () => {
    if (selectedPreset === 'custom') {
      return { min: 40, max: 95 };
    }

    const preset = COMPRESSION_PRESETS[selectedPreset as keyof typeof COMPRESSION_PRESETS];
    if (!preset) {
      return { min: 40, max: 95 };
    }

    const baseQuality = preset.quality * 100;
    const range = 15; // ±15% range

    const min = Math.max(Math.round(baseQuality - range), 40);
    const max = Math.min(Math.round(baseQuality + range), 95);

    return { min, max };
  };

  const reprocessImage = (image: ProcessedImage) => {
    // Call the onReprocess callback with the original file
    onReprocess?.(image.originalFile);
  };

  // Show configuration interface if we have files to process
  if (files && files.length > 0 && processedImages.length === 0) {
    return (
      <div className="space-y-6">
        {/* Compression Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Compression Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Use Case Selector */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                What will you use this image for? (Optional - helps optimize better)
              </label>
              <select
                value={selectedUseCase}
                onChange={(e) => handleUseCaseChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-monster-primary focus:border-transparent"
              >
                <option value="">Auto-detect (recommended)</option>
                {Object.values(USE_CASE_PRESETS).map((useCase) => (
                  <option key={useCase.name} value={useCase.name}>
                    {useCase.label} - {useCase.description}
                  </option>
                ))}
              </select>
              {selectedUseCase && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                  <div className="text-xs text-blue-700">
                    Target: {formatFileSize(USE_CASE_PRESETS[selectedUseCase].targetFileSize)} • 
                    Max dimensions: {USE_CASE_PRESETS[selectedUseCase].maxWidth}×{USE_CASE_PRESETS[selectedUseCase].maxHeight}
                  </div>
                </div>
              )}
            </div>

            {/* Presets */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                Choose compression intensity:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.entries(COMPRESSION_PRESETS).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => handlePresetChange(key)}
                    className={`p-4 text-left border rounded-lg transition-all ${
                      selectedPreset === key
                        ? 'border-purple-600 bg-gradient-to-r from-purple-50/80 to-blue-50/80 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium">{preset.label}</div>
                    <div className="text-sm text-gray-600 mt-1">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Quality Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Custom Quality: {Math.round(compressionOptions.quality * 100)}%
                </label>
                <span className="text-sm text-gray-500">
                  {selectedPreset === 'custom' ? 'Custom' : 'Using preset'}
                </span>
              </div>
              <Slider
                key={`${selectedPreset}-${getQualityRange().min}-${getQualityRange().max}`}
                value={[compressionOptions.quality * 100]}
                onValueChange={handleQualityChange}
                max={getQualityRange().max}
                min={getQualityRange().min}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{getQualityRange().min}% (Smaller file)</span>
                <span>{getQualityRange().max}% (Better quality)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Process Button */}
        <div className="text-center">
          <Button 
            variant="monster" 
            size="lg" 
            onClick={processImages}
            disabled={isProcessing}
            className="relative"
          >
            {isProcessing ? (
              <>
                <img 
                  src="/jpg-monster-mascot.jpg"
                  alt="JPG Monster"
                  className="h-5 w-5 mr-2 object-contain animate-pulse"
                />
                Processing... ({Math.round(processingProgress)}%)
              </>
            ) : (
              <>
                <img 
                  src="/jpg-monster-mascot.jpg"
                  alt="JPG Monster"
                  className="h-5 w-5 mr-2 object-contain"
                />
                Feed the Monster ({files.length} file{files.length !== 1 ? 's' : ''})
              </>
            )}
          </Button>
        </div>

        {/* Processing Progress */}
        {isProcessing && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing images...</span>
                  <span>{Math.round(processingProgress)}%</span>
                </div>
                <Progress value={processingProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Show results if we have processed images
  if (processedImages.length > 0) {
    const stats = calculateTotalStats();

    return (
      <div className="space-y-8">
        {/* Stats Summary */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <img 
                  src="/jpg-monster-pooping.jpg"
                  alt="JPG Monster"
                  className="h-25 w-25 object-contain"
                  loading="lazy"
                />
                Monster Fed! Results Summary
              </CardTitle>
              <Button variant="outline" onClick={onReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Process More
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.successCount}/{processedImages.length}
                </div>
                <div className="text-sm text-gray-600">Images Processed</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-monster-danger">
                  {formatFileSize(stats.totalSavings)}
                </div>
                <div className="text-sm text-gray-600">Space Saved</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-monster-success">
                  {formatPercentage(stats.avgCompression)}
                </div>
                <div className="text-sm text-gray-600">Avg Compression</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {formatFileSize(stats.totalOptimized)}
                </div>
                <div className="text-sm text-gray-600">Final Size</div>
              </div>
            </div>
            
            {stats.successCount > 1 && (
              <div className="mt-6 text-center">
                <Button onClick={downloadAll} size="lg" variant="monster">
                  <Download className="h-4 w-4 mr-2" />
                  Download All as ZIP
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Individual Results */}
        <div className="space-y-6">
          {processedImages.map((image) => (
            <ImageComparison 
              key={image.id}
              image={image}
              onDownload={() => downloadImage(image)}
              onReprocess={() => reprocessImage(image)}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
}