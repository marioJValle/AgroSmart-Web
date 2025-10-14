import { Outlet } from 'react-router-dom';
import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';


export default function MainLayout() {
  return (
    <div>
      <Header />
      <main className='pt-5'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}