import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [result, setResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      const url =
        "https://api.rawg.io/api/games?key=a5b6d39b1e624a97b6e81402205fb2d2";
      const res = await fetch(url);
      const resData = await res.json();
      setResult([...resData.results]);
      console.log(result[0]);
    }

    fetchData();
  },[]);
  async function search(evt) {
    evt.preventDefault();
    if (searchValue) {
      const searchUrl =
        "https://api.rawg.io/api/games?key=a5b6d39b1e624a97b6e81402205fb2d2&search=";
      const searchRes = await fetch(searchUrl + searchValue);
      const searchResData = await searchRes.json();
      console.log(searchResData.results[0]);
      setResult([...searchResData.results]);
      setSearchValue("");
    }
  }

  return (
    <div className="App">
      <div className="searchBar">
        <form onSubmit={search}>
          <input
            type="text"
            className="searchBar"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder="SEARCH YOUR FAVOURITE GAMES HERE"
          />
        </form>
      </div>
      <div>
        Order by:{" "}
        <select
          onChange={async (e) => {
            var option = "";
            if (e.target.value === "Popularity") {
              option = "rating";
            } else if (e.target.value === "Release") {
              option = "released";
            } else if (e.target.value === "Name") {
              option = "name";
            }
            const url =
              "https://api.rawg.io/api/games?key=a5b6d39b1e624a97b6e81402205fb2d2&ordering=-";
            const res = await fetch(url + option + "&page_size=10");
            const resData = await res.json();
            setResult([...resData.results]);
            console.log(result[0]);
          }}
        >
          <option>Popularity</option>
          <option>Name</option>
          <option>Upcoming Release</option>
        </select>
      </div>
      <div className="Game">
        {result.map((game) => {
          return (
            <div key={game.id} className="game-info">
              <div className="image">
                <img src={game.background_image} alt={game.name} />
              </div>
              <div className="headingDiv">
                <h3>{game.name}</h3>
                <div className="ratingDiv">{game.rating}</div>
                <div>Release date :{game.released}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
