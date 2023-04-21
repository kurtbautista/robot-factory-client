export const getRobots = async () => {
  const response = await fetch("http://localhost:3100/robots", {
    method: "GET",
  });
  return response;
};

export const postExtinguish = async (id: number) => {
  const response = await fetch(
    `http://localhost:3100/robots/${id}/extinguish`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    }
  );
  return response;
};

export const postRecycle = async (ids: number[]) => {
  const response = await fetch(`http://localhost:3100/robots/recycle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recycleRobots: ids,
    }),
  });
  return response;
};

export const putShipment = async (ids: number[]) => {
  const response = await fetch(
    `http://localhost:3100/robots/shipments/create`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shipments: ids,
      }),
    }
  );
  return response;
};
