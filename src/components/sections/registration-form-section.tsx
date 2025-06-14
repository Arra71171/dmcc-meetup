"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { GradientBorderButton } from "@/components/ui/gradient-border-button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { GlassCard } from "@/components/ui/glass-card";
import { useState, type ChangeEvent, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { useRegistrations } from "@/contexts/registration-context";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

const registrationFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }).max(100, { message: "Full name must be less than 100 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).regex(/^(\+\d{1,3}[- ]?)?\d{10}$/, { message: "Invalid phone number format." }),
  registrationType: z.enum(["professional", "student", "family", "others"], {
    required_error: "Please select a registration type.",
  }),
  numberOfFamilyMembers: z.string().optional(),
  address: z.string().max(250, {message: "Address must be less than 250 characters."}).optional(),
  paymentScreenshot: z
    .custom<FileList | undefined>() 
    .refine((files) => { 
      if (!files || files.length === 0) return true; 
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max file size is 5MB.`)
    .refine(
      (files) => { 
        if (!files || files.length === 0) return true; 
        return ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type);
      },
      ".jpg, .jpeg, .png, .webp and .pdf files are accepted."
    ).optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
  expectations: z.string().max(500, {message: "Expectations must be less than 500 characters."}).optional(),
}).superRefine((data, ctx) => {
  if (data.registrationType === "family") {
    if (!data.numberOfFamilyMembers || data.numberOfFamilyMembers.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify the number of family members.",
        path: ["numberOfFamilyMembers"],
      });
    } else {
      const numMembers = parseInt(data.numberOfFamilyMembers, 10);
      if (isNaN(numMembers) || numMembers < 1 || numMembers > 10) { 
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a valid number of family members (1-10).",
          path: ["numberOfFamilyMembers"],
        });
      }
    }
  }
});

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>; 

const defaultValues: Partial<RegistrationFormValues> = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  numberOfFamilyMembers: "",
  agreeToTerms: false,
  paymentScreenshot: undefined,
  expectations: "",
};

export function RegistrationFormSection() {
  const { toast } = useToast();
  const { currentUser, loadingAuthState, openAuthDialog } = useAuth();
  const { addRegistration } = useRegistrations(); 
  
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedRegistrationType = form.watch("registrationType");

  useEffect(() => {
    if (currentUser && currentUser.email) {
      form.setValue("email", currentUser.email, { shouldValidate: true });
    }
    if (currentUser && currentUser.displayName) {
      form.setValue("fullName", currentUser.displayName, {shouldValidate: true});
    }
  }, [currentUser, form]);

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    // Convert FileList to File for the addRegistration function
    const processedData = {
      ...data,
      paymentScreenshot: data.paymentScreenshot && data.paymentScreenshot.length > 0 ? data.paymentScreenshot[0] : null
    };
    if (!currentUser) {
      toast({ title: "Authentication Required", description: "Please sign in to submit the form.", variant: "destructive" });
      openAuthDialog();
      return;
    }
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      addRegistration(processedData); 
      
      toast({
        title: "Registration Submitted!",
        description: "Your registration details have been received. We will verify and get back to you shortly.",
        variant: "default", 
      });
      form.reset(); 
      const fileInput = document.querySelector('input[type="file"][name="paymentScreenshot"]') as HTMLInputElement | null;
      if (fileInput) {
        fileInput.value = ''; 
      }

    } catch (error) {
      console.error("Submission Error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="registration" className="w-full px-4 py-20 md:py-28 mx-auto relative bg-background overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-gradient-to-br from-primary to-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-secondary to-accent rounded-full blur-3xl"></div>
      </div>
      
      {/* Section divider */}
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-border/10 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-12 bg-primary/50"></div>
          <span className="text-foreground text-sm font-medium uppercase tracking-wider">Join Us</span>
          <div className="h-px w-12 bg-primary/50"></div>
        </div>
        
        <h2 className={cn(
          "text-3xl md:text-4xl font-headline font-semibold text-center text-foreground mb-10 md:mb-16 tracking-wide",
          "drop-shadow-md"
        )}>
          Register Now
        </h2>
        
        <div className="max-w-3xl mx-auto">
          {loadingAuthState && (
            <GlassCard className="p-6 md:p-8 text-card-foreground flex flex-col items-center justify-center min-h-[300px]">
              <Loader2 className="h-12 w-12 animate-spin text-accent" />
              <p className="mt-4 text-lg font-subtitle text-card-foreground">Verifying your status...</p>
            </GlassCard>
          )}
          
          {!loadingAuthState && !currentUser && (
            <GlassCard className="p-6 md:p-8 text-card-foreground flex flex-col items-center justify-center min-h-[300px]">
              <p className="text-lg font-subtitle text-card-foreground mb-4">Please sign in to register for the event</p>
              <GradientBorderButton onClick={(e) => { e.preventDefault(); openAuthDialog(); }} className="text-base py-3">
                Sign In / Register
              </GradientBorderButton>
            </GlassCard>
          )}
          
          {!loadingAuthState && currentUser && (
            <GlassCard className="p-6 md:p-8 text-card-foreground">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 font-body text-sm">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-subtitle text-card-foreground">Full Name (Profile)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-subtitle text-card-foreground">Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-subtitle text-card-foreground">Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+91 XXXXXXXXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="registrationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-subtitle text-card-foreground">Registration Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="font-body">
                              <SelectValue placeholder="Select your registration category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="font-body">
                            <SelectItem value="student">Student (₹100)</SelectItem>
                            <SelectItem value="professional">Professional (₹299)</SelectItem>
                            <SelectItem value="family">Family Pass (₹499)</SelectItem>
                            <SelectItem value="others">Others (₹100)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedRegistrationType === "family" && (
                    <FormField
                      control={form.control}
                      name="numberOfFamilyMembers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-subtitle text-card-foreground">Number of Family Members</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="e.g., 2" 
                              {...field}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                  const value = e.target.value;
                                  field.onChange(value); 
                              }}
                              min="1"
                            />
                          </FormControl>
                          <FormDescription className="text-muted-foreground">
                            Total members under Family Pass.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-subtitle text-card-foreground">Current Address (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your current address (City, State)" className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="expectations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-subtitle text-card-foreground">What are your expectations for this event? (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Share any thoughts or what you hope to gain..." className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel className="font-subtitle text-card-foreground">Payment Details (UPI)</FormLabel>
                    <div className="p-4 rounded-md border border-border bg-background/30 dark:bg-background/50 space-y-3">
                      <p className="font-body text-card-foreground/90">
                        Please make your payment to the following UPI ID:
                      </p>
                      <p className="font-mono text-lg font-semibold text-accent p-2 bg-muted/50 rounded-md inline-block">
                        radheoinam@oksbi
                      </p>
                      <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                        <div className="w-32 h-32 relative border border-border rounded-md overflow-hidden bg-muted/30 flex items-center justify-center">
                          <Image
                            src="https://placehold.co/128x128.png"
                            alt="UPI QR Code Placeholder"
                            width={128}
                            height={128}
                            data-ai-hint="QR code payment"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground font-body flex-1">
                          You can scan the QR code with your UPI app or use the UPI ID directly. 
                          We will manually verify all payments and confirm your registration within 24-48 hours.
                        </p>
                      </div>
                    </div>
                  </FormItem>

                  <FormField
                    control={form.control}
                    name="paymentScreenshot"
                    render={({ field: { name, onBlur, ref, onChange } }) => (
                      <FormItem>
                        <FormLabel className="font-subtitle text-card-foreground">Upload Payment Screenshot (Optional but Recommended)</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept={ACCEPTED_IMAGE_TYPES.join(",")}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.files)}
                            className="file:text-foreground file:font-subtitle file:uppercase file:text-xs file:tracking-wider file:font-medium file:mr-3"
                            name={name}
                            onBlur={onBlur}
                            ref={ref}
                          />
                        </FormControl>
                        <FormDescription className="text-muted-foreground">
                          Attaching a screenshot helps expedite the verification process.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4 shadow-sm bg-background/30 dark:bg-background/50">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id="terms"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel htmlFor="terms" className="cursor-pointer font-subtitle text-card-foreground">
                            I agree to the terms and conditions of the Meetei People&apos;s Convention.
                          </FormLabel>
                          <FormDescription className="text-muted-foreground text-xs">
                            By registering, you acknowledge and accept our event policies. <br/>
                            Your information is encrypted and never shared with third parties.
                          </FormDescription>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <GradientBorderButton 
                    type="submit" 
                    className="w-full text-base py-3" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSubmitting ? "Submitting..." : "Submit Your Registration"}
                  </GradientBorderButton>
                </form>
              </Form>
            </GlassCard>
          )}
        </div>
      </div>
    </section>
  );
}
