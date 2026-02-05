import axios from "axios";
import "./Home.css";
import { useEffect, useState } from "react";

function Home() {
  const [displayMessage, setDisplayMessage] = useState("");

  useEffect(() => {
    async function getDisplayMessage() {
      try {
        const response = await axios.get("http://localhost:8083/home/welcome", {
          auth: {
            username: "admin",
            password: "secret123",
          },
        });

        setDisplayMessage(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getDisplayMessage();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-[#000C40] to-[#F0F2F0]"></div>
  );
}

export default Home;
