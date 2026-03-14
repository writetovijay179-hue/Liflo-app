import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onJoinWaitlist: () => void;
}

export default function Hero({ onJoinWaitlist }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50"></div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium animate-fade-in">
          Focus on what matters most
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up">
          Your life, balanced in{' '}
          <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            3 priorities
          </span>{' '}
          a day
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
          Stop overwhelming yourself with endless to-do lists. LIFLO helps you stay balanced
          by focusing on just three meaningful priorities each day.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
          <button
            onClick={onJoinWaitlist}
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            Join the Waitlist
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200">
            See How It Works
          </button>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-500 animate-fade-in animation-delay-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Free forever</span>
          </div>
        </div>
      </div>
    </section>
  );
}
