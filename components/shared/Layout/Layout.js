// global page layout
import Header from './components/Header';


export default function Layout({ children }) {
  return (
    <>
      <header className='fixed w-screen h-16 bg-blue-100'><Header /></header>
      <main className='pt-16 bg-blue-200'>{children}</main>
    </>
  )
}