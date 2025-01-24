export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold header">Admin Frontend</h1>
        <p>{process.env.API_URL}</p>
      </div>
    </div>
  );
}
