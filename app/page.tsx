import Image from "next/image";
import EventInquiryForm from "./EventInquiryForm";

const instagramUrl = "https://www.instagram.com/eatzikis/";

const menuItems = [
  {
    number: "01",
    name: "Chicken Gyro",
    description:
      "Herb-marinated chicken, crisp greens, tomato, red onion, feta, and house tzatziki in warm pita.",
  },
  {
    number: "02",
    name: "Lamb Gyro",
    description:
      "Savory sliced lamb, fresh vegetables, feta, and creamy tzatziki wrapped to order.",
  },
  {
    number: "03",
    name: "Trio of Dips",
    description:
      "House tzatziki, hummus, and spicy feta served with warm pita and market vegetables.",
  },
];

const promises = [
  ["Cooked with care", "Made in small batches for every pop-up."],
  ["Fresh by nature", "Bright herbs, crisp produce, and honest ingredients."],
  ["Never seed oils", "A simple standard we keep in every dish."],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ziki's home">
          <span className="brand-name">ZIKI’S</span>
          <span className="brand-kicker">Greek Street Eats</span>
        </a>

        <nav aria-label="Main navigation">
          <a href="#menu">Menu</a>
          <a href="#story">Our story</a>
          <a href="#find-us">Find us</a>
          <a href="#inquire">Inquire</a>
        </nav>

        <a
          className="header-cta"
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
        >
          Follow the pop-up
          <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            <span aria-hidden="true">✦</span> San Diego, California
          </p>
          <h1>
            Greek food,
            <br />
            <em>with sunshine.</em>
          </h1>
          <p className="hero-deck">
            Modern Greek street eats made with organic ingredients, bold
            flavor, and no seed oils.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#menu">
              Explore the menu
              <span aria-hidden="true">↓</span>
            </a>
            <a
              className="text-link"
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              See where we pop up <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="hero-media">
          <Image
            src="/zikis-hero.jpg"
            alt="A chicken gyro with fresh vegetables, feta, tzatziki, and fries"
            fill
            priority
            sizes="(max-width: 820px) 100vw, 58vw"
          />
          <div className="hero-seal" aria-hidden="true">
            <span>Fresh • Modern • Greek •</span>
            <strong>Ζ</strong>
          </div>
          <p className="hero-caption">Good food. Good mood. Kali orexi.</p>
        </div>
      </section>

      <div className="marquee" aria-label="Brand highlights">
        <div>
          <span>MADE FRESH</span>
          <i>◆</i>
          <span>ORGANIC INGREDIENTS</span>
          <i>◆</i>
          <span>NO SEED OILS</span>
          <i>◆</i>
          <span>SAN DIEGO POP-UPS</span>
          <i>◆</i>
          <span>MADE FRESH</span>
        </div>
      </div>

      <section className="intro" id="story">
        <div className="intro-visual">
          <span className="intro-mark" aria-hidden="true">
            Ω
          </span>
          <div className="intro-portrait">
            <Image
              src="/alys-profile.jpg"
              alt="Alyssa Gosselin, founder of Ziki’s"
              width={150}
              height={150}
            />
            <span>Alyssa Gosselin • Founder</span>
          </div>
        </div>
        <div className="intro-copy">
          <p className="eyebrow blue">Meet the founder</p>
          <h2>Power food, made personal.</h2>
          <div className="intro-columns">
            <p>
              Founded by Alyssa Gosselin, Ziki’s grew from her belief that
              powerful food can be fresh, nourishing, and genuinely craveable.
            </p>
            <p>
              Between the gym, meal prep, and deep dietary research, Alyssa
              makes time to curate pop-ups for local businesses throughout San
              Diego. Her care and work ethic show up in every gathering she
              hosts—and in every bite she serves.
            </p>
          </div>
        </div>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-heading">
          <p className="eyebrow light">From the street</p>
          <h2>Meet your new favorites.</h2>
          <p>
            A focused menu of Greek classics, prepared fresh and served with
            all the good stuff.
          </p>
        </div>

        <div className="menu-grid">
          {menuItems.map((item) => (
            <article className="menu-card" key={item.name}>
              <span className="menu-number">{item.number}</span>
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <span className="menu-arrow" aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>

        <p className="menu-note">
          Menu selections vary by event. Follow along for each pop-up lineup.
        </p>
      </section>

      <section className="promise-section">
        <div className="promise-heading">
          <p className="eyebrow">Our kind of good</p>
          <h2>Simple standards. Big flavor.</h2>
        </div>
        <div className="promise-list">
          {promises.map(([title, text], index) => (
            <div className="promise" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="find-us" id="find-us">
        <div className="find-photo" role="img" aria-label="Fresh Greek gyro">
          <div className="find-stamp" aria-hidden="true">
            SD
            <small>CA</small>
          </div>
        </div>
        <div className="find-copy">
          <p className="eyebrow light">Catch us around town</p>
          <h2>
            Your next Greek
            <br />
            food fix is <em>popping up.</em>
          </h2>
          <p>
            Farmers markets, neighborhood gatherings, and special events
            throughout San Diego. The next stop always lands on Instagram
            first.
          </p>
          <a
            className="button button-cream"
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            Follow @eatzikis <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="catering" id="inquire">
        <p className="eyebrow blue">Ziki’s for your next event</p>
        <h2>Let us host something unforgettable.</h2>
        <p>
          From private celebrations to curated pop-ups for local businesses,
          Alyssa brings a fresh Greek menu and generous hospitality to your
          gathering. Send us your date, location, guest count, and event
          details to get started.
        </p>
        <div className="inquiry-details" aria-label="Information to include">
          <span>Date</span>
          <i aria-hidden="true">◆</i>
          <span>Location</span>
          <i aria-hidden="true">◆</i>
          <span>Guest count</span>
          <i aria-hidden="true">◆</i>
          <span>Event type</span>
        </div>

        <EventInquiryForm />

        <p className="form-alternate">
          Prefer a quick hello?{" "}
          <a href={instagramUrl} target="_blank" rel="noreferrer">
            Message @eatzikis on Instagram ↗
          </a>
        </p>
      </section>

      <footer>
        <div className="footer-brand">
          <span>ZIKI’S</span>
          <small>Greek Street Eats</small>
        </div>
        <div className="footer-note">
          <p>Modern Greek street food.</p>
          <p>San Diego, California.</p>
        </div>
        <a href={instagramUrl} target="_blank" rel="noreferrer">
          Instagram ↗
        </a>
        <p className="copyright">© {new Date().getFullYear()} Ziki’s</p>
      </footer>
    </main>
  );
}
