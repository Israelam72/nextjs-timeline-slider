import PropTypes from 'prop-types'
import React from 'react'

interface TrackConfigOptions {
  error?: boolean
  source: { id?: string; value: number; percent: number }
  target: { id?: string; value: number; percent: number }
  disabled?: boolean
}

const getTrackConfig = ({
  error,
  source,
  target,
  disabled,
}: TrackConfigOptions) => {
  const basicStyle = {
    left: `${source.percent}%`,
    width: `calc(${target.percent - source.percent}% - 1px)`,
  }

  if (disabled) {
    return {
      ...basicStyle,
      background:
        'repeating-linear-gradient(-45deg, transparent, transparent 3px, #D0D3D7 4px, #D0D3D7 2px)',
      borderLeft: '1px solid #C8CACC',
      borderRight: '1px solid #C8CACC',
    }
  }

  const coloredTrackStyle = error
    ? {
      backgroundColor: 'rgba(214,0,11,0.5)',
      borderLeft: '1px solid rgba(214,0,11,0.5)',
      borderRight: '1px solid rgba(214,0,11,0.5)',
    }
    : {
      backgroundColor: 'rgba(98, 203, 102, 0.5)',
      borderLeft: '1px solid #62CB66',
      borderRight: '1px solid #62CB66',
    }

  return { ...basicStyle, ...coloredTrackStyle }
}

interface TrackProps {
  error?: boolean
  source: { id?: string; value: number; percent: number }
  target: { id?: string; value: number; percent: number }
  getTrackProps: () => Record<string, unknown>
  disabled?: boolean
}

const Track = ({ error, source, target, getTrackProps, disabled }: TrackProps) => {
  const baseClasses =
    'absolute -translate-y-1/2 h-[50px] cursor-pointer ' +
    'transition-[background-color,border-color] duration-150 ease-in-out'

  const enabledClasses = 'z-[3]'
  const disabledClasses = 'z-[1]'

  return (
    <div
      className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses}`}
      style={getTrackConfig({ error, source, target, disabled })}
      {...getTrackProps()}
    />
  )
}

Track.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getTrackProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

Track.defaultProps = { disabled: false }

export default Track
