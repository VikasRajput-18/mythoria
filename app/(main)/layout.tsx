import Sidebar from "../../components/sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-mystic-800 flex items-start min-h-screen w-full ">
      <Sidebar />
      <main className="w-full">{children}</main>
    </section>
  );
}
