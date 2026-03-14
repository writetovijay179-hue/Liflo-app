import { Target, CheckCircle2, TrendingUp } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Target,
      title: 'Choose 3 Priorities',
      description: 'Each morning, select your three most important tasks for the day. No more, no less.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: CheckCircle2,
      title: 'Focus & Complete',
      description: 'Work through your priorities with laser focus. LIFLO keeps you accountable and on track.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: TrendingUp,
      title: 'Track & Improve',
      description: 'See your progress, build momentum, and watch your life score grow as you stay balanced.',
      color: 'from-teal-500 to-teal-600',
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple by design
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three steps to a more balanced, productive life
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group hover:scale-105 transition-transform duration-300"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>

              <div className="relative bg-white rounded-2xl p-8 border-2 border-gray-100">
                <div className="absolute -top-6 left-8">
                  <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {index + 1}
                  </div>
                </div>

                <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 mt-4`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
