import Hero from "@/components/hero";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Gallery from "@/components/gallery";

export default function Home() {
  return (
    <main>
      <div className="bg-custom-black bg-gradient-to-r from-custom-green via-custom-black to-custom-black">
        <Header />
        <Hero />
      </div>
      <Gallery />
      <Footer />
    </main>
  );
}
