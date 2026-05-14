// Module-level trigger ref — set by Toast component on mount
export const toastRef = { show: null }

export function showToast(msg, type = 'cart') {
  if (toastRef.show) toastRef.show(msg, type)
}
