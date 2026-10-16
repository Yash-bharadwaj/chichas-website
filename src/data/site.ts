/**
 * Every piece of CHICHA'S business information the site renders lives here.
 * Nothing in this file is invented — it all comes from the material supplied
 * by the restaurant. Update this file, not the components.
 */

export const site = {
  name: 'CHICHA’S',
  descriptor: 'Indian Street Food & Boba',
  headline: 'Big Flavours. Good Vibes.',
  intro:
    'Your spot for Indian street-food cravings and refreshing boba in St. Augustine.',
  city: 'St. Augustine, Florida',
  timeZone: 'America/New_York',
  address: {
    line1: '304 Ashourian Ave, Unit 3-108',
    line2: 'St. Augustine, FL 32092',
    full: '304 Ashourian Ave, Unit 3-108, St. Augustine, FL 32092, USA',
  },
  links: {
    menu: 'https://drive.google.com/drive/folders/1nO5NFns21ETmmgnzRcGBtZPvSfDynMPm?usp=sharing',
    instagram: 'https://www.instagram.com/chichas.fl/',
    whatsapp:
      'https://chat.whatsapp.com/GUPksNPgd3fICNjarYZVfN?s=cl&p=i&mlu=4&ilr=4&iam=2',
    directions:
      'https://www.google.com/maps/search/?api=1&query=304+Ashourian+Ave+Unit+3-108%2C+St.+Augustine%2C+FL+32092',
  },
  logo: {
    src: '/images/chichas-logo-480.jpg',
    srcSetWebp:
      '/images/chichas-logo-240.webp 240w, /images/chichas-logo-320.webp 320w, /images/chichas-logo-480.webp 480w, /images/chichas-logo-640.webp 640w',
    srcSetJpg:
      '/images/chichas-logo-240.jpg 240w, /images/chichas-logo-320.jpg 320w, /images/chichas-logo-480.jpg 480w, /images/chichas-logo-640.jpg 640w',
    alt: 'CHICHA’S — Indian Street Food and Boba',
    width: 480,
    height: 477,
  },
} as const;

/** Minutes past local midnight, used by the opening-hours logic. */
export type Shift = { open: number; close: number };

const WEEKDAY: Shift = { open: 11 * 60, close: 21 * 60 + 30 }; // 11:00 AM – 9:30 PM
const WEEKEND: Shift = { open: 10 * 60, close: 22 * 60 }; //      10:00 AM – 10:00 PM

/** Indexed by JavaScript day number: 0 = Sunday … 6 = Saturday. */
export const schedule: readonly Shift[] = [
  WEEKEND, // Sunday
  WEEKDAY, // Monday
  WEEKDAY, // Tuesday
  WEEKDAY, // Wednesday
  WEEKDAY, // Thursday
  WEEKEND, // Friday
  WEEKEND, // Saturday
];

/** The two rows shown on the opening-hours card. */
export const hourGroups = [
  { label: 'Monday – Thursday', hours: '11:00 AM – 9:30 PM', days: [1, 2, 3, 4] },
  { label: 'Friday – Sunday', hours: '10:00 AM – 10:00 PM', days: [5, 6, 0] },
] as const;
