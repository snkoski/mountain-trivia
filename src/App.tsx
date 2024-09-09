import { GameContainer } from './GameContainer';
import { Header } from './components/Header';
import { Layout } from './layouts/Layout';

export default function App() {
  return <Layout header={<Header />} game={<GameContainer />} />;
}
