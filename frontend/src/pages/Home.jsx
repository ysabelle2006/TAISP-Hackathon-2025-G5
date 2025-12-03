import React, { useState, useEffect } from "react";
import dinner from "../assets/dinner.jpg";

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [timeStamp, setTimeStamp] = useState(0);
  const [focused, setFocused] = useState(null); // track currently focused person

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
      name: "Mum",
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

  // Detect entering/leaving a person’s bounding box
  useEffect(() => {
    const inside = people.find((p) => checkInside(p.coordX, p.coordY));
    if (inside) {
      if (focused !== inside.name) {
        // we left and came back to a new person → advance dialogue
        setFocused(inside.name);
        setTimeStamp((prev) => prev + 1);
      }
    } else {
      setFocused(null);
    }
  }, [position]);

  return (
    <div>
      <div style={{ width: "50%", margin: "0 auto" }}>
        <img src={dinner} alt="Dinner scene" />
      </div>
      <div
        className="bounding-box"
        style={{
          position: "absolute",
          transform: `translate(${position.x - 150}px, ${position.y - 655}px)`,
          height: "150px",
          width: "300px",
          border: "1px solid white",
        }}
      />

{/* Textbox */}
<div className="textbox">
  {people.map((person) => (
    <p
      key={person.name}
      className={`textbox-line ${
        !checkInside(person.coordX, person.coordY) ? "muted" : ""
      }`}
      style={{ filter: `blur(${timeStamp / 3}px)` }}
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

