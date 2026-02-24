import React, { useMemo } from 'react';
import type { Stock } from '../../types/stock.types';
interface Props {
  stocks: Stock[];
}

const MarketTicker: React.FC<Props> = ({ stocks }) => {
  const duplicated = useMemo(
    () => [...stocks, ...stocks],
    [stocks]
  );

  return (
    <>
      <style>
        {`
          @keyframes scrollTicker {
            0%   { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', background: '#111827', padding: '8px 0' }}>
        <div
          style={{
            display: 'inline-block',
            animation: 'scrollTicker 25s linear infinite'
          }}
        >
          {duplicated.map((stock, index) => {
            const isPositive = stock.changePct >= 0;
            return (
              <span
                key={index}
                style={{
                  display: 'inline-flex',
                  gap: 6,
                  marginRight: 40,
                  color: '#fff'
                }}
              >
                <strong>{stock.symbol}</strong>
                <span>${stock.price.toFixed(2)}</span>
                <span style={{ color: isPositive ? '#22C55E' : '#EF4444' }}>
                  {isPositive ? '+' : ''}
                  {stock.changePct.toFixed(2)}%
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MarketTicker;