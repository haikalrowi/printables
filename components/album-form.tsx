"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogProps } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { upsert } from "@/actions/album";
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
import { toast } from "@/hooks/use-toast";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 3 characters.",
  }),
  artist: z.string(),
  cover: z.instanceof(File).optional(),
});

interface AlbumFormProps extends DialogProps {
  action: "create" | "update" | "delete";
}

export function AlbumForm({ action, onOpenChange }: AlbumFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      artist: "",
      cover: undefined,
    },
  });

  const onSubmit: Parameters<typeof form.handleSubmit>[0] = async (
    data,
    event,
  ) => {
    if (!onOpenChange) {
      return;
    }
    const formData = new FormData(event?.target);
    const { name, artist } = FormSchema.parse(Object.fromEntries(formData));
    if (action === "create") {
      await upsert({
        id: "",
        name,
        artist,
        cover:
          "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80",
      });
      toast({ title: "OK" });
    } else if (action === "update") {
      await upsert({
        id: "",
        name,
        artist,
        cover:
          "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80",
      });
      toast({ title: "OK" });
    } else if (action === "delete") {
      toast({ title: "OK" });
    }
    onOpenChange(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="artist"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artist</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cover"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  {...field}
                  value={undefined}
                  onChange={undefined}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
