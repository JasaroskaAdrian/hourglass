import { PlusIcon } from "@phosphor-icons/react"
import { useState } from "react"
import { JobCard } from "@/components/jobs/JobCard"
import { ViewSwitch, type JobsView } from "@/components/jobs/ViewSwitch"
import { PageHeader } from "@/components/PageHeader"
import { Button } from "@/components/ui/button"
import { fakeJobs } from "@/lib/fake-jobs"
import { groupJobsByMonth } from "@/lib/group-jobs"

export function JobsPage() {
  const [view, setView] = useState<JobsView>("cards")
  const groups = groupJobsByMonth(fakeJobs)

  return (
    <>
      <PageHeader
        title="Jobs"
        actions={
          <>
            <ViewSwitch value={view} onChange={setView} />
            <Button>
              <PlusIcon /> New job
            </Button>
          </>
        }
      />

      {view === "calendar" ? (
        <p className="text-muted-foreground">Calendar view coming soon.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {groups.map((group) => (
            <section key={group.key}>
              <h2 className="mb-3 text-lg font-semibold">{group.label}</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {group.jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  )
}
