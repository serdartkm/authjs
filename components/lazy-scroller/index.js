/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-named-as-default-member */
import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
// eslint-disable-next-line import/no-named-as-default
import LazyLoadableCard from "../lazy-loadable-card";
import ScrollerArrows from "./ScrollerArrows";

function LazyScroller({ dynamicItems }) {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [scrolledPercentage, setScrolledPercentage] = useState(100);
  const [scrolling, setScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(undefined);
  const [scrolledNode, setScrolledNode] = useState(0);
  const [disabledUpScroll, setDisabledUpScroll] = useState(false);
  const [disabledDownScroll, setDisabledDownScroll] = useState(false);
  const scroller = useRef(null);
  function setViewCandidate(id) {
    setScrolling(true);
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    setScrolling(false);
  }
  function scrollHandler(direction) {
    if (direction === "top" && scrolledNode > 0) {
      setScrolledNode(scrolledNode - 1);
    } else {
      setScrolledNode(scrolledNode + 1);
    }
  }
  function handleScroll(e) {
    setScrollTop(scroller.current.scrollTop);

    setScrollTop(prevState => {
      if (prevState < scroller.current.scrollTop) {
        setScrollDirection("bottom");
      } else {
        setScrollDirection("top");
      }

      return scroller.current.scrollTop;
    });
    setScrollHeight(scroller.current.scrollHeight);
    setScrolledPercentage(
      (
        ((scroller.current.scrollHeight - scroller.current.scrollTop) * 100) /
        scroller.current.scrollHeight
      ).toFixed(0)
    );
  }

  useEffect(() => {
    scroller.current.addEventListener("scroll", handleScroll);

    return () => {};
  }, []);
  useEffect(() => {
    setViewCandidate(scrolledNode);
    if (dynamicItems.length - 1 === scrolledNode) {
      setDisabledDownScroll(true);
    } else {
      setDisabledDownScroll(false);
    }

    if (scrolledNode === 0) {
      setDisabledUpScroll(true);
    } else {
      setDisabledUpScroll(false);
    }
  }, [scrolledNode]);
  return [
    <div style={{ height: 67 }} />,
    <ScrollerArrows
      disabledUpScroll={disabledUpScroll}
      disabledDownScroll={disabledDownScroll}
      scrollHandler={scrollHandler}
    />,
    <div
      ref={scroller}
      style={{
        height: "90vh",
        overflow: "scroll",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {dynamicItems.map((d, i) => {
        return (
          <LazyLoadableCard
            load={d.load}
            scrollDirection={scrollDirection}
            scrolling={scrolling}
            setViewCandidate={setViewCandidate}
            order={i}
            scrolledPercentage={scrolledPercentage}
            scrollTop={scrollTop}
            scrollHeight={scrollHeight}
          />
        );
      })}
    </div>
  ];
}

export default LazyScroller;
