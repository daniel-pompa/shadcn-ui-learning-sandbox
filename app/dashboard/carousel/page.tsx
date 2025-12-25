'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';

export default function CarouselDemo() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className='space-y-12'>
      {/* Header */}
      <div className='space-y-2'>
        <h1 className='text-3xl lg:text-4xl font-bold tracking-tight'>
          Carousel variants
        </h1>
        <p className='text-muted-foreground'>
          Explore different configurations: api control, custom sizes, and vertical
          orientation.
        </p>
      </div>

      <Separator />

      {/* Grid container for all carousels */}
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 lg:gap-8 items-start justify-items-center'>
        {/* API and state control example */}
        <div className='flex flex-col items-center space-y-4 w-full max-w-xs'>
          <h3 className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
            Status control
          </h3>
          <div className='px-12 w-full'>
            {' '}
            {/* Container to give space to arrows */}
            <Carousel
              setApi={setApi}
              autoplay={3000}
              opts={{ loop: true }}
              className='w-full'
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <Card>
                      <CardContent className='flex aspect-square items-center justify-center p-6'>
                        <span className='text-4xl font-semibold'>{index + 1}</span>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='-left-10 md:-left-12' />
              <CarouselNext className='-right-10 md:-right-12' />
            </Carousel>
          </div>
          <div className='text-muted-foreground text-sm font-medium'>
            Slide {current} of {count}
          </div>
        </div>

        {/* Vertical orientation example */}
        <div className='flex flex-col items-center space-y-4 w-full max-w-xs'>
          <h3 className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
            Vertical orientation
          </h3>
          <div className='py-12 w-full flex justify-center'>
            {' '}
            {/* Padding vertical for arrows */}
            <Carousel
              opts={{ align: 'start' }}
              orientation='vertical'
              className='w-full max-w-xs'
            >
              <CarouselContent className='-mt-1 h-50'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className='pt-1 md:basis-1/2'>
                    <div className='p-1'>
                      <Card>
                        <CardContent className='flex items-center justify-center p-6'>
                          <span className='text-3xl font-semibold'>{index + 1}</span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='-top-10' />
              <CarouselNext className='-bottom-10' />
            </Carousel>
          </div>
        </div>

        {/* Custom size example */}
        <div className='flex flex-col items-center space-y-4 w-full max-w-xs md:max-w-sm'>
          <h3 className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
            Responsive sizing
          </h3>
          <div className='px-12 w-full'>
            <Carousel opts={{ align: 'start' }} className='w-full'>
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className='basis-full md:basis-1/2 lg:basis-1/3'
                  >
                    <div className='p-1'>
                      <Card>
                        <CardContent className='flex aspect-square items-center justify-center p-6'>
                          <span className='text-3xl font-semibold'>{index + 1}</span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='-left-10 md:-left-12' />
              <CarouselNext className='-right-10 md:-right-12' />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
