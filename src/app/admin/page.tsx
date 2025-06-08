
'use client';

import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { GlassCard } from "@/components/ui/glass-card";
import { ShieldCheck, LogIn, Loader2, UserCog, Users, Edit, Trash2, PlusCircle, Search, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { useRegistrations, type RegistrationEntry } from '@/contexts/registration-context';
import { Button } from "@/components/ui/button";
import { GradientBorderButton } from '@/components/ui/gradient-border-button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
// Sidebar components from shadcn/ui (assuming they are available as per project structure)
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  useSidebar
} from "@/components/ui/sidebar"; // Ensure this path is correct

// Placeholder for RegistrationForm component (to be created or adapted)
// For now, we'll use a simplified form inside the dialog.
// import { RegistrationFormAdmin } from './registration-form-admin';


const ITEMS_PER_PAGE = 10;

export default function AdminDashboardPage() {
  const { currentUser, loadingAuthState, openAuthDialog, isAdminOverrideLoggedIn, logOut } = useAuth();
  const { registrations, deleteRegistration, updateRegistration, addRegistration: addRegistrationViaContext } = useRegistrations(); // Renamed for clarity

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRegistration, setEditingRegistration] = useState<RegistrationEntry | null>(null);

  // --- Authentication Gate ---
  if (loadingAuthState) {
    return (
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <GlassCard className="w-full max-w-md p-6 md:p-8 text-center">
          <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
          <p className="font-body text-lg text-card-foreground/90">
            Checking authentication status...
          </p>
        </GlassCard>
      </main>
    );
  }

  if (!isAdminOverrideLoggedIn && !currentUser) {
     return (
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <GlassCard className="w-full max-w-md p-6 md:p-8 text-center">
          <UserCog className="w-16 h-16 text-destructive mb-4" />
          <h1 className={cn(
            "text-2xl md:text-3xl font-headline font-semibold text-gradient-theme tracking-wide mb-4",
            "text-glass-shadow"
            )}>
            Admin Access Required
          </h1>
          <p className="font-body text-lg text-card-foreground/90 leading-relaxed mb-6">
            You must be logged in as an administrator to view this page.
          </p>
          <Button onClick={() => openAuthDialog('adminOnly')} variant="outline" className="font-subtitle">
            <LogIn className="mr-2 h-5 w-5" />
            Log In as Admin
          </Button>
        </GlassCard>
      </main>
    );
  }
  
  if (currentUser && !isAdminOverrideLoggedIn) {
     return (
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <GlassCard className="w-full max-w-md p-6 md:p-8 text-center">
           <ShieldCheck className="w-16 h-16 text-destructive mb-4" />
          <h1 className={cn(
            "text-2xl md:text-3xl font-headline font-semibold text-gradient-theme tracking-wide mb-4",
            "text-glass-shadow"
            )}>
            Not Authorized
          </h1>
          <p className="font-body text-lg text-card-foreground/90 leading-relaxed">
            You do not have permission to access this page.
          </p>
        </GlassCard>
      </main>
    );
  }
  // --- End Authentication Gate ---

  const filteredRegistrations = useMemo(() => {
    return registrations.filter(reg =>
      reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()); // Sort by most recent
  }, [registrations, searchTerm]);

  const totalPages = Math.ceil(filteredRegistrations.length / ITEMS_PER_PAGE);
  const paginatedRegistrations = filteredRegistrations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleExportCSV = () => {
    const headers = "ID,Full Name,Email,Phone,Registration Type,Family Members,Address,Screenshot,Submitted At\n";
    const csvContent = filteredRegistrations.map(reg =>
      [
        reg.id,
        `"${reg.fullName.replace(/"/g, '""')}"`,
        `"${reg.email.replace(/"/g, '""')}"`,
        reg.phone,
        reg.registrationType,
        reg.registrationType === 'family' ? reg.numberOfFamilyMembers || 'N/A' : 'N/A',
        `"${(reg.address || 'N/A').replace(/"/g, '""')}"`,
        reg.paymentScreenshotFilename || 'No',
        format(new Date(reg.submittedAt), 'yyyy-MM-dd HH:mm:ss')
      ].join(',')
    ).join('\n');

    const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `registrations_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  // Simplified form for Create/Edit Dialog
  // In a real app, this would be a more robust component, possibly reusing RegistrationFormSection's logic
  const RegistrationEditForm = ({ initialData, onSubmit, onCancel }: {
    initialData?: Partial<RegistrationEntry>;
    onSubmit: (data: Partial<Omit<RegistrationEntry, 'id'|'submittedAt'>>) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState({
      fullName: initialData?.fullName || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      registrationType: initialData?.registrationType || 'professional',
      numberOfFamilyMembers: initialData?.numberOfFamilyMembers || '',
      address: initialData?.address || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Basic validation could be added here
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
         <div>
          <Label htmlFor="registrationType">Registration Type</Label>
          <select name="registrationType" id="registrationType" value={formData.registrationType} onChange={handleChange} className="w-full p-2 border rounded-md bg-input">
            <option value="professional">Professional</option>
            <option value="student">Student</option>
            <option value="family">Family</option>
          </select>
        </div>
        {formData.registrationType === 'family' && (
          <div>
            <Label htmlFor="numberOfFamilyMembers">Number of Family Members</Label>
            <Input id="numberOfFamilyMembers" name="numberOfFamilyMembers" type="number" value={formData.numberOfFamilyMembers} onChange={handleChange} />
          </div>
        )}
        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </form>
    );
  };


  // User is admin, show dashboard
  return (
    <SidebarProvider defaultOpen={true}>
      <main className="flex min-h-[calc(100vh-5rem)] bg-background">
        <Sidebar collapsible="icon" className="border-r">
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2 justify-between">
               <h2 className={cn("font-headline text-2xl text-gradient-theme group-data-[collapsible=icon]:hidden", "text-glass-shadow")}>DMCC Admin</h2>
               <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive tooltip="Manage Registrations">
                  <Users />
                  <span>Registrations</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="mt-auto group-data-[collapsible=icon]:p-0">
             <Button variant="ghost" onClick={logOut} className="w-full justify-start p-2 group-data-[collapsible=icon]:justify-center">
                <LogOut className="mr-2 group-data-[collapsible=icon]:mr-0" />
                <span className="group-data-[collapsible=icon]:hidden">Logout</span>
             </Button>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center">
                <SidebarTrigger className="md:hidden mr-2" /> {/* Mobile trigger */}
                <h1 className={cn(
                  "text-3xl md:text-4xl font-headline font-semibold text-gradient-theme",
                  "text-glass-shadow"
                )}>
                  Event Registrations
                </h1>
             </div>
          </div>

          <GlassCard className="p-4 md:p-6 mb-6">
            <p className="font-body text-sm text-card-foreground/80">
              Client-side data prototype: Registrations are stored in memory and will be lost on page refresh.
              A full backend is required for persistent storage.
            </p>
          </GlassCard>

          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="pl-10 w-full"
              />
            </div>
            <GradientBorderButton onClick={() => { setEditingRegistration(null); setIsCreateModalOpen(true);}} className="text-sm">
              <PlusCircle className="mr-2 h-5 w-5" />
              Add Registration
            </GradientBorderButton>
            <Button variant="outline" onClick={handleExportCSV} className="text-sm">
              <Download className="mr-2 h-5 w-5" />
              Export CSV
            </Button>
          </div>

          <GlassCard className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-subtitle">Full Name</TableHead>
                  <TableHead className="font-subtitle hidden md:table-cell">Email</TableHead>
                  <TableHead className="font-subtitle hidden lg:table-cell">Phone</TableHead>
                  <TableHead className="font-subtitle">Type</TableHead>
                  <TableHead className="font-subtitle hidden lg:table-cell">Submitted</TableHead>
                  <TableHead className="font-subtitle text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRegistrations.length > 0 ? (
                  paginatedRegistrations.map((reg) => (
                    <TableRow key={reg.id}>
                      <TableCell className="font-body font-medium">{reg.fullName}</TableCell>
                      <TableCell className="font-body hidden md:table-cell">{reg.email}</TableCell>
                      <TableCell className="font-body hidden lg:table-cell">{reg.phone}</TableCell>
                      <TableCell className="font-body">
                        {reg.registrationType}
                        {reg.registrationType === 'family' && ` (${reg.numberOfFamilyMembers || 'N/A'} members)`}
                      </TableCell>
                      <TableCell className="font-body hidden lg:table-cell">{format(new Date(reg.submittedAt), 'PPp')}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="mr-2" onClick={() => { setEditingRegistration(reg); setIsEditModalOpen(true); }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the registration for {reg.fullName}.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteRegistration(reg.id)} className="bg-destructive hover:bg-destructive/90">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center font-body py-8">
                      No registrations found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </GlassCard>

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center items-center space-x-2 font-body">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span>Page {currentPage} of {totalPages}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </SidebarInset>
      </main>

      {/* Create Registration Dialog */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Registration</DialogTitle>
            <DialogDescription>
              Manually enter registration details.
            </DialogDescription>
          </DialogHeader>
          <RegistrationEditForm 
            onSubmit={(data) => {
                // Need to cast data as RegistrationFormValues for addRegistrationViaContext
                const formData = data as unknown as import('@/components/sections/registration-form-section').RegistrationFormValues;
                // Add agreeToTerms as it's required by RegistrationFormValues but not in this simplified form
                const completeFormData: import('@/components/sections/registration-form-section').RegistrationFormValues = {
                    ...formData,
                    agreeToTerms: true, // Default to true for admin creation
                    paymentScreenshot: undefined, // Not handled in this simplified form
                };
                addRegistrationViaContext(completeFormData);
                setIsCreateModalOpen(false);
            }}
            onCancel={() => setIsCreateModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Registration Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Registration</DialogTitle>
            <DialogDescription>
              Update details for {editingRegistration?.fullName}.
            </DialogDescription>
          </DialogHeader>
          {editingRegistration && (
            <RegistrationEditForm
              initialData={editingRegistration}
              onSubmit={(data) => {
                if (editingRegistration?.id) {
                  updateRegistration(editingRegistration.id, data);
                }
                setIsEditModalOpen(false);
                setEditingRegistration(null);
              }}
              onCancel={() => { setIsEditModalOpen(false); setEditingRegistration(null); }}
            />
          )}
        </DialogContent>
      </Dialog>

    </SidebarProvider>
  );
}

// Need Label component for the simplified form
const Label = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-card-foreground mb-1 font-subtitle">{children}</label>
);
// Need Textarea for the simplified form
const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn("w-full p-2 border rounded-md bg-input text-sm min-h-[80px]", className)}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
