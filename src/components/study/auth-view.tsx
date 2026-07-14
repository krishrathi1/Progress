"use client";

import * as React from "react";
import { useState } from "react";
import { User, Lock, GraduationCap, ShieldAlert, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function AuthView({ onLogin }: { onLogin: (username: string) => void }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanUsername = username.trim().toLowerCase();
    if (!cleanUsername || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    const accounts = JSON.parse(localStorage.getItem("studytracker.accounts") || "{}");

    if (isSignUp) {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
      if (accounts[cleanUsername]) {
        toast.error("Username is already taken.");
        return;
      }

      // Create new account with default empty state
      accounts[cleanUsername] = {
        password: password, // In local-first client database, simple password check is sufficient
        data: {
          progress: {},
          daily: {},
          seenAch: [],
          meta: { created: Date.now() },
          settings: {
            dailyGoalMin: 120,
            pomoFocus: 25,
            pomoBreak: 5,
            celebrate: true,
          }
        }
      };

      localStorage.setItem("studytracker.accounts", JSON.stringify(accounts));
      toast.success("Account created successfully!");
      onLogin(cleanUsername);
    } else {
      const userAcc = accounts[cleanUsername];
      if (!userAcc || userAcc.password !== password) {
        toast.error("Invalid username or password.");
        return;
      }

      toast.success(`Welcome back, ${username}!`);
      onLogin(cleanUsername);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background p-4">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[350px] w-[350px] rounded-full bg-amber-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[350px] w-[350px] rounded-full bg-orange-600/10 blur-[100px]" />

      <Card className="relative w-full max-w-[400px] border-border/50 bg-card/60 shadow-2xl backdrop-blur-md">
        <CardHeader className="space-y-1.5 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/20">
            <GraduationCap className="h-6 w-6" />
          </div>
          <CardTitle className="font-display text-2xl font-black tracking-tight mt-3">
            {isSignUp ? "Create Account" : "Sign In"}
          </CardTitle>
          <CardDescription className="text-xs font-medium text-muted-foreground">
            {isSignUp ? "Start your customized study path today" : "Access your local learning command center"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-9 h-10 font-sans"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 h-10"
                  required
                />
              </div>
            </div>

            {isSignUp && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-9 h-10"
                    required
                  />
                </div>
              </div>
            )}

             {/* Dark Red Warning Banner */}
            <div className="rounded-lg border border-red-950 bg-red-950/20 p-3 text-red-600 dark:text-red-400">
              <div className="flex gap-2">
                <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                <div className="text-[11px] font-semibold leading-normal">
                  WARNING: This database is stored locally in your browser cache. If you forget your password, your account cannot be recovered and your progress will be gone permanently.
                </div>
              </div>
            </div>

            {/* Data Collection Notice */}
            <div className="rounded-lg border border-border/40 bg-muted/30 p-3 text-muted-foreground">
              <div className="text-[10px] font-bold uppercase tracking-wider text-foreground mb-1">
                Data Collection Notice
              </div>
              <ul className="list-disc pl-4 text-[10px] space-y-0.5 leading-normal">
                <li><strong>Local Cache:</strong> Stored locally on this browser via localStorage.</li>
                <li><strong>Credentials:</strong> Stores Username and Password (plaintext check locally) for secure log-in.</li>
                <li><strong>Progress:</strong> Tracks study sessions, time elapsed, completed items, stars.</li>
                <li><strong>Notes:</strong> Saves your customized study notes per topic.</li>
                <li><strong>Profile:</strong> Remembers your avatar, custom titles, and goals.</li>
              </ul>
            </div>

            <Button type="submit" className="w-full h-10 font-bold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/10">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-border/40 pt-4">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setUsername("");
              setPassword("");
              setConfirmPassword("");
            }}
            className="text-xs font-semibold text-amber-500 hover:text-amber-600 hover:underline cursor-pointer"
          >
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Create one"}
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
