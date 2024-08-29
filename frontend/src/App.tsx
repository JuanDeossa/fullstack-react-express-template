import axios from "axios";
import { baseUrl } from "../routes/paths";

export const App = () => {
  //
  const handleFetchGet = async () => {
    //
    const url = `${baseUrl}/test`;

    try {
      //Fetch
      // const response = await fetch(url);
      // const data = await response.json();

      //Axios
      const response = await axios.get(url, {
        withCredentials: true,
      });
      const data = response.data;

      // debugger;

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchDelete = async () => {
    //
    const url = `${baseUrl}/test/4`;

    try {
      //Fetch
      // const response = await fetch(url, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // const data = await response.json();

      //Axios
      const response = await axios.delete(url, {
        withCredentials: true,
      });
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold m-2">I am the frontend</h1>
      <div className="flex flex-col gap-4">
        <button onClick={handleFetchGet}>Fetch Get</button>
        <button onClick={handleFetchDelete}>Fetch Delete</button>
      </div>
    </div>
  );
};
