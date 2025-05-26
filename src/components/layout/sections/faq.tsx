"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What is PickandPartner?",
    answer:
      "Pick and Partner is a platform that helps newsletter creators grow through free, high-quality cross-promotions.",
    value: "item-1",
  },
  {
    question: "How does Pick and Partner work?",
    answer:
      "Creators simply submit their newsletter details. Our team analyzes their niche and subscriber count to find and suggest ideal cross-promotion partners.",
    value: "item-2",
  },
  {
    question: "Who can use Pick and Partner?",
    answer:
      "Any newsletter creator who wants to grow their audience through free and effective cross-promotions can join Pick and Partner.",
    value: "item-3",
  },
  {
    question: "How are newsletter matches decided?",
    answer:
      "We use a simple rule-based system that matches creators based on their niche and subscriber count to ensure both newsletters benefit equally.",
    value: "item-4",
  },
  {
    question: "Do I need to create an account to use Pick and Partner?",
    answer:
      "No login is required. Just submit your newsletter details, and we’ll reach out with matching options.",
    value: "item-5",
  },
  {
    question: "Is Pick and Partner free to use?",
    answer:
      "Yes, PickandPartner is completely free. Our goal is to help creators grow without spending on ads.",
    value: "item-6",
  },
  {
    question: "What details are used to match newsletters?",
    answer:
      "We match based on niche, subscriber count, open rate, and CTR to ensure relevance and quality.",
    value: "item-7",
  },
  {
    question: "Can small newsletters join Pick and Partner?",
    answer:
      "Yes! We welcome newsletters of all sizes. Our system is flexible, and creators can choose partners that suit their growth goals.",
    value: "item-8",
  },
  {
    question: "How do I get support or ask questions?",
    answer:
      "Join our Discord community where creators connect, network, and get support directly from our team.",
    value: "item-9",
  },
  {
    question: "What’s coming next for Pick and Partner?",
    answer:
      "We’re building AI-based matching to help creators find even better cross-promotion partners in seconds.",
    value: "item-10",
  },
];

export const FAQSection = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const bgColor = isDarkMode ? "bg-black" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const borderColor = isDarkMode ? "border-gray-600" : "border-gray-200";
  const dividerColor = isDarkMode ? "divide-gray-700" : "divide-gray-200";

  return (
    <div className={cn("relative w-full flex justify-center", bgColor, textColor)}>
      <section id="faq" className="container max-w-[800px] mx-auto py-24 sm:py-32 px-4">
        <div className="mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950 px-4 py-2 mb-4">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400 tracking-wider">
                FREQUENTLY ASKED QUESTIONS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
              Everything you need to know
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get answers to the most common questions about PickandPartner
            </p>
          </div>
  
          {/* FAQ Accordion */}
          <div className="space-y-4">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-4"
            >
              {FAQList.map(({ question, answer, value }) => (
                <AccordionItem 
                  key={value} 
                  value={value}
                  className={cn(
                    "border rounded-xl shadow-sm hover:shadow-md transition-all duration-200",
                    "bg-white dark:bg-gray-900",
                    "border-gray-200 dark:border-gray-700",
                    "hover:border-blue-200 dark:hover:border-blue-800"
                  )}
                >
                  <AccordionTrigger className="text-left font-semibold text-lg px-6 py-5 hover:no-underline group">
                    <span className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">?</span>
                      </div>
                      <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {question}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 pt-0">
                    <div className="ml-11 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

         
        </div>
      </section>
    </div>
  
  );
};
