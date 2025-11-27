import PropTypes from 'prop-types'
import React from 'react'

interface HandleProps {
  error?: boolean
  domain: [number, number]
  handle: {
    id: string
    value: number
    percent?: number
  }
  disabled?: boolean
  getHandleProps: (id: string) => Record<string, unknown>
}

const Handle = ({
  error,
  domain: [min, max],
  handle: { id, value, percent = 0 },
  disabled,
  getHandleProps,
}: HandleProps) => {
  const leftPosition = `${percent}%`

  const wrapperClasses =
    'absolute -translate-x-1/2 -translate-y-1/2 z-[6] w-6 h-6 cursor-pointer bg-transparent'

  const containerBaseClasses =
    'absolute flex -translate-x-1/2 -translate-y-1/2 z-[4] w-[10px] h-6 rounded-[4px] ' +
    'shadow-[0_0_3px_rgba(0,0,0,0.4)] bg-white'

  const containerDisabledClasses = 'bg-[#666666]'

  const markerBaseClasses =
    'w-[2px] h-3 m-auto rounded-[2px] bg-[#62CB66] transition-colors duration-200 ease-linear'

  const markerErrorClasses = 'bg-[rgb(214,0,11)]'

  return (
    <>
      <div
        className={wrapperClasses}
        style={{ left: leftPosition }}
        {...getHandleProps(id)}
      />
      <div
        role='slider'
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className={`${containerBaseClasses} ${disabled ? containerDisabledClasses : ''}`}
        style={{ left: leftPosition }}
      >
        <div
          className={`${markerBaseClasses} ${error ? markerErrorClasses : ''}`}
        />
      </div>
    </>
  )
}

Handle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.object,
}

Handle.defaultProps = { disabled: false }

export default Handle
