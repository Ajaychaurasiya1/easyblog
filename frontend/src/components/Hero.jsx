import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <section className="relative min-h-[88vh] w-full overflow-hidden text-white">
      <img
        src={assets.hero}
        alt="Writers and readers gathering around stories"
        className="absolute inset-0 h-full w-full object-cover animate-soft-zoom"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(18,21,26,0.92)] via-[rgba(18,21,26,0.72)] to-[rgba(18,21,26,0.35)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(232,93,4,0.22),transparent_40%)]" />

      <div className="relative container-pad flex min-h-[88vh] flex-col justify-end pb-16 pt-28 sm:pb-20">
        <p className="animate-fade-up font-display text-4xl sm:text-5xl md:text-6xl tracking-tight">
          Velthrix <span className="italic text-[var(--ember)]">Blog</span>
        </p>
        <h1 className="animate-fade-up-delay mt-4 max-w-2xl font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
          Stories that sharpen how you build, think, and live online.
        </h1>
        <p className="animate-fade-up-delay-2 mt-4 max-w-xl text-base text-white/80 sm:text-lg leading-relaxed">
          Practical writing on technology, business, and culture — from founders,
          makers, and curious readers.
        </p>
        <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap gap-3">
          <Link to="/blogs" className="btn-primary">
            Explore articles
          </Link>
          <Link to="/register" className="btn-ghost">
            Start writing
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
