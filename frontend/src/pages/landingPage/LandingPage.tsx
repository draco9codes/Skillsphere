import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Zap,
  Users,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-blue-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#5B8DB0] rounded-full opacity-10 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4F9EAF] rounded-full opacity-10 blur-3xl animate-pulse [animation-delay:1s]" />

        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5B8DB0]/10 to-[#4F9EAF]/10 border border-[#5B8DB0]/20 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-[#5B8DB0]" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Your Learning Journey Starts Here
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold font-space-grotesk mb-6">
              <span className="text-neutral-900 dark:text-white">
                Master Skills,
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] bg-clip-text text-transparent">
                Level Up Your Career
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join Skillsphere and embark on a gamified learning adventure.
              Track progress, earn achievements, and become the developer you've
              always wanted to be.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/discover">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] text-white rounded-xl font-semibold font-space-grotesk shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Learning
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link to="/journey">
                <motion.button
                  className="px-8 py-4 bg-white dark:bg-neutral-800 text-[#5B8DB0] dark:text-[#7DA8C3] border-2 border-[#5B8DB0] dark:border-[#7DA8C3] rounded-xl font-semibold font-space-grotesk hover:bg-[#5B8DB0] hover:text-white dark:hover:bg-[#7DA8C3] dark:hover:text-neutral-900 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Your Journey
                </motion.button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#5B8DB0] dark:text-[#7DA8C3] font-space-grotesk">
                  50+
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Skill Trees
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#4F9EAF] dark:text-[#6BB4C4] font-space-grotesk">
                  1000+
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Learners
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FF7E5F] dark:text-[#FF9677] font-space-grotesk">
                  95%
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Success Rate
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-white dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white font-space-grotesk mb-4">
              Why Choose Skillsphere?
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              Learn smarter with our gamified approach to education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <motion.div
              className="bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-700 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#5B8DB0] to-[#4F9EAF] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 font-space-grotesk">
                Structured Learning Paths
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Follow curated skill trees designed by industry experts
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-700 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#4F9EAF] to-[#5B8DB0] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 font-space-grotesk">
                Gamified Experience
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Earn XP, level up, and unlock achievements as you learn
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-700 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#FF7E5F] to-[#FF9677] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 font-space-grotesk">
                Collaborative Learning
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Join study rooms and learn together with peers
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              className="bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-700 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#5B8DB0] to-[#FF7E5F] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 font-space-grotesk">
                Track Your Progress
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Visualize your journey with detailed analytics and insights
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="bg-gradient-to-r from-[#5B8DB0] to-[#4F9EAF] rounded-3xl p-12 text-center text-white relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-4xl font-bold font-space-grotesk mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join thousands of learners achieving their goals every day
              </p>
              <Link to="/discover">
                <motion.button
                  className="px-10 py-4 bg-white text-[#5B8DB0] rounded-xl font-bold font-space-grotesk shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Skill Trees
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
