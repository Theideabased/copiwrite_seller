import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Circle,
  Mail,
  MessageSquareText,
  MoveUpRight,
  PenTool,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Get More Sales Online | Copiwrite Nigeria",
  description: "Get more sales for your business online. Copiwrite helps Nigerian businesses with clear sales pages, ads, posts and follow-up messages.",
  openGraph: {
    title: "Get more sales for your business online.",
    description: "Clear sales pages, ads and messages for Nigerian businesses. Tell us what you sell and where you need help.",
    url: "https://copiwrite.com",
  },
  twitter: {
    title: "Get more sales for your business online.",
    description: "Clear sales pages, ads and messages for Nigerian businesses.",
  },
};

const services = [
  {
    number: "01",
    title: "Give buyers a reason to choose you",
    description: "Help people see what you sell, who it helps and why it is worth the price.",
    deliverables: ["Find who needs what you sell", "Make your offer clear", "Show why buyers can trust you"],
  },
  {
    number: "02",
    title: "Turn page visits into enquiries",
    description: "Give people the facts they need to buy. Make your page easy to read and your next step easy to find.",
    deliverables: ["Words for your website and sales page", "Clear prices, proof and next steps", "Emails that explain your offer"],
  },
  {
    number: "03",
    title: "Turn interest into orders",
    description: "Know what to post, what to say in your ads and how to follow up when a buyer needs more time.",
    deliverables: ["Posts and ad text for social media", "WhatsApp and email replies", "Answers to common buyer questions"],
  },
];

const faqs = [
  ["Is this for a small business like mine?", "Yes. You can sell goods or offer a service. Tell us what you sell, who buys it and where you sell now. We will help you choose where to start."],
  ["Do I need a website first?", "No. You can start with your WhatsApp, Instagram, Facebook or TikTok page. If you need a sales page, we can help plan it and write the words."],
  ["Will you work with my team?", "Yes. We can work with the people who design your pages, run your ads or reply to buyers. Everyone gets a clear plan to follow."],
  ["How much will it cost?", "The fee depends on the help you need. Send us your details. We will agree on the work and price in naira before we start. Any ad spend is separate."],
  ["How long will the work take?", "A clear sales plan usually takes 2–3 weeks. A full page and launch can take 4–8 weeks. We agree on the dates with you before we start."],
  ["Can you promise a set number of sales?", "We cannot promise a set number. Your product, price and the people you reach all play a part. We work on what we can improve: your offer, pages, ads and replies. Then we check what leads to sales."],
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Copiwrite",
    url: "https://copiwrite.com",
    email: "info@copiwrite.com",
    description: "Sales pages, ads, posts and follow-up messages to help Nigerian businesses get more sales online.",
    areaServed: { "@type": "Country", name: "Nigeria" },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand-link" href="#top" aria-label="Copiwrite home">
            <Logo />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#services">How we help</a>
            <a href="#process">How it works</a>
            <a href="#engagements">Choose your help</a>
            <a href="#about">About</a>
          </nav>
          <div className="header-actions">
            <ThemeToggle />
            <a className="button button-small button-dark" href="#contact">
              Let’s talk <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-orbit" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow reveal">For business owners in Nigeria</p>
            <h1 className="reveal reveal-delay-1">
              Get more sales for your business <em>online.</em>
            </h1>
            <p className="hero-intro reveal reveal-delay-2">
              We help you make your offer clear, reach the right people and turn their interest into orders. Through your pages, ads and WhatsApp chats.
            </p>
            <div className="hero-actions reveal reveal-delay-3">
              <a className="button button-primary" href="#contact">
                Help Me Get More Sales <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="text-link" href="#process">
                See how we work <ArrowDown size={17} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="message-board reveal reveal-delay-2" aria-label="Example: a clearer post for a food business">
            <div className="board-header">
              <div><span className="board-dot" /> Give people a reason to buy</div>
              <span className="status-pill">Example</span>
            </div>
            <div className="board-main">
              <div className="board-label">For a food business</div>
              <p className="before-copy">“Food available. Please buy from us.”</p>
              <div className="rewrite-arrow"><ArrowDown size={16} aria-hidden="true" /></div>
              <p className="after-copy">“Too busy to cook tonight? Order a bowl of soup for your family. Send us a message for the menu.”</p>
              <div className="board-tags">
                <span>A clear need</span><span>A reason to buy</span><span>One next step</span>
              </div>
            </div>
            <div className="board-footer">
              <div className="mini-stack" aria-hidden="true"><span /><span /><span /></div>
              <p>Show who you help, how you help and how to order.</p>
            </div>
          </div>
        </div>
        <div className="container capability-strip" aria-label="Core capabilities">
          <span>Sales pages</span><Circle size={6} fill="currentColor" aria-hidden="true" />
          <span>Social media posts</span><Circle size={6} fill="currentColor" aria-hidden="true" />
          <span>Ad text</span><Circle size={6} fill="currentColor" aria-hidden="true" />
          <span>WhatsApp replies</span>
        </div>
      </section>

      <section className="section problem-section">
        <div className="container problem-grid">
          <div className="section-kicker"><span>01</span><p>The real problem</p></div>
          <div className="problem-copy">
            <h2>You have a good business. Help more people see why they should buy.</h2>
            <div className="problem-columns">
              <p>You spend time on posts. You may have paid for ads or cut your price. But the orders still come in slowly. Before you spend more, check what buyers see when they find you.</p>
              <p>Can they tell what they get? Do they trust you? Is it clear how to order and get delivery? We help you answer these questions on your pages, in your ads and in your chats.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section services-section" id="services">
        <div className="container">
          <div className="section-heading">
            <div className="section-kicker"><span>02</span><p>What we do</p></div>
            <h2>One goal. More sales online.</h2>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service-row" key={service.number}>
                <span className="service-number">{service.number}</span>
                <div className="service-title-wrap"><h3>{service.title}</h3><MoveUpRight size={22} aria-hidden="true" /></div>
                <p className="service-description">{service.description}</p>
                <ul>
                  {service.deliverables.map((item) => <li key={item}><Check size={15} aria-hidden="true" />{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section" id="process">
        <div className="container process-layout">
          <div className="process-intro">
            <div className="section-kicker light"><span>03</span><p>How we work</p></div>
            <h2>Let’s find what is holding your sales back.</h2>
            <p>Tell us what you sell and what you have tried. We look at your pages, posts and buyer questions. Then we make a plan you can use.</p>
            <a className="button button-light" href="#contact">Tell Us About Your Business <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
          <ol className="process-list">
            <li><span>1</span><div><h3>Look at your business</h3><p>We check what you sell, who needs it and where buyers get stuck.</p></div><Search aria-hidden="true" /></li>
            <li><span>2</span><div><h3>Make a clear plan</h3><p>We choose what to say, where to say it and how people can buy.</p></div><Target aria-hidden="true" /></li>
            <li><span>3</span><div><h3>Put the words to work</h3><p>We write the pages, posts, ads and replies your business needs.</p></div><PenTool aria-hidden="true" /></li>
            <li><span>4</span><div><h3>Check what brings sales</h3><p>We look at the views, chats and orders. Then we work on what needs to change.</p></div><Sparkles aria-hidden="true" /></li>
          </ol>
        </div>
      </section>

      <section className="section engagements-section" id="engagements">
        <div className="container">
          <div className="section-heading split-heading">
            <div className="section-kicker"><span>04</span><p>Choose your help</p></div>
            <div><h2>Start with the help you need now.</h2><p>One plan, a full launch or help each month.</p></div>
          </div>
          <div className="engagement-grid">
            <article className="engagement-card featured">
              <p className="card-label">Best place to start</p>
              <h3>Your Sales Plan</h3>
              <p>For when you are not sure what to change. Get a clear offer and a plan for what to say next.</p>
              <div className="card-timing">2–3 weeks</div>
              <ul><li>A review of your pages and offer</li><li>Clear reasons to buy from you</li><li>A plan for your main sales page</li><li>A call to walk you through it</li></ul>
              <a href="#contact">Help me make a plan <ArrowRight size={16} aria-hidden="true" /></a>
            </article>
            <article className="engagement-card">
              <p className="card-label">For a new or growing offer</p>
              <h3>Your Sales Page &amp; Launch</h3>
              <p>For when you need a page, ads and messages that help people understand your offer and place an order.</p>
              <div className="card-timing">4–8 weeks</div>
              <ul><li>Everything in Your Sales Plan</li><li>Words for your website or sales page</li><li>Ad text and emails for your launch</li><li>Replies and follow-up messages</li></ul>
              <a href="#contact">Help me launch my offer <ArrowRight size={16} aria-hidden="true" /></a>
            </article>
            <article className="engagement-card">
              <p className="card-label">For help each month</p>
              <h3>Monthly Sales Support</h3>
              <p>For when you need help to keep your posts, ads and sales messages on track as your business grows.</p>
              <div className="card-timing">Monthly</div>
              <ul><li>A plan for your posts and ads</li><li>Fresh sales messages</li><li>New ideas to try with buyers</li><li>A monthly check on what works</li></ul>
              <a href="#contact">Help me grow each month <ArrowRight size={16} aria-hidden="true" /></a>
            </article>
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="container about-grid">
          <div className="about-mark" aria-hidden="true"><MessageSquareText size={44} /><span>Help them trust you.<br />Make it easy to buy.</span></div>
          <div className="about-copy">
            <div className="section-kicker"><span>05</span><p>Why Copiwrite</p></div>
            <h2>Give buyers the facts they need to say yes.</h2>
            <p>Think of the questions you get: “Is this your real page?” “Can you deliver to my area?” “What do I get for this price?” Each one is a chance to build trust.</p>
            <p>We help you show real reviews, explain your offer and make the next step clear. Whether you sell food, fashion or a service, the goal stays the same: more sales for your business online.</p>
            <div className="about-principles"><span>Simple words</span><span>Real proof</span><span>Easy steps to buy</span></div>
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container faq-grid">
          <div><div className="section-kicker"><span>06</span><p>Questions</p></div><h2>A few useful answers.</h2></div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="container contact-layout">
          <div className="contact-copy">
            <div className="section-kicker light"><span>07</span><p>Let’s talk</p></div>
            <h2>What do you sell? Let’s help you sell more.</h2>
            <p>Tell us about your business and where you need help. We will reply with the next step and discuss a plan that fits your budget.</p>
            <a className="email-link" href="mailto:info@copiwrite.com"><Mail size={18} aria-hidden="true" />info@copiwrite.com</a>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div><Logo /><p>More sales for your business online.</p></div>
          <div className="footer-links"><a href="#services">How we help</a><a href="#process">How it works</a><a href="#engagements">Choose your help</a><a href="#contact">Contact</a></div>
          <div className="footer-end"><a href="mailto:info@copiwrite.com">info@copiwrite.com</a><p>© {new Date().getFullYear()} Copiwrite.</p></div>
        </div>
      </footer>
    </main>
  );
}
