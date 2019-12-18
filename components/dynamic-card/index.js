import { h } from "preact";
import { useRef, useEffect, useState } from "preact/hooks";
import Card from "preact-material-components/Card";
import "preact-material-components/Card/style.css";
import "./style.css";

const DynamicCard = ({
  scrollDirection,
  scrollHeight,
  scrollTop,
  scrolledPercentage,
  order,
  setViewCandidate,
  scrolling,
  load
}) => {
  const card = useRef(null);
  const [offsetHeight, setOffsetHeight] = useState(0);
  const [offsetPercent, setOffsetPercent] = useState(0);
  const [entryLevel, setEntryLevel] = useState(0);
  const [centered, setCentered] = useState(false);
  const [LLComponent, setLLComponent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    async function loadDynamicData() {
      try {
        if (centered) {
          const loadedmodule = await load();
          setLLComponent(loadedmodule.default);
          setLoading(false);
        }
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    }
    loadDynamicData();
  }, [centered, load]);

  return (
    <div ref={card} id={order}>
      <Card className="card-dynamic">
        {loading && LLComponent !== null ? <div>Loading</div> : LLComponent}
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
