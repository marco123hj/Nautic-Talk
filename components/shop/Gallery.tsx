"use client";

import { useState } from "react";
import p from "./product.module.css";

interface Img {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

function sized(url: string, width: number) {
  return `${url}${url.includes("?") ? "&" : "?"}width=${width}`;
}

// Main picture on the grey fill, thumbnails underneath to switch it.
export default function Gallery({ images, name, thumbLabel }: { images: Img[]; name: string; thumbLabel: string }) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];
  if (!main) return <div className={p.galleryMain} />;

  return (
    <div className={p.gallery}>
      <div className={p.galleryMain}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={main.url} src={sized(main.url, 1100)} alt={main.altText || name} width={main.width} height={main.height} />
      </div>
      {images.length > 1 && (
        <div className={p.thumbs}>
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              className={`${p.thumb} ${i === active ? p.thumbActive : ""}`}
              onClick={() => setActive(i)}
              aria-label={`${thumbLabel} ${i + 1}`}
              aria-pressed={i === active}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sized(img.url, 200)} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
