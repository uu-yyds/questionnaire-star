import React, { ReactNode, useContext } from 'react';

const EMPTY_OBJECT = {};
export function contextWrapper<F extends (parameters?: any) => ReturnType<F>>(
  useModel: F,
  providerWrapper?: (children: ReactNode) => any
) {
  const TheContext = React.createContext<ReturnType<F>>(EMPTY_OBJECT as any);
  type RestType = Parameters<F> extends [] ? {} : Parameters<F>[0];
  const Provider = ({
    children,
    ...providerProps
  }: { children: ReactNode | (() => ReactNode) } & RestType) => {
    return providerWrapper ? (
      providerWrapper(
        <ProviderWrapper useModel={useModel} providerProps={providerProps} TheContext={TheContext}>
          {children}
        </ProviderWrapper>
      )
    ) : (
      <ProviderWrapper useModel={useModel} providerProps={providerProps} TheContext={TheContext}>
        {children}
      </ProviderWrapper>
    );
  };
  const useTheContext = (isValidatContextWrap = true) => {
    const s = useContext(TheContext);
    if (isValidatContextWrap && s === EMPTY_OBJECT) {
      try {
        throw new Error(`useTheContext对应的Context未包裹当前组件`);
      } catch (error) {
        console.error(error);
      }
    }
    return s;
  };
  return {
    Provider,
    useTheContext,
  };
}

function ProviderWrapper({ useModel, providerProps, TheContext, children }: any) {
  const model = useModel(providerProps);
  return (
    <TheContext.Provider value={model}>
      <InlineComp>{children}</InlineComp>
    </TheContext.Provider>
  );
}

export function InlineComp({ children }: { children: ReactNode | (() => ReactNode) }) {
  if (typeof children === 'function') {
    return <>{children()}</>;
  } else {
    return <>{children}</>;
  }
}
