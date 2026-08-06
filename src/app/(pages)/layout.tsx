import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";

interface Props {
  children: React.ReactNode;
}

export default function PagesLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
