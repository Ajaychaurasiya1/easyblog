import blog1 from "../assets/blog1.png";
import blog2 from "../assets/blog2.png";
import blog3 from "../assets/blog3.png";
import blog4 from "../assets/blog4.png";
import blog5 from "../assets/blog5.png";
import blog6 from "../assets/blog6.png";
import author from "../assets/author.png";

const authorProfile = {
  id: "dummy-author",
  name: "Aisha Rahman",
  image: author,
};

export const dummyBlogs = [
  {
    _id: "dummy-01-ai-workflows",
    title: "The Future of AI in Everyday Developer Workflows",
    category: "Technology",
    image: blog1,
    description: `Artificial intelligence is no longer a side experiment in most engineering teams. It is becoming part of how we write, review, test, and ship software.

The best teams treat AI as a junior collaborator: fast at boilerplate, useful for exploration, and always checked by a human before merge. Instead of asking a model to “build the app,” they ask it to draft a failing test, suggest edge cases, or summarize a confusing pull request.

What changes next is judgment. Developers who understand product constraints, security boundaries, and readable architecture will get more from these tools than those who only chase autocomplete.

Start small. Pick one painful weekly task — writing migration notes, converting fixtures, documenting an API — and build a repeatable prompt + review habit around it. The compounding benefit is not magic output. It is fewer context switches and clearer thinking.`,
    author: authorProfile,
    createdAt: "2026-07-10T09:00:00.000Z",
    updatedAt: "2026-07-10T09:00:00.000Z",
  },
  {
    _id: "dummy-02-startup-focus",
    title: "How Early Startups Should Choose What to Build Next",
    category: "Business",
    image: blog2,
    description: `Early-stage teams drown in ideas. The hard part is not creativity — it is saying no with confidence.

A useful filter is simple: does this work reduce time-to-value for a real customer this month? If a feature only makes the pitch deck prettier, it can wait. If it removes a blocker that three users already mentioned, it moves up.

Talk to customers weekly, but do not treat every request as a roadmap item. Look for repeated friction. One frustrated power user is a story. Five people failing at the same step is a product problem.

Ship the smallest version that teaches you something. Then measure retention, not applause. Startups that stay curious and ruthless about focus usually outlast teams that only celebrate launches.`,
    author: authorProfile,
    createdAt: "2026-07-08T11:30:00.000Z",
    updatedAt: "2026-07-08T11:30:00.000Z",
  },
  {
    _id: "dummy-03-habits",
    title: "Small Habits That Protect Your Energy as a Maker",
    category: "Lifestyle",
    image: blog3,
    description: `Creative work looks glamorous from the outside and fragile from the inside. Sleep debt, endless Slack, and “quick checks” on your phone quietly erase deep focus.

Protecting energy is a design problem. Put your hardest thinking in the first uninterrupted block of the day. Keep meetings in clusters. Leave your phone in another room for ninety minutes and notice how often your hand still reaches for it.

Movement matters more than intensity. A short walk between writing sessions often unlocks the sentence you were forcing. So does ending the day on purpose — closing the laptop, writing tomorrow’s first task, and actually stopping.

You do not need a perfect routine. You need a few non-negotiables that keep your mind available for the work that only you can do.`,
    author: authorProfile,
    createdAt: "2026-07-05T08:15:00.000Z",
    updatedAt: "2026-07-05T08:15:00.000Z",
  },
  {
    _id: "dummy-04-investing",
    title: "Investing Basics for People Who Hate Finance Jargon",
    category: "Finance",
    image: blog4,
    description: `Most personal finance advice fails because it assumes you enjoy spreadsheets. You do not need to. You need a few sturdy defaults.

First, separate spending money from long-term money. An emergency buffer of a few months of expenses turns market noise into background sound. Second, invest regularly in diversified funds rather than hunting for the one perfect stock tip.

Compounding is boring on purpose. The winners are usually people who automated contributions and left them alone. Fees matter. Panic selling matters more.

If a product cannot explain risk in plain language, skip it. Learn enough to avoid disasters, then spend your curiosity on your craft. Wealth built slowly is still wealth — and it pairs well with a calm nervous system.`,
    author: authorProfile,
    createdAt: "2026-07-02T14:00:00.000Z",
    updatedAt: "2026-07-02T14:00:00.000Z",
  },
  {
    _id: "dummy-05-learning-web",
    title: "A Practical Path to Learning Modern Web Development",
    category: "Education",
    image: blog5,
    description: `The web learning landscape is crowded with tutorials that never end. A better path is project-shaped.

Learn HTML and CSS until you can recreate a simple landing page without peeking. Then learn enough JavaScript to make it interactive. Only then touch a framework. React (or similar) makes sense after you understand the DOM pain it abstracts.

Build three small apps: a notes tool, a fetch-based dashboard, and an auth-protected form flow. Deploy them. Read error messages patiently. That loop teaches more than twenty unfinished courses.

Documentation is a skill. Write README files for your projects. Explain tradeoffs. When you can teach a concept in a short paragraph, you usually understand it well enough to use it at work.`,
    author: authorProfile,
    createdAt: "2026-06-28T10:45:00.000Z",
    updatedAt: "2026-06-28T10:45:00.000Z",
  },
  {
    _id: "dummy-06-remote-culture",
    title: "Building Trust in Remote Teams Without More Meetings",
    category: "Business",
    image: blog6,
    description: `Remote teams do not fail from distance. They fail from ambiguous ownership and silent decisions.

Trust grows when people can see progress without asking. Clear written updates, visible tickets, and decision logs beat another status call. Meetings should be reserved for conflict, creativity, or care — not for reading documents aloud.

Hire for written communication and follow-through. Create rituals that are light but reliable: a Monday intention note, a Friday shipped list, office hours instead of constant availability.

Assume positive intent, then verify with artifacts. When remote culture works, people feel both autonomous and connected — free to deep work, and confident someone will catch the ball when they pass it.`,
    author: authorProfile,
    createdAt: "2026-06-24T16:20:00.000Z",
    updatedAt: "2026-06-24T16:20:00.000Z",
  },
];
