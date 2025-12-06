'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth, useFirestore, setDocumentNonBlocking, initiateEmailSignUp } from '@/firebase';
import { doc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const addTherapistSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type AddTherapistForm = z.infer<typeof addTherapistSchema>;

export function AddTherapistSheet({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const form = useForm<AddTherapistForm>({
    resolver: zodResolver(addTherapistSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: AddTherapistForm) => {
    if (!auth || !firestore) return;
    try {
      // This is a temporary auth instance for user creation, it won't sign in the admin.
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      const therapistProfile = {
        user_id: user.uid,
        full_name: data.fullName,
        email: data.email,
        status: 'Pending',
        plan: 'free',
        plan_name: 'Free Tier',
        subscription_status: 'Active',
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      };
      
      const docRef = doc(firestore, 'therapists', user.uid);
      setDocumentNonBlocking(docRef, therapistProfile, {});

      toast({
        title: 'Therapist Added',
        description: `${data.fullName} has been added successfully.`,
      });
      onOpenChange(false);
      form.reset();
    } catch (error: any) {
      console.error("Error creating therapist:", error);
      toast({
        variant: "destructive",
        title: "Error adding therapist.",
        description: error.message || "Could not create the therapist.",
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Therapist</SheetTitle>
          <SheetDescription>Fill in the details to add a new therapist.</SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <SheetFooter className="pt-4">
                 <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Adding...' : 'Add Therapist'}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
