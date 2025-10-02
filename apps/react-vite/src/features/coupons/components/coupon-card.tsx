import { useState } from 'react';

type CouponCardProps = {
  id: string;
  title: string;
  discount: string;
  description: string;
  validUntil: string;
  code: string;
  isFeatured?: boolean;
};

export const CouponCard = ({
  title,
  discount,
  description,
  validUntil,
  code,
  isFeatured = false,
}: CouponCardProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl p-5 mb-5 border ${
        isFeatured ? 'border-green-300 border-2' : 'border-green-200'
      }`}
    >
      {isFeatured && (
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 mr-1">⭐</span>
          <span className="text-xs font-medium text-yellow-600">Destaque</span>
        </div>
      )}

      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>

      <div className="mb-3">
        <span
          className="text-2xl font-bold"
          style={{ color: 'rgb(106 155 124)' }}
        >
          {discount}
        </span>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>

      <div className="flex items-center text-gray-500 text-sm mb-3">
        <span className="mr-1">🕒</span>
        <span>Válido até {validUntil}</span>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-gray-100 rounded-full px-3 py-2 text-center font-bold">
          <span className="text-gray-700 font-mono text-sm">{code}</span>
        </div>
        <button
          onClick={handleCopyCode}
          className={`rounded-[15px] bg-gradient-to-br from-[#568168] to-transparent px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 bg-[#9bba9b] ${
            isCopied ? 'opacity-75' : ''
          }`}
        >
          {isCopied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
    </div>
  );
};
