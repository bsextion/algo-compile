import React from 'react';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  return (
    <form className='space-y-6 px-6 px-4'>
      <h3 className='text-xl font-medium text-white'>Sign in</h3>
      <div>
        <label
          htmlFor='email'
          className='text-sm font-medium block mb-2 text-gray-300'
        >
          Your Email
        </label>
        <input
          type='email'
          name='email'
          id='email'
          className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
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
          type='password'
          name='password'
          id='password'
          className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
        placeholder=''
        />
      </div>
    </form>
  );
};
export default Login;
