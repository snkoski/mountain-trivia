type LayoutProps = {
  header: React.ReactNode;
  game: React.ReactNode;
};

export function Layout({ header, game }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div>{header}</div>
      <div className="flex-grow">{game}</div>
    </div>
  );
}
