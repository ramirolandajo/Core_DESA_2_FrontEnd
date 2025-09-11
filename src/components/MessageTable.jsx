import React, { useState, useEffect } from "react";
import mockMessages from "../data/mockMessages";

export default function MessageTable() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // 🔹 Simulación de llegada de mensajes con mocks
    let index = 0;
    const interval = setInterval(() => {
      if (index < mockMessages.length - 1) {
        setMessages((prev) => [...prev, mockMessages[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 🔹 Preparado para cuando se use un WebSocket o EventBus real
    /*
    const socket = new WebSocket("ws://localhost:4000/messages");
    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prev) => [...prev, newMessage]);
    };
    return () => socket.close();
    */
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-11/12 max-w-5xl bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Mensajes entrantes
        </h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Content</th>
                <th className="border border-gray-300 px-4 py-2">Transmitter</th>
                <th className="border border-gray-300 px-4 py-2">Receiver</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{msg.id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {msg.content}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {msg.transmitter_id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {msg.receiver_id}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 font-semibold ${
                      msg.status === "sent"
                        ? "text-green-600"
                        : msg.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {msg.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {msg.created_at}
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    Esperando mensajes...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
