import type { PropsWithChildren } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
