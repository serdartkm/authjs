import { h } from "preact";
import { useRef, useEffect, useState } from "preact/hooks";
import Card from "preact-material-components/Card";
import "preact-material-components/Card/style.css";
import "./app-shell.css";

const DynamicCard = ({
  scrollDirection,
  scrollHeight,
  scrollTop,
  scrolledPercentage,
  order,
  setViewCandidate,
  scrolling,
  path='./contents/ContentOne'
}) => {
  const card = useRef(null);
  const [offsetHeight, setOffsetHeight] = useState(0);
  const [offsetPercent, setOffsetPercent] = useState(0);
  const [entryLevel, setEntryLevel] = useState(0);
  const [centered, setCentered] = useState(false);
  const [LLComponent,setLLComponent]=useState(null);
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  useEffect(() => {
    setOffsetHeight(card.current.offsetHeight);
  }, []);
  useEffect(() => {
    setOffsetPercent(
      Number.parseInt(((offsetHeight * 100) / scrollHeight).toFixed(0))
    );
  }, [scrollHeight, offsetHeight]);

  useEffect(() => {
    if (order === 1) {
      const entLevel = 100 - scrolledPercentage;
      setEntryLevel(entLevel);
    }

    if (order > 1) {
      const entLevel = 100 - scrolledPercentage - offsetPercent * (order - 1);
      setEntryLevel(entLevel);
    }
  }, [scrolledPercentage]);

  useEffect(() => {
    if (order === 0) {
      setCentered(true);
    } else if (order > 0) {
      if (entryLevel > 0 && entryLevel === offsetPercent) {
        setCentered(true);
      } else {
        setCentered(false);
      }
    }
  }, [entryLevel, offsetPercent]);

  useEffect(async()=>{
   
    if(centered && path !==''){
      console.log("path",path)
      setLoading(true);
      try{
      const module = await import(`../contents/${path}`)

      setLLComponent(module.default)
      setLoading(false)
      } catch(error){
        console.log('error',error)
        setError(error)
        setLoading(false)
      }

    }
  },[centered,path])

  return (
    <div
      style={{ height: "100%", borderBottom: "5px solid white" }}
      ref={card}
      id={order}
    >
      <Card className="card-dynamic">
        <div className="content">
          <div>
            {(loading && LLComponent !==null) ? <div>Loading</div>:LLComponent}
          </div>
        </div>
      </Card>
    </div>
  );
};
export default DynamicCard;


/*
      <Card className="card-dynamic">
        <div className="content">
          <div>
            <h3>
              ScrollDirec:
              {scrollDirection}
            </h3>
            <h3>Order: {order}</h3>
            <h3>Centered: {centered.toString()}</h3>
            <h3>EntryLevel: {entryLevel}</h3>
            <h3>scrollHeight: {scrollHeight}</h3>
            <h3>scrollTop: {scrollTop}</h3>
            <h3>offsetHeight: {offsetHeight}</h3>
            offsetHeigtht in % :{offsetPercent}
            <h3>scrolledPercentage: {scrolledPercentage}</h3>
          </div>
        </div>
      </Card>
*/