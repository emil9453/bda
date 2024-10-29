import { useEffect, useState } from 'react';

const DoctorList = () => {
  const url = 'https://64.226.99.16:8091/api/v1/doctor/all';
  const [doctors, setDoctors] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {doctors.map((doctor, index) => (
        <div key={index}>{/* Doctors */}</div>
      ))}
    </div>
  );
};

export default DoctorList;
