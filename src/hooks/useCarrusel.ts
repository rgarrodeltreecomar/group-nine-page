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
      const totalWidth = carouselRef.current.scrollWidth;
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
    
    // Calcular el ancho con margen
    const imageWidth = parseInt(imageSize.lg.replace("px", ""), 10);
    const spacing = imageSpacing.md * 2;
    const imageWidthWithMargin = imageWidth + spacing;
  
    const newDirection = info.velocity.x > 0 ? "right" : "left";
    const currentX = count.get();
    const maxOffset = carouselWidth / 2;
    const minOffset = -maxOffset;
    
    let newX = newDirection === "left" 
      ? currentX - imageWidthWithMargin 
      : currentX + imageWidthWithMargin;
    
    // Ajustar límites (eliminar duplicados)
    if (newX < minOffset) newX = 0;
    else if (newX > maxOffset) newX = -maxOffset;
    
    controls.start({
      x: newX,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    });
    
    setDirection(newDirection);
  }, [count, controls, imageSize, imageSpacing, carouselWidth]); // Añadir carouselWidth a dependencias

  const handleDotClick = useCallback((targetIndex: number) => {
    controls.stop();
    const imageWidth = parseInt(imageSize.lg.replace("px", ""), 10);
    const spacing = imageSpacing.md * 2;
    const imageWidthWithMargin = imageWidth + spacing;

  
    const targetX = -targetIndex * imageWidthWithMargin;
  
    controls.start({
      x: targetX,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    });
  
    setActiveIndex(targetIndex);
  }, [controls, imageSize, imageSpacing]);
  

  useEffect(() => {
    const unsubscribe = count.onChange((latest) => {
      if (!carouselWidth) return; // Validación adicional
      
      const imageWidth = parseInt(imageSize.lg.replace("px", ""), 10);
      const spacing = imageSpacing.md * 2;
      const imageWidthWithMargin = imageWidth + spacing;
      
      const normalizedX = latest % carouselWidth;
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