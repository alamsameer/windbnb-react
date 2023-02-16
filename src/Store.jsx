import { createContext, useContext, useMemo, useCallback, useEffect, useState, useReducer } from "react";
import stays from './assets/stays.json'
function useRoomSource() {
    // const[room,setRoomState]=useState([])
    const [{ room, search }, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "setRoom":
                return { ...state, room: action.payload }
            case "setSearch":
                return { ...state, search: action.payload }
        }
    }, { room: [], search: { city: "", guest: 9999 } })
    //  use of effect for fetching data
    useEffect(() => {
        dispatch({ type: 'setRoom', payload: stays })
    }, [])
    const setSearch = useCallback((search) => {
        dispatch({ type: "setSearch", payload: search })
    }, [])
    const filteredRoom = useMemo(() => {
        return room.filter((r) => {
            const { city, guest } = search
            return r.maxGuests <= guest && r.city.includes(city)
        })
    }, [room, search]);
    return { room: filteredRoom, search, setSearch }
}
const RoomCtx = createContext([])
export function useRoom() {
    return useContext(RoomCtx)
}
export function RoomProvider({ children }) {
    return (
        <RoomCtx.Provider value={useRoomSource()}>
            {children}
        </RoomCtx.Provider>
    )
}