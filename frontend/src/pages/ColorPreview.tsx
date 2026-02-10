export default function ColorPreviewOcean() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-sky-600 dark:text-sky-400 mb-2">
            Color Preview - Ocean Depth
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Professional, trustworthy, calm - Perfect for learning platforms
          </p>
        </div>

        {/* Navbar Preview */}
        <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Navbar
          </h2>
          <div className="flex items-center gap-6">
            <span className="text-2xl font-bold text-sky-600 dark:text-sky-400">
              Skillsphere
            </span>
            <div className="flex gap-4 text-slate-600 dark:text-slate-300">
              <a className="hover:text-sky-600 dark:hover:text-sky-400 transition">
                Discover
              </a>
              <a className="hover:text-sky-600 dark:hover:text-sky-400 transition">
                My Journey
              </a>
              <a className="hover:text-sky-600 dark:hover:text-sky-400 transition">
                Projects
              </a>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Buttons
          </h2>
          <div className="flex gap-4 flex-wrap">
            <button className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition">
              Primary Button
            </button>
            <button className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition">
              Secondary Button
            </button>
            <button className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition">
              Accent Button
            </button>
            <button className="px-6 py-2 border-2 border-sky-600 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-700 rounded-lg transition">
              Outline Button
            </button>
          </div>
        </section>

        {/* Cards */}
        <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Cards
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {/* Regular Card */}
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
              <h3 className="font-bold text-slate-900 dark:text-slate-50 mb-2">
                Card Title
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                This is card content with the Ocean Depth color scheme.
              </p>
            </div>

            {/* Gradient Card */}
            <div className="bg-gradient-to-br from-sky-500 to-cyan-500 rounded-lg p-4 text-white">
              <h3 className="font-bold mb-2">Gradient Card</h3>
              <p className="text-sm text-white/90">
                Sky blue to cyan gradient background.
              </p>
            </div>

            {/* Accent Card */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h3 className="font-bold text-amber-900 dark:text-amber-400 mb-2">
                Achievement
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                +50 XP earned!
              </p>
            </div>
          </div>
        </section>

        {/* Profile Card (Journey Style) */}
        <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Profile Card Preview
          </h2>
          <div className="bg-gradient-to-br from-sky-500/10 to-cyan-500/10 dark:from-sky-400/20 dark:to-cyan-400/20 backdrop-blur-sm border border-sky-200 dark:border-sky-800 rounded-2xl p-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center text-3xl font-bold text-white">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  Aspiring Developer
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Level 3 • 425 XP
                </p>

                {/* XP Bar */}
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-[62%] bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Text Hierarchy */}
        <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Typography
          </h2>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">
              Heading 1
            </h1>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              Heading 2
            </h2>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              Heading 3
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Body text: This is how regular paragraph text will look with the
              Ocean Depth scheme.
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-sm">
              Muted text: Used for less important information.
            </p>
          </div>
        </section>

        {/* Skill Tree Card Preview */}
        <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Skill Tree Card
          </h2>
          <div className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-32 bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
              Course Thumbnail
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-900 dark:text-slate-50 mb-2">
                Full-Stack Developer
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                Master frontend and backend development
              </p>

              {/* Progress */}
              <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mb-2">
                <span>Progress</span>
                <span className="font-bold text-sky-600 dark:text-sky-400">
                  42%
                </span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                <div className="h-full w-[42%] bg-gradient-to-r from-sky-500 to-cyan-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Achievement Badges */}
        <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Achievement Badges
          </h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-1 rounded-xl shadow-lg shadow-emerald-500/30">
              <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🏆</div>
                <p className="text-white text-sm font-semibold">First Steps</p>
                <p className="text-amber-400 text-xs mt-1">+50 XP</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-sky-500 to-sky-600 p-1 rounded-xl shadow-lg shadow-sky-500/30">
              <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">⚡</div>
                <p className="text-white text-sm font-semibold">
                  Speed Learner
                </p>
                <p className="text-amber-400 text-xs mt-1">+100 XP</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 p-1 rounded-xl shadow-lg shadow-cyan-500/30">
              <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🔥</div>
                <p className="text-white text-sm font-semibold">Week Warrior</p>
                <p className="text-amber-400 text-xs mt-1">+200 XP</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-1 rounded-xl shadow-lg shadow-amber-500/50">
              <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">👑</div>
                <p className="text-white text-sm font-semibold">Legendary</p>
                <p className="text-amber-400 text-xs mt-1">+500 XP</p>
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette Reference */}
        <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Color Palette
          </h2>
          <div className="grid grid-cols-5 gap-4">
            <div>
              <div className="h-20 bg-sky-500 rounded-lg mb-2 shadow-lg" />
              <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                Primary
              </p>
              <p className="text-xs text-slate-400">#0EA5E9</p>
            </div>
            <div>
              <div className="h-20 bg-cyan-500 rounded-lg mb-2 shadow-lg" />
              <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                Secondary
              </p>
              <p className="text-xs text-slate-400">#06B6D4</p>
            </div>
            <div>
              <div className="h-20 bg-amber-500 rounded-lg mb-2 shadow-lg" />
              <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                Accent
              </p>
              <p className="text-xs text-slate-400">#F59E0B</p>
            </div>
            <div>
              <div className="h-20 bg-slate-900 dark:bg-slate-50 rounded-lg mb-2 shadow-lg" />
              <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                Text
              </p>
              <p className="text-xs text-slate-400">#0F172A</p>
            </div>
            <div>
              <div className="h-20 bg-slate-100 dark:bg-slate-700 rounded-lg mb-2 shadow-lg" />
              <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                Surface
              </p>
              <p className="text-xs text-slate-400">#F1F5F9</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
