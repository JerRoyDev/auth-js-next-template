import { Card, CardContent } from '@/components/ui/card';

export const Home = () => {
  return (
    <main className='min-h-screen bg-background text-foreground flex items-center justify-center py-8 px-2'>
      <Card className='w-full max-w-2xl mx-auto shadow-xl rounded-2xl border border-border'>
        <CardContent className='p-6 md:p-10 text-center'>
          <h1 className='text-3xl md:text-5xl font-bold text-foreground mb-4'>
            Better-Auth Next.js Template
          </h1>
          <p className='text-base md:text-xl text-muted-foreground mb-6 max-w-xl mx-auto'>
            A modern authentication starter built with Next.js and Better-Auth.
            Supports credentials, OAuth, and flexible session management.
          </p>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-3 mb-6'>
            <div className='p-4 bg-accent rounded-lg border border-border flex flex-col items-center'>
              <div className='w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mb-3'>
                {/* Icon */}
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
                    d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                  />
                </svg>
              </div>
              <h3 className='text-base font-semibold text-foreground mb-1'>
                Powered by Better-Auth
              </h3>
              <p className='text-muted-foreground text-xs'>
                Secure and flexible authentication with modern methods
              </p>
            </div>

            <div className='p-4 bg-accent rounded-lg border border-border flex flex-col items-center'>
              <div className='w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mb-3'>
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
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <h3 className='text-base font-semibold text-foreground mb-1'>
                Next.js & PWA-ready
              </h3>
              <p className='text-muted-foreground text-xs'>
                Mobile-first, fast, and ready for Progressive Web App
              </p>
            </div>

            <div className='p-4 bg-accent rounded-lg border border-border flex flex-col items-center'>
              <div className='w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mb-3'>
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
                    d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                  />
                </svg>
              </div>
              <h3 className='text-base font-semibold text-foreground mb-1'>
                Credentials & OAuth support
              </h3>
              <p className='text-muted-foreground text-xs'>
                User-friendly login with multiple methods and session management
              </p>
            </div>
          </div>

          <div className='text-xs text-muted-foreground'>
            Built with ❤️ for modern web applications
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
