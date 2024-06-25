// utils/opencvHelper.ts

let isInitialized = false;
let initPromise: Promise<void> | null = null;

export const initializeOpenCV = async (): Promise<void> => {
  if (isInitialized) return;

  if (!initPromise) {
    initPromise = new Promise(async (resolve, reject) => {
      try {
        const cv = await import("opencv-ts");
        cv.default.onRuntimeInitialized = () => {
          isInitialized = true;
          resolve();
        };
      } catch (error) {
        reject(new Error("Failed to load OpenCV.js"));
      }
    });
  }

  await initPromise;
};

export const useOpenCV = async (): Promise<typeof import("opencv-ts")> => {
  if (typeof window === "undefined") {
    throw new Error("useOpenCV can only be used in the browser");
  }

  await initializeOpenCV();
  return import("opencv-ts");
};
