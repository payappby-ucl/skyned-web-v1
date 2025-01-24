import { IFailedResponse } from "@skyned/interfaces";

export default function Home() {
  const res: IFailedResponse = {
    statusCode: 400,
    message: "Error",
    success: false,
    data: null,
  };

  console.log(res);

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold header">Frontend</h1>
        <p>{process.env.API_URL}</p>
      </div>
    </div>
  );
}
