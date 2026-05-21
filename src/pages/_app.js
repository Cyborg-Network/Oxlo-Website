import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Headline from '@/components/Headline';
import OxloChatbot from '@/components/OxloChatbot';
import { Analytics } from '@/components/GoogleAnalytics';
import '@/styles/globals.css';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const HexBackground = dynamic(() => import('@/components/HexBackground'), { ssr: false });
const SmoothScroll = dynamic(() => import('@/components/SmoothScroll'), { ssr: false });
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false });

export default function App({ Component, pageProps }) {
  const noLayout = Component.noLayout;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Analytics />
      <SmoothScroll />
      <ScrollProgress />
      <HexBackground />
      <Headline />
      <Header/>
      <Component {...pageProps} />
      <Footer/>
      <OxloChatbot />
    </>
  )
}
