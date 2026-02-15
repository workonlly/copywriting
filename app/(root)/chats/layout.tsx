import Accounts from "./accounts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
 

  return (
    <div className="grid grid-cols-[30%_70%] md:grid-cols-[280px_1fr] h-full">
     <section className="border-r border-gray-200 bg-white flex flex-col h-full">
        <div className="p-2 sm:p-3 md:p-4 border-b border-gray-200 bg-gray-50 shrink-0">
         <h2 className="font-black uppercase tracking-tight text-xs sm:text-sm md:text-lg">Contacts</h2>
        </div>
        <div className="overflow-y-auto flex-1">
         <Accounts></Accounts>
        </div>
     </section>
      <main className="flex-1 min-h-0 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
