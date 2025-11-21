const Color = ({ shade, children }) => {
  return <span style={{ color: `var(${shade})` }}>{children}</span>;;
};

export default Color;