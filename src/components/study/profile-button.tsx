"use client";

import * as React from "react";
import { useState, useRef } from "react";
import { User, Camera, ShieldAlert, Award, Calendar, Timer, BookOpen, Quote, Save } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStudyStore, overallStats, gamification } from "@/lib/store";
import { fmtDuration } from "@/lib/format";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Predefined premium gradient options
const GRADIENTS = [
  { id: "grad-1", name: "Amber Glow", class: "bg-gradient-to-br from-amber-400 to-orange-600" },
  { id: "grad-2", name: "Purple Haze", class: "bg-gradient-to-br from-violet-500 to-fuchsia-700" },
  { id: "grad-3", name: "Ocean Wave", class: "bg-gradient-to-br from-cyan-400 to-blue-600" },
  { id: "grad-4", name: "Coral Sunset", class: "bg-gradient-to-br from-rose-400 to-red-600" },
  { id: "grad-5", name: "Emerald Forest", class: "bg-gradient-to-br from-emerald-400 to-teal-700" },
];

export function ProfileButton() {
  const [open, setOpen] = useState(false);
  const profile = useStudyStore((s) => s.profile) || {
    avatar: "grad-1",
    customTitle: "Novice Learner",
    motto: "Consistency is key.",
  };

  const activeUser = typeof window !== "undefined" ? localStorage.getItem("studytracker.currentUser") || "User" : "User";

  // Helper to resolve avatar styling
  const isCustomImage = profile.avatar?.startsWith("data:image");
  const selectedGrad = GRADIENTS.find((g) => g.id === profile.avatar) || GRADIENTS[0];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted/30 transition-all hover:ring-2 hover:ring-amber-500/50 cursor-pointer overflow-hidden relative group"
        aria-label="User profile"
      >
        {isCustomImage ? (
          <img src={profile.avatar} alt="Avatar" className="h-full w-full object-cover" />
        ) : (
          <div className={cn("h-full w-full flex items-center justify-center text-white text-xs font-bold uppercase", selectedGrad.class)}>
            {activeUser.slice(0, 2)}
          </div>
        )}
      </button>

      {open && <ProfileDialog open={open} onOpenChange={setOpen} />}
    </>
  );
}

function ProfileDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const profile = useStudyStore((s) => s.profile) || {
    avatar: "grad-1",
    customTitle: "Novice Learner",
    motto: "Consistency is key.",
  };
  const updateProfile = useStudyStore((s) => s.updateProfile);
  const activeUser = typeof window !== "undefined" ? localStorage.getItem("studytracker.currentUser") || "User" : "User";

  const [avatar, setAvatar] = useState(profile.avatar);
  const [customTitle, setCustomTitle] = useState(profile.customTitle);
  const [motto, setMotto] = useState(profile.motto);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derived stats for profile display
  const stats = overallStats();
  const game = gamification();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image file is too large. Max size is 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setAvatar(reader.result);
        toast.success("Profile photo uploaded!");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateProfile({
      avatar,
      customTitle: customTitle.trim() || "Learner",
      motto: motto.trim() || "Consistency is key.",
    });
    toast.success("Profile updated successfully!");
    onOpenChange(false);
  };

  const isCustomImage = avatar?.startsWith("data:image");
  const currentGrad = GRADIENTS.find((g) => g.id === avatar);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[440px] p-0 overflow-hidden border-border/50 bg-card/95 backdrop-blur-md">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/40">
          <DialogTitle className="font-display text-lg font-black tracking-tight flex items-center gap-2">
            <User className="h-5 w-5 text-amber-500" />
            My Study Profile
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto st-scroll">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative group/avatar">
              <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-border shadow-lg relative flex items-center justify-center">
                {isCustomImage ? (
                  <img src={avatar} alt="Avatar Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className={cn("h-full w-full flex items-center justify-center text-white text-3xl font-extrabold uppercase", currentGrad?.class || "bg-muted")}>
                    {activeUser.slice(0, 2)}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-md cursor-pointer hover:scale-105 transition-transform"
                title="Upload custom photo"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            <div className="text-center">
              <h3 className="font-display text-lg font-bold capitalize">{activeUser}</h3>
              <p className="text-xs font-semibold text-amber-500 uppercase tracking-wide">
                Level {game.level} · {game.title}
              </p>
            </div>
          </div>

          {/* Gradients selector */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Select Avatar Gradient</label>
            <div className="flex items-center gap-2 flex-wrap">
              {GRADIENTS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setAvatar(g.id)}
                  className={cn(
                    "h-7 w-7 rounded-full border border-transparent transition-all cursor-pointer hover:scale-105",
                    g.class,
                    avatar === g.id && "ring-2 ring-amber-500 ring-offset-2 ring-offset-card"
                  )}
                  title={g.name}
                />
              ))}
            </div>
          </div>

          {/* Custom Input Fields */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Custom Title</label>
              <div className="relative">
                <Award className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="e.g. LeetCode Master"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  maxLength={30}
                  className="pl-9 h-9 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Study Motto</label>
              <div className="relative">
                <Quote className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="e.g. Keep compounding knowledge."
                  value={motto}
                  onChange={(e) => setMotto(e.target.value)}
                  maxLength={100}
                  className="pl-9 h-9 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-2.5 rounded-lg border border-border/40 bg-muted/20 p-3 text-center">
            <div>
              <div className="flex justify-center text-amber-500 mb-0.5"><Timer className="h-4 w-4" /></div>
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Time</div>
              <div className="text-xs font-black truncate mt-0.5">{fmtDuration(stats.seconds)}</div>
            </div>
            <div>
              <div className="flex justify-center text-violet-500 mb-0.5"><BookOpen className="h-4 w-4" /></div>
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Solved</div>
              <div className="text-xs font-black mt-0.5">{stats.done} / {stats.total}</div>
            </div>
            <div>
              <div className="flex justify-center text-emerald-500 mb-0.5"><Calendar className="h-4 w-4" /></div>
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Rank</div>
              <div className="text-xs font-black truncate mt-0.5">#{game.level}</div>
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t border-border/40 bg-muted/10 gap-2 flex-row justify-end">
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave} className="bg-amber-500 hover:bg-amber-600 text-white font-semibold">
            <Save className="mr-1.5 h-3.5 w-3.5" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
