// js/common.js — utilidades para UI
export function criarToast() {
  const wrapper = document.querySelector('#liveToast');
  if (!wrapper) return { show: () => {} };
  const toast = new bootstrap.Toast(wrapper);
  return toast;
}

export function notificar(toast, msg) {
  const msgEl = document.querySelector('#toastMsg');
  if (msgEl) msgEl.textContent = msg;
  toast.show();
}

export function avatarURL(nome, avatar='') {
  return avatar || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(nome)}`;
}
