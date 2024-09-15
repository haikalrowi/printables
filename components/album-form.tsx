"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogProps } from "@radix-ui/react-dialog";
import { SubmitHandler, useForm } from "react-hook-form";
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

import { AlbumArtworkProps } from "./album-artwork";

interface AlbumFormProps
  extends Pick<DialogProps, "onOpenChange">,
    Partial<Pick<AlbumArtworkProps, "album">> {}

export function AlbumForm({ onOpenChange, album }: AlbumFormProps) {
  const FormSchema = z.object({
    name: z.string(),
    artist: z.string(),
    cover: z.instanceof(FileList),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: album?.name,
      artist: album?.artist,
      cover: undefined,
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    if (!onOpenChange) {
      return;
    }
    const { name, artist } = data;
    await upsert({
      id: album?.id ?? "",
      name,
      artist,
      cover:
        "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80",
    });
    toast({ title: "OK" });
    onOpenChange(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={() => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...form.register("name")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="artist"
          render={() => (
            <FormItem>
              <FormLabel>Artist</FormLabel>
              <FormControl>
                <Input {...form.register("artist")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cover"
          render={() => (
            <FormItem>
              <FormLabel>Cover</FormLabel>
              <FormControl>
                <Input type="file" {...form.register("cover")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
