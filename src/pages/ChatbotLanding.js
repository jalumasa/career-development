import React from 'react';
import { FaRobot } from 'react-icons/fa';
import SectionLanding from '../components/SectionLanding';
import chatSuggestions from '../data/chatSuggestions';

const BENEFITS = [
  {
    title: 'Available whenever',
    description: '2am doubts about your career, welcome.',
  },
  {
    title: 'Career-focused',
    description: "Compass is tuned for career questions — resumes, interviews, negotiation, and more.",
  },
  {
    title: 'Private',
    description: "Your conversations aren't visible to other users.",
  },
];

const ChatbotLanding = () => (
  <SectionLanding
    icon={<FaRobot />}
    eyebrow="AI Career Assistant"
    title="Ask Compass anything, anytime"
    description="A career-focused AI you can ask the questions you wouldn't ask your manager."
    benefits={BENEFITS}
  >
    <section className="section section-alt">
      <div className="section-heading">
        <h2>Try asking things like</h2>
      </div>
      <ul className="example-prompts">
        {chatSuggestions.map((prompt) => (
          <li key={prompt}>{prompt}</li>
        ))}
      </ul>
    </section>
  </SectionLanding>
);

export default ChatbotLanding;
