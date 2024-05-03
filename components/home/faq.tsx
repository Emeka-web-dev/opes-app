import { ContainerLayout } from "./container-layout";

import { FaqAccordion } from "./faq-accordion";

const questionAndAnswers = [
  {
    question: "Which plan is suitable for me?",
    answer:
      "Sed tempor mi at nunc commodo, quis tincidunt turpis finibus. Pellentesque congue neque justo.",
  },
  {
    question: "Which plan is suitable for me?",
    answer:
      "Sed tempor mi at nunc commodo, quis tincidunt turpis finibus. Pellentesque congue neque justo.",
  },
  {
    question: "Which plan is suitable for me?",
    answer:
      "Sed tempor mi at nunc commodo, quis tincidunt turpis finibus. Pellentesque congue neque justo.",
  },
  {
    question: "Which plan is suitable for me?",
    answer:
      "Sed tempor mi at nunc commodo, quis tincidunt turpis finibus. Pellentesque congue neque justo.",
  },
  {
    question: "Which plan is suitable for me?",
    answer:
      "Sed tempor mi at nunc commodo, quis tincidunt turpis finibus. Pellentesque congue neque justo.",
  },
  {
    question: "Which plan is suitable for me?",
    answer:
      "Sed tempor mi at nunc commodo, quis tincidunt turpis finibus. Pellentesque congue neque justo.",
  },
];
export const Faq = () => {
  return (
    <ContainerLayout
      header="Frequently Asked Questions"
      caption="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
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
