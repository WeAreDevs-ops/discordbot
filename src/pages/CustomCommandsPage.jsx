import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const commands = [
  { name: '!hello', response: 'Hello {user}!', uses: 123 },
  { name: '!rules', response: 'Please check the #rules channel.', uses: 456 },
  { name: '!socials', response: 'Find us on Twitter and Instagram!', uses: 78 },
];

const CustomCommandsPage = () => {
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
        <title>Custom Commands - Discord Bot Dashboard</title>
        <meta name="description" content="Manage custom server commands." />
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
            <h1 className="text-3xl font-bold">Custom Commands</h1>
            <p className="text-muted-foreground">Create and manage your own server commands.</p>
          </div>
          <Button onClick={showToast}>
            <PlusCircle className="mr-2 h-4 w-4" /> New Command
          </Button>
        </div>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Card className="bg-card/70 backdrop-blur-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Command</TableHead>
                    <TableHead>Response</TableHead>
                    <TableHead className="text-center">Uses</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commands.map((command) => (
                    <motion.tr key={command.name} variants={itemVariants}>
                      <TableCell className="font-mono font-bold">{command.name}</TableCell>
                      <TableCell className="text-muted-foreground max-w-sm truncate">{command.response}</TableCell>
                      <TableCell className="text-center font-mono">{command.uses}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={showToast}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={showToast} className="text-red-500 hover:text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCommandsPage;