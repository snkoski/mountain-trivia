type LayoutProps = {
  header: React.ReactNode;
  game: React.ReactNode;
  footer: React.ReactNode;
};

export function Layout({ header, game, footer }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div>{header}</div>
      <div className="flex-grow">{game}</div>
      <div className="mt-auto bg-emerald-300">{footer}</div>
    </div>
  );
}
