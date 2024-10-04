import DoctorImage from '@/public/doctor_images/doctor.png';
import { StaticImageData } from 'next/image';

export type Doctors = {
  id: string;
  name: string;
  src: StaticImageData;
  location: string;
  specialty: string;
  rating: string;
  reviews: string;
  description: string;
  clinic: string;
};
const DoctorsArray: Doctors[] = [
  {
    id: '4',
    name: 'Gunay Hajizade',
    src: DoctorImage,
    specialty: 'Pediatr',
    location: '3, 10 əhməd rəcəbli, bakı, azerbaijan',
    rating: '4.5',
    reviews: '50',
    description:
      '2020 - Sağlam Ailə Tibb Mərkəzi, Həkim pediatr\n2019-bugünədək – Oksigen Klinik xəstəxanası/ Həkim-neonatoloq\n2016 – 2019 - Doktorantura/ K. Fərəcova adına Elmi-tətqiqat Pediatriya İnstitutu/ Həkim - pediatr\n2011 – 2015 Rezidentura/ K. Fərəcova adına Elmi-tətqiqat Pediatriya İnstitutu/ Həkim - pediatr\n2005 – 2011 Azərbaycan Tibb Universiteti/ Pediatriya',
    clinic: 'Saglam Aile',
  },
  {
    id: '5',
    name: 'Laman Sultanova',
    src: DoctorImage,
    specialty: 'Uşaq endokrinoloqu',
    location: '3, 10 əhməd rəcəbli, bakı, azerbaijan',
    rating: '4.7',
    reviews: '60',
    description:
      '2022 - bugünədək Sağlam Ailə Ultralab klinikası / Həkim-endokrinoloq\n2015 - 2022 - Azərbaycan Tibb Universiteti / Dissertant (davam edir)\n2008 - 2010 - Diabet mərkəzi / Həkim endokrinoloq\n2006 - 2007 - Sumqayıt Şəhər Uşaq Poliklinikası / Həkim interna\n2000 - 2006 - Azərbaycan Tibb Universiteti Pediatriya',
    clinic: 'Saglam Aile',
  },
  {
    id: '6',
    name: 'Konul Eyvazova',
    src: DoctorImage,
    specialty: 'Mama-ginekoloq',
    location: '3, 10 əhməd rəcəbli, bakı, azerbaijan',
    rating: '4.8',
    reviews: '70',
    description:
      '2009 - bugünədək Sağlam Ailə Tibb Mərkəzi, Həkim mama ginekoloq\n2014 - bugünədək Müasir diaqnostika Klinikası\n2008 Ə.Əliyev adına Azərbaycan Dövlət Həkimlərin Təkmilləşdirmə İnstitutu, Mamalıq və ginekologiya üzrə\n2003 – 2004 İnternatura, A.T. Abbasov adına Şəhər Onkoloji dispanseri\n1997 – 2003 Azərbaycan Tibb Universiteti, Müalicə işi',
    clinic: 'Saglam Aile',
  },
  {
    id: '7',
    name: 'Lala Sharifzada',
    src: DoctorImage,
    specialty: 'Həkim-ginekoloq',
    location: '10, 15, üzeyir hacıbəyli, bakı, azerbaijan',
    rating: '4.9',
    reviews: '80',
    description: 'Ümumi iş stajı : 30 il\nMediClub-da fəaliyyətə başladığı il : 2024',
    clinic: 'Mediclub',
  },
  {
    id: '8',
    name: 'Kamal Niftiyev',
    src: DoctorImage,
    specialty: 'Ginekoloq',
    location: 'kral hüseyn küçesi, bakı, azerbaijan',
    rating: '4.4',
    reviews: '40',
    description:
      '2018-2020 ci il Zəfəran Hospital Qadın xəstəlikləri və doğum uzmanı\n2018-2018 ci il Özəl Asya Xəstəxanası Qadın xəstəlikləri və doğum uzmanı Türkiyə\n2017-2018 ci il Özəl Eslem Xəstəxanası Qadın xəstəlikləri və doğum uzmanı Türkiyə',
    clinic: 'Medilux',
  },
];

export default DoctorsArray;
