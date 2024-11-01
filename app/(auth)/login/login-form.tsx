'use client';

import { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { login } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginForm() {
  const [state, formAction] = useActionState(login, null);
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (state && state.success) {
      console.log('Login successful:');
      localStorage.setItem('token', state.token);
      window.location.href = '/admin';
    }
  }, [state]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form action={formAction} className="space-y-4">
          <Input
            type="number"
            placeholder="Phone number"
            value={number}
            name="number"
            onChange={e => setNumber(e.target.value)}
            required
            className="w-full"
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full"
          />
          <Button
            type="submit"
            className="w-full overflow-hidden text-stone-50 px-4 py-3 my-auto text-xl font-semibold bg-amber-500 rounded-lg"
          >
            Continue
          </Button>
          {state && state.error && (
            <p className="mt-2 text-center text-sm text-red-600" role="alert">
              {state.error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
