import { createContext, useContext,useMemo ,  useCallback,useEffect, useState,useReducer } from "react";


 function useRoomSource(){
    // const[room,setRoomState]=useState([])
    const[{room,search},dispatch]=useReducer((state,action)=>{
        switch(action.type){
            case "setRoom":
                return {...state,room:action.payload}
            case "setSearch":
                return {...state,search:action.payload}
        }
    },{room:[],search:{city:"",guest:9999}})
    //  use of effect for fetching data
    useEffect(()=>{
        fetch("/stays.json")
        .then(data=>data.json())
        .then((stays=>{
            dispatch({type:'setRoom',payload:stays})
        }))
    },[])
     const setSearch=useCallback((search)=>{
        dispatch({type:"setSearch",payload:search})
     },[])
     const filteredRoom=useMemo(()=>{return room.filter((r)=>{
        const {city,guest}=search
        console.log({city,guest});
        console.log( r.city===city,r.city.includes(city),typeof(city),typeof(r.city))
        return r.maxGuests<=guest && r.city.includes(city)
     })},[room,search]);
     console.log("filteredRoom",filteredRoom);
    return {room : filteredRoom,search,setSearch}
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