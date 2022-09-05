import { motion } from "framer-motion";
import Head from "next/head";
import { Props } from "../../pages/menu";

import MenuRow from "./components/MenuRow";
import MenuRowLayoutDual from "./components/MenuRowLayoutDual";

export default function Home({ strings }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // stretch to fill height of container
      className="self-stretch w-full"
    >
      <Head>
        <title>{strings.pageTitle}</title>
      </Head>
      <main className="h-full">
        <h1 className="text-2xl text-center p-2 pb-3 text-blue-50">
          {strings.pageTitle}
        </h1>

        {/* MenuRowLayoutDual - About & Events */}
        <div className="mt-2">
          <MenuRowLayoutDual
            sectionSm={
              <MenuRow
                title={strings.about.title}
                menuItems={strings.about.menuItems}
              />
            }
            sectionLg={
              <MenuRow
                title={strings.events.title}
                menuItems={strings.events.menuItems}
              />
            }
          />

          {/* Directory */}
          <MenuRow
            title={strings.directory.title}
            menuItems={strings.directory.menuItems}
          />
        </div>
      </main>
    </motion.div>
  );
}
