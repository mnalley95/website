import Head from 'next/head';
import styles from './layout.module.css';
//import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

export const siteTitle = 'Mark Nalley';
export const myName = 'Mark Nalley';

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-WKSYHTRV43" />
        <Script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-WKSYHTRV43');
          `}
        </Script>
        <meta charSet="UTF-8" />
        <title>{siteTitle}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

      </Head>
      <Script src='background.js'> </Script>
      <div id="particles-js">
        <header className={styles.header}>

          <h1 className={styles.headerH1}> {myName}</h1>

          <nav>
            <ul className={styles.navUl}>
              <li className={styles.navLi}> <Link href='#about'>About</Link></li>
              <li className={styles.navLi}><Link href='#projects'>Projects</Link></li>
              <li className={styles.navLi}><Link href='#experience'>Experience</Link> </li>
              <li className={styles.navLi}><Link href='#contact'>Contact</Link> </li>
            </ul>
          </nav>

        </header>
        <main>{children}</main>

        {/*<!-- particles.js container --> */}
        {/*<!-- particles.js lib - https://github.com/VincentGarreau/particles.js --> */}
        <Script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></Script>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">← Back to home</Link>
          </div>
        )}
      </div>
    </div>

  )
};