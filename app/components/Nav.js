"use client"
import React from 'react'
import style from '@/app/components/style.module.css'
import Link from 'next/link'
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useContext} from "react";
import { DataContext } from "../context";

const Nav = () => {
  const router = useRouter();
    const [Data, setData] = useContext(DataContext);


    const GetTrending = async () => {
        const { data } = await axios.get("https://api.giphy.com/v1/gifs/translate?api_key=g3TEgnU2pGODGJrcvHcn36HwOhK3E8l9&s=random");
        setData(data);
        router.push("/list");
        console.log(data);
    };

    
  return (
    <>
      <div className={style.navbar}>
      <div className={style.part1}>
                 <img src="https://m.media-amazon.com/images/I/41WRcQlA3EL.png" alt="" />
            </div>
            <div className={style.part2}>
               <Link style={{textDecoration:'none',color:'white',fontSize:'1.2rem'}} href='/'>Home</Link>
                <Link style={{textDecoration:'none',color:'white',fontSize:'1.2rem'}} href='/list' onClick={GetTrending}>Random Gifs</Link>
                <Link style={{textDecoration:'none',color:'white',fontSize:'1.2rem'}} href='/search'>Search Image🔍</Link>
                {/* <Link style={{textDecoration:'none',color:'white',fontSize:'1.2rem'}} href='/'>LogOut</Link> */}
                {/* <Link style={{textDecoration:'none',color:'white',fontSize:'1.2rem'}} href='/like'>Liked Gifs</Link> */}
            </div>
      </div>
    </>
  )
}

export default Nav