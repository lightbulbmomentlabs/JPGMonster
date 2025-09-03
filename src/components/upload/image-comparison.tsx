'use client';

import React, { useState } from 'react';
import { Download, AlertCircle, CheckCircle, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProcessedImage } from '@/types';
import { formatFileSize, formatPercentage, formatDuration } from '@/lib/utils';

interface ImageComparisonProps {
  image: ProcessedImage;
  onDownload: () => void;
  onReprocess: () => void;
}

export function ImageComparison({ image, onDownload, onReprocess }: ImageComparisonProps) {
  const [showComparison, setShowComparison] = useState(true);
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [optimizedUrl, setOptimizedUrl] = useState<string>('');

  // Create object URLs for display
  React.useEffect(() => {
    const originalObjectUrl = URL.createObjectURL(image.originalFile);
    setOriginalUrl(originalObjectUrl);

    let optimizedObjectUrl: string | null = null;
    if (image.optimizedBlob) {
      optimizedObjectUrl = URL.createObjectURL(image.optimizedBlob);
      setOptimizedUrl(optimizedObjectUrl);
    }

    return () => {
      URL.revokeObjectURL(originalObjectUrl);
      if (optimizedObjectUrl) {
        URL.revokeObjectURL(optimizedObjectUrl);
      }
    };
  }, [image]);

  if (image.status === 'error') {
    return (
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            Processing Failed: {image.originalFile.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">{image.error}</p>
          <div className="mt-4 p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-700">
              <strong>Original size:</strong> {formatFileSize(image.originalSize)}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (image.status !== 'completed' || !image.optimizedBlob) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-monster-primary"></div>
            <span className="ml-3">Processing {image.originalFile.name}...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const compressionRatio = image.compressionRatio || 0;
  const sizeSaved = image.originalSize - (image.optimizedSize || 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-monster-success" />
            {image.originalFile.name}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowComparison(!showComparison)}
            >
              {showComparison ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showComparison ? 'Hide' : 'Show'} Preview
            </Button>
            <Button onClick={onDownload} size="sm" variant="monster">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">
              {formatFileSize(sizeSaved)}
            </div>
            <div className="text-xs text-gray-600">Size Saved</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-monster-success">
              {formatPercentage(compressionRatio)}
            </div>
            <div className="text-xs text-gray-600">Compression</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">
              {formatFileSize(image.optimizedSize || 0)}
            </div>
            <div className="text-xs text-gray-600">New Size</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">
              {image.processingTime ? formatDuration(image.processingTime) : 'N/A'}
            </div>
            <div className="text-xs text-gray-600">Process Time</div>
          </div>
        </div>

        {/* Image Comparison */}
        {showComparison && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Original</h4>
              <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                {originalUrl ? (
                  <img
                    src={originalUrl}
                    alt="Original"
                    className="w-full object-contain"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-monster-primary"></div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2">
                  <div className="text-xs">
                    {formatFileSize(image.originalSize)} • {image.width}×{image.height}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Button 
                  onClick={onReprocess} 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Different Settings
                </Button>
              </div>
            </div>

            {/* Optimized */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Optimized</h4>
              <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                {optimizedUrl ? (
                  <img
                    src={optimizedUrl}
                    alt="Optimized"
                    className="w-full object-contain"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-monster-primary"></div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2">
                  <div className="text-xs">
                    {formatFileSize(image.optimizedSize || 0)} • Quality: {Math.round(image.quality * 100)}%
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="bg-monster-success text-white text-xs px-2 py-1 rounded">
                    -{formatPercentage(compressionRatio)}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <Button 
                  onClick={onDownload} 
                  variant="monster" 
                  size="sm" 
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}