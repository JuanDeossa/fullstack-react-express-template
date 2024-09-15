import { throwErrorAlert } from "@/utils/alerts";
import { useEffect } from "react";

export const PlaygroundPage = () => {
  useEffect(() => {
    throwErrorAlert("Hello World");
  }, []);
  return (
    <div className="PlaygroundPage bg-gray-50 min-h-screen grid place-content-center relative">
      <h1 className="text-3xl font-bold absolute top-3 left-3 animate-pulse">
        Playground Page
      </h1>
      <div>{/* Content */}</div>
    </div>
  );
};
