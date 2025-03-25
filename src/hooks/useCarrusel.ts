import { useState, useRef, useCallback, useEffect } from "react";
import { useAnimation, useMotionValue, PanInfo } from "framer-motion";
import { images } from "../components";

export const useCarrusel = (imageSize: { lg: string }, imageSpacing: { md: number }) => {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const count = useMotionValue(0);

  const updateCarouselWidth = useCallback(() => {
    if (carouselRef.current) {
      const totalWidth = carouselRef.current.scrollWidth / 2;
      setCarouselWidth(totalWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  const startCarousel = useCallback(
    (scrollDirection: "left" | "right") => {
      const targetX = scrollDirection === "left" ? -carouselWidth : carouselWidth;
      
      controls.start({
        x: targetX,
        transition: {
          duration: images.length * 5,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          from: scrollDirection === "left" ? 0 : -carouselWidth
        },
      });
      setDirection(scrollDirection);
    },
    [controls, carouselWidth]
  );

  const handleDragStart = () => {
    setIsDragging(true);
    controls.stop();
  };

  const handleDragEnd = useCallback((_: unknown, info: PanInfo) => {
    setIsDragging(false);
    const newDirection = info.velocity.x > 0 ? "right" : "left";
    startCarousel(newDirection);
  }, [startCarousel]);

  const handleDotClick = useCallback((targetIndex: number) => {
    controls.stop();
    const imageWidth = parseInt(imageSize.lg.replace("px", ""), 10);
    const spacing = imageSpacing.md * 2;
    const imageWidthWithMargin = imageWidth + spacing;
    const singleSetWidth = images.length * imageWidthWithMargin;

    const targetX = -targetIndex * imageWidthWithMargin;
    const currentX = count.get();

    const diff1 = Math.abs(currentX - targetX);
    const diff2 = Math.abs(currentX - (targetX - singleSetWidth));
    const finalX = diff1 < diff2 ? targetX : targetX - singleSetWidth;

    controls.start({ 
      x: finalX, 
      transition: { 
        duration: 0.5, 
        ease: "easeInOut",
        onComplete: () => startCarousel(direction)
      } 
    });
    setActiveIndex(targetIndex);
  }, [controls, count, imageSize, imageSpacing, startCarousel, direction]);

  useEffect(() => {
    const unsubscribe = count.onChange((latest) => {
      const imageWidth = parseInt(imageSize.lg.replace("px", ""), 10);
      const spacing = imageSpacing.md * 2;
      const imageWidthWithMargin = imageWidth + spacing;
      const normalizedX = ((latest % (carouselWidth * 2)) + (carouselWidth * 2)) % (carouselWidth * 2);
      const progress = normalizedX / imageWidthWithMargin;
      
      setActiveIndex(Math.floor(progress) % images.length);
    });

    return () => unsubscribe();
  }, [count, imageSize, imageSpacing, carouselWidth]);

  useEffect(() => {
    updateCarouselWidth();
    window.addEventListener("resize", updateCarouselWidth);
    return () => window.removeEventListener("resize", updateCarouselWidth);
  }, [updateCarouselWidth]);

  useEffect(() => {
    startCarousel(direction);
  }, [startCarousel, direction]);

  return {
    carouselRef,
    activeIndex,
    isDragging,
    count,
    controls,
    handleDragStart,
    handleDragEnd,
    handleDotClick,
    startCarousel,
    setActiveIndex,
    direction
  };
};