import React, { useEffect, useState } from 'react'
import urls from "../utils/urls.json";
import { Link } from 'react-router-dom';
const server_url = urls.server_url;

const SearchUser = () => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
 
   const userList = async () => {
     const val = await fetch(`${server_url}/user/`, {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
       },
     });
     const resp = await val.json();
     setUsers(resp);
   }; 
     
    useEffect(() => {
      userList();
    },[])

    const handleSearch = ()=>{
        setUsers(users.filter((r) => {
            return r._id == search;
        }))
    }
 
  return (
    <div>

      <input
      className='bg-gray-600 w-[20rem] p-2 m-1 h-10 text-white'
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter UserId"
      />{" "}
      <button className="bg-black p-2" onClick={handleSearch}>
        search
      </button>
      <div
        className="flex flex-row overflow-x-scroll "
        style={{ scrollbarWidth: "none" }}
      >
        {users.map((r) => {
          return (
            <div className="flex flex-col m-1 bg-gray-500 p-1">
              <div>{r.userName}</div>
              <div>{r.email}</div>
              <Link to={`/reuse/${r._id}`}>
                {" "}
                <button>chat</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchUser