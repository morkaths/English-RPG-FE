import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const particlesOptions = {
  key: "slow",
  name: "Slow",
  background: { color: "#e53935" },
  particles: {
    number: { value: 80, density: { enable: true } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: { min: 1, max: 5 } },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none" as const,
      outModes: "out" as const,
      random: false,
      straight: false,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "slow",
        parallax: { enable: false, force: 60, smooth: 10 },
      },
      onClick: { enable: true, mode: "push" },
      resize: { enable: true },
    },
    modes: {
      slow: { radius: 120, factor: 0.05 },
      push: { quantity: 4 },
      grab: { distance: 400, links: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 0.8 },
      repulse: { distance: 200 },
      remove: { quantity: 2 },
    },
  },
  fpsLimit: 120,
  detectRetina: true,
};

export default function Error404() {
  // Router
  const navigate = useNavigate();
  // State UI
  const [init, setInit] = useState(false);

  // Initialize particles
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-[#eb263a] overflow-hidden">
      {init && (
        <Particles
          id="tsparticles"
          options={particlesOptions}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        />
      )}
      <div className="relative z-10 text-center text-white flex flex-col items-center">
        <div className="font-bold mb-2" style={{ fontSize: 160, lineHeight: 1 }}>
          404
        </div>
        <div className="text-lg mb-2 font-medium">
          Chúng tôi rất tiếc nhưng có vẻ như<br />
          trang đó không còn tồn tại nữa.
        </div>
        <Button
          color="outline"
          className="mt-4 border-white text-white hover:bg-white hover:text-[#eb263a] rounded-lg px-6 py-2 font-semibold text-2xl"
          style={{ borderWidth: 2, borderColor: "#fff" }}
          onClick={() => navigate("/")}
        >
          Về trang chủ
        </Button>
      </div>
    </div>
  );
}