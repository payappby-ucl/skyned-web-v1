import {
  SiFacebook,
  SiInstagram,
  SiPinterest,
  SiTiktok,
  SiX,
} from "@icons-pack/react-simple-icons";
import { socialMedia } from "@workspace/shared";
import { Linkedin } from "lucide-react";

interface Props {
  name: keyof typeof socialMedia;
}
const getSocialIcon = ({ name }: Props) => {
  switch (name) {
    case socialMedia.facebook:
      return SiFacebook;
    case socialMedia.x:
      return SiX;
    case socialMedia.instagram:
      return SiInstagram;
    case socialMedia.tiktok:
      return SiTiktok;
    case socialMedia.linkedin:
      return Linkedin;
    case socialMedia.pinterest:
      return SiPinterest;
    default:
      throw new Error("Social media not supported");
  }
};

export default getSocialIcon;
