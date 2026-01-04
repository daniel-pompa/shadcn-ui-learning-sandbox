import { FaReact } from 'react-icons/fa';
import { SiNextdotjs, SiRadixui, SiTypescript } from 'react-icons/si';
import { RiTailwindCssFill } from 'react-icons/ri';

const techStack = [
  {
    name: 'Next.js',
    icon: <SiNextdotjs className='h-7 w-7' />,
    color: 'hover:text-black',
  },
  { name: 'React', icon: <FaReact className='h-7 w-7' />, color: 'hover:text-blue-500' },
  {
    name: 'TypeScript',
    icon: <SiTypescript className='h-7 w-7' />,
    color: 'hover:text-blue-600',
  },
  {
    name: 'Tailwind',
    icon: <RiTailwindCssFill className='h-7 w-7' />,
    color: 'hover:text-cyan-500',
  },
  {
    name: 'Radix UI',
    icon: <SiRadixui className='h-7 w-7' />,
    color: 'hover:text-slate-900',
  },
];

export const TechStackSection = () => {
  return (
    <section className='mt-12 py-12 border-y border-muted bg-muted/5'>
      <div className='flex flex-col lg:flex-row items-center-safe gap-10'>
        <h2 className='font-bold tracking-widest text-muted-foreground/60 text-center'>
          Engineered with the modern web stack
        </h2>
        <div className='flex flex-wrap justify-center gap-8 md:gap-14'>
          {techStack.map((tech, index) => (
            <div
              key={index}
              className='flex items-center gap-3 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all cursor-default group'
            >
              <div className={`${tech.color} transition-transform group-hover:scale-110`}>
                {tech.icon}
              </div>
              <span className='font-bold tracking-tight'>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
