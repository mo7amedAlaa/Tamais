export default function HeaderParagraph({
  description,
}: {
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <img className="w-6 h-6 " alt="" src="/home/public/frame-2.svg" />
      <p className="font-semibold text-lg">{description}</p>
    </div>
  );
}
