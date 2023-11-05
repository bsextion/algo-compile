import { authModalState } from '@/atoms/authModalAtom';
import React, { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import { auth } from '@/firebase/firebase';
import { set } from 'firebase/database';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();

  const handleClick = (type: 'login' | 'register' | 'forgotPassword') => {
    setAuthModalState((prev) => ({ ...prev, type }));
  };
  const [inputs, setInputs] = useState({
    email: '',
    displayName: '',
    password: '',
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password) {

      return toast.error('Please fill in empty fields', {position: 'top-center', autoClose: 3000})
    }
    try {
      const user = await signInWithEmailAndPassword(inputs.email, inputs.password);
      if (!user) {
        return;
      }
      router.push('/');
    } catch (error: any) {
      toast.error(error.message, {position: 'top-center', autoClose: 3000})
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message, {position: 'top-center', autoClose: 3000})
    }
  }, [error]);
  return (
    <form className='space-y-6 px-6 pb-4' onSubmit={handleSubmit}>
      <h3 className='text-xl font-medium text-white'>Sign in</h3>
      <div>
        <label
          htmlFor='email'
          className='text-sm font-medium block mb-2 text-gray-300'
        >
          Your Email
        </label>
        <input
          onChange={handleInputChange}
          type='email'
          name='email'
          id='email'
          className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
          bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
          placeholder='name@company.com'
        />
      </div>
      <div>
        <label
          htmlFor='password'
          className='text-sm font-medium block mb-2 text-gray-300'
        >
          Your Password
        </label>
        <input
          onChange={handleInputChange}
          type='password'
          name='password'
          id='password'
          className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
          placeholder='********************************'
        />
      </div>
      <button
        type='submit'
        className='w-full text-white focus:ring-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s'
      >
        {loading ? 'Loading...' : 'Log in'}
      </button>
      <button
        className='flex w-full justify-end'
        onClick={() => handleClick('forgotPassword')}
      >
        <a
          href='#'
          className='text-sm block text-brand-orange hover:underline w-full text-right'
        >
          Forgot Password
        </a>
      </button>
      <div className='text-sm font-medium text-gray-500'>
        Not Registered? {'  '}
        <a
          href='#'
          className='text-blue-700 hover:underline'
          onClick={() => handleClick('register')}
        >
          Create Account
        </a>
      </div>
    </form>
  );
};
export default Login;
