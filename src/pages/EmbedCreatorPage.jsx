import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, RefreshCw, Bot } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const initialEmbedState = {
  channel: '',
  title: '',
  description: '',
  color: '#5865F2',
  authorName: '',
  authorIconUrl: '',
  footerText: '',
  thumbnailUrl: '',
  imageUrl: '',
};

const channels = [
  { id: '1', name: '#general' },
  { id: '2', name: '#announcements' },
  { id: '3', name: '#welcome' },
  { id: '4', name: '#rules' },
];

const EmbedCreatorPage = () => {
  const [embed, setEmbed] = useState(initialEmbedState);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmbed((prev) => ({ ...prev, [name]: value }));
  };

  const handleChannelChange = (value) => {
    setEmbed((prev) => ({ ...prev, channel: value }));
  };

  const handleReset = () => {
    setEmbed(initialEmbedState);
    toast({ title: 'Embed reset!', description: 'The embed form has been cleared.' });
  };

  const handleSend = () => {
    if (!embed.channel) {
      toast({
        variant: 'destructive',
        title: 'Uh oh!',
        description: 'Please select a channel before sending the embed.',
      });
      return;
    }
    toast({
      title: '🚀 Embed Sent!',
      description: `Your embed has been sent to ${embed.channel}.`,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <Helmet>
        <title>Embed Creator - Discord Bot Dashboard</title>
        <meta name="description" content="Create and send custom Discord embeds." />
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
            <h1 className="text-3xl font-bold">Embed Creator</h1>
            <p className="text-muted-foreground">Craft and send rich embeds to your server.</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleReset} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button onClick={handleSend}>
              <Send className="mr-2 h-4 w-4" /> Send Embed
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <Card className="bg-card/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Embed Content</CardTitle>
                <CardDescription>Fill in the details for your embed message.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div variants={itemVariants}>
                  <Label htmlFor="channel">Channel</Label>
                  <Select onValueChange={handleChannelChange} value={embed.channel}>
                    <SelectTrigger id="channel">
                      <SelectValue placeholder="Select a channel..." />
                    </SelectTrigger>
                    <SelectContent>
                      {channels.map((c) => (
                        <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" value={embed.title} onChange={handleInputChange} placeholder="My Awesome Embed" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" value={embed.description} onChange={handleInputChange} placeholder="This is the main content of the embed." className="min-h-[120px]" />
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label htmlFor="color">Color</Label>
                    <Input id="color" name="color" value={embed.color} onChange={handleInputChange} type="text" />
                  </div>
                  <div className="w-10 h-10 rounded mt-6" style={{ backgroundColor: embed.color }} />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Label htmlFor="authorName">Author Name</Label>
                  <Input id="authorName" name="authorName" value={embed.authorName} onChange={handleInputChange} placeholder="John Doe" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Label htmlFor="footerText">Footer Text</Label>
                  <Input id="footerText" name="footerText" value={embed.footerText} onChange={handleInputChange} placeholder="Sent with My Bot" />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="bg-card/70 backdrop-blur-sm sticky top-8">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>This is how your embed will look in Discord.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-[#313338] p-4 rounded-lg space-y-2 flex">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src="https://cdn.discordapp.com/embed/avatars/0.png" />
                    <AvatarFallback><Bot /></AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                       <span className="text-white font-medium">My Bot</span>
                       <span className="text-xs text-gray-400">Today at 12:00 PM</span>
                    </div>
                    <div className="bg-[#2B2D31] rounded flex">
                      <div className="w-1 rounded-l-md" style={{ backgroundColor: embed.color }}></div>
                      <div className="p-3 text-white text-sm flex-1">
                        {embed.authorName && (
                          <div className="flex items-center mb-2">
                            <span className="font-semibold text-sm">{embed.authorName}</span>
                          </div>
                        )}
                        {embed.title && <div className="font-bold text-base mb-1">{embed.title}</div>}
                        {embed.description && <div className="whitespace-pre-wrap">{embed.description}</div>}
                        {embed.footerText && (
                            <div className="text-xs text-gray-300 mt-2">
                                <span>{embed.footerText}</span>
                            </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default EmbedCreatorPage;