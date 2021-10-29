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

  return (
    <>
      {/* Don't render header in home page */}
      {      
        asPath !== '/' &&
          <header className='fixed w-screen h-16 bg-black bg-opacity-10 backdrop-filter backdrop-blur-xl z-10'>
            <Header {...globalValues.header.logo} />
          </header>
      }      

      <main className='
        py-16
        min-h-screen max-w-7xl m-auto flex
      '>
        {children}
      </main>
    </>
  )
}