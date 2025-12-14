import { FaReact } from 'react-icons/fa';
import { SiNextdotjs, SiRadixui, SiTypescript } from 'react-icons/si';
import { RiTailwindCssFill } from 'react-icons/ri';
import type { TechItem } from './types';

const techStack: TechItem[] = [
  {
    name: 'Next.js',
    icon: <SiNextdotjs className='h-8 w-8' />,
    color: 'text-slate-900',
  },
  { name: 'React', icon: <FaReact className='h-8 w-8' />, color: 'text-blue-500' },
  {
    name: 'TypeScript',
    icon: <SiTypescript className='h-8 w-8' />,
    color: 'text-blue-600',
  },
  {
    name: 'Tailwind CSS',
    icon: <RiTailwindCssFill className='h-8 w-8' />,
    color: 'text-cyan-500',
  },
  {
    name: 'Radix UI',
    icon: <SiRadixui className='h-8 w-8' />,
    color: 'text-slate-900',
  },
];

export const TechStackSection = () => {
  return (
    <section className='py-12'>
      <h2 className='text-2xl font-bold mb-8'>Built with modern web technologies</h2>
      <div className='flex flex-wrap -ml-3 gap-2'>
        {techStack.map((tech, index) => (
          <div key={index} className='flex flex-col items-center gap-2 w-20'>
            <div className={`p-3 rounded-md border ${tech.color}`}>{tech.icon}</div>
            <span className='text-sm font-medium'>{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
