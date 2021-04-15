export interface IRunwayProps {
  title: string;
  photos: string[];
  videoLinks: string[] | null | undefined;
}

export interface IRunwayImageProps {
  photo: string;
  onClick: () => void;
}
