"use client";

import * as React from "react";
import {
  Download,
  Upload,
  Trash2,
  Target,
  Timer,
  PartyPopper,
  Database,
  Info,
  CheckCircle2,
} from "lucide-react";
import { useStudyStore, overallStats, activeDays, streak } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { fmtDurationLong } from "@/lib/format";
import { toast } from "sonner";

export function DataView() {
  const settings = useStudyStore((s) => s.settings);
  const setSetting = useStudyStore((s) => s.setSetting);
  const exportData = useStudyStore((s) => s.exportData);
  const importData = useStudyStore((s) => s.importData);
  const resetAll = useStudyStore((s) => s.resetAll);

  const fileRef = React.useRef<HTMLInputElement>(null);
  const o = overallStats();
  const days = activeDays();
  const curStreak = streak();

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `studytracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Backup exported");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importData(String(reader.result));
        toast.success("Backup imported successfully");
      } catch {
        toast.error("Invalid backup file");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="st-fade-in space-y-5">
      {/* Storage summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Database className="h-4 w-4 text-cyan-500" />
            Your data
          </CardTitle>
          <CardDescription className="text-xs">
            Everything is stored locally in your browser (localStorage). Nothing is uploaded.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <DataStat label="Topics tracked" value={Object.keys(useStudyStore.getState().progress).length} />
            <DataStat label="Topics done" value={o.done} />
            <DataStat label="Active days" value={days} />
            <DataStat label="Total time" value={fmtDurationLong(o.seconds)} />
          </div>
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-700 dark:text-amber-400">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>Clearing your browser data will erase all progress. Export a backup regularly to keep it safe.</span>
          </div>
        </CardContent>
      </Card>

      {/* Backup / restore */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Backup & restore</CardTitle>
          <CardDescription className="text-xs">
            Move your progress between browsers or machines.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button onClick={handleExport} variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export backup
          </Button>
          <Button onClick={() => fileRef.current?.click()} variant="outline">
            <Upload className="mr-2 h-4 w-4" /> Import backup
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={handleImport}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-destructive hover:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Reset all data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset everything?</AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently erases all progress, timers, notes, stars, XP and achievements across every track. This action cannot be undone. Consider exporting a backup first.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={() => {
                    resetAll();
                    toast.success("All data has been reset");
                  }}
                >
                  Yes, reset everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Settings</CardTitle>
          <CardDescription className="text-xs">Tune your goals and focus workflow.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Daily goal */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4 text-emerald-500" /> Daily goal
              </Label>
              <span className="text-sm font-bold tabular-nums">{settings.dailyGoalMin} min</span>
            </div>
            <Slider
              value={[settings.dailyGoalMin]}
              min={15}
              max={480}
              step={15}
              onValueChange={([v]) => setSetting("dailyGoalMin", v)}
            />
            <p className="text-[11px] text-muted-foreground">
              The dashboard progress ring fills as you approach this daily study target.
            </p>
          </div>

          {/* Pomodoro */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-sm">
                  <Timer className="h-4 w-4 text-violet-500" /> Focus duration
                </Label>
                <span className="text-sm font-bold tabular-nums">{settings.pomoFocus} min</span>
              </div>
              <Slider
                value={[settings.pomoFocus]}
                min={10}
                max={60}
                step={5}
                onValueChange={([v]) => setSetting("pomoFocus", v)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-sm">
                  <Timer className="h-4 w-4 text-cyan-500" /> Break duration
                </Label>
                <span className="text-sm font-bold tabular-nums">{settings.pomoBreak} min</span>
              </div>
              <Slider
                value={[settings.pomoBreak]}
                min={3}
                max={30}
                step={1}
                onValueChange={([v]) => setSetting("pomoBreak", v)}
              />
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Pomodoro mode runs a focus countdown followed by a break. Start it from any topic using the timer.
          </p>

          {/* Celebrate */}
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <PartyPopper className="h-4 w-4 text-amber-500" />
              <div>
                <div className="text-sm font-medium">Celebrations</div>
                <div className="text-[11px] text-muted-foreground">Show toasts when you complete topics & unlock achievements</div>
              </div>
            </div>
            <Switch
              checked={settings.celebrate}
              onCheckedChange={(v) => setSetting("celebrate", v)}
            />
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardContent className="p-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span className="font-medium text-foreground">StudyTracker · Learning Command Center</span>
          </div>
          <p className="mt-2 leading-relaxed">
            A local-first dashboard tracking 1,000+ topics across 10 tracks — Striver A2Z DSA, Core Java,
            OOP, DBMS, OS, Computer Networks, System Design, AWS, Docker & SQL. Built with Next.js 16,
            TypeScript, Tailwind CSS and shadcn/ui. Your data never leaves your device.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function DataStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border bg-card p-3">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-lg font-bold tabular-nums">{value}</div>
    </div>
  );
}
