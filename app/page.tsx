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

const services = [
  {
    number: "01",
    title: "Message strategy",
    description: "Find the sharpest version of your offer: who it is for, why it matters, and the language your whole team can use.",
    deliverables: ["Audience and category research", "Positioning and value proposition", "Messaging and voice system"],
  },
  {
    number: "02",
    title: "Conversion experiences",
    description: "Turn the strategy into pages and journeys that make the next step obvious without leaning on hype.",
    deliverables: ["Website and landing-page copy", "Page architecture and UX writing", "Lifecycle and launch emails"],
  },
  {
    number: "03",
    title: "Sales content",
    description: "Give your sales team a clearer story, stronger proof, and useful follow-up for every serious conversation.",
    deliverables: ["Sales decks and one-pagers", "Outbound and follow-up sequences", "Objection and proof libraries"],
  },
];

const faqs = [
  ["Do you only write copy?", "No. We start with the commercial problem, the buyer, and the decision you need them to make. Copy is one output of that strategy."],
  ["Can you work with our designer or developer?", "Yes. We can hand off a structured message and page system, or collaborate directly with your existing design, product, and sales teams."],
  ["How long does a project take?", "A focused message sprint typically takes 2–3 weeks. A full website or campaign system usually takes 4–8 weeks, depending on scope and feedback speed."],
  ["Do you guarantee conversion results?", "No credible partner can guarantee a number without controlling traffic, offer, sales process, and measurement. We define the hypotheses, build the assets, and help you learn from real performance."],
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Copiwrite",
    url: "https://copiwrite.com",
    email: "info@copiwrite.com",
    description: "Marketing strategy, conversion copy, campaigns, and sales content for ambitious teams.",
    areaServed: "Worldwide",
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
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#engagements">Ways to work</a>
            <a href="#about">About</a>
          </nav>
          <div className="header-actions">
            <ThemeToggle />
            <a className="button button-small button-dark" href="#contact">
              Start a project <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-orbit" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow reveal">Strategy · Copy · Campaigns · Sales</p>
            <h1 className="reveal reveal-delay-1">
              Let&apos;s help you get more customer <em>that will buy online</em>
            </h1>
            <p className="hero-intro reveal reveal-delay-2">
              Copiwrite helps ambitious teams clarify their value, sharpen their story, and build marketing that creates better sales conversations.
            </p>
            <div className="hero-actions reveal reveal-delay-3">
              <a className="button button-primary" href="#contact">
                Start a project <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="text-link" href="#process">
                See how we work <ArrowDown size={17} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="message-board reveal reveal-delay-2" aria-label="A sample Copiwrite messaging system">
            <div className="board-header">
              <div><span className="board-dot" /> Message system / v1.0</div>
              <span className="status-pill">Ready to use</span>
            </div>
            <div className="board-main">
              <div className="board-label">The shift</div>
              <p className="before-copy">“An all-in-one platform powered by advanced technology.”</p>
              <div className="rewrite-arrow"><ArrowDown size={16} aria-hidden="true" /></div>
              <p className="after-copy">“Close the month without chasing another spreadsheet.”</p>
              <div className="board-tags">
                <span>Specific</span><span>Buyer-led</span><span>Easy to repeat</span>
              </div>
            </div>
            <div className="board-footer">
              <div className="mini-stack" aria-hidden="true"><span /><span /><span /></div>
              <p>One clear idea, carried across every buyer touchpoint.</p>
            </div>
          </div>
        </div>
        <div className="container capability-strip" aria-label="Core capabilities">
          <span>Positioning</span><Circle size={6} fill="currentColor" aria-hidden="true" />
          <span>Websites</span><Circle size={6} fill="currentColor" aria-hidden="true" />
          <span>Campaigns</span><Circle size={6} fill="currentColor" aria-hidden="true" />
          <span>Sales enablement</span>
        </div>
      </section>

      <section className="section problem-section">
        <div className="container problem-grid">
          <div className="section-kicker"><span>01</span><p>The real problem</p></div>
          <div className="problem-copy">
            <h2>Your offer may be strong. Its message is doing too much work.</h2>
            <div className="problem-columns">
              <p>When buyers cannot quickly see the value, they hesitate. Marketing adds more words. Sales tells a different story. The website becomes a catalogue instead of a decision path.</p>
              <p>We find the idea worth remembering, then build the pages, campaigns, and sales content around it, so every touchpoint moves in the same direction.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section services-section" id="services">
        <div className="container">
          <div className="section-heading">
            <div className="section-kicker"><span>02</span><p>What we do</p></div>
            <h2>From scattered ideas to one compelling story.</h2>
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
            <h2>Clarity before creativity.</h2>
            <p>Good work does not start with a blank document. It starts with evidence, a decision, and a shared definition of what the message must do.</p>
            <a className="button button-light" href="#contact">Discuss your project <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
          <ol className="process-list">
            <li><span>1</span><div><h3>Listen and diagnose</h3><p>We review the offer, audience, competition, current funnel, and the conversations your team is already having.</p></div><Search aria-hidden="true" /></li>
            <li><span>2</span><div><h3>Choose the message</h3><p>We make the positioning decisions, pressure-test the promise, and build a system your team can actually use.</p></div><Target aria-hidden="true" /></li>
            <li><span>3</span><div><h3>Build the assets</h3><p>We translate the strategy into pages, campaigns, emails, decks, and sales content with one coherent through-line.</p></div><PenTool aria-hidden="true" /></li>
            <li><span>4</span><div><h3>Learn and sharpen</h3><p>We define what to measure, capture sales feedback, and improve the message using real market response.</p></div><Sparkles aria-hidden="true" /></li>
          </ol>
        </div>
      </section>

      <section className="section engagements-section" id="engagements">
        <div className="container">
          <div className="section-heading split-heading">
            <div className="section-kicker"><span>04</span><p>Ways to work</p></div>
            <div><h2>Bring us in where the story gets stuck.</h2><p>Start focused. Expand when the work proves useful.</p></div>
          </div>
          <div className="engagement-grid">
            <article className="engagement-card featured">
              <p className="card-label">Best place to start</p>
              <h3>Message Sprint</h3>
              <p>For a new offer, a repositioning, or a team that needs one clear story before creating more content.</p>
              <div className="card-timing">2–3 weeks</div>
              <ul><li>Research and diagnostic</li><li>Positioning and message system</li><li>Homepage narrative</li><li>90-minute team handoff</li></ul>
              <a href="#contact">Ask about a sprint <ArrowRight size={16} aria-hidden="true" /></a>
            </article>
            <article className="engagement-card">
              <p className="card-label">For a launch or rebuild</p>
              <h3>Conversion Build</h3>
              <p>Strategy and execution for a website, campaign, or sales motion that needs to go to market as one system.</p>
              <div className="card-timing">4–8 weeks</div>
              <ul><li>Everything in Message Sprint</li><li>Website or landing-page copy</li><li>Email and campaign assets</li><li>Sales follow-up content</li></ul>
              <a href="#contact">Plan a build <ArrowRight size={16} aria-hidden="true" /></a>
            </article>
            <article className="engagement-card">
              <p className="card-label">For ongoing momentum</p>
              <h3>Growth Partner</h3>
              <p>Senior message and content support for a small team that needs consistent execution without another full-time hire.</p>
              <div className="card-timing">Monthly</div>
              <ul><li>Campaign planning</li><li>Conversion and sales content</li><li>Message testing ideas</li><li>Monthly performance review</li></ul>
              <a href="#contact">Check availability <ArrowRight size={16} aria-hidden="true" /></a>
            </article>
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="container about-grid">
          <div className="about-mark" aria-hidden="true"><MessageSquareText size={44} /><span>Words should earn<br />their place.</span></div>
          <div className="about-copy">
            <div className="section-kicker"><span>05</span><p>Why Copiwrite</p></div>
            <h2>More judgment. Less content for content’s sake.</h2>
            <p>AI made producing words cheap. It did not make choosing the right promise, finding credible proof, or aligning a team any easier.</p>
            <p>Copiwrite combines research, commercial thinking, and hands-on execution. The goal is not to fill a calendar. It is to make the value easier to understand and easier to buy.</p>
            <div className="about-principles"><span>Evidence over adjectives</span><span>One idea at a time</span><span>Sales and marketing aligned</span></div>
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
            <div className="section-kicker light"><span>07</span><p>Start a project</p></div>
            <h2>Tell us where the message gets stuck.</h2>
            <p>Share the context, the goal, and what is not working. We’ll reply with a point of view and a sensible next step.</p>
            <a className="email-link" href="mailto:info@copiwrite.com"><Mail size={18} aria-hidden="true" />info@copiwrite.com</a>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div><Logo /><p>Marketing that makes the value clear.</p></div>
          <div className="footer-links"><a href="#services">Services</a><a href="#process">Process</a><a href="#engagements">Ways to work</a><a href="#contact">Contact</a></div>
          <div className="footer-end"><a href="mailto:info@copiwrite.com">info@copiwrite.com</a><p>© {new Date().getFullYear()} Copiwrite.</p></div>
        </div>
      </footer>
    </main>
  );
}
