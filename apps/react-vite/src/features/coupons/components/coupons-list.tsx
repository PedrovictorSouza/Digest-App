import { CouponCard } from './coupon-card';

type Coupon = {
  id: string;
  title: string;
  discount: string;
  description: string;
  validUntil: string;
  code: string;
  isFeatured?: boolean;
};

type CouponsListProps = {
  coupons: Coupon[];
};

export const CouponsList = ({ coupons }: CouponsListProps) => {
  return (
    <div className="mb-8">
      {coupons.map((coupon) => (
        <CouponCard
          key={coupon.id}
          id={coupon.id}
          title={coupon.title}
          discount={coupon.discount}
          description={coupon.description}
          validUntil={coupon.validUntil}
          code={coupon.code}
          isFeatured={coupon.isFeatured}
        />
      ))}
    </div>
  );
};
