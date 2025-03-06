import LikeButton from './like-button';

function Header(properties) {
  return <h1>{properties.text}</h1>;
}

export default function HomePage() {
  const names = ['Vro', 'Cro', 'Po'];

  return (
    <div>
      <Header text='Hello vro..' />
      <Header text='Nice to meet you vro...' />
      <ul>
        {names.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <LikeButton />
    </div>
  );
}
