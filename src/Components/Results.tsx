type propsval = {
  time: number;
  wpm: number;
  accuracy: number;
  restart : Function
};

interface result {
  results: propsval;
}

function Results({ results }: result) {
  const { time, wpm, accuracy, restart } = results;
 
  return (
    <div className="flex justify-center items-center space-x-12 my-10 text-center text-white ">
      <div className="bg-green-400 p-4 rounded-full w-20 h-20">
        {time > 0 ? (
          <>
            <div className=" font-extrabold text-lg ">{time}</div>
            <div>Timer</div>
          </>
        ) : (
          <button onClick={()=>restart()}>try again</button>
        )}
      </div>
      <div className="bg-green-400 p-4 rounded-full w-20 h-20">
        <div className="font-extrabold text-lg">{Math.floor(wpm)}</div>
        <div>wpm</div>
      </div>
      <div className="bg-green-400 p-4 rounded-full w-20 h-20">
        <div className="font-extrabold text-lg">{Math.round(accuracy)}%</div>
        <div>Acc</div>
      </div>
    </div>
  );
}

export default Results;
