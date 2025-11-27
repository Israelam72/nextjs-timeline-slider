import React from 'react'
import PropTypes from 'prop-types'

export interface SliderRailProps {
  getRailProps: () => Record<string, unknown>
  className?: string
}

export const SliderRail: React.FC<SliderRailProps> = ({
  getRailProps,
  className,
}) => {
  const outerDefaultClasses =
    'absolute w-full h-[50px] -translate-y-1/2 cursor-pointer'

  const innerClasses =
    'absolute w-full h-[50px] -translate-y-1/2 pointer-events-none ' +
    'bg-[#F5F7FA] border-b border-[#C8CACC]'

  return (
    <>
      <div
        className={className || outerDefaultClasses}
        {...getRailProps()}
      />
      <div className={innerClasses} />
    </>
  )
}

SliderRail.propTypes = {
  getRailProps: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default SliderRail
