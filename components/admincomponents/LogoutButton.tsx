'use client';

import { LogOut } from 'lucide-react';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

export const LogoutButton = () => {
  const pathname = usePathname();

  return (
    pathname != '/' && (
      <Link className="flex text-sm pt-2" prefetch={false} href={'/logout'}>
        <LogOut className="h-5 w-5 mr-2" />
        Logout
      </Link>
    )
  );
};
