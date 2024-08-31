import { useForm } from "react-hook-form";
import { createUser } from "../../services";
import { CreateUser } from "../../types";

interface UserFormProps {
  fetchUsers: () => Promise<void>;
}

export const UserForm = ({ fetchUsers }: UserFormProps) => {
  //
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (formData: CreateUser) => {
    const { email, password, name } = formData;

    const user = await createUser({
      email: email,
      password: password,
      name: name,
    });

    if (!user) {
      alert("No se pudo crear el usuario");
    } else {
      fetchUsers();
      alert("Usuario creado: " + user.email);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 border border-gray-400 rounded-lg max-w-80 min-w-64 w-4/5 p-10"
    >
      <h1 className="text-2xl font-bold">Registrar usuario</h1>
      <input
        className="border border-gray-400 rounded-md pl-3"
        {...register("email", { required: true })}
        placeholder="Email"
        type="email"
      />
      <input
        className="border border-gray-400 rounded-md pl-3"
        {...register("password", { required: true })}
        placeholder="Password"
        type="password"
        autoComplete="new-password"
      />
      {/* <input
        className="border border-gray-400 rounded-md pl-3"
        {...register("name", { required: false })}
        placeholder="Name"
        type="text"
      /> */}
      <button
        type="submit"
        className="border border-gray-400 rounded-md bg-gray-400 p-1 font-semibold"
      >
        Registrar
      </button>
    </form>
  );
};
