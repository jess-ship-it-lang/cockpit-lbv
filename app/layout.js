export const metadata = {
  title: "Cockpit LBV — La Belle Vie",
  description: "Cockpit Achats / Offre / Marketing / Trade MK / Category Management",
};
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
