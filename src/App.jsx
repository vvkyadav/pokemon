import React, { useState, useEffect } from "react";
import axios from "axios";

const PokeList = () => {
  const [pokeList, setPokeList] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedPoke, setSelectedPoke] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios.get("https://pokeapi.co/api/v2/pokemon");
      setPokeList(result.data.results);
      setNextPage(result.data.next);
      setLoading(false);
    };
    fetchData();
  }, []);

  const loadMore = async () => {
    setLoading(true);
    const result = await axios.get(nextPage);
    setPokeList([...pokeList, ...result.data.results]);
    setNextPage(result.data.next);
    setLoading(false);
  };

  const selectPoke = async (url) => {
    setLoading(true);
    const result = await axios.get(url);
    setSelectedPoke(result.data);
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", }}>Pokemon List</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {pokeList.map((pokemon, index) => (
          <div
            key={index}
            onClick={() => selectPoke(pokemon.url)}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "#05EA89",
              margin: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "15px",
              cursor: "pointer",
            }}
          >
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && nextPage && (
        <button onClick={loadMore} style={{
          display: 'block',
          margin: 'auto',
          width: "95px",
          height: "35px",
          backgroundColor: "#FEEC90",
          borderRadius: "15px",
          cursor: "pointer",
        }}>Load More</button>
      )}
      {selectedPoke && (
        <div style={{
          display: 'block',
          margin: 'auto',
          width: "85px",
        }} >
          <h2>{selectedPoke.name}</h2>
          <img src={selectedPoke.sprites.front_default} alt={selectedPoke.name} />
          <p>Height: {selectedPoke.height}</p>
          <p>Weight: {selectedPoke.weight}</p>
        </div>
      )}
    </div>
  );
};

export default PokeList;
