import Footer from "@/widgets/footer/Footer";
import Header from "@/widgets/header/Header";

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
