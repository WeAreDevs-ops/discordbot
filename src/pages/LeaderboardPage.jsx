import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown, ArrowUp, ArrowDown } from 'lucide-react';

const users = [
  { rank: 1, name: 'SynthWave', level: 88, xp: 88120, avatar: 'https://github.com/shadcn.png', change: 'up' },
  { rank: 2, name: 'CyberPunk', level: 85, xp: 85340, avatar: 'https://github.com/shadcn.png', change: 'down' },
  { rank: 3, name: 'GlitchArt', level: 82, xp: 82500, avatar: 'https://github.com/shadcn.png', change: 'up' },
  { rank: 4, name: 'RetroGamer', level: 79, xp: 79800, avatar: null, change: 'none' },
  { rank: 5, name: 'PixelPerfect', level: 75, xp: 75210, avatar: 'https://github.com/shadcn.png', change: 'up' },
  { rank: 6, name: 'VaporWave', level: 71, xp: 71450, avatar: 'https://github.com/shadcn.png', change: 'down' },
];

const LeaderboardPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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

  const getRankColor = (rank) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-orange-400';
    return 'text-muted-foreground';
  };

  return (
    <>
      <Helmet>
        <title>Leaderboard - Discord Bot Dashboard</title>
        <meta name="description" content="View the server activity leaderboard." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold">Server Leaderboard</h1>
          <p className="text-muted-foreground">See who's the most active in the server.</p>
        </div>
        <Card className="bg-card/70 backdrop-blur-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px] text-center">Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="text-center">Level</TableHead>
                  <TableHead className="text-right">Total XP</TableHead>
                </TableRow>
              </TableHeader>
              <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
                {users.map((user) => (
                  <motion.tr key={user.rank} className="border-b" variants={itemVariants}>
                    <TableCell className="font-bold text-xl text-center">
                      <span className={getRankColor(user.rank)}>
                        {user.rank === 1 ? <Crown className="inline-block h-6 w-6" /> : `#${user.rank}`}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                        {user.change === 'up' && <ArrowUp className="h-4 w-4 text-green-500" />}
                        {user.change === 'down' && <ArrowDown className="h-4 w-4 text-red-500" />}
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-mono text-lg">{user.level}</TableCell>
                    <TableCell className="text-right font-mono text-lg">{user.xp.toLocaleString()}</TableCell>
                  </motion.tr>
                ))}
              </motion.tbody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default LeaderboardPage;