import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

import { Props } from "../../pages/index";
import { useEffect } from "react";
import { useIdleTimerContext } from "react-idle-timer";

export default function Home({ strings }: Props) {
  const idleTimer = useIdleTimerContext();

  // disable inactivity timer on home page
  useEffect(() => {
    idleTimer.pause();

    return () => {
      idleTimer.reset();
    };
  }, [idleTimer]);

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

      <Link href="/menu">
        <a className="block h-full">
          <div className="h-full flex flex-col justify-center">
            <h1 className="text-left text-6xl text-blue-50">
              {strings.welcomeText}
            </h1>
            <h3 className="text-left text-3xl text-blue-50">
              {strings.tapToContinuePrompt}
            </h3>
          </div>
        </a>
      </Link>
    </motion.div>
  );
}
