import Navbar from 'components/navbar/navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
