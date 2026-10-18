import {
  ArchiveIcon,
  BriefcaseIcon,
  ChartBarIcon,
  ReceiptIcon,
  UserCircleIcon,
  type Icon,
} from "@phosphor-icons/react"

export type NavItem = {
  to: string
  label: string
  icon: Icon
}

/** Main sections, in display order. */
export const mainNavItems: NavItem[] = [
  { to: "/jobs", label: "Jobs", icon: BriefcaseIcon },
  { to: "/invoices", label: "Invoices", icon: ReceiptIcon },
  { to: "/summary", label: "Summary", icon: ChartBarIcon },
  { to: "/archive", label: "Archive", icon: ArchiveIcon },
]

/** Pinned to the bottom of the desktop sidebar. */
export const profileNavItem: NavItem = {
  to: "/profile",
  label: "Profile",
  icon: UserCircleIcon,
}
