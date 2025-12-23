'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  LifeBuoy,
  BookOpen,
  MessageCircle,
  Mail,
  ExternalLink,
  ShieldCheck,
  Server,
  Zap,
  ArrowRight,
} from 'lucide-react';

export const TabSupport = () => {
  const faqs = [
    {
      question: 'How do I reset my api keys?',
      answer:
        "You can reset your api keys in the actions tab under the 'Developer settings' section.",
    },
    {
      question: 'Can I upgrade my plan later?',
      answer:
        'Yes, you can change your subscription at any time from the billing area in your profile.',
    },
    {
      question: 'Is my data encrypted?',
      answer: 'All data is encrypted at rest using aes-256 and in transit via tls 1.3.',
    },
    {
      question: 'What is the rate limit for requests?',
      answer:
        'The standard plan allows up to 1,000 requests per minute. Enterprise limits are custom.',
    },
    {
      question: 'Can I cancel my subscription?',
      answer:
        'Yes, you can cancel your subscription at any time from the billing area in your profile.',
    },
    {
      question: 'What is the rate limit for requests?',
      answer:
        'The standard plan allows up to 1,000 requests per minute. Enterprise limits are custom.',
    },
  ];

  // Handlers for support actions
  const handleLiveChat = () => {
    toast.info('Connecting to live chat', {
      description: 'A support agent will be with you shortly.',
    });
  };

  const handleEmailSupport = () => {
    toast.success('Support ticket created', {
      description: 'Check your inbox for the confirmation email.',
    });
  };

  const handleOpenDocs = () => {
    toast('Opening documentation', {
      description: 'Redirecting to our developer portal.',
      icon: <ExternalLink className='h-4 w-4' />,
    });
  };

  return (
    <TabsContent value='help' className='space-y-6 animate-in fade-in-50 duration-500'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Help resources and documentation */}
        <div className='space-y-6'>
          <Card className='shadow-sm border-primary/10 bg-primary/2'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <BookOpen className='h-4 w-4 text-primary' />
                Learning resources
              </CardTitle>
              <CardDescription>
                Deep dive into our guides and technical specs.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div
                className='group cursor-pointer p-3 rounded-lg border bg-background hover:border-primary/50 transition-all'
                onClick={handleOpenDocs}
              >
                <p className='text-sm flex items-center justify-between'>
                  Quick start guide{' '}
                  <ExternalLink className='h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity' />
                </p>
                <p className='text-xs text-muted-foreground mt-1'>
                  Get up and running in less than 5 minutes.
                </p>
              </div>
              <div
                className='group cursor-pointer p-3 rounded-lg border bg-background hover:border-primary/50 transition-all'
                onClick={handleOpenDocs}
              >
                <p className='text-sm flex items-center justify-between'>
                  Api reference{' '}
                  <ExternalLink className='h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity' />
                </p>
                <p className='text-xs text-muted-foreground mt-1'>
                  Detailed endpoint documentation and schemas.
                </p>
              </div>
              <Button
                variant='outline'
                className='w-full text-xs'
                onClick={handleOpenDocs}
              >
                View all documentation
              </Button>
            </CardContent>
          </Card>

          {/* System status card */}
          <Card className='shadow-sm'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm flex items-center gap-2'>
                <Server className='h-4 w-4' />
                System status
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-xs text-muted-foreground'>Global api</span>
                <Badge
                  variant='outline'
                  className='bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]'
                >
                  Operational
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-xs text-muted-foreground'>Web dashboard</span>
                <Badge
                  variant='outline'
                  className='bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]'
                >
                  Operational
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-xs text-muted-foreground'>Job queues</span>
                <Badge
                  variant='outline'
                  className='bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px]'
                >
                  High load
                </Badge>
              </div>
              <Separator />
              <div className='flex items-center gap-2 text-[10px] text-muted-foreground'>
                <Zap className='h-3 w-3 text-amber-500' />
                Last incident reported 4 days ago.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className='shadow-sm pt-0'>
          <CardHeader className='border-b bg-muted/30 py-5'>
            <div className='flex items-center gap-2'>
              <ShieldCheck className='h-5 w-5' />
              <div>
                <CardTitle>Common questions</CardTitle>
                <CardDescription>Quick answers for fast troubleshooting.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className='pt-2'>
            <Accordion type='single' collapsible className='w-full'>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className='border-b-0'>
                  <AccordionTrigger className='text-sm hover:no-underline py-4 text-left'>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className='text-muted-foreground text-xs leading-relaxed'>
                    {faq.answer}
                  </AccordionContent>
                  <Separator />
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact support */}
        <div className='space-y-6'>
          <Card className='shadow-sm border-blue-100 bg-blue-50/20'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <LifeBuoy className='h-5 w-5' />
                Direct assistance
              </CardTitle>
              <CardDescription className='text-sm'>
                Our dedicated support team is ready to help you with technical
                difficulties.
              </CardDescription>
            </CardHeader>
            <CardContent className='flex space-y-3 gap-4'>
              <Button
                className='flex-1 bg-blue-600 hover:bg-blue-700 text-sm'
                onClick={handleLiveChat}
              >
                <MessageCircle className='h-4 w-4' /> Start live chat
              </Button>
              <Button
                variant='outline'
                className='flex-1 text-sm bg-background'
                onClick={handleEmailSupport}
              >
                <Mail className='h-4 w-4' /> Open support ticket
              </Button>
            </CardContent>
          </Card>

          <Card className='shadow-sm pt-0'>
            <CardHeader className='border-b bg-muted/30 py-5'>
              <CardTitle className='text-sm'>Community forum</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground mb-4'>
                Join our developer community to share tips and get help from other
                experts.
              </p>
              <Button
                variant='outline'
                className='group'
                onClick={() => toast('Redirecting to forum')}
              >
                Visit community
                <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </TabsContent>
  );
};

const Separator = () => <div className='h-px bg-border w-full my-1' />;
