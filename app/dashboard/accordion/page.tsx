import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const accordionItems = [
  {
    id: 'item-1',
    title: 'Product Information',
    content: [
      'Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.',
      'Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.',
    ],
  },
  {
    id: 'item-2',
    title: 'Shipping Details',
    content: [
      'We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days, while express shipping ensures delivery within 1-2 business days.',
      'All orders are carefully packaged and fully insured. Track your shipment in real-time through our dedicated tracking portal.',
    ],
  },
  {
    id: 'item-3',
    title: 'Return Policy',
    content: [
      "We stand behind our products with a comprehensive 30-day return policy. If you're not completely satisfied, simply return the item in its original condition.",
      'Our hassle-free return process includes free return shipping and full refunds processed within 48 hours of receiving the returned item.',
    ],
  },
];

export default function AccordionDemo() {
  return (
    <Accordion type='single' collapsible className='w-full' defaultValue='item-1'>
      {accordionItems.map(({ id, title, content }) => (
        <AccordionItem key={id} value={id}>
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent className='flex flex-col gap-4 text-balance'>
            {content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
