import {
  ArrowRight,
  GitBranch,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  Flame,
  Clock,
} from "lucide-react";

function LandingPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-t from-[#000C40] to-[#F0F2F0]">
        <section>
          <div className="text-center px-4">
            <div className="mt-5 inline-flex items-center gap-2 bg-[#000C40]/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
              <Sparkles className="text-yellow-300" size={20} />
              <span className="text-sm text-white">
                Level Up Your Skills with RPG-Style Learning
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl mb-6 text-white">
              Master Skills Through
              <br />
              <span className="bg-gradient-to-r from-[#FF7E5F] via-[#FEB47B] to-[#F0F2F0] bg-clip-text text-transparent">
                Visual Progression Trees
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              No more endless video lists. See your entire learning journey
              mapped out like an RPG skill tree. Build projects, unlock new
              abilities, and level up with peers in real-time.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
              <button className="bg-white text-[#FF7E5F] px-8 py-4 rounded-xl flex items-center gap-2 hover:bg-purple-50 transition-all hover:scale-105 shadow-lg">
                <GitBranch size={24} />
                Explore Skill Trees
                <ArrowRight size={24} />
              </button>
              <button className="border-2 border-[#FF7E5F] text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-colors backdrop-blur-sm">
                Join Live Cohort
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-3xl mb-1 text-white">34K+</div>
                <div className="text-purple-200 text-sm">Active Learners</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-3xl mb-1 text-white">250+</div>
                <div className="text-purple-200 text-sm">Skill Trees</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-3xl mb-1 text-white">15K+</div>
                <div className="text-purple-200 text-sm">Projects Built</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-3xl mb-1 text-white">98%</div>
                <div className="text-purple-200 text-sm">Completion Rate</div>
              </div>
            </div>
          </div>
        </section>
        <br />
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 dark:text-green-400">
                    Live Now
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl text-gray-900 dark:text-white">
                  Active Learning Cohorts
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Join thousands learning together in real-time
                </p>
              </div>
              <button className="hidden md:block text-[#FF7E5F] dark:text-[#FF7E5F] hover:underline flex items-center gap-2">
                View All
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:scale-105 cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 dark:text-green-400">
                        Live Study Session
                      </span>
                    </div>
                    <h3 className="text-lg mb-1 text-gray-900 dark:text-white group-hover:text-[#FF7E5F] dark:group-hover:text-[#FF7E5F] transition-colors">
                      Full-Stack Developer
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Started Jan 20, 2026
                    </p>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                    <Users className="text-[#FF7E5F] dark:text-[#FF7E5F]" />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Next Milestone
                    </span>
                    <span className="text-gray-900 dark:text-white">45%</span>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden mb-2">
                    <div className="bg-gradient-to-r from-[#FF7E5F] via-[#FEB47B] to-[#F0F2F0] h-full transition-all"></div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Build E-Commerce Platform
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FF7E5F] via-[#FEB47B] to-[#F0F2F0] rounded-full border-2 border-white dark:border-gray-800"></div>
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FF7E5F] via-[#FEB47B] to-[#F0F2F0] rounded-full border-2 border-white dark:border-gray-800"></div>
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FF7E5F] via-[#FEB47B] to-[#F0F2F0] rounded-full border-2 border-white dark:border-gray-800"></div>
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FF7E5F] via-[#FEB47B] to-[#F0F2F0] rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                    <span className="text-gray-900 dark:text-white">
                      <strong>247</strong> online now
                    </span>
                  </div>
                  <button className="text-[#FF7E5F] dark:text-[#FF7E5F] hover:underline text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Join <ArrowRight size={12} />
                  </button>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:scale-105 cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 dark:text-green-400">
                        Live Study Session
                      </span>
                    </div>
                    <h3 className="text-lg mb-1 text-gray-900 dark:text-white group-hover:text-[#FF7E5F] dark:group-hover:text-[#FF7E5F] transition-colors">
                      AI Engineer
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Started Jan 15, 2026
                    </p>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                    <Users className="text-[#FF7E5F] dark:text-[#FF7E5F]" />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Next Milestone
                    </span>
                    <span className="text-gray-900 dark:text-white">62%</span>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden mb-2">
                    <div className="bg-gradient-to-r from-[#FF7E5F] via-[#FEB47B] to-[#F0F2F0] h-full transition-all"></div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Train Custom LLM Model
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FF7E5F] via-[#FEB47B] to-[#F0F2F0] rounded-full border-2 border-white dark:border-gray-800"></div>
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FF7E5F] via-[#FEB47B] to-[#F0F2F0] rounded-full border-2 border-white dark:border-gray-800"></div>
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FF7E5F] via-[#FEB47B] to-[#F0F2F0] rounded-full border-2 border-white dark:border-gray-800"></div>
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FF7E5F] via-[#FEB47B] to-[#F0F2F0] rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                    <span className="text-gray-900 dark:text-white">
                      <strong>189</strong> online now
                    </span>
                  </div>
                  <button className="text-[#FF7E5F] dark:text-[#FF7E5F] hover:underline text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Join <ArrowRight size={12} />
                  </button>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:scale-105 cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 dark:text-green-400">
                        Live Study Session
                      </span>
                    </div>
                    <h3 className="text-lg mb-1 text-gray-900 dark:text-white group-hover:text-[#FF7E5F] dark:group-hover:text-[#FF7E5F] transition-colors">
                      Product Designer
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Started Jan 18, 2026
                    </p>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                    <Users className="text-[#FF7E5F] dark:text-[#FF7E5F]" />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Next Milestone
                    </span>
                    <span className="text-gray-900 dark:text-white">38%</span>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden mb-2">
                    <div className="bg-gradient-to-r from-[#FF7E5F] via-[#FEB47B] to-[#F0F2F0] h-full transition-all"></div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Complete Mobile App Design
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FF7E5F] via-[#FEB47B] to-[#F0F2F0] rounded-full border-2 border-white dark:border-gray-800"></div>
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FF7E5F] via-[#FEB47B] to-[#F0F2F0] rounded-full border-2 border-white dark:border-gray-800"></div>
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FF7E5F] via-[#FEB47B] to-[#F0F2F0] rounded-full border-2 border-white dark:border-gray-800"></div>
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FF7E5F] via-[#FEB47B] to-[#F0F2F0] rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                    <span className="text-gray-900 dark:text-white">
                      <strong>156</strong> online now
                    </span>
                  </div>
                  <button className="text-[#FF7E5F] dark:text-[#FF7E5F] hover:underline text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Join <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#FF7E5F] via-[#FEB47B] to-[#F0F2F0] dark:from-[#FF7E5F]/20 dark:via-[#FEB47B]/20 dark:to-[#F0F2F0]/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-shrink-0 bg-gradient-to-br from-[#FF7E5F] via-[#FEB47B] to-[#F0F2F0] p-4 rounded-xl">
                  <Zap className="text-white" size={32} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg mb-1 text-gray-900 dark:text-white">
                    Start Your Own Cohort
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Gather your friends, set a start date, and learn any skill
                    tree together with shared milestones and accountability.
                  </p>
                </div>
                <button className="bg-gradient-to-r from-[#FF7E5F] via-[#FEB47B] to-[#F0F2F0] text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap">
                  Create Cohort
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp
                    className="text-[#FF7E5F] dark:text-[#FF7E5F]"
                    size={20}
                  />
                  <span className="text-sm text-[#FF7E5F] dark:text-[#FF7E5F]">
                    Most Popular
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl text-gray-900 dark:text-white">
                  Trending Skill Trees
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Career paths with proven outcomes
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Full-Stack Developer */}
              <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all hover:scale-105 cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1565229284535-2cbbe3049123?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZ3xlbnwxfHx8fDE3NjgyODM4NTZ8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                    alt="Full-Stack Developer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-xs text-white/90 mb-1">
                      Development
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-[#FF7E5F] text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <Flame className="lucide lucide-flame size-3" />
                    In Progress
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg mb-3 text-gray-900 dark:text-white group-hover:text-[#FF7E5F] dark:group-hover:text-[#FF7E5F] transition-colors">
                    Full-Stack Developer
                  </h3>
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">
                        Your Progress
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        8/24
                      </span>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-[#FF7E5F] to-[#F0F2F0] h-full transition-all" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="lucide lucide-users size-4" />
                      <span>12.8K learners</span>
                    </div>
                    <button className="text-[#FF7E5F] dark:text-[#FF7E5F] hover:underline text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Continue
                      <ArrowRight size={24} />
                    </button>
                  </div>
                </div>
              </div>

              {/* AI Engineer */}
              <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all hover:scale-105 cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbmV0d29ya3xlbnwxfHx8fDE3NjgzNDA3Njd8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                    alt="AI Engineer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-xs text-white/90 mb-1">
                      Machine Learning
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg mb-3 text-gray-900 dark:text-white group-hover:text-[#FF7E5F] dark:group-hover:text-[#FF7E5F] transition-colors">
                    AI Engineer
                  </h3>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <GitBranch className="lucide lucide-git-branch size-4" />
                      <span>18 skill nodes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="lucide lucide-clock size-4" />
                      <span>~95 hours</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="lucide lucide-users size-4" />
                      <span>8.5K learners</span>
                    </div>
                    <button className="text-[#FF7E5F] dark:text-[#FF7E5F] hover:underline text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Start
                      <ArrowRight className="lucide lucide-arrow-right size-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Designer */}
              <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all hover:scale-105 cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1557243962-0a093922933f?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBjcmVhdGl2ZXxlbnwxfHx8fDE3NjgzNTYyMjJ8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                    alt="Product Designer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-xs text-white/90 mb-1">Design</div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg mb-3 text-gray-900 dark:text-white group-hover:text-[#FF7E5F] dark:group-hover:text-[#FF7E5F] transition-colors">
                    Product Designer
                  </h3>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <GitBranch className="lucide lucide-git-branch size-4" />
                      <span>21 skill nodes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="lucide lucide-clock size-4" />
                      <span>~85 hours</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="lucide lucide-users size-4" />
                      <span>6.7K learners</span>
                    </div>
                    <button className="text-[#FF7E5F] dark:text-[#FF7E5F] hover:underline text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Start
                      <ArrowRight className="lucide lucide-arrow-right size-3" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all hover:scale-105 cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1707528041466-83a325f01a3c?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY4Mjg0MjM3fDA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                    alt="DevOps Specialist"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-xs text-white/90 mb-1">
                      Cloud &amp; Infrastructure
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg mb-3 text-gray-900 dark:text-white group-hover:text-[#FF7E5F] dark:group-hover:text-[#FF7E5F] transition-colors">
                    DevOps Specialist
                  </h3>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <GitBranch className="lucide lucide-git-branch size-4" />
                      <span>16 skill nodes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="lucide lucide-clock size-4" />
                      <span>~75 hours</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="lucide lucide-users size-4" />
                      <span>5.4K learners</span>
                    </div>
                    <button className="text-[#FF7E5F] dark:text-[#FF7E5F] hover:underline text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Start
                      <ArrowRight size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default LandingPage;
