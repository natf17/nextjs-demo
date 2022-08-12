import { Props } from "./../../pages/about";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { motion } from "framer-motion";
import { MotionFadeEnter } from "./../../shared/animations/pages/onPageLoad";

function About({ strings }: Props) {
  return (
    <motion.main {...MotionFadeEnter} className="prose prose-invert mx-auto">
      <h1 className="text-center p-2 mb-4">{strings.pageTitle}</h1>
      {strings.featImg?.url && (
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
      )}
      <ReactMarkdown>{strings.richDescription}</ReactMarkdown>
    </motion.main>
  );
}

export default About;
