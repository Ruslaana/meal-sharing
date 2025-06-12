import MealDetail from '../../../components/MealDetail/MealDetail';
import Layout from '../../../components/Layout/Layout';

export async function generateStaticParams() {
  const res = await fetch('http://localhost:3001/api/meals');
  const meals = await res.json();

  return meals.map(meal => ({
    id: meal.id.toString(),
  }));
}

export default function MealPage({ params }) {
  return (
    <Layout>
      <MealDetail id={params.id} />
    </Layout>
  );
}
