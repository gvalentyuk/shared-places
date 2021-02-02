export type Place = {
    _id: string;
    image: string;
    title: string;
    description: string;
    address: string;
    creator: string;
    location: {
      lng: number;
      lat: number;
    };
  };