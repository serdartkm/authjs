import { h } from "preact";
import { useRef, useEffect, useState } from "preact/hooks";
import Card from "preact-material-components/Card";
import "preact-material-components/Card/style.css";
import "./style.css";

const LazyLoadableCard = ({
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
      <Card className="lazy-loadable-card">
        {loading && LLComponent !== null ? <div>Loading</div> : LLComponent}
      </Card>
    </div>
  );
};
export default LazyLoadableCard;


