import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Rocket, Zap, ShieldCheck } from 'lucide-react';

const STATS_DATA = [
  {
    title: 'Total users',
    value: '1,234',
    icon: User,
    change: '+12.5%',
    color: 'text-green-500',
  },
  {
    title: 'Components',
    value: '24',
    icon: Rocket,
    change: '+3 new',
    color: 'text-blue-500',
  },
  {
    title: 'Active sessions',
    value: '573',
    icon: Zap,
    change: '+18%',
    color: 'text-orange-500',
  },
  {
    title: 'System uptime',
    value: '99.9%',
    icon: ShieldCheck,
    change: 'Stable',
    color: 'text-indigo-500',
  },
];

export const Stats = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
      {STATS_DATA.map((stat, i) => (
        <Card
          key={i}
          className='overflow-hidden border shadow-md bg-card hover:bg-accent/50 transition-colors'
        >
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-semibold text-muted-foreground uppercase tracking-wider'>
              {stat.title}
            </CardTitle>
            <stat.icon className='h-5 w-5 text-muted-foreground/70' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold'>{stat.value}</div>
            <p className={`text-xs font-medium mt-1 ${stat.color}`}>
              {stat.change}{' '}
              <span className='text-muted-foreground font-normal'>vs last period</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
