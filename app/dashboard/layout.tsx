'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Menu,
  X,
  CirclePower,
  ListChevronsUpDown,
  Settings,
  BadgeInfo,
  MessageSquare,
  TriangleAlert,
  MessageSquareWarning,
  CalendarDays,
  PanelTop,
  GalleryVertical,
  SquareCheck,
  Command,
  Settings2,
  TextAlignJustify,
  RectangleEllipsis,
  Loader,
  PanelRightClose,
  Ghost,
  SlidersHorizontal,
  BellRing,
  Layers,
  Table2,
  Form,
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaGithub, FaDribbble } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiShadcnui } from 'react-icons/si';
import { DynamicBreadcrumb } from '@/components/breadcrumb/DynamicBreadcrumb';
import { ModeToggle } from '@/components/theme/ModeToggle';

// Navigation links definition
const links = [
  { name: 'accordion', href: 'accordion', icon: ListChevronsUpDown },
  { name: 'alert', href: 'alert', icon: TriangleAlert },
  { name: 'button', href: 'button', icon: CirclePower },
  { name: 'alert dialog', href: 'alert-dialog', icon: MessageSquareWarning },
  { name: 'dialog', href: 'dialog', icon: MessageSquare },
  { name: 'badge', href: 'badge', icon: BadgeInfo },
  { name: 'calendar', href: 'calendar', icon: CalendarDays },
  { name: 'card', href: 'card', icon: PanelTop },
  { name: 'carousel', href: 'carousel', icon: GalleryVertical },
  { name: 'checkbox', href: 'checkbox', icon: SquareCheck },
  { name: 'command', href: 'command', icon: Command },
  { name: 'combobox', href: 'combobox', icon: Settings2 },
  { name: 'context menu', href: 'context-menu', icon: TextAlignJustify },
  { name: 'menu bar', href: 'menu-bar', icon: Menu },
  { name: 'input OTP', href: 'input-otp', icon: RectangleEllipsis },
  { name: 'progress', href: 'progress', icon: Loader },
  { name: 'sheet', href: 'sheet', icon: PanelRightClose },
  { name: 'skeleton', href: 'skeleton', icon: Ghost },
  { name: 'slider', href: 'slider', icon: SlidersHorizontal },
  { name: 'sonner', href: 'sonner', icon: BellRing },
  { name: 'tabs', href: 'tabs', icon: Layers },
  { name: 'data table', href: 'data-table', icon: Table2 },
  { name: 'form', href: 'form', icon: Form },
].sort((a, b) => a.name.localeCompare(b.name));

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarBackdropVisible, setSidebarBackdropVisible] = useState(false);

  const pathname = usePathname();

  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    setSidebarBackdropVisible(newState);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setSidebarBackdropVisible(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className='bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800 fixed z-30 w-full'>
        <div className='px-3 py-3 lg:px-5 lg:pl-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start'>
              <button
                onClick={toggleSidebar}
                className='lg:hidden mr-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 rounded'
              >
                {sidebarOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
              </button>
              <Link
                href='/'
                className='text-xl font-bold flex items-center lg:ml-2.5 dark:text-white'
              >
                <SiShadcnui className='h-6 w-6 text-blue-600 dark:text-blue-400' />
                <span className='self-center whitespace-nowrap ml-2'>
                  Shadcn/ui Dashboard
                </span>
              </Link>
            </div>
            <div className='flex items-center gap-2'>
              <ModeToggle />
              <Avatar className='h-9 w-9 border border-gray-200 dark:border-gray-700'>
                <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                <AvatarFallback className='bg-blue-600 text-white'>DP</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <div className='flex overflow-hidden bg-white dark:bg-gray-950 pt-16 h-screen text-gray-900 dark:text-gray-100'>
        {/* Sidebar */}
        <aside
          id='sidebar'
          className={cn(
            'fixed z-20 h-screen top-0 left-0 pt-16 lg:flex lg:shrink-0 flex-col w-64 transition-transform duration-300 ease-in-out',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          )}
        >
          <div className='relative flex flex-col h-full min-h-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'>
            <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
              <div className='flex-1 px-3'>
                <h3 className='text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2 mt-4 mb-2'>
                  Components
                </h3>
                <ul className='space-y-1'>
                  {links.map(link => {
                    const Icon = link.icon;
                    const fullPath = `/dashboard/${link.href}`;
                    const isActive = pathname === fullPath;

                    return (
                      <li key={link.href}>
                        <Link
                          href={fullPath}
                          onClick={closeSidebar}
                          aria-current={isActive ? 'page' : undefined}
                          className={cn(
                            'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out',
                            isActive
                              ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                          )}
                        >
                          <Icon
                            className={cn(
                              'shrink-0 w-5 h-5 mr-3 transition-colors duration-200',
                              isActive
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                            )}
                            strokeWidth={isActive ? 2.5 : 2}
                          />
                          <span className='truncate capitalize'>{link.name}</span>
                          {isActive && (
                            <span className='ml-auto w-1 h-4 bg-blue-600 dark:bg-blue-400 rounded-full' />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* User profile section */}
            <div className='px-3 py-4 border-t border-gray-200 dark:border-gray-800'>
              <div className='flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg'>
                <Avatar className='h-10 w-10'>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback className='bg-blue-600 text-white'>DP</AvatarFallback>
                </Avatar>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-semibold text-gray-900 dark:text-white truncate'>
                    Daniel Pompa
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400 truncate'>
                    Administrator
                  </p>
                </div>
                <Settings className='w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer' />
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile backdrop */}
        {sidebarBackdropVisible && (
          <div
            className='bg-gray-900/60 backdrop-blur-sm fixed inset-0 z-10 lg:hidden'
            onClick={closeSidebar}
          />
        )}

        {/* Main content */}
        <div
          id='main-content'
          className='h-full w-full bg-gray-50 dark:bg-gray-950 relative overflow-y-auto lg:ml-64 flex-1 flex flex-col'
        >
          <main className='flex-1'>
            <div className='px-4 mt-6'>
              <div className='w-full min-h-[calc(100vh-230px)]'>
                <div className='bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 xl:p-8'>
                  <DynamicBreadcrumb />
                  <div className='mt-6 text-gray-900 dark:text-gray-100'>{children}</div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className='bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center p-4 md:p-6 my-6 mx-4 rounded-xl shadow-sm'>
            <ul className='flex items-center flex-wrap mb-6 md:mb-0 space-x-4 md:space-x-6'>
              {['Terms', 'Privacy', 'Licensing', 'Cookies', 'Contact'].map(item => (
                <li key={item}>
                  <a
                    href='#'
                    className='text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline'
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className='flex space-x-5'>
              {[FaFacebook, FaInstagram, FaXTwitter, FaGithub, FaDribbble].map(
                (Icon, idx) => (
                  <a
                    key={idx}
                    href='#'
                    className='text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
                  >
                    <Icon className='h-5 w-5' />
                  </a>
                )
              )}
            </div>
          </footer>

          <p className='text-center text-xs text-gray-400 dark:text-gray-500 mb-10'>
            &copy; 2019-{new Date().getFullYear()} Themesberg. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
