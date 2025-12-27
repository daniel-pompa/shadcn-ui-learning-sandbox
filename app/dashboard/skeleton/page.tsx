import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UserData {
  id: number;
  name: string;
  username: string;
  image: string;
  bio: string;
  skills: string[];
}

/** Simulates an API call with diverse user profiles.*/
const getData = async (): Promise<UserData[]> => {
  await new Promise(resolve => setTimeout(resolve, 3000));

  return [
    {
      id: 1,
      name: 'Alice Johnson',
      username: '@alice_dev',
      image: 'https://github.com/shadcn.png',
      bio: 'Frontend architect specialized in React and Design Systems. Passionate about accessibility.',
      skills: ['React', 'Next.js', 'Typescript'],
    },
    {
      id: 2,
      name: 'Robert Smith',
      username: '@robert_backend',
      image: 'https://github.com/shadcn.png',
      bio: 'Backend enthusiast focused on high-performance distributed systems and microservices.',
      skills: ['Go', 'Docker', 'Redis'],
    },
    {
      id: 3,
      name: 'Noa Lee',
      username: '@noa_ux',
      image: 'https://github.com/shadcn.png',
      bio: 'UI/UX Designer turned developer. Creating seamless digital experiences with a focus on usability.',
      skills: ['Figma', 'Tailwind', 'Motion'],
    },
    {
      id: 4,
      name: 'Michael Chen',
      username: '@michael_devops',
      image: 'https://github.com/shadcn.png',
      bio: 'DevOps Engineer managing cloud infrastructure and automated CI/CD pipelines.',
      skills: ['AWS', 'Terraform', 'Linux'],
    },
    {
      id: 5,
      name: 'Sarah Wilson',
      username: '@sarah_dev',
      image: 'https://github.com/shadcn.png',
      bio: 'Fullstack developer building open-source tools and contributing to the web community.',
      skills: ['Vue', 'Node.js', 'Postgres'],
    },
    {
      id: 6,
      name: 'David Miller',
      username: '@david_data',
      image: 'https://github.com/shadcn.png',
      bio: 'Data Scientist exploring the intersection of Machine Learning and Web Technologies.',
      skills: ['Python', 'PyTorch', 'FastAPI'],
    },
    {
      id: 7,
      name: 'Emma Lewis',
      username: '@emma_security',
      image: 'https://github.com/shadcn.png',
      bio: 'Security researcher and backend developer. Keeping the internet safe, one line at a time.',
      skills: ['Rust', 'Wasm', 'Cybersec'],
    },
    {
      id: 8,
      name: 'Alex Harris',
      username: '@alex_mobile',
      image: 'https://github.com/shadcn.png',
      bio: 'Mobile specialist building cross-platform applications with a focus on performance.',
      skills: ['React Native', 'Swift', 'Kotlin'],
    },
  ];
};

export default async function SkeletonDemo() {
  const data = await getData();

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {data.map(user => (
        <Card
          key={user.id}
          className='transition-all duration-300 hover:shadow-lg group flex flex-col h-full'
        >
          <CardHeader className='flex flex-row items-center gap-4 space-y-0'>
            <div className='relative h-10 w-10 shrink-0'>
              <Image
                src={user.image}
                alt={user.name}
                fill
                className='rounded-full object-cover transition-all grayscale group-hover:grayscale-0'
              />
            </div>
            <div className='flex flex-col'>
              <CardTitle className='text-sm leading-none truncate max-w-37.5'>
                {user.name}
              </CardTitle>
              <CardDescription className='text-xs mt-1 text-slate-500'>
                {user.username}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className='space-y-4 flex-1'>
            <p className='text-xs text-slate-500 line-clamp-2 leading-relaxed italic'>
              &quot;{user.bio}&quot;
            </p>
            <div className='flex flex-wrap gap-2'>
              {user.skills.map(skill => (
                <Badge
                  key={skill}
                  variant='secondary'
                  className='text-[10px] px-2 py-1 bg-slate-100 text-slate-600 border-none'
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>

          <CardFooter className='flex justify-end border-t'>
            <Button variant='default' size='sm' className='text-xs font-semibold px-4'>
              View profile
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
