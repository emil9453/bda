// 'use client';
// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import  { Doctors } from '@/components/doctors';
// import axios from 'axios'


// export function useFilteredDoctors() {
//   const searchParams = useSearchParams();
//   console.log('🚀 ~ useFilteredDoctors ~ searchParams:', searchParams);
//   const [filteredDoctors, setFilteredDoctors] = useState<Doctors[]>([]);
//   const [DoctorArray, setDoctorsArray] = useState<Doctors[]>([]);

//   const fetchDoctors = async () => {

//     const params = new URLSearchParams({
//       fullName: 'string',
//       speciality: 'string',
//       clinicName: 'string',
//       location: 'string',
//       reviewCount: "0",
//       ratingCount: "0",
//       sortBy: 'string'
//     });
//     try {
//       const response = await axios.get('https://64.226.99.16/api/v1/doctor/specification',{
//         params: params
//       }) ;
//       const data = response.data
//       if (!data.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const DocArray = await data.json(); 
//       setDoctorsArray(DocArray); 
//       console.log(DocArray);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors(); 
//   }, []); 

//   useEffect(() => {
//     const name = searchParams.get('name')?.toLowerCase() || '';
//     const specialties = searchParams.get('specialties')?.toLowerCase().split(',') || [];
//     const location = searchParams.get('location')?.toLowerCase() || '';
//     const clinic = searchParams.get('clinic')?.toLowerCase() || '';
  
//     const filtered = DoctorArray.filter(doctor => {
//       const matchesName = name ? doctor.fullName.toLowerCase().includes(name) : true;
//       const matchesSpecialty = specialties.length > 0 && specialties[0] !== '' 
//         ? specialties.includes(doctor.speciality.toLowerCase()) 
//         : true;
//       const matchesLocation = location ? doctor.clinics.some(c => c.location.toLowerCase().includes(location)) : true;
//       const matchesClinic = clinic ? doctor.clinics.some(c => c.clinicName.toLowerCase().includes(clinic)) : true;
  
//       return matchesName && matchesSpecialty && matchesLocation && matchesClinic;
//     });
  
//     setFilteredDoctors(filtered);
//   }, [searchParams, DoctorArray]);
  

//   return filteredDoctors;
// }
'use client';
import { Doctors } from '@/components/doctors';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useFilteredDoctors() {
  const searchParams = useSearchParams();
  const [filteredDoctors, setFilteredDoctors] = useState<Doctors[]>([]);

  const fetchDoctors = async () => {
   
    const name = searchParams.get('name')?.toLowerCase() || '';
    const specialties = searchParams.get('specialties')?.toLowerCase() || '';
    const location = searchParams.get('location')?.toLowerCase() || '';
    const clinic = searchParams.get('clinic')?.toLowerCase() || '';

  
    const params = new URLSearchParams({
      fullName: name,
      speciality: specialties,
      clinicName: clinic,
      location: location,
      reviewCount: "0",
      ratingCount: "0", 
      sortBy: 'string'  
    });

    try {
     
      const response = await axios.get('https://64.226.99.16/api/v1/doctor/specification', {
        params: params
      });
      
      const data = response.data;

     
      setFilteredDoctors(data); 
      console.log(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
     
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [searchParams]); 

  return filteredDoctors;
}
