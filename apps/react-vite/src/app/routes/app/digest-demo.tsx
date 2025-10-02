import { useState } from 'react';

import { DigestLayout } from '@/components/layouts/digest-layout';

const DigestDemoPage = () => {
  const [activeTab, setActiveTab] = useState<
    'home' | 'reports' | 'coupons' | 'profile'
  >('home');

  return (
    <DigestLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="mt-6 p-4 bg-white rounded-lg border">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Layout Atualizado
        </h2>
        <p className="text-gray-600 text-sm">
          Esta página demonstra o layout atualizado seguindo o mockup do
          cliente, com margens maiores e elementos mais espaçados conforme
          solicitado.
        </p>
      </div>
    </DigestLayout>
  );
};

export default DigestDemoPage;
