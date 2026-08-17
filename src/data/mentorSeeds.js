// Starter content for the "mentors" Firestore collection — fictional mentor
// profiles spanning different fields, loaded via the "Load starter mentors"
// button in AdminPanel. No photos: mentor cards use an initials avatar like
// the rest of the app, so there's no real person's likeness attached to a
// made-up bio.

const mentorSeeds = [
  {
    name: 'Amara Osei',
    specialty: 'Software Engineering',
    bio: "Backend engineer with 9 years building distributed systems, the last 4 as a tech lead. I like helping people prep for system design interviews and figure out when it's time to go for a senior title.",
    contactEmail: 'amara.mentor@example.com',
  },
  {
    name: 'Daniel Kwon',
    specialty: 'Product Management',
    bio: "PM for 7 years across early-stage startups and one large public company. Happy to talk through breaking into PM from another discipline, writing specs, or handling a roadmap fight with engineering.",
    contactEmail: 'daniel.mentor@example.com',
  },
  {
    name: 'Priya Nair',
    specialty: 'Data Science',
    bio: "Data scientist turned ML engineering manager. I help people navigate the shift from individual contributor to managing a technical team, and I'm always up for a mock case-study interview.",
    contactEmail: 'priya.mentor@example.com',
  },
  {
    name: 'Marcus Bell',
    specialty: 'UX Design',
    bio: "Product designer with a background in accessibility. I review portfolios, help with case study write-ups, and can talk through what actually gets asked in a design critique interview.",
    contactEmail: 'marcus.mentor@example.com',
  },
  {
    name: 'Sofia Ramirez',
    specialty: 'Marketing',
    bio: "Led growth marketing at two Series B startups. I can help with positioning your own personal brand, negotiating a marketing offer, or making the jump from agency to in-house.",
    contactEmail: 'sofia.mentor@example.com',
  },
  {
    name: 'James Whitfield',
    specialty: 'Finance',
    bio: "Ten years in corporate finance and FP&A, currently a finance director. Good person to talk to about breaking into finance without a traditional background, or prepping for a technical finance interview.",
    contactEmail: 'james.mentor@example.com',
  },
];

module.exports = mentorSeeds;
