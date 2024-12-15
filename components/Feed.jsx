'use client';
import { useState, useEffect, useMemo } from "react"
import PromptCard from "./PromptCard";
import SkeletonLoader from "./SkeletonLoader";

const PromptCardList = ({data, handleTagClick, loading, noposts}) => {
  // change the CSS for this outer div
  console.log(`Loading state : ${loading}`);
  
  return (
    <div className="mt-16 w-full flex flex-row justify-between flex-wrap"> 
      {loading? (
        <SkeletonLoader />
      ) : 
      (!loading && noposts && !(data?.length) && <p>No Posts yet ...</p>  )||
      (
        data.map((val) => (
          <PromptCard 
            key={val._id}
            handleTagClick={handleTagClick}
            post={val}
          />
        ))
      )
      }
    </div>
  );
  
} 

const Feed = () => {

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noPosts, setNoPosts] = useState(false);
  
  useEffect(() => {
    
    const timeOut = setTimeout(() => {
      setIsLoading(false);
      setNoPosts(true);
    }, 15000);
    
    const fetchPosts = async () => {
      try {
          const posts = await fetch("/api/prompt");
          if (!posts.ok) {
              setNoPosts(true);
              throw new Error(`Error: ${posts.status}`);
          }
          const post_data = await posts.json();
          
          if(post_data?.length > 0) {
            setData(post_data);
            setFilterData(post_data);
          } else {
            setNoPosts(true);
          }
      } catch (error) {
          console.log(error);
          setNoPosts(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
    
    return () => clearTimeout(timeOut);

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
        loading={isLoading}
        noposts={noPosts}
      />
      
    </div>
  )
}

export default Feed