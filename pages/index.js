import Head from 'next/head';
//import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Layout, { siteTitle } from '../components/layout';
import Link from 'next/link';
import Script from 'next/script';
//import headshot from '../public/headshot.jpg';



export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <main className={styles.body}>
        <img src='/headshot.jpg' alt="My headshot" className={styles.headshot} />
        <section id="about" className={styles.section}>
          <h2>About Me</h2>

          <p>I&apos;m currently working in Operations at Apple, after a few stints working in Operations and Supply Chain roles at CPG companies in Atlanta.</p>

          <p>My creative outlets are data science and software development. I&apos;m a self-taught developer, and have used my skills to build tools to make my coworkers and I work more efficiently.</p>

        </section>

        <section id="projects" className={styles.section}>
          <h2>Projects</h2>
          Some of my work:
          <ul>
            <li>Automated demand forecasting package that uses statistical models and machine learning (XGBoost, Prophet) to accurately project demand for hundreds of SKUs across more than 100 distribution points, accounting for $750m in annual revenue</li>
            <li>Dashboarding, analytics, and reporting suites serving hundreds of users that consolidate data from multiple different sources, saving team members time and enabling them to make better decisions. ETL pipelines in SQL and Python, frontend in Tableau, PowerBI, Streamlit</li>
            <li>This website, initially built using Django, and since rebuilt using React.js</li>
          </ul>
        </section>

        <section id="experience" className={styles.section}>
          <h2>Experience</h2>
          <ul>
            <li>Worldwide Supply Demand Management at <Link href="https://www.apple.com">Apple</Link></li>
            <li>Senior Manager, Demand Planning at <Link href="https://www.kikcorp.com">KIK Consumer Products</Link>
            </li>
            <li>Demand Planning at <Link href="https://primowatercorp.com/about-us/">Primo Water Corporation</Link>
            </li>
          </ul>
          <h2>Skills</h2>
          <ul>
            <li>Python, R, SQL, JavaScript, CSS, HTML</li>
          </ul>
        </section>

        <section id="contact" className={styles.section}>
          <h2>Get in Touch</h2>
          <p>Feel free to reach out to me:</p>
          <ul>
            <li>
              <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium"
                data-theme="dark" data-type="VERTICAL" data-vanity="marknalley" data-version="v1"><a
                  className="badge-base__link LI-simple-link"
                  href="https://www.linkedin.com/in/marknalley?trk=profile-badge">LinkedIn</a></div>
            </li>
            <li>
              <Link href="mailto:mnalley95@gmail.com">Email</Link>
            </li>
            <li>
              <a className="github-button" href="https://github.com/mnalley95" data-show-count="true"
                aria-label="Follow @your-username on GitHub">@mnalley95</a>
            </li>
          </ul>
        </section>



        <Script src="https://platform.linkedin.com/badges/js/profile.js" strategy='lazyOnload' async defer type="text/javascript"></Script>
        <Script async defer src="https://buttons.github.io/buttons.js"></Script>

      </main>
    </Layout>


  )

}
