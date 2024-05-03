import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqAccordionProps {
  question: string;
  answer: string;
}

export const FaqAccordion = ({ question, answer }: FaqAccordionProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="item-1"
        className="border-b border-gray-700 dark:border-gray-400"
      >
        <AccordionTrigger className="text-base">{question}</AccordionTrigger>
        <AccordionContent className="text-base">{answer}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
