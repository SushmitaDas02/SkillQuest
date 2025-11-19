import React, { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

export default function HomeDashboard() {
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log("HomeDashboard mounted. currentUser:", currentUser);
  }, [currentUser]);

  return (
    <div className="p-6">
      <h1 className="text-3xl">Home Dashboard</h1>
      <pre className="mt-4 bg-gray-100 p-4 rounded">
        {JSON.stringify(currentUser, null, 2)}
      </pre>
    </div>
  );
}
