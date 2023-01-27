import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { AiFillStar } from "react-icons/ai"
import { FaSearch } from "react-icons/fa"
import { RoomProvider, useRoom } from './Store'
import logo from "./assets/logo.svg"

function LocationInput(){
  const[isLocationopen,setLocationopen]=useState(false)
  return <div>
    <button className='col-start-1 col-end-4 p-4 border-r-2'>location</button>
    {
      isLocationopen&&<div>
        <button>Helsinki,Finland</button>
        <button>Turku,Finland</button>
        <button>Vassa,Finland</button>
        <button>oulu,Finland</button>
      </div>
    }
  </div>
}
function MobileHeader() {
  return (
    <div className=''>
      {/* logo */}
      <picture>
        <img src={logo} alt="windbnb" />
      </picture>
      {/* click to search */}
      <header>
        <div className='border mt-5 mb-7 grid grid-cols-9  rounded-2xl shadow-md '>
          <button className='col-start-1 col-end-4 p-4 border-r-2'>location</button>
          <button className='col-start-4 col-end-8 border-r-2 text-gray-400'>Add guests</button>
          <button className='flex items-center justify-center  col-start-8 col-end-10 '><FaSearch className='text-red-400  text-xl' /></button>
        </div>
        <div className='w-full border border-cyan-600'>
          <div>

          </div>
          <div>

          </div>
        </div>
      </header>
      {/*  show the search items */}
    </div>
  )
}
function Room({ room }) {
  console.log(room);
  //w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4
  return (
    <div className='w-full overflow-hidden '>
      <picture className=' image-container  '>
        <img className='w-full h-auto max-h-96 md:max-h-72 object-cover rounded-3xl md:rounded-2xl' src={room.photo} alt="room-photo" />
      </picture>
      <article className='p-2 flex flex-col gap-2'>
        <div className=' flex justify-between'>
          {
            room.superHost ? (<div className='flex gap-3 items-center'>
              <p className='border border-black rounded-full py-0.5 px-3'> super host</p>
              <p className="room-type text-gray-400">{room.type}</p>
            </div>) : (<p className="room-type text-gray-400">{room.type}</p>)
          }

          <p className="room-rating font-bold   flex items-center gap-1 text-orange-400"><AiFillStar /> 4.4</p>
        </div>
        <div>
          <h3 className='title text-lg font-semibold'>{room.title}</h3>
        </div>
      </article>
    </div>)
}
function RoomList() {
  const { room } = useRoom()
  console.log(room);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {
        room.map((room) => {
          return <Room room={room} />
        })
      }
    </div>
  )
}
function App() {
  return (
    <RoomProvider>
      <div className="App px-10 md:px-12 lg:px-16 ">
        <MobileHeader />
        <RoomList />
      </div>
    </RoomProvider>
  )
}

export default App
