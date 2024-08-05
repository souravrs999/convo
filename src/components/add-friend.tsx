"use client";
import { Button } from "./ui/button";
import { Icons } from "@/lib/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogClose,
} from "./ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { addFriendValidator } from "@/lib/validations/add-friend";

export default function AddUser() {
  const [successState, setSuccessState] = useState<boolean>(false);
  const form = useForm<z.infer<typeof addFriendValidator>>({
    resolver: zodResolver(addFriendValidator),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addFriendValidator>) {
    try {
      await axios.post("/api/friends/add", {
        email: values.email,
      });
      setSuccessState(true);
    } catch (err) {
      if (err instanceof AxiosError) {
        form.setError("email", { message: err.response?.data });
        return;
      }
      form.setError("email", { message: "Something went wrong." });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="w-full p-0 bg-white text-foreground hover:text-accent hover:bg-white"
        >
          <FontAwesomeIcon className="w-5 h-5" icon={Icons.userPlus} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="mb-2">Chat request</DialogTitle>
          <DialogDescription>
            Once the user accepts your chat request you can start chatting with
            him.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="John@doe.com" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                  {successState && (
                    <p className="text-xs text-green-500">
                      Friend request sent.
                    </p>
                  )}
                </FormItem>
              )}
            />
            <div className="flex gap-2 mt-4">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  type="submit"
                  className="w-full hover:bg-muted-foreground hover:text-primary border-muted-foreground"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="w-full">
                Request
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
