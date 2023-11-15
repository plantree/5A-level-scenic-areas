import AppHeader from './layouts/AppHeader';
import AppFooter from './layouts/AppFooter';

function App() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <AppHeader />
      <main className="flex-grow"></main>
      <AppFooter />
    </div>
  );
}

export default App;
