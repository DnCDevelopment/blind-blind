export interface IRunwayProps {
  title: string;
  photos: string[];
  videoLinks: string[] | null | undefined;
}

export interface IRunwayImageProps {
  title: string;
  photo: string;
  onClick: () => void;
}
