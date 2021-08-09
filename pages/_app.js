import 'tailwindcss/tailwind.css';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from './../components/shared/Layout';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Layout>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={ router.pathname } />
      </AnimatePresence>
    </Layout>
  );
}

export default MyApp
