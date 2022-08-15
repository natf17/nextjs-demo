import { Props } from "./../../pages/about";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { motion } from "framer-motion";
import { MotionSlideUp } from "./../../shared/animations/pages/onPageLoad";
import { CloseSharp } from "@mui/icons-material";
import Link from "next/link";
import OverflowScrollGradient from "../shared/Layout/components/OverflowScrollGradient";

function About({ strings }: Props) {
  return (
    <motion.div
      {...MotionSlideUp}
      className="w-full self-stretch flex content-end"
    >
      <div
        className="w-full max-w-3xl mx-auto self-end relative
        overflow-hidden rounded-t-lg bg-slate-800/60
      "
      >
        {/* Close button TODO: separate into a component */}
        <div className={`absolute top-0 right-0 p-2 z-20`}>
          <Link href="/menu">
            <a>
              <button className="border border-indigo-300 p-2 rounded-full hover:bg-slate-500">
                <CloseSharp htmlColor="#f3f3f3" />
              </button>
            </a>
          </Link>
        </div>

        <OverflowScrollGradient
          twGradientHeightBefore="before:h-12"
          twGradientHeightAfter="after:h-12"
          twTargetFadeColorBefore="before:to-slate-800"
          twTargetFadeColorAfter="after:to-slate-800"
        >
          <div
            className={`relative py-12 
              max-h-[85vh] overflow-y-scroll`}
          >
            <main className="prose prose-invert mx-auto">
              <h1 className="text-center mb-4">{strings.pageTitle}</h1>
              {strings.featImg?.url && (
                <div className="max-w-xs mx-auto shadow-lg shadow-blue-500/40">
                  <Image
                    src={`${
                      process.env.NEXT_PUBLIC_VERCEL_IMG_API +
                      strings.featImg.url
                    }`}
                    alt={strings.featImg.alternativeText}
                    width={strings.featImg.width}
                    height={strings.featImg.height}
                    layout="responsive"
                  />
                </div>
              )}
              <ReactMarkdown>{strings.richDescription}</ReactMarkdown>
            </main>
          </div>
        </OverflowScrollGradient>
      </div>
    </motion.div>
  );
}

export default About;
