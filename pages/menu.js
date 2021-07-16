import { ApolloClient, InMemoryCache } from '@apollo/client';
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';


import GetMenuStrings from './../shared/graphql-cms/GetMenuStrings';

export default function Home({ strings, locale, locales}) {
  let router = useRouter();


  return (
    <div className={styles.container}>
      
      <main className={styles.main}>
        <h1 className={styles.title}>
        { strings.Map.XX_fieldName }
        </h1>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </footer>
    </div>
  )
}




/* DATA FETCHING -- (PRE-RENDERED VIA getStaticProps) */
export async function getStaticProps({ locale, locales }) {

  // NOTE: All configured locales inside of Next.js are the same as the locales configured
  // within Strapi

  const client = new ApolloClient({
    uri: process.env.CMS_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache()
  });

  
  const { data } = await client.query({
    query: GetMenuStrings(locale)
  });

  // handle graphql errors

  return {
    props: {
      strings: data.menuString,
      locale,
      locales
    }
  }
}