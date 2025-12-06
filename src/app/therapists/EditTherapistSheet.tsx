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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFirestore, FirestorePermissionError, errorEmitter } from '@/firebase';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import type { Therapist } from './page';
import { useEffect } from 'react';

const editTherapistSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    status: z.enum(['Active', 'Pending', 'Inactive']),
    plan: z.string().min(1, 'Plan is required'),
    planName: z.string().min(1, 'Plan name is required'),
    subscriptionStatus: z.string().min(1, 'Subscription status is required'),
});

type EditTherapistForm = z.infer<typeof editTherapistSchema>;

export function EditTherapistSheet({ open, onOpenChange, therapist }: { open: boolean, onOpenChange: (open: boolean) => void, therapist: Therapist | null }) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const form = useForm<EditTherapistForm>({
    resolver: zodResolver(editTherapistSchema),
    defaultValues: {
        fullName: '',
        email: '',
        status: 'Pending',
        plan: '',
        planName: '',
        subscriptionStatus: '',
    }
  });

  useEffect(() => {
    if (therapist) {
        form.reset({
            fullName: therapist.full_name || '',
            email: therapist.email || '',
            status: therapist.status || 'Pending',
            plan: therapist.plan || '',
            planName: therapist.plan_name || '',
            subscriptionStatus: therapist.subscription_status || '',
        });
    }
  }, [therapist, form]);

  const onSubmit = (data: EditTherapistForm) => {
    if (!firestore || !therapist) return;
    
    const therapistRef = doc(firestore, 'therapists', therapist.id);
    const updateData = {
      full_name: data.fullName,
      email: data.email,
      status: data.status,
      plan: data.plan,
      plan_name: data.planName,
      subscription_status: data.subscriptionStatus,
      updated_at: serverTimestamp(),
    };

    updateDoc(therapistRef, updateData)
      .then(() => {
         toast({
          title: 'Therapist Updated',
          description: "The therapist's information has been updated.",
        });
        onOpenChange(false);
      })
      .catch(error => {
        const permissionError = new FirestorePermissionError({
          path: therapistRef.path,
          operation: 'update',
          requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit Therapist</SheetTitle>
          <SheetDescription>Update the therapist's details.</SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="plan" render={({ field }) => (<FormItem><FormLabel>Plan (ID)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="planName" render={({ field }) => (<FormItem><FormLabel>Plan Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="subscriptionStatus" render={({ field }) => (<FormItem><FormLabel>Subscription Status</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />

              <SheetFooter className="pt-4">
                 <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
