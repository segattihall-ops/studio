// Mock data for the admin dashboard

export const statsCards = [
  {
    title: 'Total Users',
    value: '10,273',
    change: '+12.5%',
    icon: 'users',
  },
  {
    title: 'Active Subscriptions',
    value: '3,456',
    change: '+8.2%',
    icon: 'creditCard',
  },
  {
    title: 'Monthly Revenue',
    value: '$25,678',
    change: '-1.8%',
    icon: 'dollarSign',
  },
  {
    title: 'New Signups (24h)',
    value: '128',
    change: '+22.1%',
    icon: 'userPlus',
  },
];

export const userActivity = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1500 },
  { month: 'Mar', users: 1400 },
  { month: 'Apr', users: 1800 },
  { month: 'May', users: 2100 },
  { month: 'Jun', users: 2500 },
  { month: 'Jul', users: 2300 },
  { month: 'Aug', users: 2800 },
  { month: 'Sep', users: 3000 },
  { month: 'Oct', users: 2900 },
  { month: 'Nov', users: 3200 },
  { month: 'Dec', users: 3500 },
];

export const recentActivities = [
  {
    user: { name: 'Alice Johnson', avatar: 'https://picsum.photos/seed/user1/40/40' },
    action: 'upgraded to Premium Plan.',
    time: '5m ago',
    imageHint: 'woman face'
  },
  {
    user: { name: 'Bob Williams', avatar: 'https://picsum.photos/seed/user2/40/40' },
    action: 'published a new article.',
    time: '1h ago',
    imageHint: 'man face'
  },
  {
    user: { name: 'Charlie Brown', avatar: 'https://picsum.photos/seed/user3/40/40' },
    action: 'updated their profile.',
    time: '3h ago',
    imageHint: 'person glasses'
  },
  {
    user: { name: 'Diana Prince', avatar: 'https://picsum.photos/seed/user4/40/40' },
    action: 'cancelled their subscription.',
    time: '1d ago',
    imageHint: 'woman hair'
  },
];
