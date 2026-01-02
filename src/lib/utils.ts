export const getOwnerGlow = (rawName: string) => {
  const cleanName = rawName.replace(/\s*OAD\s*/i, "").trim();
  
  const glowMap: Record<string, string> = {
    "Cam":   "shadow-purple-500/20 border-purple-500/30",
    "Drew":  "shadow-orange-500/20 border-orange-500/30",
    "Jon":   "shadow-emerald-500/20 border-emerald-500/30",
    "Pete":  "shadow-red-500/20 border-red-500/30",
    "Ross":  "shadow-blue-600/20 border-blue-600/30",
    "Ryan":  "shadow-gentle-gold/20 border-gentle-gold/30",
    "Scott": "shadow-cyan-400/20 border-cyan-400/30",
    "Tyler": "shadow-yellow-500/20 border-yellow-500/30",
  };

  return glowMap[cleanName] || "shadow-white/5 border-white/10";
};

export const getOwnerColor = (rawName: string) => {
  if (!rawName) return "bg-white/10";
  const cleanName = rawName.replace(/\s*OAD\s*/i, "").trim();

  const ownerColors: Record<string, string> = {
    "Cam":   "bg-purple-500",   
    "Drew":  "bg-orange-500",      
    "Jon":   "bg-emerald-500",       
    "Pete":  "bg-red-500",   
    "Ross":  "bg-blue-600",    
    "Ryan":  "bg-gentle-gold",    
    "Scott": "bg-cyan-400",      
    "Tyler": "bg-yellow-500",      
  };

  return ownerColors[cleanName] || "bg-white/20";
};

export const getOwnerBarColor = (rawName: string) => {
  if (!rawName) return { core: "bg-white/20", oad: "bg-white/5" };
  const cleanName = rawName.replace(/\s*OAD\s*/i, "").trim();

  const colorMap: Record<string, { core: string; oad: string }> = {
    "Cam":   { core: "bg-purple-500",  oad: "bg-purple-500/20" },
    "Drew":  { core: "bg-orange-500",  oad: "bg-orange-500/20" },
    "Jon":   { core: "bg-emerald-500", oad: "bg-emerald-500/20" },
    "Pete":  { core: "bg-red-600",     oad: "bg-red-600/20" },
    "Ross":  { core: "bg-blue-600",    oad: "bg-blue-600/20" },
    "Ryan":  { core: "bg-gentle-gold", oad: "bg-gentle-gold/20" },
    "Scott": { core: "bg-cyan-400",    oad: "bg-cyan-400/20" },
    "Tyler": { core: "bg-yellow-500",  oad: "bg-yellow-500/20" },
  };

  return colorMap[cleanName] || { core: "bg-white/20", oad: "bg-white/5" };
};

export const getOwnerVerticalGlow = (rawName: string) => {
  if (!rawName) return { bar: "bg-white/20", spread: "from-white/5" };
  const cleanName = rawName.replace(/\s*OAD\s*/i, "").trim();

  const glowMap: Record<string, { bar: string, spread: string }> = {
    "Cam":   { bar: "bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]", spread: "from-purple-500/20" },
    "Drew":  { bar: "bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.8)]", spread: "from-orange-500/20" },
    "Jon":   { bar: "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]", spread: "from-emerald-500/20" },
    "Pete":  { bar: "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]", spread: "from-red-500/20" },
    "Ross":  { bar: "bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]", spread: "from-blue-600/20" },
    "Ryan":  { bar: "bg-gentle-gold shadow-[0_0_15px_rgba(234,179,8,0.8)]", spread: "from-gentle-gold/20" },
    "Scott": { bar: "bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]", spread: "from-cyan-400/20" },
    "Tyler": { bar: "bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.8)]", spread: "from-yellow-500/20" },
  };

  return glowMap[cleanName] || { bar: "bg-white/20", spread: "from-white/5" };
};