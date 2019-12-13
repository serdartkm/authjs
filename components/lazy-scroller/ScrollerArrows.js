import { h } from "preact";

const ScrollerArrows = ({
  scrollHandler,
  disabledDownScroll,
  disabledUpScroll
}) => {
  return (
    <div style={{ position: "absolute", right: "5%", top: "50%",zIndex:1000 }}>
      <button
        disabled={disabledUpScroll}
        onClick={() => {
          scrollHandler("top");
        }}
      >
        UPWARD
      </button>
      <button
        disabled={disabledDownScroll}
        onClick={() => {
          scrollHandler("bottom");
        }}
      >
        DOWNWARD
      </button>
    </div>
  );
};

export default ScrollerArrows;
