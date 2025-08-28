import { useEffect } from 'react';

/**
 * Custom hook para calcular o progresso de preenchimento de um formulário
 */
export function useFormProgress(
  watchedValues: (string | number | boolean | null | undefined)[],
  onProgress?: (progress: number) => void
) {
  useEffect(() => {
    if (!onProgress) return;

    const totalFields = watchedValues.length;
    const filledFields = watchedValues.filter(
      (value) => value !== '' && value != null && value !== undefined
    ).length;
    
    const progressPercentage = Math.round((filledFields / totalFields) * 100);
    onProgress(progressPercentage);
  }, [watchedValues, onProgress]);
}
