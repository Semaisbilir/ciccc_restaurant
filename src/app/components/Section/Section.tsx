import { SectionProps } from "@/types/Section/Section";
import "./Section.css";

export default function Section({ 
  children, 
  className = "", 
  backgroundColor = "transparent",
  containerWidth = "default"
}: SectionProps) {
  const containerClasses = {
    default: "section-container",
    narrow: "section-container-narrow",
    wide: "section-container-wide"
  };

  return (
    <div 
      className={`section ${containerClasses[containerWidth]} ${className}`}
      style={{ backgroundColor }}
    >
      {children}
    </div>
  );
}