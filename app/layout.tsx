import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import './globals.css';
import { cookies } from 'next/headers';
import { LogoutButton } from '@/components/admincomponents/LogoutButton';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
const kyivType = localFont({
  src: './fonts/KyivTypeTitling-Bold.otf',
  weight: '100 900',
  variable: '--font-kyivtype',
});
const poppins = localFont({
  src: './fonts/Poppins-Bold.ttf',
  weight: '100 900',
  variable: '--font-poppins',
})
const publicSans = localFont({
  src: './fonts/PublicSans-Bold.ttf',
  weight: '100 900',
  variable: '--font-publicSans'
})

export const metadata: Metadata = {
  title: 'Topdoc',
  description: 'Topdoc official site',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieState = await cookies();
  const userCookie = cookieState.get('user')?.value;
  // url in server component
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${kyivType.variable} ${poppins.variable} ${publicSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="overflow-hidden flex justify-between px-12 py-3.5 text-4xl font-bold text-black whitespace-nowrap bg-[rgba(255,174,53,1)] max-md:px-5">
          <Link href={'/'} className="font-kyiv">
            Topdoc
          </Link>
          {userCookie && <LogoutButton />}
        </header>
        {children}
      </body>
    </html>
  );
}
