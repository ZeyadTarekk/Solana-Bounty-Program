import Footer from './footer';
import Header from './header';

const Layout = ({ children }) => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex grow flex-col gap-16">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
