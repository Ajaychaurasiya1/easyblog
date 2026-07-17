import { useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    toast.success("Thanks — we will get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      <section className="relative min-h-[40vh] overflow-hidden">
        <img
          src={assets.contact_us || assets.contact}
          alt="Contact"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(18,21,26,0.7)]" />
        <div className="relative container-pad flex min-h-[40vh] flex-col justify-end pb-12 pt-24">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--ember)]">
            Contact
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl text-white sm:text-5xl">
            Say hello. Pitch a story. Ask a question.
          </h1>
        </div>
      </section>

      <section className="container-pad py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="section-title">We read every message</h2>
            <p className="section-lead mt-3">
              Partnerships, guest posts, product feedback, or just a note about
              an article you liked — write us. Typical reply time is one to two
              business days.
            </p>
            <div className="mt-8 space-y-5 text-sm">
              <div className="border-t border-[var(--line)] pt-4">
                <p className="font-medium text-[var(--ink)]">Email</p>
                <p className="mt-1 text-[var(--ink-soft)]">
                  ajaychaurasiya@gmail.com
                </p>
              </div>
              <div className="border-t border-[var(--line)] pt-4">
                <p className="font-medium text-[var(--ink)]">Editorial</p>
                <p className="mt-1 text-[var(--ink-soft)]">
                  Pitch essays between 800–2,000 words with a clear takeaway.
                </p>
              </div>
              <div className="border-t border-[var(--line)] pt-4">
                <p className="font-medium text-[var(--ink)]">Support</p>
                <p className="mt-1 text-[var(--ink-soft)]">
                  Account or publishing issues? Include your registered email.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium">Name</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 outline-none focus:border-[var(--ember)]"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium">Email</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 outline-none focus:border-[var(--ember)]"
                />
              </label>
            </div>
            <label className="mt-4 block text-sm">
              <span className="mb-1.5 block font-medium">Subject</span>
              <input
                name="subject"
                value={form.subject}
                onChange={onChange}
                required
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 outline-none focus:border-[var(--ember)]"
              />
            </label>
            <label className="mt-4 block text-sm">
              <span className="mb-1.5 block font-medium">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                required
                rows={5}
                className="w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 outline-none focus:border-[var(--ember)]"
              />
            </label>
            <button type="submit" className="btn-primary mt-6 w-full sm:w-auto cursor-pointer">
              Send message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
