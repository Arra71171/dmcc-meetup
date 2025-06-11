
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler, type FieldErrors } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { GlassCard } from "@/components/ui/glass-card";
import { useState, type ChangeEvent, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { useRegistrations } from "@/contexts/registration-context";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

export type RegistrationType = "professional" | "student" | "family" | "others";

const fileListToFileSchema = z
  .custom<FileList | null | undefined>()
  .optional()
  .transform((fileList, ctx) => {
    if (fileList && fileList.length > 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please upload only one file.",
      });
      return z.NEVER; 
    }
    if (fileList && fileList.length === 1) {
      return fileList[0]; 
    }
    return null; 
  })
  .nullable()
  .refine(
    (file) => {
      if (!file) return true; 
      return file.size <= MAX_FILE_SIZE;
    },
    (file) => ({ message: file ? `Max file size is 5MB. Yours is ~${(file.size / (1024*1024)).toFixed(2)}MB` : 'Max file size is 5MB.'})
  )
  .refine(
    (file) => {
      if (!file) return true; 
      return ACCEPTED_IMAGE_TYPES.includes(file.type);
    },
    (file) => ({ message: file ? `Accepted types: JPG, PNG, WEBP, PDF. Yours is ${file.type}` : 'Invalid file type.' })
  );


const registrationFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }).max(100, { message: "Full name must be less than 100 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).regex(/^(\+\d{1,3}[- ]?)?\d{10}$/, { message: "Invalid phone number format." }),
  registrationType: z.enum(["professional", "student", "family", "others"]),
  numberOfFamilyMembers: z.string().optional(),
  address: z.string().max(250, {message: "Address must be less than 250 characters."}).optional(),
  paymentScreenshot: fileListToFileSchema,
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



interface SpecificRegistrationFormProps {
  initialRegistrationType: RegistrationType;
}

export function SpecificRegistrationForm({ initialRegistrationType }: SpecificRegistrationFormProps) {
  const { toast } = useToast();
  const { currentUser, loadingAuthState, openAuthDialog } = useAuth();
  const { addRegistration } = useRegistrations();
  const router = useRouter();
  
  const form = useForm<RegistrationFormValues>({ 
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      fullName: "", 
      email: "",    
      phone: "",
      address: "",
      registrationType: initialRegistrationType,
      numberOfFamilyMembers: initialRegistrationType === 'family' ? "1" : "",
      agreeToTerms: false,
      paymentScreenshot: null, 
      expectations: "",
    },
    mode: "onChange", 
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (!form.getValues("email") && currentUser.email) {
        form.setValue("email", currentUser.email, { shouldValidate: true });
      }
      if (!form.getValues("fullName") && currentUser.displayName) {
        form.setValue("fullName", currentUser.displayName, { shouldValidate: true });
      }
    }
    form.setValue("registrationType", initialRegistrationType, { shouldDirty: true });
  }, [currentUser, form, initialRegistrationType]);

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    console.log("SpecificRegistrationForm: onSubmit handler CALLED.");
    setIsSubmitting(true); // Moved to the top for immediate feedback
    console.log("SpecificRegistrationForm: isSubmitting set to true.");

    if (!currentUser) {
      console.warn("SpecificRegistrationForm: User not authenticated, aborting submission.");
      toast({ title: "Authentication Required", description: "Please sign in to submit the form.", variant: "destructive" });
      openAuthDialog();
      setIsSubmitting(false); // Reset submitting state
      return;
    }
    
    console.log("SpecificRegistrationForm: User authenticated, proceeding with submission.");
    console.log("SpecificRegistrationForm: Form data received by onSubmit:", JSON.stringify(data, null, 2));
    
    try {
      console.log("SpecificRegistrationForm: Calling addRegistration from context...");
      await addRegistration(data); 
      console.log("SpecificRegistrationForm: addRegistration call completed.");
      
      toast({
        title: "Registration Submitted!",
        description: "Your registration details have been received. We will verify and get back to you shortly.",
        variant: "default",
      });
      console.log("SpecificRegistrationForm: Success toast shown.");

      form.reset({ 
        fullName: currentUser?.displayName || "",
        email: currentUser?.email || "",
        phone: "",
        address: "",
        registrationType: initialRegistrationType,
        numberOfFamilyMembers: initialRegistrationType === 'family' ? "1" : "",
        agreeToTerms: false,
        paymentScreenshot: null,
        expectations: "",
      });
      console.log("SpecificRegistrationForm: Form reset.");
      const fileInput = document.getElementById('paymentScreenshotInput') as HTMLInputElement | null;
      if (fileInput) {
        fileInput.value = '';
      }
      console.log("SpecificRegistrationForm: Navigating to homepage.");
      router.push('/');

    } catch (error) {
      console.error("SpecificRegistrationForm: Error in onSubmit after calling addRegistration:", error);
      toast({
        title: "Submission Failed",
        description: `An unexpected error occurred: ${(error as Error).message || "Please try again."}`,
        variant: "destructive",
      });
    } finally {
      console.log("SpecificRegistrationForm: setIsSubmitting(false) in finally block.");
      setIsSubmitting(false);
    }
  };
  
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (form.formState.errors[name as keyof RegistrationFormValues]) {
        // This log helps see Zod validation errors in real-time in the console
        // console.log(`Client-Side Validation error on field '${name}':`, form.formState.errors[name as keyof RegistrationFormInputType]?.message);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);


  if (loadingAuthState) {
    return (
      <GlassCard className="p-6 md:p-8 text-card-foreground flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="h-12 w-12 animate-spin text-accent" />
        <p className="mt-4 text-lg font-subtitle text-card-foreground">Verifying your status...</p>
      </GlassCard>
    );
  }

  if (!currentUser) {
    return (
      <GlassCard className="p-6 md:p-8 text-card-foreground text-center">
        <p className="mb-4">Please sign in to complete your registration. We&apos;ve received your registration!</p>
        <GradientBorderButton onClick={() => openAuthDialog()}>
          Sign In / Create Account
        </GradientBorderButton>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6 md:p-8 text-card-foreground border border-slate-700/50 shadow-2xl shadow-black/30">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, (errors: FieldErrors<RegistrationFormValues>) => {
          console.error("FORM SUBMISSION FAILED - Zod Validation Errors:", errors);
          toast({
            title: "Validation Error",
            description: "Please check the form for errors. " + Object.keys(errors).map(key => `${key}: ${errors[key as keyof RegistrationFormValues]?.message}`).join("; "),
            variant: "destructive",
            duration: 7000,
          });
        })} className="space-y-6 font-body text-sm">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-subtitle text-card-foreground">Full Name</FormLabel>
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
                    <Input type="email" placeholder="your.email@example.com" {...field} readOnly={!!currentUser?.email && field.value === currentUser.email} />
                  </FormControl>
                  <FormDescription className="text-muted-foreground">
                    {currentUser?.email && field.value === currentUser.email ? "Email pre-filled from your account." : ""}
                  </FormDescription>
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

            {initialRegistrationType === "family" && (
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
                        onChange={(e: ChangeEvent<HTMLInputElement>) => field.onChange(e.target.value)}
                        min="1"
                      />
                    </FormControl>
                    <FormDescription className="text-muted-foreground">
                      Total members attending under this Family Pass (including yourself if applicable).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

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
            <div className="p-4 rounded-md border border-border bg-background/30 dark:bg-background/50">
              <p className="font-body text-card-foreground/80 text-sm md:text-base">
                Please complete your payment using the details below:
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                <div className="w-32 h-32 relative border border-border rounded-md overflow-hidden bg-muted/30 flex items-center justify-center">
                  <Image
                    src="/images/qr-code.jpg"
                    alt="DMCC UPI QR Code"
                    width={128}
                    height={128}
                  />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-body flex-1">
                  Scan the QR code with your UPI app (GPay, PhonePe, etc.).
                  Your registration will be confirmed via email after payment verification (24-48 hours).
                </p>
              </div>
            </div>
          </FormItem>

          <FormField
            control={form.control}
            name="paymentScreenshot"
            render={({ field: { onChange, value: _value, ...rest } }) => ( 
              <FormItem>
                <FormLabel className="font-subtitle text-card-foreground">Upload Payment Screenshot (Optional but Recommended)</FormLabel>
                <FormControl>
                   <Input
                    id="paymentScreenshotInput" 
                    type="file"
                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      onChange(e.target.files); 
                    }}
                    className="file:text-foreground file:font-subtitle file:uppercase file:text-xs file:tracking-wider file:font-medium file:mr-3"
                    {...rest} 
                  />
                </FormControl>
                 <FormDescription className="text-muted-foreground">
                  Attaching a screenshot helps expedite the verification process. Max 5MB. (.jpg, .png, .webp, .pdf)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border-2 border-slate-700/60 bg-slate-800/40 p-4 shadow-lg transition-all hover:border-accent/60 hover:bg-slate-800/60">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="terms"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel htmlFor="terms" className="cursor-pointer font-subtitle text-card-foreground">
                    I agree to the terms and conditions of the Meetei People's Convention.
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
  );
}
