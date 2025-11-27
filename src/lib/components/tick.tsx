import { getMinutes } from 'date-fns'
import PropTypes from 'prop-types'
import React from 'react'

interface TickProps {
  tick: { id: string; value: number; percent: number }
  count: number
  format: (value: number) => string
}

const Tick = ({ tick, count, format }: TickProps) => {
  const isFullHour = !getMinutes(tick.value)

  const tickLabelStyle = {
    marginLeft: `${-(100 / count) / 2}%`,
    width: `${100 / count}%`,
    left: `${tick.percent}%`,
  }

  const baseMarkerClasses =
    'absolute mt-[20px] w-px h-[5px] bg-[#C8CACC] z-[2]'

  const largeMarkerClasses =
    'mt-[15px] h-[10px]'

  const labelClasses =
    'absolute mt-[28px] text-[10px] text-center z-[2] text-[#77828C] font-sans'

  return (
    <>
      <div
        className={
          isFullHour
            ? `${baseMarkerClasses} ${largeMarkerClasses}`
            : baseMarkerClasses
        }
        style={{ left: `${tick.percent}%` }}
      />
      {isFullHour && (
        <div className={labelClasses} style={tickLabelStyle}>
          {format(tick.value)}
        </div>
      )}
    </>
  )
}

Tick.propTypes = {
  tick: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  count: PropTypes.number.isRequired,
  format: PropTypes.func.isRequired,
}

Tick.defaultProps = { format: (d: number) => d.toString() }

export default Tick
