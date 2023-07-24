import React, {
  useEffect, useState, useRef
} from "react";
import { useParams } from 'react-router-dom'
import { getCarById } from '../api/carAction'
import "../styles/car-page.css"
import HeroModal from '../components/HeroModal'
import { io } from "socket.io-client";
import { getUserId } from "../config/api";

const CarPage = () => {
  const { id } = useParams()
  const [ car, setCar ] = useState({ car_picture: "", })
  const [ currentMessage, setCurrentMessage ] = useState("");
  const [ messageList, setMessageList ] = useState([]);

  const userId = getUserId();
  
  const socketRef = useRef(null); 

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io.connect('http://localhost:3001');

      socketRef.current.emit('join_room', id);

      socketRef.current.on('receive_message', (data) => {
        setMessageList((list) => [ ...list, data ]);
      });
    
    }
  }, []);


  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: id,
        author: userId,
        user_id: userId,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socketRef.current.emit("send_message", messageData);
      setMessageList((list) => [ ...list, messageData ]);
      setCurrentMessage("");
    }
  };


  
  
  const fetchCar = async () => {
    try {
      const data = await getCarById(id)
      console.log(data)
      setCar(data.car)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCar()
  }, [])

  
    
  return(
    <div className='mt-12'>
    
      <div
        className="car-picture flex justify-center items-center"
        style={{ backgroundImage: `url(${car.car_picture})` }}
      >
        <h1 className='text-9xl' style={{ color: "var(--tertiary)" }} >{car.car_name}</h1>
      </div>

      <HeroModal top="475px">
        <h1 className='mt-14'>{car.car_name}asdasdsa</h1>

      </HeroModal>

      <div className="max-w-5xl  mx-auto mt-24 px-6">
        <div className="flex flex-col items-center gap-3 mb-4 bg-amber-400 px-8 py-4 rounded-md">
          <textarea
            className="resize-none flex-1 border rounded-md p-2 mr-2 w-full"
            value={currentMessage}
            placeholder="Comment here...."
            onChange={(event) => setCurrentMessage(event.target.value)}
            // onKeyPress={(event) => event.key === 'Enter' && sendMessage()}
            rows={4} 
          />
          <div className="w-full flex justify-end">
            <button
              className="flex-shrink-0 border rounded-md px-4 py-2 bg-blue-600 text-white font-semibold"
              onClick={sendMessage}
            >
              &#9658;
            </button>
          </div>
        </div>
        <div className="flex flex-col-reverse">
          {messageList?.map((messageContent) => (
            <div className="overflow-x-clip flex flex-col h-max px-4 items-start mb-4 bg-gray-100 rounded-lg w-full" key={messageContent.id}>
              <div className="px-4 py-2 w-full">
                {messageContent.author.charAt(0).toUpperCase()}
                <p className="text-gray-800 whitespace-normal">
                  {messageContent?.message}
                </p>
              </div>
              <div className="text-gray-600 text-sm flex justify-end w-full items-center mt-1">
                <p>{messageContent.time}</p>
                <span className="mx-1">•</span>
                {/* <p>{messageContent.author}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>


     
    </div>
  )}

export default CarPage