export function convertImageToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error(' Can read file as string Base64'));
      }
    };

    reader.onerror = () => reject(new Error(reader.error?.message || 'Unknown error'));

    reader.readAsDataURL(file);
  });
}
