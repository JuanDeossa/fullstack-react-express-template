import { useForm } from "react-hook-form";
import { envs } from "../config/envs";
import { useAuth } from "../hooks/useAuth";
import { loginService } from "../api/services";

export const LoginForm = () => {
  //
  const { setUser } = useAuth();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: envs.EMAIL, // pending
      password: envs.PASSWORD, // pending
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    const user = await loginService({
      email: data?.email || "",
      password: data?.password || "",
    });

    if (!user) return;

    setUser(user);
  };
  //
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="login-form flex flex-col gap-5 w-64"
    >
      <h2 className="text-3xl font-bold">Login</h2>
      <input
        type="email"
        placeholder="email"
        {...register("email", { required: true })}
      />
      <input
        type="text"
        placeholder="password"
        {...register("password", { required: true })}
      />
      <button type="submit" className="border bg-indigo-600 text-white">
        Enviar
      </button>
    </form>
  );
};
