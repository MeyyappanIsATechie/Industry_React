import React, { useState } from 'react'

const PaginatedGames = () => {
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastId, setLastId] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const pageSize = 20;

    const fetchGames = async () => {

        if(isLoading || !hasMore) return;
        setIsLoading(true);
        try {const response = await fetch(`http://localhost:3001/api/games?lastId=${lastId}&pageSize=${pageSize}`);
        const newGames = await response.json();
        if(newGames.length > 0) {
            setGames((prevGames) => [...prevGames, ...newGames]);
            setLastId(newGames[newGames.length - 1].id);
        }
    } catch (error) {
        console.error('Error:', error);
    }
        setIsLoading(false);
    };

    React.useEffect(() => {
        fetchGames();
    }, []);

  return (
    <div>
        <h1>Games</h1>
        <ul>
            {games.map((game) => (
            <li key={game.id}>{game.name}</li>
            ))}
        </ul>
        {isLoading && <p>Loading...</p>}
        <button onClick={fetchGames} disabled={isLoading}>
            Load More
        </button>
    </div>
  )
}

export default PaginatedGames