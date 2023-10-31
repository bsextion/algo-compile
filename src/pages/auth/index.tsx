import Navbar from '@/components/NavBar/Navbar';
import React from 'react';

type AuthProps = {

};

const AuthPage: React.FC<AuthProps> = () => {

    return <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
        <div className='max-w-7xl mx-auto'>
            <Navbar/>
        </div>
    </div>
}
export default AuthPage;