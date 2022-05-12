import "../styles/tailwind.css";
import { AnimatePresence } from "framer-motion";
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";
import Layout from "./../components/shared/Layout";
import Head from "next/head";
import Image from "next/image";
import bgImage from "../public/bg_flipped.jpeg";
import Modal from "react-modal";
import IdleUser from "./../components/shared/ui/modals/IdleUser";
import { IdleTimerProvider } from "react-idle-timer";
import React, { useState } from "react";

// Global values (see note below)
import headerLogo from "../public/headerLogo.svg";
const globalValues = {
  header: {
    logo: headerLogo,
  },
};

const imageWrapperStyle = {
  position: "fixed",
  height: "100vh",
  width: "100vw",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: "hidden",
  zIndex: -1,
};

// inactivity timer settings (in seconds)
const INACTIVITY_TIMER = {
  idletime: 45,
  promptduration: 15,
};

// Set app element for modal a11y
Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isIdleModalOpen, setIsIdleModalOpen] = useState(false);

  const onUserIdlePrompt = () => {
    setIsIdleModalOpen(true);
  };

  const resetKiosk = () => {
    setIsIdleModalOpen(false);
    router.push("/");
  };

  const onUserActive = () => {
    setIsIdleModalOpen(false);
  };

  return (
    <IntlProvider locale={router.locale} key={router.locale}>
      {/* Make timer accessible to child components */}
      <IdleTimerProvider
        onIdle={resetKiosk}
        onPrompt={onUserIdlePrompt}
        onActive={onUserActive}
        timeout={INACTIVITY_TIMER.idletime * 1000}
        promptTimeout={INACTIVITY_TIMER.promptduration * 1000}
      >
        <Layout globalValues={globalValues}>
          <Head>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {/* bg image wrapper */}
          <div style={imageWrapperStyle}>
            <Image
              src={bgImage}
              alt="Background image"
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
          {/* Filter wrapper */}
          <div
            style={imageWrapperStyle}
            className="bg-black bg-opacity-50 backdrop-filter backdrop-blur"
          />

          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.pathname} />
          </AnimatePresence>
        </Layout>

        <IdleUser resetKiosk={resetKiosk} isOpen={isIdleModalOpen} />
      </IdleTimerProvider>
    </IntlProvider>
  );
}

// TODO
/*
Note: This page will need to be updated whenever global shared layout 
values, such as the header and footer content, change. This is an active
discussion point in https://github.com/vercel/next.js/discussions/10949.
Current status is waiting on how the team decides to solve the issues 
surrounding having dynamic content in sections of a page while preserving
SSG performance
*/

export default MyApp;
