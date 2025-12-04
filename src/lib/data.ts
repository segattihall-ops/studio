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

export const usersData = [
  { id: 'usr001', name: 'Alice Johnson', email: 'alice.j@example.com', role: 'Editor', subscription: 'Premium', lastActive: '2h ago', avatar: 'https://picsum.photos/seed/user1/40/40', imageHint: 'woman face' },
  { id: 'usr002', name: 'Bob Williams', email: 'bob.w@example.com', role: 'Author', subscription: 'Basic', lastActive: '1d ago', avatar: 'https://picsum.photos/seed/user2/40/40', imageHint: 'man face' },
  { id: 'usr003', name: 'Charlie Brown', email: 'charlie.b@example.com', role: 'Reader', subscription: 'Free', lastActive: '5d ago', avatar: 'https://picsum.photos/seed/user3/40/40', imageHint: 'person glasses' },
  { id: 'usr004', name: 'Diana Prince', email: 'diana.p@example.com', role: 'Admin', subscription: 'Premium', lastActive: '15m ago', avatar: 'https://picsum.photos/seed/user4/40/40', imageHint: 'woman hair' },
  { id: 'usr005', name: 'Ethan Hunt', email: 'ethan.h@example.com', role: 'Author', subscription: 'Basic', lastActive: '3w ago', avatar: 'https://picsum.photos/seed/user5/40/40', imageHint: 'man serious' },
];

export const articlesData = [
  { id: 'art001', title: 'The Future of AI in Web Development', author: 'Bob Williams', date: '2024-07-20', status: 'Published' },
  { id: 'art002', title: 'A Guide to Modern CSS Techniques', author: 'Ethan Hunt', date: '2024-07-18', status: 'Draft' },
  { id: 'art003', title: 'Understanding Serverless Architectures', author: 'Bob Williams', date: '2024-07-15', status: 'Published' },
  { id: 'art004', title: 'Getting Started with Next.js 14', author: 'Alice Johnson', date: '2024-07-12', status: 'Review' },
];

export const subscriptionsData = [
    { id: 'sub001', user: 'Alice Johnson', plan: 'Premium', status: 'Active', startDate: '2024-01-01', endDate: '2025-01-01', amount: '$15.00/mo' },
    { id: 'sub002', user: 'Bob Williams', plan: 'Basic', status: 'Active', startDate: '2024-03-15', endDate: '2025-03-15', amount: '$5.00/mo' },
    { id: 'sub003', user: 'Diana Prince', plan: 'Premium', status: 'Active', startDate: '2023-12-20', endDate: '2024-12-20', amount: '$15.00/mo' },
    { id: 'sub004', user: 'Frank Castle', plan: 'Basic', status: 'Canceled', startDate: '2024-02-10', endDate: '2024-03-10', amount: '$5.00/mo' },
];
