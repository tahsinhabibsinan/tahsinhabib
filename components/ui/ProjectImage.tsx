import Image from "next/image";

interface ProjectImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}

export default function ProjectImage({
  src,
  alt,
  priority = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: ProjectImageProps) {
  return (
    <div className="group relative aspect-[4/3] w-full overflow-hidden bg-white/5">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
    </div>
  );
}
