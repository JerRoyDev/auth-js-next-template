import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { AUTH_ROUTES } from '@/lib/auth/constants/auth.constants';
import Image from 'next/image';

const Home = () => {
  return (
    <div className='w-full space-y-16 lg:space-y-24'>
      {/* Hero Section */}
      <section className=' lg:py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
          {/* Text Content */}
          <div className='space-y-6 text-center lg:text-left'>
            <Badge variant='secondary' className='mb-4'>
              Production-Ready Starter Template
            </Badge>
            <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight'>
              Build Fast.
              <span className='bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
                {' '}
                Ship Faster.
              </span>
            </h1>
            <p className='text-lg md:text-xl text-muted-foreground leading-relaxed'>
              A modern Next.js starter template with authentication,
              type-safety, and best practices built-in. Start your next project
              in minutes, not days.
            </p>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-4'>
              <Button
                asChild
                size='lg'
                className='text-base px-8 bg-primary hover:bg-primary/80'
              >
                <Link href={AUTH_ROUTES.REGISTER}>Get Started Free</Link>
              </Button>
              <Button
                asChild
                size='lg'
                variant='outline'
                className='text-base px-8 bg-secondary hover:bg-secondary/80'
              >
                <Link
                  href='https://github.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className='relative w-full aspect-[4/3] max-w-lg mx-auto lg:max-w-full'>
            <div className='absolute inset-0'>
              <Image
                src='/HeroPic.png'
                alt='Hero Image'
                fill
                className='object-contain'
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className='space-y-8'>
        <div className='text-center space-y-4'>
          <h2 className='text-3xl md:text-4xl font-bold'>
            Built With Modern Tech
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Leveraging industry-leading tools and frameworks
          </p>
        </div>

        {/* Tech badges grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
          {[
            'Next.js 15',
            'Better Auth',
            'Tailwind CSS',
            'Shadcn/ui',
            'TypeScript',
            'Prisma ORM',
            'React 19',
            'PWA Ready',
          ].map((tech) => (
            <Card
              key={tech}
              className='p-4 text-center hover:shadow-lg transition-shadow'
            >
              <p className='font-semibold text-sm'>{tech}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section className='space-y-8'>
        <div className='text-center space-y-4'>
          <h2 className='text-3xl md:text-4xl font-bold'>
            Everything You Need
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Built-in features and best practices for modern web development
          </p>
        </div>

        {/* Feature cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Authentication */}
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4'>
                <svg
                  className='w-6 h-6 text-primary'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold mb-2'>Secure Authentication</h3>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Better-Auth integration with credentials and OAuth support.
                Session management, email verification, and role-based access
                built-in.
              </p>
            </CardContent>
          </Card>

          {/* Type Safety */}
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4'>
                <svg
                  className='w-6 h-6 text-blue-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold mb-2'>Type-Safe & Modern</h3>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Full TypeScript support with global types and interfaces. Arrow
                functions, English comments, and clean code standards enforced.
              </p>
            </CardContent>
          </Card>

          {/* Mobile First */}
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4'>
                <svg
                  className='w-6 h-6 text-green-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold mb-2'>Mobile-First & PWA</h3>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Responsive design with mobile-first approach. PWA-ready with
                offline support and app-like experience on all devices.
              </p>
            </CardContent>
          </Card>

          {/* Developer Experience */}
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4'>
                <svg
                  className='w-6 h-6 text-purple-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold mb-2'>Developer Experience</h3>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Tailwind CSS with global style variables, Shadcn/ui components,
                and organized project structure for maximum productivity.
              </p>
            </CardContent>
          </Card>

          {/* Custom Constants */}
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4'>
                <svg
                  className='w-6 h-6 text-orange-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold mb-2'>Best Practices</h3>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Custom constants for messages and routes, consistent naming
                conventions, and scalable architecture patterns out of the box.
              </p>
            </CardContent>
          </Card>

          {/* Production Ready */}
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4'>
                <svg
                  className='w-6 h-6 text-red-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold mb-2'>Production Ready</h3>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Optimized build configuration, error handling, loading states,
                and deployment-ready setup for immediate production use.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-12 lg:py-16'>
        <Card className='bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20'>
          <CardContent className='p-8 lg:p-12'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
              <div>
                <p className='text-4xl lg:text-5xl font-bold mb-2'>10+</p>
                <p className='text-muted-foreground'>Hours Saved</p>
              </div>
              <div>
                <p className='text-4xl lg:text-5xl font-bold mb-2'>100%</p>
                <p className='text-muted-foreground'>Type-Safe</p>
              </div>
              <div>
                <p className='text-4xl lg:text-5xl font-bold mb-2'>0</p>
                <p className='text-muted-foreground'>Config Hassle</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className='text-center space-y-6 py-12 lg:py-16'>
        <h2 className='text-3xl md:text-5xl font-bold'>
          Ready to Build Something Amazing?
        </h2>
        <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto'>
          Get started in minutes with our production-ready template
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-4'>
          <Button asChild size='lg' className='text-base px-8'>
            <Link href={AUTH_ROUTES.REGISTER}>Start Building Now</Link>
          </Button>
          <Button
            asChild
            size='lg'
            variant='outline'
            className='text-base px-8'
          >
            <Link href={AUTH_ROUTES.LOGIN}>Sign In</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
