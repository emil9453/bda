'use client'

// import { useState } from 'react'
import Switch from '../admincomponents/togglebutton'
import { Pencil, Trash2 } from 'lucide-react'
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { SERVER_URL } from '../constants';

const response = await axios.get(`${SERVER_URL}/doctor/specialties`);
const specialities = response.data;

// interface DictionaryItem {
//   id: number
//   name: string
//   isActive: boolean
// }

export default function DictionaryTable() {
  // const [items, setItems] = useState<DictionaryItem[]>([
  //   { id: 1, name: 'Item 1', isActive: true },
  //   { id: 2, name: 'Item 2', isActive: false },
  //   { id: 3, name: 'Item 3', isActive: true },
  // ])

  // const handleToggle = (id: number) => {
  //   setItems(prevItems =>
  //     prevItems.map(item =>
  //       item.id === id ? { ...item, isActive: !item.isActive } : item
  //     )
  //   )
  // }

  // const handleDelete = (id: number) => {
  //   setItems(prevItems => prevItems.filter(item => item.id !== id))
  // }

  return (
    <section className="flex flex-col px-20 mb-4 mt-24 w-full max-md:px-5 max-md:mt-2 max-md:max-w-full">
      <div className="container max-w-full mx-auto py-10">
        <table className="w-full">
          <thead>
            <tr className="bg-[rgba(255,179,0,1)]">
              <th className="border-none p-4 text-center">Ad</th>
              <th className="border-none p-4 text-center">Tənzimləmələr</th>
            </tr>
          </thead>
          <tbody>
            {specialities.map((item) => (
              <tr key={item.id}>
                <td className="border-none text-center p-2">{item}</td>
                <td className="border-none text-center p-2">
                  <div className="flex items-center justify-center space-x-4">
                    <button className="text-gray-600 hover:text-blue-600">
                      <Pencil size={18} />
                    </button>
                    <button 
                      className="text-gray-600 hover:text-red-600"
                      // onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                    <Switch isChecked={false} onChange={function (): void {
                      throw new Error('Function not implemented.');
                    } }                      // onChange={() => handleToggle(item.id)} 
                      // isChecked={item.isActive} 
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster position='top-center'/>
    </section>
  )
}
