"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogProps } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { upsert } from "@/actions/album";
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
import { createClient } from "@/lib/supabase/client";
import { albumCover } from "@/lib/supabase/constants";

import { AlbumArtworkProps } from "./album-artwork";

interface AlbumFormProps
  extends Pick<DialogProps, "onOpenChange">,
    Partial<Pick<AlbumArtworkProps, "album">> {}

export function AlbumForm({ onOpenChange, album }: AlbumFormProps) {
  const supabase = createClient();
  const FormSchema = z.object({
    name: z.string().min(1, { message: "Must be minimal 1 char." }),
    artist: z.string().min(1, { message: "Must be minimal 1 char." }),
    cover: z.instanceof(FileList),
    google_drive_uc_id: z.string().url({ message: "Must be URL." }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: album?.name,
      artist: album?.artist,
      cover: undefined,
      google_drive_uc_id: album?.google_drive_uc_id,
    },
  });
  const coverWatch = form.watch("cover")?.[0];
  const coverPreviewSrc = useMemo(() => {
    if (coverWatch) {
      return URL.createObjectURL(coverWatch);
    } else if (album?.cover) {
      const res = supabase.storage.from(albumCover).getPublicUrl(album.cover);
      return res.data.publicUrl;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coverWatch]);
  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    if (!onOpenChange) {
      return;
    }
    const {
      name,
      artist,
      cover: { 0: coverFile },
      google_drive_uc_id,
    } = data;
    let coverPath = album?.cover;
    if (coverPath) {
      if (coverFile?.size) {
        await supabase.storage.from(albumCover).update(coverPath, coverFile);
      }
    } else {
      coverPath = `${Date.now()}`;
      await supabase.storage.from(albumCover).upload(coverPath, coverFile);
    }
    await upsert({
      id: album?.id ?? "",
      name,
      artist,
      cover: coverPath,
      google_drive_uc_id,
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
              <FormDescription />
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
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cover"
          render={() => (
            <FormItem className="relative">
              <FormLabel>Cover</FormLabel>
              <div className="aspect-video w-[33%]">
                {coverPreviewSrc ? (
                  <Image
                    src={coverPreviewSrc}
                    alt="Cover preview"
                    width={16 * 6}
                    height={16 * 6}
                    className="size-full rounded-md object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center rounded-md bg-muted text-sm">
                    Choose file
                  </div>
                )}
              </div>
              <FormControl>
                <Input
                  className="absolute bottom-0 top-6 h-auto w-[33%] opacity-0"
                  type="file"
                  accept="image/*"
                  {...form.register("cover")}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="google_drive_uc_id"
          render={() => (
            <FormItem>
              <FormLabel>Google Drive UC ID (URL)</FormLabel>
              <FormControl>
                <Input {...form.register("google_drive_uc_id")} />
              </FormControl>
              <FormDescription />
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
