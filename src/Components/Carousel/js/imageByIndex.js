import image1 from "../images/slide-1.png";
import image2 from "../images/slide-2.png";
import image3 from "../images/slide-3.png";

export const images = [image1, image2, image3];

const imageByIndex = (index) => images[index % images.length];

export default imageByIndex;
