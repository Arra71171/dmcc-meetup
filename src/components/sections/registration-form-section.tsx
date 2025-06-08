
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useState, type ChangeEvent } from 'react';
import { useToast } from "@/hooks/use-toast";


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];


const registrationFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }).max(100, { message: "Full name must be less than 100 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).regex(/^(\+\d{1,3}[- ]?)?\d{10}$/, { message: "Invalid phone number format." }),
  registrationType: z.enum(["professional", "student", "family"], {
    required_error: "Please select a registration type.",
  }),
  numberOfFamilyMembers: z.string().optional(),
  address: z.string().max(250, {message: "Address must be less than 250 characters."}).optional(),
  paymentScreenshot: z
    .any()
    .refine((files) => files?.length === 1, "Payment screenshot is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png, .webp and .pdf files are accepted."
    ),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
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
      if (isNaN(numMembers) || numMembers < 1 || numMembers > 10) { // Assuming max 10 members for sanity
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a valid number of family members (1-10).",
          path: ["numberOfFamilyMembers"],
        });
      }
    }
  }
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

const defaultValues: Partial<RegistrationFormValues> = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  numberOfFamilyMembers: "",
  agreeToTerms: false,
};

export function RegistrationFormSection() {
  const { toast } = useToast();
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedRegistrationType = form.watch("registrationType");

  async function onSubmit(data: RegistrationFormValues) {
    setIsSubmitting(true);
    console.log("Form data submitted:", data);
    // In a real app, you'd send this to a backend or Genkit flow.
    // For the payment screenshot, you'd handle the File object: data.paymentScreenshot[0]
    
    // Simulate API call for demonstration
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    form.reset();
    toast({
      title: "Registration Submitted!",
      description: "Your registration details have been received. We will verify and get back to you shortly.",
      variant: "default", 
    });
  }

  return (
    <section id="registration-form" className="w-full max-w-3xl px-4 mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center font-headline uppercase mb-10 md:mb-16 text-gradient-theme">
        Register for the Convention
      </h2>
      <GlassCard className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
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
                  <FormLabel>Email Address</FormLabel>
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
                  <FormLabel>Phone Number</FormLabel>
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
                  <FormLabel>Registration Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your registration type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="professional">Professional (₹500)</SelectItem>
                      <SelectItem value="student">Student (₹300)</SelectItem>
                      <SelectItem value="family">Family Pass (₹800)</SelectItem>
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
                    <FormLabel>Number of Family Members</FormLabel>
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
                    <FormDescription>
                      Total members under Family Pass (e.g., 2 adults, 1 child = 3 members). Base price covers 2 adults + up to 2 children. Additional charges may apply for more.
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
                  <FormLabel>Current Address (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your current address (City, State)" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="paymentScreenshot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Screenshot (UPI to radheoinam@oksbi)</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept={ACCEPTED_IMAGE_TYPES.join(",")}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => field.onChange(e.target.files)}
                      className="file:text-foreground file:font-medium file:mr-2"
                    />
                  </FormControl>
                   <FormDescription>
                    Upload a screenshot of your payment. Max 5MB. Accepted: JPG, PNG, WEBP, PDF.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4 shadow-sm bg-background/50">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="terms"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel htmlFor="terms" className="cursor-pointer">
                      I agree to the terms and conditions of the Meetei People's Convention.
                    </FormLabel>
                    <FormDescription>
                      By registering, you acknowledge and accept our event policies. Full terms available on request.
                    </FormDescription>
                     <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <GradientBorderButton type="submit" className="w-full font-headline text-lg py-3" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Secure My Spot"}
            </GradientBorderButton>
          </form>
        </Form>
      </GlassCard>
    </section>
  );
}

    