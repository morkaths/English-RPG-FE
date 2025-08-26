import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { Icon } from "@iconify/react";

const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return show ? (
    <Button
      onClick={handleClick}
      color="primary"
      className="fixed bottom-20 right-6 z-50 p-2 w-12 h-12 flex items-center justify-center shadow-lg rounded-full text-white transition"
      title="Lên đầu trang"
    >
      <Icon icon="mdi:arrow-up" width={24} height={24} />
    </Button>
  ) : null;
};

export default ScrollToTop;