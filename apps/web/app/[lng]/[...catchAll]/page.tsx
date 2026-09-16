import { NotFoundPage } from '@/_pages/not-found';

type Props = {
  params: Promise<{ lng: string }>
};

export default async function CatchAll({ params }: Props) {
  const { lng } = await params;

  return (
    <NotFoundPage lng={lng} />
  );
}