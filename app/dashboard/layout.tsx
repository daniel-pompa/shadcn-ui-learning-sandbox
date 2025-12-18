// https://tailwindcomponents.com/component/tailwind-css-admin-dashboard-layout
// https://gist.github.com/Klerith/3949f1c8b884d7101e378dfb668f0f3a

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
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
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaGithub, FaDribbble } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiShadcnui } from 'react-icons/si';

const links = [
  { name: 'accordion', href: 'accordion', icon: ListChevronsUpDown },
  { name: 'alert', href: 'alert', icon: TriangleAlert },
  { name: 'button', href: 'button', icon: CirclePower },
  { name: 'alert dialog', href: 'alert-dialog', icon: MessageSquareWarning },
  { name: 'dialog', href: 'dialog', icon: MessageSquare },
  { name: 'badge', href: 'badge', icon: BadgeInfo },
].sort((a, b) => a.name.localeCompare(b.name));

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarBackdropVisible, setSidebarBackdropVisible] = useState(false);

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
      <nav className='bg-white border-b border-gray-200 fixed z-30 w-full'>
        <div className='px-3 py-3 lg:px-5 lg:pl-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start'>
              <button
                onClick={toggleSidebar}
                aria-expanded={sidebarOpen}
                aria-controls='sidebar'
                aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                className='lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded'
              >
                {sidebarOpen ? (
                  <X className='w-6 h-6' aria-hidden='true' />
                ) : (
                  <Menu className='w-6 h-6' aria-hidden='true' />
                )}
              </button>
              <Link href='/' className='text-xl font-bold flex items-center lg:ml-2.5'>
                <SiShadcnui className='h-6 w-6 text-blue-600' />
                <span className='self-center whitespace-nowrap ml-2'>
                  Shadcn/ui Dashboard
                </span>
              </Link>
            </div>
            <div className='flex items-center'>
              {/* User avatar */}
              <Avatar>
                <AvatarImage
                  src='https://github.com/shadcn.png'
                  alt='@shadcn'
                  className='p-2 rounded-full w-16 h-16 flex items-center justify-center'
                />
                <AvatarFallback className='bg-blue-500 text-white p-2 rounded-full w-12 h-12 flex items-center justify-center'>
                  DP
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <div className='flex overflow-hidden bg-white pt-16 h-screen'>
        {/* Sidebar */}
        <aside
          id='sidebar'
          className={`fixed z-20 h-screen top-0 left-0 pt-16 lg:flex lg:shrink-0 flex-col w-64 transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
          aria-label='Sidebar'
        >
          <div className='relative flex flex-col h-full min-h-0 border-r border-gray-200 bg-white'>
            {/* Sidebar content */}
            <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
              <div className='flex-1 px-3 bg-white'>
                <h3 className='text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 mt-4 mb-2'>
                  Components
                </h3>
                <ul className='space-y-2'>
                  {links.map(link => {
                    const Icon = link.icon;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={closeSidebar}
                          className='text-base capitalize text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group'
                        >
                          <Icon className='w-5 h-5 mr-3 text-gray-500' />
                          <span>{link.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* User information */}
            <div className='px-3 py-4 border-t border-gray-200 bg-white'>
              <div className='flex items-center space-x-3 p-3 bg-gray-50 rounded-lg'>
                <div className='shrink-0'>
                  <Avatar>
                    <AvatarImage
                      src='https://github.com/shadcn.png'
                      alt='@shadcn'
                      className='rounded-full w-10 h-10'
                    />
                    <AvatarFallback className='bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center'>
                      DP
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium text-gray-900 truncate'>
                    Daniel Pompa
                  </p>
                  <p className='text-sm text-gray-500 truncate'>Administrator</p>
                </div>
                <Settings className='w-5 h-5 text-gray-400' />
              </div>
            </div>
          </div>
        </aside>

        {/* Sidebar backdrop */}
        {sidebarBackdropVisible && (
          <div
            className='bg-gray-900 opacity-50 fixed inset-0 z-10 lg:hidden'
            id='sidebarBackdrop'
            onClick={closeSidebar}
            aria-hidden='true'
          />
        )}

        {/* Main content */}
        <div
          id='main-content'
          className='h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64 flex-1'
        >
          <main>
            <div className='pt-6 px-4 mt-4'>
              <div className='w-full min-h-[calc(100vh-230px)]'>
                <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
                  {children}
                </div>
              </div>
            </div>
          </main>
          <footer className='bg-white flex flex-col md:flex-row justify-between items-center shadow rounded-lg p-4 md:p-6 xl:p-8 my-6 mx-4'>
            <ul className='flex items-center flex-wrap mb-6 md:mb-0'>
              <li>
                <a
                  href='#'
                  className='text-sm font-normal text-gray-500 hover:underline mr-4 md:mr-6'
                >
                  Terms and conditions
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-sm font-normal text-gray-500 hover:underline mr-4 md:mr-6'
                >
                  Privacy policy
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-sm font-normal text-gray-500 hover:underline mr-4 md:mr-6'
                >
                  Licensing
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-sm font-normal text-gray-500 hover:underline mr-4 md:mr-6'
                >
                  Cookie policy
                </a>
              </li>
              <li>
                <a href='#' className='text-sm font-normal text-gray-500 hover:underline'>
                  Contact
                </a>
              </li>
            </ul>
            <div className='flex sm:justify-center space-x-6'>
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
          <p className='text-center text-sm text-gray-500 my-10'>
            &copy; 2019-{new Date().getFullYear()}{' '}
            <a href='#' className='hover:underline' target='_blank'>
              Themesberg
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
