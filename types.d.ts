interface Response<Type> {
  data: Type;
  links: Links;
  meta: Meta;
  message: string;
  code: number;
  type: string;
}

interface Links {
  first: string;
  last: string;
  next: string;
  prev: null;
}

interface Meta {
  current_page: number;
  from: number;
  last_page: number;
}

enum LandingSections {
  ABOUTUS = "about-us",
  MAIN = "main",
  PLANS = "plans",
  SYSTEMS = "systems",
}
