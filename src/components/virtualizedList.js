import React, { useEffect, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import "./styles.css";

const CHUNK_SIZE = 100000; // Load rows in chunks
const ITEM_HEIGHT = 50; // Height of each item
const VISIBLE_ITEMS = 10; // Number of visible items in the viewport

export default function VirtualizedList() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(
    Number(localStorage.getItem("scrollOffset")) || 0
  );

  // Generate mock data for a given chunk
  const generateChunkData = (start, count) => {
    return Array.from({ length: count }, (_, index) => `Item #${start + index + 1}`);
  };

  // Load initial data
  useEffect(() => {
    setIsLoading(true);
    const initialData = generateChunkData(0, CHUNK_SIZE);
    setData(initialData);
    setIsLoading(false);
  }, []);

  // Handle scroll and dynamic loading
  const handleScroll = ({ scrollOffset }) => {
    localStorage.setItem("scrollOffset", scrollOffset);

    const lastRenderedIndex = Math.floor(scrollOffset / ITEM_HEIGHT) + VISIBLE_ITEMS;
    if (lastRenderedIndex >= data.length - 5 && !isLoading) {
      // Near the end of current data, load the next chunk
      setIsLoading(true);
      const newData = generateChunkData(data.length, CHUNK_SIZE);
      setTimeout(() => {
        setData((prevData) => [...prevData, ...newData]);
        setIsLoading(false);
      }, 1000); // Simulate network delay
    }
  };

  // Scroll to saved position on mount
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo(scrollOffset);
    }
  }, [scrollOffset]);

  // Render individual row
  const Row = ({ index, style }) => (
    <div style={style} className="row">
      {data[index] || "Loading..."}
    </div>
  );

  return (
    <div className="list-container">
      {isLoading && <div className="spinner">Loading...</div>}
      <List
        className="virtualized-list"
        height={ITEM_HEIGHT * VISIBLE_ITEMS}
        itemCount={data.length}
        itemSize={ITEM_HEIGHT}
        width={"100%"}
        ref={listRef}
        onScroll={handleScroll}
      >
        {Row}
      </List>
    </div>
  );
}
