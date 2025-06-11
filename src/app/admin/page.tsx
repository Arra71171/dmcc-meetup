'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { format } from 'date-fns';
import { ShieldCheck, LogIn, Loader2, UserCog, Users, Edit, Trash2, Search, Download, LogOut as LogOutIcon, MessageSquareText, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { useRegistrations, type RegistrationEntry } from '@/contexts/registration-context';
import { Button } from "@/components/ui/button";
import { LuminanceButton } from "@/components/ui/luminance-button";
import { LuminanceCard } from "@/components/ui/luminance-card";
import { MagneticElement } from "@/components/ui/magnetic-element";
import { RevealOnScroll } from "@/lib/smooth-scroll";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
} from "@/components/ui/dialog";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger as MainSidebarTrigger, // Ensured this is the aliased import
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


const ITEMS_PER_PAGE = 10;

export default function AdminDashboardPage() {
  const { currentUser, loadingAuthState, openAuthDialog, isAdmin, logOut } = useAuth();
  const { registrations, deleteRegistration, updateRegistration, loadingRegistrations } = useRegistrations();

  useEffect(() => {
    console.log("AdminDashboardPage received registrations:", JSON.stringify(registrations, null, 2));
  }, [registrations]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRegistration, setEditingRegistration] = useState<RegistrationEntry | null>(null);

  const filteredRegistrations = useMemo(() => {
    if (!registrations) return [];
    return registrations.filter(reg =>
      (reg.fullName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (reg.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    ).sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  }, [registrations, searchTerm]);

  const totalPages = Math.ceil(filteredRegistrations.length / ITEMS_PER_PAGE);
  const paginatedRegistrations = filteredRegistrations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loadingAuthState || loadingRegistrations) {
    return (
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <LuminanceCard 
          className="w-full max-w-md p-6 md:p-8 text-center rounded-xl border border-border backdrop-blur-sm dark:bg-background/70 bg-background/70"
          glowColor="rgba(99, 102, 241, 0.4)"
          glowIntensity={0.6}
          interactive={true}
        >
          <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
          <p className="font-body text-lg text-card-foreground/90">
            {loadingAuthState ? "Checking authentication status..." : "Loading registrations..."}
          </p>
        </LuminanceCard>
      </main>
    );
  }

  if (!isAdmin) {
     return (
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <LuminanceCard 
          className="w-full max-w-md p-6 md:p-8 text-center rounded-xl border border-border backdrop-blur-sm dark:bg-background/70 bg-background/70"
          glowColor="rgba(220, 38, 38, 0.5)"
          glowIntensity={0.7}
          interactive={true}
        >
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
          <MagneticElement>
            <LuminanceButton onClick={() => openAuthDialog('adminOnly')} variant="outline" className="font-subtitle" glowColor="rgba(99, 102, 241, 0.5)">
              <LogIn className="mr-2 h-5 w-5" />
              Log In as Admin
            </LuminanceButton>
          </MagneticElement>
        </LuminanceCard>
      </main>
    );
  }
  
  if (currentUser && !isAdmin) {
     return (
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <LuminanceCard 
          className="w-full max-w-md p-6 md:p-8 text-center rounded-xl border border-border backdrop-blur-sm dark:bg-background/70 bg-background/70"
          glowColor="rgba(220, 38, 38, 0.6)"
          glowIntensity={0.7}
          interactive={true}
        >
           <ShieldCheck className="w-16 h-16 text-destructive mb-4" />
          <h1 className={cn(
            "text-2xl md:text-3xl font-headline font-semibold text-gradient-theme tracking-wide mb-4",
            "text-glass-shadow"
            )}>
            Not Authorized
          </h1>
          <p className="font-body text-lg text-card-foreground/90 leading-relaxed mb-6">
            You do not have permission to access this page.
          </p>
          <MagneticElement>
            <LuminanceButton onClick={logOut} variant="outline" className="font-subtitle" glowColor="rgba(99, 102, 241, 0.5)">
              <LogOutIcon className="mr-2 h-5 w-5" />
              Log Out
            </LuminanceButton>
          </MagneticElement>
        </LuminanceCard>
      </main>
    );
  }

  const handleExportCSV = () => {
    const headers = "ID,Full Name,Email,Phone,Registration Type,Family Members,Address,Expectations,Payment Screenshot Filename,Submitted At\n";
    const csvContent = filteredRegistrations.map(reg =>
      [
        reg.id,
        `"${(reg.fullName || '').replace(/"/g, '""')}"`,
        `"${(reg.email || '').replace(/"/g, '""')}"`,
        reg.phone || '',
        reg.registrationType || '',
        reg.registrationType === 'family' ? reg.numberOfFamilyMembers || 'N/A' : 'N/A',
        `"${(reg.address || 'N/A').replace(/"/g, '""')}"`,
        `"${(reg.expectations || 'N/A').replace(/"/g, '""')}"`,
        reg.paymentScreenshotFilename || 'N/A',
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
  
  const RegistrationEditForm = ({ initialData, onSubmit, onCancel }: {
    initialData: RegistrationEntry;
    onSubmit: (data: Partial<Omit<RegistrationEntry, 'id'|'submittedAt'|'paymentScreenshot'>>) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState({
      fullName: initialData.fullName || '',
      email: initialData.email || '',
      phone: initialData.phone || '',
      registrationType: initialData.registrationType || 'professional',
      numberOfFamilyMembers: initialData.numberOfFamilyMembers || '',
      address: initialData.address || '',
      expectations: initialData.expectations || '',
    });
  
    useEffect(() => {
      setFormData({
        fullName: initialData.fullName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        registrationType: initialData.registrationType || 'professional',
        numberOfFamilyMembers: initialData.numberOfFamilyMembers || '',
        address: initialData.address || '',
        expectations: initialData.expectations || '',
      });
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: name === "numberOfFamilyMembers" && value !== "" ? parseInt(value, 10) : value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const dataToSubmit: Partial<Omit<RegistrationEntry, 'id'|'submittedAt'|'paymentScreenshot'>> = {
        ...formData,
        numberOfFamilyMembers: formData.registrationType === 'family' 
            ? (formData.numberOfFamilyMembers ? String(formData.numberOfFamilyMembers) : undefined) 
            : undefined,
      };
      await updateRegistration(initialData.id, dataToSubmit); 
      onSubmit(dataToSubmit); 
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="edit-fullName">Full Name</Label>
          <Input id="edit-fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="edit-email">Email</Label>
          <Input id="edit-email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="edit-phone">Phone</Label>
          <Input id="edit-phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
         <div>
          <Label htmlFor="edit-registrationType">Registration Type</Label>
          <select name="registrationType" id="edit-registrationType" value={formData.registrationType} onChange={handleChange} className="w-full p-2 border rounded-md bg-input text-sm">
            <option value="professional">Professional</option>
            <option value="student">Student</option>
            <option value="family">Family</option>
            <option value="others">Others</option>
          </select>
        </div>
        {formData.registrationType === 'family' && (
          <div>
            <Label htmlFor="edit-numberOfFamilyMembers">Number of Family Members</Label>
            <Input id="edit-numberOfFamilyMembers" name="numberOfFamilyMembers" type="number" value={String(formData.numberOfFamilyMembers)} onChange={handleChange} min="1" className="text-sm"/>
          </div>
        )}
        <div>
          <Label htmlFor="edit-address">Address</Label>
          <Textarea id="edit-address" name="address" value={formData.address || ''} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="edit-expectations">Expectations</Label>
          <Textarea id="edit-expectations" name="expectations" value={formData.expectations || ''} onChange={handleChange} />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </form>
    );
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <main className="flex h-full w-full min-h-screen bg-background">
        <Sidebar collapsible="icon" className="border-r">
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2 justify-between">
               <h2 className={cn("font-headline text-2xl text-gradient-theme group-data-[collapsible=icon]:hidden", "text-glass-shadow")}>DMCC Admin</h2>
               <MainSidebarTrigger className="group-data-[collapsible=icon]:hidden" />
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
                <LogOutIcon className="mr-2 group-data-[collapsible=icon]:mr-0" />
                <span className="group-data-[collapsible=icon]:hidden">Logout</span>
             </Button>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 w-full p-4 md:p-6 lg:p-8 overflow-y-auto flex flex-col">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center">
                <MainSidebarTrigger className="md:hidden mr-2" /> 
                <h1 className={cn(
                  "text-3xl md:text-4xl font-headline font-semibold text-gradient-theme",
                  "text-glass-shadow"
                )}>
                  Event Registrations
                </h1>
             </div>
          </div>

          <RevealOnScroll>
            <LuminanceCard 
              className="p-4 md:p-6 mb-6 rounded-xl border border-border backdrop-blur-sm dark:bg-background/70 bg-background/70"
              glowColor="rgba(99, 102, 241, 0.3)"
              glowIntensity={0.4}
              interactive={true}
            >
              <p className="font-body text-sm text-card-foreground/80">
                Registrations are now fetched from and managed in the Firestore database.
                Changes should be reflected in real-time. If you encounter issues, please check your Firestore security rules.
              </p>
            </LuminanceCard>
          </RevealOnScroll>

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
            <MagneticElement>
              <LuminanceButton 
                variant="outline" 
                onClick={handleExportCSV} 
                className="text-sm"
                glowColor="rgba(99, 102, 241, 0.5)"
                pulseEffect={true}
              >
                <Download className="mr-2 h-5 w-5" />
                Export CSV
              </LuminanceButton>
            </MagneticElement>
          </div>
          <TooltipProvider>
            <RevealOnScroll>
              <LuminanceCard 
                className="overflow-hidden w-full flex-grow rounded-xl border border-border dark:bg-background/70 bg-background/70" 
                glowColor="rgba(99, 102, 241, 0.3)"
                glowIntensity={0.5}
                interactive={true}
              >
              <div className="w-full overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-subtitle">Full Name</TableHead>
                    <TableHead className="font-subtitle hidden md:table-cell">Email</TableHead>
                    <TableHead className="font-subtitle hidden lg:table-cell">Phone</TableHead>
                    <TableHead className="font-subtitle">Type</TableHead>
                    <TableHead className="font-subtitle hidden xl:table-cell">Address</TableHead>
                    <TableHead className="font-subtitle hidden xl:table-cell">Expectations</TableHead>
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
                        <TableCell className="font-body hidden xl:table-cell">
                          {reg.address ? (
                             <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="max-w-xs truncate cursor-pointer">
                                  <Home className="inline-block mr-1 h-4 w-4 text-muted-foreground" />
                                  {reg.address}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="top" align="start" className="max-w-sm">
                                <p className="text-sm whitespace-pre-wrap">{reg.address}</p>
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </TableCell>
                        <TableCell className="font-body hidden xl:table-cell">
                          {reg.expectations ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="max-w-xs truncate cursor-pointer">
                                  <MessageSquareText className="inline-block mr-1 h-4 w-4 text-muted-foreground" />
                                  {reg.expectations}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="top" align="start" className="max-w-sm">
                                <p className="text-sm whitespace-pre-wrap">{reg.expectations}</p>
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </TableCell>
                        <TableCell className="font-body hidden lg:table-cell">{format(new Date(reg.submittedAt), 'PPp')}</TableCell>
                        <TableCell className="text-right">
                          <span className="inline-flex items-center mr-1">
                            <MagneticElement strength={25}>
                              <LuminanceButton 
                                variant="ghost" 
                                size="icon" 
                                className="rounded-full" 
                                onClick={() => { setEditingRegistration(reg); setIsEditModalOpen(true); }}
                                glowColor="rgba(99, 102, 241, 0.4)"
                                glowIntensity={0.5}
                              >
                                <Edit className="h-4 w-4" />
                              </LuminanceButton>
                            </MagneticElement>
                          </span>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <span className="inline-flex items-center">
                                <MagneticElement strength={25}>
                                  <LuminanceButton 
                                    variant="ghost" 
                                    size="icon" 
                                    className="rounded-full text-destructive hover:text-destructive" 
                                    glowColor="rgba(220, 38, 38, 0.4)"
                                    glowIntensity={0.5}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </LuminanceButton>
                                </MagneticElement>
                              </span>
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
                      <TableCell colSpan={8} className="text-center font-body py-8">
                        No registrations found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              </div>
              </LuminanceCard>
            </RevealOnScroll>
          </TooltipProvider>

          {totalPages > 1 && (
            <RevealOnScroll>
              <div className="mt-6 flex justify-center items-center space-x-4 font-body">
                <MagneticElement>
                  <LuminanceButton
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    glowColor="rgba(99, 102, 241, 0.4)"
                    pulseEffect={false}
                  >
                    Previous
                  </LuminanceButton>
                </MagneticElement>
                
                <LuminanceCard
                  className="px-4 py-2 rounded-md dark:bg-background/70 bg-background/70 text-center"
                  glowColor="rgba(99, 102, 241, 0.3)"
                  glowIntensity={0.3}
                  interactive={false}
                >
                  <span>Page {currentPage} of {totalPages}</span>
                </LuminanceCard>
                
                <MagneticElement>
                  <LuminanceButton
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    glowColor="rgba(99, 102, 241, 0.4)"
                    pulseEffect={false}
                  >
                    Next
                  </LuminanceButton>
                </MagneticElement>
              </div>
            </RevealOnScroll>
          )}
        </SidebarInset>
      </main>

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
              onSubmit={async (data) => {
                if (editingRegistration) {
                  await updateRegistration(editingRegistration.id, data);
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

    