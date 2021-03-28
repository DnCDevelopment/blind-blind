import { useRef, useState, useEffect } from 'react';
const useImage = () => {
  const img = useRef<HTMLImageElement>(null);
  const [isLoad, setLoad] = useState(false);
  const onLoad = () => {
    if (img.current) setLoad(img.current.complete);
  };
  useEffect(() => {
    onLoad();
  }, []);
  return {
    img,
    isLoad,
    onLoad,
  };
};

export default useImage;
