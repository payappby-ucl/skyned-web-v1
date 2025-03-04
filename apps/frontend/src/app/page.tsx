import Test from "@/components/test";
import { brandApi } from "@/lib";

export default async function Home() {
  const {
    data: { name },
  } = await brandApi.httpClient.fetch.v1.get<{ name: string }>("/api/items");

  if (!name) return null;

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="header">{name}</h1>
        <h1 className="header">Study Abroad</h1>
        <h2 className="sub-header">Your sure route to Study Abroad</h2>
        <p>This is a paragraph</p>
        <Test />
      </div>
    </div>
  );
}
