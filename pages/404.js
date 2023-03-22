import Image from 'next/image';
import Link from 'next/link';
import errorMascot from '../public/icons/error.png';
import NavBar from '@/src/app/components/NavBar';
import '@/src/app/globals.css';

// pages/404.js
const NotFoundPage = () => {
  return (
    <main className='bg-gray-100 min-h-screen w-screen'>
      <main className='max-w-screen-2xl m-auto bg-white'>
        <NavBar />
        <div className='h-screen bg-gray-200 flex flex-col justify-center items-center'>
          <Image src={errorMascot} alt='error' className='w-56 mb-8' />
          <div className='bg-white px-9 py-14 shadow rounded'>
            <h3 className='text-3xl font-bold'>Well, this is embarrassing</h3>
            <p className='text-reg font-bold'>
              We couldn&apos;t find that restaurant
            </p>
            <div className='mt-6 text-sm font-light'>Error code: 404</div>

            <Link
              href='/'
              className='flex border rounded p-4 m-4 justify-center text-center'
            >
              Go back to Home
            </Link>
          </div>
        </div>
      </main>
    </main>
  );
};

export default NotFoundPage;
