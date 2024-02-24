import Footer from "@/components/UI/Footer";
import Header from "@/components/UI/Header";

export default function SimpleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
    <Footer />
    </>
  );
}