import React, { useState, useEffect } from "react";
import dinner from "../assets/dinner.jpg";
import "../style/style.css";

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [timeStamp, setTimeStamp] = useState(0);
  const [timer, setTimer] = useState(undefined);

  const checkInside = (coordX, coordY) => {
    if (
      position.x - 150 < coordX &&
      coordX < position.x + 150 &&
      position.y - 75 < coordY &&
      position.y + 75 > coordY
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (timer) {
      window.clearTimeout(timer);
    }
    setTimer(window.setTimeout(() => setTimeStamp(timeStamp + 1), 3000));
  }, [timeStamp]);

  const people = [
    {
      coordX: 695,
      coordY: 210,
      text: [
        "…the trip was… incredible… so many… mon—…",
        "…your dad almost fell when the mon— grabbed the bag…",
        "…",
        "…",
        "…we walked for hours… legs dying…",
        "…the sunset was— oh wait— pass me the salt…",
        "…you should’ve seen the pool… infini— something…",
        "…I took so many photos… 300? 400?…",
        "…",
        "…next time we should go together… really…",
      ],
      name: "Mum",
    },
    {
      name: "Dad",
      coordX: 885,
      coordY: 221,
      text: [
        "…",
        "…the fisherman showed me a huge snap— snapper?…",
        "…prices were good… but crowded…",
        "…the market smell was strong— but authentic…",
        "…",
        "…",
        "…saw a stall with dried chilies… mountains…",
        "…we almost got lost turning into the side alley…",
        "…next time we explore the bigger market…",
        "…",
      ],
    },
    {
      name: "Grandma",
      coordX: 1129,
      coordY: 220,
      text: [
        "…the plane ride… seven hours… turbulence…",
        "…my ears were popping non-stop… horrible…",
        "…",
        "…they served the wrong meal… veggie became chick—…",
        "…I swear a baby screamed for like… three hours…",
        "…",
        "…landing was so rough… thought we bounced…",
        "…",
        "…immigration queue was… oh my god… forever…",
        "…but at least the view from the window was nice… clouds…",
      ],
    },
    {
      name: "Sister",
      coordX: 439,
      coordY: 205,
      text: [
        "…the squid there? soooo good… spicy…",
        "…",
        "…someone said the curry was too hot— weaklings…",
        "…the street food stall? ten stars…",
        "…I think I almost cried eating the chili crab…",
        "…the dessert thing… shaved ice? sweet-sweet— good…",
        "…",
        "…I miss the noodles already…",
        "…",
        "…I swear I gained like three kilos… worth it…",
      ],
    },
  ];

  useEffect(() => {
    const handleMouseMove = (event) => {
      // clientX and clientY provide coordinates relative to the browser viewport
      setPosition({ x: event.clientX, y: event.clientY });
    };

    // Attach event listener to the window when the component mounts
    window.addEventListener("mousemove", handleMouseMove);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <div>
      <div style={{ 
        width: "50%", 
        margin: "0 auto" 
        }}
        >
        <img className="" src={dinner} />
      </div>
      <div
        className="bounding-box"
        style={{
          position: "absolute",
          // Use transform for better performance than 'top' and 'left'
          // Translate by -50% to center the box on the cursor
          transform: `translate(${position.x - 150}px, ${position.y - 770}px)`,
          height: "150px",
          width: "300px",
          border: "1px solid white",
        }}
      />

      <div
        style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)", // center horizontally
        width: "80%",                  // stretch across most of the screen
        height: "200px",               // adjust height as needed
        backgroundColor: "rgba(50, 50, 50, 0.7)", // semi-transparent grey
        borderRadius: "10px",          // optional rounded corners
        padding: "20px",
        color: "#fff",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
        }}
      >
        {people.map((person) => (
          <p key={person.name}
          style={{
            filter: `blur(${timeStamp / 3}px)`,
            fontSize: "20px",
            lineHeight: 1.0,
            margin: "10px 0"
          }}
        >
          <strong>{person.name}:</strong>{" "}
          {checkInside(person.coordX, person.coordY)
            ? person.text[timeStamp]
            : ""}

          </p>
        ))}
      </div>
    </div>
  );
}
