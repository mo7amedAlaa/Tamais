interface FormData {
  level: string;
  content: string;
  attachments: File | null;
}

type Item = {
  id: number;
  name: string;
  services: [];
};

type Params = { serviceId: string };

type Service = {
  id: number;
  title: string;
  intro: string;
  details: string;
  min_price: number;
  max_price: number;
  ymtaz_price: number;
  ymtaz_levels_prices: any[];
};
