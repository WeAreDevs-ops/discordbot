import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <Helmet>
        <title>Login - Discord Bot Dashboard</title>
        <meta name="description" content="Login to manage your Discord bot." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
        <div
          className={cn(
            "absolute inset-[-10px] opacity-50",
            "bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e70,transparent)]",
            "animate-aurora"
          )}
        />
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="w-full max-w-md text-center bg-card/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-border z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className="mx-auto mb-6 w-24 h-24 flex items-center justify-center bg-primary/10 rounded-full"
          >
            <Bot className="h-12 w-12 text-primary" />
          </motion.div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Discord Bot Dashboard
          </h1>
          <p className="text-muted-foreground mb-8">
            Manage your server with ease.
          </p>
          <Button
            onClick={handleLogin}
            className="w-full bg-discord-blurple hover:bg-discord-blurple-dark text-white font-bold py-3 text-lg transition-transform transform hover:scale-105"
          >
            Login with Discord
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;