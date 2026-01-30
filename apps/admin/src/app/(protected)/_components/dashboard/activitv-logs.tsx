import Alert from "@/src/components/alert";
import FormatDate from "@/src/components/format-date";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

const adminLogs = [
  {
    uri: "https://firebasestorage.googleapis.com/v0/b/skyned-test-31a2e.firebasestorage.app/o/users%2FuWm42Bx3LAOSy5DHn0WXdKqS3LE2%2Fprofile%2FprimaryImage?alt=media&token=6ca53c59-2ea5-4ed9-98b0-1e7272dd863f",
    fullName: "Jane Doe",
    timestamp: "2025-08-07T10:30:00Z",
    action: "Approved User",
    description: "Approved new user registration for Daniel King",
  },
  {
    uri: "https://firebasestorage.googleapis.com/v0/b/skyned-test-31a2e.firebasestorage.app/o/users%2FuWm42Bx3LAOSy5DHn0WXdKqS3LE2%2Fprofile%2FprimaryImage?alt=media&token=6ca53c59-2ea5-4ed9-98b0-1e7272dd863f",
    fullName: "John Smith",
    timestamp: "2025-08-06T13:20:45Z",
    action: "Suspended Account",
    description: "Suspended user account: Alice Nwosu due to policy violation",
  },
  {
    uri: "https://firebasestorage.googleapis.com/v0/b/skyned-test-31a2e.firebasestorage.app/o/users%2FuWm42Bx3LAOSy5DHn0WXdKqS3LE2%2Fprofile%2FprimaryImage?alt=media&token=6ca53c59-2ea5-4ed9-98b0-1e7272dd863f",
    fullName: "Alice Johnson",
    timestamp: "2025-08-05T09:00:00Z",
    action: "Updated User Role",
    description: "Changed role of Emmanuel A. from 'User' to 'Moderator'",
  },
  {
    uri: "https://firebasestorage.googleapis.com/v0/b/skyned-test-31a2e.firebasestorage.app/o/users%2FuWm42Bx3LAOSy5DHn0WXdKqS3LE2%2Fprofile%2FprimaryImage?alt=media&token=6ca53c59-2ea5-4ed9-98b0-1e7272dd863f",
    fullName: "Michael Green",
    timestamp: "2025-08-04T16:45:10Z",
    action: "Deleted User",
    description: "Permanently deleted user: Johnson F.",
  },

  {
    uri: "https://firebasestorage.googleapis.com/v0/b/skyned-test-31a2e.firebasestorage.app/o/users%2FuWm42Bx3LAOSy5DHn0WXdKqS3LE2%2Fprofile%2FprimaryImage?alt=media&token=6ca53c59-2ea5-4ed9-98b0-1e7272dd863f",
    fullName: "Tunde Afolayan",
    timestamp: "2025-07-30T11:22:40Z",
    action: "Revoked Access",
    description: "Revoked access for user: Kelvin M. from admin dashboard",
  },
  {
    uri: "https://firebasestorage.googleapis.com/v0/b/skyned-test-31a2e.firebasestorage.app/o/users%2FuWm42Bx3LAOSy5DHn0WXdKqS3LE2%2Fprofile%2FprimaryImage?alt=media&token=6ca53c59-2ea5-4ed9-98b0-1e7272dd863f",
    fullName: "Grace Eze",
    timestamp: "2025-07-29T18:05:15Z",
    action: "Updated Terms",
    description: "Published new version of Terms and Conditions",
  },
];

export default async function ActivityLogs() {
  try {
    return (
      <Card className="shadow-none">
        <CardHeader>
          <div>
            <CardTitle>Activity Logs</CardTitle>
            <CardDescription>
              Latest updates by staffs across all departments
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {adminLogs.map((log) => (
            <div
              className="flex items-center justify-between rounded-md border px-4 py-2"
              key={log.fullName}
            >
              <div className="w-full space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarFallback>AE</AvatarFallback>
                      <AvatarImage
                        src={log.uri}
                        alt="Profile Image"
                        className="object-cover"
                      />
                    </Avatar>
                    <div className="">
                      <p className="text-sm font-semibold">{log.fullName}</p>
                      <p className="text-muted-foreground text-xs">
                        <FormatDate
                          fromNow
                          date={log.timestamp as unknown as Date}
                        />
                      </p>
                    </div>
                  </div>

                  <Badge className="capitalize" variant="outline">
                    {log.action}
                  </Badge>
                </div>

                <p className="text-sm">{log.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  } catch (error) {
    return <Alert />;
  }
}
