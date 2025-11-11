import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

export const StatsCard = ({
  title,
  value,
  change,
  icon: Icon,
}: {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
}) => {
  const isPositive = change >= 0;
  return (
    <Card className='bg-accent'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <Icon className='h-4 w-4 text-muted-foreground' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        <p className='text-xs text-muted-foreground flex items-center'>
          <span
            className={`mr-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}
          >
            {isPositive ? (
              <ArrowUpRight className='h-4 w-4' />
            ) : (
              <ArrowDownRight className='h-4 w-4' />
            )}
          </span>
          {isPositive ? '+' : ''}
          {change}% from last month
        </p>
      </CardContent>
    </Card>
  );
};
