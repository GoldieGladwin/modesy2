export interface VisualConfig {
  color: string;
  logoUrl?: string;
  logoEmailUrl?: string;
  logoWidth: number;
  logoHeight: number;
}

export interface WatermarkConfig {
  watermarkText: string;
  fontSize: number;
  verticalAlignment: "Top" | "Center" | "Bottom";
  horizontalAlignment: "Left" | "Center" | "Right";
  addWatermarkProduct: boolean;
  addWatermarkBlog: boolean;
  addWatermarkThumbnail: boolean;
}
