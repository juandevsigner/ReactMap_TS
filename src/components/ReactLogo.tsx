import Logo from "../logo.svg";

export const ReactLogo = () => {
  return (
    <img
      style={{ position: "fixed", bottom: 20, right: 20, width: 130 }}
      src={Logo}
      alt="Logo React"
    />
  );
};
