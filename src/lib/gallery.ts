/**
 * Galleri med Mickes egna foton. Optimerade WebP i public/img/galleri/
 * (auto-orienterade, max 1600px, q78). Originalen ligger i temp-pictures/
 * som är gitignore:ad. Lägg till fler genom att optimera och fylla på listan.
 *
 * Alla bilder är 1200x1600 (3:4 stående) utom där annat anges.
 */
export type GalleryPhoto = {
  src: string;
  alt: string;
  w: number;
  h: number;
};

export const galleryPhotos: GalleryPhoto[] = [
  { src: "/img/galleri/foto-01.webp", alt: "Mickes servicebil med båtsläp på väg till ett uppdrag", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-02.webp", alt: "Servicebilen och båtsläpet på väg ut längs kusten", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-03.webp", alt: "Micke servar en båt på plats", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-04.webp", alt: "Utombordare servad nere vid bryggan", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-05.webp", alt: "Båt vid Bohusläns klippkust", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-06.webp", alt: "Inuti en utombordare under service", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-07.webp", alt: "Båt på trailer framför sjöbodarna", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-08.webp", alt: "Oljebyte på en utombordare", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-09.webp", alt: "Service vid sjöboden", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-10.webp", alt: "Yamaha utombordare med kåpan av", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-11.webp", alt: "Mobil verkstad uppställd vid båten", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-12.webp", alt: "Micke arbetar på en motor", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-13.webp", alt: "Båt på land inför service", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-14.webp", alt: "Närbild på propeller och växelhus", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-15.webp", alt: "Båt på trailer vid vattnet", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-16.webp", alt: "Micke utför service i verkstaden", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-17.webp", alt: "Båt på trailer en solig dag", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-18.webp", alt: "Båt med utombordare vid bryggan", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-19.webp", alt: "Detalj från en pågående service", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-20.webp", alt: "Båt förtöjd vid klipporna", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-21.webp", alt: "Vintertäckt båt på land", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-22.webp", alt: "Micke, grundare och tekniker", w: 1200, h: 1600 },
  { src: "/img/galleri/foto-23.webp", alt: "Motorbåt på trailer redo för sjösättning", w: 1600, h: 1600 },
];
