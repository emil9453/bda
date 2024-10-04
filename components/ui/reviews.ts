import ReviewPhoto from '@/public/reviewPhotos/teachers.png';
import { StaticImageData } from 'next/image';

export type Reviews = {
  id: string;
  author: string;
  reviewText: string;
  src: StaticImageData;
  rating: number;
  date: string;
};

const ReviewArray: Reviews[] = [
  {
    id: '1',
    author: 'Narmin Hüseynova',
    src: ReviewPhoto,
    rating: 4,
    reviewText: 'Xidmət çox yaxşı idi və işçilər çox mehriban idi. Çox tövsiyə edirəm.',
    date: 'September 27, 2024',
  },
  {
    id: '2',
    author: 'Aysel Məmmədova',
    src: ReviewPhoto,
    rating: 4,
    reviewText: 'Çox yaxşı xidmət və sürətli təyinat. Çox tövsiyə edirəm.',
    date: 'September 27, 2024',
  },
  {
    id: '3',
    author: 'Elvin Əliyev',
    src: ReviewPhoto,
    rating: 5,
    reviewText: 'Fantastik xidmət və çox peşəkar. Yenidən gələcəyəm.',
    date: 'October 1, 2024',
  },
  {
    id: '4',
    author: 'Günay Quliyeva',
    src: ReviewPhoto,
    rating: 3,
    reviewText: 'Təyinat yaxşı idi, amma gözləmə vaxtı bir az uzun idi.',
    date: 'October 5, 2024',
  },
  {
    id: '5',
    author: 'Murad İsmayılov',
    src: ReviewPhoto,
    rating: 5,
    reviewText: 'Möhtəşəm təcrübə! İşçilər mehriban idi və xidmət sürətli idi.',
    date: 'October 10, 2024',
  },
  {
    id: '6',
    author: 'Leyla Abbasova',
    src: ReviewPhoto,
    rating: 4,
    reviewText: 'Yaxşı xidmət, amma yeri tapmaq bir az çətin idi.',
    date: 'October 15, 2024',
  },
  {
    id: '7',
    author: 'Rəşad Məmmədov',
    src: ReviewPhoto,
    rating: 2,
    reviewText: 'Xidmətdən məmnun qalmadım. İşçilər çox köməkçi deyildi.',
    date: 'October 20, 2024',
  },
];

export default ReviewArray;
