"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CircleDollarSign,
  Eye,
  Facebook,
  Instagram,
  Lightbulb,
  Maximize,
  MessageCircle,
  Printer,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  UserRoundCheck,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import styles from "./slides.module.css";

type SlideProps = {
  children: React.ReactNode;
  className?: string;
  eyebrow?: string;
  number: number;
};

function Slide({ children, className = "", eyebrow, number }: SlideProps) {
  return (
    <section
      className={`${styles.slide} ${className}`}
      aria-label={`Slide ${number}`}
    >
      <div className={styles.topline}>
        <span>{eyebrow ?? "WhatsApp Views-to-Sales"}</span>
        <span>{String(number).padStart(2, "0")}</span>
      </div>
      <div className={styles.slideBody}>{children}</div>
      <div className={styles.wordmark}>Copiwrite</div>
    </section>
  );
}

export function SlidesDeck() {
  const [current, setCurrent] = useState(0);

  const slides = [
    <Slide number={1} key="low-views" className={styles.greenSlide}>
      <div className={styles.centerStatement}>
        <Eye size={64} strokeWidth={1.5} aria-hidden="true" />
        <h1>Do you post on WhatsApp Status and get very few views?</h1>
      </div>
    </Slide>,

    <Slide number={2} key="views-no-sales" className={styles.inkSlide}>
      <div className={styles.centerStatement}>
        <MessageCircle size={64} strokeWidth={1.5} aria-hidden="true" />
        <h1>Or people view, ask “How much?”—and disappear?</h1>
      </div>
    </Slide>,

    <Slide number={3} key="broken-chain" eyebrow="The real problem">
      <div className={styles.bigLeft}>
        <span className={styles.marker}>It may not be your product.</span>
        <h2>Your sales chain may be broken.</h2>
        <p>And you may not know where.</p>
      </div>
    </Slide>,

    <Slide number={4} key="love-buying" className={styles.inkSlide}>
      <div className={styles.contrastStatement}>
        <p>People love to buy.</p>
        <h2>But they hate feeling advertised to.</h2>
      </div>
    </Slide>,

    <Slide number={5} key="price-list" eyebrow="What customers see">
      <div className={styles.statusBoard}>
        <span>Available.</span>
        <span>₦20,000.</span>
        <span>Buy now.</span>
        <span>Patronize me.</span>
      </div>
      <p className={styles.caption}>Your Status has become a digital price list.</p>
    </Slide>,

    <Slide number={6} key="attention" className={styles.greenSlide} eyebrow="01 · Attention">
      <div className={styles.numberStatement}>
        <span>01</span>
        <h2>Earn attention before you ask for money.</h2>
      </div>
    </Slide>,

    <Slide number={7} key="contacts-attention">
      <div className={styles.equation}>
        <strong>Contacts</strong>
        <span>≠</span>
        <strong>Attention</strong>
      </div>
      <p className={styles.caption}>Having their number does not mean you have their interest.</p>
    </Slide>,

    <Slide number={8} key="curiosity-comparison" eyebrow="Demand attention vs earn it">
      <div className={styles.comparison}>
        <div className={styles.badExample}>
          <span>Ignored</span>
          <p>“Face cream available — ₦12,500.”</p>
        </div>
        <div className={styles.goodExample}>
          <span>Keep watching</span>
          <p>“If your face becomes oily every afternoon, your cream may not be the real problem.”</p>
        </div>
      </div>
    </Slide>,

    <Slide number={9} key="fewer-posts" className={styles.inkSlide}>
      <div className={styles.centerStatement}>
        <Target size={64} strokeWidth={1.5} aria-hidden="true" />
        <h2>Fewer posts.<br />More intention.</h2>
        <p>Make every post earn the next tap.</p>
      </div>
    </Slide>,

    <Slide number={10} key="customer-intent" className={styles.greenSlide} eyebrow="02 · Content">
      <div className={styles.numberStatement}>
        <span>02</span>
        <h2>Enter the conversation already in your customer&apos;s head.</h2>
      </div>
    </Slide>,

    <Slide number={11} key="clothing-example" eyebrow="Customer-intent content">
      <div className={styles.comparison}>
        <div className={styles.badExample}>
          <span>About your stock</span>
          <p>“New stock available.”</p>
        </div>
        <div className={styles.goodExample}>
          <span>About their problem</span>
          <p>“3 mistakes that can make an expensive outfit look cheap.”</p>
        </div>
      </div>
    </Slide>,

    <Slide number={12} key="customer-question" className={styles.softSlide}>
      <div className={styles.questionSlide}>
        <Lightbulb size={60} strokeWidth={1.5} aria-hidden="true" />
        <p>Stop asking:</p>
        <h2>“How can I advertise today?”</h2>
        <strong>Ask what your customer already wants to understand, avoid or achieve.</strong>
      </div>
    </Slide>,

    <Slide number={13} key="trust" className={styles.inkSlide} eyebrow="03 · Trust">
      <div className={styles.numberStatement}>
        <span>03</span>
        <h2>Give people enough evidence to trust you.</h2>
      </div>
    </Slide>,

    <Slide number={14} key="trust-stack" eyebrow="Trust is built before payment">
      <div className={styles.iconList}>
        <div><UserRoundCheck aria-hidden="true" /><span>Clear profile</span></div>
        <div><BadgeCheck aria-hidden="true" /><span>Genuine proof</span></div>
        <div><Lightbulb aria-hidden="true" /><span>Useful teaching</span></div>
        <div><ShieldCheck aria-hidden="true" /><span>Professional communication</span></div>
      </div>
    </Slide>,

    <Slide number={15} key="professional-language" className={styles.softSlide} eyebrow="Small words change trust">
      <div className={styles.phraseSwap}>
        <div><s>“Wait, I am coming.”</s><strong>“Let me confirm that for you.”</strong></div>
        <div><s>“We don&apos;t have it.”</s><strong>“I can recommend a similar option.”</strong></div>
      </div>
    </Slide>,

    <Slide number={16} key="nita-proof" eyebrow="A real WhatsApp business result">
      <div className={styles.testimonialCard}>
        <blockquote>
          “With the help I received, Nita Watches has made over ₦2 million in
          jewellery sales through WhatsApp—even without a physical store.”
        </blockquote>
        <div className={styles.testimonialFooter}>
          <Image
            src="/testimonials/benita-nita-watches.png"
            alt="Benita, founder of Nita Watches"
            width={96}
            height={96}
            priority
          />
          <p>
            <strong>Benita</strong>
            <span>Founder, Nita Watches · Port Harcourt</span>
          </p>
          <p className={styles.slideResult}>
            <strong>₦2M+</strong>
            <span>WhatsApp jewellery sales</span>
          </p>
        </div>
      </div>
    </Slide>,

    <Slide number={17} key="sell-change" className={styles.greenSlide} eyebrow="04 · Desire">
      <div className={styles.numberStatement}>
        <span>04</span>
        <h2>Sell the change.<br />Not only the product.</h2>
      </div>
    </Slide>,

    <Slide number={18} key="transformation">
      <div className={styles.transformationFlow}>
        <div><span>Now</span><strong>The current situation</strong></div>
        <ArrowRight size={54} aria-hidden="true" />
        <div><span>Next</span><strong>The desired situation</strong></div>
      </div>
      <p className={styles.caption}>People buy the movement between the two.</p>
    </Slide>,

    <Slide number={19} key="wig-example" className={styles.inkSlide} eyebrow="Same wig · Different motivation">
      <div className={styles.twoMotives}>
        <div><span>Buyer one</span><strong>“I need something affordable.”</strong></div>
        <div><span>Buyer two</span><strong>“I want to feel confident at Saturday&apos;s wedding.”</strong></div>
      </div>
    </Slide>,

    <Slide number={20} key="follow-up" className={styles.greenSlide} eyebrow="05 · Follow-up">
      <div className={styles.numberStatement}>
        <span>05</span>
        <h2>Stop losing people after they show interest.</h2>
      </div>
    </Slide>,

    <Slide number={21} key="price-silence">
      <div className={styles.messageFlow}>
        <div>“How much?”</div>
        <ArrowRight aria-hidden="true" />
        <div>Price sent</div>
        <ArrowRight aria-hidden="true" />
        <div className={styles.silence}>Silence.</div>
      </div>
    </Slide>,

    <Slide number={22} key="silence-reasons" className={styles.softSlide} eyebrow="Silence is not always rejection">
      <div className={styles.reasonCloud}>
        <span>Comparing options</span>
        <span>Still unsure</span>
        <span>Doesn&apos;t see the value</span>
        <span>Got distracted</span>
        <span>Has an objection</span>
      </div>
    </Slide>,

    <Slide number={23} key="followup-value" className={styles.inkSlide}>
      <div className={styles.followupContrast}>
        <div><s>“Hello ma.”<br />“Are you there ma?”</s></div>
        <div><strong>Useful information.<br />Relevant proof.<br />An answered objection.</strong></div>
      </div>
      <p className={styles.caption}>Give them a reason to reopen the conversation.</p>
    </Slide>,

    <Slide number={24} key="information-implementation">
      <div className={styles.equation}>
        <strong>Information</strong>
        <ArrowRight size={50} aria-hidden="true" />
        <strong className={styles.accentText}>Implementation</strong>
      </div>
      <p className={styles.caption}>Knowing is not the same as knowing what to do next.</p>
    </Slide>,

    <Slide number={25} key="tomorrow-questions" className={styles.softSlide} eyebrow="Tomorrow morning">
      <div className={styles.questionGrid}>
        <p>What should I post first?</p>
        <p>What comes next?</p>
        <p>What do I say after “How much?”</p>
        <p>When should I follow up?</p>
      </div>
    </Slide>,

    <Slide number={26} key="introducing" className={styles.greenSlide} eyebrow="Introducing">
      <div className={styles.productReveal}>
        <MessageCircle size={68} strokeWidth={1.4} aria-hidden="true" />
        <h1>WhatsApp<br />Views-to-Sales</h1>
        <p>A step-by-step diagnosis and implementation system.</p>
      </div>
    </Slide>,

    <Slide number={27} key="diagnose-first" eyebrow="Fix the right problem">
      <div className={styles.diagnosticChain}>
        {[
          "Audience",
          "Attention",
          "Views",
          "Trust",
          "Desire",
          "Closing",
          "Follow-up",
        ].map((item) => <span key={item}>{item}</span>)}
      </div>
      <div className={styles.searchBadge}><Search aria-hidden="true" /> Diagnose first. Then act.</div>
    </Slide>,

    <Slide number={28} key="inside-one" className={styles.inkSlide} eyebrow="Inside the system · 1 of 2">
      <div className={styles.deliverableList}>
        <p><Check aria-hidden="true" /><span><strong>Status Attention System</strong>Earn the next tap.</span></p>
        <p><Check aria-hidden="true" /><span><strong>What-To-Post Sales Map</strong>Build trust and desire.</span></p>
        <p><Check aria-hidden="true" /><span><strong>Views-to-Conversation Method</strong>Turn watching into enquiries.</span></p>
      </div>
    </Slide>,

    <Slide number={29} key="inside-two" className={styles.inkSlide} eyebrow="Inside the system · 2 of 2">
      <div className={styles.deliverableList}>
        <p><Check aria-hidden="true" /><span><strong>Closing & Follow-Up Process</strong>Keep interest moving.</span></p>
        <p><Check aria-hidden="true" /><span><strong>Sales Diagnostic & Checklist</strong>Know what to fix first.</span></p>
        <p><Check aria-hidden="true" /><span><strong>Direct Access To Copiwrite</strong>Ask when you get stuck.</span></p>
      </div>
    </Slide>,

    <Slide number={30} key="first-twenty" className={styles.offerSlide} eyebrow="Limited launch bonus">
      <div className={styles.bonusHero}>
        <span>First 20 buyers</span>
        <h2>Get a free social-sales audit.</h2>
        <p>Plus a detailed, prioritized action report.</p>
      </div>
    </Slide>,

    <Slide number={31} key="audit-channels" eyebrow="One business · Reviewed across every active channel">
      <div className={styles.channelRow}>
        <div><MessageCircle aria-hidden="true" /><span>WhatsApp</span></div>
        <div><Instagram aria-hidden="true" /><span>Instagram</span></div>
        <div><span className={styles.tiktokMark}>♪</span><span>TikTok</span></div>
        <div><Facebook aria-hidden="true" /><span>Facebook</span></div>
      </div>
      <p className={styles.caption}>See what is costing you attention, trust and sales.</p>
    </Slide>,

    <Slide number={32} key="nothing-changes" className={styles.softSlide} eyebrow="A fair question">
      <div className={styles.supportSlide}>
        <h2>“What if I apply everything and still don&apos;t make a sale?”</h2>
        <p>Message us. We will help you identify where the process is stuck.</p>
      </div>
    </Slide>,

    <Slide number={33} key="proof-before-offer" eyebrow="Proof before the offer">
      <div className={styles.resultProofCard}>
        <div>
          <span>Customer result</span>
          <h2>Over ₦2 million in jewellery sales.</h2>
          <p>Through WhatsApp. Without a physical store.</p>
        </div>
        <div className={styles.resultProofPerson}>
          <Image
            src="/testimonials/benita-nita-watches.png"
            alt="Benita, founder of Nita Watches"
            width={128}
            height={128}
          />
          <p>
            <strong>Benita</strong>
            <span>Founder, Nita Watches · Port Harcourt</span>
          </p>
        </div>
      </div>
    </Slide>,

    <Slide number={34} key="core-value" eyebrow="What the complete system includes">
      <div className={styles.valueStack}>
        <div><span>Status Attention System</span><strong>₦15,000</strong></div>
        <div><span>What-To-Post Sales Map</span><strong>₦20,000</strong></div>
        <div><span>Views-to-Conversation Method</span><strong>₦15,000</strong></div>
        <div><span>Closing &amp; Follow-Up Process</span><strong>₦20,000</strong></div>
        <div><span>Sales Diagnostic &amp; Checklist</span><strong>₦10,000</strong></div>
        <div><span>Direct Copiwrite Access</span><strong>₦15,000</strong></div>
      </div>
      <div className={styles.coreValueTotal}>
        <span>Core system value</span>
        <strong>₦95,000</strong>
      </div>
    </Slide>,

    <Slide number={35} key="total-value" className={styles.offerSlide} eyebrow="First 20 buyers receive the complete value stack">
      <div className={styles.valueEquation}>
        <div><span>Complete core system</span><strong>₦95,000</strong></div>
        <b aria-hidden="true">+</b>
        <div><span>Multi-platform audit &amp; action report</span><strong>₦30,000</strong></div>
        <b aria-hidden="true">=</b>
        <div className={styles.valueTotal}><span>Total value</span><strong>₦125,000</strong></div>
      </div>
    </Slide>,

    <Slide number={36} key="price" className={styles.inkSlide} eyebrow="Complete access today">
      <div className={styles.priceSlide}>
        <CircleDollarSign size={58} strokeWidth={1.4} aria-hidden="true" />
        <s>Up to ₦125,000 in total value</s>
        <h2>₦10,000</h2>
        <p>One-time payment.</p>
        <span>First 20 buyers receive every item in the value stack.</span>
      </div>
    </Slide>,

    <Slide number={37} key="cta" className={styles.greenSlide} eyebrow="Your next step">
      <div className={styles.finalCta}>
        <Sparkles size={58} strokeWidth={1.5} aria-hidden="true" />
        <h1>Stop guessing.<br />Start implementing.</h1>
        <p>First 20 buyers get the free social-sales audit.</p>
        <strong>Start Implementing Now →</strong>
      </div>
    </Slide>,
  ];

  const goTo = useCallback((index: number) => {
    setCurrent(Math.max(0, Math.min(index, slides.length - 1)));
  }, [slides.length]);

  useEffect(() => {
    const fromHash = Number(window.location.hash.replace("#slide-", ""));
    if (Number.isInteger(fromHash) && fromHash >= 1 && fromHash <= slides.length) {
      setCurrent(fromHash - 1);
    }
  }, [slides.length]);

  useEffect(() => {
    window.history.replaceState(null, "", `#slide-${current + 1}`);
  }, [current]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goTo(current + 1);
      }
      if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goTo(current - 1);
      }
      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(slides.length - 1);
      if (event.key.toLowerCase() === "f") document.documentElement.requestFullscreen?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current, goTo, slides.length]);

  return (
    <main className={styles.deckShell}>
      <div className={styles.deckViewport}>
        <div className={styles.slideCanvas} aria-live="polite">
          {slides.map((slide, index) => (
            <div
              className={`${styles.slideSlot} ${index === current ? styles.active : ""}`}
              key={slide.key}
              aria-hidden={index !== current}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      <nav className={styles.controls} aria-label="Slide controls">
        <button
          type="button"
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          aria-label="Previous slide"
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <span aria-label={`Slide ${current + 1} of ${slides.length}`}>
          {String(current + 1).padStart(2, "0")} / {slides.length}
        </span>
        <button
          type="button"
          onClick={() => goTo(current + 1)}
          disabled={current === slides.length - 1}
          aria-label="Next slide"
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
        <span className={styles.controlDivider} aria-hidden="true" />
        <button
          type="button"
          onClick={() => document.documentElement.requestFullscreen?.()}
          aria-label="Enter fullscreen"
          title="Fullscreen (F)"
        >
          <Maximize size={19} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          aria-label="Print or save as PDF"
          title="Print or save as PDF"
        >
          <Printer size={19} aria-hidden="true" />
        </button>
      </nav>
    </main>
  );
}
