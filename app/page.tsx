import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Programs from "./components/Programs";
import LearningExperience from "./components/LearningExperience";
import WhoCanJoin from "./components/WhoCanJoin";
import WhyChooseUs from "./components/WhyChooseUs";
import ToolsAndCTA from "./components/ToolsAndCTA";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact"; // Import the new component

export default function Home() {
  return (
    <main className="relative bg-[#FAFAFA] text-[#111827] overflow-hidden selection:bg-[#2563EB] selection:text-white">
      <Navbar />
      
      {/* We use a unified padding top so the hero clears the fixed navbar */}
      <div className="pt-32">
        <Hero />
      </div>
      
      <About />
      <Programs />
      <LearningExperience />
      <WhoCanJoin />
      <WhyChooseUs />
      <ToolsAndCTA />
      <FAQ />
      <Footer />
      
      {/* Add the floating component here */}
      <FloatingContact />
    </main>
  );
}