import { apiGet } from "./api";
const API_BASE: string = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

let cachedUser: any = null;

export const getUser = async () => {
  if (cachedUser) return cachedUser; // Return stored data if we have it

  const token = localStorage.getItem("token");
  if (!token) return null
;

  const res = await apiGet("/api/profile", token);
  cachedUser = res.user; 
  return cachedUser;
};


export const getPosts = async () => {
  const res = await fetch(`${API_BASE}/post/service`);
  if(!res.ok){
    throw new Error("Failed to fetch posts");
  }
  const data =await res.json();
  console.log("Fetched posts:", data);
  return data ;
};