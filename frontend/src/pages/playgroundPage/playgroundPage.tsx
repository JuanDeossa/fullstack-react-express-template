import { LoginForm } from "@/components";

export const PlaygroundPage = () => {
  return (
    <div className="PlaygroundPage bg-gray-50 min-h-screen grid place-content-center relative">
      <h1 className="text-3xl font-bold absolute top-3 left-3 animate-pulse">Playground Page</h1>
      <LoginForm
        onSubmit={(formData) => {
          console.log(formData);
        }}
      />
    </div>
  );
};
