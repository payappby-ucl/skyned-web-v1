import KPI from "./_components/dashboard/kpi";
import Trends from "./_components/dashboard/trends";
import ActivityLogs from "./_components/dashboard/activitv-logs";
import StudentPie from "./_components/dashboard/students-pie";
import ApplicationPie from "./_components/dashboard/applications-pie";
import DepartmentsPie from "./_components/dashboard/staff-pie";
import StudentsByNationality from "./_components/dashboard/students-by-nationality";

export default function AdminDashboard() {
  return (
    <section className="space-y-6 !p-0">
      <div className="space-y-1">
        <h1 className="!text-2xl">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Welcome back! Here's what's happening at Skyned Consults Education.
        </p>
      </div>

      {/* KPI's */}
      <KPI />

      {/* Trends Graph */}
      <Trends />

      <div className="grid grid-cols-1 items-start gap-2 lg:grid-cols-3">
        <div className="grid gap-2">
          {/* Student Pie */}
          <StudentPie />
          {/* Application Pie */}
          <ApplicationPie />
        </div>

        <div className="grid gap-2">
          {/* Students by nationality */}
          <StudentsByNationality />
        </div>

        <div className="grid gap-2">
          {/* Departments Pie */}
          <DepartmentsPie />

          {/* Activity Logs */}
          <ActivityLogs />
        </div>
      </div>
    </section>
  );
}
