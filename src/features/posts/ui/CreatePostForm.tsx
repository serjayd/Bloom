"use client";

import { Button } from "@/components/ui/button";
import { Editor } from "./EditorWrapper";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { PostFormValues, postSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/utils/uploadthing";

interface Props {
  collections: {
    id: string;
    name: string;
    slug: string;
  }[];
}

// AFTER POST CREATE ROUTER TO POST SLUG SINGLE POST PAGE
// DISPLAY POSTS

export default function CreatePostForm({ collections }: Props) {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      collectionId: "",
      content: [],
      bannerUrl: undefined,
    },
  });

  const onSubmit = async (data: PostFormValues) => {
    const res = await createPost(data);

    if (!res.success) {
      toast.error(res.error);
      return;
    }

    if (!res.post) {
      toast.error("Post is not found");
      router.push("/explore");
      return;
    }

    router.push(`/explore/${res.post.slug}`);
    toast.success("Post has been published!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" type="button">
          Preview Post
        </Button>
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Publishing" : "Publish"}
        </Button>
      </div>
      <Controller
        name="bannerUrl"
        control={control}
        render={({ field }) => (
          <div className="space-y-3">
            <FieldLabel>Post Banner (optional )</FieldLabel>

            <UploadButton
              endpoint="imageUploader"
              className="border-2 border-dashed border-border rounded-xl p-8"
              onClientUploadComplete={(res) => {
                const file = res?.[0];

                if (!file) {
                  return;
                }

                field.onChange(file.ufsUrl);

                toast.success("Banner uploaded");
              }}
              onUploadError={(error) => {
                toast.error(error.message);
              }}
            />

            {field.value && (
              <p className="text-xs text-muted-foreground">
                Banner uploaded successfully
              </p>
            )}

            {errors.bannerUrl && (
              <FieldError>{errors.bannerUrl.message}</FieldError>
            )}
          </div>
        )}
      />
      <Field>
        <FieldLabel htmlFor="title">Post Title</FieldLabel>
        <Input
          type="text"
          id="title"
          placeholder="Untitled"
          {...register("title")}
        />
        {errors.title && <FieldError>{errors.title.message}</FieldError>}
      </Field>

      <Field>
        <FieldLabel htmlFor="collection">Collection</FieldLabel>
        <Controller
          name="collectionId"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a collection" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {collections.map((collection) => (
                    <SelectItem key={collection.id} value={collection.id}>
                      {collection.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.collectionId && (
          <FieldError>{errors.collectionId.message}</FieldError>
        )}
      </Field>

      <Editor
        onChange={(content) => {
          setValue("content", content, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }}
      />
    </form>
  );
}
