interface AdPlaceholderProps {
  size: 'banner' | 'rectangle' | 'mobile-banner' | 'large-rectangle' | 'sticky-banner';
  className?: string;
}

const adSizes = {
  'banner': { width: 728, height: 90, className: 'w-full max-w-[728px] h-[90px]' },
  'rectangle': { width: 300, height: 250, className: 'w-[300px] h-[250px]' },
  'mobile-banner': { width: 320, height: 50, className: 'w-full max-w-[320px] h-[50px]' },
  'large-rectangle': { width: 336, height: 280, className: 'w-[336px] h-[280px]' },
  'sticky-banner': { width: '100%', height: 60, className: 'w-full h-[60px]' }
};

export function AdPlaceholder({ size, className = '' }: AdPlaceholderProps) {
  const adConfig = adSizes[size];
  
  return (
    <div 
      className={`
        ${adConfig.className} 
        border-2 border-dashed border-gray-300 bg-gray-50 
        flex items-center justify-center mx-auto
        text-gray-500 text-sm font-medium
        ${className}
      `}
      data-ad-size={size}
      data-ad-width={adConfig.width}
      data-ad-height={adConfig.height}
    >
      <div className="text-center">
        <div className="text-xs mb-1">Advertisement</div>
        <div className="text-xs opacity-70">
          {typeof adConfig.width === 'string' ? 'Responsive' : `${adConfig.width}×${adConfig.height}`}
        </div>
      </div>
    </div>
  );
}