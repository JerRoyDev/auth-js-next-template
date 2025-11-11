import PageWrapper from '@/components/PageWrapper';
import { Card, CardContent } from '@/components/ui/card';
import { StatsCard } from '@/components/admin/StatsCard';
import { Users, DollarSign, CreditCard, Activity } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <PageWrapper>
      <Card className='w-full max-w-2xl mx-auto shadow-xl rounded-2xl border border-border'>
        <CardContent className='md:p-10 text-center'>
          <h1 className='text-3xl md:text-5xl font-bold text-foreground mb-4'>
            Admin Dashboard
          </h1>
          <p className='text-base md:text-xl text-muted-foreground mb-6 max-w-xl mx-auto'>
            Quick overview of your app’s key metrics.
          </p>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 mb-6'>
            <StatsCard
              title='Total Users'
              value='1,234'
              change={12.5}
              icon={Users}
            />
            <StatsCard
              title='Revenue (Month)'
              value='$45,231.89'
              change={8.1}
              icon={DollarSign}
            />
            <StatsCard
              title='New Signups (Week)'
              value='+250'
              change={5.2}
              icon={CreditCard}
            />
            <StatsCard
              title='Active Sessions'
              value='573'
              change={-1.2}
              icon={Activity}
            />
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
