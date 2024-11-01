import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET() {
  const cookieState = await cookies();

  cookieState.delete('user');

  redirect('/');
}
