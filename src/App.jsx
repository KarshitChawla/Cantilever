import { useEffect, useState } from "react";
import "./App.css";
import NewsGrid from "./assets/Components/NewsGrid";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";

function App() {
  const [news, setNews] = useState([]);
  const [apichange, setApiChange] = useState("android");
  const [searchQuery, setSearchQuery] = useState("");

  function change(e) {
    setSearchQuery(e.target.value);
  }

  function submit(e) {
    e.preventDefault();
    searchQuery ? setApiChange(searchQuery) : setApiChange("android");
  }

  const api = async () => {
    try {
      let response = await fetch(
        `https://newsapi.org/v2/everything?q=${apichange}&apiKey=7442c13ed0bd46d6be887b227296eb41`
      );
      let result = await response.json();
      setNews(result.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
    }
  };

  useEffect(() => {
    api();
  }, [apichange]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 navbar p-4 shadow-md flex items-center justify-between z-50">
        <form
          onSubmit={submit}
          className="flex items-center space-x-4 max-w-lg w-full"
        >
          <span className="flex items-center space-x-2 bg-gray-800 rounded-full px-3 py-2 shadow-inner w-full">
            <SearchIcon className="text-gray-400" />
            <input
              type="text"
              className="bg-transparent border-none outline-none text-gray-200 placeholder-gray-500 w-full"
              placeholder="Search..."
              onChange={change}
            />
          </span>
          <Button
            type="submit"
            variant="outlined"
            className="text-purple-300 border-purple-300 hover:bg-purple-700"
          >
            Search
          </Button>
        </form>
        <div className=" mr-3 hidden md:flex absolute right-0">
          <span className="text-xl font-semibold">NewsNow</span>
        </div>
      </div>
      <main className="pt-20">
        <NewsGrid news={news} />
      </main>
    </>
  );
}

export default App;
