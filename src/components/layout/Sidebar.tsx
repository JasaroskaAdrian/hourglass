import { HourglassIcon } from "@phosphor-icons/react"
import { mainNavItems, profileNavItem } from "./nav-items"
import { NavLinkItem } from "./NavLinkItem"

/** Desktop navigation (hidden below the md breakpoint). */
export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col bg-sidebar p-3 md:flex">
      <div className="mb-6 flex items-center gap-2 px-3 py-2 text-lg font-semibold text-sidebar-foreground">
        <HourglassIcon className="size-6" weight="fill" />
        hourglass
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {mainNavItems.map((item) => (
          <NavLinkItem key={item.to} item={item} variant="sidebar" />
        ))}
        <div className="mt-auto">
          <NavLinkItem item={profileNavItem} variant="sidebar" />
        </div>
      </nav>
    </aside>
  )
}
