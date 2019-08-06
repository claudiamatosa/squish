import * as React from 'react';
import { useAsync } from 'react-async-hook';

import shuffle from '../utils/shuffle';

const fetchImageList = async () =>
  (await fetch(`/data/gallery.json`)).json();

const useGalleryData = () => {
  const { loading, error, result } = useAsync(fetchImageList, []);
  const [images, setImages] = React.useState(null);

  React.useEffect(() => {
    if (result) setImages(shuffle(result));
  }, [result]);

  return { loading, error, images };
};

export default useGalleryData;
