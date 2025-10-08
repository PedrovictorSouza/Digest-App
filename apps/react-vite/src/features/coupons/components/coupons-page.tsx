import { BackButton } from '@/features/meal-evaluation';

import { CouponsHeader } from './coupons-header';
import { CouponsList } from './coupons-list';
import { CouponsSummary } from './coupons-summary';
import { EncouragementMessage } from './encouragement-message';

type Coupon = {
  id: string;
  title: string;
  discount: string;
  description: string;
  validUntil: string;
  code: string;
  isFeatured?: boolean;
};

const mockCoupons: Coupon[] = [
  {
    id: '1',
    title: 'Hortifruti Orgânico',
    discount: '20% OFF',
    description: 'Em frutas e verduras orgânicas',
    validUntil: '31/10/2025',
    code: 'DIGEST20',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Empório Saudável',
    discount: 'R$ 15 OFF',
    description: 'Na primeira compra acima de R$ 50',
    validUntil: '15/11/2025',
    code: 'BEM15',
  },
  {
    id: '3',
    title: 'Açaí Premium',
    discount: '10% OFF',
    description: 'Em bowls de açaí e smoothies',
    validUntil: '30/10/2025',
    code: 'ACAI10',
  },
];

type CouponsPageProps = {
  onBack?: () => void;
};

export const CouponsPage = ({ onBack }: CouponsPageProps = {}) => {
  return (
    <div className="px-4 py-4" style={{ backgroundColor: '#f4f4f4' }}>
      {onBack && <BackButton onBack={onBack} />}
      <CouponsHeader />
      <CouponsSummary />
      <CouponsList coupons={mockCoupons} />
      <EncouragementMessage />
    </div>
  );
};
