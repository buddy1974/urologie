import Image from "next/image";

const images = ["/assets/leistungen_001.jpg", "/assets/header_praxis_01.jpg", "/assets/gruppenbild_2023.jpg"];

export default function PhotoStrip() {
  return (
    <div className="flex flex-col sm:flex-row w-full">
      {images.map((src) => (
        <div key={src} className="relative flex-1 h-[200px] sm:h-[280px] overflow-hidden">
          <Image
            src={src}
            alt=""
            fill
            className="object-cover transition-transform duration-[400ms] hover:scale-[1.03]"
          />
        </div>
      ))}
    </div>
  );
}
