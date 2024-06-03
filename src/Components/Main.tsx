import { useEffect, useRef, useState } from "react";
import { data } from "./Data";
import Results from "./Results";

const index = Math.floor(Math.random() * data.length);

function Text() {

  const [para, setPara] = useState(data[index]);
  const [typedWord, setTypedWord] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [wpm, setWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [time, setTime] = useState(60);
  const inputref = useRef<HTMLInputElement>(null);

  let timer: any;
  useEffect(() => {
    if (time && time > 0)
      timer = setTimeout(() => setTime((prev) => prev - 1), 1000);
    if (time < 0) {
      clearTimeout(timer);
      return;
    }
  }, [time]);


  useEffect(() => {
    if (inputref.current) {
      document.addEventListener("keydown", () => {
        inputref.current?.focus();
      });
    }
  }, []);


  const handleChange = (e: any) => {
    console.log(e);
    if (time > 0) {
      const val = e.target?.value;
      setTypedWord(val);
      setCharIndex(val.length);
      test(para, val);
    }
  };




  let total = useRef(0);
  let totalCorrect = useRef(0);



  const test = (original: string, typed: string) => {
    const mistakes = typed.split("").reduce((acc, char, index) => {
      return original[index] !== char ? acc + 1 : acc;
    }, 0);
    const charPerMin = typed.length - mistakes;
    const wordPerMin = charPerMin / 5;
    setWPM(wordPerMin);
    //
    if (typed.length > charIndex) {
      total.current = total.current + 1;
      if (original[charIndex] === typed[charIndex])
        totalCorrect.current = totalCorrect.current + 1;
    }
    setAccuracy((totalCorrect.current / total.current) * 100);
  };




  const restart = () =>{
    const rindex = Math.floor(Math.random() * data.length);
    if(rindex!==index){
      setPara(data[rindex]);
      setTypedWord("");
      setCharIndex(0);
      setWPM(0);
      setAccuracy(0);
      setTime(60);
    }
    else
      restart();
  }



  return (
    <>
      <div className="text-center mt-5 text-2xl">Test Your Typing Speed</div>
      <Results results={{ time, wpm, accuracy, restart }} />
      <input
        className=" opacity-0 "
        type="text"
        value={typedWord}
        onChange={handleChange}
        ref={inputref}
      />
      <div className=" text-justify mx-20 mb-20">
        {para.split("").map((character, index) => (
          <span
            className={`mx-[1px] p-[2px] ${
              charIndex === index ? "border-b-2 border-blue-500 " : ""
            } ${
              typedWord[index] === character
                ? "bg-green-400"
                : index < charIndex
                ? "bg-red-400"
                : ""
            }`}
            key={index}
          >
            {character}
          </span>
        ))}
      </div>
    </>
  );
}

export default Text;
