import { useParams } from 'react-router-dom';

export default function Profile() {
  const { name } = useParams();
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-20">Hello {name}</h1>
    </div>
  );
}
