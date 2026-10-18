import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AppLayout } from "@/components/layout/AppLayout"
import { ArchivePage } from "@/pages/ArchivePage"
import { InvoicesPage } from "@/pages/InvoicesPage"
import { JobsPage } from "@/pages/JobsPage"
import { ProfilePage } from "@/pages/ProfilePage"
import { SummaryPage } from "@/pages/SummaryPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/jobs" replace />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="summary" element={<SummaryPage />} />
          <Route path="archive" element={<ArchivePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/jobs" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
