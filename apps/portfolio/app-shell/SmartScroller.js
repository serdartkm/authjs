/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-named-as-default-member */
import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
// eslint-disable-next-line import/no-named-as-default
import DynamicCard from "./DynamicCard";
import ScrollerArrows from "./ScrollerArrows";

function SmartScroller({ dynamicItems }) {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [scrolledPercentage, setScrolledPercentage] = useState(100);
  const [scrolling, setScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(undefined);
  const [scrolledNode, setScrolledNode] = useState(0);
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

    // console.log("offsetHeight",scroller.current.offsetHeight)
    // console.log("scrollHeight",scroller.current.scrollHeight)
    // console.log("offsetTop",scroller.current.offsetTop)
    // console.log("offsetTop",scroller)
  }

  useEffect(() => {
    scroller.current.addEventListener("scroll", handleScroll);

    return () => {
      //  scroller.current.removeEventListener(handleScroll)
    };
  }, []);
  useEffect(() => {
    setViewCandidate(scrolledNode);
  }, [scrolledNode]);
  return [
    <div style={{ height: 67 }} />,
    <ScrollerArrows scrollHandler={scrollHandler} />,
    <div ref={scroller} style={{ height: "90vh", overflow: "scroll" }}>
      {dynamicItems.map((d, i) => {
        return (
          <DynamicCard
            path={d.path}
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

export default SmartScroller;
