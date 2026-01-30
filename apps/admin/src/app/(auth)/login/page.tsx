import Image from "next/image";
import icon from "../../../../public/assets/images/brand/icon.png";
import LoginForm from "./_components/form";
export default function LoginPage() {
  return (
    <section className="space-y-5">
      <div className="flex items-center justify-center gap-3">
        <Image
          src={icon}
          alt="Skyned's Icon"
          className="h-6 w-6 rounded-sm bg-white object-cover p-1"
        />
        <p className="text-md font-bold">Skyned Consults</p>
      </div>
      <LoginForm />
    </section>
  );
}
