"use client";

import { useCallback, useEffect, useState } from "react";

export type Route =
  | { view: "dashboard" }
  | { view: "analytics" }
  | { view: "achievements" }
  | { view: "data" }
  | { view: "track"; subjectId: string }
  | { view: "topic"; qid: string };

function parseHash(hash: string): Route {
  const h = hash.replace(/^#\/?/, "");
  if (!h || h === "dashboard") return { view: "dashboard" };
  if (h === "analytics") return { view: "analytics" };
  if (h === "achievements") return { view: "achievements" };
  if (h === "data") return { view: "data" };
  const parts = h.split("/");
  if (parts[0] === "track" && parts[1]) return { view: "track", subjectId: parts[1] };
  if (parts[0] === "topic" && parts[1]) return { view: "topic", qid: parts[1] };
  return { view: "dashboard" };
}

export function routeToHash(route: Route): string {
  switch (route.view) {
    case "dashboard":
      return "#/dashboard";
    case "analytics":
      return "#/analytics";
    case "achievements":
      return "#/achievements";
    case "data":
      return "#/data";
    case "track":
      return `#/track/${route.subjectId}`;
    case "topic":
      return `#/topic/${route.qid}`;
  }
}

/** Hash-based router — the whole app is a single-page dashboard. */
export function useHashRoute(): [Route, (r: Route) => void] {
  const [route, setRoute] = useState<Route>(() =>
    parseHash(typeof window !== "undefined" ? window.location.hash : ""),
  );

  useEffect(() => {
    const onHash = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = useCallback((r: Route) => {
    const hash = routeToHash(r);
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    } else {
      setRoute(r);
    }
    // scroll main content to top on navigation
    requestAnimationFrame(() => {
      document.getElementById("main-scroll")?.scrollTo({ top: 0 });
    });
  }, []);

  return [route, navigate];
}
