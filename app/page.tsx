import type { Metadata } from 'next';
import Image from 'next/image';
import styles from './styles/Home.module.css';
import Layout, { siteTitle } from './components/PageLayout';
import Link from 'next/link';
import ParticleBackground from './components/ParticleBackground';

export const metadata: Metadata = {
  title: siteTitle,
};

export default function Home() {
  return (
    <Layout home>
      <ParticleBackground />
      <main className={styles.body}>

        <Image
          src='/headshot.jpg'
          alt="My headshot"
          width={250}
          height={250}
          priority
          className={styles.headshot}
        />
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
            <li> <Link href="https://noteraity.com">Noteraity</Link>, an AI-powered note-taking app </li>
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
              <div><a
                className="badge-base__link LI-simple-link"
                href="https://www.linkedin.com/in/marknalley/">LinkedIn</a></div>
            </li>
            <li>
              <Link href="mailto:mnalley95@gmail.com">Email</Link>
            </li>
            <li>
              <Link href="https://github.com/mnalley95">Github</Link>
            </li>
          </ul>
        </section>

      </main>
    </Layout>

  )

}
