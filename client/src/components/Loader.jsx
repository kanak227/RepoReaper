import React from "react";
import { Github } from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore } from "../store/app.store";

const Loader = () => {
  const { mode } = useAppStore();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">

      {/* Dual Sweep Arc */}
      <div className="relative flex items-center justify-center w-28 h-28 mb-6">

        <motion.div
          className={`absolute w-28 h-28 rounded-full border-t-[3px] border-r-[3px] ${
            mode === "reaper"
              ? "border-blue-500"
              : "border-yellow-500"
          }`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className={`absolute w-20 h-20 rounded-full border-b-[3px] border-l-[3px] ${
            mode === "reaper"
              ? "border-purple-500"
              : "border-orange-500"
          }`}
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <Github
          className={`w-10 h-10 ${
            mode === "reaper"
              ? "text-white"
              : "text-yellow-100"
          }`}
        />
      </div>

      {/* Logo */}
      <motion.h1
        className="text-3xl sm:text-4xl font-bold tracking-tight mb-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {mode === "reaper" ? (
          <>
            Repo
            <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 bg-clip-text text-transparent">
              Reaper
            </span>
          </>
        ) : (
          <>
            Star
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Sweeper
            </span>
          </>
        )}
      </motion.h1>

      {/* Contribution Grid */}
      <div className="grid grid-cols-5 gap-1 mb-6">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className={`w-3 h-3 rounded-sm border ${
              mode === "reaper"
                ? "border-blue-500/20"
                : "border-yellow-500/20"
            }`}
            initial={{
              backgroundColor: "#2a2a32",
              opacity: 0.35,
              scale: 1,
            }}
            animate={{
              backgroundColor:
                mode === "reaper"
                  ? [
                      "#2a2a32",
                      "#2563eb",
                      "#8b5cf6",
                      "#2a2a32",
                    ]
                  : [
                      "#2a2a32",
                      "#eab308",
                      "#f59e0b",
                      "#2a2a32",
                    ],
              opacity: [0.35, 1, 1, 0.35],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatDelay: 0.4,
              delay:
                (i % 5) * 0.12 +
                Math.floor(i / 5) * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Loading Text */}
      <motion.p
        className="text-slate-400 text-base"
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        {mode === "reaper"
          ? "Mapping the graveyard..."
          : "Charting the stars..."}
      </motion.p>

    </div>
  );
};

export default Loader;