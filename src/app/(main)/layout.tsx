import Sidebar from "@/components/sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-mystic-800 flex items-start min-h-screen w-full ">
      <Sidebar />
      {children}
    </section>
  );
}
