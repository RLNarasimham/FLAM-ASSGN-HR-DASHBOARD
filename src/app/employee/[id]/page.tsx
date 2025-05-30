'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import UserTabs from './UserTabs';

function getBadgeColor(rating: number) {
  if (rating >= 4) return 'success';
  if (rating === 3) return 'warning';
  return 'danger';
}

type PerformanceRecord = {
  period: string;
  rating: number;
};

type User = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  department: string;
  address: string;
  bio: string;
  rating: number;
  performanceHistory: PerformanceRecord[];
};

type ApiUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
};

export default function EmployeeDetails() {
  const params = useParams();
  const id = params?.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://run.mocky.io/v3/79b0de84-f056-4c89-bdbb-0330934b2843`);
        if (!res.ok) throw new Error('User not found');
        const data = await res.json();

        const foundUser = (data.users as ApiUser[]).find((u) => String(u.id) === id);
        if (!foundUser) throw new Error('User not found');

        const getRandomRating = () => Math.floor(Math.random() * 5) + 1;
        const mockPerformanceHistory = (): PerformanceRecord[] => [
          { period: 'Q1 2024', rating: getRandomRating() },
          { period: 'Q4 2023', rating: getRandomRating() },
          { period: 'Q3 2023', rating: getRandomRating() },
          { period: 'Q2 2023', rating: getRandomRating() },
        ];

        setUser({
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
          age: foundUser.age,
          phone: foundUser.phone,
          department: ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance'][Math.floor(Math.random() * 5)],
          address: `${foundUser.address.address}, ${foundUser.address.city}, ${foundUser.address.state}, ${foundUser.address.postalCode}`,
          bio: 'Passionate and dedicated employee with strong teamwork skills.',
          rating: getRandomRating(),
          performanceHistory: mockPerformanceHistory(),
        });
      } catch {
        setError(true);
      }
    };

    if (id) fetchUser();
  }, [id]);

  if (error) return <p>User not found. <Link href="/">Back to Dashboard</Link></p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      <p>
        <strong>Email:</strong> {user.email} | <strong>Age:</strong> {user.age} |{' '}
        <strong>Department:</strong> {user.department}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Address:</strong> {user.address}
      </p>
      <p>
        <strong>Bio:</strong> {user.bio}
      </p>
      <p>
        <strong>Rating:</strong>{' '}
        <span style={{ color: '#ffc107' }}>
          {'★'.repeat(user.rating)}
          {'☆'.repeat(5 - user.rating)}
        </span>{' '}
        <span className={`badge bg-${getBadgeColor(user.rating)}`}>
          {user.rating >= 4 ? 'Excellent' : user.rating === 3 ? 'Average' : 'Needs Improvement'}
        </span>
      </p>

      <UserTabs performanceHistory={user.performanceHistory} />

      <Link href="/" className="btn btn-secondary mt-3">
        Back to Dashboard
      </Link>
    </div>
  );
}