// global page layout
import Header from './components/Header';


export default function Layout({ children }) {
  return (
    <>
      <header className='fixed w-screen h-16 bg-blue-100'><Header /></header>
      <main className='py-16 bg-blue-200 min-h-screen max-w-6xl m-auto flex'>{children}</main>
    </>
  )
}