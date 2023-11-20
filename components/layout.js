import Head from 'next/head';
import styles from './layout.module.css';
//import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import ParticleBackground from './ParticleBackground';

export const siteTitle = 'Mark Nalley';
export const myName = 'Mark Nalley';

export default function Layout({ children, home }) {
  return (
    <div id='pagebackground'>
      <Head>

        <meta charSet="UTF-8" />
        <title>{siteTitle}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </Head>
      {/* Google tag (gtag.js) */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-WKSYHTRV43"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-WKSYHTRV43');
          `}
      </Script>

      <header className={styles.header}>

        <h1 className={styles.headerH1}> {myName}</h1>

        <nav>
          <ul className={styles.navUl}>
            <li className={styles.navLi}> <Link href='/#about'>About</Link></li>
            <li className={styles.navLi}><Link href='/#projects'>Projects</Link></li>
            <li className={styles.navLi}><Link href='/#experience'>Experience</Link> </li>
            <li className={styles.navLi}><Link href='/#contact'>Contact</Link> </li>
            <li className={styles.navLi}><Link href='/completions'>Completions</Link> </li>
          </ul>
        </nav>

      </header>
      <div>
        <main>{children}</main>

        {/*<!-- particles.js container --> */}
        {/*<!-- particles.js lib - https://github.com/VincentGarreau/particles.js --> */}
        <Script id='tsparticles' src="https://cdn.jsdelivr.net/npm/tsparticles@1.17.5/dist/tsparticles.min.js"
          integrity="sha256-Wcr5q//r5yGozjRl+ToXruCoy75vgiApkKsV30aCns8=" crossOrigin="anonymous"></Script>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">← Back to home</Link>
          </div>
        )}


      </div>

      <footer className={styles.footer}>
      </footer>

    </div>
  );
};