import { Outlet } from "react-router-dom"
import { BottomNav } from "./BottomNav"
import { Sidebar } from "./Sidebar"

export function AppLayout() {
  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      {/* Bottom padding keeps content clear of the mobile bottom bar */}
      <main className="min-w-0 flex-1 p-4 pb-24 md:p-8">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
