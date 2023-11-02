import { authModalState } from '@/atoms/authModalAtom';
import AuthModal from '@/components/Modals/AuthModal';
import Navbar from '@/components/NavBar/Navbar';
import React from 'react';
import { useRecoilValue } from 'recoil';

type AuthProps = {};

const AuthPage: React.FC<AuthProps> = () => {
  const authModal = useRecoilValue(authModalState);

  return (
    <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
      <div className='max-w-7xl mx-auto'>
        <Navbar />
        <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
          <img src='/hero.png' alt='Hero Image' />
        </div>
        {authModal.isOpen && <AuthModal/>}
      </div>
    </div>
  );
};
export default AuthPage;
