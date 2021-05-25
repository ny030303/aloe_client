import io from "socket.io-client";
export const serverLink = "http://localhost:54000/"; //  "http://1.238.234.196:54000/";
export const clientLink = "http://localhost:3000/";
export const socket = io(serverLink, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});