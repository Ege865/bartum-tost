// One-time crop of the client's Instagram frames: removes UI overlays and burned-in subtitles.
import sharp from 'sharp';
const raw = 'src/assets/raw/', out = 'src/assets/photos/';
const jobs = [
  ['2.webp', 'usta-tabak.jpg',   { left: 8, top: 0,   width: 808, height: 1340 }], // drop IG profile/mute icons
  ['2.webp', 'tabak-yakin.jpg',  { left: 8, top: 790, width: 808, height: 480 }],  // platter detail, landscape
  ['3.webp', 'sac.jpg',          { left: 4, top: 0,   width: 816, height: 1336 }],
  ['4.webp', 'usta-tezgah.jpg',  { left: 8, top: 0,   width: 810, height: 1105 }], // stops above "güzelce koyalım" subtitle
];
for (const [src, dst, box] of jobs) {
  await sharp(raw + src).extract(box).jpeg({ quality: 90, mozjpeg: true }).toFile(out + dst);
  console.log(dst, box.width + 'x' + box.height);
}
