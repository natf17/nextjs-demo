// global page layout
import Header from './components/Header';

export type Props = {
  children: React.ReactNode, 
  globalValues: {
    header: {
      title: string,
      logo: {
        height: number,
        src: string,
        width: number
      }
    }
  }
}

export default function Layout({ children, globalValues }: Props) {
  return (
    <>
      <header className='fixed w-screen h-16 bg-blue-100'>
        <Header title={globalValues.header.title} />
      </header>

      <main className='py-16 bg-blue-200 min-h-screen max-w-6xl m-auto flex'>
        {children}
      </main>
    </>
  )
}