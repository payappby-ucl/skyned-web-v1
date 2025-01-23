import { Button } from "@workspace/ui/components/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold header">Hello World</h1>
        <p>Whereas disregard and contempt for human rights have resulted</p>
        <Button size="sm" variant="outline">
          Button
        </Button>
      </div>
    </div>
  );
}
