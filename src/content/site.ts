/**
 * All site copy lives here so it can be checked against docs/domain/.
 * Anything not confirmed by the owner is worded as a description of how the
 * work usually goes, never as a promise, price, date or guarantee.
 *
 * The one-person operating model lives in docs/domain/ as an internal
 * constraint. Public copy leads with the offer and approach, not headcount.
 */

export const site = {
  name: "Astibosoft",
  email: "hello@astibosoft.com",
  description:
    "Astibosoft helps growing businesses plan, design and build websites, web applications and first versions of products.",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services/", label: "Services" },
  { href: "/work/", label: "Work" },
  { href: "/writings/", label: "Writings" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
] as const;

export type Project = {
  slug: string;
  name: string;
  /** Domain the example sits in, e.g. Messaging */
  sector: string;
  /** Engineering capability this example demonstrates */
  capability: string;
  /** Short Work-page paragraph — capability, not product marketing */
  body: string;
  liveUrl?: string;
  writingSlug?: string;
};

/**
 * Working examples that illustrate engineering skills.
 * How each problem was solved lives under Writings.
 */
export const projects: Project[] = [
  {
    slug: "chatme",
    name: "ChatMe",
    sector: "Realtime systems",
    capability: "Realtime messaging with presence, receipts and media",
    body: "A live messaging build: conversations stay in order, presence and typing work as people expect, and media uploads sit on the same path. Useful when a client needs chat that behaves under real use.",
    liveUrl: "https://connectroom.duckdns.org/",
    writingSlug: "realtime-messaging-that-stays-reliable",
  },
  {
    slug: "hardliq",
    name: "Hardliq",
    sector: "Full-stack applications",
    capability: "Private apps that keep workload visible as you work",
    body: "A signed-in workspace where pending, completed and cancelled work update live, with week and month views. Useful when a business has outgrown spreadsheets and needs a clear picture day to day.",
    liveUrl: "https://taskspace.duckdns.org/",
    writingSlug: "live-workload-without-a-weekly-review",
  },
  {
    slug: "fitcore",
    name: "FitCore",
    sector: "Product surfaces",
    capability: "First versions across backend, mobile and a land page",
    body: "A multi-surface build for trainers and clients: service layer, mobile direction and a public land page. Useful when an idea needs a first cut people can open and react to.",
    liveUrl: "https://davidzdravkovic.github.io/FitCore-landpage/",
    writingSlug: "multi-surface-product-to-a-first-cut",
  },
];

export type Writing = {
  slug: string;
  title: string;
  category: string;
  dateLabel: string;
  summary: string;
  relatedProject?: string;
  paragraphs: string[];
  links?: { label: string; href: string }[];
};

/**
 * Engineering notes — how problems were solved.
 * Work names the skill; Writings explain the approach.
 */
export const writings: Writing[] = [
  {
    slug: "realtime-messaging-that-stays-reliable",
    title: "How ChatMe keeps conversations reliable in realtime",
    category: "Engineering",
    dateLabel: "2026",
    relatedProject: "chatme",
    summary:
      "Accounts, presence, ordered delivery and media on one messaging path — and a client that stays in sync when the network is busy.",
    paragraphs: [
      "ChatMe is the working example behind this note: people can sign in, talk, see who is around, get receipts and send media.",
      "The hard part is the network path. The server is a custom async WebSocket stack in C++ (Boost.Asio and Boost.Beast). Sessions, framing and lifecycle stay under control. Ordered delivery and concurrency are handled so parallel requests do not scramble the conversation.",
      "Database work runs on worker threads so sockets stay responsive. The web client reconciles optimistic sends with server acknowledgements. An Android build via Capacitor covers the same product on mobile. Deployment is Linux with nginx and systemd.",
      "Links below are the live example and the source.",
    ],
    links: [
      { label: "Working example", href: "https://connectroom.duckdns.org/" },
      {
        label: "Source on GitHub",
        href: "https://github.com/davidzdravkovic/ChatMe",
      },
    ],
  },
  {
    slug: "live-workload-without-a-weekly-review",
    title: "How Hardliq keeps workload visible without a weekly review",
    category: "Engineering",
    dateLabel: "2026",
    relatedProject: "hardliq",
    summary:
      "Pending, completed and cancelled work in one private app, updated as people work, with week and month views.",
    paragraphs: [
      "Hardliq is the working example: a productivity app focused on a clear picture of workload — what is open, finished or dropped — as work happens.",
      "It needs authentication, a layout that works on desktop and mobile, and a backend that holds state cleanly. The build uses a C# / ASP.NET Core API, PostgreSQL, a React client, Docker packaging and nginx in front.",
      "Links below are the live example and the source.",
    ],
    links: [
      { label: "Working example", href: "https://taskspace.duckdns.org/" },
      {
        label: "Source on GitHub",
        href: "https://github.com/davidzdravkovic/Hardliq",
      },
    ],
  },
  {
    slug: "multi-surface-product-to-a-first-cut",
    title: "How FitCore reached a first cut across several surfaces",
    category: "Engineering",
    dateLabel: "2026",
    relatedProject: "fitcore",
    summary:
      "Backend service, mobile direction and a public land page — enough to show and iterate on an idea for trainers and clients.",
    paragraphs: [
      "FitCore is the working example: a fitness-oriented build for trainers and clients, with directory and tooling ideas and a public land page that frames the offer.",
      "The structure spans a C# backend service, a Dart/Flutter direction for mobile, and a TypeScript land page for the public-facing surface.",
      "Links below are the land page and the source.",
    ],
    links: [
      {
        label: "Working example",
        href: "https://davidzdravkovic.github.io/FitCore-landpage/",
      },
      {
        label: "Source on GitHub",
        href: "https://github.com/davidzdravkovic/FitCore",
      },
    ],
  },
];

/** Situations that bring a business to software help (docs/domain/audience.md). */
/** Short capability labels for the home ticker. */
export const capabilityTicker = [
  "Websites",
  "Web applications",
  "MVPs and first versions",
  "UX and UI design",
  "Mobile",
  "Engineering review",
  "Handover and documentation",
] as const;

export const situations = [
  {
    title: "You need a website that does its job",
    body: "A professional site or customer-facing web experience for a business that is growing or changing.",
  },
  {
    title: "Manual work or disconnected tools are slowing you down",
    body: "Spreadsheets, copy-paste and tools that do not talk to each other, where a small custom tool would help.",
  },
  {
    title: "You have a product idea to test",
    body: "A first version that lets you learn from real users before you invest more.",
  },
  {
    title: "Something you already have needs work",
    body: "An existing site or application with UX, performance, code quality or maintainability problems.",
  },
  {
    title: "You need focused help without a full-time hire",
    body: "Specialist software work for a defined project or period, without building a permanent team for it.",
  },
] as const;

export type Service = {
  slug: string;
  name: string;
  summary: string;
  forWho: string;
  canInclude: string[];
  toAgree: string;
};

/** Main offers get full descriptions on the services page. */
export const mainServices: Service[] = [
  {
    slug: "websites-and-web-apps",
    name: "Websites and web applications",
    summary:
      "A clear, credible online presence, or a custom web tool where off-the-shelf software falls short.",
    forWho:
      "Businesses that need a better customer journey, or dashboards, portals, workflows and integrations built around how they actually work.",
    canInclude: [
      "Discovery and structure of the site or application",
      "Responsive interface design and implementation",
      "Forms, integrations and deployment",
      "Handover so the product can be run and changed without starting over",
    ],
    toAgree:
      "Whether copywriting, branding, SEO, analytics, content editing and ongoing maintenance are part of the project. For applications, also security, data migration, hosting and support.",
  },
  {
    slug: "mvp-and-product-development",
    name: "MVP and product development",
    summary:
      "Turning a defined idea into a first version that people can use and you can learn from.",
    forWho:
      "Founders and business leads who know what they want to test and want to spend as little as is sensible to find out.",
    canInclude: [
      "Defining the smallest useful scope",
      "User flows and interface design",
      "Building and deploying the first version",
      "A plan for what to learn from early users",
    ],
    toAgree:
      "What the first version must prove, and what is deliberately left out. A first version tests an idea; it does not promise adoption or commercial success.",
  },
];

/** Supporting offers get shorter entries. */
export const supportingServices: { name: string; body: string }[] = [
  {
    name: "UX and UI design",
    body: "Clearer user journeys before or alongside the build: user flows, wireframes, interface design and implementation-ready specifications. This is design work, not formal user research or usability testing, unless that is agreed and carried out.",
  },
  {
    name: "Mobile development",
    body: "Mobile applications or mobile-friendly experiences where the business case supports them. Platforms, app-store accounts, device testing and release responsibilities are agreed before any quote.",
  },
  {
    name: "Software consulting and engineering review",
    body: "A focused look at architecture, code quality, performance, maintainability, technical choices or delivery risk. Scope, access and the format of the findings are agreed first, including whether implementation follows.",
  },
];

/** The sequence is real: each step follows the previous one (docs/domain/engagement-model.md). */
export const process = [
  {
    title: "A first conversation",
    body: "A look at the business problem, who it affects, your constraints and what a good result would look like.",
  },
  {
    title: "Scoping",
    body: "Requirements and priorities, named risks, and a clear record of what is deliberately out of scope.",
  },
  {
    title: "A written proposal",
    body: "Deliverables, milestones, responsibilities, assumptions, price and payment terms, in writing, before work starts.",
  },
  {
    title: "Build in small increments",
    body: "Working results at agreed checkpoints, with feedback while changes are still cheap.",
  },
  {
    title: "Handover",
    body: "The agreed code, deployment details, documentation and a walk-through of how it works.",
  },
] as const;

export const principles = [
  {
    title: "Direct communication",
    body: "Questions, decisions and difficult news stay close to the work. No sales-to-delivery hand-off.",
  },
  {
    title: "Small, reviewable steps",
    body: "Work is split into milestones you can look at and react to, with scope written down.",
  },
  {
    title: "Trade-offs and risks early",
    body: "If something will cost more, take longer or not work the way you expect, that is raised as soon as it is known.",
  },
  {
    title: "The smallest useful solution first",
    body: "Complexity is added when it earns its place, not because it is available.",
  },
] as const;

export const goodFit = [
  "You have a real problem or a clearly defined idea, even if the solution is not clear yet.",
  "Someone on your side can make decisions and give timely feedback.",
  "You want to understand what is being built and why.",
  "You value quality and clear scope over the lowest price.",
] as const;

export const notAFit = [
  "Projects where nobody owns decisions on the client side.",
  "Work that needs a guaranteed business outcome, or unlimited changes for a fixed fee.",
  "Deadlines that cannot be met without cutting corners.",
  "Work outside the skills or capacity available for the engagement.",
] as const;

export const serviceOptions = [
  "Website",
  "Web application or business tool",
  "MVP or new product",
  "Mobile",
  "UX and UI design",
  "Consulting or engineering review",
  "Not sure yet",
] as const;
