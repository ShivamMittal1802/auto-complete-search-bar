import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [isExpand, setIsExpand] = useState(false);
  const [cached, setCached] = useState({});

  useEffect(() => {
    console.log("api calls ", input);
    const timer = setTimeout(fetchData, 300); 
    return () => clearTimeout(timer);
  }, [input]);

  const fetchData = async () => {
    if(cached[input]){
      console.log("cached API: ", input)
      setResult(cached[input]);
      return ;
    }
    const data = await fetch("https://dummyjson.com/recipes/search?q=" + input);
    const json = await data.json();
    setResult(json?.recipes);
    setCached((prev)=>({...prev, [input]: json?.recipes}));
  };

  return (
    <div className="app">
      <h1>Auto-Complete Search Bar</h1>
      <div>
        <input
          type="text"
          className="input-container"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsExpand(true)}
          onBlur={() => setIsExpand(false)}
        />
        {isExpand && (
          <div className="result-space">
            {result.map((item) => {
              return (
                <span className="result" key={item.id}>
                  {item.name}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
