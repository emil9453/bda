'use server';

import { cookies } from 'next/headers';

export async function login(prevState: any, formData: FormData) {
  const cookieStore = await cookies();
  const number = formData.get('number');
  const password = formData.get('password');

  // Here you would typically validate the credentials against your database
  // For this example, we'll use a mock validation
  if (number === '123' && password === '123') {
    // Set a cookie to indicate the user is logged in
    cookieStore.set('user', 'authenticated', { httpOnly: true, secure: true, maxAge: 2147483647 });

    // Redirect to the dashboard or home page
    return { success: true, token: 'mock-token' };
  } else {
    // Return an error if the credentials are incorrect
    return { error: 'Invalid phone number or password' };
  }
}
