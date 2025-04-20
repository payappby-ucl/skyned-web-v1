export default async function Home() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="header text-2xl font-bold">Admin Frontend Protected</h1>
        <p>{process.env.API_URL}</p>
      </div>
    </div>
  );
}
