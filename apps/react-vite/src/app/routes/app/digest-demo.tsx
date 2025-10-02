import { useState } from 'react';

import { DigestLayout } from '@/components/layouts/digest-layout';

const DigestDemoPage = () => {
  const [activeTab, setActiveTab] = useState<
    'home' | 'reports' | 'coupons' | 'profile'
  >('home');

  return (
    <DigestLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="mt-6 rounded-lg border bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">
          Layout Atualizado
        </h2>
        <p className="text-sm text-gray-600">
          Esta página demonstra o layout atualizado seguindo o mockup do
          cliente, com margens maiores e elementos mais espaçados conforme
          solicitado.
        </p>
      </div>
    </DigestLayout>
  );
};

export default DigestDemoPage;
