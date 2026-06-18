import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    const dot  = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top  = mouseY + "px";
    };

    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.1);
      ringY = lerp(ringY, mouseY, 0.1);
      ring.style.left = ringX + "px";
      ring.style.top  = ringY + "px";
      raf = requestAnimationFrame(tick);
    };
    tick();

    const expand = () => {
      dot.style.width  = "10px";
      dot.style.height = "10px";
      ring.style.width  = "56px";
      ring.style.height = "56px";
      ring.style.borderColor = "rgba(107,30,43,0.8)";
      ring.style.background  = "rgba(107,30,43,0.05)";
    };
    const contract = () => {
      dot.style.width  = "6px";
      dot.style.height = "6px";
      ring.style.width  = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "rgba(107,30,43,0.6)";
      ring.style.background  = "transparent";
    };

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a,button").forEach(el => {
      el.addEventListener("mouseenter", expand);
      el.addEventListener("mouseleave", contract);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
