
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Shield, Annoyed, MessageCircle, Bot } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const modules = [
  { id: 'moderation', title: 'Moderation', description: 'Automate kicks, bans, and mutes.', icon: Shield, color: 'text-red-400' },
  { id: 'welcome', title: 'Welcome Messages', description: 'Greet new members in style.', icon: MessageCircle, color: 'text-blue-400' },
  { id: 'logging', title: 'Action Logging', description: 'Keep a record of all server events.', icon: Annoyed, color: 'text-yellow-400' },
  { id: 'autorole', title: 'Auto Role', description: 'Assign roles to new members automatically.', icon: Bot, color: 'text-green-400' },
];

const ModulesPage = () => {
  const { toast } = useToast();

  const handleToggle = (moduleId, checked) => {
    toast({
      title: `Module ${checked ? 'Enabled' : 'Disabled'}`,
      description: `The ${moduleId} module has been updated.`,
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
        <title>Manage Modules - Discord Bot Dashboard</title>
        <meta name="description" content="Enable or disable bot modules." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <h1 className="text-3xl font-bold">Manage Modules</h1>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {modules.map((module) => (
            <motion.div key={module.id} variants={itemVariants}>
              <Card className="bg-card/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <module.icon className={`h-8 w-8 ${module.color}`} />
                      <div>
                        <CardTitle>{module.title}</CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                      </div>
                    </div>
                    <Switch
                      id={module.id}
                      onCheckedChange={(checked) => handleToggle(module.title, checked)}
                    />
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

export default ModulesPage;
  