"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Theme {
  name: string;
  label: string;
  mood: string;
  bg: string;
  textColor: string;
  accentColor: string;
  glowColor: string;
  particleColor: string;
  fontStyle: string;
  separator: string;
}

const themes: Theme[] = [
  {
    name: "midnight",
    label: "Midnight",
    mood: "Calm & Deep",
    bg: "from-[#0a0a1a] via-[#0d1033] to-[#0a0a1a]",
    textColor: "text-blue-200",
    accentColor: "text-blue-400",
    glowColor: "shadow-blue-500/50",
    particleColor: "bg-blue-400/20",
    fontStyle: "font-mono",
    separator: ":",
  },
  {
    name: "sunset",
    label: "Sunset",
    mood: "Warm & Peaceful",
    bg: "from-[#1a0a0a] via-[#2d1b0e] to-[#1a0505]",
    textColor: "text-orange-200",
    accentColor: "text-amber-400",
    glowColor: "shadow-orange-500/50",
    particleColor: "bg-orange-400/20",
    fontStyle: "font-mono",
    separator: ".",
  },
  {
    name: "aurora",
    label: "Aurora",
    mood: "Magical & Ethereal",
    bg: "from-[#0a1a0a] via-[#0a2020] to-[#1a0a2a]",
    textColor: "text-emerald-200",
    accentColor: "text-teal-400",
    glowColor: "shadow-emerald-500/50",
    particleColor: "bg-emerald-400/20",
    fontStyle: "font-mono",
    separator: ":",
  },
  {
    name: "neon",
    label: "Neon City",
    mood: "Electric & Bold",
    bg: "from-[#0a0014] via-[#14001f] to-[#0a0014]",
    textColor: "text-fuchsia-200",
    accentColor: "text-pink-400",
    glowColor: "shadow-fuchsia-500/60",
    particleColor: "bg-fuchsia-400/20",
    fontStyle: "font-mono",
    separator: "|",
  },
  {
    name: "ocean",
    label: "Deep Ocean",
    mood: "Serene & Flowing",
    bg: "from-[#000a14] via-[#001428] to-[#000a14]",
    textColor: "text-cyan-200",
    accentColor: "text-sky-400",
    glowColor: "shadow-cyan-500/50",
    particleColor: "bg-cyan-400/20",
    fontStyle: "font-mono",
    separator: "~",
  },
  {
    name: "minimal",
    label: "Minimal",
    mood: "Clean & Focused",
    bg: "from-[#fafafa] via-[#f5f5f5] to-[#fafafa]",
    textColor: "text-zinc-800",
    accentColor: "text-zinc-500",
    glowColor: "shadow-zinc-300/50",
    particleColor: "bg-zinc-300/30",
    fontStyle: "font-mono",
    separator: ":",
  },
  {
    name: "cherry",
    label: "Cherry Blossom",
    mood: "Soft & Delicate",
    bg: "from-[#1a0a10] via-[#200d18] to-[#1a0a10]",
    textColor: "text-rose-200",
    accentColor: "text-pink-300",
    glowColor: "shadow-rose-400/50",
    particleColor: "bg-rose-400/20",
    fontStyle: "font-mono",
    separator: "\u2022",
  },
];

function FloatingParticle({ color, index }: { color: string; index: number }) {
  const [height, setHeight] = useState(1000);
  const randomX = Math.random() * 100;
  const randomDelay = Math.random() * 5;
  const randomDuration = 8 + Math.random() * 12;
  const randomSize = 2 + Math.random() * 4;

  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  return (
    <motion.div
      className={`absolute rounded-full ${color}`}
      style={{
        width: randomSize,
        height: randomSize,
        left: `${randomX}%`,
        bottom: "-10%",
      }}
      animate={{
        y: [0, -height * 1.2],
        x: [0, Math.sin(index) * 60],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
        ease: "linear",
      }}
    />
  );
}

function TimeDigit({
  digit,
  theme,
}: {
  digit: string;
  theme: Theme;
}) {
  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={digit}
          initial={{ y: 30, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -30, opacity: 0, filter: "blur(6px)" }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`inline-block ${theme.textColor} ${theme.fontStyle}`}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function DigitalClock() {
  const [time, setTime] = useState(new Date());
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const theme = themes[currentThemeIndex];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const switchTheme = useCallback(
    (index: number) => {
      if (index === currentThemeIndex || isTransitioning) return;
      setIsTransitioning(true);
      setCurrentThemeIndex(index);
      setTimeout(() => setIsTransitioning(false), 800);
    },
    [currentThemeIndex, isTransitioning]
  );

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  const dateStr = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (!isMounted) {
    return (
      <div className="relative w-full h-dvh overflow-hidden select-none bg-[#0a0a1a]" />
    );
  }

  return (
    <div className="relative w-full h-dvh overflow-hidden select-none">
      {/* Background transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={theme.name}
          className={`absolute inset-0 bg-gradient-to-b ${theme.bg}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <FloatingParticle key={`${theme.name}-${i}`} color={theme.particleColor} index={i} />
        ))}
      </div>

      {/* Ambient glow - smaller on mobile */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full opacity-20 blur-[80px] md:blur-[120px]"
        style={{
          background: theme.name === "minimal"
            ? "radial-gradient(circle, rgba(120,120,120,0.3), transparent)"
            : `radial-gradient(circle, ${theme.name === "midnight" ? "rgba(59,130,246,0.3)" :
              theme.name === "sunset" ? "rgba(251,146,60,0.3)" :
              theme.name === "aurora" ? "rgba(52,211,153,0.3)" :
              theme.name === "neon" ? "rgba(217,70,239,0.3)" :
              theme.name === "ocean" ? "rgba(34,211,238,0.3)" :
              theme.name === "cherry" ? "rgba(244,114,182,0.3)" :
              "rgba(59,130,246,0.3)"
            }, transparent)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main clock content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Date display */}
        <motion.p
          className={`text-[10px] sm:text-xs md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-8 ${theme.accentColor} opacity-70 text-center`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {dateStr}
        </motion.p>

        {/* Time display - portrait friendly layout */}
        <motion.div
          className="flex items-center justify-center w-full"
          layout
          transition={{ type: "spring", stiffness: 100 }}
        >
          {/* On very small screens, show HH:MM stacked with seconds below */}
          <div className="flex flex-col items-center">
            {/* Main time row */}
            <div className="flex items-baseline gap-1 sm:gap-2 md:gap-4">
              {/* Hours */}
              <div className="flex text-[3.5rem] sm:text-7xl md:text-[10rem] lg:text-[12rem] font-thin tracking-tight leading-none">
                <TimeDigit digit={hours[0]} theme={theme} />
                <TimeDigit digit={hours[1]} theme={theme} />
              </div>

              {/* Separator */}
              <motion.span
                className={`text-3xl sm:text-5xl md:text-8xl lg:text-9xl ${theme.accentColor} font-thin leading-none`}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {theme.separator}
              </motion.span>

              {/* Minutes */}
              <div className="flex text-[3.5rem] sm:text-7xl md:text-[10rem] lg:text-[12rem] font-thin tracking-tight leading-none">
                <TimeDigit digit={minutes[0]} theme={theme} />
                <TimeDigit digit={minutes[1]} theme={theme} />
              </div>

              {/* Separator */}
              <motion.span
                className={`text-3xl sm:text-5xl md:text-8xl lg:text-9xl ${theme.accentColor} font-thin leading-none`}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              >
                {theme.separator}
              </motion.span>

              {/* Seconds */}
              <div className="flex text-[3.5rem] sm:text-7xl md:text-[10rem] lg:text-[12rem] font-thin tracking-tight leading-none">
                <TimeDigit digit={seconds[0]} theme={theme} />
                <TimeDigit digit={seconds[1]} theme={theme} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mood label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={theme.name}
            className="mt-6 sm:mt-10 text-center"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
          >
            <p className={`text-sm sm:text-lg md:text-xl tracking-[0.15em] sm:tracking-[0.2em] ${theme.accentColor} font-light`}>
              {theme.mood}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Theme switcher - scrollable on mobile */}
        <motion.div
          className="absolute bottom-6 sm:bottom-10 left-0 right-0 flex justify-center px-3 sm:px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-full">
            {themes.map((t, index) => (
              <motion.button
                key={t.name}
                onClick={() => switchTheme(index)}
                className={`relative px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs md:text-sm tracking-wider transition-all duration-300 ${
                  index === currentThemeIndex
                    ? `${theme.textColor} border border-current opacity-100`
                    : `${theme.textColor} opacity-40 hover:opacity-70 border border-transparent`
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {index === currentThemeIndex && (
                  <motion.div
                    className={`absolute inset-0 rounded-full ${theme.particleColor}`}
                    layoutId="activeTheme"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
