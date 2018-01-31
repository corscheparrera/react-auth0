export default function isAuthenticated() {
  // Vérifie si le temps actuel dépasse la temps d'expiration du token

  let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
  return new Date().getTime() < expiresAt;
}
