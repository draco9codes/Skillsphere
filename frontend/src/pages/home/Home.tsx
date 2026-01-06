import Card from "../../components/card/Card";
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
    <div className="bg-rose-100 min-h-screen flex items-center justify-center">
      <Card
        title="Display Card"
        image="frontend\src\assets\react.svg"
        description={displayMessage}
      />
    </div>
  );
}

export default Home;
