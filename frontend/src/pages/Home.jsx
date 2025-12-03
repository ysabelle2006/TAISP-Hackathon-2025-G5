import React, { useState, useEffect } from "react";
import dinner from "../assets/dinner.jpg";

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [timeStamp, setTimeStamp] = useState(0);
  const [focused, setFocused] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [paused, setPaused] = useState(false);

  const checkInside = (coordX, coordY) => {
    return (
      position.x - 150 < coordX &&
      coordX < position.x + 150 &&
      position.y - 75 < coordY &&
      position.y + 75 > coordY
    );
  };

  const people = [
    {
      name: "Mum",
      coordX: 695,
      coordY: 192,
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
    },
    {
      name: "Dad",
      coordX: 885,
      coordY: 201,
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
      coordY: 197,
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
      coordY: 185,
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
      setPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const inside = people.find((p) => checkInside(p.coordX, p.coordY));
    if (inside && focused !== inside.name) {
      setFocused(inside.name);
      setTimeStamp((prev) => prev + 1);
    } else if (!inside) {
      setFocused(null);
    }
  }, [position]);

  useEffect(() => {
    if (!paused && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [paused, timeLeft]);

  return (
    <div
      style={{
        backgroundColor: "#fff9c4",
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        fontFamily: "Verdana, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          background: "#fffdd8ff",
          border: "0px solid #333",
          padding: "10px 20px",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
    <button onClick={() => setPaused(!paused)}>
      {paused ? "Resume" : "Pause"}
    </button>
        <button onClick={() => window.location.reload()}>Restart</button>
        <button onClick={() => alert("Returning to menu...")}>Return to menu</button>
        <button onClick={() => setShowInstructions(true)}>Instructions</button>
      </div>

      {/* Timer */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "20px",
          background: "#f5f5f5",
          padding: "10px",
          borderRadius: "8px",
          border: "2px solid #333",
          fontWeight: "bold",
        }}
      >
        ⏳ Time Left: {timeLeft}s
      </div>

      {/* Instructions Pop-out */}
      {showInstructions && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fffde7",
            border: "3px solid #333",
            padding: "20px",
            borderRadius: "10px",
            width: "60%",
            zIndex: 1000,
          }}
        >
          <h2>📖 How to Play</h2>
          <p>
            Move your mouse to control the bounding box. When you hover over a person, their
            dialogue advances. The textbox shows what they are saying. Try to uncover the full
            story before time runs out!
          </p>
          <button onClick={() => setShowInstructions(false)}>Close</button>
        </div>
      )}

      {/* Centralised Dinner Image */}
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          position: "relative", // important for bounding box overlay
        }}
      >
        <img
          src={dinner}
          alt="Dinner scene"
          style={{ border: "0px solid #333", maxWidth: "80%", height: "auto" }}
        />

        {/* Bounding Box restored */}
        <div
          style={{
            position: "absolute",
            top: position.y - 75, // center relative to mouse
            left: position.x - 150,
            height: "150px",
            width: "300px",
            border: "2px solid #333",
            backgroundColor: "rgba(255,255,255,0.2)",
            pointerEvents: "none", // so it doesn’t block mouse events
          }}
        />
      </div>

      {/* Textbox at Bottom */}
      <div
        style={{
          width: "80%",
          backgroundColor: "rgba(255, 255, 255, 1)",
          color: "black",
          padding: "15px",
          borderRadius: "10px",
          border: "2px solid #333",
          marginBottom: "20px",
        }}
      >
        {people.map((person) => (
          <p
            key={person.name}
            style={{
              filter: `blur(${timeStamp / 3}px)`,
              opacity: checkInside(person.coordX, person.coordY) ? 1 : 0.5,
              marginBottom: "8px",
            }}
          >
            <strong>{person.name}:</strong>{" "}
            {checkInside(person.coordX, person.coordY)
              ? person.text[Math.min(timeStamp, person.text.length - 1)]
              : ""}
          </p>
        ))}
      </div>
    </div>
  );
}