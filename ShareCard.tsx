import { useState, useRef } from 'react';
import { Share2, Download, X, CheckCircle2 } from 'lucide-react';

interface ShareCardProps {
  isOpen: boolean;
  onClose: () => void;
  priorities: Array<{ title: string; completed: boolean }>;
  date: string;
  lifeScore: number;
}

export default function ShareCard({ isOpen, onClose, priorities, date, lifeScore }: ShareCardProps) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const completedCount = priorities.filter(p => p.completed).length;

  const shareOnTwitter = () => {
    const text = `I just completed ${completedCount}/3 priorities today with LIFLO! 🎯\n\nStay balanced. Stay productive. Focus on what matters.\n\nJoin me:`;
    const url = window.location.origin;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 1200;
      canvas.height = 630;

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(1, '#10b981');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'white';
      ctx.font = 'bold 72px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('LIFLO', canvas.width / 2, 120);

      ctx.font = '48px sans-serif';
      ctx.fillText(`${completedCount}/3 Priorities Completed`, canvas.width / 2, 250);

      ctx.font = '32px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillText(date, canvas.width / 2, 320);

      ctx.font = 'bold 96px sans-serif';
      ctx.fillStyle = 'white';
      ctx.fillText(`${lifeScore}`, canvas.width / 2, 480);
      ctx.font = '32px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillText('Life Score', canvas.width / 2, 530);

      const link = document.createElement('a');
      link.download = `liflo-${date}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error downloading card:', error);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 relative animate-scale-in shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Share2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Share Your Progress
          </h2>
          <p className="text-gray-600">
            Inspire others by sharing your daily achievement
          </p>
        </div>

        <div
          ref={cardRef}
          className="bg-gradient-to-br from-blue-500 via-blue-600 to-green-600 rounded-2xl p-8 mb-6 text-white"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-bold">LIFLO</h3>
            <div className="text-right">
              <div className="text-sm opacity-80">Life Score</div>
              <div className="text-4xl font-bold">{lifeScore}</div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {priorities.map((priority, index) => (
              <div key={index} className="flex items-center gap-3 bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
                {priority.completed ? (
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-white opacity-50 flex-shrink-0"></div>
                )}
                <span className={`text-lg ${!priority.completed && 'opacity-70'}`}>
                  {priority.title}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center py-4 border-t border-white border-opacity-30">
            <div className="text-2xl font-bold mb-1">
              {completedCount}/3 Priorities Completed
            </div>
            <div className="text-sm opacity-80">{date}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={shareOnTwitter}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
          >
            Twitter
          </button>
          <button
            onClick={downloadCard}
            className="px-6 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download
          </button>
          <button
            onClick={copyLink}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>

        <p className="text-sm text-gray-500 text-center mt-4">
          Share your journey and inspire others to stay balanced
        </p>
      </div>
    </div>
  );
}
