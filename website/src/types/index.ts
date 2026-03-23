export type Locale = "de" | "en" | "fr" | "tr";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface TeamMember {
  name: string;
  role: string;
  specializations: string[];
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}
