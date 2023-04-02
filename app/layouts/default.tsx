interface Props {
  children: JSX.Element;
  header?: JSX.Element | string;
}

export default function LayoutDefault({ children, header }: Props) {
  return (
    <div className="layout-default">
      {header && (
        <header>
          <h1>{header}</h1>
        </header>
      )}

      <main>{children}</main>
      <footer>Developed by Francesco Cristaldi ©2023</footer>
    </div>
  );
}
