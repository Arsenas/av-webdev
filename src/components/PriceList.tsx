import type { ReactNode } from "react";

export type PriceItem = { title: string; price: string; desc?: ReactNode };
export type PriceGroup = { group: string; items: PriceItem[] };

export default function PriceList({ groups }: { groups: PriceGroup[] }) {
  return (
    <div className="pl">
      {groups.map((g, gi) => (
        <section className="pl-group" key={gi}>
          <h3 className="pl-group-title">{g.group}</h3>
          <ul className="pl-list">
            {g.items.map((it, ii) => (
              <li className="pl-row" key={ii}>
                <div className="pl-line">
                  <span className="pl-title">{it.title}</span>
                  <span className="pl-dots" aria-hidden="true" />
                  <span className="pl-price">{it.price}</span>
                </div>
                {it.desc ? <p className="pl-desc">{it.desc}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
