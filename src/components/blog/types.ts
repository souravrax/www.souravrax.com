export type Author = {
  _id: string;
  name: string;
  title: string;
  portrait?: {
    asset: {
      url: string;
    };
  };
  bio?: string;
  website?: {
    current: string;
  };
};

export type Category = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
};

export type CallToAction = {
  label: string;
  url: {
    current: string;
  };
  openInNewTab?: boolean;
};

export type Blog = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  mainImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  author: Author;
  body: any[];
  categories?: Category[];
  callToAction?: CallToAction;
};
