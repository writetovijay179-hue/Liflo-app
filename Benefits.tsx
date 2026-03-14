import { Brain, Zap, Heart, Award } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: Brain,
      title: 'Reduce Decision Fatigue',
      description: 'Stop wasting mental energy on endless task lists. Focus on what truly matters.',
    },
    {
      icon: Zap,
      title: 'Boost Productivity',
      description: 'Complete more meaningful work by eliminating distractions and prioritizing ruthlessly.',
    },
    {
      icon: Heart,
      title: 'Find Balance',
      description: 'Create harmony between work, health, relationships, and personal growth.',
    },
    {
      icon: Award,
      title: 'Build Consistency',
      description: 'Develop powerful habits and track your progress with visual insights.',
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why limit to 3 priorities?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Research shows that focusing on fewer tasks leads to better outcomes.
            LIFLO embraces this principle to help you achieve real balance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center mb-6">
                <benefit.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-100">
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 mb-4">
            "If you have more than three priorities, you have no priorities."
          </blockquote>
          <p className="text-gray-500">— Jim Collins, Author of Good to Great</p>
        </div>
      </div>
    </section>
  );
}
