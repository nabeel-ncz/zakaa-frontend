import Header from "@/components/common/Header";
import CourseSection from "@/components/home/CourseSection";
import Footer from "@/components/home/Footer";
import HeroSearch from "@/components/home/HeroSearch";
import HeroSection from "@/components/home/HeroSection";
import MentorsSection from "@/components/home/MentorsSection";
import HandleUserLeaving from "@/components/providers/HandleUserLeaving";

export default function Home() {
  return (
    <>
      <HandleUserLeaving />
      <Header />
      <HeroSection />
      <HeroSearch />
      <CourseSection />
      <MentorsSection />
      <Footer />
    </>
  )
}

