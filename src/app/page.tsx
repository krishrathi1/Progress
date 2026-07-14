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
        });
      });
    } else {
      // Initialize with fresh default state for new account
      import("@/lib/store").then(({ useStudyStore }) => {
        useStudyStore.setState({
          progress: {},
          daily: {},
          seenAch: [],
          meta: { created: Date.now() },
          settings: {
            dailyGoalMin: 120,
            pomoFocus: 25,
            pomoBreak: 5,
            celebrate: true,
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
          };
          localStorage.setItem("studytracker.accounts", JSON.stringify(accounts));
        }
      });
    }
    localStorage.removeItem("studytracker.currentUser");
    setUser(null);
  };

  // Auto-save store updates to accounts database
  React.useEffect(() => {
    if (!user) return;

    let unsubscribe: () => void;
    import("@/lib/store").then(({ useStudyStore }) => {
      unsubscribe = useStudyStore.subscribe((state) => {
        const active = localStorage.getItem("studytracker.currentUser");
        if (active) {
          const accounts = JSON.parse(localStorage.getItem("studytracker.accounts") || "{}");
          if (accounts[active]) {
            accounts[active].data = {
              progress: state.progress,
              daily: state.daily,
              seenAch: state.seenAch,
              meta: state.meta,
              settings: state.settings,
            };
            localStorage.setItem("studytracker.accounts", JSON.stringify(accounts));
          }
        }
      });
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  if (!user) {
    return <AuthView onLogin={handleLogin} />;
  }

  return <AppShell onLogout={handleLogout} />;
}
