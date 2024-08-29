import axios from "axios";
import { baseUrl } from "../routes/paths";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

export const App = () => {
  //

  return (
    <div className="App">
      <BrowserRouter>
        {
          <Routes>
            <Route path="/" element={<C1 />} />
            <Route path="/test" element={<C2 />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        }
      </BrowserRouter>
    </div>
  );
};

const C1 = () => {
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
    <>
      <h1 className="text-3xl font-bold m-2">I am the frontend</h1>
      <div className="flex flex-col gap-4 items-center">
        <button onClick={handleFetchGet}>Fetch Get</button>
        <button onClick={handleFetchDelete}>Fetch Delete</button>
        <Link to="/test">Go to test</Link>
      </div>
    </>
  );
};

const C2 = () => {
  return (
    <div className="grid place-content-center h-screen text-8xl">
      <Link to="/">Go Back</Link>
    </div>
  );
};
