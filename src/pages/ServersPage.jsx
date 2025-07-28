import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlusCircle, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const serversWithBot = [
  { id: '1', name: 'Gaming Community', icon: 'https://cdn.discordapp.com/icons/884029242902380574/a_e9b80e3a2b1b1b1b1b1b1b1b1b1b1b1b.png' },
  { id: '2', name: 'Study Group', icon: 'https://cdn.discordapp.com/icons/884029242902380574/a_e9b80e3a2b1b1b1b1b1b1b1b1b1b1b1b.png' },
];

const serversWithoutBot = [
  { id: '3', name: 'Art & Design Hub', icon: null },
  { id: '4', name: 'Music Corner', icon: 'https://cdn.discordapp.com/icons/884029242902380574/a_e9b80e3a2b1b1b1b1b1b1b1b1b1b1b1b.png' },
];

const ServersPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleManageServer = (serverId) => {
    navigate(`/dashboard/servers/${serverId}`);
  };
  
  const handleInviteBot = () => {
    toast({
      title: '🚧 Feature In Progress',
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        <title>Select Server - Discord Bot Dashboard</title>
        <meta name="description" content="Select a server to manage." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Servers</h1>
          <p className="text-muted-foreground">Servers where the bot is already active.</p>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {serversWithBot.map((server) => (
            <motion.div key={server.id} variants={itemVariants}>
              <Card className="bg-card/70 hover:bg-secondary/70 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20 border-transparent hover:border-primary">
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={server.icon || ''} alt={server.name} />
                    <AvatarFallback>{server.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{server.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    onClick={() => handleManageServer(server.id)}
                  >
                    Manage <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="pt-8">
          <h2 className="text-2xl font-bold mb-2">Add to Server</h2>
          <p className="text-muted-foreground">Servers where you can invite the bot.</p>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {serversWithoutBot.map((server) => (
            <motion.div key={server.id} variants={itemVariants}>
              <Card className="bg-card/70 hover:bg-secondary/70 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-green-500/20 border-transparent hover:border-green-500">
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={server.icon || ''} alt={server.name} />
                    <AvatarFallback>{server.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{server.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-discord-green hover:bg-discord-green/90 text-white"
                    onClick={handleInviteBot}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Invite Bot
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default ServersPage;