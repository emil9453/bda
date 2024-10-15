'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DoctorsArray, { Doctors } from '@/components/doctors';
// import axios from 'axios'


export function useFilteredDoctors() {
  const searchParams = useSearchParams();
  console.log('🚀 ~ useFilteredDoctors ~ searchParams:', searchParams);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctors[]>([]);
  // const [DoctorArray, setDoctorsArray] = useState<Doctors[]>([]);

//   const fetchDoctors = async () => {
//     try {
//       const response = await fetch('http://64.226.99.16:8090/api/v1/doctor/all'); 
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const DocArray = await response.json(); 
//       setDoctorsArray(DocArray); 
//       console.log(DocArray);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors(); 
//   }, []); 



  // const fetchDoctors = async () => {
  //   try {
  //     const response = await axios.get(`http://64.226.99.16:8090/api/v1/doctor/all`);
  //     const DocArray = response.data;
  //     setDoctorsArray(DocArray); 
  //     console.log(DocArray);
  //   } catch (error) {
  //     console.error("Error fetching doctors:", error);
  //   }
  // };
  
  // useEffect(() => {
  //   fetchDoctors();
  // }, []);
  
  
  

  useEffect(() => {
    const name = searchParams.get('name')?.toLowerCase() || '';
    const specialties = searchParams.get('specialties')?.toLowerCase().split(',') || [];
    const location = searchParams.get('location')?.toLowerCase() || '';
    console.log('🚀 ~ useEffect ~ location:', location);
    const clinic = searchParams.get('clinic')?.toLowerCase() || '';

    const filtered = DoctorsArray.filter(doctor => {
      const matchesName = name ? doctor.name.toLowerCase().includes(name) : true;
      const matchesSpecialty =
        specialties.length > 0 && specialties[0] !== ''
          ? specialties.includes(doctor.specialty.toLowerCase())
          : true;
      const matchesLocation = location ? doctor.location.toLowerCase().includes(location) : true;
      const matchesClinic = clinic ? doctor.clinic.toLowerCase().includes(clinic) : true;
      return matchesName && matchesSpecialty && matchesLocation && matchesClinic;
    });

    setFilteredDoctors(filtered);
  }, [searchParams]);

  return filteredDoctors;
}
