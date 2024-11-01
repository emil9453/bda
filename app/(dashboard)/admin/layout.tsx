import NavigationTabs from '@/components/admincomponents/NavigationTab';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
