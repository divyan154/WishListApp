"use client";
import React from "react";
import { useEffect, useState } from "react";

export default function Page() {
  const [message, setMessage] = useState("loading...");
  useEffect(() => {
    fetch("http://localhost:3001/api")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        console.log(data);
      });
  }, []);
  return <div>{message}</div>;
}
