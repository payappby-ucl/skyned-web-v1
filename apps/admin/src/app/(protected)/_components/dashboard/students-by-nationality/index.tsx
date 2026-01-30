import Alert from "@/src/components/alert";
import StudentNationalityPieChart from "./pie";

const data = [
  { nationality: "NG", count: 120, percentage: 31.58 }, // Nigeria
  { nationality: "GH", count: 45, percentage: 11.84 }, // Ghana
  { nationality: "KE", count: 38, percentage: 10.0 }, // Kenya
  { nationality: "US", count: 27, percentage: 7.11 }, // United States
  { nationality: "GB", count: 21, percentage: 5.53 }, // United Kingdom
  { nationality: "CA", count: 19, percentage: 5.0 }, // Canada
  { nationality: "IN", count: 32, percentage: 8.42 }, // India
  { nationality: "ZA", count: 16, percentage: 4.21 }, // South Africa
  { nationality: "DE", count: 12, percentage: 3.16 }, // Germany
  { nationality: "FR", count: 10, percentage: 2.63 }, // France
];

export default async function StudentsByNationality() {
  try {
    return <StudentNationalityPieChart data={data} />;
  } catch (error) {
    return <Alert />;
  }
}
