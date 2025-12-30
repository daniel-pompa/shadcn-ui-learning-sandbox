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

  // Hook to get the current URL path
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
      <nav className='bg-white border-b border-gray-200 fixed z-30 w-full'>
        <div className='px-3 py-3 lg:px-5 lg:pl-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start'>
              <button
                onClick={toggleSidebar}
                className='lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded'
              >
                {sidebarOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
              </button>
              <Link href='/' className='text-xl font-bold flex items-center lg:ml-2.5'>
                <SiShadcnui className='h-6 w-6 text-blue-600' />
                <span className='self-center whitespace-nowrap ml-2'>
                  Shadcn/ui Dashboard
                </span>
              </Link>
            </div>
            <div className='flex items-center'>
              <Avatar className='h-9 w-9'>
                <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                <AvatarFallback className='bg-blue-500 text-white'>DP</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <div className='flex overflow-hidden bg-white pt-16 h-screen'>
        {/* Sidebar */}
        <aside
          id='sidebar'
          className={cn(
            'fixed z-20 h-screen top-0 left-0 pt-16 lg:flex lg:shrink-0 flex-col w-64 transition-transform duration-300 ease-in-out',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          )}
        >
          <div className='relative flex flex-col h-full min-h-0 border-r border-gray-200 bg-white'>
            <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
              <div className='flex-1 px-3 bg-white'>
                <h3 className='text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 mt-4 mb-2'>
                  Components
                </h3>
                <ul className='space-y-2'>
                  {links.map(link => {
                    const Icon = link.icon;
                    const fullPath = `/dashboard/${link.href}`;
                    // Active state detection logic
                    const isActive = pathname === fullPath;

                    return (
                      <li key={link.href}>
                        <Link
                          href={fullPath}
                          onClick={closeSidebar}
                          aria-current={isActive ? 'page' : undefined}
                          className={cn(
                            // Base styles:
                            'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out',
                            isActive
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                          )}
                        >
                          <Icon
                            className={cn(
                              'shrink-0 w-5 h-5 mr-3 transition-colors duration-200',
                              isActive
                                ? 'text-gray-900'
                                : 'text-gray-400 group-hover:text-gray-600'
                            )}
                            // Lucide stroke width for a cleaner, modern look
                            strokeWidth={isActive ? 2.5 : 2}
                          />
                          <span
                            className={cn(
                              'truncate capitalize',
                              isActive ? 'font-semibold' : 'font-medium'
                            )}
                          >
                            {link.name}
                          </span>

                          {/* Indicator pill */}
                          {isActive && (
                            <span className='ml-auto w-1 h-4 bg-gray-900 rounded-full' />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* User information and settings */}
            <div className='px-3 py-4 border-t border-gray-200 bg-white'>
              <div className='flex items-center space-x-3 p-3 bg-gray-50 rounded-lg'>
                <Avatar className='h-10 w-10'>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback className='bg-blue-500 text-white'>DP</AvatarFallback>
                </Avatar>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium text-gray-900 truncate'>
                    Daniel Pompa
                  </p>
                  <p className='text-sm text-gray-500 truncate font-light'>
                    Administrator
                  </p>
                </div>
                <Settings className='w-4 h-4 text-gray-400' />
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile backdrop */}
        {sidebarBackdropVisible && (
          <div
            className='bg-gray-900/50 fixed inset-0 z-10 lg:hidden'
            onClick={closeSidebar}
          />
        )}

        {/* Main content */}
        <div
          id='main-content'
          className='h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64 flex-1 flex flex-col'
        >
          <main className='flex-1'>
            <div className='px-4 mt-4'>
              <div className='w-full min-h-[calc(100vh-230px)]'>
                {/* Breadcrumb Container */}
                <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
                  <DynamicBreadcrumb />
                  <div className='mt-4'>{children}</div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className='bg-white flex flex-col md:flex-row justify-between items-center shadow rounded-lg p-4 md:p-6 xl:p-8 my-6 mx-4'>
            <ul className='flex items-center flex-wrap mb-6 md:mb-0 space-x-4 md:space-x-6'>
              <li>
                <a href='#' className='text-sm text-gray-500 hover:underline'>
                  Terms
                </a>
              </li>
              <li>
                <a href='#' className='text-sm text-gray-500 hover:underline'>
                  Privacy
                </a>
              </li>
              <li>
                <a href='#' className='text-sm text-gray-500 hover:underline'>
                  Licensing
                </a>
              </li>
              <li>
                <a href='#' className='text-sm text-gray-500 hover:underline'>
                  Cookies
                </a>
              </li>
              <li>
                <a href='#' className='text-sm text-gray-500 hover:underline'>
                  Contact
                </a>
              </li>
            </ul>
            <div className='flex space-x-6'>
              <a href='#' className='text-gray-500 hover:text-gray-900'>
                <FaFacebook className='h-5 w-5' />
              </a>
              <a href='#' className='text-gray-500 hover:text-gray-900'>
                <FaInstagram className='h-5 w-5' />
              </a>
              <a href='#' className='text-gray-500 hover:text-gray-900'>
                <FaXTwitter className='h-5 w-5' />
              </a>
              <a
                href='https://github.com/daniel-pompa/shadcn-ui-learning-sandbox'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-500 hover:text-gray-900'
              >
                <FaGithub className='h-5 w-5' />
              </a>
              <a href='#' className='text-gray-500 hover:text-gray-900'>
                <FaDribbble className='h-5 w-5' />
              </a>
            </div>
          </footer>

          <p className='text-center text-sm text-gray-500 mb-10'>
            &copy; 2019-{new Date().getFullYear()} Themesberg. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
