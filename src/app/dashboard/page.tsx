import { auth } from '@/lib/auth/config/auth.config';
const DashboardPage = async () => {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <span className='text-gray-500 text-lg'>Loading...</span>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center py-12'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-2 text-gray-800'>
          Welcome, {session.user.name || session.user.email}!
        </h1>
        <p className='text-gray-600 mb-6'>Email: {session.user.email}</p>
        <div>
          <h2 className='text-xl font-semibold mb-4 text-gray-700'>
            Your Dashboard
          </h2>
          <ul className='space-y-2'>
            <li className='bg-gray-100 rounded px-4 py-2'>Profile Settings</li>
            <li className='bg-gray-100 rounded px-4 py-2'>Recent Activity</li>
            <li className='bg-gray-100 rounded px-4 py-2'>Notifications</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
