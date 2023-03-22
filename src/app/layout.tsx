import NavBar from './components/NavBar';
import './globals.css';
import AuthContext from './context/AuthContext';
import 'react-datepicker/dist/react-datepicker.css';
import { Suspense } from 'react';
import LoadingHomePage from './LoadingHomePage';

// export const metadata = {
//   title: 'OpenTable',
//   description:
//     'Make online reservations, read restaurant reviews from diners, and earn points towards free meals. OpenTable is a real-time online reservation network for fine dining restaurants.',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='select-none'>
        <main className='bg-gray-100 min-h-screen w-full'>
          <AuthContext>
            <main className='max-w-screen-2xl m-auto bg-white'>
              <NavBar />
              <Suspense fallback={LoadingHomePage()}>{children}</Suspense>
            </main>
          </AuthContext>
        </main>
      </body>
    </html>
  );
}
