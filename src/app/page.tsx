import Header from "@/components/common/Header";
import HeroSearch from "@/components/home/HeroSearch";
import HeroSection from "@/components/home/HeroSection";
import HandleUserLeaving from "@/components/providers/HandleUserLeaving";

export default function Home() {
  return (
    <>
      <HandleUserLeaving />
      <Header />
      <HeroSection />
      <HeroSearch />
    </>
  )
}

