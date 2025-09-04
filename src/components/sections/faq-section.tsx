'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How do I compress JPG files without losing quality?",
    answer: "Our free JPG compressor uses advanced lossless compression algorithms that preserve image quality while reducing file size by up to 80%. Simply upload your images, choose your compression level, and download the optimized files. The tool automatically detects the best compression settings for each image.",
    keywords: ["compress JPG without losing quality", "lossless image compression"]
  },
  {
    question: "What's the difference between JPG and JPEG compression?",
    answer: "JPG and JPEG are the same image format - just different file extensions. Both use the same compression algorithm. Our tool supports both .jpg and .jpeg files and applies the same optimization techniques regardless of the extension.",
    keywords: ["difference between JPG and JPEG compression"]
  },
  {
    question: "Can I compress multiple images at once with your tool?",
    answer: "Yes! Our batch image compression feature allows you to upload and process multiple JPG files simultaneously. You can compress up to 20 images at once, making it perfect for bulk JPEG optimization workflows.",
    keywords: ["batch image compression free", "bulk JPEG optimizer"]
  },
  {
    question: "My image is too large to upload - what should I do?",
    answer: "If your image is too large to upload (over 10MB), try using our progressive JPEG compression feature first, or use our resize tool to reduce dimensions before compression. Our tool handles most large photos for web optimization.",
    keywords: ["image too large to upload", "compress large photos for web"]
  },
  {
    question: "How do I reduce image size for email attachments?",
    answer: "For email attachments, we recommend using our 'Email' preset which optimizes images to under 1MB while maintaining good quality. This ensures fast email delivery and prevents attachment size issues.",
    keywords: ["reduce image size for email"]
  },
  {
    question: "Can I compress images for WordPress websites?",
    answer: "Absolutely! Our WordPress optimization preset reduces image sizes specifically for website performance. Compressed images load faster, improve your PageSpeed scores, and reduce bandwidth usage without compromising visual quality.",
    keywords: ["compress images for WordPress", "reduce image size for website"]
  },
  {
    question: "What's progressive JPEG compression and when should I use it?",
    answer: "Progressive JPEG compression loads images in multiple passes, showing a low-quality version first that gradually improves. It's ideal for web use as it provides faster perceived loading times, especially on slower connections.",
    keywords: ["progressive JPEG compression"]
  },
  {
    question: "How do I optimize images for Instagram and social media?",
    answer: "Use our 'Social Media' preset which optimizes images for platforms like Instagram, Facebook, and Twitter. It maintains visual quality while meeting platform size requirements and upload speed recommendations.",
    keywords: ["compress photos for Instagram"]
  },
  {
    question: "Is there a JPG compression ratio calculator?",
    answer: "Yes! Our tool automatically calculates and displays the compression ratio for each processed image, showing you exactly how much space you've saved. You can see both the percentage reduction and byte savings.",
    keywords: ["JPG compression ratio calculator"]
  },
  {
    question: "What's the best free alternative to TinyPNG in 2025?",
    answer: "JPGMonster offers superior compression with local processing, batch uploads, advanced quality controls, and no file limits. Unlike TinyPNG, we process images locally for better privacy and offer more customization options for professional workflows.",
    keywords: ["TinyPNG alternative free", "free JPG compressor online"]
  }
];

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
            Frequently Asked Questions About <span className="monster-gradient-text">JPG Compression</span>
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about reducing image size and optimizing JPEGs for web in 2025
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => toggleItem(index)}
              >
                <h3 className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openItems.includes(index) ? (
                  <Minus className="h-5 w-5 text-monster-primary flex-shrink-0" />
                ) : (
                  <Plus className="h-5 w-5 text-monster-primary flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}