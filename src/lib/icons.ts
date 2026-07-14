"use client";

/**
 * Central icon module — Phosphor Icons re-exported under Lucide-compatible
 * names so the whole app can switch icon packs by changing one import path.
 *
 * Global weight (duotone) is set via <IconContext.Provider> in app-shell,
 * giving the UI Phosphor's warmer, more premium duotone look.
 *
 * All components accept `className` (e.g. `h-4 w-4`) exactly like Lucide.
 */
export type { Icon, IconProps, IconWeight } from "@phosphor-icons/react";
export { IconContext } from "@phosphor-icons/react";

export {
  // ---- same name in Phosphor ----
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  Circle,
  Clock,
  Compass,
  Crown,
  Database,
  Flag,
  Flame,
  GraduationCap,
  Hash,
  Info,
  Lock,
  Medal,
  Moon,
  Play,
  Square,
  Star,
  Sun,
  Target,
  Timer,
  Trophy,
  X,
  // ---- aliased to the Lucide name the app already uses ----
  Pulse as Activity,
  Checks as CheckCheck,
  CheckCircle as CheckCircle2,
  CaretDown as ChevronDown,
  CaretLeft as ChevronLeft,
  CaretRight as ChevronRight,
  DownloadSimple as Download,
  ArrowSquareOut as ExternalLink,
  StackSimple as Layers,
  SquaresFour as LayoutDashboard,
  ChartLine as LineChart,
  CircleNotch as Loader2,
  List as Menu,
  DotsThree as MoreHorizontal,
  Confetti as PartyPopper,
  ChartPie as PieChart,
  ArrowCounterClockwise as RotateCcw,
  MagnifyingGlass as Search,
  Note as StickyNote,
  Trash as Trash2,
  TrendUp as TrendingUp,
  UploadSimple as Upload,
  Lightning as Zap,
} from "@phosphor-icons/react";
