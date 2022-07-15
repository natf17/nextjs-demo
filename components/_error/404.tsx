import { motion } from "framer-motion";
import { Props } from "../../pages/404";
import Link from "next/link";
import { KeyboardReturnSharp, BrokenImageTwoTone } from "@mui/icons-material";

export default function Custom404({ strings }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-[90%] flex justify-center items-center"
    >
      <div className="pb-8">
        <div className="text-center pb-6 text-2xl">
          <BrokenImageTwoTone htmlColor="#d9d9d9" fontSize="large" />
        </div>

        <h1 className="text-5xl text-center text-blue-200 pb-3">
          {strings.pageTitle}
        </h1>

        <p className="text-center text-slate-100 pt-2 pb-6">
          {strings.errorDescription}
        </p>

        <div className="text-center">
          {strings.showRedirectLink && strings.redirectLink && (
            <Link href={strings.redirectLink.url}>
              <a
                title={strings.redirectLink.description}
                className="text-blue-200"
              >
                <h2 className="uppercase">
                  <KeyboardReturnSharp />
                  {strings.redirectLink.displayText}
                </h2>
              </a>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
