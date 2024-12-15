'use client';
import { useState, useEffect, useMemo } from "react"
import PromptCard from "./PromptCard";

const PromptCardList = ({data, handleTagClick}) => {
  // change the CSS for this outer div
  return (
    <div className="mt-16 prompt_layer"> 
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        data.map((val) => (
          <PromptCard 
            key={val._id}
            handleTagClick={handleTagClick}
            post={val}
          />
        ))
      )}
    </div>
  );
  
} 

const Feed = () => {

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
          const posts = await fetch("/api/prompt");
          if (!posts.ok) {
              throw new Error(`Error: ${posts.status}`);
          }
          const post_data = await posts.json();
          setData(post_data);
          setFilterData(post_data);
      } catch (error) {
          console.log(error);
          
      }
    };
    
    fetchPosts();
  },[]);  
  
  useEffect(() => {
    debouncedFilter(searchText);
  },[searchText, setSearchText])
  
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };
  
  
  const debouncedFilter = useMemo(
    () =>
      debounce((query) => {
        if (!data.length) return;

        if (query === "") {
          setFilterData(data);
          return;
        }

        const filteredData = data.filter((val) => {
          const userName = val?.creator.username.toLowerCase();
          const dataPrompt = val?.prompt.toLowerCase();
          const dataTag = val?.tag.toLowerCase();
          return (
            userName.includes(query) ||
            dataPrompt.includes(query) ||
            dataTag.includes(query)
          );
        });

        setFilterData(filteredData);
      }, 300), 
    [data]
  );
  
  const handleSearchChange = (e) => {
    e.preventDefault();
    const query = e.target.value.toLowerCase();
    setSearchText(query);
  }
  
  // const handleSearchChange = (e) => {
  //   e.preventDefault();
  //   const query = e.target.value.toLowerCase();
  //   setSearchText(query);
    
  //   if(!data.length) {
  //     return
  //   }
  //   if(query === "") {
  //     setFilterData(data);
  //     return
  //   }
  //   const filteredData = data.filter((val, ind) => {
  //     let userName = val?.creator.username.toLowerCase();
  //     let dataPrompt = val?.prompt.toLowerCase();
  //     let dataTag = val?.tag.toLowerCase();
  //     return (userName.includes(query) 
  //     || dataPrompt.includes(query) || dataTag.includes(query))
  //   });
  //   setFilterData(filteredData);
  // }
  
  return (
    <div className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      
      <PromptCardList 
        data={filterData}
        handleTagClick={(tag) => {setSearchText(tag)}}
      />
      
    </div>
  )
}

export default Feed