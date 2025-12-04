'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { subscriptionsData } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const statusVariantMap: { [key: string]: 'default' | 'destructive' | 'outline' } = {
  'Active': 'default',
  'Canceled': 'destructive',
};

const planVariantMap: { [key: string]: 'default' | 'secondary' } = {
    'Premium': 'default',
    'Basic': 'secondary',
};

const SubscriptionsPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Subscription Management</CardTitle>
        <CardDescription>Oversee all user subscriptions and payment details.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Billing Period</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptionsData.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell className="font-medium">{sub.user}</TableCell>
                <TableCell>
                  <Badge variant={planVariantMap[sub.plan] || 'outline'}>{sub.plan}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariantMap[sub.status] || 'outline'}>
                    {sub.status}
                  </Badge>
                </TableCell>
                <TableCell>{sub.startDate} - {sub.endDate}</TableCell>
                <TableCell>{sub.amount}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Invoice</DropdownMenuItem>
                      <DropdownMenuItem>Update Payment</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive-foreground focus:bg-destructive">Cancel Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SubscriptionsPage;
