import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import { AiFillStar, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { FaSearch, FaMinus, FaPlus } from "react-icons/fa"
import { RoomProvider, useRoom } from './Store'

import logo from "./assets/logo.svg"

function LocationInput() {


}
function Navbar() {
  const [issearchBox, setSearchBox] = useState(true)
  const searchBoxRef = useRef()
  const className = issearchBox ?   'scale-0 opacity-0 z-[-9999]':'scale-100'
  // handling the visibilty of the search box
  const handleSearchBox = (e) => {
    console.log(e);
    if (searchBoxRef.current == e.target.parentElement) {
      setSearchBox(!issearchBox)
    }
  }
  console.log(issearchBox);
  return (
    <div>
      {/* logo */}
      <picture>
        <img src={logo} alt="windbnb" />
      </picture>
      <div className='border mt-5 mb-7 grid grid-cols-9  rounded-2xl shadow-md ' ref={searchBoxRef} onClick={(e) => { handleSearchBox(e) }}>
        <button className='col-start-1 col-end-4 p-4 border-r-2'>location</button>
        <button className='col-start-4 col-end-8 border-r-2 text-gray-400'>Add guests</button>
        <button className='flex items-center justify-center  col-start-8 col-end-10 '><FaSearch className='text-red-400  text-xl' /></button>
      </div>

      <MobileHeader className={className} setSearchBox={setSearchBox} />

    </div>
  )
}
function MobileHeader({ className,setSearchBox }) {
  const [childCounter, setChildCounter] = useState(0)
  const [adultCounter, setAdultCounter] = useState(0)
  const [locationSelected, setSelectedLocation] = useState(" choose location")
  const searchContainer=useRef(null)
  const locationRef = useRef(null)
  const locationselected = (e) => {
    console.log(locationRef.current == e.target.parentElement)
    if (locationRef.current == e.target.parentElement) {
      setSelectedLocation(e.target.textContent)
    }

  }
  const closeSearchBox=(e)=>{
    if(searchContainer.current.id == e.target.id){
      setSearchBox(true)
    }
  }
  return (
    <div id='search-container' ref={searchContainer} className={`fixed bg-black bg-opacity-50 right-0 left-0 bottom-0 top-0  ${className} transition-all duration-500 ease-out`} onClick={(e)=>{closeSearchBox(e)}} >

      {/* dropdown in mobile  */}
      <div className='w-full border transition-transform tr h-full sm:h-auto  sm:bottom-auto sm:p-10 bg-white flex flex-col sm:grid sm:grid-cols-3 p-4'>
        {/* location */}
        <div className=' flex flex-col items-center  mb-4'>
          <button className='border-2 border-black border-black-600 w-4/5 rounded shadow-md text-start font-medium p-2 mb-4'>
            Location
            <span className='block text-gray-400 text-sm'>{locationSelected}</span>
          </button>
          <div className='w-3/5 p-4' ref={locationRef} onClick={(e) => { locationselected(e) }}>
            {
              true && <>
                <button className='block w-full mb-2'>Helsinki,Finland</button>
                <button className='block w-full mb-2'>Turku,Finland</button>
                <button className='block w-full mb-2'>Vassa,Finland</button>
                <button className='block w-full mb-2'>oulu,Finland</button>
              </>
            }
          </div>
        </div>
        {/* guest */}
        <div className=' flex flex-col items-center mb-4 '>
          <button className='border-2 border-black border-black-600 text-start w-4/5 rounded shadow-md font-medium p-2 mb-4'>Add guests
            <p>
              <span className='text-gray-400 text-sm'>{adultCounter > 0 ? `${adultCounter} adults` : "adults"},</span>
              <span className='text-gray-400 text-sm'>{childCounter > 0 ? `${childCounter} child` : 'child'}</span>
            </p>
          </button>
          <div className='flex gap-5 flex-col'>
            <div className='flex gap-5 w-4/5'>
              <p>Adults</p>
              <div className='flex gap-5 rounded-2xl border-2 p-2 border-black '>
                <button onClick={() => { setAdultCounter(adultCounter => adultCounter == 0 ? adultCounter : adultCounter - 1) }}><AiOutlineMinus /></button> <span className='font-bold text-lg block'>{adultCounter}</span><button onClick={() => { setAdultCounter(adultCounter + 1) }}><AiOutlinePlus /></button>
              </div>
            </div>
            <div className='flex gap-7'>
              <p>Child</p>
              <div className='flex gap-5 rounded-2xl border-2 p-2 border-black'>
                <button onClick={() => { setChildCounter(childCounter => childCounter == 0 ? childCounter : childCounter - 1) }}><AiOutlineMinus /></button><span className='font-bold text-lg block'>{childCounter}</span><button onClick={() => { setChildCounter(childCounter + 1) }}><AiOutlinePlus /></button>
              </div>
            </div>
          </div>
        </div>
        <div className='justify-center flex mt-4 sm:mt-0'>
          <button className='bg-red-400 text-white p-2.5 rounded-3xl min-w-fit h-fit w-2/4'>Search</button>
        </div>
      </div>
      {/*  show the search items */}
    </div >
  )
}
function Room({ room }) {

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
        <Navbar />
        <RoomList />
      </div>
    </RoomProvider>
  )
}

export default App
