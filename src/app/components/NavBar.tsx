'use client';

import Link from 'next/link';
import AuthModal from './AuthModal';
import { useState, useContext } from 'react';
import { AuthenticationContext } from '../context/AuthContext';
import useAuth from '@/hooks/useAuth';

export default function NavBar() {
  const { data, loading } = useContext(AuthenticationContext);
  const { logout } = useAuth();
  const [loaded, setLoaded] = useState(false);

  if (loading === false && loaded === false) {
    setLoaded(true);
  }

  return (
    <nav className='bg-white p-2 flex justify-between'>
      <Link href='/' className='font-bold text-gray-700 text-2xl mb-[1px]'>
        OpenTable
      </Link>
      <div>
        {loaded && (
          <div className='flex'>
            {data ? (
              <button
                className='border py-1 px-4 rounded hover:bg-gray-100 duration-200'
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <>
                <AuthModal isSignin={true} />
                <AuthModal isSignin={false} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
