const mockMessages = [
  {
    id: 1,
    content: '{"text":"Hola Mundo!"}',
    transmitter_id: 101,
    receiver_id: 202,
    status: "sent",
    created_at: "2025-09-10 21:00:00",
  },
  {
    id: 2,
    content: '{"text":"Probando el sistema"}',
    transmitter_id: 102,
    receiver_id: 203,
    status: "pending",
    created_at: "2025-09-10 21:01:00",
  },
  {
    id: 3,
    content: '{"text":"Mensaje fallido"}',
    transmitter_id: 103,
    receiver_id: 204,
    status: "failed",
    created_at: "2025-09-10 21:02:00",
  },
];

export default mockMessages;
