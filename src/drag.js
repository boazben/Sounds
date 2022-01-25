import { useState, useEffect } from "react";

export default function drag(element) {
  const [{ dx, dy }, setOffset] = useState({ dx: 0, dy: 0 });

  useEffect(() => {
    const handleMouseDown = event => {
      const startX = event.pageX - dx;
      const startY = event.pageY - dy;

      const handleMouseMove = event => {
        const newDx = event.pageX - startX;
        const newDy = event.pageY - startY;
        setOffset({ dx: newDx, dy: newDy });
      };

      document.addEventListener("mousemove", handleMouseMove);

      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", handleMouseMove);
        },
        { once: true }
      );
    };

    element.current.addEventListener("mousedown", handleMouseDown);

    return () => {
        element.current.removeEventListener("mousedown", handleMouseDown);
    };
  }, [dx, dy]);

  useEffect(() => {
    element.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  }, [dx, dy]);
}
