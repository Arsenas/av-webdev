type Props = {
  src: string; // pvz. "/bg-profilo.jpg"
  alt?: string; // dekoratyvu -> nenaudosim, bet palieku jei prireiks
  opacity?: number; // 0–1; default 0.18
};

export default function PageBG({ src, opacity = 0.18 }: Props) {
  return (
    <div className="pagebg" aria-hidden="true">
      <img src={src} alt="" style={{ opacity }} />
      <div className="pagebg-fade" />
    </div>
  );
}
