import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Instagram, Mail, MapPin, Sparkles } from "lucide-react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";
import chocolateCone from "./assets/photos/chocolate-cone.jpg";
import strawberryHandCone from "./assets/photos/strawberry-hand-cone.jpg";
import pinkVanillaCone from "./assets/photos/pink-vanilla-cone.jpg";
import blueWaffleCone from "./assets/photos/blue-waffle-cone.jpg";
import yellowSprinkleCone from "./assets/photos/yellow-sprinkle-cone.jpg";
import yellowPinkCone from "./assets/photos/yellow-pink-cone.jpg";
import mintHandCone from "./assets/photos/mint-hand-cone.jpg";
import mintChocolateCone from "./assets/photos/mint-chocolate-cone.jpg";
import streetCone from "./assets/photos/street-cone.jpg";
import blueChocolateCone from "./assets/photos/blue-chocolate-cone.jpg";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const brandName = "Glac\u00e9 Club";

const heroFacts = [
  { label: "Base", value: "14 hr", copy: "overnight cold rest" },
  { label: "Drop", value: "Fri", copy: "new weekly scoops" },
  { label: "Serve", value: "-12", copy: "dense, glossy finish" }
];

const flavors = [
  {
    name: "Chocolate Noir",
    note: "dark cocoa, roasted milk, brittle crumbs",
    price: "$12",
    kcal: "260",
    number: "01",
    image: chocolateCone,
    alt: "Chocolate ice cream cone with melting scoops",
    color: "#2a1711",
    ink: "#fff8ef",
    accent: "#dfb086",
    position: "center 70%"
  },
  {
    name: "Rose Milk",
    note: "strawberry cream, rose sugar, cool mint finish",
    price: "$14",
    kcal: "280",
    number: "02",
    image: strawberryHandCone,
    alt: "Hand holding pink strawberry ice cream cone",
    color: "#ffc3d8",
    ink: "#1f1818",
    accent: "#0f7a58",
    position: "center 58%"
  },
  {
    name: "Vanilla Salt",
    note: "salted vanilla, wafer butter, lemon dust",
    price: "$13",
    kcal: "240",
    number: "03",
    image: pinkVanillaCone,
    alt: "Vanilla ice cream cone against a pink background",
    color: "#b9edff",
    ink: "#211717",
    accent: "#ffb11f",
    position: "center 56%"
  }
];

const notes = [
  "Real cream is aged overnight, then churned cold enough to hold a clean edge.",
  "Fruit is cooked down like jam, folded late, and kept bright instead of sugary.",
  "Every release is edited like a studio drop: fewer flavors, better texture, cleaner finish."
];

const gallery = [
  { label: "Mint", title: "Pistachio wall", image: mintHandCone, alt: "Mint ice cream cone against a textured wall" },
  { label: "Texture", title: "Cocoa fold", image: chocolateCone, alt: "Chocolate ice cream texture" },
  { label: "Blue", title: "Waffle line", image: blueChocolateCone, alt: "Ice cream cone against a blue background" },
  { label: "Cone", title: "Street split", image: streetCone, alt: "Hand holding chocolate and vanilla cone" },
  { label: "Garden", title: "Rose milk", image: strawberryHandCone, alt: "Pink cone held with ivy" },
  { label: "Classic", title: "Mint cocoa", image: mintChocolateCone, alt: "Mint and chocolate cone" }
];

const fadeUp = {
  hidden: { opacity: 0, y: 42 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
  }
};

const dividerPaths = {
  drips: "M0 0H1440V72C1397 56 1369 86 1325 75C1293 67 1278 28 1242 39C1205 51 1214 97 1174 101C1125 106 1112 48 1064 55C1017 62 1018 119 972 122C918 125 905 56 854 59C806 62 795 116 747 118C700 121 681 70 635 73C589 77 585 126 537 124C489 122 480 69 433 68C381 67 367 122 316 116C274 111 262 72 222 75C176 79 160 123 114 118C68 113 58 70 0 84V160H1440V0Z",
  mountains: "M0 0H1440V70C1390 84 1345 91 1299 89C1240 86 1193 58 1135 66C1086 73 1046 106 994 105C932 105 892 56 831 50C770 45 719 83 662 97C602 112 565 78 508 64C445 48 398 86 340 103C281 121 239 84 180 74C113 62 68 93 0 86V160H1440V0Z",
  clouds: "M0 0H1440V82C1391 90 1368 54 1324 68C1292 78 1289 108 1254 108C1216 108 1207 72 1171 76C1131 80 1128 124 1085 120C1041 117 1034 77 992 82C949 87 940 126 897 119C858 112 849 82 809 87C763 94 756 135 709 128C672 123 667 91 629 94C591 97 584 128 545 126C506 124 497 86 458 88C417 90 405 124 365 121C327 118 320 88 282 88C244 88 235 122 197 123C153 124 142 82 100 78C63 75 39 99 0 101V160H1440V0Z"
};

function AwardCurtain({ done }) {
  return (
    <motion.div
      className="award-curtain"
      initial={{ y: 0 }}
      animate={{ y: done ? "-101%" : 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden="true"
    >
      <div className="loader-mark">GLACE CLUB</div>
      <div className="loader-dots">
        <span />
        <span />
        <span />
      </div>
    </motion.div>
  );
}

function SplitTitle({ text, id }) {
  const words = text.split(" ");

  return (
    <h1 id={id} className="split-title hero-title" aria-label={text}>
      {words.map((word, wordIndex) => (
        <React.Fragment key={word}>
          <span className="split-word" aria-hidden="true">
            {word.split("").map((char, index) => (
              <span className="title-char" key={`${word}-${char}-${index}`}>
                {char}
              </span>
            ))}
          </span>
          {wordIndex < words.length - 1 ? <span className="split-space" aria-hidden="true">&nbsp;</span> : null}
        </React.Fragment>
      ))}
    </h1>
  );
}

function RevealHeading({ children, id }) {
  const words = String(children).split(" ");

  return (
    <h2 id={id} className="split-reveal">
      {words.map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          <span className="reveal-word">{word}</span>
          {index < words.length - 1 ? <span className="reveal-space"> </span> : null}
        </React.Fragment>
      ))}
    </h2>
  );
}

function ClipTitle({ children, tone = "cream" }) {
  return (
    <div className={`clip-title clip-title-${tone}`}>
      <span>{children}</span>
    </div>
  );
}

function OrganicDivider({ variant = "drips" }) {
  return (
    <div className={`organic-divider organic-divider-${variant}`} aria-hidden="true">
      <svg viewBox="0 0 1440 160" preserveAspectRatio="none" focusable="false">
        <path d={dividerPaths[variant]} />
      </svg>
    </div>
  );
}

function ConeCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return undefined;

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let previousX = x;

    const commit = () => {
      const tilt = Math.max(-18, Math.min(18, (x - previousX) * 0.18));
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-41%, -50%) rotate(${tilt}deg)`;
      previousX += (x - previousX) * 0.28;
      frame = 0;
    };

    const onPointerMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(commit);
    };

    const onPointerOver = (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("a, button, .flavor-card, .gallery-card")) {
        cursor.classList.add("is-active");
      } else {
        cursor.classList.remove("is-active");
      }
    };

    const onPointerDown = () => cursor.classList.add("is-down");
    const onPointerUp = () => cursor.classList.remove("is-down");

    document.documentElement.classList.add("has-cone-cursor");
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });

    return () => {
      document.documentElement.classList.remove("has-cone-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="cone-cursor" ref={cursorRef} aria-hidden="true">
      <img src="/media/cone-cursor-cutout.png" alt="" />
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a href="/" className="brand" aria-label="GLACE CLUB home">
        {brandName}
      </a>
      <nav className="nav-links" aria-label="Primary">
        <a href="/#shop">Shop</a>
        <a href="/#story">Story</a>
        <a href="/#flavors">Flavors</a>
        <a href="/#studio">Studio</a>
      </nav>
      <a className="header-action" href="/contact">
        Reserve
        <ArrowUpRight size={16} strokeWidth={2.4} />
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero magazine-hero" id="top" aria-labelledby="hero-title">
      <img className="hero-bleed-image parallax" data-depth="-46" src={yellowSprinkleCone} alt="Hand holding a sprinkle ice cream cone against a yellow background" />
      <div className="hero-gradient-field" aria-hidden="true" />
      <div className="hero-back-logo" aria-hidden="true">Glace</div>
      <div className="hero-type-rail" aria-hidden="true">
        <span>ice cream</span>
        <span>weekly drops</span>
        <span>cold room</span>
      </div>

      <div className="hero-copy hero-copy-main">
        <div className="hero-copy-inner">
          <span className="hero-eyebrow">fresh cones / cold studio / est. 2026</span>
          <SplitTitle id="hero-title" text={brandName} />
          <motion.p
            className="hero-subtitle"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.08 }}
          >
            A loud little ice cream house for glossy scoops, waffle crunch, and flavors that land like limited drops.
          </motion.p>
          <motion.div
            className="hero-actions"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.16 }}
          >
            <a className="button primary" href="#shop">
              Shop flavors
              <ArrowUpRight size={17} strokeWidth={2.3} />
            </a>
            <a className="button secondary" href="#story">
              Read story
            </a>
          </motion.div>
        </div>
      </div>

      <ul className="hero-facts" aria-label="Ice cream facts">
        {heroFacts.map((fact) => (
          <li className="hero-fact" key={fact.label}>
            <span>{fact.label}</span>
            <strong>{fact.value}</strong>
            <em>{fact.copy}</em>
          </li>
        ))}
      </ul>

      <div className="hero-sticker hero-sticker-one parallax" data-depth="32" aria-hidden="true">new<br />drop</div>
      <div className="hero-sticker hero-sticker-two parallax" data-depth="-24" aria-hidden="true">260<br />kcal</div>

      <a className="scroll-cue" href="/#shop" aria-label="Scroll to Signature Cones">
        <ArrowDown size={18} />
      </a>

      <div className="hero-organic-edge" aria-hidden="true">
        <svg viewBox="0 0 1440 190" preserveAspectRatio="none" focusable="false">
          <path d="M0 55C59 84 106 19 159 49C205 75 184 132 232 140C287 149 303 67 356 75C402 82 398 135 445 136C499 138 510 73 563 78C612 83 614 142 663 140C713 138 724 77 773 80C822 83 830 143 879 139C930 134 936 70 986 77C1038 85 1036 145 1088 145C1140 145 1147 78 1199 81C1253 85 1267 145 1320 134C1367 124 1386 67 1440 88V190H0V55Z" />
        </svg>
      </div>
    </section>
  );
}
function FlavorCard({ flavor, index }) {
  const tiltRef = useRef(null);

  const handlePointerMove = (event) => {
    const card = tiltRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--tilt-x", `${(0.5 - relativeY) * 5}deg`);
    card.style.setProperty("--tilt-y", `${(relativeX - 0.5) * 5}deg`);
    card.style.setProperty("--cursor-x", `${relativeX * 100}%`);
    card.style.setProperty("--cursor-y", `${relativeY * 100}%`);
  };

  const handlePointerLeave = () => {
    const card = tiltRef.current;
    if (!card) return;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <motion.article
      ref={tiltRef}
      className="flavor-card"
      style={{
        "--flavor-bg": flavor.color,
        "--flavor-ink": flavor.ink,
        "--flavor-accent": flavor.accent
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      initial={{ opacity: 0, y: 68, rotate: index === 1 ? 0 : index === 0 ? -2 : 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: index === 1 ? 0 : index === 0 ? -1 : 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flavor-tilt-plane">
        <span className="flavor-number">{flavor.number}</span>
        <img className="flavor-image photo-reveal" src={flavor.image} alt={flavor.alt} style={{ objectPosition: flavor.position }} />
        <div className="flavor-meta">
          <span className="flavor-kcal">{flavor.kcal} kcal</span>
          <h3>{flavor.name}</h3>
          <p>{flavor.note}</p>
          <a href="/contact">
            {flavor.price}
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function Shop() {
  return (
    <section className="shop-section" id="shop" aria-labelledby="shop-title">
      <motion.div
        className="section-heading"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
      >
        <RevealHeading id="shop-title">Signature Cones</RevealHeading>
        <p>Three edited flavors with a sharper look: no cartoon props, just real texture and studio color.</p>
      </motion.div>
      <div className="flavor-strip" aria-hidden="true">
        <div className="flavor-strip-line">Chocolate Noir / Rose Milk / Vanilla Salt /</div>
        <div className="flavor-strip-line">real cream / cold fruit / wafer crunch /</div>
      </div>
      <div className="flavor-grid" id="flavors">
        {flavors.map((flavor, index) => (
          <FlavorCard key={flavor.name} flavor={flavor} index={index} />
        ))}
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="story-section" id="story" aria-labelledby="story-title">
      <div className="story-sticky">
        <motion.div
          className="story-copy"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
        >
          <RevealHeading id="story-title">Cold Room Ritual</RevealHeading>
          <p>
            The studio edits every batch down to a few essentials: one base, one bright note, one texture,
            and one clean finish.
          </p>
          <div className="clip-title-stack" aria-hidden="true">
            <ClipTitle tone="cream">Fruit first</ClipTitle>
            <ClipTitle tone="cocoa">Twelve hour rest</ClipTitle>
            <ClipTitle tone="mango">Frozen theatre</ClipTitle>
          </div>
        </motion.div>

        <div className="story-media-grid">
          <figure className="story-photo story-photo-large parallax" data-depth="-26">
            <img className="photo-reveal" src={blueWaffleCone} alt="Waffle cone on blue background" />
          </figure>
          <div className="ritual-panels" aria-label="Cold room notes">
            {notes.map((note, index) => (
              <motion.article
                className="ritual-card parallax"
                data-depth={index === 0 ? "-18" : index === 1 ? "26" : "-30"}
                key={note}
                initial={{ opacity: 0, x: index % 2 ? 44 : -44 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{note}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section className="studio-section" id="studio" aria-labelledby="studio-title">
      <div className="studio-copy">
        <RevealHeading id="studio-title">Studio Notes</RevealHeading>
        <p>Photo studies, cold-room drops, and cone tests arranged as a pinned horizontal gallery.</p>
      </div>
      <div className="gallery-viewport" aria-label="Studio gallery">
        <div className="gallery-track">
          {gallery.map((item, index) => (
            <article className="gallery-card" key={item.title}>
              <img className="photo-reveal" src={item.image} alt={item.alt} />
              <div className="gallery-copy">
                <span>{item.label}</span>
                <h3>{item.title}</h3>
              </div>
              <span className="gallery-index">{String(index + 1).padStart(2, "0")}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactTeaser() {
  return (
    <section className="contact-section contact-teaser" aria-labelledby="contact-teaser-title">
      <div className="contact-copy">
        <RevealHeading id="contact-teaser-title">Visit the Cold Room</RevealHeading>
        <p>Book a tasting flight, ask about wholesale, or get first access to the next small-batch drop.</p>
        <div className="contact-actions">
          <a href="/contact">
            <Mail size={18} />
            Open contact page
          </a>
          <a href="mailto:hello@glace.club">
            <ArrowUpRight size={18} />
            hello@glace.club
          </a>
        </div>
      </div>
      <figure className="contact-photo parallax" data-depth="-34" aria-hidden="true">
        <img className="photo-reveal" src={streetCone} alt="" />
      </figure>
    </section>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="contact-page simple-contact-page" aria-labelledby="contact-page-title">
      <div className="simple-contact-shell">
        <div className="contact-page-hero simple-contact-intro">
          <a className="contact-back-link" href="/#top">Back to scoops</a>
          <RevealHeading id="contact-page-title">Say hello</RevealHeading>
          <p>
            Book a tasting, reserve a cart, ask about wholesale, or send us a flavor idea.
            We keep replies short, sweet, and useful.
          </p>
          <div className="simple-contact-links" aria-label="Contact details">
            <a href="mailto:hello@glace.club"><Mail size={18} />hello@glace.club</a>
            <a href="/#studio"><MapPin size={18} />18 Vanilla Lane</a>
            <span><Sparkles size={18} />Friday flavor drops</span>
          </div>
        </div>

        <div className="simple-contact-card">
          <form className="contact-form simple-contact-form" onSubmit={handleSubmit}>
            <label className="field">
              <span>Name</span>
              <input type="text" name="name" placeholder="Your name" required />
            </label>
            <label className="field">
              <span>Email</span>
              <input type="email" name="email" placeholder="you@example.com" required />
            </label>
            <label className="field field-wide">
              <span>Message</span>
              <textarea name="message" rows="5" placeholder="Tell us what you want to taste." required />
            </label>
            <button className="contact-submit" type="submit">
              {submitted ? "Request noted" : "Send request"}
              <ArrowUpRight size={17} strokeWidth={2.3} />
            </button>
            {submitted ? <p className="form-note">Nice. Your request is noted for this prototype.</p> : null}
          </form>

          <figure className="simple-contact-photo" aria-hidden="true">
            <img src={blueChocolateCone} alt="" />
          </figure>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>{brandName}</strong>
        <p>Designed by webcorett. Slow churned in tiny batches. Served colder than ordinary.</p>
      </div>
      <div className="footer-social">
        <a href="/#studio" aria-label="Instagram">
          <Instagram size={18} />
        </a>
        <a href="/#shop" aria-label="Highlights">
          <Sparkles size={18} />
        </a>
      </div>
    </footer>
  );
}

function App() {
  const rootRef = useRef(null);
  const lenisRef = useRef(null);
  const [introDone, setIntroDone] = useState(false);
  const [routePath, setRoutePath] = useState(() => (typeof window !== "undefined" ? window.location.pathname : "/"));
  const prefersReducedMotion = useReducedMotion();
  const motionOverride =
    typeof window !== "undefined" && new URLSearchParams(window.location.search).get("motion") === "on";
  const isContactPage = routePath === "/contact";

  useEffect(() => {
    const jumpToTop = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      ScrollTrigger.refresh();
    };

    const resetScrollAnimations = () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
      gsap.set(".gallery-track", { clearProps: "transform" });
    };

    const navigateTo = (url) => {
      const next = new URL(url, window.location.origin);
      const isPathChange = next.pathname !== window.location.pathname;
      if (isPathChange) resetScrollAnimations();
      window.history.pushState({}, "", `${next.pathname}${next.search}${next.hash}`);
      setRoutePath(next.pathname);
      window.requestAnimationFrame(() => {
        if (next.hash) {
          const target = document.querySelector(next.hash);
          if (target && lenisRef.current) {
            lenisRef.current.scrollTo(target, { duration: 1.35, offset: -8 });
          } else {
            target?.scrollIntoView({ behavior: "auto", block: "start" });
          }
        } else {
          jumpToTop();
        }
      });
    };

    const handleClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!target || target.target || target.hasAttribute("download")) return;
      const href = target.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const next = new URL(href, window.location.href);
      if (next.origin !== window.location.origin || !href.startsWith("/")) return;

      if (next.pathname !== window.location.pathname) {
        return;
      }

      event.preventDefault();
      navigateTo(next.href);
    };

    const handlePopState = () => {
      resetScrollAnimations();
      setRoutePath(window.location.pathname);
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("popstate", handlePopState);
    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: prefersReducedMotion && !motionOverride ? 1.08 : 1.55,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.66
    });

    lenisRef.current = lenis;
    window.__glaceLenis = lenis;
    document.documentElement.classList.add("lenis-enabled", "lenis-smooth");

    let rafId = 0;
    const update = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(update);
    };

    lenis.on("scroll", ScrollTrigger.update);
    rafId = window.requestAnimationFrame(update);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      lenis.off("scroll", ScrollTrigger.update);
      if (lenisRef.current === lenis) {
        lenisRef.current = null;
      }
      if (window.__glaceLenis === lenis) {
        delete window.__glaceLenis;
      }
      document.documentElement.classList.remove("lenis-enabled", "lenis-smooth");
      lenis.destroy();
    };
  }, [prefersReducedMotion, motionOverride]);

  useLayoutEffect(() => {
    if (motionOverride) {
      document.documentElement.dataset.motion = "force";
    } else {
      delete document.documentElement.dataset.motion;
    }


    const context = gsap.context(() => {
      const galleryTrack = document.querySelector(".gallery-track");
      const galleryViewport = document.querySelector(".gallery-viewport");
      const studioSection = document.querySelector(".studio-section");

      if (galleryTrack && galleryViewport && studioSection) {
        const getGalleryDistance = () => {
          const overflow = galleryTrack.scrollWidth - galleryViewport.clientWidth;
          const breathingRoom = window.innerWidth < 760 ? 72 : 120;
          return Math.max(0, overflow + breathingRoom);
        };

        gsap.to(galleryTrack, {
          x: () => -getGalleryDistance(),
          ease: "none",
          scrollTrigger: {
            id: "studio-horizontal-gallery",
            trigger: studioSection,
            start: "top top",
            end: () => `+=${getGalleryDistance() + Math.max(window.innerHeight * 0.8, 520)}`,
            scrub: 0.75,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });
      }

      if (prefersReducedMotion && !motionOverride) {
        gsap.set(".title-char, .reveal-word, .clip-title, .photo-reveal, .hero-fact, .hero-mini-card", {
          opacity: 1,
          visibility: "visible",
          transform: "translate3d(0, 0, 0) rotateX(0deg)",
          clipPath: "inset(0% 0% 0% 0%)"
        });
        return;
      }
      const parallaxItems = gsap.utils.toArray(".parallax");
      const heroSection = document.querySelector(".hero");

      if (heroSection) {
        gsap.set(".hero-type-rail span, .hero-fact, .hero-sticker", { y: 18, opacity: 0 });

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(".hero-type-rail span", { y: 0, opacity: 1, stagger: 0.06, duration: 0.5 }, 0.18)
          .to(".hero-fact", { y: 0, opacity: 1, stagger: 0.08, duration: 0.52 }, 0.26)
          .to(".hero-sticker", { y: 0, opacity: 1, rotate: (index) => (index === 0 ? -8 : 8), stagger: 0.1, duration: 0.62 }, 0.34);

        gsap
          .timeline({
            scrollTrigger: {
              trigger: heroSection,
              start: "top top",
              end: "bottom top",
              scrub: 0.9,
              invalidateOnRefresh: true
            }
          })
          .to(".hero-bleed-image", { scale: 1.08, yPercent: 7, ease: "none" }, 0)
          .to(".hero-back-logo", { yPercent: -22, scale: 1.04, ease: "none" }, 0)
          .to(".hero-copy-main", { yPercent: -12, opacity: 0.76, ease: "none" }, 0)
          .to(".hero-sticker-one", { y: -58, rotate: -14, ease: "none" }, 0)
          .to(".hero-sticker-two", { y: 44, rotate: 14, ease: "none" }, 0)
          .to(".hero-gradient-field", { opacity: 0.8, ease: "none" }, 0);
      }

      if (document.querySelector(".title-char")) {
        gsap.to(".title-char", {
          transform: "translate3d(0, 0, 0) rotateX(0deg)",
          opacity: 1,
          duration: 1.05,
          stagger: 0.025,
          ease: "power3.out",
          delay: 0.12
        });
      }

      gsap.utils.toArray(".split-reveal").forEach((heading) => {
        gsap.to(heading.querySelectorAll(".reveal-word"), {
          transform: "translate3d(0, 0, 0) rotateX(0deg)",
          opacity: 1,
          stagger: 0.035,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 82%",
            toggleActions: "play none none reverse"
          }
        });
      });

      gsap.utils.toArray(".photo-reveal").forEach((photo) => {
        gsap.fromTo(
          photo,
          { clipPath: "inset(14% 14% 14% 14%)", scale: 1.12 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: photo,
              start: "top 88%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      if (document.querySelector(".shop-section")) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".shop-section",
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2
            }
          })
          .to(".flavor-strip-line:first-child", { xPercent: -18, ease: "none" }, 0)
          .to(".flavor-strip-line:last-child", { xPercent: 14, ease: "none" }, 0);
      }

      if (document.querySelector(".story-section")) {
        gsap.to(".clip-title", {
          opacity: 1,
          clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
          y: 0,
          stagger: 0.14,
          ease: "circ.out",
          scrollTrigger: {
            trigger: ".story-section",
            start: "top 55%",
            end: "center center",
            scrub: 1.2
          }
        });
      }

      gsap.fromTo(
        ".site-header",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
      );
    }, rootRef);

    return () => {
      context.revert();
    };
  }, [prefersReducedMotion, motionOverride, routePath]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollToCurrentHash = () => {
      const hash = window.location.hash;
      if (!hash) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        ScrollTrigger.refresh();
        return;
      }

      const target = document.querySelector(hash);
      if (!target) return;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { immediate: true, offset: -8 });
      } else {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      }
      ScrollTrigger.refresh();
    };

    const frame = window.requestAnimationFrame(scrollToCurrentHash);
    const timer = window.setTimeout(scrollToCurrentHash, 420);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [routePath]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const images = Array.from(document.images).filter((image) => !image.complete);
    const frame = window.requestAnimationFrame(refresh);
    const timer = window.setTimeout(refresh, 520);

    window.addEventListener("load", refresh);
    images.forEach((image) => {
      image.addEventListener("load", refresh, { once: true });
      image.addEventListener("error", refresh, { once: true });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);
      images.forEach((image) => {
        image.removeEventListener("load", refresh);
        image.removeEventListener("error", refresh);
      });
    };
  }, [routePath]);

  return (
    <main ref={rootRef} className={isContactPage ? "contact-route" : undefined}>
      <AwardCurtain done={introDone} />
      <Header />
      {isContactPage ? (
        <>
          <ContactPage />
          <Footer />
        </>
      ) : (
        <>
          <Hero />
          <Shop />
          <OrganicDivider variant="mountains" />
          <Story />
          <OrganicDivider variant="clouds" />
          <Studio />
          <ContactTeaser />
          <Footer />
        </>
      )}
      <ConeCursor />
    </main>
  );
}

const rootElement = document.getElementById("root");
const root = window.__glaceRoot ?? createRoot(rootElement);
window.__glaceRoot = root;

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);






