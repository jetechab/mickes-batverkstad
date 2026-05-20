/**
 * Kuraterade Unsplash-bilder som används som TEMP-platshållare på sajten.
 * När Mickes egna bilder kommer in: ersätt URL:erna med lokala filer i public/img/
 * och uppdatera credits. Alt-texten bör behållas eller justeras lätt.
 */

export type StockPhoto = {
  src: string;
  alt: string;
  credit: string;
};

export const stock: Record<string, StockPhoto> = {
  outboardCloseup: {
    src: "https://images.unsplash.com/photo-1562603813-fb781dee22fe",
    alt: "Närbild på en svart utombordsmotor i god skick",
    credit: "Max Andrey / Unsplash",
  },
  bohuslanCoast: {
    src: "https://images.unsplash.com/photo-1696102825924-26aef2a51d30",
    alt: "Klippkust med hav, typisk vy från Bohusläns ytterskärgård",
    credit: "Maja Hurtigh / Unsplash",
  },
  sunsetDock: {
    src: "https://images.unsplash.com/photo-1591567117225-430c438aac4f",
    alt: "Trähus på brygga i Bohuslän under kvällsljus",
    credit: "Ferhat Deniz Fors / Unsplash",
  },
  boatAtDock: {
    src: "https://images.unsplash.com/photo-1646520835127-8946b42cadc4",
    alt: "Båt förtöjd vid brygga, redo för säsong",
    credit: "Mathias Reding / Unsplash",
  },
  boatsAtQuay: {
    src: "https://images.unsplash.com/photo-1685720543627-a49e4754dd0a",
    alt: "Båtar med utombordsmotorer vid kaj",
    credit: "Dmitrijs Safrans / Unsplash",
  },
  speedboat: {
    src: "https://images.unsplash.com/photo-1634121419482-236ef8a935be",
    alt: "Båt med utombordsmotor i fart på vattnet",
    credit: "Emil Dosen / Unsplash",
  },
  fishingHouses: {
    src: "https://images.unsplash.com/photo-1534143340226-6cbc7628dbe5",
    alt: "Fiskebodar vid lugnt vatten längs Bohuskusten",
    credit: "Ferhat Deniz Fors / Unsplash",
  },
};

export function unsplash(
  photo: StockPhoto,
  opts: { w?: number; h?: number; q?: number } = {},
): string {
  const { w = 1200, h, q = 80 } = opts;
  let url = `${photo.src}?auto=format&fit=crop&q=${q}&w=${w}`;
  if (h) url += `&h=${h}`;
  return url;
}
