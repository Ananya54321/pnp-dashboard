"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { appendData } from "@/utils/appendData";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { CircleCheck } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),

  newsletterName: z
    .string()
    .min(2, { message: "Newsletter name must be at least 2 characters." }),
  niche: z.string().min(2, { message: "Niche must be at least 2 characters." }),
  newsletterLink: z.string().url({ message: "Please enter a valid URL." }),
  subscribersCount: z
    .number()
    .nonnegative({ message: "Subscribers count must be a positive number." }),
});

export const WaitlistSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setIsSubmitSuccess] = useState(false);
  const [numberOfUsersInWaitlist, setNumberOfUsersInWaitlist] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      newsletterName: "",
      niche: "",
      newsletterLink: "",
      subscribersCount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setNumberOfUsersInWaitlist(
      (numberOfUsersInWaitlist) => numberOfUsersInWaitlist + 1
    );

    const range = "Sheet1!A" + (1 + numberOfUsersInWaitlist);
    const userData = [{ ...values }];
    // @ts-expect-error - appendData function type needs fixing
    await appendData(range, userData);

    setIsSubmitting(false);
    form.reset();
    alert("Submitted");
    setIsSubmitSuccess(true);
  }

  return (
    <div>
      {submitSuccess ? (
        <div className="flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto text-center flex justify-center items-center flex-col">
            <CircleCheck className="h-20 w-20" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Form Submitted Successfully
            </h1>
            <p className="mt-4 text-muted-foreground">
              Thank you for submitting the form. We will notify you about your
              card shortly.
            </p>
            <div className="mt-6">
              <AlertDialogCancel className="flex-1 w-full bg-purple-500">
                Close
              </AlertDialogCancel>
            </div>
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-4">
              {Object.keys(formSchema.shape).map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={key as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={`Enter ${key}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <div className="flex gap-2 justify-between text-md">
                <FormItem>
                  <FormLabel>open rate</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0.0"
                      name="openrate"
                      id="openrate"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <FormLabel>CTR</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0.0"
                      name="ctr"
                      id="ctr"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-20">
              <Button className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Join Beta Testing"}
              </Button>
              <AlertDialogCancel className="flex-1">Cancel</AlertDialogCancel>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
