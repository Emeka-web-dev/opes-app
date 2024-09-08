import { ContainerLayout } from "./container-layout";

import { FaqAccordion } from "./faq-accordion";

const questionAndAnswers = [
  {
    question: "Which plan is suitable for me?",
    answer:
      "All plans are beneficial and earnings differ depending on your preferred plan.",
  },
  {
    question: "Do I need refferals to earn?",
    answer: "yes! You need refferals to earn on Opes",
  },
  {
    question: "How do I withdraw my earnings?",
    answer:
      "The total earnings shown on available balance will be sent to the bank account provided.",
  },
  {
    question: "How do I earn money on Opes?",
    answer:
      "You earn income in 3 ways; refferal bonus, matching bonus, and spill overs.",
  },
  {
    question: "How do I get refferals?",
    answer:
      "Using your unique refferal link invite friends and family to join Opes.",
  },
];
export const Faq = () => {
  return (
    <ContainerLayout
      header="Frequently Asked Questions"
      caption="These are the frequently asked question that might answer some of your questions"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-5xl gap-x-12 mx-auto">
        {questionAndAnswers.map((qAndA, i) => (
          <FaqAccordion
            answer={qAndA.answer}
            question={qAndA.question}
            key={i}
          />
        ))}
      </div>
    </ContainerLayout>
  );
};
