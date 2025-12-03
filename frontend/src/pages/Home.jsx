import React, { useState, useEffect } from "react";
import dinner from "../assets/dinner.jpg";
import "../style/style.css";
import { Card, Input, Modal, Radio, Space, Statistic } from "antd";
import { HeartFill, Heartbreak } from "react-bootstrap-icons";

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [timeStamp, setTimeStamp] = useState(0);
  const [timer, setTimer] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [next, setNext] = useState(false);
  const [lives, setLives] = useState([true, true, true]);
  const [q1Value, setQ1Value] = useState(1);
  const [q2Value, setQ2Value] = useState(1);
  const [q3Value, setQ3Value] = useState(1);
  const [q4Value, setQ4Value] = useState(1);
  const [answerRec, setAnswerRec] = useState([]);
  const [isOpen2, setIsOpen2] = useState(false);
  const { Timer } = Statistic;
  const { TextArea } = Input;
  const [dueTime, setDueTime] = useState(undefined);
  const [typedAns, setTypedAns] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);

  const checkSubmit = () => {
    setAnswerRec([q1Value === 1, q2Value === 2, q3Value === 3, q4Value === 4]);
    setIsOpen(false);
    setNext(true);
    console.log(next);
  };

  const checkSubmit2 = () => {
    console.log("here");
    if (
      !(
        typedAns === "I like the view with the infinity pool like Mum" ||
        typedAns === "I love the market like Dad, so many interesting foods" ||
        typedAns ===
          "The view of the sunset from the plane was the best like Grandma said" ||
        typedAns ===
          "The food was the best thing of the trip. Sister too, right?"
      )
    ) {
      const newLive = lives;
      for (let i = 0; i < lives.length; i++) {
        if (lives[i]) {
          newLive[i] = !lives[i];
          break;
        }
      }
      setLives(newLive);
    }
    setIsOpen2(false);
    setNext(false);
  };

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
    if ((!isOpen || next) && !isOpen2) {
      setTimer(
        window.setTimeout(() => {
          setTimeStamp((prev) => prev + 1);
          setIsOpen(timeStamp == 9 ? true : false);
          setIsOpen2(timeStamp == 15 ? true : false);
          console.log(timeStamp);
        }, 2000)
      );
    }
  }, [timeStamp, next]);

  useEffect(() => {
    if (isOpen2) {
      setDueTime(Date.now() + 30 * 1000);
    }
  }, [isOpen2]);

  const people = [
    {
      coordX: 766,
      coordY: 253,
      text: [
        "…the trip was… incredible… so many… mon—…",
        "…your dad almost fell when the mon— grabbed the bag…",
        "…",
        "…",
        "…we walked for hours… legs dying…",
        "…the sunset was— oh wait— pass me the salt…",
        "…you should've seen the pool… infini— something…",
        "…I took so many photos… 300? 400?…",
        "…",
        "…next time we should go together… really…",
        "",
        "…view really… nice",
        "…",
        "…",
        "…",
        "… did you catch? ah ma ask you things…",
      ],
      name: "Mum",
    },
    {
      name: "Dad",
      coordX: 959,
      coordY: 259,
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
        "…if not, miss out… better food",
        "",
        "…",
        "…",
        "…",
        "…son, ah ma ask you question",
        "…",
      ],
    },
    {
      name: "Grandma",
      coordX: 1205,
      coordY: 252,
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
        "",
        "…ah boy ah, what about you… we say so much, which one… like best?",
        "…",
        "…",
        "…",
        "… it's ok, maybe he never catch it",
      ],
    },
    {
      name: "Sister",
      coordX: 509,
      coordY: 245,
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
        "",
        "…but now… must exercise to…",
        "…",
        "…",
        "…",
        "… ah ma ask you, of all… activities… said, which… like best?",
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
        <div style={{marginRight:"50px",marginTop:"10px"}}>
          <p style={{ display: "inline", marginRight: "15px", color:"black"}}>
            Frustration Level:
          </p>
          <div
            style={{
              display: "inline-flex",
              width: "100px",
              justifyContent: "space-between",
            }}
          >
            {lives.map((life) =>
              life ? (
                <div style={{color:"black"}}>
                  <HeartFill />
                </div>
              ) : (
                <div style={{color:"black"}}>
                  <Heartbreak />
                </div>
              )
            )}
          </div>
        </div>
        <button onClick={() => window.location.reload()}>Restart</button>
        <button onClick={() => alert("Returning to menu...")}>
          Return to menu
        </button>
        <button onClick={() => setShowInstructions(true)}>Instructions</button>
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
          <h2 style={{ color: "black" }}>📖 How to Play</h2>
          <p style={{ color: "black" }}>
            Move your mouse to control the bounding box. When you hover over a
            person, their dialogue advances. The textbox shows what they are
            saying. Try to uncover the full story before time runs out!
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
            top: position.y - 140, // center relative to mouse
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
              filter: `blur(${timeStamp / 8}px)`,
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

      {isOpen && (
        <Modal
          title={<p>Checkpoint!</p>}
          open={isOpen}
          closable={false}
          width="90%"
          style={{
            maxWidth: "1000px", // Increased max width
            padding: 0,
          }}
          footer={
            <button type="button" onClick={checkSubmit}>
              Submit
            </button>
          }
          destroyonHidden={true} // This helps reset the modal position
          mask={true}
          maskClosable={false}
          keyboard={false}
          zIndex={1001}
        >
          <p>Q1: From Mum's fragments, what is she mainly talking about?</p>
          <Radio.Group
            vertical
            value={q1Value}
            onChange={(e) => {
              setQ1Value(e.target.value);
            }}
            options={[
              {
                value: 1,
                label: "The overall vacation and how much she enjoyed the trip",
              },
              { value: 2, label: "How tiring her work week has been" },
              { value: 3, label: "A problem with the hotel booking" },
              { value: 4, label: "Losing her luggage at the airport" },
            ]}
          />

          <br />

          <p>Q2: What is Grandmother describing?</p>
          <Radio.Group
            vertical
            value={q2Value}
            onChange={(e) => {
              setQ2Value(e.target.value);
            }}
            options={[
              { value: 1, label: "A scary boat ride" },
              { value: 2, label: "A long and turbulent plane journey" },
              { value: 3, label: "A taxi driver who got lost" },
              { value: 4, label: "A crowded museum tour" },
            ]}
          />

          <br />
          <p>Q3: What is Sister excitedly talking about?</p>
          <Radio.Group
            vertical
            value={q3Value}
            onChange={(e) => {
              setQ3Value(e.target.value);
            }}
            options={[
              { value: 1, label: "Learning how to surf" },
              { value: 2, label: "Shopping at the local markets" },
              { value: 3, label: "The amazing spicy food she ate on the trip" },
              { value: 4, label: "Feeding animals at the zoo" },
            ]}
          />
          <br />
          <p>Q4: What is Dad focusing on in his fragmented speech?</p>
          <Radio.Group
            vertical
            value={q4Value}
            onChange={(e) => {
              setQ4Value(e.target.value);
            }}
            options={[
              { value: 1, label: "Riding bicycles through the city" },
              { value: 2, label: "Visiting historical temples" },
              { value: 3, label: "Booking a boat trip for fishing" },
              { value: 4, label: "Exploring the busy local markets" },
            ]}
          />
        </Modal>
      )}

      {isOpen2 && (
        <Modal
          title={<p>Respond!</p>}
          open={isOpen2}
          closable={false}
          width="90%"
          style={{
            maxWidth: "1000px", // Increased max width
            padding: 0,
          }}
          footer={
            <button type="button" onClick={checkSubmit2}>
              Submit
            </button>
          }
          destroyonHidden={true} // This helps reset the modal position
          mask={true}
          maskClosable={false}
          keyboard={false}
          zIndex={1001}
        >
          <p>Choose the most appropriate response and type it down:</p>
          <Timer
            type="countdown"
            title="Time Left:"
            value={dueTime}
            onFinish={() => {
              checkSubmit2();
            }}
          />
          <Space vertical>
            <Card size="small" title="Option 1" style={{ width: 600 }}>
              <p style={{ userSelect: "none" }}>
                Huh? Sorry, I didn't catch it. Can repeat?
              </p>
            </Card>
            <Card size="small" title="Option 2" style={{ width: 600 }}>
              {answerRec[0] ? (
                <p style={{ userSelect: "none" }}>
                  I like the view with the infinity pool like Mum
                </p>
              ) : (
                <p>I want to go Japan next time</p>
              )}
            </Card>
            <Card size="small" title="Option 3" style={{ width: 600 }}>
              {answerRec[1] ? (
                <p style={{ userSelect: "none" }}>
                  I love the market like Dad, so many interesting foods
                </p>
              ) : (
                <p>We had to wake up so early for the market</p>
              )}
            </Card>
            <Card size="small" title="Option 4" style={{ width: 600 }}>
              {answerRec[2] ? (
                <p style={{ userSelect: "none" }}>
                  The view of the sunset from the plane was the best like
                  Grandma said
                </p>
              ) : (
                <p>The plane was so rough like Grandma said</p>
              )}
            </Card>
            <Card size="small" title="Option 5" style={{ width: 600 }}>
              {answerRec[3] ? (
                <p style={{ userSelect: "none" }}>
                  The food was the best thing of the trip. Sister too, right?
                </p>
              ) : (
                <p>I am so full from dinner</p>
              )}
            </Card>
          </Space>
          <br />
          <br />
          <TextArea
            style={{ borderRadius: "5px" }}
            rows={4}
            placeholder="Type here..."
            onChange={(e) => {
              setTypedAns(e.target.value);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
