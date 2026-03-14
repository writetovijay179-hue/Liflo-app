import { CheckCircle2, Circle, TrendingUp, Calendar, Award } from 'lucide-react';

export default function DashboardPreview() {
  const mockPriorities = [
    { id: 1, title: 'Morning workout and meditation', completed: true, category: 'Health' },
    { id: 2, title: 'Finish client presentation deck', completed: true, category: 'Work' },
    { id: 3, title: 'Call mom and catch up', completed: false, category: 'Relationships' },
  ];

  const weeklyStats = [
    { day: 'Mon', completed: 3 },
    { day: 'Tue', completed: 3 },
    { day: 'Wed', completed: 2 },
    { day: 'Thu', completed: 3 },
    { day: 'Fri', completed: 3 },
    { day: 'Sat', completed: 1 },
    { day: 'Sun', completed: 0 },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your daily command center
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A beautiful, distraction-free interface designed to keep you focused
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Today's Priorities</h3>
                  <p className="text-gray-500 mt-1">Friday, March 14, 2026</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Week 11</span>
                </div>
              </div>

              {mockPriorities.map((priority, index) => (
                <div
                  key={priority.id}
                  className="group bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 pt-1">
                      {priority.completed ? (
                        <CheckCircle2 className="w-7 h-7 text-green-500" />
                      ) : (
                        <Circle className="w-7 h-7 text-gray-300 group-hover:text-blue-400 transition-colors" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                          Priority {index + 1}
                        </span>
                        <span className="text-xs text-gray-500">{priority.category}</span>
                      </div>
                      <p className={`text-lg font-medium ${priority.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                        {priority.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Life Score</h4>
                </div>

                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.73)}`}
                      className="text-green-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">73</div>
                      <div className="text-xs text-gray-500">Score</div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-center text-gray-600">
                  Keep it up! You're building great momentum.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-gray-900">This Week</h4>
                </div>

                <div className="flex items-end justify-between gap-2 h-24 mb-3">
                  {weeklyStats.map((stat) => (
                    <div key={stat.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-t from-blue-500 to-green-500 rounded-full transition-all duration-500"
                          style={{ height: `${(stat.completed / 3) * 80}px` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{stat.day}</span>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-green-600">15/21</span> priorities completed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
