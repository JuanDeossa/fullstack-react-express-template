import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
  IconEyeClosed,
  IconEyeOpen,
  // FormDescription,
} from "@/components";
import { errorMessages } from "@/utils/messages/error.messages";
import { useState } from "react";

const {
  email,
  password: { tooShort, tooLong },
} = errorMessages.loginForm;

const formSchema = z.object({
  email: z.string().email({
    message: email.invalid,
  }),
  password: z
    .string()
    .min(6, {
      message: tooShort,
    })
    .max(12, { message: tooLong }),
});

interface Props {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export const LoginForm = ({ onSubmit }: Props) => {
  //
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit_(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    onSubmit(values);
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form {...form}>
      <form
        data-testid="login-form"
        onSubmit={form.handleSubmit(onSubmit_)}
        className="space-y-4 border border-gray-400 p-8 rounded-lg"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="test@test.com" {...field} type="text" />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
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
              <div className="relative">
                <FormControl>
                  <Input
                    placeholder="****"
                    {...field}
                    type={showPassword ? "text" : "password"}
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                >
                  {showPassword ? <IconEyeClosed /> : <IconEyeOpen />}
                </button>
              </div>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Ingresar</Button>
      </form>
    </Form>
  );
};
