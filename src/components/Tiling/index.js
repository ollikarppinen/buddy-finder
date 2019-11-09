import React from 'react'

const rowSizeToTileWidth = {
  1: 12,
  2: 6,
  3: 4,
  4: 3
}

export const Tiling = ({ perRow = 3, children = [] }) => {
  const childrenByRow = children.reduce(
    (acc, child, i) => {
      const lastArr = acc[acc.length - 1]
      if (lastArr.length >= perRow) {
        acc.push([child])
      } else {
        acc[acc.length - 1] = lastArr.concat(child)
      }
      return acc
    },
    [[]]
  )

  return (
    <div className="tile is-ancestor">
      <div className="tile is-vertical">
        {childrenByRow.map((rowChildren, i) => (
          <div className="tile is-parent" key={i}>
            {rowChildren.map((child, j) => (
              <div
                className={`tile is-parent is-${rowSizeToTileWidth[perRow] ||
                  12}`}
                key={j}
              >
                {child}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tiling
