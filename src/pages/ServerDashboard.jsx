import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquare, ShieldCheck, Bot, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'Mon', messages: 4000, members: 24 },
  { name: 'Tue', messages: 3000, members: 13 },
  { name: 'Wed', messages: 2000, members: 98 },
  { name: 'Thu', messages: 2780, members: 39 },
  { name: 'Fri', messages: 1890, members: 48 },
  { name: 'Sat', messages: 2390, members: 38 },
  { name: 'Sun', messages: 3490, members: 43 },
];

const ServerDashboard = () => {
  const { serverId } = useParams();
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: '🚧 Feature In Progress',
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const stats = [
    { title: 'Total Members', value: '1,234', icon: Users, color: 'text-blue-400' },
    { title: 'Messages Sent (24h)', value: '5,678', icon: MessageSquare, color: 'text-green-400' },
    { title: 'Mods Online', value: '5', icon: ShieldCheck, color: 'text-yellow-400' },
    { title: 'Bot Status', value: 'Online', icon: Bot, color: 'text-discord-green' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - Server {serverId}</title>
        <meta name="description" content={`Dashboard for server ${serverId}`} />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <h1 className="text-3xl font-bold">Server Dashboard</h1>
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-card/70 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div className="grid gap-8 md:grid-cols-5" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className="md:col-span-3" variants={itemVariants}>
            <Card className="bg-card/70 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle>Server Stats</CardTitle>
                <CardDescription>Message and member activity over the last 7 days.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] w-full">
                <ResponsiveContainer>
                  <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                    <Area type="monotone" dataKey="messages" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorMessages)" />
                    <Area type="monotone" dataKey="members" stroke="hsl(var(--secondary))" fillOpacity={1} fill="url(#colorMembers)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div className="md:col-span-2" variants={itemVariants}>
            <Card className="bg-card/70 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle>Welcome & Goodbye</CardTitle>
                <CardDescription>Customize messages for new and leaving members.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="welcome" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="welcome">Welcome</TabsTrigger>
                    <TabsTrigger value="goodbye">Goodbye</TabsTrigger>
                  </TabsList>
                  <TabsContent value="welcome" className="mt-4 space-y-4">
                    <Textarea placeholder="Welcome {user} to {server}! Enjoy your stay." className="bg-input" />
                    <div className="flex items-center space-x-2">
                      <Input type="text" placeholder="#ffffff" className="w-24 bg-input" />
                      <Palette className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Embed Color</span>
                    </div>
                    <Button onClick={showToast} className="w-full">Save Welcome Message</Button>
                  </TabsContent>
                  <TabsContent value="goodbye" className="mt-4 space-y-4">
                    <Textarea placeholder="{user} has left the server." className="bg-input" />
                    <Button onClick={showToast} className="w-full">Save Goodbye Message</Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

      </motion.div>
    </>
  );
};

export default ServerDashboard;