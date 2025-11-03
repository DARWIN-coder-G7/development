export type WonderImage = {
    id: string;
    name: string;
    src: string;
    photographer: string;
    location: string;
};

const wondersImages: WonderImage[] = [
    {
        id: "1",
        name: "Great Wall of China",
        src: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg',
        photographer: "Photo by Max van den Oetelaar on Unsplash",
        location: "China",
    },
    {
        id: "2",
        name: "Petra",
        src: 'https://images.pexels.com/photos/371985/pexels-photo-371985.jpeg',
        photographer: "Photo by Reiseuhu on Unsplash",
        location: "Jordan",
    },
    {
        id: "3",
        name: "Christ the Redeemer",
        src: 'https://images.pexels.com/photos/2065203/pexels-photo-2065203.jpeg',
        photographer: "Photo by Andrea Leopardi on Unsplash",
        location: "Brazil",
    },
    {
        id: "4",
        name: "Machu Picchu",
        src: 'https://images.pexels.com/photos/2010812/pexels-photo-2010812.jpeg',
        photographer: "Photo by Jared Schwitzke on Unsplash",
        location: "Peru",
    },
    {
        id: "5",
        name: "Chichen Itza",
        src: 'https://images.pexels.com/photos/413959/pexels-photo-413959.jpeg',
        photographer: "Photo by E Mens on Unsplash",
        location: "Mexico",
    },
    {
        id: "6",
        name: "Roman Colosseum",
        src: 'https://images.pexels.com/photos/1855582/pexels-photo-1855582.jpeg',
        photographer: "Photo by Andrea Cipriano on Unsplash",
        location: "Italy",
    },
    {
        id: "7",
        name: "Taj Mahal",
        src: 'https://images.pexels.com/photos/247124/pexels-photo-247124.jpeg',
        photographer: "Photo by Su San Lee on Unsplash",
        location: "India",
    },
];

export default wondersImages;