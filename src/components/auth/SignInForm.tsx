import { signInAction } from '@/lib/auth/actions/signin.action';

export const SignInForm = () => {
  return (
    <form action={signInAction} className='space-y-4'>
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
        Sign In
      </button>
    </form>
  );
};
