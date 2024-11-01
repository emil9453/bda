import * as React from 'react';
import DoctorTable from '@/components/admincomponents/Table';
import { SearchBar } from '@/components/admincomponents/SearcBar';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const AdminPanel: React.FC = async () => {
  const cookieState = await cookies();
  const userCookie = cookieState.get('user')?.value;

  if (userCookie !== 'authenticated') {
    redirect('/login');
  }

  return (
    <main className="flex overflow-hidden flex-col pb-96 bg-white max-md:pb-24">
      <section className="flex flex-col px-20 mt-8 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <SearchBar />
        <DoctorTable />
      </section>
    </main>
  );
};

export default AdminPanel;
