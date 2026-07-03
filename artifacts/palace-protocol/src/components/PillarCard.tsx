interface PillarCardProps {
  numeral: string;
  title: string;
  description: string;
}

export function PillarCard({ numeral, title, description }: PillarCardProps) {
  return (
    <div className="bg-ink p-9 flex flex-col items-start text-left">
      <div className="font-serif text-[34px] text-[#C9A860] font-semibold mb-3.5 leading-none">
        {numeral}
      </div>
      <h3 className="text-[19px] mb-2.5 text-bone">{title}</h3>
      <p className="text-sm text-parchment opacity-75">{description}</p>
    </div>
  );
}
