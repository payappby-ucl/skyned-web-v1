import Image from "next/image";
import FAQ from "./faq";
import { faqs } from "@/src/utils/data";

export default async function FAQs() {
  return (
    <section className="grid auto-cols-min grid-cols-1 gap-5 md:grid-flow-col-dense md:grid-cols-2">
      <div className="space-y-5">
        <h2>Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <FAQ {...faq} key={faq.question} />
          ))}
        </div>
      </div>
      <div className="hidden gap-4 place-self-center md:grid md:grid-cols-2 md:grid-rows-3">
        <Image
          src="https://cdn.pixabay.com/photo/2019/11/29/08/34/space-4660847_1280.jpg"
          alt="Office Space"
          width={200}
          height={200}
          className="w-sm justify-self-center rounded-t-md object-cover md:col-span-2 md:row-span-2"
        />

        <Image
          src="https://cdn.pixabay.com/photo/2020/07/08/04/12/work-5382501_1280.jpg"
          alt="Office Space"
          width={200}
          height={200}
          className="h-md w-full rounded-bl-md object-cover"
        />

        <Image
          src="https://cdn.pixabay.com/photo/2017/05/04/16/37/meeting-2284501_1280.jpg"
          alt="Office Space"
          width={200}
          height={200}
          className="w-full rounded-br-md object-cover"
        />
      </div>
    </section>
  );
}
