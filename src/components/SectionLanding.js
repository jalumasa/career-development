import React, { useEffect, useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { fetchCollection } from '../firebase';
import LoadingIndicator from './LoadingIndicator';
import Reveal from './Reveal';
import './SectionLanding.css';

const TEASER_COUNT = 6;

/**
 * Shared "sign in to unlock" landing page shown at a section's route
 * (e.g. /resources) when no one is signed in. Optionally fetches a handful
 * of real documents from Firestore to use as a locked preview, so the
 * preview reflects real content rather than generic marketing copy.
 */
const SectionLanding = ({
  icon,
  eyebrow,
  title,
  description,
  benefits,
  collectionName,
  renderTeaser,
  teaserHeading = "A preview of what's inside",
  children,
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(!!collectionName);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!collectionName) return;

    const fetchTeaser = async () => {
      try {
        // Cap at the query, not after — these pages are public, and article
        // bodies are large enough that fetching the whole collection to show
        // six cards is real bandwidth per anonymous visitor.
        setItems(await fetchCollection(collectionName, { max: TEASER_COUNT }));
      } catch (error) {
        console.error(`Error fetching ${collectionName} teaser:`, error);
        setFailed(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTeaser();
  }, [collectionName]);

  // The teaser is a nice-to-have on a marketing page. If it can't load, drop
  // the whole section rather than leaving a heading stranded over an empty
  // grid — an error banner here would be noise to someone who isn't signed in.
  const showTeaser = collectionName && !failed && (loading || items.length > 0);

  return (
    <div className="section-landing">
      <section className="section-landing-hero">
        <div className="feature-icon feature-icon-lg">{icon}</div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hero-subtitle">{description}</p>
        <div className="home-buttons">
          <Link to="/login" className="home-button home-button-primary">Sign up free</Link>
          <Link to="/login" className="home-button home-button-ghost">Log in</Link>
        </div>
      </section>

      <section className="section">
        <div className="landing-benefits">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 80} className="landing-benefit">
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {children}

      {showTeaser && (
        <section className="section section-alt">
          <Reveal className="section-heading">
            <h2>{teaserHeading}</h2>
          </Reveal>

          {loading ? (
            <LoadingIndicator />
          ) : (
            <div className="teaser-grid">
              {items.map((item, i) => (
                <Reveal key={i} delay={i * 60} className="teaser-card">
                  {renderTeaser(item)}
                  <span className="teaser-lock"><FaLock /> Sign in to view</span>
                </Reveal>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="cta-band">
        <Reveal>
          <h2>Ready to get started?</h2>
          <p>Create a free account — it takes less than a minute.</p>
          <Link to="/login" className="home-button home-button-primary">Sign up free</Link>
        </Reveal>
      </section>
    </div>
  );
};

export default SectionLanding;
