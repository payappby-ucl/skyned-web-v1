import Test from "@/src/components/test";
import { brandApi } from "@/src/lib";

export default async function Home() {
  let name = null;
  try {
    const { data } = await brandApi.httpClient.fetch.v1.get<{ name: string }>(
      "/api/items",
    );

    name = data.name;
  } catch (error) {
    console.log(error);
  }

  if (!name) return null;

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-brand">{name}</h1>
        <h1>Study Abroad H1</h1>
        <h1>Your sure route to Study Abroad H1</h1>
        <h2>Study Abroad h2</h2>
        <h2>Your sure route to Study Abroad h2</h2>
        <h3>Study Abroad h3</h3>
        <h3>Your sure route to Study Abroad h3</h3>
        <h4>Study Abroad h4</h4>
        <h4>Your sure route to Study Abroad h4</h4>
        <h5>Study Abroad h5</h5>
        <h5>Your sure route to Study Abroad h5</h5>
        <h6>Study Abroad h6</h6>
        <h6>Your sure route to Study Abroad h6</h6>
        <p className="text-brand">This is a paragraph</p>
        <Test />
      </div>
    </div>
  );
}
