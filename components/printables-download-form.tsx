"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogProps } from "@radix-ui/react-dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { create } from "@/actions/album-download";
import { Button } from "@/components/ui/button";
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
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import { AlbumArtworkProps } from "./album-artwork";

interface PrintablesDownloadFormProps
  extends React.FormHTMLAttributes<HTMLFormElement>,
    Pick<DialogProps, "onOpenChange">,
    Partial<Pick<AlbumArtworkProps, "album">> {}

export function PrintablesDownloadForm({
  className,
  onOpenChange,
  album,
}: PrintablesDownloadFormProps) {
  const FormSchema = z.object({
    email: z.string().email({
      message: "Must be email.",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    if (!onOpenChange) {
      return;
    }
    const { email } = data;
    await create({ email, Album: { connect: { id: album?.id } } });
    onOpenChange(false);
    toast({ title: "OK" });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
      >
        <FormField
          control={form.control}
          name="email"
          render={() => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...form.register("email")} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Download
        </Button>
      </form>
    </Form>
  );
}
