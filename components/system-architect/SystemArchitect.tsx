'use client';

import { useState } from 'react';
import {
  RotateCcw,
  Terminal,
  Layers,
  Server,
  Database,
  Cloud,
  Activity,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import * as Data from '@/constants/system-architect';
import { TechSelector, BlueprintRow } from './ArchitectUI';

export const SystemArchitect = () => {
  const [state, setState] = useState<Record<string, string>>({});

  const pick = (k: string) => (v: string) => setState(prev => ({ ...prev, [k]: v }));
  const resolve = (v: string, list: Data.TechOption[]) =>
    list.find(i => i.value === v)?.label ?? '';

  const totalSteps = 8;
  const completedSteps = Object.values(state).filter(v => v !== '').length;
  const progressPercent = (completedSteps / totalSteps) * 100;

  return (
    <>
      {/* Header */}
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-8 border-b dark:border-slate-800 pb-6'>
        <div className='space-y-1'>
          <h1 className='text-3xl lg:text-4xl font-bold tracking-tight dark:text-slate-50'>
            System Architect
          </h1>
          <p className='text-sm font-medium text-muted-foreground dark:text-slate-400'>
            Stack configuration and infrastructure mapping.
          </p>
        </div>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setState({})}
          className='mt-4 md:mt-0 font-semibold text-muted-foreground hover:text-destructive dark:border-slate-800 dark:hover:bg-destructive/10 transition-colors'
        >
          <RotateCcw className='mr-2 h-4 w-4' />
          Flush manifest
        </Button>
      </div>

      {/* Main grid */}
      <div className='grid gap-8 lg:grid-cols-12 items-start'>
        {/* Selectors (2-column internal grid) */}
        <div className='lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8'>
          <TechSelector
            label='Client Framework'
            placeholder='Core application'
            options={Data.clientFrameworks}
            value={state.framework ?? ''}
            onChange={pick('framework')}
          />
          <TechSelector
            label='Client Runtime'
            placeholder='UI ecosystem'
            options={Data.clientRuntime}
            value={state.frontend ?? ''}
            onChange={pick('frontend')}
          />
          <TechSelector
            label='Server Runtime'
            placeholder='API environment'
            options={Data.serverRuntime}
            value={state.backend ?? ''}
            onChange={pick('backend')}
          />
          <TechSelector
            label='Persistence Layer'
            placeholder='Storage engine'
            options={Data.persistenceLayer}
            value={state.database ?? ''}
            onChange={pick('database')}
          />
          <TechSelector
            label='Data Access'
            placeholder='ORM / ODM'
            options={Data.dataAccess}
            value={state.orm ?? ''}
            onChange={pick('orm')}
          />
          <TechSelector
            label='Security Layer'
            placeholder='Auth & Protection'
            options={Data.securityLayer}
            value={state.auth ?? ''}
            onChange={pick('auth')}
          />
          <TechSelector
            label='Quality Assurance'
            placeholder='Testing suite'
            options={Data.qualityAssurance}
            value={state.testing ?? ''}
            onChange={pick('testing')}
          />
          <TechSelector
            label='Cloud Infrastructure'
            placeholder='Deployment target'
            options={Data.cloudInfrastructure}
            value={state.infra ?? ''}
            onChange={pick('infra')}
          />
        </div>

        {/* Blueprint manifest */}
        <div className='lg:col-span-4 lg:sticky lg:top-8'>
          <Card className='rounded-xl border border-border dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 shadow-sm overflow-hidden py-0'>
            <CardHeader className='bg-background dark:bg-slate-900/60 p-5 border-b dark:border-slate-800 space-y-0 py-5'>
              <div className='flex justify-between items-end mb-4'>
                <div className='space-y-1'>
                  <span className='text-xs font-black uppercase text-primary dark:text-blue-400 tracking-wider'>
                    Build Readiness
                  </span>
                  <CardTitle className='text-2xl font-bold text-foreground dark:text-slate-100'>
                    {completedSteps}{' '}
                    <span className='text-muted-foreground/30 dark:text-slate-600'>
                      / {totalSteps}
                    </span>
                  </CardTitle>
                </div>
                <span className='text-xs font-mono font-bold text-muted-foreground dark:text-slate-500'>
                  {Math.round(progressPercent)}%
                </span>
              </div>
              <Progress value={progressPercent} className='h-1.5 dark:bg-slate-800' />
            </CardHeader>

            <CardContent className='p-6 space-y-6'>
              <div className='grid grid-cols-2 gap-x-6 gap-y-8'>
                {/* Application section */}
                <div className='space-y-4'>
                  <div className='flex items-center gap-2 text-muted-foreground dark:text-slate-500 border-b dark:border-slate-800/60 pb-2'>
                    <Layers className='h-3.5 w-3.5' />
                    <span className='text-xs font-bold uppercase tracking-tight'>
                      Application
                    </span>
                  </div>
                  <BlueprintRow
                    label='Framework'
                    value={resolve(state.framework, Data.clientFrameworks)}
                    isSet={!!state.framework}
                  />
                  <BlueprintRow
                    label='Runtime'
                    value={resolve(state.frontend, Data.clientRuntime)}
                    isSet={!!state.frontend}
                  />
                </div>

                {/* Server section */}
                <div className='space-y-4'>
                  <div className='flex items-center gap-2 text-muted-foreground dark:text-slate-500 border-b dark:border-slate-800/60 pb-2'>
                    <Server className='h-3.5 w-3.5' />
                    <span className='text-xs font-bold uppercase tracking-tight'>
                      Server-side
                    </span>
                  </div>
                  <BlueprintRow
                    label='Runtime'
                    value={resolve(state.backend, Data.serverRuntime)}
                    isSet={!!state.backend}
                  />
                  <BlueprintRow
                    label='Security'
                    value={resolve(state.auth, Data.securityLayer)}
                    isSet={!!state.auth}
                  />
                </div>

                {/* Database section */}
                <div className='space-y-4'>
                  <div className='flex items-center gap-2 text-muted-foreground dark:text-slate-500 border-b dark:border-slate-800/60 pb-2'>
                    <Database className='h-3.5 w-3.5' />
                    <span className='text-xs font-bold uppercase tracking-tight'>
                      Persistence
                    </span>
                  </div>
                  <BlueprintRow
                    label='Storage'
                    value={resolve(state.database, Data.persistenceLayer)}
                    isSet={!!state.database}
                  />
                  <BlueprintRow
                    label='Access'
                    value={resolve(state.orm, Data.dataAccess)}
                    isSet={!!state.orm}
                  />
                </div>

                {/* Infrastructure section */}
                <div className='space-y-4'>
                  <div className='flex items-center gap-2 text-muted-foreground dark:text-slate-500 border-b dark:border-slate-800/60 pb-2'>
                    <Cloud className='h-3.5 w-3.5' />
                    <span className='text-xs font-bold uppercase tracking-tight'>
                      Cloud & QA
                    </span>
                  </div>
                  <BlueprintRow
                    label='Cloud'
                    value={resolve(state.infra, Data.cloudInfrastructure)}
                    isSet={!!state.infra}
                  />
                  <BlueprintRow
                    label='Testing'
                    value={resolve(state.testing, Data.qualityAssurance)}
                    isSet={!!state.testing}
                  />
                </div>
              </div>

              {/* Terminal output */}
              <div className='mt-6 p-4 rounded-md bg-slate-900 dark:bg-black font-mono text-xs leading-relaxed relative overflow-hidden group border dark:border-slate-800'>
                <div className='absolute top-0 right-0 p-2 opacity-20'>
                  <Terminal className='h-4 w-4 text-white' />
                </div>
                <p className='text-emerald-400 mb-1'>$ stack-map --analyze --env prod</p>
                <p className='text-slate-300 dark:text-slate-400'>
                  STATUS:{' '}
                  {completedSteps === totalSteps ? (
                    <span className='text-emerald-500 font-bold'>READY_FOR_BUILD</span>
                  ) : (
                    <span className='text-amber-500'>CONFIGURING...</span>
                  )}
                </p>
                <p className='text-slate-300 dark:text-slate-400'>
                  TARGET:{' '}
                  <span className='text-blue-400'>
                    {resolve(state.infra, Data.cloudInfrastructure) || 'NOT_DEFINED'}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live telemetry */}
        <div className='lg:col-span-4'>
          <Card className='rounded-xl border border-slate-800 bg-slate-950 p-6 text-slate-50 shadow-none'>
            <div className='flex items-center justify-between mb-10'>
              <div className='flex items-center gap-2'>
                <Activity className='h-4 w-4 text-emerald-500 animate-pulse' />
                <span className='text-xs font-black uppercase tracking-widest text-emerald-500'>
                  Live Telemetry
                </span>
              </div>
              <div className='h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' />
            </div>

            <CardContent className='p-0 space-y-12'>
              {/* Security progress */}
              <div className='space-y-4'>
                <div className='flex justify-between items-center text-xs'>
                  <span
                    className={cn(
                      'flex items-center gap-2 font-bold uppercase tracking-tight',
                      state.auth ? 'text-emerald-500' : 'text-slate-600'
                    )}
                  >
                    <ShieldCheck
                      className={cn(
                        'h-4 w-4',
                        state.auth ? 'text-emerald-500' : 'text-slate-600'
                      )}
                    />
                    Security Integrity
                  </span>
                  <span
                    className={cn(
                      'font-mono font-bold',
                      state.auth ? 'text-emerald-500' : 'text-slate-600'
                    )}
                  >
                    {state.auth ? '98.2%' : '0.0%'}
                  </span>
                </div>
                <Progress
                  value={state.auth ? 98 : 0}
                  className='h-1 bg-slate-900 [&>div]:bg-emerald-500 transition-all duration-500'
                />
              </div>

              {/* Latency progress */}
              <div className='space-y-4'>
                <div className='flex justify-between items-center text-xs'>
                  <span
                    className={cn(
                      'flex items-center gap-2 font-bold uppercase tracking-tight',
                      state.infra ? 'text-blue-500' : 'text-slate-600'
                    )}
                  >
                    <Globe
                      className={cn(
                        'h-4 w-4',
                        state.infra ? 'text-blue-500' : 'text-slate-600'
                      )}
                    />
                    Edge Latency
                  </span>
                  <span
                    className={cn(
                      'font-mono font-bold',
                      state.infra ? 'text-blue-500' : 'text-slate-600'
                    )}
                  >
                    {state.infra ? '24ms' : '--'}
                  </span>
                </div>
                <Progress
                  value={state.infra ? 85 : 0}
                  className='h-1 bg-slate-900 [&>div]:bg-blue-500 transition-all duration-500'
                />
              </div>

              {/* System stats */}
              <div className='pt-8 border-t border-slate-800 grid grid-cols-2 gap-8 text-center'>
                <div className='space-y-1.5'>
                  <p className='text-xs font-bold uppercase text-slate-600 tracking-widest'>
                    Complexity
                  </p>
                  <p className='text-sm font-medium text-slate-300'>
                    {completedSteps > 5 ? 'High / Optimized' : 'Standard'}
                  </p>
                </div>
                <div className='space-y-1.5'>
                  <p className='text-xs font-bold uppercase text-slate-600 tracking-widest'>
                    Build Version
                  </p>
                  <p className='text-sm font-medium text-slate-300'>v22.0.4-LTS</p>
                </div>
              </div>

              <Button
                disabled={completedSteps < totalSteps}
                className={cn(
                  'w-full h-12 uppercase text-xs font-black tracking-widest transition-all duration-300 shadow-lg',
                  completedSteps === totalSteps
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20'
                    : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed shadow-none'
                )}
              >
                {completedSteps === totalSteps ? 'Provision System' : 'Awaiting Manifest'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
