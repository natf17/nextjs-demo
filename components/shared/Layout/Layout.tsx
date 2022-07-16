// global page layout
import Header from "./components/Header";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

export type Props = {
  children: React.ReactNode;
  globalValues: {
    header: {
      logo: {
        src: string;
        height: number;
        width: number;
      };
    };
  };
};

const HeaderAnimationStates = {
  hidden: {
    top: -70,
    opacity: 0,
  },
  visible: {
    top: 0,
    opacity: 1,
    transition: {
      delay: 1.15,
    },
  },
};

export default function Layout({ children, globalValues }: Props) {
  const { asPath } = useRouter();

  return (
    <>
      {/* Don't render header in home page */}
      <AnimatePresence>
        {asPath !== "/" && (
          <motion.header
            className="fixed w-screen h-14 bg-black bg-opacity-10 backdrop-filter backdrop-blur-xl z-10 border-b border-indigo-300"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={HeaderAnimationStates}
          >
            <Header {...globalValues.header.logo} />
          </motion.header>
        )}
      </AnimatePresence>

      <main
        className="
        pt-[5rem] pb-16
        min-h-screen max-w-5xl m-auto flex
      "
      >
        {children}
      </main>
    </>
  );
}
