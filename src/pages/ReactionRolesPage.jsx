import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const reactionRoles = [
  { messageId: '1175515743341121536', channel: '#get-roles', role: 'Gamer', emoji: '🎮' },
  { messageId: '1175515743341121536', channel: '#get-roles', role: 'Developer', emoji: '💻' },
  { messageId: '1175515743341121536', channel: '#get-roles', role: 'Artist', emoji: '🎨' },
  { messageId: '1175515898901303357', channel: '#announcements', role: 'Notified', emoji: '🔔' },
];

const ReactionRolesPage = () => {
  const { toast } = useToast();

  const showToast = () => {
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
    },
  };

  return (
    <>
      <Helmet>
        <title>Reaction Roles - Discord Bot Dashboard</title>
        <meta name="description" content="Manage reaction roles for your server." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Reaction Roles</h1>
            <p className="text-muted-foreground">Let users self-assign roles by reacting to messages.</p>
          </div>
          <Button onClick={showToast}>
            <PlusCircle className="mr-2 h-4 w-4" /> New Reaction Role
          </Button>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {reactionRoles.map((rr, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-card/70 backdrop-blur-sm h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">{rr.emoji}</span>
                        <span>{rr.role}</span>
                      </CardTitle>
                      <CardDescription>
                        In {rr.channel} on message {rr.messageId}
                      </CardDescription>
                    </div>
                    <div className="flex">
                      <Button variant="ghost" size="icon" onClick={showToast}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={showToast} className="text-red-500 hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default ReactionRolesPage;