import { brandServerApi } from "@/src/lib/server";

export default async function InquiriesPage() {
  const data = await brandServerApi.httpClient.request(
    `/contact?page=1&from=${new Date()}`,
    "GET",
    {
      cache: "no-store",
    },
  );
  console.log(data);
  return <div>Inquiries page</div>;
}
