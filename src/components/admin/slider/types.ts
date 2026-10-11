export interface SliderItem {
  id: number;
  title: string;
  description: string;
  link: string;
  order: number;
  buttonText: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
  animationTitle: string;
  animationDescription: string;
  animationButton: string;
  image: string;
  imageMobile?: string;
  language: string;
}

export interface SliderSettings {
  status: "Enable" | "Disable";
  type: "Full Width" | "Boxed";
  effect: "Fade" | "Slide";
}
