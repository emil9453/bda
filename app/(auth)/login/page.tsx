import React from 'react';
import LoginForm from './login-form';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const LoginPage: React.FC = async () => {
  const cookieState = await cookies();
  const userCookie = cookieState.get('user')?.value;

  if (userCookie === 'authenticated') {
    redirect('/admin');
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
