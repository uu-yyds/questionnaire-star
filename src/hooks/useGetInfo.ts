import { useState, useEffect } from 'react';

interface Info {
  value?: string;
}

// 模拟异步数据获取
function getInfo() {
  return new Promise((resolve: (value: Info) => void) => {
    setTimeout(() => {
      resolve({ value: Date.now().toString() });
    }, 1000);
  });
}

export function useGetInfo() {
  const [info, setInfo] = useState<Info>({ value: undefined });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getInfo()
      .then((res: Info) => {
        res && setInfo(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { info, loading };
}
