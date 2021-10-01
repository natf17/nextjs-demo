import { motion } from 'framer-motion';
import { Props } from '../../pages/404';
import Link from 'next/link';


export default function Custom404({strings}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>{strings.pageTitle}</h1>

      <p>{strings.errorDescription}</p>

      { strings.showRedirectLink && strings.redirectLink &&
        <Link href={strings.redirectLink.url}>
          <a title={strings.redirectLink.description}>{strings.redirectLink.displayText}</a>
        </Link>
      }
    </motion.div>
  )
}