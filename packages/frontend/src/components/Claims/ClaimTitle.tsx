export function ClaimTitle({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className='pb-4 flex justify-between items-center'>
      <h1 className="text-3xl py-2">{title}</h1>
      {children}
    </div>
  );
}