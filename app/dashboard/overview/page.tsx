'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rocket, Mail, Settings, HelpCircle } from 'lucide-react';

import { TabComponents } from '@/components/overview/TabComponents';
import { TabForms } from '@/components/overview/TabForms';
import { TabActions } from '@/components/overview/TabActions';
import { TabSupport } from '@/components/overview/TabSupport';
import { Stats } from '@/components/overview/Stats';
import { Header } from '@/components/overview/Header';

export default function OverviewPage() {
  const [selectedTab, setSelectedTab] = useState('components');
  const [notifications, setNotifications] = useState(true);
  const [progress, setProgress] = useState(33);

  return (
    <div className='space-y-10'>
      <Header />
      <Stats />

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className='space-y-8'>
        <div className='flex items-center justify-between'>
          <TabsList className='grid grid-cols-2 h-auto w-full gap-2 bg-muted/50 p-1 md:flex md:w-auto md:grid-cols-none'>
            <TabsTrigger
              value='components'
              className='gap-2 px-3 py-2 md:px-6 cursor-pointer'
            >
              <Rocket className='h-4 w-4 shrink-0' />
              <span className='truncate'>Components</span>
            </TabsTrigger>
            <TabsTrigger value='forms' className='gap-2 px-3 py-2 md:px-6 cursor-pointer'>
              <Mail className='h-4 w-4 shrink-0' />
              <span className='truncate'>Forms</span>
            </TabsTrigger>
            <TabsTrigger
              value='actions'
              className='gap-2 px-3 py-2 md:px-6 cursor-pointer'
            >
              <Settings className='h-4 w-4 shrink-0' />
              <span className='truncate'>Actions</span>
            </TabsTrigger>
            <TabsTrigger value='help' className='gap-2 px-3 py-2 md:px-6 cursor-pointer'>
              <HelpCircle className='h-4 w-4 shrink-0' />
              <span className='truncate'>Support</span>
            </TabsTrigger>
          </TabsList>
        </div>
        {/* Content rendering */}
        <TabComponents />
        <TabForms
          notifications={notifications}
          setNotifications={setNotifications}
          progress={progress}
          setProgress={setProgress}
        />
        <TabActions />
        <TabSupport />
      </Tabs>
    </div>
  );
}
