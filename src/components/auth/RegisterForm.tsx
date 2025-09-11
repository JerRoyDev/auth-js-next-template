import { registerAction } from '@/lib/auth/actions/register.action';

export const RegisterForm = () => {
  return (
    <form action={registerAction} className='space-y-4'>
      <label className='block'>
        Email
        <input
          name='email'
          type='email'
          className='mt-1 block w-full border rounded px-2 py-1'
          required
        />
      </label>
      <label className='block'>
        Password
        <input
          name='password'
          type='password'
          className='mt-1 block w-full border rounded px-2 py-1'
          required
        />
      </label>
      <button
        type='submit'
        className='w-full bg-primary text-white py-2 rounded'
      >
        Register
      </button>
    </form>
  );
};
