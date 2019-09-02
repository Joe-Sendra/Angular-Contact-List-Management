export interface IContact {
  _id: string;
  address: {
      home: {
        street: string;
        city: string;
        state: string;
        zipcode: string;
      };
      work: {
        street: string;
        city: string;
        state: string;
        zipcode: string;
      };
      other: {
        street: string;
        city: string;
        state: string;
        zipcode: string;
      };
  };
  name: {
    first: string;
    last: string;
    middle: string;
    suffix: string;
  };
  email: {
    home: string;
    work: string;
  };
  phone: {
    mobile: string;
    home: string;
    work: string;
    other: string;
  };
}
