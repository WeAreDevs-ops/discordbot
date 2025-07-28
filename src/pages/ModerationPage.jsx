import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Ban, MicOff, Trash2, UserX, Megaphone, UserCheck } from 'lucide-react';

const commands = [
  { id: 'ban', title: 'Ban User', description: 'Permanently remove a user.', icon: Ban, variant: 'destructive' },
  { id: 'kick', title: 'Kick User', description: 'Remove a user from the server.', icon: UserX, variant: 'destructive' },
  { id: 'mute', title: 'Mute User', description: 'Prevent a user from speaking.', icon: MicOff, variant: 'secondary' },
  { id: 'unmute', title: 'Unmute User', description: 'Allow a user to speak again.', icon: UserCheck, variant: 'secondary' },
  { id: 'purge', title: 'Purge Messages', description: 'Delete a number of messages.', icon: Trash2, variant: 'destructive' },
  { id: 'announce', title: 'Announce', description: 'Send a server-wide message.', icon: Megaphone, variant: 'default' },
];

const ModerationPage = () => {
  const { toast } = useToast();

  const handleCommand = (commandTitle) => {
    toast({
      title: `Executing /${commandTitle.toLowerCase()}`,
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
    },
  };

  return (
    <>
      <Helmet>
        <title>Moderation - Discord Bot Dashboard</title>
        <meta name="description" content="Manage server moderation commands." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold">Moderation Commands</h1>
          <p className="text-muted-foreground">Execute moderation actions directly from the dashboard.</p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {commands.map((command) => (
            <motion.div key={command.id} variants={itemVariants}>
              <Card className="bg-card/70 backdrop-blur-sm h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <command.icon className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>{command.title}</CardTitle>
                      <CardDescription>{command.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex items-end">
                  <Button
                    variant={command.variant}
                    className="w-full"
                    onClick={() => handleCommand(command.title)}
                  >
                    Execute
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

export default ModerationPage;