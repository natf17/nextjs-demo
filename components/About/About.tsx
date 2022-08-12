import { Props } from "./../../pages/about";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

function About({ strings }: Props) {
  return (
    <main className="prose prose-invert mx-auto">
      <h1 className="text-center p-2 mb-4">{strings.pageTitle}</h1>
      <div className="max-w-xs mx-auto shadow-lg shadow-blue-500/40">
        <Image
          src={`${
            process.env.NEXT_PUBLIC_VERCEL_IMG_API + strings.featImg.url
          }`}
          alt={strings.featImg.alternativeText}
          width={strings.featImg.width}
          height={strings.featImg.height}
          layout="responsive"
        />
      </div>
      <ReactMarkdown>{strings.richDescription}</ReactMarkdown>
    </main>
  );
}

export default About;
