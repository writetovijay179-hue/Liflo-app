import { useState } from 'react';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import DashboardPreview from './components/DashboardPreview';
import WaitlistModal from './components/WaitlistModal';
import ShareCard from './components/ShareCard';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  const mockPriorities = [
    { title: 'Morning workout and meditation', completed: true },
    { title: 'Finish client presentation deck', completed: true },
    { title: 'Call mom and catch up', completed: false },
  ];

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Hero onJoinWaitlist={() => setIsWaitlistOpen(true)} />
        <HowItWorks />
        <Benefits />
        <DashboardPreview />

        <section className="py-24 px-6 bg-gradient-to-br from-blue-600 to-green-600 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to find your balance?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of people who are simplifying their lives, one day at a time.
            </p>
            <button
              onClick={() => setIsWaitlistOpen(true)}
              className="px-10 py-5 bg-white text-blue-600 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Join the Waitlist
            </button>
          </div>
        </section>

        <footer className="py-12 px-6 bg-gray-900 text-gray-400 text-center">
          <div className="max-w-6xl mx-auto">
            <div className="text-2xl font-bold text-white mb-4">LIFLO</div>
            <p className="mb-6">Your life, balanced in 3 priorities a day</p>
            <div className="flex justify-center gap-8 mb-6">
              <button className="hover:text-white transition-colors">About</button>
              <button className="hover:text-white transition-colors">Privacy</button>
              <button className="hover:text-white transition-colors">Terms</button>
              <button className="hover:text-white transition-colors">Contact</button>
            </div>
            <p className="text-sm">© 2026 LIFLO. All rights reserved.</p>
          </div>
        </footer>

        <WaitlistModal
          isOpen={isWaitlistOpen}
          onClose={() => setIsWaitlistOpen(false)}
        />

        <ShareCard
          isOpen={isShareCardOpen}
          onClose={() => setIsShareCardOpen(false)}
          priorities={mockPriorities}
          date="Friday, March 14, 2026"
          lifeScore={73}
        />

        <button
          onClick={() => setIsShareCardOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-40"
          title="Share your progress"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </button>
      </div>
    </AuthProvider>
  );
}

export default App;
