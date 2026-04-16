"use client";

import dynamic from 'next/dynamic';

const FirReport = dynamic(() => import('@/components/FirReport'), {
  ssr: false,
});

export default function FirReportPage() {
  return (
    <>
      <div className="bg-tg">
        <div className="bg-mesh" />
        <div className="bg-grid" />
        <div className="bg-vignette" />
      </div>
      <div className="min-h-screen pt-20 relative z-10">
        <FirReport />
      </div>
    </>
  );
}
