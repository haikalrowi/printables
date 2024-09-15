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
import { Skeleton } from "@/components/ui/skeleton";
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
  const coverWatch = form.watch("cover")?.[0];
  const coverPreviewSrc = useMemo(() => {
    if (coverWatch) {
      return URL.createObjectURL(coverWatch);
    } else if (album?.cover) {
      return album.cover;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coverWatch]);
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
            <FormItem>
              <FormLabel>Cover</FormLabel>
              <FormControl>
                <Input type="file" {...form.register("cover")} />
              </FormControl>
              <FormDescription />
              <FormMessage />
              <div className="aspect-square w-1/4">
                {coverPreviewSrc ? (
                  <Image
                    src={coverPreviewSrc}
                    alt="Cover preview"
                    width={16 * 6}
                    height={16 * 6}
                    className="size-full rounded-md object-cover"
                  />
                ) : (
                  <Skeleton className="size-full" />
                )}
              </div>
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
