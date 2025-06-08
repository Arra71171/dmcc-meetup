
'use client';

import React from 'react'; // Added this line
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/auth-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, UserCircle } from 'lucide-react';

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" width="18" height="18" className="mr-2">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

const emailSignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});
type EmailSignInValues = z.infer<typeof emailSignInSchema>;

const emailSignUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});
type EmailSignUpValues = z.infer<typeof emailSignUpSchema>;


export function AuthDialog() {
  const {
    isAuthDialogOpen,
    closeAuthDialog,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
  } = useAuth();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);

  const { register: registerSignIn, handleSubmit: handleSubmitSignIn, formState: { errors: errorsSignIn }, reset: resetSignInForm } = useForm<EmailSignInValues>({
    resolver: zodResolver(emailSignInSchema),
  });

  const { register: registerSignUp, handleSubmit: handleSubmitSignUp, formState: { errors: errorsSignUp }, reset: resetSignUpForm } = useForm<EmailSignUpValues>({
    resolver: zodResolver(emailSignUpSchema),
  });

  const handleGoogleSignIn = async () => {
    setIsLoadingGoogle(true);
    await signInWithGoogle();
    setIsLoadingGoogle(false);
  };

  const onSignInSubmit = async (data: EmailSignInValues) => {
    setIsLoadingEmail(true);
    await signInWithEmail(data.email, data.password);
    setIsLoadingEmail(false);
    if (isAuthDialogOpen) resetSignInForm(); 
  };

  const onSignUpSubmit = async (data: EmailSignUpValues) => {
    setIsLoadingEmail(true);
    await signUpWithEmail(data.email, data.password);
    setIsLoadingEmail(false);
     if (isAuthDialogOpen) resetSignUpForm();
  };

  React.useEffect(() => {
    if (isAuthDialogOpen) {
      resetSignInForm();
      resetSignUpForm();
    }
  }, [isAuthDialogOpen, activeTab, resetSignInForm, resetSignUpForm]);


  if (!isAuthDialogOpen) return null;

  return (
    <Dialog open={isAuthDialogOpen} onOpenChange={(isOpen) => { if (!isOpen) closeAuthDialog(); }}>
      <DialogContent className="sm:max-w-md bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-headline">
            {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {activeTab === 'signin' ? 'Access your account or sign in with Google.' : 'Create an account to continue.'}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'signin' | 'signup')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin" className="space-y-4 pt-4">
            <form onSubmit={handleSubmitSignIn(onSignInSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="email-signin">Email</Label>
                <Input id="email-signin" type="email" placeholder="you@example.com" {...registerSignIn("email")} className="bg-muted/20 focus-visible:ring-ring" />
                {errorsSignIn.email && <p className="text-sm text-destructive mt-1">{errorsSignIn.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="password-signin">Password</Label>
                <Input id="password-signin" type="password" placeholder="••••••••" {...registerSignIn("password")} className="bg-muted/20 focus-visible:ring-ring" />
                {errorsSignIn.password && <p className="text-sm text-destructive mt-1">{errorsSignIn.password.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground dark:bg-secondary dark:text-secondary-foreground hover:opacity-90" disabled={isLoadingEmail || isLoadingGoogle}>
                {isLoadingEmail && activeTab === 'signin' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign In
              </Button>
            </form>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoadingGoogle || isLoadingEmail}>
              {isLoadingGoogle ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
              Sign in with Google
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4 pt-4">
            <form onSubmit={handleSubmitSignUp(onSignUpSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="email-signup">Email</Label>
                <Input id="email-signup" type="email" placeholder="you@example.com" {...registerSignUp("email")} className="bg-muted/20 focus-visible:ring-ring" />
                {errorsSignUp.email && <p className="text-sm text-destructive mt-1">{errorsSignUp.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="password-signup">Password</Label>
                <Input id="password-signup" type="password" placeholder="••••••••" {...registerSignUp("password")} className="bg-muted/20 focus-visible:ring-ring" />
                {errorsSignUp.password && <p className="text-sm text-destructive mt-1">{errorsSignUp.password.message}</p>}
              </div>
              <div>
                <Label htmlFor="confirmPassword-signup">Confirm Password</Label>
                <Input id="confirmPassword-signup" type="password" placeholder="••••••••" {...registerSignUp("confirmPassword")} className="bg-muted/20 focus-visible:ring-ring" />
                {errorsSignUp.confirmPassword && <p className="text-sm text-destructive mt-1">{errorsSignUp.confirmPassword.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground dark:bg-secondary dark:text-secondary-foreground hover:opacity-90" disabled={isLoadingEmail || isLoadingGoogle}>
                 {isLoadingEmail && activeTab === 'signup' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Create Account
              </Button>
            </form>
             <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or sign up with</span>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoadingGoogle || isLoadingEmail}>
              {isLoadingGoogle ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
              Sign up with Google
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
