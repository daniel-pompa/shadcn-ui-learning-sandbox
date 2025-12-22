import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge'; // Importamos el componente Badge
import {
  Bell,
  Calendar,
  FileText,
  Settings,
  User,
  BarChart,
  CheckCircle,
  AlertCircle,
  Download,
  Share2,
  Edit,
} from 'lucide-react';

// Definimos el tipo para cada card
interface DemoCard {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  content: string;
  footerText?: string;
  actions?: {
    label: string;
    icon: React.ReactNode;
    variant: 'default' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link';
  }[];
  badge?: {
    text: string;
    variant:
      | 'default'
      | 'secondary'
      | 'destructive'
      | 'outline'
      | 'success'
      | 'info'
      | 'warning';
  };
}

export default function CardDemo() {
  const demoCards: DemoCard[] = [
    {
      id: 1,
      title: 'Notifications',
      description: 'Manage your notifications and alerts',
      icon: <Bell className='h-6 w-6' />,
      content:
        'You have 3 unread notifications. Customize how you receive alerts for your projects.',
      footerText: 'Last updated 2 hours ago',
      actions: [
        { label: 'View all', icon: <Bell className='h-4 w-4' />, variant: 'default' },
        { label: 'Settings', icon: <Settings className='h-4 w-4' />, variant: 'outline' },
      ],
      badge: { text: 'active', variant: 'default' },
    },
    {
      id: 2,
      title: 'Calendar',
      description: 'Upcoming events and schedule',
      icon: <Calendar className='h-6 w-6' />,
      content:
        'Next meeting: Project Review at 3:00 PM today. Sync your calendar across devices.',
      footerText: '2 events today',
      actions: [
        { label: 'Add event', icon: <Edit className='h-4 w-4' />, variant: 'default' },
        { label: 'Share', icon: <Share2 className='h-4 w-4' />, variant: 'outline' },
      ],
      badge: { text: 'today', variant: 'secondary' },
    },
    {
      id: 3,
      title: 'Documentation',
      description: 'Access project documentation',
      icon: <FileText className='h-6 w-6' />,
      content:
        'Complete guide to shadcn/ui components. Learn how to build modern interfaces quickly.',
      footerText: 'Updated recently',
      actions: [
        { label: 'Download', icon: <Download className='h-4 w-4' />, variant: 'default' },
        { label: 'Share', icon: <Share2 className='h-4 w-4' />, variant: 'outline' },
      ],
      badge: { text: 'updated', variant: 'outline' },
    },
    {
      id: 4,
      title: 'User profile',
      description: 'Manage your account and settings',
      icon: <User className='h-6 w-6 text-orange-500' />,
      content:
        'Complete your profile to unlock all features. Your profile is 80% complete.',
      footerText: 'Member since 2023',
      actions: [
        { label: 'Edit Profile', icon: <Edit className='h-4 w-4' />, variant: 'default' },
        { label: 'Settings', icon: <Settings className='h-4 w-4' />, variant: 'outline' },
      ],
      badge: { text: '80%', variant: 'default' },
    },
    {
      id: 5,
      title: 'Analytics',
      description: 'View project statistics and insights',
      icon: <BarChart className='h-6 w-6 text-cyan-500' />,
      content:
        'Traffic is up by 15% this week. New users increased by 20% compared to last week.',
      footerText: 'Real-time data',
      actions: [
        {
          label: 'view report',
          icon: <BarChart className='h-4 w-4' />,
          variant: 'default',
        },
        { label: 'Export', icon: <Download className='h-4 w-4' />, variant: 'outline' },
      ],
      badge: { text: 'live', variant: 'info' },
    },
    {
      id: 6,
      title: 'Task manager',
      description: 'Track your tasks and progress',
      icon: <CheckCircle className='h-6 w-6 text-emerald-500' />,
      content: 'You have completed 12 out of 15 tasks this week. Great progress!',
      footerText: '3 tasks remaining',
      actions: [
        {
          label: 'View tasks',
          icon: <FileText className='h-4 w-4' />,
          variant: 'default',
        },
        { label: 'Add task', icon: <Edit className='h-4 w-4' />, variant: 'outline' },
      ],
      badge: { text: 'complete', variant: 'success' },
    },
  ];

  return (
    <>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {demoCards.map(card => (
          <Card
            key={card.id}
            className='overflow-hidden border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300'
          >
            <CardHeader className='pb-3'>
              <div className='flex items-start justify-between'>
                <div className='flex items-center space-x-3'>
                  <div className='p-2 bg-gray-100 rounded-lg'>{card.icon}</div>
                  <div>
                    <CardTitle className='text-lg'>{card.title}</CardTitle>
                    <CardDescription className='mt-1'>{card.description}</CardDescription>
                  </div>
                </div>
                {card.badge && (
                  <Badge variant={card.badge.variant}>{card.badge.text}</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className='pb-3'>
              <p className='text-gray-700'>{card.content}</p>
            </CardContent>
            <CardFooter className='pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
              <div className='text-sm text-gray-500'>{card.footerText}</div>
              <div className='flex space-x-2'>
                {card.actions?.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant}
                    size='sm'
                    className='gap-1'
                  >
                    {action.icon}
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className='mt-8 border-blue-100 bg-blue-50'>
        <CardHeader>
          <CardTitle className='text-blue-800 flex items-center gap-2'>
            <AlertCircle className='h-5 w-5' />
            About these cards
          </CardTitle>
          <CardDescription className='text-blue-700 text-base'>
            This demo showcases the flexibility of the Card component from shadcn/ui
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-blue-800'>
            Each card uses the same base component but demonstrates different
            configurations, including headers with icons, badges, multiple action buttons,
            and footers. This is part of the Shadcn/ui Learning Sandbox project.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
