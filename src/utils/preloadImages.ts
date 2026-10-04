/** Preload image URLs so they are cached before the invitation is shown. */
export function preloadImages(urls: string[]): Promise<void> {
  const unique = [...new Set(urls.filter(Boolean))];

  return Promise.all(
    unique.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.decoding = 'async';
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = url;
        }),
    ),
  ).then(() => undefined);
}

export const INVITATION_IMAGE_URLS = [
  '/IMG_6940.JPG.jpeg',
  '/IMG_6941.JPG.jpeg',
  '/IMG_6942.JPG.jpeg',
  '/IMG_6945.JPG.jpeg',
  '/ivory_satin_bow-removebg-preview.png',
] as const;
