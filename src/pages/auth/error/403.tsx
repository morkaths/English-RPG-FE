import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const particlesOptions = {
  key: "parallax",
  name: "Parallax",
  background: { color: "#0d47a1" },
  particles: {
    number: {
      value: 100,
      density: { enable: true },
    },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.1, max: 0.5 },
      animation: { enable: true, speed: 3, sync: false },
    },
    size: {
      value: { min: 1, max: 10 },
      animation: { enable: true, speed: 20, sync: false },
    },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab",
        parallax: { enable: true, smooth: 10, force: 60 },
      },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      grab: {
        distance: 400,
        links: { opacity: 1 },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 0.8,
      },
      repulse: { distance: 200 },
      push: { quantity: 4 },
      remove: { quantity: 2 },
    },
  },
};

export default function Error403() {
  const [init, setInit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-[#0d47a1] overflow-hidden">
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
        <div className="font-bold mb-2" style={{ fontSize: 120, lineHeight: 1 }}>
          403
        </div>
        <div className="text-lg mb-2 font-medium">
          Bạn không có quyền truy cập trang này.
        </div>
        <Button
          color="outlineprimary"
          className="mt-4 border-white text-white hover:bg-white hover:text-[#0d47a1] rounded-lg px-6 py-2 font-semibold text-2xl"
          style={{ borderWidth: 2, borderColor: "#fff" }}
          onClick={() => navigate("/")}
        >
          Về trang chủ
        </Button>
      </div>
    </div>
  );
}