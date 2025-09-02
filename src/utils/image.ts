import { API_CONFIG } from 'src/config/api.config';

type ServiceType = keyof typeof API_CONFIG.baseURLs;

/**
 * Get the full URL of an image
 * @param service Service name (user, catalog, etc.)
 * @param path Relative URL of the image
 * @returns The full image URL
 */
export const getImageUrl = (service: ServiceType, path?: string): string => {
  if (!path) {
    return 'https://i.pinimg.com/736x/6b/4b/b9/6b4bb99c31679504834a2015f39bd236.jpg';
  }
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const base = API_CONFIG.baseURLs[service];
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
};

interface TempImageData {
  base64: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  timestamp: number;
}
/**
 * Convert a file to base64 string
 * @param file File to convert
 * @returns Promise containing the base64 string
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const tempStorage = {
  /**
   * Save a temporary image to localStorage
   * @param key Key to save the image
   * @param file Image file to save
   * @returns Blob URL for preview
   */
  saveToTemp: async (key: string, file: File): Promise<string> => {
    try {
      const base64 = await fileToBase64(file);
      const tempData: TempImageData = {
        base64,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        timestamp: Date.now()
      };

      localStorage.setItem(`temp_image_${key}`, JSON.stringify(tempData));

      // Create a blob URL for preview
      const blobUrl = URL.createObjectURL(file);
      return blobUrl;
    } catch (error) {
      console.error('Failed to save to temp storage:', error);
      throw error;
    }
  },

  /**
   * Get a temporary image from localStorage
   * @param key Key to get the image
   * @returns The image file or null if not found
   */
  getOneTemp: (key: string): File | null => {
    try {
      const data = localStorage.getItem(`temp_image_${key}`);
      if (!data) return null;

      const tempData: TempImageData = JSON.parse(data);

      // Convert base64 back to File
      const byteCharacters = atob(tempData.base64.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      return new File([byteArray], tempData.fileName, {
        type: tempData.fileType,
        lastModified: tempData.timestamp
      });
    } catch (error) {
      console.error('Failed to get from temp storage:', error);
      return null;
    }
  },

  /**
   * Get all temporary image keys from localStorage
   * @returns List of temporary image keys
   */
  getAllTemp: (): string[] => {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('temp_image_')) {
        keys.push(key.replace('temp_image_', ''));
      }
    }
    return keys;
  },

  /**
   * Remove a temporary image from localStorage
   * @param key Key to remove the image
   */
  removeFromTemp: (key: string): void => {
    localStorage.removeItem(`temp_image_${key}`);
  },

  /**
   * Remove all temporary images from localStorage
   */
  clearAllTemp: (): void => {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('temp_image_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }
}