import { useState } from 'react';
import { X, Mail, Share2, Check, Copy } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [referralCount, setReferralCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const generateReferralCode = async () => {
    const { data, error } = await supabase.rpc('generate_referral_code');
    if (error) throw error;
    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const referredByCode = urlParams.get('ref');
      let referredById = null;

      if (referredByCode) {
        const { data: referrer } = await supabase
          .from('waitlist')
          .select('id')
          .eq('referral_code', referredByCode)
          .maybeSingle();

        if (referrer) {
          referredById = referrer.id;

          await supabase
            .from('waitlist')
            .update({ referral_count: supabase.raw('referral_count + 1') })
            .eq('id', referrer.id);
        }
      }

      const newReferralCode = await generateReferralCode();

      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([
          {
            email,
            referral_code: newReferralCode,
            referred_by: referredById,
          },
        ]);

      if (insertError) {
        if (insertError.message.includes('duplicate') || insertError.code === '23505') {
          setError('This email is already on the waitlist!');
        } else {
          throw insertError;
        }
        return;
      }

      setReferralCode(newReferralCode);
      setSuccess(true);
    } catch (err) {
      console.error('Error joining waitlist:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getReferralUrl = () => {
    return `${window.location.origin}?ref=${referralCode}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getReferralUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const text = `I just joined the waitlist for LIFLO - a productivity app that helps you focus on just 3 priorities a day. Join me!`;
    const url = getReferralUrl();
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative animate-scale-in shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {!success ? (
          <>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Join the Waitlist
            </h2>
            <p className="text-gray-600 mb-6">
              Be among the first to experience a more balanced, productive life.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg transition-colors"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-4 text-center">
              No spam, ever. We respect your privacy.
            </p>
          </>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              You're on the list!
            </h2>
            <p className="text-gray-600 mb-6">
              We'll notify you when LIFLO launches.
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Share2 className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Share with friends</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Get early access by inviting friends. Each referral moves you up the list!
              </p>

              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={getReferralUrl()}
                  readOnly
                  className="flex-1 px-4 py-2 bg-white rounded-lg text-sm border border-gray-200"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>

              <button
                onClick={shareOnTwitter}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Share on Twitter
              </button>

              {referralCount > 0 && (
                <div className="mt-4 text-center">
                  <p className="text-sm font-semibold text-green-600">
                    {referralCount} {referralCount === 1 ? 'friend' : 'friends'} joined through your link!
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
