import type { EffectCallback } from 'react';
import { useEffect, useRef } from 'react';

export function useInitOnce(effect: EffectCallback) {
  const ref = useRef(false);
  useEffect(() => {
    if (!ref.current) {
      effect();
      ref.current = true;
    }
  }, [effect]);
}
