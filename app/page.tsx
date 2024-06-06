"use client"

import Client from "./components/layout/Concept/page";
import Menu from "./components/layout/Menu/page";
import Operation from "./components/layout/Operation/page";
import News from "./components/layout/News/page";
import Map from "./components/layout/Location/page";
import Header from "./components/layout/Header/page";
import { useEffect, useState } from "react";
import Footer from "./components/layout/Footer/page";
import LoadingIndicator from "./components/layout/LoadingIndicater/page";
import Auth from "./components/useAuth/useAuth";

export default function Home() {
  const [loading, setLoading] = useState(true);

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
          <Header />
          <News />
          <Client />
          <Menu />
          <Operation />
          <Map />
          <Auth/>
          <Footer />
        </main>
      )}
    </>
  );
}