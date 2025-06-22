type User = {
  name?: string | null;
  email?: string | null;
};

type Props = {
  user?: User;
  pagetype: string;
};

export default function UseCard({ user, pagetype }: Props) {
  const girisYap = user?.name ? (
    <div>Merhaba {user.name}</div>
  ) : null;

  return (
    <section className="">
      {girisYap}
      <p>{pagetype} |</p>
    </section>
  );
}
