import Navbar from 'components/navbar/navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className=' pt-48 md:pt-20 lg:pt-24 lg:w-256 mx-auto'>
        {children}
      </main>
    </>
  )
}
