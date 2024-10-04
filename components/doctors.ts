import DoctorImage from "@/public/doctor_images/doctor.png"
import { StaticImageData } from "next/image";

export type Doctors = {
    id: string;
    name: string;
    src: StaticImageData;
    location: string;
    specialty: string;
    rating: string
    reviews: string,
    description: string,
    clinic: string,
  };

  const DoctorsArray : Doctors[] = [
    {
        id: "1",
        name: "John Doe",
        src: DoctorImage,
        specialty: "Pediatric",
        location: "Baku, Azerbaijan",
        rating: "4.6",
        reviews: "100",
        description: "Dr. Rasad completed his medical education at Azerbaijan State Medical University, where he built a strong foundation in pediatrics and child healthcare. During his time at the university, he excelled in both academic and clinical practice, which deepened his understanding of pediatric medicine. His training included hands-on experience with a diverse range of pediatric cases, allowing him to develop the expertise required to manage both common and complex childhood conditions. Dr. Rasad's education has equipped him with the knowledge and skills to provide high-quality care to children of all ages.",
        clinic: "BakuMed"
      },
      {
        id: "2",
        name: "Jane Doe",
        src: DoctorImage,
        specialty: "Stomatoloq",
        location: "Baku, Azerbaijan",
        rating: "4.6",
        reviews: "100",
        description: "Dr. Rasad completed his medical education at Azerbaijan State Medical University, where he built a strong foundation in pediatrics and child healthcare. During his time at the university, he excelled in both academic and clinical practice, which deepened his understanding of pediatric medicine. His training included hands-on experience with a diverse range of pediatric cases, allowing him to develop the expertise required to manage both common and complex childhood conditions. Dr. Rasad's education has equipped him with the knowledge and skills to provide high-quality care to children of all ages.",
        clinic: "BakuMed",
      },
      {
        id: "3",
        name: "Rashad Mammadov",
        src: DoctorImage,
        specialty: "Cerrah",
        location: "Baku, Azerbaijan",
        rating: "4.6",
        reviews: "100",
        description: "Dr. Rasad completed his medical education at Azerbaijan State Medical University, where he built a strong foundation in pediatrics and child healthcare. During his time at the university, he excelled in both academic and clinical practice, which deepened his understanding of pediatric medicine. His training included hands-on experience with a diverse range of pediatric cases, allowing him to develop the expertise required to manage both common and complex childhood conditions. Dr. Rasad's education has equipped him with the knowledge and skills to provide high-quality care to children of all ages.",
        clinic: "BakuMed",
      },
  ]

  export default DoctorsArray;
  