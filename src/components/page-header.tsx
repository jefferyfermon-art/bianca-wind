import Image, { type StaticImageData } from "next/image";

import inkWash from "@/assets/images/ink-wash.jpg";
import { WindLines } from "@/components/art/wind-lines";
import { SectionHeading } from "@/components/section-heading";
import { Container } from "@/components/ui/container";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** Background texture. Defaults to the shared ink-wash paper texture. */
  image?: StaticImageData;
};

/** Consistent opening block for every inner page. */
export function PageHeader({
  eyebrow,
  title,
  description,
  image = inkWash,
}: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-ink/10 bg-mist/35">
      {/* Decorative paper texture, washed back behind the heading. */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/85 via-ivory/70 to-ivory/30" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 opacity-50"
      >
        <WindLines variant="band" />
      </div>

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <SectionHeading
          as="h1"
          size="lg"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      </Container>
    </div>
  );
}
