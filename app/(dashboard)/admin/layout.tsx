import NavigationTabs from '@/components/admincomponents/NavigationTab';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieState = await cookies();
  const userCookie = cookieState.get('user')?.value;

  if (userCookie !== 'authenticated') {
    redirect('/login');
  }

  return (
    <>
      <header className="flex overflow-hidden flex-col pb-0 bg-white max-md:pb-24">
        <section className="flex flex-col px-20 mb-4 mt-24 w-full max-md:px-5 max-md:mt-2 max-md:max-w-full">
          <NavigationTabs />
        </section>
      </header>
      {children}
    </>
  );
}
