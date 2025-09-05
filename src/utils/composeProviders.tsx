import React from "react";

interface IComposeProps {
  components: Array<
    React.JSXElementConstructor<React.PropsWithChildren<unknown>>
  >;
  children?: React.ReactNode;
}

export const Compose = (props: IComposeProps) => {
  const { components = [], children } = props;

  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
};
