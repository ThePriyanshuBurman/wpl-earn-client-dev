import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HomeFaq() {
  let faq = [
    {
      title: "How will one know if they've been accepted to WPL?",
      message: `Your status on your profile page will change from "Under review" to "Accepted" and you'll receive a member badge. Unfortunately at this stage we will not be able to offer individual feedback to rejected applications but you can always re-apply with updated proof of work.`,
    },
    {
      title: "What are bounties?",
      message: `Bounties are an exclusive milestones and project based earning opportunity for builders to participate individually or with teams and earn onchain. Coming soon!`,
    },
    {
      title: "How can one join the program?",
      message: `This is an application gated program and you can request access by creating an account and completing your account creation process`,
    },
    {
      title: "What is the WPL?",
      message: `WPL is a contribution based Builder & Content Creator programme with the goal to incentivise high value participants and build an exclusive community of evangelists`,
    },
    {
      title: "Can users from the United States participate?",
      message: `Due to regulatory considerations, US persons will not be able to join the program.`,
    },
    {
      title: "Who is eligible to apply for the WPL program?",
      message: `Anyone with access to the internet can apply. We will prioritise acceptance based on your proof of work. Currently acceptance rates are very low to maintain a high bar of quality but do apply.`,
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faq.map((f, i) => {
        return (
          <AccordionItem value={`item-${i}`} key={i}>
            <AccordionTrigger className="text-base">{f.title}</AccordionTrigger>
            <AccordionContent className="text-sm text-secondary_text_dark">
              {f.message}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
