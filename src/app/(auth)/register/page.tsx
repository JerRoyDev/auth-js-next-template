import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className='max-w-sm mx-auto mt-16 p-6 border rounded-lg shadow'>
      <h1 className='text-2xl font-bold mb-4'>Registrera dig</h1>
      <RegisterForm />
    </div>
  );
}
