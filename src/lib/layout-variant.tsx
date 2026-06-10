"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type LayoutVariant = "modern" | "editorial" | "maximalist";

export const LAYOUT_VARIANTS: { code: LayoutVariant; key: string; tagline: string }[] = [
  { code: "modern", key: "layout_modern", tagline: "layout_modern_tag" },
  { code: "editorial", key: "layout_editorial", tagline: "layout_editorial_tag" },
  { code: "maximalist", key: "layout_maximalist", tagline: "layout_maximalist_tag" },
];

interface Ctx {
  variant: LayoutVariant;
  setVariant: (v: LayoutVariant) => void;
}

const LayoutCtx = createContext<Ctx | null>(null);
const STORAGE_KEY = "werkkompas-layout";

function isVariant(x: unknown): x is LayoutVariant {
  return x === "modern" || x === "editorial" || x === "maximalist";
}

export function LayoutVariantProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariantState] = useState<LayoutVariant>("modern");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isVariant(stored)) {
        setVariantState(stored);
        document.documentElement.dataset.layout = stored;
      } else {
        document.documentElement.dataset.layout = "modern";
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setVariant = useCallback((v: LayoutVariant) => {
    setVariantState(v);
    try {
      localStorage.setItem(STORAGE_KEY, v);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") {
      document.documentElement.dataset.layout = v;
    }
  }, []);

  const value = useMemo<Ctx>(() => ({ variant, setVariant }), [variant, setVariant]);

  return <LayoutCtx.Provider value={value}>{children}</LayoutCtx.Provider>;
}

export function useLayout() {
  const ctx = useContext(LayoutCtx);
  if (!ctx) throw new Error("useLayout must be used inside LayoutVariantProvider");
  return ctx;
}
