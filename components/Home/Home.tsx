import Head from "next/head";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PublicOutlined } from "@mui/icons-material";

import { Props } from "../../pages/index";
import { useEffect, useState } from "react";
import wrapArray from "../../utils/wrapArray";

const rotatingLocaleBorderStyles = [
  "border-red-500",
  "border-amber-400",
  "border-indigo-400",
];

// duration of displayed language before rotating
const ROTATE_LANGS_DURATION = 10000;

export default function Home({ strings, locales, rotatingI18nData }: Props) {
  const [featuredLang, setFeaturedLang] = useState(locales[0]);

  // start rotating lang timer
  useEffect(() => {
    // abort if there aren't multiple langs
    if (locales.length < 2) {
      return;
    }
    let iterationNum = 0;
    const intervalRotateLanguage = setInterval(() => {
      // rotate the selected lang
      iterationNum++;
      const newFeaturedLang = wrapArray(locales, iterationNum);
      setFeaturedLang(newFeaturedLang);
    }, ROTATE_LANGS_DURATION);

    return () => {
      clearInterval(intervalRotateLanguage);
    };
  }, [locales]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <Head>
        <title>{strings.pageTitle}</title>
      </Head>

      <div className="h-full flex flex-col justify-center px-8 gap-4">
        <AnimatePresence exitBeforeEnter>
          <motion.div key={featuredLang}>
            <motion.h1
              className="text-center sm:text-left text-4xl md:text-6xl text-blue-50 py-1 origin-left"
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {},
              }}
              exit={{ opacity: 0 }}
            >
              {rotatingI18nData[featuredLang].welcomeText}
            </motion.h1>

            <motion.h3
              className="text-center sm:text-left text-lg sm:text-xl text-slate-200 origin-left"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 2.75 } }}
              exit={{ opacity: 0, transition: { delay: 0.2 } }}
            >
              {rotatingI18nData[featuredLang].tapToContinuePrompt}
            </motion.h3>
          </motion.div>
        </AnimatePresence>

        {/* Language select */}
        {strings.showSelectFromAvailableLocales ? (
          <div className="flex gap-2 items-center mt-10">
            <PublicOutlined className="text-slate-400" />
            <div className="flex gap-2 sm:gap-8 text-blue-200">
              {locales.map((locale, index) => (
                <Link href="/menu" key={locale} locale={locale} replace>
                  <a className="px-2 hover:-translate-y-1 transition-transform">
                    <motion.div
                      className={`border-b-4 font-extrabold ${wrapArray(
                        rotatingLocaleBorderStyles,
                        index
                      )} p-1 uppercase`}
                      animate={{ y: [null, -5, 0], rotate: [null, 2, 0] }}
                      transition={{
                        type: "spring",
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: ROTATE_LANGS_DURATION / 1000 + 5,
                        delay: 0.2 * index,
                      }}
                    >
                      {new Intl.DisplayNames(locale, { type: "language" }).of(
                        locale
                      )}
                    </motion.div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          // default behavior: click overlay
          <Link href="/menu">
            <a>
              <div className="h-screen w-screen fixed top-0 left-0"></div>
            </a>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
