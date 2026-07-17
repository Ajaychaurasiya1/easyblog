import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const values = [
  {
    title: "Clarity over noise",
    text: "We prefer precise writing that helps you act — not endless listicles.",
  },
  {
    title: "Builders welcome",
    text: "Authors on Velthrix Blog are developers, founders, and curious learners.",
  },
  {
    title: "Craft in public",
    text: "Share what you are learning while you are learning it. Progress compounds.",
  },
];

const About = () => {
  return (
    <div>
      <section className="relative min-h-[48vh] overflow-hidden">
        <img
          src={assets.about}
          alt="Team collaboration"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(18,21,26,0.72)]" />
        <div className="relative container-pad flex min-h-[48vh] flex-col justify-end pb-12 pt-24">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--ember)]">
            About Velthrix Blog
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-white sm:text-5xl leading-tight">
            A quieter place to read and write on the open web.
          </h1>
        </div>
      </section>

      <section className="container-pad py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="section-title">Why we exist</h2>
            <p className="mt-4 text-[var(--ink-soft)] leading-relaxed">
              Velthrix Blog started as a simple idea: give thoughtful writers a
              clean home for long-form work, and give readers a feed that respects
              their attention. We publish on technology, business, health, and
              learning — with room for essays that do not fit neat labels.
            </p>
            <p className="mt-4 text-[var(--ink-soft)] leading-relaxed">
              Whether you are shipping software, growing a company, or building
              better habits, you will find pieces written by people who do the
              work they write about.
            </p>
          </div>
          <div className="rounded-3xl border border-[var(--line)] bg-white/80 p-8">
            <h3 className="font-display text-2xl">In short</h3>
            <ul className="mt-5 space-y-4 text-sm text-[var(--ink-soft)]">
              <li className="border-b border-[var(--line)] pb-4">
                Independent voices, edited for clarity
              </li>
              <li className="border-b border-[var(--line)] pb-4">
                Categories that span tech, business, and life
              </li>
              <li className="border-b border-[var(--line)] pb-4">
                Free to read; free to create an author account
              </li>
              <li>Built for mobile and desktop reading comfort</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {values.map((item) => (
            <div key={item.title} className="border-t-2 border-[var(--ember)] pt-5">
              <h3 className="font-display text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          <Link to="/blogs" className="btn-primary">
            Read the archive
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full border border-[var(--line)] px-6 py-3 text-sm font-medium text-[var(--ink)] hover:border-[var(--ink)] transition"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
