declare module "opencv.js" {
  const cv: any;
  export default cv;
}

interface Window {
  cv: any;
}
