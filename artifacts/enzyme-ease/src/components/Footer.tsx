export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <span className="font-bold text-base">
            <span className="text-sky-400">Enzyme</span>
            <span className="text-white">Ease</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Engineered for Indian dal mills. Backed by FSSAI-approved enzyme technology and peer-reviewed research (Dabhi et al.).
        </p>
        <p className="text-xs text-muted-foreground">© 2025 EnzymeEase</p>
      </div>
    </footer>
  );
}
