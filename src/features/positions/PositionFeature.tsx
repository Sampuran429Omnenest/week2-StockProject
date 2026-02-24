import React from 'react';
import type { Position } from '../../types/stock.types';
import DataTable from '../../components/DataTable';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

interface PositionsFeatureProps {
  positions: Position[];
}

function pnlCell(value: unknown, suffix: string = ''): React.ReactNode {
  const numberValue  = Number(value);
  const isPositive   = numberValue >= 0;
  const textColour   = isPositive ? '#166534' : '#991B1B';
  const prefix       = isPositive ? '+' : '';
  const currencySign = suffix === '%' ? '' : '$';

  return (
    <span style={{ color: textColour, fontWeight: 'bold' }}>
      {prefix}{currencySign}{numberValue.toFixed(2)}{suffix}
    </span>
  );
}

const PositionsFeature: React.FC<PositionsFeatureProps> = ({ positions }) => {

  const { visibleItems, bottomRef, hasMore } =
    useInfiniteScroll(positions, 10);

  return (
    <>
      <h2 style={{ color: '#1E40AF' }}>
        Positions
        <span style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 12 }}>
          {visibleItems.length} of {positions.length}
        </span>
      </h2>

      <DataTable<Position>
        data={visibleItems}   
        rowKey="symbol"
        filterKey="symbol"
        pageSize={10} 
        columns={[
          { key: 'symbol', header: 'Symbol', sortable: true },
          { key: 'quantity', header: 'Qty', sortable: true },
          { key: 'avgPrice', header: 'Avg Price', sortable: true,
            render: function(value) { return '$' + Number(value).toFixed(2); }
          },
          { key: 'ltp', header: 'LTP', sortable: true,
            render: function(value) { return '$' + Number(value).toFixed(2); }
          },
          { key: 'pnl', header: 'P&L', sortable: true,
            render: function(value) { return pnlCell(value); }
          },
          { key: 'pnlPercent', header: 'P&L %', sortable: true,
            render: function(value) { return pnlCell(value, '%'); }
          },
        ]}
      />

      {hasMore && <div ref={bottomRef} />}
    </>
  );
};

export default PositionsFeature;