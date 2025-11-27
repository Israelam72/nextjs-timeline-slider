import PropTypes from 'prop-types'

interface KeyboardHandleProps {
  domain: [number, number]
  handle: { id: string; value: number; percent?: number }
  disabled: boolean
  getHandleProps: (id: string) => Record<string, unknown>
}

const KeyboardHandle = ({
  domain: [min, max],
  handle: { id, value, percent = 0 },
  disabled,
  getHandleProps,
}: KeyboardHandleProps) => {
  const baseClasses =
    'absolute -translate-x-1/2 -translate-y-1/2 z-[3] w-6 h-6 rounded-full ' +
    'shadow-[1px_1px_1px_1px_rgba(0,0,0,0.3)]'

  return (
    <button
      type='button'
      role='slider'
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      className={baseClasses}
      style={{
        left: `${percent}%`,
        backgroundColor: disabled ? '#666666' : '#ffc400',
      }}
      {...getHandleProps(id)}
    />
  )
}

KeyboardHandle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

KeyboardHandle.defaultProps = { disabled: false }

export default KeyboardHandle
