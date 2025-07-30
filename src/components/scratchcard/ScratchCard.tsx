import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from "react";

interface ScratchCardProps {
  width: number;
  height: number;
  image: string;
  brushSize: number;
  discount: string;
  scratchedPercent: number;
  setScratchedPercent: Dispatch<SetStateAction<number>>;
}

const ScratchCard: React.FC<ScratchCardProps> = ({
  width,
  height,
  image,
  brushSize,
  discount,
  setScratchedPercent,
  scratchedPercent,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { willReadFrequently: true });
    const img = imageRef.current;

    if (img && context) {
      img.crossOrigin = "anonymous";
      img.onload = () => {
        context.drawImage(img, 0, 0, width, height);
        context.globalCompositeOperation = "destination-out";
      };
    }
  }, [width, height, scratchedPercent, setScratchedPercent]);

  const calculateScratchedPercent = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    const pixels = context.getImageData(0, 0, width, height).data;
    const totalPixels = width * height;
    let scratchedPixels = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] === 0) {
        scratchedPixels++;
      }
    }

    setScratchedPercent((scratchedPixels / totalPixels) * 100);
  }, [width, height, setScratchedPercent]);

  const getPointerPos = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const scratch = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    const { x, y } = getPointerPos(e);

    context.beginPath();
    context.arc(x, y, brushSize, 0, Math.PI * 2, true);
    context.fill();
  };

  // Eventos de mouse
  const handleMouseDown = () => setIsDrawing(true);
  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      calculateScratchedPercent();
    }
  };

  // Eventos de toque
  const handleTouchStart = () => setIsDrawing(true);
  const handleTouchEnd = () => {
    if (isDrawing) {
      setIsDrawing(false);
      calculateScratchedPercent();
    }
  };

  return (
    <div className="relative w-fit">
      <div
        className="absolute top-0 left-0 flex items-center justify-center w-full h-full z-[1]"
        style={{ pointerEvents: "none" }}
      >
        {scratchedPercent ? <span className="text-[#1526FF] select-none scratch-cupom text-center">
          {discount}
        </span> : "🤩"}
      </div>

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseMove={scratch}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={scratch}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        style={{ touchAction: "none", userSelect: "none" }}
        className="rounded-lg z-[2] relative"
      />

      <img
        ref={imageRef}
        src={image}
        alt="hidden"
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ScratchCard;
