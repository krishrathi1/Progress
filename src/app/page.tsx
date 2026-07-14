"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { AuthView } from "@/components/study/auth-view";

const AppShell = dynamic(
  () => import("@/components/study/app-shell").then((m) => m.AppShell),
  { ssr: false }
);

const defaultSettings = {
  dailyGoalMin: 120,
  pomoFocus: 25,
  pomoBreak: 5,
  celebrate: true,
};

const defaultProfile = {
  avatar: "grad-1",
  customTitle: "Novice Learner",
  motto: "Consistency is key.",
};

async function loadUserState(username: string) {
  const accounts = JSON.parse(localStorage.getItem("studytracker.accounts") || "{}");
  const data = accounts[username]?.data;
  const { useStudyStore } = await import("@/lib/store");

  // Always replace every user-owned field. This prevents the shared Zustand
  // browser cache from leaking the previous account's progress into this one.
  useStudyStore.setState({
    progress: data?.progress || {},
    daily: data?.daily || {},
    activeTimer: null,
    seenAch: data?.seenAch || [],
    meta: data?.meta || { created: Date.now() },
    settings: { ...defaultSettings, ...(data?.settings || {}) },
    profile: { ...defaultProfile, ...(data?.profile || {}) },
  });
}

export default function Home() {
  const [user, setUser] = React.useState<string | null>(null);
  const [initializing, setInitializing] = React.useState(true);

  React.useEffect(() => {
    // Check if user is logged in
    const active = localStorage.getItem("studytracker.currentUser");
    if (active) loadUserState(active).then(() => setUser(active)).finally(() => setInitializing(false));
    else setInitializing(false);
  }, []);

  const handleLogin = async (username: string) => {
    localStorage.setItem("studytracker.currentUser", username);
    await loadUserState(username);
    setUser(username);
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
    // Remove the active identity before clearing memory so the reset cannot be
    // auto-synced over the account that just logged out.
    localStorage.removeItem("studytracker.currentUser");
    import("@/lib/store").then(({ useStudyStore }) => useStudyStore.getState().resetAll());
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

  if (initializing) return null;

  if (!user) {
    return <AuthView onLogin={handleLogin} />;
  }

  return <AppShell onLogout={handleLogout} currentUser={user} />;
}
