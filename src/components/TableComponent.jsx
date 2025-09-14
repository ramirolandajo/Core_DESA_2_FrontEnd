import React, { useEffect, useState } from "react";
import api from "../api/api";
import PayloadModal from "./PayloadModal";

export default function TableComponent({ endpoint }) {
  const [data, setData] = useState([]); 
  const [allData, setAllData] = useState([]); 
  const [selectedPayload, setSelectedPayload] = useState(null); // 👈 nuevo estado

  const fetchData = async (endpoint) => {
    const res = await api.get(`/core/${endpoint}`);
    console.log(res.data);
    setAllData(res.data);
    setData([]);
  };

  useEffect(() => {
    fetchData(endpoint);
  }, [endpoint]);

  useEffect(() => {
    if (allData.length === 0) return;

    let index = -1;
    let intervalId;

    const startInterval = () => {
      const randomTime = Math.floor(Math.random() * 2000) + 1000;

      intervalId = setInterval(() => {
        if (index < allData.length - 1) {
          setData((prev) => [...prev, allData[index]]);
          index++;
          clearInterval(intervalId);
          startInterval();
        } else {
          clearInterval(intervalId);
        }
      }, randomTime);
    };

    startInterval();

    return () => clearInterval(intervalId);
  }, [allData]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${dd}/${mm}/${yy} ${hh}:${min}`;
  };

  return (
    <div className="w-full h-[90vh] overflow-y-auto rounded-2xl">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="sticky top-0 bg-[#2d2d2d] text-white uppercase text-xs">
          <tr>
            <th className="px-4 py-2">EventId</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Payload</th>
            <th className="px-4 py-2">Origin</th>
            <th className="px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.slice().reverse().map((item) => {
            const [method, description] = item.type.split(":").map((s) => s.trim());
            return (
              <tr
                key={item.id}
                className="border-b border-gray-700 hover:bg-[#242424]"
              >
                <td className="px-4 py-2">{item.eventId}</td>
                <td className="px-4 py-2">{method}</td>
                <td className="px-4 py-2">{description}</td>
                <td
                  className="px-4 py-2 max-w-xs truncate break-words overflow-hidden cursor-pointer hover:underline"
                  onClick={() => setSelectedPayload(item.payload)} // 👈 abre modal
                >
                  {item.payload}
                </td>
                <td className="px-4 py-2">{item.originModule}</td>
                <td className="px-4 py-2">{formatDate(item.timestamp)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal */}
      {selectedPayload && (
        <PayloadModal
          payload={selectedPayload}
          onClose={() => setSelectedPayload(null)}
        />
      )}
    </div>
  );
}
