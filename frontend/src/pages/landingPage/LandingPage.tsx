import { ArrowRight, GitBranch, Sparkles } from "lucide-react";
import { useState } from "react";

function LandingPage() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-[#000C40] to-[#F0F2F0]">
        <section>
          <div className="text-center px-4">
            <div className="inline-flex items-center gap-2 bg-[#000C40]/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
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
        <section></section>
      </div>
    </>
  );
}

export default LandingPage;
