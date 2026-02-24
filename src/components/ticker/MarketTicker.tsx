import type { Stock } from "../../types/stock.types"

type Props = {
  stocks: Stock[]
}

export const MarketTicker = ({ stocks }: Props) => {
  return (
    <div className="ticker-wrapper">
      <div className="ticker">
        {stocks.map(item => (
          <div key={item.symbol} className="ticker-item">
            <span>{item.symbol}</span>
            <span>{item.price}</span>
            <span
              className={
                item.change >= 0 ? "positive" : "negative"
              }
            >
              {item.change} ({item.changePct}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}