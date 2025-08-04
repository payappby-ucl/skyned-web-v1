import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Progress } from "@workspace/ui/components/progress";
import {
  Users,
  GraduationCap,
  HeadsetIcon,
  MessageCircleQuestionIcon,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Schools",
      value: "24",
      change: "+2",
      icon: GraduationCap,
      color: "text-green-600",
    },
    {
      title: "Inquiries",
      value: "8",
      change: "0",
      icon: MessageCircleQuestionIcon,
      color: "text-purple-600",
    },
    {
      title: "Team Members",
      value: "50",
      change: "+8",
      icon: HeadsetIcon,
      color: "text-emerald-600",
    },
  ];

  const departmentStats = [
    { name: "Executive", members: 342, progress: 85 },
    { name: "Marketing", members: 298, progress: 74 },
    { name: "Admissions", members: 456, progress: 91 },
    { name: "Communications", members: 234, progress: 58 },
    { name: "Technical", members: 567, progress: 95 },
    { name: "Human Resource", members: 189, progress: 47 },
    { name: "Quality Assurance", members: 123, progress: 31 },
  ];

  const recentActivities = [
    {
      action: "New student enrolled",
      department: "Technical",
      time: "2 minutes ago",
    },
    {
      action: "Tasks completed",
      department: "Marketing",
      time: "15 minutes ago",
    },
    {
      action: "New inquiry received",
      department: "Admissions",
      time: "1 hour ago",
    },
    {
      action: "Blog post published",
      department: "Communications",
      time: "2 hours ago",
    },
    { action: "Account updated", department: "Executive", time: "3 hours ago" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening at Skyned Consults Education.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-muted-foreground text-xs">
                <span className="text-green-600">{stat.change}</span> from last
                month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Department Performance */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Member distribution by department</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {departmentStats.map((dept) => (
              <div key={dept.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{dept.name}</div>
                  <div className="text-muted-foreground text-sm">
                    {dept.members} members
                  </div>
                </div>
                <Progress value={dept.progress} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Activity Logs</CardTitle>
            <CardDescription>
              Latest updates across all departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 border-l-3 border-brand px-2 pb-2 pl-3 text-xs transition-colors hover:bg-brand-50/50">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.action}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {activity.department}
                      </Badge>
                      <p className="text-muted-foreground text-xs">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
