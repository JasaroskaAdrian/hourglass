import { mainNavItems, profileNavItem } from "./nav-items"
import { NavLinkItem } from "./NavLinkItem"

/** Mobile navigation, fixed to the bottom (hidden from md up). */
export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 flex bg-sidebar pb-[env(safe-area-inset-bottom)] md:hidden">
      {[...mainNavItems, profileNavItem].map((item) => (
        <NavLinkItem key={item.to} item={item} variant="bottom" />
      ))}
    </nav>
  )
}
