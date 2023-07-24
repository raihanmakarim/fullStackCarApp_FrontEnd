import React, {
  useEffect, useState, useRef,useMemo 
} from "react";
import { useParams } from 'react-router-dom'
import { getCarById } from '../api/carAction'
import "../styles/car-page.css"
import HeroModal from '../components/HeroModal'
import { io } from "socket.io-client";
// import { socket } from "../config/socket"


const CarPage = () => {
  const { id } = useParams()
  const [ car, setCar ] = useState({ car_picture: "", })
  const [ username, setUsername ] = useState("");
  const [ room, setRoom ] = useState("");
  const [ showChat, setShowChat ] = useState(false);
  const [ comments, setComments ] = useState([]);
  
  const socketRef = useRef(null); 

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io.connect('http://localhost:3001');

      socketRef.current.emit('join_room', id);



      

      socketRef.current.on('receive_message', (data) => {
        setMessageList((list) => [ ...list, data ]);
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.emit('join_room', id);
    }
  }, []);

  //   useEffect(() => {
    
    
  //     socket.emit("join_room", id);
      

  //     return () => {
     
  //       socket.off("join_room");

      

  //     };
  //   }, []);

  const [ currentMessage, setCurrentMessage ] = useState("");
  const [ messageList, setMessageList ] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: id,
        author: username,
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

  //   useEffect(() => {
  //     socketRef.current.on("receive_message", (data) => {
  //       setMessageList((list) => [ ...list, data ]);
  //     });
  //   }, [ socketRef.current ]);
  
  
  //   const fetchCar = async () => {
  //     try {
  //       const data = await getCarById(id)
  //       console.log(data)
  //       setCar(data.car)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  //   useEffect(() => {
  //     fetchCar()
  //   }, [])

  
    
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

      <div className="margin-auto bg-slate-300 mt-24 flex justify-center items-center">
        {messageList?.map((messageContent) => (
          <div
            className=""
          >
            <div>
              <div className="">
                <p>{messageContent.message}</p>
              </div>
              <div className="">
                <p id="time">{messageContent.time}</p>
                <p id="author">{messageContent.author}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>


     
     
    </div>
  )}

export default CarPage