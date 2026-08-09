interface Props {
  title: string;
  description?: string;
}

export default function PageHeading({ title, description }: Props) {
  return (
    <div className="mb-12">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h1>
      <p className="text-base leading-7 text-muted-foreground">{description}</p>
    </div>
  );
}
