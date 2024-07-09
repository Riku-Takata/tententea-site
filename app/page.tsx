"use client"

import Concept from "./components/layout/Concept/page";
import Menu from "./components/layout/Menu/page";
import Operation from "./components/layout/Operation/page";
import News from "./components/layout/News/page";
import Map from "./components/layout/Location/page";
import Header from "./components/layout/Header/page";
import { useEffect, useState } from "react";
import Footer from "./components/layout/Footer/page";
import LoadingIndicator from "./components/layout/LoadingIndicater/page";

type SectionName = 'concept' | 'menu' | 'operation';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [sectionRefs, setSectionRefs] = useState<Record<SectionName, HTMLElement | null>>({
    concept: null,
    menu: null,
    operation: null
  });

  const handleScrollToSection = (sectionName: SectionName) => {
    if (sectionRefs[sectionName]) {
      sectionRefs[sectionName]?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // アニメーションの継続時間を設定

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <LoadingIndicator setLoading={setLoading}/>}
      {!loading && (
        <main className="flex-1 animate-fadeIn">
          <Header onScrollToSection={handleScrollToSection}/>
          <News />
          <Concept setRef={(node) => setSectionRefs(prev => ({ ...prev, concept: node }))}/>
          <Menu setRef={(node) => setSectionRefs(prev => ({ ...prev, menu: node }))}/>
          <Operation setRef={(node) => setSectionRefs(prev => ({ ...prev, operation: node }))}/>
          <Map />
          <Footer />
        </main>
      )}
    </>
  );
}