import type { Job } from "@/types/job"

/** Made-up demo data. Never put real client data here. */
export const fakeJobs: Job[] = [
  { id: "1", name: "Court hearing", date: "2026-10-14", start: "08:30", end: "11:45", client: "Musterfirma AG", driveMinutes: 40, hourlyRate: 110, driveRate: 110, status: "open" },
  { id: "2", name: "Doctor's appointment", date: "2026-10-09", start: "14:00", end: "15:10", client: "Beispiel Klinik", driveMinutes: 25, hourlyRate: 95, driveRate: 95, status: "open" },
  { id: "3", name: "Parent-teacher meeting", date: "2026-10-02", start: "17:30", end: "18:30", client: "Schule Demo", driveMinutes: 0, hourlyRate: 90, driveRate: 90, status: "invoiced" },
  { id: "4", name: "Night shift, police", date: "2026-10-01", start: "22:00", end: "01:30", client: "Test Behörde", driveMinutes: 30, hourlyRate: 120, driveRate: 120, status: "invoiced" },
  { id: "5", name: "Conference day 1", date: "2026-09-24", start: "09:00", end: "17:00", client: "Fake Events GmbH", driveMinutes: 60, hourlyRate: 130, driveRate: 65, status: "paid" },
  { id: "6", name: "Phone interpreting", date: "2026-09-18", start: "10:00", end: "10:20", client: "Musterfirma AG", driveMinutes: 0, hourlyRate: 110, driveRate: 110, status: "paid" },
]
