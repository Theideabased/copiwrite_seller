import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, CalendarCheck, Check, CheckCheck, Clock3, GitBranch, Inbox, MessageSquareText, PhoneMissed, RefreshCw, Send, UserCheck, Workflow } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Logo } from "@/components/logo";
import "./automation.css";

const title = "AI Sales Automation for Growing Businesses | Copiwrite";
const description = "Copiwrite builds AI sales automation systems that respond to leads, qualify prospects, automate follow-up and help businesses book more customer conversations.";
export const metadata: Metadata = {
  title: { absolute: title }, description, alternates: { canonical: "/" },
  openGraph: { title, description, url: "/" }, twitter: { title, description },
};
const solutions = [
  { icon: UserCheck, title: "AI Lead Qualification", text: "Ask the right questions. Learn what each lead needs and send the right opportunities to your team." },
  { icon: Send, title: "Instant Lead Follow-Up", text: "Start the conversation while interest is fresh, through the SMS, email, or chat channels connected to your system." },
  { icon: PhoneMissed, title: "Missed Lead Recovery", text: "Missed a call or inquiry? Follow up automatically so a busy moment does not become a lost opportunity." },
  { icon: CalendarCheck, title: "AI Appointment Booking", text: "Let qualified leads choose an open time on your connected calendar, without the back-and-forth." },
  { icon: Clock3, title: "Automated Sales Follow-Up", text: "Stay in touch when a lead needs more time, with clear timing, stop rules, and opt-outs." },
  { icon: RefreshCw, title: "Lead Reactivation", text: "Reconnect with eligible past leads in your database and find out who is ready for a new conversation." },
  { icon: MessageSquareText, title: "AI Sales Assistant", text: "Answer common questions, collect details, update records, and bring in a person when the conversation needs one." },
];
const workflow = [
  ["A lead contacts you", "Call, form, website, SMS, or ad."],
  ["AI responds", "Start the conversation right away."],
  ["AI qualifies", "Ask questions based on your rules."],
  ["AI follows up", "Keep in touch if the lead goes quiet."],
  ["Appointment booked", "Offer open times to qualified leads."],
  ["Your team takes over", "Pass on the details and next steps."],
];
const useCases = [
  { label: "HOME SERVICES", title: "The after-hours call.", text: "A homeowner calls an HVAC company after hours. A connected follow-up flow can keep the inquiry moving.", steps: ["Missed call", "Automatic response", "Understand the issue", "Collect service details", "Book a service call", "Notify the team"] },
  { label: "APPOINTMENT BUSINESSES", title: "The inquiry that needs a next step.", text: "A new lead has a few questions before booking. Help them find the right next step without waiting for the front desk.", steps: ["New inquiry", "AI conversation", "Qualification", "Appointment booking", "Reminders", "Human handoff"] },
  { label: "B2B SALES", title: "The lead your team should talk to.", text: "A website or outbound lead shows interest. Collect the key details so your rep can start a useful conversation.", steps: ["New lead", "Qualification", "Follow-up", "Meeting booked", "CRM update", "Rep notified"] },
];
const implementation = [
  ["Understand", "We look at where leads come from, how your team responds, and where things stall."],
  ["Design", "We map the questions, follow-ups, booking rules, and human handoffs with you."],
  ["Build & connect", "We build the flow and connect the tools agreed on for your project."],
  ["Test", "We test real scenarios, including missed replies and tricky questions, before launch."],
  ["Improve", "We review real conversations and refine the system as your team uses it."],
];

export default function Home() {
  return (
    <div className="automation-site">
      <a className="auto-skip" href="#main">Skip to content</a>
      <header className="auto-header"><div className="auto-container auto-nav">
        <Link href="/" aria-label="Copiwrite home"><Logo /></Link>
        <nav aria-label="Main navigation"><a href="#solutions">Solutions</a><a href="#how-it-works">How It Works</a><a href="#use-cases">Use Cases</a><a href="#about">About</a></nav>
        <a className="auto-button auto-button-small" href="#contact">Book a Demo <ArrowRight size={16} aria-hidden /></a>
      </div></header>
      <main id="main">
        <section className="auto-container auto-hero">
          <div><p className="auto-label"><span className="auto-dot" /> AI SALES AUTOMATION</p>
            <h1>Turn More Leads Into Booked Customers <span>— Automatically.</span></h1>
            <p className="auto-intro">Copiwrite builds AI sales systems that respond to leads, qualify prospects, follow up, recover missed opportunities, and book appointments — 24/7.</p>
            <div className="auto-actions"><a className="auto-button" href="#how-it-works">See How It Works <ArrowRight size={18} aria-hidden /></a><a className="auto-button auto-button-outline" href="#contact">Book a Demo</a></div>
            <p className="auto-caption">Built around your process. With your team in control.</p>
          </div>
          <div className="auto-demo" aria-label="Illustrative lead automation, not a live customer conversation">
            <div className="auto-demo-top"><span><Workflow size={18} aria-hidden /> Lead-to-booking flow</span><span className="auto-example">EXAMPLE</span></div>
            <div className="auto-demo-body">
              <div className="auto-event"><span className="auto-icon"><Inbox size={20} aria-hidden /></span><div><strong>New lead</strong><span>Website inquiry · After hours</span></div><span className="auto-status">Received</span></div>
              <div className="auto-chat"><p className="auto-chat-label">HOMEOWNER</p><p>My AC stopped cooling. Can you help tomorrow?</p></div>
              <div className="auto-chat auto-chat-reply"><p className="auto-chat-label">AI RESPONDS INSTANTLY</p><p>I can help with a service visit. What ZIP code is the home in?</p></div>
              <div className="auto-check-row"><CheckCheck size={18} aria-hidden /><span>Lead qualified</span><small>Service area confirmed</small></div>
              <div className="auto-booked"><CalendarCheck size={24} aria-hidden /><div><strong>Appointment booked</strong><span>Tomorrow · 10:00 AM</span></div><Check size={18} aria-hidden /></div>
              <div className="auto-notified"><Check size={14} aria-hidden /> Sales team notified. Details passed on.</div>
            </div>
            <p className="auto-demo-note">An example of a flow we can build. Channels and rules are agreed on during setup.</p>
          </div>
        </section>
        <div className="auto-audience"><div className="auto-container"><p>For U.S. service businesses and growing teams</p><div><span>HVAC & plumbing</span><span>Roofing & home services</span><span>Dental & med spas</span><span>Agencies & B2B</span></div></div></div>
        <section className="auto-container auto-section auto-problem">
          <div><p className="auto-label">THE GAP AFTER THE LEAD</p><h2>How many leads are slipping through the cracks?</h2><p>You spend time and money getting people interested. But what happens when no one is there to reply?</p></div>
          <div className="auto-problem-list">{["Calls go unanswered.", "Website leads wait too long for a reply.", "Your team forgets to follow up.", "Prospects stop replying.", "Old leads sit untouched in your CRM.", "Staff answer the same questions all day."].map((item, i) => <div key={item}><span>0{i + 1}</span><p>{item}</p></div>)}</div>
          <p className="auto-pullquote">Copiwrite helps automate what happens between <strong>“I’m interested”</strong> and <strong>“I’m ready to buy.”</strong></p>
        </section>
        <section id="solutions" className="auto-soft-section"><div className="auto-container auto-section">
          <div className="auto-section-head"><p className="auto-label">LESS CHASING. MORE CONVERSATIONS.</p><h2>Your sales process shouldn’t stop when your team gets busy.</h2><p>Start with the gap that matters most. We build the flow around how you sell.</p></div>
          <div className="auto-solutions">{solutions.map(({ icon: Icon, title, text }, i) => <article className={`auto-solution ${i === 6 ? "auto-solution-wide" : ""}`} key={title}><Icon size={24} aria-hidden /><h3>{title}</h3><p>{text}</p>{i === 6 && <a href="#contact" className="auto-text-link">Explore your sales process <ArrowRight size={16} aria-hidden /></a>}</article>)}</div>
        </div></section>
        <section id="how-it-works" className="auto-container auto-section">
          <div className="auto-section-head"><p className="auto-label">HOW IT WORKS</p><h2>From new lead to booked appointment.</h2><p>One connected flow. Clear rules at each step. A person ready to step in when needed.</p></div>
          <ol className="auto-workflow">{workflow.map(([heading, text], i) => <li key={heading}><span className="auto-step-number">0{i + 1}</span><h3>{heading}</h3><p>{text}</p>{i < workflow.length - 1 && <ArrowRight className="auto-step-arrow" size={20} aria-hidden />}</li>)}</ol>
          <div className="auto-workflow-note"><GitBranch size={20} aria-hidden /><p>Your rules set the pace: who qualifies, when to follow up, when to stop, and when your team takes over.</p></div>
        </section>
        <section id="use-cases" className="auto-soft-section"><div className="auto-container auto-section">
          <div className="auto-section-head"><p className="auto-label">USE CASES</p><h2>Built around the way your business sells.</h2><p>Illustrative workflows, not client case studies. Your setup depends on your tools and process.</p></div>
          <div className="auto-use-cases">{useCases.map(item => <article key={item.label}><p className="auto-label">{item.label}</p><h3>{item.title}</h3><p>{item.text}</p><ol>{item.steps.map((step, i) => <li key={step}><span>{step}</span>{i < item.steps.length - 1 && <ArrowDown size={14} aria-hidden />}</li>)}</ol></article>)}</div>
        </div></section>
        <section className="auto-value"><div className="auto-container auto-section auto-value-grid"><div><p className="auto-label">MAKE THE MOST OF YOUR LEADS</p><h2>You already paid to generate the lead. Don’t lose them because nobody followed up.</h2><a href="#contact" className="auto-button">Book a Demo <ArrowRight size={18} aria-hidden /></a></div><div><p>The goal is simple: help your team spend less time chasing replies and more time talking to people who are ready.</p><ul>{["Faster replies to new leads", "Consistent follow-up", "Fewer missed opportunities", "Less repetitive work", "Responses outside business hours", "More qualified conversations for your team"].map(item => <li key={item}><Check size={18} aria-hidden />{item}</li>)}</ul><p className="auto-caption">Results depend on your offer, lead quality, tools, and implementation. We do not promise a fixed increase in sales.</p></div></div></section>
        <section className="auto-container auto-section auto-integrations"><div><p className="auto-label">YOUR TOOLS. A CONNECTED PROCESS.</p><h2>Works with the tools your business already uses.</h2><p>We assess what can be connected during implementation. Support depends on each tool’s API, access, and plan. These are connection categories, not a list of built-in integrations.</p></div><ul>{["CRM", "Email", "SMS", "Calendars", "Website forms", "Phone systems", "Customer databases"].map(item => <li key={item}><span className="auto-dot" />{item}</li>)}</ul></section>
        <section id="about" className="auto-soft-section"><div className="auto-container auto-section">
          <div className="auto-section-head"><p className="auto-label">ABOUT COPIWRITE</p><h2>We build it around your sales process.</h2><p>We focus on one part of automation: the work that moves a lead toward a real sales conversation. Not AI for the sake of AI.</p></div>
          <ol className="auto-implementation">{implementation.map(([heading, text], i) => <li key={heading}><span>0{i + 1}</span><div><h3>{heading}</h3><p>{text}</p></div></li>)}</ol>
        </div></section>
        <section id="contact" className="auto-container auto-section auto-contact"><div><p className="auto-label">LET’S LOOK AT YOUR PROCESS</p><h2>Where are you losing leads?</h2><p>Show us how customers currently contact your business. We’ll identify where AI automation could help you respond, qualify, follow up, or book faster.</p><h3>See what we can automate for your business.</h3><p>Tell us about your sales process. We’ll review your needs and email you to arrange a demo conversation.</p><a className="auto-text-link" href="#demo-form">Book an Automation Demo <ArrowRight size={16} aria-hidden /></a><a className="auto-contact-email" href="mailto:info@copiwrite.com">Tell Us About Your Sales Process <ArrowRight size={16} aria-hidden /></a><p className="auto-caption">Prefer email? <a href="mailto:info@copiwrite.com">info@copiwrite.com</a></p></div><div id="demo-form" className="auto-form-card"><h3>Request your automation demo.</h3><ContactForm /></div></section>
      </main>
      <footer className="auto-footer"><div className="auto-container"><div><Link href="/" aria-label="Copiwrite home"><Logo /></Link><p>Fewer missed leads. More real conversations.</p></div><a href="mailto:info@copiwrite.com">info@copiwrite.com</a><p>© {new Date().getFullYear()} Copiwrite.</p></div></footer>
    </div>
  );
}
