import { Header, Footer } from '@/components/layouts';
import { ReportsPage } from '@/features/reports';

const ReportsRoute = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex-1 overflow-y-auto" style={{backgroundColor: '#f4f4f4'}}>
        <ReportsPage />
      </div>
      <Footer />
    </div>
  );
};

export default ReportsRoute;
