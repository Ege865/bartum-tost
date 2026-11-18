// Every fact on the page lives here. Source: the client's Instagram profile (@bartumtostt)
// and the shop sign ("2008'de belki bir gün diye yola çıkmıştım").

const maps = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const site = {
  name: 'Bartum Tost',
  founded: 2008,
  owner: 'Sedat Candaş',
  city: 'Bursa',
  hq: 'Orhangazi',
  phone: { display: '0538 345 33 99', href: 'tel:+905383453399' },
  instagram: { handle: '@bartumtostt', href: 'https://www.instagram.com/bartumtostt/', followers: '35,5 B' },
  hours: [
    { days: 'Pazartesi – Cumartesi', time: '08:00 – 01:30' },
    { days: 'Pazar', time: 'Kapalı' },
  ],
  mapsHq: maps('Bartum Tost Orhangazi Bursa'),
  url: 'https://ege865.github.io/bartum-tost',
  description:
    "Bartum Tost: Orhangazi'de 2008'den beri sacda bastırılan sucuklu, kaşarlı, pastırmalı tost. İnegöl, Anatolium AVM ve Yalova'da şubeler.",
};

export const branches = [
  { name: 'Orhangazi', note: 'Merkez', region: 'Bursa', href: maps('Bartum Tost Orhangazi') },
  { name: 'İnegöl', note: 'Şube', region: 'Bursa', href: maps('Bartum Tost İnegöl') },
  { name: 'Anatolium', note: 'AVM şubesi', region: 'Bursa', href: maps('Bartum Tost Anatolium AVM Bursa') },
  { name: 'Yalova', note: 'Şube', region: 'Yalova', href: maps('Bartum Tost Yalova') },
];

export const nav = [
  { href: '#hikaye', label: 'Hikâye' },
  { href: '#masa', label: 'Masa' },
  { href: '#subeler', label: 'Şubeler' },
  { href: '#iletisim', label: 'Saatler' },
];
