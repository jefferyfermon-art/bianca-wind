import { WindLines } from "@/components/art/wind-lines";
import { SectionHeading } from "@/components/section-heading";
import { Container } from "@/components/ui/container";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

/** Consistent opening block for every inner page. */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-ink/10 bg-mist/35">
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
