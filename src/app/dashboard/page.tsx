'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import {
  Users,
  CreditCard,
  DollarSign,
  UserPlus,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { FirebaseClientProvider, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit, orderBy, Timestamp } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemo } from 'react';
import { subDays, format } from 'date-fns';

const iconMap = {
  users: Users,
  creditCard: CreditCard,
  dollarSign: DollarSign,
  userPlus: UserPlus,
};

type User = {
  id: string;
  created_at?: Timestamp; // Assuming users might have a creation date
};
type Subscription = {
  id: string;
  status: string;
}
type Article = {
  id: string;
  author_name: string;
  title: string;
  created_at: { toDate: () => Date };
}

const DashboardPageContent = () => {
  const firestore = useFirestore();

  // Queries
  const usersQuery = useMemoFirebase(() => firestore ? collection(firestore, 'users') : null, [firestore]);
  const activeSubsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'subscriptions'), where('status', '==', 'Active')) : null, [firestore]);
  const recentArticlesQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'articles'), orderBy('created_at', 'desc'), limit(4)) : null, [firestore]);
  
  const { data: usersData, isLoading: isLoadingUsers } = useCollection<User>(usersQuery);
  const { data: activeSubsData, isLoading: isLoadingSubs } = useCollection<Subscription>(activeSubsQuery);
  const { data: recentArticles, isLoading: isLoadingArticles } = useCollection<Article>(recentArticlesQuery);

  const userActivityData = useMemo(() => {
    if (!usersData) return [];

    const last7Days = Array.from({ length: 7 }, (_, i) => subDays(new Date(), i)).reverse();
    const dailySignups = last7Days.map(date => {
        const dateString = format(date, 'MMM d');
        const count = usersData.filter(user => {
            if (!user.created_at) return false;
            const userDate = user.created_at.toDate();
            return format(userDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
        }).length;
        return { date: dateString, users: count };
    });

    return dailySignups;
  }, [usersData]);


  const statsCards = [
    { title: 'Total Users', value: usersData?.length.toString() || '0', isLoading: isLoadingUsers, icon: 'users', change: '+0%' },
    { title: 'Active Subscriptions', value: activeSubsData?.length.toString() || '0', isLoading: isLoadingSubs, icon: 'creditCard', change: '+0%' },
    { title: 'Monthly Revenue', value: '$0', isLoading: false, icon: 'dollarSign', change: '+0%' },
    { title: 'New Signups (24h)', value: '0', isLoading: false, icon: 'userPlus', change: '+0%' },
  ];

  const getTimeAgo = (date: Date | undefined) => {
    if(!date) return '';
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card, index) => {
          const Icon = iconMap[card.icon as keyof typeof iconMap];
          const isPositive = card.change.startsWith('+');
          return (
            <Card key={index} className="bg-card hover:bg-card/80 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                <Icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                {card.isLoading ? <Skeleton className="h-7 w-24" /> : <div className="text-2xl font-bold font-headline">{card.value}</div>}
                <p className={`text-xs mt-1 flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                   {/* Static change for now */}
                  {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {card.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">User Activity (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
             {isLoadingUsers ? (
                <div className="h-[300px] flex items-center justify-center">
                    <Skeleton className="w-full h-full" />
                </div>
             ) : userActivityData.length > 0 ? (
                <ChartContainer config={{ users: { label: 'New Users', color: 'hsl(var(--primary))' } }} className="h-[300px] w-full">
                    <BarChart data={userActivityData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} allowDecimals={false}/>
                        <Tooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="users" fill="var(--color-users)" radius={4} />
                    </BarChart>
                </ChartContainer>
             ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    User activity data will appear here.
                </div>
             )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoadingArticles && Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                     <Skeleton className="h-9 w-9 rounded-full" />
                      <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                      </div>
                  </div>
              ))}
              {!isLoadingArticles && recentArticles?.map((activity, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`https://picsum.photos/seed/${activity.id}/40/40`} data-ai-hint="person face" alt={activity.author_name} />
                    <AvatarFallback>{activity.author_name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-sm">
                    <span className="font-medium">{activity.author_name}</span>
                    <span className="text-muted-foreground"> published a new article: "{activity.title}".</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{getTimeAgo(activity.created_at?.toDate())}</div>
                </div>
              ))}
               {!isLoadingArticles && recentArticles?.length === 0 && (
                 <div className="text-center text-muted-foreground py-10">
                    No recent activity.
                 </div>
                )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


const DashboardPage = () => {
    return (
        <FirebaseClientProvider>
            <DashboardPageContent />
        </FirebaseClientProvider>
    );
};

export default DashboardPage;

    