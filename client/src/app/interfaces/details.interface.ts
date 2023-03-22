export interface Details {
  name: string;
  contact_name?: string;
  contact_number: string;
  secondary_contact?: string;
  address: string;
  city: { city_id: number; city_name: string };
  zone: { zone_id: number; zone_name: string };
  area: { area_id: number; area_name: string };
}
