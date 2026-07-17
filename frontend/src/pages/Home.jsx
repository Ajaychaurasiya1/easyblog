import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import LatestBlogs from "../components/LatestBlogs";

const topics = [
  {
    title: "Technology",
    copy: "Frameworks, AI, and the tools shaping how products ship.",
  },
  {
    title: "Business",
    copy: "Startup lessons, growth habits, and clearer decision-making.",
  },
  {
    title: "Lifestyle",
    copy: "Focus, health, and routines that keep creative work sustainable.",
  },
  {
    title: "Learning",
    copy: "Courses, craft notes, and skills worth practicing this year.",
  },
];

const Home = () => {
  return (
    <div>
      <Hero />

      <section className="container-pad py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="section-title">What we write about</h2>
          <p className="section-lead mt-3">
            Each piece is meant to teach something useful — not just fill a feed.
            Pick a lane or wander across them all.
          </p>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic) => (
            <div key={topic.title} className="border-t border-[var(--line)] pt-5">
              <h3 className="font-display text-2xl text-[var(--ink)]">
                {topic.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                {topic.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white/70 py-16 sm:py-20">
        <div className="container-pad">
          <LatestBlogs />
          <div className="mt-10 text-center">
            <Link to="/blogs" className="btn-primary">
              Browse the full archive
            </Link>
          </div>
        </div>
      </section>

      <section className="container-pad py-16 sm:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-[var(--ink)] px-6 py-14 text-white sm:px-12">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[var(--ember)]/30 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl leading-tight">
              Have a story worth sharing?
            </h2>
            <p className="mt-4 text-white/75 leading-relaxed">
              Join Velthrix Blog to publish essays, tutorials, and field notes for
              a growing community of readers who care about craft.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="btn-primary">
                Create an account
              </Link>
              <Link to="/about" className="btn-ghost">
                Learn about us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
