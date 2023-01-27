import { createContext, useContext, useEffect, useState } from "react";


 function useRoomSource(){
    const[room,setRoomState]=useState([])
    useEffect(()=>{
        fetch("/stays.json")
        .then(data=>data.json())
        .then((stays=>{
            setRoomState(stays)
        }))
    },[])
    return {room}
}
const RoomCtx=createContext([])
export function useRoom(){
    return useContext(RoomCtx)
}
export function RoomProvider({children}){
    console.log(children);
    return (
        <RoomCtx.Provider value={useRoomSource()}>
            {children}
        </RoomCtx.Provider>
    )
}