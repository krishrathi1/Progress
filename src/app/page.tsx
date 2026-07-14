"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { AuthView } from "@/components/study/auth-view";

const AppShell = dynamic(
  () => import("@/components/study/app-shell").then((m) => m.AppShell),
  { ssr: false }
);

export default function Home() {
  const [user, setUser] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Check if user is logged in
    const active = localStorage.getItem("studytracker.currentUser");
    if (active) {
      setUser(active);
    }
  }, []);

  const handleLogin = (username: string) => {
    localStorage.setItem("studytracker.currentUser", username);
    setUser(username);

    // Load user data into the Zustand store
    const accounts = JSON.parse(localStorage.getItem("studytracker.accounts") || "{}");
    const userData = accounts[username]?.data;
    if (userData) {
      import("@/lib/store").then(({ useStudyStore }) => {
        useStudyStore.setState({
          progress: userData.progress || {},
          daily: userData.daily || {},
          seenAch: userData.seenAch || [],
          meta: userData.meta || { created: Date.now() },
          settings: userData.settings || {
            dailyGoalMin: 120,
            pomoFocus: 25,
            pomoBreak: 5,
            celebrate: true,
          },
          profile: userData.profile || {
            avatar: "grad-1",
            customTitle: "Novice Learner",
            motto: "Consistency is key.",
          },
        });
      });
    }
  };

  const handleLogout = () => {
    const active = localStorage.getItem("studytracker.currentUser");
    if (active) {
      import("@/lib/store").then(({ useStudyStore }) => {
        const state = useStudyStore.getState();
        const accounts = JSON.parse(localStorage.getItem("studytracker.accounts") || "{}");
        if (accounts[active]) {
          accounts[active].data = {
            progress: state.progress,
            daily: state.daily,
            seenAch: state.seenAch,
            meta: state.meta,
            settings: state.settings,
            profile: state.profile,
          };
          localStorage.setItem("studytracker.accounts", JSON.stringify(accounts));
        }

        // Instantly push final sync state to database
        fetch("/api/auth/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: active,
            data: accounts[active].data,
          }),
        }).catch((err) => console.warn("Logout sync failed:", err.message));
      });
    }
    localStorage.removeItem("studytracker.currentUser");
    setUser(null);
  };

  // Auto-save store updates to Neon online database (debounced to 3s)
  React.useEffect(() => {
    if (!user) return;

    let unsubscribe: () => void;
    let timeoutId: NodeJS.Timeout;

    import("@/lib/store").then(({ useStudyStore }) => {
      unsubscribe = useStudyStore.subscribe((state) => {
        const active = localStorage.getItem("studytracker.currentUser");
        if (!active) return;

        // 1) Save locally instantly for offline resilience
        const accounts = JSON.parse(localStorage.getItem("studytracker.accounts") || "{}");
        if (accounts[active]) {
          accounts[active].data = {
            progress: state.progress,
            daily: state.daily,
            seenAch: state.seenAch,
            meta: state.meta,
            settings: state.settings,
            profile: state.profile,
          };
          localStorage.setItem("studytracker.accounts", JSON.stringify(accounts));
        }

        // 2) Debounce network syncing to online database
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          fetch("/api/auth/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: active,
              data: {
                progress: state.progress,
                daily: state.daily,
                seenAch: state.seenAch,
                meta: state.meta,
                settings: state.settings,
                profile: state.profile,
              },
            }),
          }).catch((err) => {
            console.warn("Auto-sync to Neon failed (offline):", err.message);
          });
        }, 3000);
      });
    });

    return () => {
      if (unsubscribe) unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [user]);

  if (!user) {
    return <AuthView onLogin={handleLogin} />;
  }

  return <AppShell onLogout={handleLogout} currentUser={user} />;
}
