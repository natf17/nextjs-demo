// global page layout
import Header from './components/Header';
import { useRouter } from 'next/router';

export type Props = {
  children: React.ReactNode, 
  globalValues: {
    header: {      
      logo: {
        src: string,
        height: number,
        width: number
      }
    }
  }
}

export default function Layout({ children, globalValues }: Props) {
  const { asPath } = useRouter();
  console.log(asPath);

  return (
    <>
      {/* Only render header if not in home page */}
      {      
        asPath !== '/' &&
          <header className='fixed w-screen h-16 bg-blue-100'>
            <Header {...globalValues.header.logo} />
          </header>
      }      

      <main className='py-16 bg-blue-200 min-h-screen max-w-6xl m-auto flex'>
        {children}
      </main>
    </>
  )
}