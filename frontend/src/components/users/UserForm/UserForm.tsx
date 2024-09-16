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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  // FormDescription,
} from "@/components";
import { errorMessages } from "@/utils/messages/error.messages";
import { useState } from "react";
import { UserRole } from "@/types/user/user.interfaces";

const {
  email,
  password: { tooShort, tooLong },
} = errorMessages.userForm;

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
  name: z.string(),
  role: z.enum([
    UserRole.DEVELOPER,
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.USER,
  ]),
});

interface Props {
  onSubmit: (values: z.infer<typeof formSchema>, resetForm: () => void) => void;
  userRolesArray: UserRole[];
}

export const UserForm = ({ onSubmit, userRolesArray }: Props) => {
  //
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: userRolesArray[0] || "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit_(values: z.infer<typeof formSchema>) {
    onSubmit(values, form.reset);
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form {...form}>
      <form
        data-testid="user-form"
        onSubmit={form.handleSubmit(onSubmit_)}
        className="space-y-4 p-4"
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
                    autoComplete="new-password"
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="john doe" {...field} type="text" />
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {userRolesArray.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Registrar</Button>
      </form>
    </Form>
  );
};
