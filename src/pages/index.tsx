import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

function WelcomeSection() {
  return (
    <section className={styles.welcome}>
      <div className="container">
        <div className={styles.welcomeContent}>
          <Heading as="h2" className={styles.welcomeTitle}>
            Welcome
          </Heading>
          <p className={styles.welcomeText}>
            This documentation hub provides comprehensive resources for international 
            students at BYU-Hawaii. Find guides on maintaining your visa status, 
            employment authorization, and essential student services.
          </p>
          <div className={styles.ctaContainer}>
            <Link
              className={styles.ctaButton}
              to="/docs/intro">
              Get Started →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>

        <WelcomeSection />
      </main>
    </Layout>
  );
}
