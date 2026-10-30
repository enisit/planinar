# Planinar

Planinar is a personal log of mountain hikes in Bosnia and Herzegovina. Hikers save each trip with photos and the start location, and look back at their season.

Semester project for **IT 3003 Cross-Platform Development**, International Burch University.

## Screenshots

Screenshots will be added as the app grows.

## Tech stack

- [React Native](https://reactnative.dev) with [Expo](https://expo.dev) SDK 58
- TypeScript
- Expo Router for navigation

## Run the project

You need [Node.js](https://nodejs.org) (LTS) and the **Expo Go** app on your phone.

```bash
git clone https://github.com/enisit/planinar.git
cd planinar
npm install
npx expo start
```

Scan the QR code in the terminal with the Camera app (iPhone) or from inside Expo Go (Android). If the phone cannot connect, start the server with `npx expo start --tunnel`.

## Project structure

```
src/
  app/            Screens (Expo Router)
  components/     Reusable components, such as HikeCard and HikeDetails
  constants/      Theme: colours and spacing
  data/           Mock data, used until the backend is added
  types.ts        Shared TypeScript types
```

## Features

- [x] List of hikes (mock data)
- [x] Hike card with photo, mountain, distance and difficulty
- [ ] Hike details screen
- [ ] Tabs for Hikes and Profile
- [ ] Add and edit a hike, with validation
- [ ] Photo from the camera or gallery
- [ ] Data saved on the device
- [ ] Login and hikes stored in Supabase
- [ ] Installable Android build

Extras if time allows: a map of all start locations, total kilometres this year, filtering by mountain.

## Author

Enis Gegic
