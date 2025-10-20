const UnauthorizedPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-card p-8 rounded-xl shadow-xl border'>
        <h1 className='text-2xl font-bold text-destructive mb-4'>
          Access Denied
        </h1>
        <p className='text-muted-foreground'>
          You do not have permission to view this page.
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
