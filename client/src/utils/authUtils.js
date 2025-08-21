export function logoutOn401() {
  localStorage.removeItem("jwt");
  window.location.href = "/login";
}
