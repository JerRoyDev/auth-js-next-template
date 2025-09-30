export default function Home() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200'>
            <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
              Auth.js Next Template
            </h1>
            <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
              En komplett autentiseringslösning med Next.js, Auth.js v5, Prisma
              och stöd för både credentials och OAuth providers.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
              <div className='p-6 bg-blue-50 rounded-lg border border-blue-100'>
                <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-6 h-6 text-blue-600'
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
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  Säker autentisering
                </h3>
                <p className='text-gray-600 text-sm'>
                  Byggd med Auth.js v5 och moderna säkerhetsstandarder
                </p>
              </div>

              <div className='p-6 bg-green-50 rounded-lg border border-green-100'>
                <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-6 h-6 text-green-600'
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
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  Snabb utveckling
                </h3>
                <p className='text-gray-600 text-sm'>
                  Redo att använda med TypeScript, Tailwind CSS och Prisma
                </p>
              </div>

              <div className='p-6 bg-purple-50 rounded-lg border border-purple-100'>
                <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-6 h-6 text-purple-600'
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
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  Flexibel lösning
                </h3>
                <p className='text-gray-600 text-sm'>
                  Stöder både databassessioner och JWT med credentials + OAuth
                </p>
              </div>
            </div>

            <div className='text-sm text-gray-500'>
              Utvecklad med ❤️ för moderna webbapplikationer
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
