import io from "socket.io-client";
import { uuidv4 } from '../helpers'
import { useEffect } from "react";
const socket = io.connect(process.env.REACT_APP_BACKEND_URL);

export function useSocket() {
  const uniqueId = localStorage.getItem("userId") ?? uuidv4();

  useEffect(() => {
    localStorage.setItem('userId', uniqueId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function newUser() {
    socket.emit("newUser", uniqueId);
  }

  return { socket, newUser, userId: uniqueId };
}
